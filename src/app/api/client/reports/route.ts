import { NextRequest, NextResponse } from 'next/server';
import { requireClientAuth, getClientToken, verifyClientToken } from '@/lib/clientAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Get client's reports and proposals
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const authError = requireClientAuth(request);
    if (authError) {
      return authError;
    }

    const token = getClientToken(request);
    if (!token) {
      return NextResponse.json(
        createErrorResponse('Token not found'),
        { status: 401 }
      );
    }

    const payload = verifyClientToken(token);
    if (!payload) {
      return NextResponse.json(
        createErrorResponse('Invalid token'),
        { status: 401 }
      );
    }

    // Fetch reports from Airtable (assuming Reports table or stored in Clients table)
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Fetch client record to get report URLs
    const clientResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}/${payload.clientRecordId}`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!clientResponse.ok) {
      return NextResponse.json(
        createErrorResponse('Failed to fetch client data'),
        { status: 500 }
      );
    }

    const clientData = await clientResponse.json();
    
    // Extract report URLs from client record
    // Assuming reports are stored as attachments or URLs in Airtable
    const reports: any[] = [];

    // Check for Report URL field
    if (clientData.fields['Report URL']) {
      reports.push({
        id: 'report-1',
        name: 'AI Marketing Report',
        url: clientData.fields['Report URL'],
        date: clientData.fields['Report Generated Date'] || clientData.fields['Created Time'] || new Date().toISOString(),
        type: 'proposal',
      });
    }

    // Check for attachments (if Airtable stores PDFs as attachments)
    if (clientData.fields['Reports'] && Array.isArray(clientData.fields['Reports'])) {
      clientData.fields['Reports'].forEach((attachment: any, index: number) => {
        reports.push({
          id: `report-${index + 1}`,
          name: attachment.filename || `Report ${index + 1}`,
          url: attachment.url,
          date: attachment.created || new Date().toISOString(),
          type: 'report',
        });
      });
    }

    // If no reports found, return empty array
    return NextResponse.json(createSuccessResponse({ reports }));
  } catch (error: any) {
    console.error('[Client Reports] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

/**
 * Download a specific report
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const authError = requireClientAuth(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();
    const { reportId } = body;

    if (!reportId) {
      return NextResponse.json(
        createErrorResponse('Report ID is required'),
        { status: 400 }
      );
    }

    const token = getClientToken(request);
    if (!token) {
      return NextResponse.json(
        createErrorResponse('Token not found'),
        { status: 401 }
      );
    }

    const payload = verifyClientToken(token);
    if (!payload) {
      return NextResponse.json(
        createErrorResponse('Invalid token'),
        { status: 401 }
      );
    }

    // Generate report on demand if needed
    // For now, return the report URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';
    const reportUrl = `${baseUrl}/api/generate-report?recordId=${payload.clientRecordId}`;

    // Fire analytics event
    trackEvent('client_download_report', {
      event_category: 'client',
      event_label: 'report_downloaded',
      client_id: payload.clientRecordId,
      report_id: reportId,
    });

    return NextResponse.json(createSuccessResponse({ reportUrl }));
  } catch (error: any) {
    console.error('[Client Reports Download] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

