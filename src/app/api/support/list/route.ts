import { NextRequest, NextResponse } from 'next/server';
import { requireClientAuth, getClientToken, verifyClientToken } from '@/lib/clientAuth';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

/**
 * List support tickets
 * For clients: returns only their tickets
 * For admins: returns all tickets with filters
 */
export async function GET(request: NextRequest) {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const supportTableName = process.env.AIRTABLE_SUPPORT_TABLE_NAME || 'SupportTickets';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const isAdmin = searchParams.get('admin') === 'true';

    let filterFormula = '';

    if (isAdmin) {
      // Admin view - check admin auth
      const authError = requireAdmin(request);
      if (authError) {
        return authError;
      }

      // Admin filters
      const status = searchParams.get('status');
      const priority = searchParams.get('priority');
      const assignedTo = searchParams.get('assignedTo');

      const filters: string[] = [];
      if (status && status !== 'all') {
        filters.push(`{Status} = "${status}"`);
      }
      if (priority && priority !== 'all') {
        filters.push(`{Priority} = "${priority}"`);
      }
      if (assignedTo && assignedTo !== 'all') {
        filters.push(`{Assigned To} = "${assignedTo}"`);
      }

      if (filters.length > 0) {
        filterFormula = `AND(${filters.join(', ')})`;
      }
    } else {
      // Client view - require client auth
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

      // Filter by client ID
      filterFormula = `{Client ID} = "${payload.clientRecordId}"`;
    }

    // Fetch tickets from Airtable
    const url = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${supportTableName}`);
    if (filterFormula) {
      url.searchParams.set('filterByFormula', filterFormula);
    }
    url.searchParams.set('sort[0][field]', 'Created');
    url.searchParams.set('sort[0][direction]', 'desc');

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Support List] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to fetch tickets'),
        { status: 500 }
      );
    }

    const data = await response.json();

    // Transform tickets
    const tickets = data.records.map((record: any) => {
      let messages = [];
      try {
        const messagesStr = record.fields.Messages;
        if (typeof messagesStr === 'string') {
          messages = JSON.parse(messagesStr);
        } else if (Array.isArray(messagesStr)) {
          messages = messagesStr;
        }
      } catch (e) {
        // Invalid JSON, use empty array
      }

      return {
        id: record.id,
        ticketId: record.fields['Ticket ID'] || record.id,
        clientId: record.fields['Client ID'] || '',
        clientName: record.fields['Client Name'] || '',
        clientEmail: record.fields['Client Email'] || '',
        subject: record.fields.Subject || '',
        description: record.fields.Description || '',
        status: record.fields.Status || 'Open',
        priority: record.fields.Priority || 'Medium',
        assignedTo: record.fields['Assigned To'] || '',
        createdAt: record.fields.Created || record.createdTime,
        updatedAt: record.fields.Updated || record.createdTime,
        messages,
      };
    });

    return NextResponse.json(createSuccessResponse({ tickets }));
  } catch (error: any) {
    console.error('[Support List] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

