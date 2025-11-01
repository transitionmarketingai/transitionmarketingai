import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyPaymentSignature as verifyRazorpaySignature } from '@/lib/razorpay/client';
import Razorpay from 'razorpay';

// Initialize Razorpay only if keys are available
function getRazorpayInstance() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys not configured');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

/**
 * Verify Razorpay Payment (Webhook/Callback)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, paymentId, signature, invoiceNumber } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const isValid = verifyRazorpaySignature({
      orderId,
      paymentId,
      signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // If invoice number is provided, update invoice status
    if (invoiceNumber) {
      // Get payment details from Razorpay
      const razorpay = getRazorpayInstance();
      const payment = await razorpay.payments.fetch(paymentId);
      
      await supabase
        .from('invoices')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          payment_method: 'razorpay',
          transaction_id: paymentId,
        })
        .eq('invoice_number', invoiceNumber);

      // Get invoice to notify client
      const { data: invoice } = await supabase
        .from('invoices')
        .select(`
          *,
          clients (
            email,
            company_name
          )
        `)
        .eq('invoice_number', invoiceNumber)
        .single();

      // Send payment confirmation email (optional)
      if (invoice?.clients?.email) {
        // You can add email sending here
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
    });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
