import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendBulkWhatsApp, personalizeMessage, formatPhoneForWhatsApp } from '@/lib/messaging/whatsapp';
import { sendBulkEmails, createEmailTemplate, personalizeEmailMessage } from '@/lib/messaging/email';

// POST - Execute outreach campaign (send messages)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId } = body;

    if (!campaignId) {
      return NextResponse.json({ error: 'campaignId is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Get campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('outreach_campaigns')
      .select('*, customers(*)')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    console.log(`Executing outreach campaign: ${campaign.name} (${campaign.type})`);

    // Get target contacts
    let contactIds = campaign.target_contact_ids || [];
    
    // If using filters, fetch contacts
    if (campaign.target_type === 'filter') {
      let query = supabase
        .from('contacts')
        .select('id')
        .eq('customer_id', campaign.customer_id)
        .eq('converted_to_lead', false);

      const filters = campaign.target_filters;
      if (filters.min_quality_score) {
        query = query.gte('quality_score', filters.min_quality_score);
      }
      if (filters.outreach_status) {
        query = query.eq('outreach_status', filters.outreach_status);
      }
      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      const { data: contacts } = await query.limit(campaign.daily_limit || 100);
      contactIds = contacts?.map(c => c.id) || [];
    }

    if (contactIds.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No contacts to send to',
        sent: 0,
      });
    }

    // Fetch full contact details
    const { data: contacts } = await supabase
      .from('contacts')
      .select('*')
      .in('id', contactIds.slice(0, campaign.daily_limit || 100));

    if (!contacts || contacts.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No valid contacts found',
        sent: 0,
      });
    }

    console.log(`Sending to ${contacts.length} contacts...`);

    // Send messages based on type
    let results: any[] = [];

    if (campaign.type === 'whatsapp') {
      results = await sendWhatsAppCampaign(campaign, contacts, supabase);
    } else if (campaign.type === 'email') {
      results = await sendEmailCampaign(campaign, contacts, supabase);
    }

    // Update campaign stats
    const successCount = results.filter(r => r.success).length;

    await supabase
      .from('outreach_campaigns')
      .update({
        sent_count: campaign.sent_count + successCount,
        delivered_count: campaign.delivered_count + results.filter(r => r.delivered).length,
        response_count: campaign.response_count,
        total_cost: campaign.total_cost + (successCount * campaign.cost_per_message),
      })
      .eq('id', campaignId);

    return NextResponse.json({
      success: true,
      campaign_id: campaignId,
      total_contacts: contacts.length,
      sent: successCount,
      failed: results.filter(r => !r.success).length,
    });

  } catch (error: any) {
    console.error('Execute outreach error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Send WhatsApp campaign
async function sendWhatsAppCampaign(campaign: any, contacts: any[], supabase: any) {
  const messages = contacts.map(contact => {
    const personalizedMsg = personalizeMessage(campaign.message_template, {
      name: contact.name,
      company: contact.company || 'your company',
      city: contact.city || 'your city',
      ...campaign.variables,
    });

    return {
      to: formatPhoneForWhatsApp(contact.phone),
      message: personalizedMsg,
    };
  });

  const results = await sendBulkWhatsApp(messages, 1000); // 1 sec delay

  // Save outreach messages to database
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const result = results[i];

    await supabase.from('outreach_messages').insert({
      outreach_campaign_id: campaign.id,
      contact_id: contact.id,
      customer_id: campaign.customer_id,
      channel: 'whatsapp',
      message_content: messages[i].message,
      status: result.success ? 'sent' : 'failed',
      provider_message_id: result.messageId,
      sent_at: new Date().toISOString(),
      error_message: result.error,
    });

    // Update contact
    await supabase
      .from('contacts')
      .update({
        outreach_status: result.success ? 'sent' : 'failed',
        outreach_attempts: contact.outreach_attempts + 1,
        last_outreach_date: new Date().toISOString(),
        last_outreach_channel: 'whatsapp',
      })
      .eq('id', contact.id);
  }

  return results;
}

// Send Email campaign
async function sendEmailCampaign(campaign: any, contacts: any[], supabase: any) {
  const emails = contacts.map(contact => {
    const personalizedMsg = personalizeEmailMessage(campaign.message_template, {
      name: contact.name,
      company: contact.company || 'your company',
      city: contact.city || 'your city',
      business_name: campaign.customers?.business_name || 'our company',
      ...campaign.variables,
    });

    const html = createEmailTemplate(personalizedMsg, {
      name: contact.name,
      business_name: campaign.customers?.business_name || 'Transition Marketing AI',
    });

    return {
      to: contact.email,
      subject: campaign.subject || 'We can help grow your business',
      html,
      text: personalizedMsg,
    };
  });

  const results = await sendBulkEmails(emails, 100); // 100ms delay

  // Save to database
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const result = results[i];

    await supabase.from('outreach_messages').insert({
      outreach_campaign_id: campaign.id,
      contact_id: contact.id,
      customer_id: campaign.customer_id,
      channel: 'email',
      message_content: emails[i].text || campaign.message_template,
      subject: emails[i].subject,
      status: result.success ? 'sent' : 'failed',
      provider_message_id: result.messageId,
      sent_at: new Date().toISOString(),
      error_message: result.error,
    });

    // Update contact
    await supabase
      .from('contacts')
      .update({
        outreach_status: result.success ? 'sent' : 'failed',
        outreach_attempts: contact.outreach_attempts + 1,
        last_outreach_date: new Date().toISOString(),
        last_outreach_channel: 'email',
      })
      .eq('id', contact.id);
  }

  return results;
}

