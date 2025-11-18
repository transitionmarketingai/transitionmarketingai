import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Sales Digest
 * Daily summary of sales pipeline
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
    const dealsTableName = process.env.AIRTABLE_DEALS_TABLE_NAME || 'Deals';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

    // Fetch open deals
    const openDealsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${dealsTableName}`);
    openDealsUrl.searchParams.set('filterByFormula', "AND({Stage} != 'Closed-Won', {Stage} != 'Closed-Lost')");

    const openDealsResponse = await fetch(openDealsUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    const openDealsData = openDealsResponse.ok ? await openDealsResponse.json() : { records: [] };
    const openDeals = openDealsData.records || [];

    // Find deals due today
    const dueToday = openDeals.filter((deal: any) => {
      const followUp = deal.fields['Next Follow-Up'];
      return followUp === today;
    });

    // Find stalled deals (no update for 14+ days)
    const stalledDeals = openDeals.filter((deal: any) => {
      const created = new Date(deal.fields.Created || deal.createdTime);
      const daysSinceCreated = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceCreated >= 14;
    });

    // Calculate pipeline metrics
    const pipelineValue = openDeals.reduce((sum: number, deal: any) => {
      return sum + (parseFloat(deal.fields.Value || 0));
    }, 0);

    const highProbabilityDeals = openDeals.filter((deal: any) => {
      return (deal.fields['Close Probability'] || 0) >= 70;
    });

    // Generate AI summary
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';
    const cronSecretForAI = process.env.CRON_SECRET;
    
    const summaryInput = {
      totalOpenDeals: openDeals.length,
      pipelineValue,
      dueToday: dueToday.length,
      stalledDeals: stalledDeals.length,
      highProbabilityDeals: highProbabilityDeals.length,
      dealsByStage: openDeals.reduce((acc: any, deal: any) => {
        const stage = deal.fields.Stage || 'Unknown';
        acc[stage] = (acc[stage] || 0) + 1;
        return acc;
      }, {}),
    };

    let aiSummary = 'Unable to generate AI summary.';
    try {
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

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        aiSummary = aiData.data?.result || aiSummary;
      }
    } catch (aiError) {
      console.error('[Sales Digest] AI summary error:', aiError);
    }

    // Build email content
    const emailContent = `
      <h2>Sales Pipeline — Daily Action Plan</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Pipeline Overview</h3>
        <ul style="line-height: 2;">
          <li><strong>Open Deals:</strong> ${openDeals.length}</li>
          <li><strong>Pipeline Value:</strong> ₹${pipelineValue.toLocaleString('en-IN')}</li>
          <li><strong>Due Today:</strong> ${dueToday.length}</li>
          <li><strong>Stalled (14+ days):</strong> ${stalledDeals.length}</li>
          <li><strong>High Probability (≥70%):</strong> ${highProbabilityDeals.length}</li>
        </ul>
      </div>

      ${dueToday.length > 0 ? `
        <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📅 Deals Due Today (${dueToday.length})</h3>
          <ul style="line-height: 2;">
            ${dueToday.slice(0, 5).map((deal: any) => `<li><strong>${deal.fields.Client || 'Unknown'}</strong> - ${deal.fields['Next Action'] || 'Follow up'}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${stalledDeals.length > 0 ? `
        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0;">⚠️ Stalled Deals (${stalledDeals.length})</h3>
          <p>These deals haven't been updated in 14+ days. Consider re-engaging.</p>
          <ul style="line-height: 2;">
            ${stalledDeals.slice(0, 5).map((deal: any) => `<li><strong>${deal.fields.Client || 'Unknown'}</strong> - ${deal.fields.Stage || 'Unknown'}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 20px 0;">
        <h3>AI Insights</h3>
        <pre style="white-space: pre-wrap; font-family: system-ui; line-height: 1.6;">${aiSummary}</pre>
      </div>

      <p><a href="${baseUrl}/admin/sales" style="color: #2563EB; text-decoration: none;">View Full Sales Pipeline</a></p>
    `;

    // Send email digest
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@transitionmarketingai.com';
    await fetch(`${baseUrl}/api/email-followup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Admin',
        email: adminEmail,
        subject: `Sales Pipeline — Daily Action Plan — ${new Date().toLocaleDateString()}`,
        customMessage: emailContent,
      }),
    });

    // Fire analytics event
    trackEvent('sales_digest_sent', {
      event_category: 'sales',
      event_label: 'daily_sales_digest',
      open_deals: openDeals.length,
      pipeline_value: pipelineValue,
      due_today: dueToday.length,
      stalled: stalledDeals.length,
    });

    return NextResponse.json(
      createSuccessResponse({
        message: 'Sales digest sent successfully',
        summary: {
          openDeals: openDeals.length,
          pipelineValue,
          dueToday: dueToday.length,
          stalled: stalledDeals.length,
        },
      })
    );
  } catch (error: any) {
    console.error('[Sales Digest] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


