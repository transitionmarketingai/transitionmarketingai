import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Retention Check
 * Daily check for at-risk clients and renewal reminders
 * Should be triggered by Vercel cron: 0 7 * * * (7 AM daily)
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
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const sevenDaysFromNowStr = sevenDaysFromNow.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];

    // Fetch clients with renewal due in 7 days
    const renewalUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}`);
    renewalUrl.searchParams.set('filterByFormula', `AND({Next Renewal} <= "${sevenDaysFromNowStr}", {Next Renewal} >= "${todayStr}", {Billing Status} = "Active")`);

    const renewalResponse = await fetch(renewalUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    const renewalData = renewalResponse.ok ? await renewalResponse.json() : { records: [] };
    const renewalDue = renewalData.records || [];

    // Fetch clients with failed payments
    const failedPaymentUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}`);
    failedPaymentUrl.searchParams.set('filterByFormula', `{Billing Status} = "Failed"`);

    const failedResponse = await fetch(failedPaymentUrl.toString(), {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    const failedData = failedResponse.ok ? await failedResponse.json() : { records: [] };
    const failedPayments = failedData.records || [];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';

    // Create tasks for renewal reminders
    for (const client of renewalDue) {
      try {
        await fetch(`${baseUrl}/api/task-automation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CRON_SECRET || ''}`,
          },
          body: JSON.stringify({
            event: 'client_renewal_due',
            details: {
              clientId: client.id,
              client: client.fields['Client Name'] || client.fields.Name || 'Client',
              renewal_date: client.fields['Next Renewal'] || '',
            },
          }),
        });
      } catch (taskError) {
        console.error('[Retention Check] Task creation error:', taskError);
      }
    }

    // Create tasks for failed payments
    for (const client of failedPayments) {
      try {
        await fetch(`${baseUrl}/api/task-automation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CRON_SECRET || ''}`,
          },
          body: JSON.stringify({
            event: 'payment_failed',
            details: {
              clientId: client.id,
              client: client.fields['Client Name'] || client.fields.Name || 'Client',
              amount: client.fields['Plan Amount'] || client.fields['Monthly Amount'] || 0,
            },
          }),
        });
      } catch (taskError) {
        console.error('[Retention Check] Task creation error:', taskError);
      }
    }

    // Send email alerts
    if (renewalDue.length > 0 || failedPayments.length > 0) {
      const adminEmail = process.env.ADMIN_EMAIL || 'hello@transitionmarketingai.com';
      const emailContent = `
        <h2>Retention Alerts — ${new Date().toLocaleDateString()}</h2>
        
        ${renewalDue.length > 0 ? `
          <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Renewals Due (${renewalDue.length})</h3>
            <ul style="line-height: 2;">
              ${renewalDue.slice(0, 10).map((c: any) => `<li><strong>${c.fields['Client Name'] || c.fields.Name || 'Unknown'}</strong> - Renewal: ${c.fields['Next Renewal'] || 'N/A'}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${failedPayments.length > 0 ? `
          <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Failed Payments (${failedPayments.length})</h3>
            <ul style="line-height: 2;">
              ${failedPayments.slice(0, 10).map((c: any) => `<li><strong>${c.fields['Client Name'] || c.fields.Name || 'Unknown'}</strong> - Requires immediate attention</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <p><a href="${baseUrl}/admin/retention" style="color: #2563EB; text-decoration: none;">View Retention Dashboard</a></p>
      `;

      await fetch(`${baseUrl}/api/email-followup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Admin',
          email: adminEmail,
          subject: `Retention Alerts — ${new Date().toLocaleDateString()}`,
          customMessage: emailContent,
        }),
      });
    }

    // Fire analytics event
    trackEvent('renewal_alert_triggered', {
      event_category: 'retention',
      event_label: 'daily_retention_check',
      renewals_due: renewalDue.length,
      failed_payments: failedPayments.length,
    });

    return NextResponse.json(
      createSuccessResponse({
        message: 'Retention check completed',
        summary: {
          renewalsDue: renewalDue.length,
          failedPayments: failedPayments.length,
          tasksCreated: renewalDue.length + failedPayments.length,
        },
      })
    );
  } catch (error: any) {
    console.error('[Retention Check] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


