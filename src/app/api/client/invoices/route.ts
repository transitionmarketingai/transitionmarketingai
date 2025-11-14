import { NextRequest, NextResponse } from 'next/server';
import { requireClientAuth, getClientToken, verifyClientToken } from '@/lib/clientAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Get client's invoices from Razorpay
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const authError = requireClientAuth(request);
    if (authError) {
      return authError;
    }

    const token = getClientToken(request);
    if (!token) {
      return NextResponse.json(
        createErrorResponse('Token not found'),
        { status: 401 }
      );
    }

    const payload = verifyClientToken(token);
    if (!payload) {
      return NextResponse.json(
        createErrorResponse('Invalid token'),
        { status: 401 }
      );
    }

    // Fetch client email from Airtable
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    const clientResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}/${payload.clientRecordId}`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!clientResponse.ok) {
      return NextResponse.json(
        createErrorResponse('Failed to fetch client data'),
        { status: 500 }
      );
    }

    const clientData = await clientResponse.json();
    const clientEmail = clientData.fields.Email || payload.email;

    // Fetch invoices from Razorpay
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        createErrorResponse('Razorpay not configured'),
        { status: 500 }
      );
    }

    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    try {
      // Fetch invoices by customer email
      // Note: Razorpay API might require customer ID instead of email
      // This is a simplified version - you may need to fetch customer first
      const invoices = await razorpay.invoices.all({
        count: 100,
      });

      // Filter invoices by email (if Razorpay supports it)
      // Otherwise, you might need to store invoice IDs in Airtable
      const clientInvoices = invoices.items
        .filter((invoice: any) => {
          // Try to match by email or customer ID stored in Airtable
          return invoice.customer_email === clientEmail || 
                 invoice.customer_id === clientData.fields['Razorpay Customer ID'];
        })
        .map((invoice: any) => ({
          id: invoice.id,
          invoiceNumber: invoice.invoice_number || invoice.id,
          amount: invoice.amount / 100, // Convert paise to rupees
          currency: invoice.currency || 'INR',
          status: invoice.status,
          date: new Date(invoice.created_at * 1000).toISOString(),
          dueDate: invoice.expire_by ? new Date(invoice.expire_by * 1000).toISOString() : null,
          url: invoice.short_url || invoice.url,
          description: invoice.description || '',
        }))
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Fire analytics event
      trackEvent('client_view_invoice', {
        event_category: 'client',
        event_label: 'invoices_viewed',
        client_id: payload.clientRecordId,
        invoice_count: clientInvoices.length,
      });

      return NextResponse.json(createSuccessResponse({ invoices: clientInvoices }));
    } catch (razorpayError: any) {
      console.error('[Client Invoices] Razorpay error:', razorpayError);
      // Return empty array if Razorpay fails (graceful degradation)
      return NextResponse.json(createSuccessResponse({ invoices: [] }));
    }
  } catch (error: any) {
    console.error('[Client Invoices] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

