import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { scoreAndUpdateLead } from '@/lib/ai/lead-scorer';

// POST - Receive leads from Google Ads (webhook or polling result)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    console.log('Google Ads lead received:', JSON.stringify(body, null, 2));

    const { leadId, campaignId, formData } = body;

    if (!leadId || !formData) {
      return NextResponse.json({ error: 'Invalid lead data' }, { status: 400 });
    }

    // Find customer by campaign
    const { data: campaign } = await supabase
      .from('ad_campaigns')
      .select('customer_id, customers(*)')
      .eq('platform_campaign_id', campaignId)
      .single();

    if (!campaign) {
      console.log('No campaign found for Google campaign_id:', campaignId);
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Extract lead info
    const name = formData.name || formData.full_name || 'Unknown';
    const phone = formData.phone || formData.phone_number || '';
    const email = formData.email || '';

    // Check duplicates
    if (phone || email) {
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('customer_id', campaign.customer_id)
        .or(`phone.eq.${phone},email.eq.${email}`)
        .single();

      if (existingLead) {
        console.log('Duplicate Google lead detected');
        return NextResponse.json({ message: 'Duplicate lead' }, { status: 200 });
      }
    }

    // Create verified lead
    const { data: newLead, error } = await supabase
      .from('leads')
      .insert({
        customer_id: campaign.customer_id,
        name,
        email: email || null,
        phone: phone || null,
        source: 'google_ads',
        platform_lead_id: leadId,
        lead_data: formData,
        quality_score: 70, // Will be AI-scored
        intent: 'warm',
        status: 'new',
        received_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Save Google lead error:', error);
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }

    // AI score
    await scoreAndUpdateLead(newLead.id, formData, campaign.customers.industry, supabase);

    // Create conversation
    const { data: conversation } = await supabase
      .from('conversations')
      .insert({
        lead_id: newLead.id,
        customer_id: campaign.customer_id,
        channel: 'platform_chat',
        status: 'open',
      })
      .select()
      .single();

    // Add system message with form data
    if (conversation) {
      const formDataMessage = Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      await supabase.from('messages').insert({
        conversation_id: conversation.id,
        lead_id: newLead.id,
        customer_id: campaign.customer_id,
        sender: 'system',
        message_text: `Lead submitted Google form:\n\n${formDataMessage}`,
        channel: 'platform_chat',
        status: 'sent',
      });
    }

    // Notify customer
    await supabase.from('notifications').insert({
      customer_id: campaign.customer_id,
      type: 'new_lead',
      title: '🎉 New Lead from Google Ads!',
      message: `${name} submitted their information via Google search`,
      lead_id: newLead.id,
      priority: 'high',
      action_url: `/dashboard/leads/${newLead.id}`,
      action_label: 'View Lead',
    });

    console.log('Google lead saved successfully:', newLead.id);

    return NextResponse.json({
      success: true,
      lead_id: newLead.id,
    });

  } catch (error: any) {
    console.error('Google webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

