import { NextRequest, NextResponse } from 'next/server';
import { requireClientAuth, getClientToken, verifyClientToken } from '@/lib/clientAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Get client's leads
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

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const leadsTableName = process.env.AIRTABLE_LEADS_TABLE_NAME || 'Leads';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Fetch leads filtered by client
    // Assuming there's a Client ID or Client Record ID field in Leads table
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let filterFormula = `{Client Record ID} = "${payload.clientRecordId}"`;
    
    if (search) {
      filterFormula = `AND(${filterFormula}, OR(FIND("${search}", {Name}) > 0, FIND("${search}", {Email}) > 0, FIND("${search}", {Phone}) > 0))`;
    }
    
    if (status) {
      filterFormula = `AND(${filterFormula}, {Status} = "${status}")`;
    }

    const url = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${leadsTableName}`);
    url.searchParams.set('filterByFormula', filterFormula);
    url.searchParams.set('sort[0][field]', 'Created Time');
    url.searchParams.set('sort[0][direction]', 'desc');

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Client Leads] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to fetch leads'),
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Transform leads data
    const leads = data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name || '',
      email: record.fields.Email || '',
      phone: record.fields.Phone || '',
      source: record.fields.Source || record.fields['Lead Source'] || 'Unknown',
      date: record.fields['Created Time'] || record.createdTime,
      status: record.fields['Verification Status'] || record.fields.Status || 'Pending',
      industry: record.fields.Industry || '',
      notes: record.fields.Notes || '',
    }));

    // Fire analytics event
    trackEvent('client_view_leads', {
      event_category: 'client',
      event_label: 'leads_viewed',
      client_id: payload.clientRecordId,
      lead_count: leads.length,
    });

    return NextResponse.json(createSuccessResponse({ leads }));
  } catch (error: any) {
    console.error('[Client Leads] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

