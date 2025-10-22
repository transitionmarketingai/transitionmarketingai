import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { conversation_id, message, prospect_phone } = await request.json();

    if (!conversation_id || !message || !prospect_phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send via Twilio WhatsApp API
    const twilioMessage = await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Your Twilio WhatsApp number
      to: `whatsapp:${prospect_phone}`,
      body: message,
    });

    // Save message to database
    const { data: savedMessage, error: dbError } = await supabase
      .from('messages')
      .insert({
        conversation_id,
        sender: 'user',
        message,
        sent_via: 'whatsapp',
        twilio_sid: twilioMessage.sid,
        sent_at: new Date().toISOString(),
        status: 'sent',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversation_id);

    return NextResponse.json({
      success: true,
      message: savedMessage,
      twilio_sid: twilioMessage.sid,
    });
  } catch (error: any) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to send message' 
    }, { status: 500 });
  }
}

