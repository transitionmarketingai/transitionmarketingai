import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      teamId, 
      planId 
    } = body;

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update payment record
    const { error: paymentError } = await supabaseAdmin
      .from('payments')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: 'completed'
      })
      .eq('razorpay_order_id', razorpay_order_id);

    if (paymentError) {
      console.error('Error updating payment:', paymentError);
      return NextResponse.json(
        { error: 'Failed to update payment record' },
        { status: 500 }
      );
    }

    // Update team subscription
    const { error: subscriptionError } = await supabaseAdmin
      .from('subscriptions')
      .update({
        razorpay_plan_id: planId,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })
      .eq('team_id', teamId);

    if (subscriptionError) {
      console.error('Error updating subscription:', subscriptionError);
      
      // Revert payment status
      await supabaseAdmin
        .from('payments')
        .update({ status: 'failed' })
        .eq('razorpay_order_id', razorpay_order_id);

      return NextResponse.json(
        { error: 'Failed to activate subscription' },
        { status: 500 }
      );
    }

    // Update team plan
    const { error: teamError } = await supabaseAdmin
      .from('teams')
      .update({
        plan_id: planId,
        subscription_status: 'active',
        plan_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })
      .eq('id', teamId);

    if (teamError) {
      console.error('Error updating team:', teamError);
      return NextResponse.json(
        { error: 'Failed to update team plan' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Payment verified and subscription activated' 
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
