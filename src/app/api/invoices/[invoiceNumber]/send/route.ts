import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateInvoicePDF } from '@/lib/invoices/pdf-generator';
import { sendInvoiceEmail } from '@/lib/invoices/email-sender';

/**
 * Send Invoice via Email
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { invoiceNumber: string } }
) {
  try {
    const invoiceNumber = decodeURIComponent(params.invoiceNumber);

    const supabase = await createClient();

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
          phone,
          location
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

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF({
      invoice,
      client: invoice.clients,
    });

    // Create payment link if invoice is not paid
    let paymentLink = null;
    if (invoice.status !== 'paid' && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const Razorpay = (await import('razorpay')).default;
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const paymentLinkResponse = await razorpay.paymentLink.create({
          amount: Math.round(invoice.total_amount * 100),
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
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/payment/verify?invoice=${invoice.invoice_number}`,
          callback_method: 'get',
        });

        paymentLink = paymentLinkResponse.short_url;

        // Save payment link to invoice
        await supabase
          .from('invoices')
          .update({
            transaction_id: paymentLinkResponse.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', invoice.id);
      } catch (paymentLinkError) {
        console.error('Payment link creation error (non-critical):', paymentLinkError);
        // Continue even if payment link creation fails
      }
    }

    // Attach payment link to invoice object for email
    const invoiceWithPaymentLink = {
      ...invoice,
      transaction_id: paymentLink || invoice.transaction_id,
    };

    // Send email
    await sendInvoiceEmail({
      to: invoice.clients.email,
      invoice: invoiceWithPaymentLink,
      client: invoice.clients,
      pdfBuffer,
    });

    // Update invoice status to 'sent'
    await supabase
      .from('invoices')
      .update({ status: 'sent' })
      .eq('id', invoice.id);

    return NextResponse.json({
      success: true,
      message: 'Invoice sent successfully',
    });

  } catch (error: any) {
    console.error('Send invoice error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

