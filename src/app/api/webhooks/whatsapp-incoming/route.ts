import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Parse Twilio webhook data
    const formData = await request.formData();
    const from = formData.get('From')?.toString().replace('whatsapp:', '') || '';
    const body = formData.get('Body')?.toString() || '';
    const messageSid = formData.get('MessageSid')?.toString() || '';

    if (!from || !body) {
      return NextResponse.json({ error: 'Invalid webhook data' }, { status: 400 });
    }

    const supabase = await createClient();

    // Find conversation by prospect phone
    const { data: conversation } = await supabase
      .from('conversations')
      .select('*, customers(id, user_id)')
      .eq('prospect_phone', from)
      .eq('status', 'active')
      .single();

    if (!conversation) {
      console.log('No active conversation found for:', from);
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Save incoming message
    const { data: savedMessage, error: msgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        sender: 'prospect',
        message: body,
        sent_via: 'whatsapp',
        twilio_sid: messageSid,
        sent_at: new Date().toISOString(),
        status: 'received',
      })
      .select()
      .single();

    if (msgError) {
      console.error('Save message error:', msgError);
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    // Update conversation
    await supabase
      .from('conversations')
      .update({ 
        last_message_at: new Date().toISOString(),
        unread_count: (conversation.unread_count || 0) + 1,
      })
      .eq('id', conversation.id);

    // Trigger AI analysis in background
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ai/suggest-reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation_id: conversation.id,
        latest_message: body,
      }),
    }).catch(err => console.error('AI analysis error:', err));

    // Send notification to user
    // TODO: Push notification, email, or in-app notification

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Twilio requires GET endpoint for webhook validation
export async function GET(request: NextRequest) {
  return NextResponse.json({ status: 'WhatsApp webhook active' });
}

