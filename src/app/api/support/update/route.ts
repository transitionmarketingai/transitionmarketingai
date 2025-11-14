import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Update ticket status, priority, or assignment
 * Admin only
 */
export async function PATCH(request: NextRequest) {
  try {
    // Require admin auth
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { ticketId, status, priority, assignedTo } = body;

    if (!ticketId) {
      return NextResponse.json(
        createErrorResponse('Ticket ID is required'),
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const supportTableName = process.env.AIRTABLE_SUPPORT_TABLE_NAME || 'SupportTickets';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Build update fields
    const updateFields: any = {
      Updated: new Date().toISOString(),
    };

    if (status) {
      updateFields.Status = status;
    }
    if (priority) {
      updateFields.Priority = priority;
    }
    if (assignedTo !== undefined) {
      updateFields['Assigned To'] = assignedTo || null;
    }

    // Update ticket
    const updateResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${supportTableName}/${ticketId}`,
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
      console.error('[Support Update] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to update ticket'),
        { status: 500 }
      );
    }

    // Fire analytics event if resolved
    if (status === 'Resolved' || status === 'Closed') {
      trackEvent('ticket_resolved', {
        event_category: 'support',
        event_label: 'ticket_resolved',
        ticket_id: ticketId,
        status,
      });
    }

    return NextResponse.json(
      createSuccessResponse({
        message: 'Ticket updated successfully',
      })
    );
  } catch (error: any) {
    console.error('[Support Update] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

