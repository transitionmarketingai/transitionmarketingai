import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { trackEvent } from '@/lib/tracking';

/**
 * Razorpay Webhook Handler
 * Handles real-time payment and subscription updates
 * No admin auth required (webhook signature verification instead)
 */
export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('[Razorpay Webhook] RAZORPAY_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Get signature from headers
    const signature = request.headers.get('x-razorpay-signature');
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Get raw body
    const body = await request.text();
    
    // Verify signature
    const expectedSignature = createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('[Razorpay Webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Parse webhook payload
    const payload = JSON.parse(body);
    const event = payload.event;
    const payment = payload.payload?.payment?.entity;
    const subscription = payload.payload?.subscription?.entity;

    console.log('[Razorpay Webhook] Event received:', event);

    // Update Airtable based on event type
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (airtableApiKey && airtableBaseId && payment) {
      try {
        // Extract client record ID from payment notes or subscription notes
        const clientRecordId = payment.notes?.client_record_id || 
                               subscription?.notes?.client_recordId ||
                               payment.notes?.clientRecordId;

        if (clientRecordId) {
          // Calculate next renewal date
          let nextRenewalDate = new Date();
          if (event === 'payment.captured' || event === 'subscription.charged') {
            // Add 30 days for monthly, 90 for quarterly, 365 for yearly
            const period = subscription?.notes?.period || 'monthly';
            if (period === 'monthly') {
              nextRenewalDate.setDate(nextRenewalDate.getDate() + 30);
            } else if (period === 'quarterly') {
              nextRenewalDate.setDate(nextRenewalDate.getDate() + 90);
            } else if (period === 'yearly') {
              nextRenewalDate.setDate(nextRenewalDate.getDate() + 365);
            }
          }

          // Update Airtable client record
          const updateResponse = await fetch(
            `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}/${clientRecordId}`,
            {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${airtableApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fields: {
                  'Billing Status': event === 'payment.captured' || event === 'subscription.charged' 
                    ? 'Active' 
                    : event === 'payment.failed' || event === 'subscription.payment_failed'
                    ? 'Failed'
                    : 'Paused',
                  'Last Payment': payment.created_at ? new Date(payment.created_at * 1000).toISOString() : undefined,
                  'Next Renewal': nextRenewalDate.toISOString().split('T')[0],
                  'Payment Amount': payment.amount ? payment.amount / 100 : undefined, // Convert paise to rupees
                  'Razorpay Subscription ID': subscription?.id || undefined,
                  'Razorpay Payment ID': payment.id || undefined,
                },
              }),
            }
          );

          if (updateResponse.ok) {
            console.log('[Razorpay Webhook] Airtable updated successfully');
          } else {
            console.error('[Razorpay Webhook] Airtable update failed:', await updateResponse.text());
          }
        }

        // Fire analytics events
        if (event === 'payment.captured' || event === 'subscription.charged') {
          trackEvent('subscription_payment_success', {
            event_category: 'billing',
            event_label: 'razorpay_payment_success',
            payment_id: payment.id,
            amount: payment.amount ? payment.amount / 100 : 0,
          });
        } else if (event === 'payment.failed' || event === 'subscription.payment_failed') {
          trackEvent('subscription_payment_failed', {
            event_category: 'billing',
            event_label: 'razorpay_payment_failed',
            payment_id: payment.id,
            amount: payment.amount ? payment.amount / 100 : 0,
          });
        }

        // Optional: Send notifications
        if (event === 'payment.captured' || event === 'subscription.charged') {
          await notifyNewPayment(payment, subscription);
        }
      } catch (airtableError) {
        console.error('[Razorpay Webhook] Error updating Airtable:', airtableError);
        // Continue even if Airtable update fails
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Razorpay Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Notify about new payment (Slack/Discord/WhatsApp)
 */
async function notifyNewPayment(payment: any, subscription: any) {
  const slackWebhook = process.env.SLACK_WEBHOOK_URL;
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  const whatsappApiKey = process.env.INTERAKT_API_TOKEN;
  const clientPhone = payment.notes?.phone || subscription?.notes?.phone;

  // Slack notification
  if (slackWebhook) {
    try {
      await fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `💰 Payment Received`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Payment Received*\n*Client:* ${payment.notes?.clientName || 'N/A'}\n*Amount:* ₹${payment.amount ? (payment.amount / 100).toLocaleString() : '0'}\n*Payment ID:* ${payment.id}`,
              },
            },
          ],
        }),
      });
    } catch (error) {
      console.error('[Razorpay Webhook] Slack notification error:', error);
    }
  }

  // Discord notification
  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `💰 Payment Received`,
          embeds: [
            {
              title: 'Payment Received',
              fields: [
                { name: 'Client', value: payment.notes?.clientName || 'N/A', inline: true },
                { name: 'Amount', value: `₹${payment.amount ? (payment.amount / 100).toLocaleString() : '0'}`, inline: true },
                { name: 'Payment ID', value: payment.id || 'N/A', inline: false },
              ],
              color: 0x00ff00,
            },
          ],
        }),
      });
    } catch (error) {
      console.error('[Razorpay Webhook] Discord notification error:', error);
    }
  }

  // WhatsApp notification to client
  if (whatsappApiKey && clientPhone) {
    try {
      const formattedPhone = clientPhone.startsWith('+') ? clientPhone : `+91${clientPhone}`;
      await fetch('https://api.interakt.ai/v1/messages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${whatsappApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          type: 'text',
          message: `Payment Received ✅\n\nHi ${payment.notes?.clientName || 'there'}, your payment of ₹${payment.amount ? (payment.amount / 100).toLocaleString() : '0'} has been successfully processed.\n\nThank you for your subscription!\n\n— Transition Marketing AI Team`,
        }),
      });
    } catch (error) {
      console.error('[Razorpay Webhook] WhatsApp notification error:', error);
    }
  }
}

