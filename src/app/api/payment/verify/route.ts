import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyPaymentSignature } from '@/lib/razorpay/client';

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await request.json();

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      );
    }

    // Verify signature
    const isValid = verifyPaymentSignature({
      orderId,
      paymentId,
      signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature', success: false },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Update payment status
    const { error: updateError } = await supabase
      .from('payments')
      .update({
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', orderId);

    if (updateError) {
      console.error('Payment update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update payment status', success: false },
        { status: 500 }
      );
    }

    // Get payment details to activate client
    const { data: payment } = await supabase
      .from('payments')
      .select('*, clients(*)')
      .eq('razorpay_order_id', orderId)
      .single();

    if (payment && (payment.clients as any)) {
      // Activate client
      await supabase
        .from('clients')
        .update({ status: 'active' })
        .eq('id', (payment.clients as any).id);

      // Update plan status to active
      await supabase
        .from('custom_plans')
        .update({ status: 'active' })
        .eq('client_id', (payment.clients as any).id);

      // Send activation WhatsApp
      try {
        const { sendWhatsAppTemplate, formatPhoneForWhatsApp } = await import('@/lib/whatsapp/notifications');
        if ((payment.clients as any).phone) {
          await sendWhatsAppTemplate(
            formatPhoneForWhatsApp((payment.clients as any).phone),
            'welcome_onboarding',
            {
              customerName: (payment.clients as any).contact_person,
              planName: 'Your Plan',
              quota: '0',
              dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/dashboard`,
            }
          );
        }
      } catch (whatsappError) {
        console.error('WhatsApp send error:', whatsappError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId,
    });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed', success: false },
      { status: 500 }
    );
  }
}

