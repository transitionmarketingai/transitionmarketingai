import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/tracking';

interface SendProposalData {
  recordId: string;
  sendEmail?: boolean;
}

/**
 * Send proposal automation endpoint
 * Fetches lead data from Airtable, generates PDF, emails client, and updates Airtable status
 */
export async function POST(request: NextRequest) {
  try {
    const body: SendProposalData = await request.json();
    const { recordId, sendEmail = true } = body;

    // Validate required fields
    if (!recordId) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: recordId' },
        { status: 400 }
      );
    }

    // Check Airtable configuration
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        { success: false, error: 'Airtable not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID.' },
        { status: 500 }
      );
    }

    // 1️⃣ Fetch lead data from Airtable
    const recordResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!recordResponse.ok) {
      const errorText = await recordResponse.text();
      console.error('[Send Proposal] Airtable fetch error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch record from Airtable' },
        { status: 500 }
      );
    }

    const record = await recordResponse.json();
    const lead = record.fields;

    // Validate required fields
    if (!lead.Name || !lead.Business || !lead.Industry || !lead['Ad Budget'] || !lead.Goal) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields in Airtable record' },
        { status: 400 }
      );
    }

    // 2️⃣ Generate PDF via existing API
    const reportUrl = `${baseUrl}/api/generate-report`;
    const pdfResponse = await fetch(reportUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: lead.Name,
        business: lead.Business,
        industry: lead.Industry,
        ad_budget: lead['Ad Budget'],
        goal: lead.Goal,
        est_inquiries: lead['Estimated Inquiries'] || '40–60',
        format: 'pdf',
      }),
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error('[Send Proposal] PDF generation error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to generate PDF' },
        { status: 500 }
      );
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

    // 3️⃣ Email PDF to client (if email provided and sendEmail is true)
    if (sendEmail && lead.Email) {
      try {
        // Generate HTML version of report for email
        const htmlReportResponse = await fetch(reportUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: lead.Name,
            business: lead.Business,
            industry: lead.Industry,
            ad_budget: lead['Ad Budget'],
            goal: lead.Goal,
            est_inquiries: lead['Estimated Inquiries'] || '40–60',
            format: 'html',
          }),
        });

        let htmlReport = '';
        if (htmlReportResponse.ok) {
          const htmlData = await htmlReportResponse.json();
          htmlReport = htmlData.html || '';
        }

        // Send email with PDF attachment
        const emailResponse = await fetch(`${baseUrl}/api/email-followup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: lead.Name,
            email: lead.Email,
            customMessage: htmlReport
              ? undefined
              : `Your custom verified lead proposal is being finalized — expect it within 24 hours.`,
            proposalLink: `${baseUrl}/api/generate-report?recordId=${recordId}`,
            attachment: pdfBase64,
            attachmentName: `transition-marketing-report-${lead.Name.replace(/\s+/g, '-').toLowerCase()}.pdf`,
          }),
        });

        if (emailResponse.ok) {
          console.log('[Send Proposal] Email sent successfully');
        } else {
          console.error('[Send Proposal] Email send error:', await emailResponse.text());
        }
      } catch (error) {
        console.error('[Send Proposal] Error sending email:', error);
        // Continue even if email fails
      }
    }

    // 4️⃣ Update Airtable status
    const updateResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}/${recordId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Status: 'Proposal Sent',
            'Report URL': `${baseUrl}/api/generate-report?recordId=${recordId}`,
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('[Send Proposal] Airtable update error:', errorText);
      // Don't fail the request if update fails
    }

    // 5️⃣ Fire analytics event
    trackEvent('proposal_sent_auto', {
      event_category: 'proposal',
      event_label: 'proposal_sent_via_airtable',
      industry: lead.Industry,
      record_id: recordId,
    });

    // 6️⃣ Optional: Notify on Slack/Discord via webhook
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

    if (slackWebhook) {
      try {
        await fetch(slackWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `✅ Proposal sent to ${lead.Name} (${lead.Business})`,
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `*Proposal Sent*\n*Client:* ${lead.Name}\n*Business:* ${lead.Business}\n*Industry:* ${lead.Industry}\n*Report:* ${baseUrl}/api/generate-report?recordId=${recordId}`,
                },
              },
            ],
          }),
        });
      } catch (error) {
        console.error('[Send Proposal] Slack webhook error:', error);
      }
    }

    if (discordWebhook) {
      try {
        await fetch(discordWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `✅ Proposal sent to **${lead.Name}** (${lead.Business})`,
            embeds: [
              {
                title: 'Proposal Sent',
                fields: [
                  { name: 'Client', value: lead.Name, inline: true },
                  { name: 'Business', value: lead.Business, inline: true },
                  { name: 'Industry', value: lead.Industry, inline: true },
                ],
                url: `${baseUrl}/api/generate-report?recordId=${recordId}`,
              },
            ],
          }),
        });
      } catch (error) {
        console.error('[Send Proposal] Discord webhook error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Proposal sent successfully',
      data: {
        recordId,
        reportUrl: `${baseUrl}/api/generate-report?recordId=${recordId}`,
        emailSent: sendEmail && !!lead.Email,
      },
    });
  } catch (error) {
    console.error('[Send Proposal] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for Airtable button integration
 * Allows Airtable button to trigger via GET request
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const recordId = searchParams.get('recordId');

    if (!recordId) {
      return NextResponse.json(
        { success: false, error: 'Missing recordId parameter' },
        { status: 400 }
      );
    }

    // Call POST handler with recordId
    const postRequest = new Request(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recordId }),
    });

    return POST(new NextRequest(postRequest));
  } catch (error) {
    console.error('[Send Proposal] GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

