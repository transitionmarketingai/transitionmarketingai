import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

/**
 * List internal tasks
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
    const tasksTableName = process.env.AIRTABLE_TASKS_TABLE_NAME || 'InternalTasks';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assignedTo');

    // Build filter formula
    const filters: string[] = [];
    if (type && type !== 'all') {
      filters.push(`{Type} = "${type}"`);
    }
    if (status && status !== 'all') {
      filters.push(`{Status} = "${status}"`);
    }
    if (assignedTo && assignedTo !== 'all') {
      filters.push(`{Assigned To} = "${assignedTo}"`);
    }

    let filterFormula = '';
    if (filters.length > 0) {
      filterFormula = `AND(${filters.join(', ')})`;
    }

    // Fetch tasks from Airtable
    const url = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${tasksTableName}`);
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
      console.error('[Tasks List] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to fetch tasks'),
        { status: 500 }
      );
    }

    const data = await response.json();

    // Transform tasks
    const tasks = data.records.map((record: any) => ({
      id: record.id,
      taskId: record.fields['Task ID'] || record.id,
      title: record.fields.Title || '',
      description: record.fields.Description || '',
      type: record.fields.Type || 'General',
      priority: record.fields.Priority || 'Medium',
      status: record.fields.Status || 'Open',
      assignedTo: record.fields['Assigned To'] || '',
      relatedEntity: record.fields['Related Entity'] || '',
      dueDate: record.fields['Due Date'] || '',
      createdAt: record.fields.Created || record.createdTime,
      aiSummary: record.fields['AI Summary'] || '',
    }));

    return NextResponse.json(createSuccessResponse({ tasks }));
  } catch (error: any) {
    console.error('[Tasks List] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}





