import { NextRequest, NextResponse } from 'next/server';
import { requireClientAuth, getClientToken, verifyClientToken } from '@/lib/clientAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Create a new support ticket
 * Requires client authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Require client authentication
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

    const body = await request.json();
    const { subject, description, priority = 'Medium' } = body;

    if (!subject || !description) {
      return NextResponse.json(
        createErrorResponse('Subject and description are required'),
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const supportTableName = process.env.AIRTABLE_SUPPORT_TABLE_NAME || 'SupportTickets';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

    // Fetch client info
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';
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
    const clientName = clientData.fields['Client Name'] || clientData.fields.Name || payload.email;
    const clientEmail = clientData.fields.Email || payload.email;

    // Generate ticket ID
    const ticketId = `TKT-${Date.now().toString().slice(-6)}`;

    // Create ticket in Airtable
    const ticketResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${supportTableName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Ticket ID': ticketId,
                'Client ID': payload.clientRecordId,
                'Client Name': clientName,
                'Client Email': clientEmail,
                'Subject': subject,
                'Description': description,
                'Priority': priority,
                'Status': 'Open',
                'Created': new Date().toISOString(),
                'Updated': new Date().toISOString(),
                'Messages': JSON.stringify([
                  {
                    from: 'Client',
                    message: description,
                    timestamp: new Date().toISOString(),
                  },
                ]),
              },
            },
          ],
        }),
      }
    );

    if (!ticketResponse.ok) {
      const errorText = await ticketResponse.text();
      console.error('[Support Create] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to create ticket'),
        { status: 500 }
      );
    }

    const ticketData = await ticketResponse.json();
    const newTicket = ticketData.records[0];

    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@transitionmarketingai.com';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';

    try {
      await fetch(`${baseUrl}/api/email-followup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Admin',
          email: adminEmail,
          customMessage: `
            <h2>New Support Ticket Created</h2>
            <p><strong>Ticket ID:</strong> ${ticketId}</p>
            <p><strong>Client:</strong> ${clientName} (${clientEmail})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Priority:</strong> ${priority}</p>
            <p><strong>Description:</strong></p>
            <p>${description}</p>
            <p><a href="${baseUrl}/admin/support?ticket=${newTicket.id}" style="color: #2563EB; text-decoration: none;">View Ticket in Admin Dashboard</a></p>
          `,
        }),
      });
    } catch (emailError) {
      console.error('[Support Create] Email notification error:', emailError);
      // Continue even if email fails
    }

    // Optional: WhatsApp notification to admin
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
    if (adminPhone && process.env.INTERAKT_API_TOKEN) {
      try {
        const formattedPhone = adminPhone.startsWith('+') ? adminPhone : `+91${adminPhone}`;
        await fetch('https://api.interakt.ai/v1/messages', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.INTERAKT_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: formattedPhone,
            type: 'text',
            message: `🔔 New Support Ticket\n\nTicket: ${ticketId}\nClient: ${clientName}\nSubject: ${subject}\nPriority: ${priority}\n\nView: ${baseUrl}/admin/support`,
          }),
        });
      } catch (whatsappError) {
        console.error('[Support Create] WhatsApp notification error:', whatsappError);
      }
    }

    // Fire analytics event
    trackEvent('ticket_created', {
      event_category: 'support',
      event_label: 'ticket_created',
      client_id: payload.clientRecordId,
      ticket_id: ticketId,
      priority,
    });

    // Create automated task
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';
      await fetch(`${baseUrl}/api/task-automation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'support_ticket_created',
          details: {
            ticketId: newTicket.id,
            subject,
            client: clientName,
            clientName,
            clientId: payload.clientRecordId,
            priority,
            assignee: 'Support Team',
          },
        }),
      });
    } catch (taskError) {
      console.error('[Support Create] Task automation error:', taskError);
      // Continue even if task creation fails
    }

    return NextResponse.json(
      createSuccessResponse({
        ticket: {
          id: newTicket.id,
          ticketId,
          subject,
          status: 'Open',
          priority,
          createdAt: new Date().toISOString(),
        },
        message: 'Ticket created successfully',
      })
    );
  } catch (error: any) {
    console.error('[Support Create] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

