import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid Razorpay webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);
    const supabase = createAdminClient();

    console.log('Razorpay webhook event:', event.event);

    switch (event.event) {
      case 'subscription.activated':
        await handleSubscriptionActivated(event.payload.subscription.entity, supabase);
        break;

      case 'subscription.charged':
        await handleSubscriptionCharged(event.payload.payment.entity, supabase);
        break;

      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event.payload.subscription.entity, supabase);
        break;

      case 'subscription.paused':
        await handleSubscriptionPaused(event.payload.subscription.entity, supabase);
        break;

      case 'subscription.resumed':
        await handleSubscriptionResumed(event.payload.subscription.entity, supabase);
        break;

      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity, supabase);
        break;

      default:
        console.log('Unhandled Razorpay event:', event.event);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Razorpay webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// Helper functions
async function handleSubscriptionActivated(subscription: any, supabase: any) {
  await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('razorpay_subscription_id', subscription.id);
}

async function handleSubscriptionCharged(payment: any, supabase: any) {
  // Payment successful - subscription continues
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, customers(*)')
    .eq('razorpay_subscription_id', payment.subscription_id)
    .single();

  if (subscription) {
    // Update subscription period
    await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        leads_delivered_this_period: 0, // Reset quota
        overage_leads: 0,
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscription.id);

    // Create notification
    await supabase.from('notifications').insert({
      customer_id: subscription.customer_id,
      type: 'payment',
      title: 'Payment Successful!',
      message: `Your subscription has been renewed. Lead quota reset to ${subscription.leads_quota}.`,
      priority: 'normal',
    });
  }
}

async function handleSubscriptionCancelled(subscription: any, supabase: any) {
  await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('razorpay_subscription_id', subscription.id);

  // Update customer status
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('customer_id')
    .eq('razorpay_subscription_id', subscription.id)
    .single();

  if (sub) {
    await supabase
      .from('customers')
      .update({ subscription_status: 'cancelled' })
      .eq('id', sub.customer_id);

    // Pause all campaigns
    await supabase
      .from('campaigns')
      .update({ status: 'paused' })
      .eq('customer_id', sub.customer_id)
      .eq('status', 'active');
  }
}

async function handleSubscriptionPaused(subscription: any, supabase: any) {
  await supabase
    .from('subscriptions')
    .update({
      status: 'paused',
      updated_at: new Date().toISOString(),
    })
    .eq('razorpay_subscription_id', subscription.id);
}

async function handleSubscriptionResumed(subscription: any, supabase: any) {
  await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('razorpay_subscription_id', subscription.id);
}

async function handlePaymentFailed(payment: any, supabase: any) {
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, customers(*)')
    .eq('razorpay_subscription_id', payment.subscription_id)
    .single();

  if (subscription) {
    await supabase
      .from('subscriptions')
      .update({
        status: 'past_due',
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscription.id);

    // Notify customer
    await supabase.from('notifications').insert({
      customer_id: subscription.customer_id,
      type: 'payment',
      title: 'Payment Failed',
      message: 'Your payment could not be processed. Please update your payment method to continue receiving leads.',
      priority: 'urgent',
      action_url: '/dashboard/billing',
      action_label: 'Update Payment',
    });
  }
}
