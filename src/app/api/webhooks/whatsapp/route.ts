import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// POST - Receive WhatsApp responses from Twilio
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const supabase = createAdminClient();

    // Twilio sends form data, not JSON
    const from = formData.get('From')?.toString() || '';
    const body = formData.get('Body')?.toString() || '';
    const messageId = formData.get('MessageSid')?.toString() || '';

    console.log('WhatsApp response received:', { from, body, messageId });

    // Clean phone number
    const phone = from.replace('whatsapp:', '');

    // Find contact by phone
    const { data: contact } = await supabase
      .from('contacts')
      .select('*, customers(*)')
      .eq('phone', phone)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!contact) {
      console.log('No contact found for phone:', phone);
      // Could also check leads table if already converted
      const { data: lead } = await supabase
        .from('leads')
        .select('*, conversations(*)')
        .eq('phone', phone)
        .single();

      if (lead && lead.conversations) {
        // Add message to existing conversation
        await supabase.from('messages').insert({
          conversation_id: lead.conversations.id,
          lead_id: lead.id,
          customer_id: lead.customer_id,
          sender: 'lead',
          message_text: body,
          channel: 'whatsapp',
          status: 'delivered',
          sent_at: new Date().toISOString(),
          delivered_at: new Date().toISOString(),
        });

        // Update conversation
        await supabase
          .from('conversations')
          .update({
            last_message_at: new Date().toISOString(),
            last_message_preview: body,
            unread_count: lead.conversations.unread_count + 1,
          })
          .eq('id', lead.conversations.id);

        // Notify customer
        await supabase.from('notifications').insert({
          customer_id: lead.customer_id,
          type: 'new_lead',
          title: 'New Message',
          message: `${lead.name} replied: "${body.substring(0, 50)}..."`,
          lead_id: lead.id,
          priority: 'high',
        });
      }

      return NextResponse.json({ received: true });
    }

    // Find most recent outreach message
    const { data: outreachMsg } = await supabase
      .from('outreach_messages')
      .select('*')
      .eq('contact_id', contact.id)
      .order('sent_at', { ascending: false })
      .limit(1)
      .single();

    if (outreachMsg) {
      // Update outreach message with response
      await supabase
        .from('outreach_messages')
        .update({
          response_received: true,
          response_text: body,
          response_timestamp: new Date().toISOString(),
          status: 'responded',
        })
        .eq('id', outreachMsg.id);

      // Update contact
      await supabase
        .from('contacts')
        .update({
          outreach_status: 'responded',
        })
        .eq('id', contact.id);

      // AUTO-CONVERT: Contact → Lead
      // This will be triggered by the database trigger we created!
      // The trigger auto_convert_on_response will:
      // 1. Create lead
      // 2. Update contact (converted_to_lead = true)
      // 3. Create conversation
      
      console.log('Contact responded - auto-conversion triggered');
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

