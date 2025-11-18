import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Task Automation API
 * Creates internal tasks automatically based on events
 * Called by other routes when events occur
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, details } = body;

    if (!event || !details) {
      return NextResponse.json(
        createErrorResponse('Event and details are required'),
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

    // Determine task details based on event type
    let title = '';
    let description = '';
    let type = 'General';
    let priority = 'Medium';
    let assignee = 'Manager 1';
    let dueDate: Date | null = null;
    let relatedEntity = '';

    switch (event) {
      case 'lead_created':
        title = `Verify Lead from ${details.business || details.name || 'Unknown'}`;
        description = `New lead from ${details.industry || 'Unknown Industry'}, budget ${details.budget || 'Not specified'}. Verify contact and schedule strategy call.`;
        type = 'Lead';
        priority = details.priority || 'High';
        dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 1); // Due in 1 day
        relatedEntity = `Lead#${details.leadId || details.id || ''}`;
        break;

      case 'support_ticket_created':
        title = `Support Ticket: ${details.subject || 'New Ticket'}`;
        description = `Client ${details.client || details.clientName || 'Unknown'} raised issue: ${details.subject || 'No subject'}. Priority: ${details.priority || 'Medium'}.`;
        type = 'Support';
        priority = details.priority || 'Medium';
        assignee = details.assignee || 'Support Team';
        dueDate = new Date();
        dueDate.setHours(dueDate.getHours() + 24); // Due in 24 hours
        relatedEntity = `Ticket#${details.ticketId || details.id || ''}`;
        break;

      case 'payment_failed':
        title = `Payment Failed for ${details.client || details.clientName || 'Client'}`;
        description = `Client ${details.client || details.clientName || 'Unknown'} failed payment ₹${details.amount || 'Unknown'}. Follow up within 24h to resolve.`;
        type = 'Billing';
        priority = 'High';
        assignee = 'Billing Team';
        dueDate = new Date();
        dueDate.setHours(dueDate.getHours() + 24);
        relatedEntity = `Client#${details.clientId || details.id || ''}`;
        break;

      case 'payment_captured':
        title = `Payment Received from ${details.client || details.clientName || 'Client'}`;
        description = `Payment of ₹${details.amount || 'Unknown'} received. Send confirmation and update client status.`;
        type = 'Billing';
        priority = 'Low';
        assignee = 'Billing Team';
        relatedEntity = `Client#${details.clientId || details.id || ''}`;
        break;

      case 'client_renewal_due':
        title = `Renewal Reminder — ${details.client || details.clientName || 'Client'}`;
        description = `Client ${details.client || details.clientName || 'Unknown'}'s subscription expires on ${details.renewal_date || 'Unknown'}. Reach out for renewal.`;
        type = 'Renewal';
        priority = 'High';
        assignee = 'Sales Team';
        dueDate = new Date(details.renewal_date || new Date());
        relatedEntity = `Client#${details.clientId || details.id || ''}`;
        break;

      case 'monthly_report_sent':
        title = `Review Monthly Report for ${details.client || details.clientName || 'Client'}`;
        description = `Monthly performance report sent to ${details.client || details.clientName || 'Unknown'}. Review metrics and follow up if needed.`;
        type = 'Client';
        priority = 'Low';
        assignee = 'Account Manager';
        relatedEntity = `Client#${details.clientId || details.id || ''}`;
        break;

      default:
        title = `Task: ${event}`;
        description = JSON.stringify(details);
        type = 'General';
    }

    // Generate AI summary
    let aiSummary = '';
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';
      const cronSecret = process.env.CRON_SECRET;
      const aiResponse = await fetch(`${baseUrl}/api/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(cronSecret ? { 'Authorization': `Bearer ${cronSecret}` } : {}),
        },
        body: JSON.stringify({
          type: 'task-suggestion',
          content: description,
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        aiSummary = aiData.data?.result || '';
      }
    } catch (aiError) {
      console.error('[Task Automation] AI summary error:', aiError);
      // Continue without AI summary
    }

    // Create task in Airtable
    const taskId = `T-${Date.now().toString().slice(-6)}`;
    const taskResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${tasksTableName}`,
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
                'Task ID': taskId,
                Title: title,
                Description: description,
                Type: type,
                Priority: priority,
                Status: 'Open',
                'Assigned To': assignee,
                'Related Entity': relatedEntity,
                'AI Summary': aiSummary,
                Created: new Date().toISOString(),
                ...(dueDate ? { 'Due Date': dueDate.toISOString().split('T')[0] } : {}),
              },
            },
          ],
        }),
      }
    );

    if (!taskResponse.ok) {
      const errorText = await taskResponse.text();
      console.error('[Task Automation] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to create task'),
        { status: 500 }
      );
    }

    const taskData = await taskResponse.json();
    const newTask = taskData.records[0];

    // Fire analytics event
    trackEvent('task_created_auto', {
      event_category: 'automation',
      event_label: 'task_auto_created',
      event_type: event,
      task_type: type,
      priority,
    });

    return NextResponse.json(
      createSuccessResponse({
        task: {
          id: newTask.id,
          taskId,
          title,
          type,
          priority,
        },
        message: 'Task created successfully',
      })
    );
  } catch (error: any) {
    console.error('[Task Automation] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}



