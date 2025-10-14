import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { scoreAndUpdateLead } from '@/lib/ai/lead-scorer';

// GET - Webhook verification (Facebook requires this)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.FACEBOOK_VERIFY_TOKEN) {
      console.log('Meta webhook verified!');
      return new NextResponse(challenge, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }
  }

  return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
}

// POST - Receive leads from Meta Ads
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    console.log('Meta webhook received:', JSON.stringify(body, null, 2));

    if (body.object === 'page') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'leadgen') {
            const leadgenId = change.value.leadgen_id;
            const adId = change.value.ad_id;

            // Fetch full lead data from Facebook
            const leadData = await fetchLeadFromMeta(leadgenId);

            if (leadData) {
              // Find customer by ad campaign
              const { data: campaign } = await supabase
                .from('ad_campaigns')
                .select('customer_id, customers(*)')
                .eq('platform_ad_id', adId)
                .single();

              if (!campaign) {
                console.log('No campaign found for ad_id:', adId);
                continue;
              }

              // Process and save as verified lead
              await saveMetaLead(leadData, campaign.customer_id, campaign.customers.industry, adId, supabase);
            }
          }
        }
      }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Meta webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch lead from Meta Graph API
async function fetchLeadFromMeta(leadId: string) {
  try {
    const url = `https://graph.facebook.com/v18.0/${leadId}?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}&fields=id,created_time,field_data`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Meta API error:', data.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Fetch Meta lead error:', error);
    return null;
  }
}

// Save Meta lead as verified lead
async function saveMetaLead(
  metaLead: any,
  customerId: string,
  industry: string,
  adId: string,
  supabase: any
) {
  try {
    // Extract field data
    const fieldData = metaLead.field_data || [];
    const leadInfo: any = {};

    fieldData.forEach((field: any) => {
      leadInfo[field.name] = field.values[0];
    });

    const phone = leadInfo.phone_number || leadInfo.phone || '';
    const email = leadInfo.email || '';
    const name = leadInfo.full_name || leadInfo.first_name || 'Unknown';

    // Check for duplicates
    if (phone || email) {
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('customer_id', customerId)
        .or(`phone.eq.${phone},email.eq.${email}`)
        .single();

      if (existingLead) {
        console.log('Duplicate Meta lead detected:', phone || email);
        return;
      }
    }

    // Create verified lead directly (Meta ads = verified)
    const { data: newLead, error } = await supabase
      .from('leads')
      .insert({
        customer_id: customerId,
        name,
        email: email || null,
        phone: phone || null,
        source: 'meta_ads',
        platform_lead_id: metaLead.id,
        lead_data: leadInfo,
        quality_score: 75, // Will be AI-scored below
        intent: 'warm',
        status: 'new',
        received_at: new Date(metaLead.created_time).toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Save Meta lead error:', error);
      return;
    }

    // AI score the lead
    await scoreAndUpdateLead(newLead.id, leadInfo, industry, supabase);

    // Create conversation automatically
    const { data: conversation } = await supabase
      .from('conversations')
      .insert({
        lead_id: newLead.id,
        customer_id: customerId,
        channel: 'platform_chat',
        status: 'open',
      })
      .select()
      .single();

    // Add initial system message with form data
    if (conversation) {
      const formDataMessage = Object.entries(leadInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      await supabase.from('messages').insert({
        conversation_id: conversation.id,
        lead_id: newLead.id,
        customer_id: customerId,
        sender: 'system',
        message_text: `Lead submitted form:\n\n${formDataMessage}`,
        channel: 'platform_chat',
        status: 'sent',
      });
    }

    // Create notification
    await supabase.from('notifications').insert({
      customer_id: customerId,
      type: 'new_lead',
      title: '🎉 New Lead from Meta Ads!',
      message: `${name} submitted their information via Facebook/Instagram`,
      lead_id: newLead.id,
      priority: 'high',
      action_url: `/dashboard/leads/${newLead.id}`,
      action_label: 'View Lead',
    });

    // Update campaign stats
    await supabase.rpc('increment_campaign_leads', { 
      campaign_ad_id: adId 
    });

    console.log('Meta lead saved successfully:', newLead.id);

  } catch (error) {
    console.error('Save Meta lead error:', error);
  }
}

