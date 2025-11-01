import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateInvoicePDF } from '@/lib/invoices/pdf-generator';

/**
 * Download Invoice PDF
 */
export async function GET(
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

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF({
      invoice,
      client: invoice.clients,
    });

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${invoiceNumber}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error('PDF download error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

