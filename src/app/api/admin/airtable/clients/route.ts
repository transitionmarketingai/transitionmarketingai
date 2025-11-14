import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

/**
 * Fetch clients from Airtable
 * Requires admin authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const showOverdue = searchParams.get('showOverdue') === 'true';

    // Fetch clients from Airtable
    let url = `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}`;
    url += '?sort[0][field]=Created Time';
    url += '&sort[0][direction]=desc';

    // Filter for overdue if requested
    if (showOverdue) {
      const today = new Date().toISOString().split('T')[0];
      url += `&filterByFormula=AND({Billing Status} = "Active", {Next Renewal} < "${today}")`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Airtable] Error fetching clients:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to fetch clients from Airtable'),
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Transform Airtable records
    const clients = data.records.map((record: any) => ({
      id: record.id,
      client: record.fields['Client Name'] || record.fields.Name || '',
      industry: record.fields.Industry || '',
      subscription: record.fields['Subscription Type'] || record.fields.Plan || 'N/A',
      amount: record.fields['Monthly Amount'] || record.fields['Plan Amount'] || 0,
      lastPayment: record.fields['Last Payment'] || '',
      nextRenewal: record.fields['Next Renewal'] || '',
      billingStatus: record.fields['Billing Status'] || 'Active',
      email: record.fields.Email || '',
      phone: record.fields.Phone || record.fields['WhatsApp Number'] || '',
      notes: record.fields.Notes || '',
      razorpaySubscriptionId: record.fields['Razorpay Subscription ID'] || '',
      razorpayPaymentId: record.fields['Razorpay Payment ID'] || '',
      invoiceUrl: record.fields['Invoice URL'] || '',
    }));

    return NextResponse.json(createSuccessResponse({ clients }));
  } catch (error: any) {
    console.error('[Airtable] Error fetching clients:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

/**
 * Update client in Airtable
 */
export async function PATCH(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { recordId, fields } = body;

    if (!recordId || !fields) {
      return NextResponse.json(
        createErrorResponse('Missing required fields: recordId, fields'),
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}/${recordId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Airtable] Error updating client:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to update client'),
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(createSuccessResponse({ client: data }));
  } catch (error: any) {
    console.error('[Airtable] Error updating client:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

