import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

/**
 * Fetch leads from Airtable
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
    const leadsTableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const industry = searchParams.get('industry');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build Airtable filter formula
    let filterFormula = '';
    const filters: string[] = [];
    
    if (industry) {
      filters.push(`{Industry} = "${industry}"`);
    }
    if (status) {
      filters.push(`{Status} = "${status}"`);
    }
    if (search) {
      filters.push(`OR(FIND("${search}", {Name}) > 0, FIND("${search}", {Business}) > 0, FIND("${search}", {Email}) > 0)`);
    }
    
    if (filters.length > 0) {
      filterFormula = `AND(${filters.join(', ')})`;
    }

    // Fetch leads from Airtable
    const url = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${leadsTableName}`);
    if (filterFormula) {
      url.searchParams.set('filterByFormula', filterFormula);
    }
    url.searchParams.set('sort[0][field]', 'Created Time');
    url.searchParams.set('sort[0][direction]', 'desc');

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Airtable] Error fetching leads:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to fetch leads from Airtable'),
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Transform Airtable records to our format
    const leads = data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name || '',
      business: record.fields.Business || '',
      industry: record.fields.Industry || '',
      budget: record.fields['Ad Budget'] || '',
      goal: record.fields.Goal || '',
      status: record.fields.Status || 'New',
      email: record.fields.Email || '',
      phone: record.fields.Phone || '',
      created: record.fields['Created Time'] || record.createdTime,
      reportUrl: record.fields['Report URL'] || '',
    }));

    return NextResponse.json(createSuccessResponse({ leads }));
  } catch (error: any) {
    console.error('[Airtable] Error fetching leads:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

/**
 * Delete a lead from Airtable
 */
export async function DELETE(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const { recordId } = await request.json();

    if (!recordId) {
      return NextResponse.json(
        createErrorResponse('Missing required field: recordId'),
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const leadsTableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${leadsTableName}/${recordId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        createErrorResponse('Failed to delete lead'),
        { status: 500 }
      );
    }

    return NextResponse.json(createSuccessResponse({ message: 'Lead deleted successfully' }));
  } catch (error: any) {
    console.error('[Airtable] Error deleting lead:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

