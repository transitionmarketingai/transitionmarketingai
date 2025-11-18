import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Deals API
 * CRUD operations for sales deals
 * GET: List deals with filters
 * POST: Create new deal
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
    const dealsTableName = process.env.AIRTABLE_DEALS_TABLE_NAME || 'Deals';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const stage = searchParams.get('stage');
    const owner = searchParams.get('owner');
    const industry = searchParams.get('industry');

    // Build filter formula
    const filters: string[] = [];
    if (stage && stage !== 'all') {
      filters.push(`{Stage} = "${stage}"`);
    }
    if (owner && owner !== 'all') {
      filters.push(`{Owner} = "${owner}"`);
    }
    if (industry && industry !== 'all') {
      filters.push(`{Industry} = "${industry}"`);
    }

    let filterFormula = '';
    if (filters.length > 0) {
      filterFormula = `AND(${filters.join(', ')})`;
    }

    // Fetch deals from Airtable
    const url = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${dealsTableName}`);
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
      console.error('[Deals] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to fetch deals'),
        { status: 500 }
      );
    }

    const data = await response.json();

    // Transform deals
    const deals = data.records.map((record: any) => ({
      id: record.id,
      dealId: record.fields['Deal ID'] || record.id,
      leadId: record.fields.LeadID || '',
      client: record.fields.Client || '',
      stage: record.fields.Stage || 'Qualified',
      value: record.fields.Value || 0,
      owner: record.fields.Owner || '',
      closeProbability: record.fields['Close Probability'] || 0,
      nextAction: record.fields['Next Action'] || '',
      nextFollowUp: record.fields['Next Follow-Up'] || '',
      createdAt: record.fields.Created || record.createdTime,
      notes: record.fields.Notes || '',
      industry: record.fields.Industry || '',
    }));

    return NextResponse.json(createSuccessResponse({ deals }));
  } catch (error: any) {
    console.error('[Deals] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { leadId, client, stage, value, owner, industry, notes } = body;

    if (!client || !stage || !value) {
      return NextResponse.json(
        createErrorResponse('Client, stage, and value are required'),
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const dealsTableName = process.env.AIRTABLE_DEALS_TABLE_NAME || 'Deals';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Generate deal ID
    const dealId = `D-${Date.now().toString().slice(-6)}`;

    // Create deal in Airtable
    const createResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${dealsTableName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Deal ID': dealId,
                LeadID: leadId || '',
                Client: client,
                Stage: stage,
                Value: value,
                Owner: owner || '',
                'Close Probability': 50, // Default
                'Next Action': 'Schedule initial call',
                'Next Follow-Up': new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                Created: new Date().toISOString(),
                Notes: notes || '',
                Industry: industry || '',
              },
            },
          ],
        }),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('[Deals] Airtable create error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to create deal'),
        { status: 500 }
      );
    }

    const createData = await createResponse.json();
    const newDeal = createData.records[0];

    // Fire analytics event
    trackEvent('deal_created', {
      event_category: 'sales',
      event_label: 'deal_created',
      deal_id: dealId,
      stage,
      value,
    });

    return NextResponse.json(
      createSuccessResponse({
        deal: {
          id: newDeal.id,
          dealId,
          client,
          stage,
          value,
        },
        message: 'Deal created successfully',
      })
    );
  } catch (error: any) {
    console.error('[Deals] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


