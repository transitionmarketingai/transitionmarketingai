import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Daily Task Summary
 * Fetches open tasks and generates AI summary
 * Should be triggered by Vercel cron: 0 9 * * * (9 AM daily)
 */
export async function GET(request: NextRequest) {
  try {
    // Optional: Add cron secret check
    const cronSecret = request.headers.get('x-cron-secret');
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret && cronSecret !== expectedSecret) {
      return NextResponse.json(
        createErrorResponse('Unauthorized'),
        { status: 401 }
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

    // Fetch open tasks
    const tasksUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${tasksTableName}`);
    tasksUrl.searchParams.set('filterByFormula', "OR({Status} = 'Open', {Status} = 'In Progress')");
    tasksUrl.searchParams.set('sort[0][field]', 'Priority');
    tasksUrl.searchParams.set('sort[0][direction]', 'desc');
    tasksUrl.searchParams.set('sort[1][field]', 'Due Date');
    tasksUrl.searchParams.set('sort[1][direction]', 'asc');

    const tasksResponse = await fetch(tasksUrl.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!tasksResponse.ok) {
      const errorText = await tasksResponse.text();
      console.error('[Daily Task Summary] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to fetch tasks'),
        { status: 500 }
      );
    }

    const tasksData = await tasksResponse.json();
    const tasks = tasksData.records || [];

    // Group tasks by type
    const tasksByType: Record<string, number> = {};
    const tasksByStatus: Record<string, number> = {};
    const overdueTasks: any[] = [];
    const today = new Date().toISOString().split('T')[0];

    tasks.forEach((task: any) => {
      const type = task.fields.Type || 'General';
      const status = task.fields.Status || 'Open';
      
      tasksByType[type] = (tasksByType[type] || 0) + 1;
      tasksByStatus[status] = (tasksByStatus[status] || 0) + 1;

      // Check for overdue tasks
      const dueDate = task.fields['Due Date'];
      if (dueDate && dueDate < today && status !== 'Done') {
        overdueTasks.push({
          title: task.fields.Title || 'Untitled',
          type,
          dueDate,
        });
      }
    });

    // Prepare summary input
    const summaryInput = {
      totalOpenTasks: tasks.length,
      tasksByType,
      tasksByStatus,
      overdueCount: overdueTasks.length,
      overdueTasks: overdueTasks.slice(0, 5), // Top 5 overdue
      highPriorityTasks: tasks
        .filter((t: any) => (t.fields.Priority || '').toLowerCase() === 'high' || (t.fields.Priority || '').toLowerCase() === 'urgent')
        .slice(0, 5)
        .map((t: any) => ({
          title: t.fields.Title || 'Untitled',
          type: t.fields.Type || 'General',
          assignedTo: t.fields['Assigned To'] || 'Unassigned',
        })),
    };

    // Generate AI summary
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';
    const cronSecretForAI = process.env.CRON_SECRET;
    const aiResponse = await fetch(`${baseUrl}/api/ai-assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cronSecretForAI ? { 'Authorization': `Bearer ${cronSecretForAI}` } : {}),
      },
      body: JSON.stringify({
        type: 'daily-digest',
        content: JSON.stringify(summaryInput, null, 2),
      }),
    });

    let aiSummary = 'Unable to generate AI summary.';
    if (aiResponse.ok) {
      const aiData = await aiResponse.json();
      aiSummary = aiData.data?.result || aiSummary;
    }

    // Build email content
    const emailContent = `
      <h2>Daily Task Summary — ${new Date().toLocaleDateString()}</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Overview</h3>
        <ul style="line-height: 2;">
          <li><strong>Total Open Tasks:</strong> ${tasks.length}</li>
          <li><strong>Open:</strong> ${tasksByStatus.Open || 0}</li>
          <li><strong>In Progress:</strong> ${tasksByStatus['In Progress'] || 0}</li>
          <li><strong>Overdue:</strong> ${overdueTasks.length}</li>
        </ul>
      </div>

      <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Tasks by Type</h3>
        <ul style="line-height: 2;">
          ${Object.entries(tasksByType).map(([type, count]) => `<li><strong>${type}:</strong> ${count}</li>`).join('')}
        </ul>
      </div>

      ${overdueTasks.length > 0 ? `
        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #dc2626;">⚠️ Overdue Tasks (${overdueTasks.length})</h3>
          <ul style="line-height: 2;">
            ${overdueTasks.map((task) => `<li><strong>${task.title}</strong> (${task.type}) - Due: ${task.dueDate}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${summaryInput.highPriorityTasks.length > 0 ? `
        <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0;">🔥 High Priority Tasks</h3>
          <ul style="line-height: 2;">
            ${summaryInput.highPriorityTasks.map((task) => `<li><strong>${task.title}</strong> (${task.type}) - Assigned to: ${task.assignedTo}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 20px 0;">
        <h3>AI Insights</h3>
        <pre style="white-space: pre-wrap; font-family: system-ui; line-height: 1.6;">${aiSummary}</pre>
      </div>

      <p><a href="${baseUrl}/admin/tasks" style="color: #2563EB; text-decoration: none;">View All Tasks in Dashboard</a></p>
    `;

    // Send email digest
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@transitionmarketingai.com';
    await fetch(`${baseUrl}/api/email-followup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Admin',
        email: adminEmail,
        subject: `Daily Task Summary — ${new Date().toLocaleDateString()}`,
        customMessage: emailContent,
      }),
    });

    // Fire analytics event
    trackEvent('daily_task_digest_sent', {
      event_category: 'automation',
      event_label: 'daily_task_summary',
      total_tasks: tasks.length,
      overdue_count: overdueTasks.length,
      tasks_by_type: JSON.stringify(tasksByType),
    });

    return NextResponse.json(
      createSuccessResponse({
        message: 'Daily task summary sent successfully',
        summary: {
          totalTasks: tasks.length,
          overdue: overdueTasks.length,
          byType: tasksByType,
          byStatus: tasksByStatus,
        },
      })
    );
  } catch (error: any) {
    console.error('[Daily Task Summary] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


