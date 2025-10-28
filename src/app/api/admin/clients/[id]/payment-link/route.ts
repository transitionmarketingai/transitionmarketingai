import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createRazorpayOrder, createRazorpayCustomer, rupeesToPaise } from '@/lib/razorpay/client';
import { sendWhatsAppTemplate } from '@/lib/whatsapp/notifications';
import { formatPhoneForWhatsApp } from '@/lib/whatsapp/notifications';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const clientId = params.id;
    const body = await request.json();
    const { amount, description, plan_id } = body;

    // Check admin auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch client details
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single();

    if (clientError || !client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Create or fetch Razorpay customer
    const customerResult = await createRazorpayCustomer({
      name: client.business_name || client.contact_person,
      email: client.email,
      contact: client.phone.replace(/\D/g, '').slice(-10), // Last 10 digits
      notes: {
        client_id: clientId,
        business_name: client.business_name,
      },
    });

    if (!customerResult.success) {
      return NextResponse.json(
        { error: 'Failed to create payment customer' },
        { status: 500 }
      );
    }

    const razorpayCustomerId = customerResult.customer.id;

    // Create Razorpay order
    const orderResult = await createRazorpayOrder({
      amount: rupeesToPaise(amount),
      currency: 'INR',
      receipt: `INV-${Date.now()}-${clientId}`,
      notes: {
        client_id: clientId,
        description: description || 'Monthly subscription payment',
        plan_id: plan_id || null,
      },
    });

    if (!orderResult.success) {
      return NextResponse.json(
        { error: 'Failed to create payment order' },
        { status: 500 }
      );
    }

    // Save payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        client_id: clientId,
        razorpay_order_id: orderResult.order.id,
        razorpay_customer_id: razorpayCustomerId,
        amount: amount,
        status: 'pending',
        description: description || 'Monthly subscription',
        currency: 'INR',
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error saving payment:', paymentError);
    }

    // Update client with Razorpay customer ID
    await supabase
      .from('clients')
      .update({ razorpay_customer_id: razorpayCustomerId })
      .eq('id', clientId);

    // Send WhatsApp payment link
    if (client.phone) {
      const paymentUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/payment/${orderResult.order.id}`;
      
      try {
        await sendWhatsAppTemplate(
          formatPhoneForWhatsApp(client.phone),
          'payment_due',
          {
            customerName: client.contact_person,
            amount: `₹${amount.toLocaleString('en-IN')}`,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
            paymentUrl: paymentUrl,
          }
        );
      } catch (whatsappError) {
        console.error('WhatsApp send error:', whatsappError);
        // Don't fail the request if WhatsApp fails
      }
    }

    return NextResponse.json({
      success: true,
      order_id: orderResult.order.id,
      amount: orderResult.order.amount,
      currency: orderResult.order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      customer_id: razorpayCustomerId,
      payment_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/payment/${orderResult.order.id}`,
    });

  } catch (error: any) {
    console.error('Payment link creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment link' },
      { status: 500 }
    );
  }
}

