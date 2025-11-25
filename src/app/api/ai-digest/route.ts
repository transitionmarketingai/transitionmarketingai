import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Daily AI Digest
 * Generates and emails daily summary of operations
 * Should be triggered by Vercel cron: 0 8 * * * (8 AM daily)
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
    const supportTableName = process.env.AIRTABLE_SUPPORT_TABLE_NAME || 'SupportTickets';
    const leadsTableName = process.env.AIRTABLE_LEADS_TABLE_NAME || 'Leads';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Fetch open support tickets
    const ticketsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${supportTableName}`);
    ticketsUrl.searchParams.set('filterByFormula', "OR({Status} = 'Open', {Status} = 'In Progress')");
    ticketsUrl.searchParams.set('maxRecords', '10');

    const ticketsResponse = await fetch(ticketsUrl.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    let tickets = [];
    if (ticketsResponse.ok) {
      const ticketsData = await ticketsResponse.json();
      tickets = ticketsData.records || [];
    }

    // Fetch new leads from last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];

    const leadsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${leadsTableName}`);
    leadsUrl.searchParams.set('filterByFormula', `IS_AFTER({Created Time}, "${dateStr}")`);
    leadsUrl.searchParams.set('maxRecords', '10');

    const leadsResponse = await fetch(leadsUrl.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    let leads = [];
    if (leadsResponse.ok) {
      const leadsData = await leadsResponse.json();
      leads = leadsData.records || [];
    }

    // Prepare summary input
    const summaryInput = {
      supportTickets: tickets.map((t: any) => ({
        id: t.fields['Ticket ID'] || t.id,
        subject: t.fields.Subject || 'No subject',
        client: t.fields['Client Name'] || 'Unknown',
        priority: t.fields.Priority || 'Medium',
        status: t.fields.Status || 'Open',
      })),
      newLeads: leads.map((l: any) => ({
        name: l.fields.Name || 'Unknown',
        business: l.fields.Business || 'N/A',
        industry: l.fields.Industry || 'Unknown',
        budget: l.fields['Ad Budget'] || 'Not specified',
      })),
    };

    // Generate AI summary
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';
    const cronSecretEnv = process.env.CRON_SECRET;
    const aiResponse = await fetch(`${baseUrl}/api/ai-assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cronSecretEnv ? { 'Authorization': `Bearer ${cronSecretEnv}` } : {}),
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

    // Send email digest
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@transitionmarketingai.com';
    await fetch(`${baseUrl}/api/email-followup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Admin',
        email: adminEmail,
        customMessage: `
          <h2>Daily AI Digest — ${new Date().toLocaleDateString()}</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Summary</h3>
            <ul>
              <li><strong>Open Support Tickets:</strong> ${tickets.length}</li>
              <li><strong>New Leads (Last 24h):</strong> ${leads.length}</li>
            </ul>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 20px 0;">
            <h3>AI Insights</h3>
            <pre style="white-space: pre-wrap; font-family: system-ui; line-height: 1.6;">${aiSummary}</pre>
          </div>
          <p><a href="${baseUrl}/admin/operations" style="color: #2563EB; text-decoration: none;">View Full Dashboard</a></p>
        `,
      }),
    });

    // Fire analytics event
    trackEvent('ai_digest_sent', {
      event_category: 'automation',
      event_label: 'daily_digest',
      tickets_count: tickets.length,
      leads_count: leads.length,
    });

    return NextResponse.json(
      createSuccessResponse({
        message: 'Daily digest sent successfully',
        summary: {
          tickets: tickets.length,
          leads: leads.length,
        },
      })
    );
  } catch (error: any) {
    console.error('[AI Digest] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}



