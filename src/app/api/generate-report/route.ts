import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/tracking';

interface ReportData {
  name: string;
  business: string;
  industry: string;
  ad_budget: string;
  goal: string;
  est_inquiries?: string;
  format?: 'pdf' | 'html';
}

/**
 * Generate AI Marketing Report as PDF or HTML
 * Supports both PDF download and HTML email version
 */
export async function POST(request: NextRequest) {
  try {
    const body: ReportData = await request.json();
    const { name, business, industry, ad_budget, goal, est_inquiries = '40–60', format = 'pdf' } = body;

    // Validate required fields
    if (!name || !business || !industry || !ad_budget || !goal) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, business, industry, ad_budget, goal' },
        { status: 400 }
      );
    }

    // If HTML format requested, return HTML template
    if (format === 'html') {
      const htmlReport = generateHTMLReport({
        name,
        business,
        industry,
        ad_budget,
        goal,
        est_inquiries,
      });

      // Fire analytics event
      trackEvent('report_generated', {
        event_category: 'report',
        event_label: 'html_report_generated',
        industry,
        format: 'html',
      });

      return NextResponse.json({
        success: true,
        format: 'html',
        html: htmlReport,
      });
    }

    // Generate PDF (default)
    const pdfBytes = await generatePDFReport({
      name,
      business,
      industry,
      ad_budget,
      goal,
      est_inquiries,
    });

    // Fire analytics event
    trackEvent('report_generated', {
      event_category: 'report',
      event_label: 'pdf_report_generated',
      industry,
      format: 'pdf',
    });

    // Return PDF as downloadable file
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="transition-marketing-report-${name.replace(/\s+/g, '-').toLowerCase()}.pdf"`,
      },
    });
  } catch (error) {
    console.error('[Report] Error generating report:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Generate PDF report using pdf-lib
 */
async function generatePDFReport(data: ReportData): Promise<Buffer> {
  try {
    // Dynamic import to avoid loading pdf-lib on every request
    const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');

    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

    // Brand colors
    const brandBlue = rgb(0.04, 0.23, 0.55); // #0A3A8C
    const brandLightBlue = rgb(0.15, 0.39, 0.92); // #2563EB
    const textColor = rgb(0, 0, 0);
    const grayColor = rgb(0.3, 0.3, 0.3);

    let y = height - 60;

    // --- HEADER ---
    page.drawText('Transition Marketing AI', {
      x: 50,
      y,
      size: 20,
      font: boldFont,
      color: brandBlue,
    });

    y -= 25;
    page.drawText('AI Marketing Report & Verified Lead Proposal', {
      x: 50,
      y,
      size: 12,
      font,
      color: textColor,
    });

    // --- DIVIDER LINE ---
    y -= 15;
    page.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 1,
      color: brandLightBlue,
    });

    // --- CLIENT INFO ---
    y -= 30;
    page.drawText('Client Information:', {
      x: 50,
      y,
      size: 14,
      font: boldFont,
      color: brandBlue,
    });

    y -= 25;
    const info = [
      `Name: ${data.name}`,
      `Business: ${data.business}`,
      `Industry: ${data.industry}`,
      `Monthly Ad Budget: ${data.ad_budget}`,
      `Primary Goal: ${data.goal}`,
    ];

    info.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y,
        size: 10,
        font,
        color: textColor,
      });
      y -= 18;
    });

    // --- SUMMARY SECTION ---
    y -= 20;
    page.drawText('Summary:', {
      x: 50,
      y,
      size: 14,
      font: boldFont,
      color: brandBlue,
    });

    y -= 25;
    const summaryText = `Based on your inputs, we estimate ${data.est_inquiries} verified inquiries per month from AI-optimized ad campaigns across Google, Meta, and LinkedIn.`;
    page.drawText(summaryText, {
      x: 50,
      y,
      size: 10,
      font,
      color: textColor,
      maxWidth: 495,
      lineHeight: 14,
    });

    // --- PROCESS STEPS ---
    y -= 80;
    page.drawText('How It Works:', {
      x: 50,
      y,
      size: 14,
      font: boldFont,
      color: brandBlue,
    });

    y -= 25;
    const steps = [
      '1️⃣  Campaign Setup — Industry targeting & ad creatives',
      '2️⃣  Lead Generation — Ads optimized by AI for intent & engagement',
      '3️⃣  Verification — Each inquiry confirmed by phone & email',
      '4️⃣  Delivery — Real-time dashboard + WhatsApp notifications',
    ];

    steps.forEach((step) => {
      page.drawText(step, {
        x: 50,
        y,
        size: 10,
        font,
        color: textColor,
      });
      y -= 18;
    });

    // --- INVESTMENT ESTIMATE ---
    y -= 20;
    page.drawText('Estimated Investment Range:', {
      x: 50,
      y,
      size: 14,
      font: boldFont,
      color: brandBlue,
    });

    y -= 25;
    page.drawText('₹35,000 – ₹50,000 (all inclusive pilot, includes ad spend)', {
      x: 50,
      y,
      size: 10,
      font,
      color: textColor,
    });

    // --- GUARANTEE ---
    y -= 40;
    page.drawText('Performance Guarantee:', {
      x: 50,
      y,
      size: 14,
      font: boldFont,
      color: brandBlue,
    });

    y -= 25;
    const guaranteeText =
      "If we don't deliver the guaranteed number of verified inquiries, we continue running your campaign at our cost until we do. No excuses. No extra fees.";
    page.drawText(guaranteeText, {
      x: 50,
      y,
      size: 10,
      font,
      color: textColor,
      maxWidth: 495,
      lineHeight: 14,
    });

    // --- FOOTER ---
    y -= 60;
    page.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 1,
      color: grayColor,
    });

    y -= 20;
    page.drawText('www.transitionmarketingai.com | hello@transitionmarketingai.com', {
      x: 50,
      y,
      size: 9,
      font,
      color: grayColor,
    });

    // Save PDF
    const pdfBytes = await pdf.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('[Report] Error generating PDF:', error);
    throw error;
  }
}

/**
 * Generate HTML report template
 */
function generateHTMLReport(data: ReportData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Marketing Report - ${data.name}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0A3A8C 0%, #2563EB 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Transition Marketing AI</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 14px;">AI Marketing Report & Verified Lead Proposal</p>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="color: #0A3A8C; font-size: 18px; margin-top: 0;">Client Information</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 8px 0;"><strong>Business:</strong> ${data.business}</p>
            <p style="margin: 8px 0;"><strong>Industry:</strong> ${data.industry}</p>
            <p style="margin: 8px 0;"><strong>Monthly Ad Budget:</strong> ${data.ad_budget}</p>
            <p style="margin: 8px 0;"><strong>Primary Goal:</strong> ${data.goal}</p>
          </div>
          
          <h2 style="color: #0A3A8C; font-size: 18px;">Summary</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">
            Based on your inputs, we estimate <strong>${data.est_inquiries} verified inquiries per month</strong> from AI-optimized ad campaigns across Google, Meta, and LinkedIn.
          </p>
          
          <h2 style="color: #0A3A8C; font-size: 18px;">How It Works</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <ol style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 12px;">Campaign Setup — Industry targeting & ad creatives</li>
              <li style="margin-bottom: 12px;">Lead Generation — Ads optimized by AI for intent & engagement</li>
              <li style="margin-bottom: 12px;">Verification — Each inquiry confirmed by phone & email</li>
              <li style="margin-bottom: 12px;">Delivery — Real-time dashboard + WhatsApp notifications</li>
            </ol>
          </div>
          
          <h2 style="color: #0A3A8C; font-size: 18px;">Estimated Investment Range</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">
            <strong>₹35,000 – ₹50,000</strong> (all inclusive pilot, includes ad spend)
          </p>
          
          <h2 style="color: #0A3A8C; font-size: 18px;">Performance Guarantee</h2>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 6px; border-left: 4px solid #0A3A8C; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 16px;">
              If we don't deliver the guaranteed number of verified inquiries, we continue running your campaign at our cost until we do. <strong>No excuses. No extra fees.</strong>
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="font-size: 14px; color: #6b7280; margin: 0;">
              <a href="https://transitionmarketingai.com" style="color: #2563EB; text-decoration: none;">Visit our website</a> | 
              <a href="mailto:hello@transitionmarketingai.com" style="color: #2563EB; text-decoration: none;">Contact us</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * GET endpoint for direct PDF download (with query params)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const recordId = searchParams.get('recordId');

    // If recordId provided, fetch from Airtable
    if (recordId) {
      const airtableApiKey = process.env.AIRTABLE_API_KEY;
      const airtableBaseId = process.env.AIRTABLE_BASE_ID;
      const airtableTableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

      if (!airtableApiKey || !airtableBaseId) {
        return NextResponse.json(
          { success: false, error: 'Airtable not configured' },
          { status: 500 }
        );
      }

      // Fetch record from Airtable
      const recordResponse = await fetch(
        `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}/${recordId}`,
        {
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
          },
        }
      );

      if (!recordResponse.ok) {
        return NextResponse.json(
          { success: false, error: 'Failed to fetch record from Airtable' },
          { status: 500 }
        );
      }

      const record = await recordResponse.json();
      const fields = record.fields;

      // Generate PDF from Airtable data
      const pdfBytes = await generatePDFReport({
        name: fields.Name || '',
        business: fields.Business || '',
        industry: fields.Industry || '',
        ad_budget: fields['Ad Budget'] || '',
        goal: fields.Goal || '',
        est_inquiries: fields['Estimated Inquiries'] || '40–60',
      });

      return new NextResponse(pdfBytes, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="transition-marketing-report-${(fields.Name || 'report').replace(/\s+/g, '-').toLowerCase()}.pdf"`,
        },
      });
    }

    // No recordId, return error
    return NextResponse.json(
      { success: false, error: 'Missing recordId parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Report] Error generating report from Airtable:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

