import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Update or Delete Deal
 * PATCH: Update deal
 * DELETE: Delete deal
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { stage, value, owner, closeProbability, nextAction, nextFollowUp, notes } = body;

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const dealsTableName = process.env.AIRTABLE_DEALS_TABLE_NAME || 'Deals';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Build update fields
    const updateFields: any = {};
    if (stage) updateFields.Stage = stage;
    if (value !== undefined) updateFields.Value = value;
    if (owner !== undefined) updateFields.Owner = owner;
    if (closeProbability !== undefined) updateFields['Close Probability'] = closeProbability;
    if (nextAction) updateFields['Next Action'] = nextAction;
    if (nextFollowUp) updateFields['Next Follow-Up'] = nextFollowUp;
    if (notes !== undefined) updateFields.Notes = notes;

    // Update deal
    const updateResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${dealsTableName}/${params.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: updateFields,
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('[Deals Update] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to update deal'),
        { status: 500 }
      );
    }

    // Fire analytics events
    if (stage) {
      trackEvent('deal_stage_changed', {
        event_category: 'sales',
        event_label: 'deal_stage_changed',
        deal_id: params.id,
        new_stage: stage,
      });
    }

    if (stage === 'Closed-Won') {
      trackEvent('deal_closed_won', {
        event_category: 'sales',
        event_label: 'deal_closed_won',
        deal_id: params.id,
        value: value || 0,
      });
    }

    return NextResponse.json(
      createSuccessResponse({ message: 'Deal updated successfully' })
    );
  } catch (error: any) {
    console.error('[Deals Update] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Delete deal
    const deleteResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${dealsTableName}/${params.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      console.error('[Deals Delete] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to delete deal'),
        { status: 500 }
      );
    }

    return NextResponse.json(
      createSuccessResponse({ message: 'Deal deleted successfully' })
    );
  } catch (error: any) {
    console.error('[Deals Delete] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


