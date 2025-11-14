import { NextRequest, NextResponse } from 'next/server';
import { requireClientAuth, getClientToken, verifyClientToken } from '@/lib/clientAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

/**
 * Get current client info
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

    // Fetch client data from Airtable
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
      `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}/${payload.clientRecordId}`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        createErrorResponse('Failed to fetch client data'),
        { status: 500 }
      );
    }

    const data = await response.json();
    const client = data;

    return NextResponse.json(
      createSuccessResponse({
        client: {
          id: client.id,
          name: client.fields['Client Name'] || client.fields.Name || payload.email,
          email: client.fields.Email || payload.email,
          industry: client.fields.Industry || '',
          phone: client.fields.Phone || client.fields['WhatsApp Number'] || '',
          status: client.fields['Billing Status'] || 'Active',
          subscription: client.fields['Subscription Type'] || '',
        },
      })
    );
  } catch (error: any) {
    console.error('[Client Me] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

