import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
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
 * Create Razorpay Payment Link for Invoice
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { invoiceNumber: string } }
) {
  try {
    const invoiceNumber = decodeURIComponent(params.invoiceNumber);

    const supabase = await createClient();

    // Get current user (admin)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get invoice with client details
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select(`
        *,
        clients (
          id,
          company_name,
          email,
          contact_person,
          phone
        )
      `)
      .eq('invoice_number', invoiceNumber)
      .single();

    if (invoiceError || !invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    if (!invoice.clients?.email) {
      return NextResponse.json(
        { error: 'Client email not found' },
        { status: 400 }
      );
    }

    // Create Razorpay payment link
    const razorpay = getRazorpayInstance();
    const paymentLink = await razorpay.paymentLink.create({
      amount: Math.round(invoice.total_amount * 100), // Convert to paise
      currency: 'INR',
      description: `Invoice ${invoice.invoice_number} - ${invoice.clients.company_name}`,
      customer: {
        name: invoice.clients.contact_person || invoice.clients.company_name,
        email: invoice.clients.email,
        contact: invoice.clients.phone || undefined,
      },
      notify: {
        sms: false,
        email: true,
      },
      reminder_enable: true,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/payment/verify?invoice=${invoiceNumber}`,
      callback_method: 'get',
    });

    // Save payment link to invoice
    await supabase
      .from('invoices')
      .update({
        payment_method: 'razorpay',
        transaction_id: paymentLink.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', invoice.id);

    return NextResponse.json({
      success: true,
      payment_link: paymentLink.short_url,
      payment_link_id: paymentLink.id,
      invoice: invoice,
    });

  } catch (error: any) {
    console.error('Payment link creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment link' },
      { status: 500 }
    );
  }
}

