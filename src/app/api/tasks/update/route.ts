import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Update task (status, assignment, etc.)
 * Requires admin authentication
 */
export async function PATCH(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { taskId, status, assignedTo, priority } = body;

    if (!taskId) {
      return NextResponse.json(
        createErrorResponse('Task ID is required'),
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const tasksTableName = process.env.AIRTABLE_TASKS_TABLE_NAME || 'InternalTasks';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Build update fields
    const updateFields: any = {};
    if (status) updateFields.Status = status;
    if (assignedTo !== undefined) updateFields['Assigned To'] = assignedTo || null;
    if (priority) updateFields.Priority = priority;

    // Update task
    const updateResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${tasksTableName}/${taskId}`,
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
      console.error('[Tasks Update] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to update task'),
        { status: 500 }
      );
    }

    // Fire analytics events
    if (status === 'Done') {
      trackEvent('task_completed', {
        event_category: 'tasks',
        event_label: 'task_completed',
        task_id: taskId,
      });
    }

    if (assignedTo) {
      trackEvent('task_reassigned', {
        event_category: 'tasks',
        event_label: 'task_reassigned',
        task_id: taskId,
      });
    }

    return NextResponse.json(
      createSuccessResponse({ message: 'Task updated successfully' })
    );
  } catch (error: any) {
    console.error('[Tasks Update] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}





