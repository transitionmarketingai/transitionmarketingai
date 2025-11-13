/**
 * Webhook Endpoint for Automation (Airtable, Google Sheets, CRM, WhatsApp)
 * 
 * Accepts POST requests with lead data and forwards to configured webhooks
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createSuccessResponse,
  createErrorResponse,
  validateRequiredFields,
} from '@/lib/apiHelpers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const validation = validateRequiredFields(body, ['event', 'data']);
    if (!validation.isValid) {
      return NextResponse.json(
        createErrorResponse(`Missing required fields: ${validation.missingFields.join(', ')}`),
        { status: 400 }
      );
    }

    const { event, data } = body;

    // Airtable webhook (if configured)
    if (process.env.AIRTABLE_WEBHOOK_URL) {
      try {
        await fetch(process.env.AIRTABLE_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY || ''}`,
          },
          body: JSON.stringify({
            fields: {
              Name: data.name,
              Email: data.email,
              Phone: data.phone,
              Industry: data.industry,
              City: data.city,
              Score: data.score,
              'UTM Source': data.utm_source || '',
              'UTM Medium': data.utm_medium || '',
              'UTM Campaign': data.utm_campaign || '',
              'Event Type': event,
              'Timestamp': new Date().toISOString(),
            },
          }),
        });
      } catch (airtableError) {
        console.error('[Webhook] Airtable error:', airtableError);
      }
    }

    // Google Sheets webhook (if configured)
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            values: [
              [
                new Date().toISOString(),
                data.name,
                data.email,
                data.phone,
                data.industry,
                data.city,
                data.score,
                data.utm_source || '',
                data.utm_medium || '',
                data.utm_campaign || '',
                event,
              ],
            ],
          }),
        });
      } catch (sheetsError) {
        console.error('[Webhook] Google Sheets error:', sheetsError);
      }
    }

    // WhatsApp automation webhook (for future use)
    if (process.env.WHATSAPP_WEBHOOK_URL && event === 'onboarding_submit') {
      try {
        await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: data.phone,
            message: `Hi ${data.name}, thank you for your interest! We'll review your submission and get back to you within 24 hours.`,
            type: 'onboarding_confirmation',
          }),
        });
      } catch (whatsappError) {
        console.error('[Webhook] WhatsApp error:', whatsappError);
      }
    }

    return NextResponse.json(createSuccessResponse({ message: 'Webhook processed' }));
  } catch (error: any) {
    console.error('[Webhook] Unexpected error:', error);
    return NextResponse.json(
      createErrorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}

