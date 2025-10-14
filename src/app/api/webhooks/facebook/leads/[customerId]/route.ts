import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { qualifyLeadWithAI } from '@/lib/ai/lead-qualification';
import { sendWhatsAppNotification } from '@/lib/whatsapp/notifications';

// Facebook webhook verification (GET request)
export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify the webhook
  if (mode === 'subscribe' && token === process.env.FACEBOOK_VERIFY_TOKEN) {
    console.log('Facebook webhook verified for customer:', params.customerId);
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// Facebook webhook handler (POST request - receives leads)
export async function POST(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  try {
    const body = await req.json();
    const supabase = createAdminClient();

    console.log('Facebook webhook received for customer:', params.customerId);

    // Log webhook for debugging
    await supabase.from('webhook_logs').insert({
      source: 'facebook',
      event_type: 'leadgen',
      payload: body,
      headers: Object.fromEntries(req.headers),
      processed: false
    });

    // Process each entry
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === 'leadgen') {
          const leadgenId = change.value.leadgen_id;
          const formId = change.value.form_id;
          const pageId = change.value.page_id;
          const createdTime = change.value.created_time;

          console.log('Processing lead:', leadgenId);

          try {
            // Fetch full lead data from Facebook
            const leadData = await fetchFacebookLeadData(leadgenId);

            if (!leadData) {
              throw new Error('Failed to fetch lead data from Facebook');
            }

            // Extract field values
            const fields: Record<string, any> = {};
            for (const field of leadData.field_data || []) {
              fields[field.name] = field.values?.[0] || null;
            }

            // Get customer and campaign info
            const { data: campaign } = await supabase
              .from('ad_campaigns')
              .select('*, customer:customers(*)')
              .eq('external_form_id', formId)
              .eq('customer_id', params.customerId)
              .single();

            if (!campaign) {
              console.error('Campaign not found for form:', formId);
              continue;
            }

            // AI Qualification
            const qualification = await qualifyLeadWithAI({
              name: fields.full_name || fields.name,
              email: fields.email,
              phone: fields.phone_number || fields.phone,
              form_responses: fields,
              industry: campaign.customer.industry,
              target_audience: campaign.customer.target_audience
            });

            // Save lead to database
            const { data: lead, error: leadError } = await supabase
              .from('leads')
              .insert({
                customer_id: params.customerId,
                campaign_id: campaign.id,
                
                // Contact info
                name: fields.full_name || fields.name,
                email: fields.email,
                phone: fields.phone_number || fields.phone,
                
                // Source
                source: 'facebook_lead_ad',
                source_details: {
                  leadgen_id: leadgenId,
                  form_id: formId,
                  page_id: pageId,
                  ad_id: leadData.ad_id,
                  campaign_id: leadData.campaign_id,
                  created_time: createdTime
                },
                
                // Form responses
                form_responses: fields,
                
                // AI Qualification
                quality_score: qualification.quality_score,
                qualification_status: qualification.qualification_status,
                qualification_reason: qualification.qualification_reason,
                ai_summary: qualification.ai_summary,
                
                // Status
                status: 'new',
                
                // Billing
                is_within_quota: true, // Will be updated by quota check
              })
              .select()
              .single();

            if (leadError) {
              console.error('Error saving lead:', leadError);
              throw leadError;
            }

            // Check and update quota
            await checkAndUpdateQuota(supabase, params.customerId, lead.id);

            // Send notifications to customer
            await sendLeadNotifications({
              customerId: params.customerId,
              lead,
              qualification,
              customer: campaign.customer
            });

            // Update campaign stats
            await supabase
              .from('ad_campaigns')
              .update({
                leads_generated: (campaign.leads_generated || 0) + 1,
                conversions: (campaign.conversions || 0) + 1
              })
              .eq('id', campaign.id);

            // Log activity
            await supabase.from('lead_activities').insert({
              lead_id: lead.id,
              customer_id: params.customerId,
              activity_type: 'created',
              activity_description: `Lead received from Facebook Ad: ${campaign.campaign_name}`,
              metadata: { source: 'facebook_webhook', quality_score: qualification.quality_score }
            });

            // Mark webhook as processed
            await supabase
              .from('webhook_logs')
              .update({ processed: true, related_lead_id: lead.id })
              .eq('payload->entry->0->changes->0->value->>leadgen_id', leadgenId);

            console.log('Lead processed successfully:', lead.id);

          } catch (error) {
            console.error('Error processing lead:', error);
            // Continue processing other leads even if one fails
          }
        }
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to fetch lead data from Facebook
async function fetchFacebookLeadData(leadgenId: string) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const apiVersion = 'v18.0';
  
  try {
    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${leadgenId}?access_token=${accessToken}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error(`Facebook API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Facebook lead data:', error);
    return null;
  }
}

// Helper function to check and update quota
async function checkAndUpdateQuota(
  supabase: any,
  customerId: string,
  leadId: string
) {
  // Get active subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, plan:subscription_plans(*)')
    .eq('customer_id', customerId)
    .eq('status', 'active')
    .single();

  if (!subscription) {
    console.warn('No active subscription for customer:', customerId);
    return;
  }

  const withinQuota = subscription.leads_used_this_period < subscription.leads_quota;
  const isOverage = !withinQuota;

  // Update lead billing status
  await supabase
    .from('leads')
    .update({
      is_within_quota: withinQuota,
      is_charged: true,
      charged_amount: withinQuota ? 0 : subscription.plan.overage_price,
      charged_at: new Date().toISOString()
    })
    .eq('id', leadId);

  // Update subscription usage
  await supabase
    .from('subscriptions')
    .update({
      leads_used_this_period: subscription.leads_used_this_period + 1,
      overage_leads: isOverage ? subscription.overage_leads + 1 : subscription.overage_leads
    })
    .eq('id', subscription.id);

  // If overage, create invoice line item for end of month
  if (isOverage) {
    // This will be processed at end of billing cycle
    console.log('Lead is overage, will be billed:', subscription.plan.overage_price / 100, 'INR');
  }
}

// Helper function to send notifications
async function sendLeadNotifications({
  customerId,
  lead,
  qualification,
  customer
}: {
  customerId: string;
  lead: any;
  qualification: any;
  customer: any;
}) {
  const supabase = createAdminClient();

  // Create in-app notification
  await supabase.from('notifications').insert({
    customer_id: customerId,
    notification_type: 'new_lead',
    title: `New ${qualification.qualification_status === 'hot' ? 'Hot 🔥' : ''} Lead!`,
    message: `${lead.name} just submitted their information. Quality score: ${qualification.quality_score}/100`,
    related_lead_id: lead.id,
    channels: ['in_app', 'email', 'whatsapp'],
    priority: qualification.quality_score >= 80 ? 'high' : 'normal',
    action_url: `/leads/${lead.id}`,
    action_text: 'View Lead'
  });

  // Send WhatsApp notification
  try {
    const message = `🎯 New ${qualification.quality_score >= 80 ? 'Hot 🔥' : ''} Lead Received!

Name: ${lead.name || 'Unknown'}
Phone: ${lead.phone || 'N/A'}
${lead.email ? `Email: ${lead.email}` : ''}
Quality Score: ${qualification.quality_score}/100

${qualification.qualification_reason}

View details: ${process.env.NEXT_PUBLIC_APP_URL}/leads/${lead.id}

⏰ Contact within 1 hour for best results!`;

    await sendWhatsAppNotification(customer.phone, message);
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
  }

  // TODO: Send email notification
}


