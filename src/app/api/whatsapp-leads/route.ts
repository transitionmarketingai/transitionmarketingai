import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/tracking';

interface WhatsAppLeadData {
  phoneNumber: string;
  name: string;
  date_time?: string;
  messageType: 'confirmation' | 'reminder' | 'followup';
  customMessage?: string;
}

/**
 * Send WhatsApp message via Interakt API
 * Supports confirmation, reminder, and follow-up messages
 */
export async function POST(request: NextRequest) {
  try {
    const body: WhatsAppLeadData = await request.json();
    const { phoneNumber, name, date_time, messageType, customMessage } = body;

    // Validate required fields
    if (!phoneNumber || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: phoneNumber and name' },
        { status: 400 }
      );
    }

    // Get Interakt API token
    const interaktToken = process.env.INTERAKT_API_TOKEN;
    if (!interaktToken) {
      console.error('[WhatsApp] INTERAKT_API_TOKEN not configured');
      return NextResponse.json(
        { success: false, error: 'WhatsApp service not configured' },
        { status: 500 }
      );
    }

    // Format phone number (ensure it starts with +91)
    let formattedPhone = phoneNumber.trim();
    if (!formattedPhone.startsWith('+')) {
      if (formattedPhone.startsWith('91')) {
        formattedPhone = '+' + formattedPhone;
      } else {
        formattedPhone = '+91' + formattedPhone.replace(/^0+/, '');
      }
    }

    // Build message based on type
    let message = '';
    let analyticsEvent = '';

    switch (messageType) {
      case 'confirmation':
        message = `Hi ${name}, 👋

Thanks for booking your free strategy call with Transition Marketing AI!

✅ We've received your details and are preparing your custom AI Marketing Report.
📅 Call Details: ${date_time || "We'll confirm shortly"}.

Before the call, you'll get a short summary of how many verified leads we can deliver for your business.

See you soon!
— The Transition Marketing AI Team`;
        analyticsEvent = 'lead_confirmation_sent';
        break;

      case 'reminder':
        message = `Hey ${name}, reminder for your Transition Marketing AI strategy call in 1 hour ⏰

We'll review your business goals and show you how our Verified Leads Launch Program works.

Reply *Ready* if you'd like to reschedule.`;
        analyticsEvent = 'lead_reminder_sent';
        break;

      case 'followup':
        message = customMessage || `Hi ${name}, great speaking with you today! 🙌

Your custom verified lead proposal is being finalized — expect it within 24 hours.

Reply *Quote* if you'd like it sooner.`;
        analyticsEvent = 'lead_followup_sent';
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid messageType. Must be: confirmation, reminder, or followup' },
          { status: 400 }
        );
    }

    // Send message via Interakt API
    const interaktResponse = await fetch('https://api.interakt.ai/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${interaktToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: formattedPhone,
        type: 'text',
        message: message,
      }),
    });

    if (!interaktResponse.ok) {
      const errorText = await interaktResponse.text();
      console.error('[WhatsApp] Interakt API error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to send WhatsApp message' },
        { status: 500 }
      );
    }

    const interaktData = await interaktResponse.json();

    // Fire analytics event
    if (analyticsEvent) {
      // Track server-side (if you have server-side tracking setup)
      // For now, we'll log it and the client can track it
      console.log(`[Analytics] ${analyticsEvent}`, { phoneNumber: formattedPhone, name });
    }

    return NextResponse.json({
      success: true,
      message: 'WhatsApp message sent successfully',
      data: {
        phoneNumber: formattedPhone,
        messageType,
        analyticsEvent,
      },
    });
  } catch (error) {
    console.error('[WhatsApp] Error sending message:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function GET() {
  const hasToken = !!process.env.INTERAKT_API_TOKEN;
  return NextResponse.json({
    success: true,
    configured: hasToken,
    message: hasToken
      ? 'WhatsApp service is configured'
      : 'INTERAKT_API_TOKEN not set',
  });
}

