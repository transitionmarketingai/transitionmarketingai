import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const supabase = createClient();
    const orderId = params.orderId;

    // Fetch payment details from database
    const { data: payment, error } = await supabase
      .from('payments')
      .select(`
        *,
        clients (
          email,
          phone,
          business_name
        )
      `)
      .eq('razorpay_order_id', orderId)
      .single();

    if (error || !payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order_id: payment.razorpay_order_id,
      amount: payment.amount * 100, // Convert to paise
      currency: payment.currency || 'INR',
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      description: payment.description || 'Lead Generation Service',
      customer_email: (payment.clients as any)?.email,
      customer_phone: (payment.clients as any)?.phone,
    });

  } catch (error: any) {
    console.error('Payment order fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch payment details' },
      { status: 500 }
    );
  }
}

