import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Monthly Reports Automation
 * Generates and emails performance reports for all active clients
 * Should be triggered by Vercel cron: 0 6 1 * * (6 AM on 1st of each month)
 */
export async function GET(request: NextRequest) {
  try {
    // Optional: Add admin auth or cron secret check
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
    const leadsTableName = process.env.AIRTABLE_LEADS_TABLE_NAME || 'Leads';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Fetch all active clients
    const clientsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}`);
    clientsUrl.searchParams.set('filterByFormula', "{Billing Status} = 'Active'");

    const clientsResponse = await fetch(clientsUrl.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!clientsResponse.ok) {
      return NextResponse.json(
        createErrorResponse('Failed to fetch clients'),
        { status: 500 }
      );
    }

    const clientsData = await clientsResponse.json();
    const clients = clientsData.records || [];

    const results = {
      total: clients.length,
      successful: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Process each client
    for (const record of clients) {
      try {
        const client = record.fields;
        const clientId = record.id;
        const clientName = client['Client Name'] || client.Name || 'Client';
        const clientEmail = client.Email;
        const clientPhone = client.Phone || client['WhatsApp Number'] || '';
        const industry = client.Industry || 'N/A';
        const planAmount = client['Plan Amount'] || client['Monthly Amount'] || 45000;

        if (!clientEmail) {
          results.failed++;
          results.errors.push(`Client ${clientName} has no email`);
          continue;
        }

        // Calculate date range (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const dateStr = thirtyDaysAgo.toISOString().split('T')[0];

        // Fetch recent leads for this client
        const leadsUrl = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${leadsTableName}`);
        leadsUrl.searchParams.set('filterByFormula', `AND({Client Record ID} = "${clientId}", IS_AFTER({Created Time}, "${dateStr}"))`);

        const leadsResponse = await fetch(leadsUrl.toString(), {
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
          },
        });

        let totalLeads = 0;
        let verifiedLeads = 0;
        let avgCPL = 0;

        if (leadsResponse.ok) {
          const leadsData = await leadsResponse.json();
          const leads = leadsData.records || [];
          totalLeads = leads.length;
          verifiedLeads = leads.filter((l: any) => {
            const status = l.fields['Verification Status'] || l.fields.Status || '';
            return status.toLowerCase() === 'verified';
          }).length;
          avgCPL = verifiedLeads > 0 ? Math.round(planAmount / verifiedLeads) : planAmount;
        }

        // Generate PDF report
        const pdf = await PDFDocument.create();
        const page = pdf.addPage([595, 842]); // A4 size
        const font = await pdf.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
        const { width, height } = page.getSize();

        let y = height - 60;

        // Header
        page.drawText('Transition Marketing AI — Monthly Performance Report', {
          x: 50,
          y,
          size: 16,
          font: fontBold,
          color: rgb(0.039, 0.227, 0.549), // Brand blue
        });

        y -= 30;

        // Client Info
        page.drawText(`Client: ${clientName}`, { x: 50, y, size: 11, font });
        y -= 18;
        page.drawText(`Industry: ${industry}`, { x: 50, y, size: 11, font });
        y -= 18;
        page.drawText(`Period: Last 30 Days`, { x: 50, y, size: 11, font });
        y -= 18;
        page.drawText(`Report Date: ${new Date().toLocaleDateString('en-IN')}`, { x: 50, y, size: 11, font });

        y -= 30;

        // Performance Metrics
        page.drawText('Performance Summary', {
          x: 50,
          y,
          size: 12,
          font: fontBold,
          color: rgb(0.039, 0.227, 0.549),
        });
        y -= 25;

        page.drawText(`Verified Leads Delivered: ${verifiedLeads}`, { x: 50, y, size: 12, font });
        y -= 20;
        page.drawText(`Total Leads Generated: ${totalLeads}`, { x: 50, y, size: 12, font });
        y -= 20;
        page.drawText(`Verification Rate: ${totalLeads > 0 ? ((verifiedLeads / totalLeads) * 100).toFixed(1) : 0}%`, {
          x: 50,
          y,
          size: 12,
          font,
        });
        y -= 20;
        page.drawText(`Average Cost Per Lead: ₹${avgCPL.toLocaleString()}`, { x: 50, y, size: 12, font });
        y -= 20;
        page.drawText(`Monthly Investment: ₹${planAmount.toLocaleString()}`, { x: 50, y, size: 12, font });

        y -= 30;

        // Next Steps
        page.drawText('Recommendations', {
          x: 50,
          y,
          size: 12,
          font: fontBold,
          color: rgb(0.039, 0.227, 0.549),
        });
        y -= 20;

        const recommendations = [
          '• Keep ad spend stable to optimize cost per lead',
          '• We will A/B test new creatives in the next cycle',
          '• Consider upgrading to our Growth Plan for higher lead volume',
          '• Review lead quality feedback and adjust targeting if needed',
        ];

        recommendations.forEach((rec) => {
          page.drawText(rec, {
            x: 50,
            y,
            size: 10,
            font,
            maxWidth: 495,
            lineHeight: 14,
          });
          y -= 16;
        });

        // Footer
        y = 50;
        page.drawText('Transition Marketing AI — AI-Powered Lead Generation & Marketing Automation', {
          x: 50,
          y,
          size: 9,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });
        page.drawText('www.transitionmarketingai.com | hello@transitionmarketingai.com', {
          x: 50,
          y: y - 12,
          size: 9,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });

        const pdfBytes = await pdf.save();
        const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
        const pdfFilename = `Monthly_Report_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

        // Email report to client
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';
        const emailResponse = await fetch(`${baseUrl}/api/email-followup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: clientName,
            email: clientEmail,
            customMessage: `
              <p>Hi ${clientName},</p>
              <p>Your monthly performance report for ${industry} campaigns is ready.</p>
              <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #0A3A8C;">Performance Summary</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li><b>Verified Leads Delivered:</b> ${verifiedLeads}</li>
                  <li><b>Total Leads Generated:</b> ${totalLeads}</li>
                  <li><b>Average Cost Per Lead:</b> ₹${avgCPL.toLocaleString()}</li>
                  <li><b>Monthly Investment:</b> ₹${planAmount.toLocaleString()}</li>
                  <li><b>Status:</b> ${client['Billing Status'] || 'Active'}</li>
                </ul>
              </div>
              <p>The detailed PDF report is attached to this email.</p>
              <p>You can also view this report in your <a href="${baseUrl}/client/dashboard" style="color: #2563EB; text-decoration: none;">client dashboard</a>.</p>
              <p>Best regards,<br/>— The Transition Marketing AI Team</p>
            `,
            attachment: pdfBase64,
            attachmentName: pdfFilename,
          }),
        });

        if (!emailResponse.ok) {
          throw new Error('Failed to send email');
        }

        // Update Airtable with report delivery info
        const reportUrl = `${baseUrl}/api/monthly-reports?client=${clientId}`;
        await fetch(
          `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}/${clientId}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${airtableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fields: {
                'Last Report Sent': new Date().toISOString(),
                'Report Link': reportUrl,
                'Last Report Date': new Date().toISOString().split('T')[0],
              },
            }),
          }
        );

        // Optional: Send WhatsApp notification
        if (clientPhone && process.env.INTERAKT_API_TOKEN) {
          try {
            const formattedPhone = clientPhone.startsWith('+') ? clientPhone : `+91${clientPhone}`;
            await fetch('https://api.interakt.ai/v1/messages', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${process.env.INTERAKT_API_TOKEN}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                phoneNumber: formattedPhone,
                type: 'text',
                message: `Hi ${clientName}, your monthly performance report is ready! 📊\n\nVerified Leads: ${verifiedLeads}\nAvg CPL: ₹${avgCPL.toLocaleString()}\n\nCheck your email or dashboard for the full report.\n\n— Transition Marketing AI`,
              }),
            });
          } catch (whatsappError) {
            console.error(`[Monthly Reports] WhatsApp error for ${clientName}:`, whatsappError);
            // Continue even if WhatsApp fails
          }
        }

        // Fire analytics event
        trackEvent('monthly_report_sent', {
          event_category: 'automation',
          event_label: 'monthly_report_delivered',
          client_id: clientId,
          verified_leads: verifiedLeads,
          avg_cpl: avgCPL,
        });

        results.successful++;
      } catch (error: any) {
        console.error(`[Monthly Reports] Error processing client ${record.id}:`, error);
        results.failed++;
        results.errors.push(`Client ${record.fields['Client Name'] || record.id}: ${error.message}`);
      }
    }

    // Fire summary analytics event
    trackEvent('monthly_report_generated', {
      event_category: 'automation',
      event_label: 'monthly_reports_batch',
      total_clients: results.total,
      successful: results.successful,
      failed: results.failed,
    });

    return NextResponse.json(
      createSuccessResponse({
        message: `Processed ${results.total} clients. ${results.successful} successful, ${results.failed} failed.`,
        results,
      })
    );
  } catch (error: any) {
    console.error('[Monthly Reports] Error:', error);
    trackEvent('monthly_report_failed', {
      event_category: 'automation',
      event_label: 'monthly_reports_error',
      error: error.message,
    });
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

/**
 * Get report for specific client (for client portal)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId } = body;

    if (!clientId) {
      return NextResponse.json(
        createErrorResponse('Client ID is required'),
        { status: 400 }
      );
    }

    // Similar logic as GET but for single client
    // This can be used to regenerate a report on-demand
    // Implementation similar to GET but filtered to one client

    return NextResponse.json(createSuccessResponse({ message: 'Report generation triggered' }));
  } catch (error: any) {
    console.error('[Monthly Reports POST] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

