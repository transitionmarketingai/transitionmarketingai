import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      teamId,
      planId,
    } = body;

    // Verify Razorpay signature
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!razorpaySecret) {
      return NextResponse.json(
        { error: 'Razorpay not configured' },
        { status: 500 }
      );
    }

    const generatedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Payment verified! Now create subscription record
    const planAmounts: Record<string, number> = {
      starter: 4999,
      growth: 12999,
      enterprise: 24999,
    };

    const amount = planAmounts[planId] || 4999;

    // Create subscription in database
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: teamId,
        plan_id: planId,
        status: 'active',
        amount: amount,
        currency: 'INR',
        payment_provider: 'razorpay',
        payment_provider_subscription_id: razorpay_payment_id,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      })
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      );
    }

    // Update user credits based on plan
    const creditsToAdd: Record<string, number> = {
      starter: 1000,
      growth: 3000,
      enterprise: 10000,
    };

    await supabase
      .from('profiles')
      .update({ 
        credits: creditsToAdd[planId] || 1000,
        plan: planId 
      })
      .eq('id', teamId);

    // Log transaction
    await supabase.from('credit_transactions').insert({
      user_id: teamId,
      amount: creditsToAdd[planId] || 1000,
      type: 'purchase',
      description: `${planId} plan subscription`,
      reference_id: razorpay_payment_id,
    });

    return NextResponse.json({
      success: true,
      subscription: data,
      message: 'Payment verified and subscription activated',
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
