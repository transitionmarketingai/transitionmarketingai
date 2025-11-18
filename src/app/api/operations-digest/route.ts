import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Operations Digest
 * Daily snapshot email with top KPIs and insights
 * Should be triggered by Vercel cron: 0 8 * * * (8 AM daily)
 */
export async function GET(request: NextRequest) {
  try {
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

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Fetch aggregated data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dateStr = thirtyDaysAgo.toISOString().split('T')[0];

    // Get leads (MTD)
    const leadsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/Leads`);
    leadsUrl.searchParams.set('filterByFormula', `IS_AFTER({Created Time}, "${dateStr}")`);

    const leadsResponse = await fetch(leadsUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    const leadsData = leadsResponse.ok ? await leadsResponse.json() : { records: [] };
    const totalLeads = leadsData.records?.length || 0;

    // Get active clients
    const clientsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/Clients`);
    clientsUrl.searchParams.set('filterByFormula', "{Billing Status} = 'Active'");

    const clientsResponse = await fetch(clientsUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    const clientsData = clientsResponse.ok ? await clientsResponse.json() : { records: [] };
    const activeClients = clientsData.records?.length || 0;
    const mrr = clientsData.records?.reduce((sum: number, c: any) => {
      return sum + (c.fields['Plan Amount'] || c.fields['Monthly Amount'] || 0);
    }, 0) || 0;

    // Get open tickets
    const ticketsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/SupportTickets`);
    ticketsUrl.searchParams.set('filterByFormula', "OR({Status} = 'Open', {Status} = 'In Progress')");

    const ticketsResponse = await fetch(ticketsUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    const ticketsData = ticketsResponse.ok ? await ticketsResponse.json() : { records: [] };
    const openTickets = ticketsData.records?.length || 0;

    // Get overdue tasks
    const today = new Date().toISOString().split('T')[0];
    const tasksUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/InternalTasks`);
    tasksUrl.searchParams.set('filterByFormula', `AND({Status} != 'Done', {Due Date} < "${today}")`);

    const tasksResponse = await fetch(tasksUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    const tasksData = tasksResponse.ok ? await tasksResponse.json() : { records: [] };
    const overdueTasks = tasksData.records?.length || 0;

    // Calculate conversion rate
    const conversionRate = totalLeads > 0 ? ((activeClients / totalLeads) * 100).toFixed(1) : '0';

    // Generate summary
    const summary = `
📊 Daily Operations Snapshot — ${new Date().toLocaleDateString()}

Top KPIs:
• Total Leads (MTD): ${totalLeads}
• Active Clients: ${activeClients}
• Conversion Rate: ${conversionRate}%
• Monthly Recurring Revenue: ₹${mrr.toLocaleString()}
• Open Support Tickets: ${openTickets}
• Overdue Tasks: ${overdueTasks}

${overdueTasks > 0 ? `⚠️ ${overdueTasks} task(s) overdue — requires attention` : '✅ All tasks on track'}
${openTickets > 5 ? `⚠️ ${openTickets} open tickets — consider prioritizing` : ''}
    `.trim();

    // Send email
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@transitionmarketingai.com';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';

    await fetch(`${baseUrl}/api/email-followup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Admin',
        email: adminEmail,
        subject: `Daily Operations Snapshot — ${new Date().toLocaleDateString()}`,
        customMessage: `
          <h2>Daily Operations Snapshot</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Top KPIs</h3>
            <ul style="line-height: 2;">
              <li><strong>Total Leads (MTD):</strong> ${totalLeads}</li>
              <li><strong>Active Clients:</strong> ${activeClients}</li>
              <li><strong>Conversion Rate:</strong> ${conversionRate}%</li>
              <li><strong>Monthly Recurring Revenue:</strong> ₹${mrr.toLocaleString()}</li>
              <li><strong>Open Support Tickets:</strong> ${openTickets}</li>
              <li><strong>Overdue Tasks:</strong> ${overdueTasks}</li>
            </ul>
          </div>
          ${overdueTasks > 0 ? `<div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 20px 0;"><strong>⚠️ ${overdueTasks} task(s) overdue — requires attention</strong></div>` : ''}
          ${openTickets > 5 ? `<div style="background: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 6px; margin: 20px 0;"><strong>⚠️ ${openTickets} open tickets — consider prioritizing</strong></div>` : ''}
          <p><a href="${baseUrl}/admin/operations" style="color: #2563EB; text-decoration: none;">View Full Operations Dashboard</a></p>
        `,
      }),
    });

    trackEvent('daily_digest_sent', {
      event_category: 'automation',
      event_label: 'operations_digest',
      leads: totalLeads,
      clients: activeClients,
      mrr,
    });

    return NextResponse.json(createSuccessResponse({ message: 'Operations digest sent', summary }));
  } catch (error: any) {
    console.error('[Operations Digest] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}





