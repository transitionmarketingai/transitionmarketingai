import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWhatsAppNotification } from '@/lib/whatsapp/notifications';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { conversation_id, lead_id, channel, content } = await req.json();

    if (!conversation_id || !lead_id || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get customer info
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Get lead info
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .eq('customer_id', customer.id)
      .single();

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Save message to database
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert({
        conversation_id,
        lead_id,
        sender_type: 'customer',
        sender_id: customer.id,
        channel,
        content,
        content_type: 'text',
        status: 'sent'
      })
      .select()
      .single();

    if (messageError) {
      console.error('Error saving message:', messageError);
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    // Send via appropriate channel
    let sent = false;
    let externalMessageId = null;

    if (channel === 'whatsapp' && lead.phone) {
      const result = await sendWhatsAppNotification(lead.phone, content);
      sent = result.success;
      externalMessageId = result.messageId;

      if (!sent) {
        console.error('WhatsApp send failed:', result.error);
      }
    } else if (channel === 'email' && lead.email) {
      // TODO: Send email
      // const result = await sendEmail(lead.email, content);
      sent = true;
    } else if (channel === 'sms' && lead.phone) {
      // TODO: Send SMS
      sent = true;
    }

    // Update message status
    if (sent) {
      await supabase
        .from('messages')
        .update({
          status: 'delivered',
          delivered_at: new Date().toISOString(),
          whatsapp_message_id: externalMessageId
        })
        .eq('id', message.id);
    } else {
      await supabase
        .from('messages')
        .update({
          status: 'failed',
          failed_reason: 'Failed to send via external service'
        })
        .eq('id', message.id);
    }

    // Update conversation
    await supabase
      .from('conversations')
      .update({
        last_message_at: new Date().toISOString(),
        last_message_from: 'customer',
        message_count: supabase.raw('message_count + 1')
      })
      .eq('id', conversation_id);

    // Update lead engagement
    if (!lead.first_contact_at) {
      await supabase
        .from('leads')
        .update({
          first_contact_at: new Date().toISOString(),
          status: 'contacted'
        })
        .eq('id', lead_id);
    }

    await supabase
      .from('leads')
      .update({
        last_contact_at: new Date().toISOString(),
        total_messages_exchanged: (lead.total_messages_exchanged || 0) + 1
      })
      .eq('id', lead_id);

    // Log activity
    await supabase.from('lead_activities').insert({
      lead_id,
      customer_id: customer.id,
      activity_type: channel === 'whatsapp' ? 'whatsapp_sent' : 'email_sent',
      activity_description: `Message sent to lead via ${channel}`,
      metadata: { message_id: message.id, content_preview: content.substring(0, 50) }
    });

    return NextResponse.json({
      success: true,
      message_id: message.id,
      status: sent ? 'delivered' : 'failed'
    });

  } catch (error) {
    console.error('Messaging error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


