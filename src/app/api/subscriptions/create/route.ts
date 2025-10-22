import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    // Initialize Razorpay inside the function
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan_id, billing_cycle } = await request.json();

    if (!plan_id || !['monthly', 'annual'].includes(billing_cycle)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    // Get plan details
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', plan_id)
      .single();

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    // Calculate amount (in paise for Razorpay)
    const amount = billing_cycle === 'annual' 
      ? plan.price_inr * 12 * 0.83 * 100 // 17% discount
      : plan.price_inr * 100;

    // Create Razorpay subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env[`RAZORPAY_PLAN_${plan.name.toUpperCase()}_${billing_cycle.toUpperCase()}`] as string,
      customer_notify: 1,
      quantity: 1,
      total_count: billing_cycle === 'annual' ? 1 : 12,
      notes: {
        customer_id: user.id,
        plan_name: plan.name,
        billing_cycle,
      },
    });

    // Save to database
    const { data: dbSubscription, error: dbError } = await supabase
      .from('subscriptions')
      .insert({
        customer_id: user.id,
        plan_id: plan.id,
        razorpay_subscription_id: subscription.id,
        status: 'created',
        billing_cycle,
        amount: amount / 100,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + (billing_cycle === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
    }

    return NextResponse.json({
      subscription_id: subscription.id,
      razorpay_key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount,
      currency: 'INR',
      name: 'Transition Marketing AI',
      description: `${plan.name} Plan - ${billing_cycle}`,
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

