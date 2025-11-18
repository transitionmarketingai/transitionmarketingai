import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';
import { aggregateHistoricalData } from '@/lib/forecast/dataAggregator';

/**
 * Forecast Scheduler
 * Monthly forecast generation and email report
 * Should be triggered by Vercel cron: 0 7 1 * * (7 AM on 1st of month)
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

    // Aggregate historical data
    const historicalData = await aggregateHistoricalData(12);

    // Generate AI forecast
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';
    const cronSecretForAI = process.env.CRON_SECRET;

    const forecastResponse = await fetch(`${baseUrl}/api/ai-forecast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cronSecretForAI ? { 'Authorization': `Bearer ${cronSecretForAI}` } : {}),
      },
      body: JSON.stringify({ data: historicalData }),
    });

    let forecastResult = null;
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      forecastResult = forecastData.data?.forecast;
    }

    // Build email content
    const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const emailContent = `
      <h2>AI Growth Forecast — ${monthName}</h2>
      
      ${forecastResult ? `
        <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Next Month Forecast</h3>
          <ul style="line-height: 2;">
            <li><strong>Leads:</strong> ${forecastResult.forecast?.nextMonth?.leads || 0}</li>
            <li><strong>Conversion Rate:</strong> ${forecastResult.forecast?.nextMonth?.conversionRate?.toFixed(1) || 0}%</li>
            <li><strong>MRR:</strong> ₹${((forecastResult.forecast?.nextMonth?.mrr || 0) / 100000).toFixed(1)}L</li>
            <li><strong>Churn Rate:</strong> ${forecastResult.forecast?.nextMonth?.churnRate?.toFixed(1) || 0}%</li>
          </ul>
        </div>

        ${forecastResult.insights && forecastResult.insights.length > 0 ? `
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 20px 0;">
            <h3>Key Insights</h3>
            <ul style="line-height: 2;">
              ${forecastResult.insights.map((insight: string) => `<li>${insight}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${forecastResult.recommendations && forecastResult.recommendations.length > 0 ? `
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 20px 0;">
            <h3>Recommended Actions</h3>
            <ul style="line-height: 2;">
              ${forecastResult.recommendations.map((rec: any) => `<li><strong>${rec.action}</strong> - ${rec.impact}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      ` : '<p>Unable to generate forecast. Please check the forecast dashboard.</p>'}

      <p><a href="${baseUrl}/admin/forecast" style="color: #2563EB; text-decoration: none;">View Full Forecast Dashboard</a></p>
    `;

    // Send email
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@transitionmarketingai.com';
    await fetch(`${baseUrl}/api/email-followup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Admin',
        email: adminEmail,
        subject: `AI Growth Forecast — ${monthName}`,
        customMessage: emailContent,
      }),
    });

    // Fire analytics event
    trackEvent('forecast_email_sent', {
      event_category: 'forecast',
      event_label: 'monthly_forecast_email',
      month: monthName,
    });

    return NextResponse.json(
      createSuccessResponse({
        message: 'Forecast email sent successfully',
        month: monthName,
      })
    );
  } catch (error: any) {
    console.error('[Forecast Scheduler] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


