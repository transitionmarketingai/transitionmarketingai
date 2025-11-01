import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateInvoicePDF } from '@/lib/invoices/pdf-generator';
import { sendInvoiceEmail } from '@/lib/invoices/email-sender';

/**
 * Generate Invoice API
 * 
 * Creates an invoice in the database and optionally generates PDF and sends email
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      client_id,
      line_items, // Array of {description, quantity, unit_price}
      invoice_date,
      due_date,
      notes,
      auto_send, // If true, automatically generate PDF and send email
    } = body;

    // Validate required fields
    if (!client_id) {
      return NextResponse.json(
        { error: 'client_id is required' },
        { status: 400 }
      );
    }

    if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
      return NextResponse.json(
        { error: 'line_items array is required' },
        { status: 400 }
      );
    }

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

    // Get client details
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id, company_name, email, contact_person, phone, location')
      .eq('id', client_id)
      .single();

    if (clientError || !client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Calculate amounts
    let subtotal = 0;
    line_items.forEach((item: any) => {
      subtotal += (item.quantity || 1) * (item.unit_price || 0);
    });

    // Calculate tax (18% GST for India)
    const taxRate = 0.18;
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;

    // Generate invoice number (e.g., INV-2024-001)
    const currentYear = new Date().getFullYear();
    const { count } = await supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true })
      .like('invoice_number', `INV-${currentYear}-%`);
    
    const invoiceNumber = `INV-${currentYear}-${String((count || 0) + 1).padStart(3, '0')}`;

    // Create invoice in database
    const invoiceData = {
      client_id,
      invoice_number: invoiceNumber,
      amount: subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      line_items: line_items,
      status: 'draft',
      invoice_date: invoice_date || new Date().toISOString().split('T')[0],
      due_date: due_date || (() => {
        const date = new Date();
        date.setDate(date.getDate() + 30); // 30 days from today
        return date.toISOString().split('T')[0];
      })(),
      notes: notes || null,
      created_by: user.id,
    };

    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert(invoiceData)
      .select()
      .single();

    if (invoiceError) {
      console.error('Invoice creation error:', invoiceError);
      return NextResponse.json(
        { error: 'Failed to create invoice' },
        { status: 500 }
      );
    }

    // Generate PDF if auto_send is true
    let pdfBuffer: Buffer | null = null;
    if (auto_send) {
      try {
        pdfBuffer = await generateInvoicePDF({
          invoice,
          client,
        });
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError);
        // Continue even if PDF fails
      }
    }

    // Send email if auto_send is true
    let emailSent = false;
    if (auto_send && client.email) {
      try {
        await sendInvoiceEmail({
          to: client.email,
          invoice,
          client,
          pdfBuffer,
        });
        emailSent = true;

        // Update invoice status to 'sent'
        await supabase
          .from('invoices')
          .update({ status: 'sent' })
          .eq('id', invoice.id);
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      invoice,
      pdf_generated: !!pdfBuffer,
      email_sent: emailSent,
      message: auto_send 
        ? 'Invoice created and sent successfully' 
        : 'Invoice created successfully',
    }, { status: 201 });

  } catch (error: any) {
    console.error('Invoice generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

