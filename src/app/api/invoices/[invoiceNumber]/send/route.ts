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

    // Send email
    await sendInvoiceEmail({
      to: invoice.clients.email,
      invoice,
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

