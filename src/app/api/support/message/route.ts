import { NextRequest, NextResponse } from 'next/server';
import { requireClientAuth, getClientToken, verifyClientToken } from '@/lib/clientAuth';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Add a message to a support ticket
 * Can be used by clients or admins
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketId, message, from } = body;

    if (!ticketId || !message) {
      return NextResponse.json(
        createErrorResponse('Ticket ID and message are required'),
        { status: 400 }
      );
    }

    // Determine if this is admin or client
    const isAdmin = from === 'Admin' || from === 'admin';
    
    if (isAdmin) {
      // Require admin auth
      const authError = requireAdmin(request);
      if (authError) {
        return authError;
      }
    } else {
      // Require client auth
      const authError = requireClientAuth(request);
      if (authError) {
        return authError;
      }
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

    // Fetch existing ticket
    const ticketResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${supportTableName}/${ticketId}`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!ticketResponse.ok) {
      return NextResponse.json(
        createErrorResponse('Ticket not found'),
        { status: 404 }
      );
    }

    const ticketData = await ticketResponse.json();
    const ticket = ticketData;

    // Get existing messages
    let messages: any[] = [];
    try {
      const messagesStr = ticket.fields.Messages;
      if (typeof messagesStr === 'string') {
        messages = JSON.parse(messagesStr);
      } else if (Array.isArray(messagesStr)) {
        messages = messagesStr;
      }
    } catch (e) {
      // Invalid JSON, start fresh
      messages = [];
    }

    // Add new message
    const newMessage = {
      from: from || (isAdmin ? 'Admin' : 'Client'),
      message,
      timestamp: new Date().toISOString(),
    };
    messages.push(newMessage);

    // Update ticket
    const updateResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${supportTableName}/${ticketId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Messages: JSON.stringify(messages),
            Updated: new Date().toISOString(),
            // Auto-update status if admin replies
            ...(isAdmin && ticket.fields.Status === 'Open' ? { Status: 'In Progress' } : {}),
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('[Support Message] Airtable error:', errorText);
      return NextResponse.json(
        createErrorResponse('Failed to add message'),
        { status: 500 }
      );
    }

    // Send notification
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transitionmarketingai.com';

    if (isAdmin) {
      // Notify client
      const clientEmail = ticket.fields['Client Email'];
      if (clientEmail) {
        try {
          await fetch(`${baseUrl}/api/email-followup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: ticket.fields['Client Name'] || 'Client',
              email: clientEmail,
              customMessage: `
                <h2>New Reply on Your Support Ticket</h2>
                <p><strong>Ticket ID:</strong> ${ticket.fields['Ticket ID'] || ticketId}</p>
                <p><strong>Subject:</strong> ${ticket.fields.Subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <p><a href="${baseUrl}/client/dashboard?tab=support" style="color: #2563EB; text-decoration: none;">View Ticket</a></p>
              `,
            }),
          });
        } catch (emailError) {
          console.error('[Support Message] Email error:', emailError);
        }
      }

      // Optional: WhatsApp to client
      const clientPhone = ticket.fields['Client Phone'];
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
              message: `📧 New reply on your support ticket\n\nTicket: ${ticket.fields['Ticket ID'] || ticketId}\nSubject: ${ticket.fields.Subject}\n\nReply: ${message.substring(0, 100)}...\n\nView: ${baseUrl}/client/dashboard`,
            }),
          });
        } catch (whatsappError) {
          console.error('[Support Message] WhatsApp error:', whatsappError);
        }
      }
    } else {
      // Notify admin
      const adminEmail = process.env.ADMIN_EMAIL || 'hello@transitionmarketingai.com';
      try {
        await fetch(`${baseUrl}/api/email-followup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Admin',
            email: adminEmail,
            customMessage: `
              <h2>New Message on Support Ticket</h2>
              <p><strong>Ticket ID:</strong> ${ticket.fields['Ticket ID'] || ticketId}</p>
              <p><strong>Client:</strong> ${ticket.fields['Client Name']}</p>
              <p><strong>Subject:</strong> ${ticket.fields.Subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <p><a href="${baseUrl}/admin/support?ticket=${ticketId}" style="color: #2563EB; text-decoration: none;">View Ticket</a></p>
            `,
          }),
        });
      } catch (emailError) {
        console.error('[Support Message] Email error:', emailError);
      }
    }

    // Fire analytics event
    trackEvent('ticket_reply_sent', {
      event_category: 'support',
      event_label: 'ticket_reply',
      ticket_id: ticketId,
      from: isAdmin ? 'admin' : 'client',
    });

    return NextResponse.json(
      createSuccessResponse({
        message: 'Message added successfully',
        newMessage,
      })
    );
  } catch (error: any) {
    console.error('[Support Message] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

