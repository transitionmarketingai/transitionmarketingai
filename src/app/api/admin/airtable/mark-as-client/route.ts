import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Mark a lead as client (move to Clients table)
 * Requires admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { leadRecordId } = body;

    if (!leadRecordId) {
      return NextResponse.json(
        createErrorResponse('Missing required field: leadRecordId'),
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const leadsTableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Fetch lead data
    const leadResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${leadsTableName}/${leadRecordId}`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!leadResponse.ok) {
      return NextResponse.json(
        createErrorResponse('Failed to fetch lead data'),
        { status: 500 }
      );
    }

    const leadData = await leadResponse.json();
    const leadFields = leadData.fields;

    // Create client record from lead data
    const clientFields: any = {
      'Client Name': leadFields.Name || leadFields.Business || '',
      Industry: leadFields.Industry || '',
      Email: leadFields.Email || '',
      Phone: leadFields.Phone || '',
      'Subscription Type': 'Pilot', // Default to Pilot
      'Billing Status': 'Active',
      'Created Time': new Date().toISOString(),
      Notes: `Converted from lead on ${new Date().toLocaleDateString()}`,
    };

    // Create client in Clients table
    const createClientResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: clientFields,
            },
          ],
        }),
      }
    );

    if (!createClientResponse.ok) {
      const errorText = await createClientResponse.text();
      console.error('[Airtable] Error creating client:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to create client'),
        { status: 500 }
      );
    }

    const clientData = await createClientResponse.json();
    const newClientId = clientData.records[0].id;

    // Update lead status to "Converted to Client"
    await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${leadsTableName}/${leadRecordId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Status: 'Converted to Client',
            'Client Record ID': newClientId,
          },
        }),
      }
    );

    // Fire analytics event
    trackEvent('lead_marked_as_client', {
      event_category: 'admin',
      event_label: 'lead_converted_to_client',
      lead_id: leadRecordId,
      client_id: newClientId,
    });

    return NextResponse.json(
      createSuccessResponse({
        client: clientData.records[0],
        message: 'Lead marked as client successfully',
      })
    );
  } catch (error: any) {
    console.error('[Airtable] Error marking lead as client:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

