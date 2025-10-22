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

    const body = await request.json();
    const { planId } = body;

    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get subscription plan
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('plan_id', planId)
      .single();

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Create or get Razorpay customer
    let razorpayCustomerId = null;
    
    // Check if customer already exists in Razorpay
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('razorpay_customer_id')
      .eq('customer_id', customer.id)
      .not('razorpay_customer_id', 'is', null)
      .limit(1)
      .single();

    if (existingSubscription?.razorpay_customer_id) {
      razorpayCustomerId = existingSubscription.razorpay_customer_id;
    } else {
      // Create new Razorpay customer
      const razorpayCustomer = await razorpay.customers.create({
        name: customer.contact_person,
        email: customer.email,
        contact: customer.phone,
        notes: {
          customer_id: customer.id,
          business_name: customer.business_name,
        },
      });
      razorpayCustomerId = razorpayCustomer.id;
    }

    // Create Razorpay subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: `plan_${planId}`, // You'll create plans in Razorpay dashboard
      customer_id: razorpayCustomerId,
      quantity: 1,
      total_count: 12, // 12 months
      customer_notify: 1,
      notes: {
        customer_id: customer.id,
        plan_id: plan.id,
      },
    });

    // Save subscription to database
    const { data: newSubscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        customer_id: customer.id,
        plan_id: plan.id,
        status: 'active',
        razorpay_subscription_id: subscription.id,
        razorpay_customer_id: razorpayCustomerId,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        leads_quota: plan.leads_quota,
        leads_delivered_this_period: 0,
        billing_cycle: 'monthly',
      })
      .select()
      .single();

    if (subscriptionError) {
      console.error('Subscription DB error:', subscriptionError);
      return NextResponse.json(
        { error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    // Update customer's current plan
    await supabase
      .from('customers')
      .update({
        current_plan_id: plan.id,
        subscription_status: 'active',
      })
      .eq('id', customer.id);

    // Create notification
    await supabase.from('notifications').insert({
      customer_id: customer.id,
      type: 'payment',
      title: 'Subscription Activated!',
      message: `Your ${plan.plan_name} subscription is now active. You'll receive ${plan.leads_quota} leads per month.`,
      priority: 'high',
    });

    return NextResponse.json({
      success: true,
      subscription: newSubscription,
      razorpay_subscription_id: subscription.id,
      short_url: subscription.short_url, // Payment link for user
    });

  } catch (error: any) {
    console.error('Create subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


