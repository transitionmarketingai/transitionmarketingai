import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// GET - Webhook verification (Facebook requires this)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === process.env.FACEBOOK_VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log('Facebook webhook verified!');
      return new NextResponse(challenge, { status: 200 });
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      return NextResponse.json(
        { error: 'Verification failed' },
        { status: 403 }
      );
    }
  }

  return NextResponse.json(
    { error: 'Missing parameters' },
    { status: 400 }
  );
}

// POST - Receive lead data from Facebook
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    console.log('Facebook webhook received:', JSON.stringify(body, null, 2));

    // Facebook sends data in this structure
    if (body.object === 'page') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'leadgen') {
            const leadgenId = change.value.leadgen_id;
            const adId = change.value.ad_id;
            const formId = change.value.form_id;

            // Fetch lead data from Facebook Graph API
            const leadData = await fetchLeadFromFacebook(leadgenId);

            if (leadData) {
              // Find which customer this lead belongs to (based on campaign/ad_id)
              const { data: campaign } = await supabase
                .from('campaigns')
                .select('customer_id')
                .eq('platform_ad_id', adId)
                .single();

              if (!campaign) {
                console.log('No campaign found for ad_id:', adId);
                continue;
              }

              // Process and save lead
              await saveFacebookLead(leadData, campaign.customer_id, adId, supabase);
            }
          }
        }
      }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Facebook webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// Fetch lead data from Facebook Graph API
async function fetchLeadFromFacebook(leadId: string) {
  try {
    const url = `https://graph.facebook.com/v18.0/${leadId}?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}&fields=id,created_time,field_data`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Facebook API error:', data.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Fetch Facebook lead error:', error);
    return null;
  }
}

// Save Facebook lead to database
async function saveFacebookLead(
  fbLead: any,
  customerId: string,
  adId: string,
  supabase: any
) {
  try {
    // Extract field data
    const fieldData = fbLead.field_data || [];
    const leadInfo: any = {};

    fieldData.forEach((field: any) => {
      leadInfo[field.name] = field.values[0];
    });

    // Check for duplicate (based on phone or email)
    const phone = leadInfo.phone_number || leadInfo.phone || '';
    const email = leadInfo.email || '';

    if (phone || email) {
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('customer_id', customerId)
        .or(`phone.eq.${phone},email.eq.${email}`)
        .single();

      if (existingLead) {
        console.log('Duplicate lead detected:', phone || email);
        return; // Skip duplicate
      }
    }

    // Create lead in database
    const { data: newLead, error } = await supabase
      .from('leads')
      .insert({
        customer_id: customerId,
        name: leadInfo.full_name || leadInfo.first_name || 'Unknown',
        email: email || null,
        phone: phone || null,
        lead_data: leadInfo,
        quality_score: 70, // Will be scored by AI later
        intent: 'warm',
        status: 'new',
        source: 'facebook_lead_ads',
        platform_lead_id: fbLead.id,
        received_at: new Date(fbLead.created_time).toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Save lead error:', error);
      return;
    }

    // Create notification for customer
    await supabase.from('notifications').insert({
      customer_id: customerId,
      type: 'new_lead',
      title: 'New Lead Received!',
      message: `${newLead.name} submitted their information via Facebook Lead Ad`,
      lead_id: newLead.id,
      priority: 'high',
      action_url: `/dashboard/leads/${newLead.id}`,
      action_label: 'View Lead',
    });

    // TODO: Trigger AI scoring (Phase 8)
    // TODO: Send WhatsApp notification (Phase 9)

    console.log('Facebook lead saved successfully:', newLead.id);

  } catch (error) {
    console.error('Save Facebook lead error:', error);
  }
}


