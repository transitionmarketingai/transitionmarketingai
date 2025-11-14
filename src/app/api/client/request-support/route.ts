import { NextRequest, NextResponse } from 'next/server';
import { requireClientAuth, getClientToken, verifyClientToken } from '@/lib/clientAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

/**
 * Request support (creates a support ticket or sends notification)
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { subject, message, type = 'general' } = body;

    if (!subject || !message) {
      return NextResponse.json(
        createErrorResponse('Subject and message are required'),
        { status: 400 }
      );
    }

    // Fetch client data
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Airtable not configured'),
        { status: 500 }
      );
    }

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

    // Create support ticket in Airtable (if Support table exists)
    // Or send email/notification
    const supportTableName = process.env.AIRTABLE_SUPPORT_TABLE_NAME || 'Support';

    try {
      await fetch(
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
                  'Client Name': clientName,
                  'Client Email': payload.email,
                  'Client Record ID': payload.clientRecordId,
                  'Subject': subject,
                  'Message': message,
                  'Type': type,
                  'Status': 'Open',
                  'Created Time': new Date().toISOString(),
                },
              },
            ],
          }),
        }
      );
    } catch (supportError) {
      console.error('[Client Support] Error creating support ticket:', supportError);
      // Continue even if support ticket creation fails
    }

    // Send WhatsApp notification (optional)
    const whatsappApiKey = process.env.INTERAKT_API_TOKEN;
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;

    if (whatsappApiKey && adminPhone) {
      try {
        await fetch('https://api.interakt.ai/v1/messages', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${whatsappApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: adminPhone,
            type: 'text',
            message: `🔔 New Support Request\n\nClient: ${clientName}\nEmail: ${payload.email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          }),
        });
      } catch (whatsappError) {
        console.error('[Client Support] Error sending WhatsApp:', whatsappError);
      }
    }

    return NextResponse.json(
      createSuccessResponse({ message: 'Support request submitted successfully' })
    );
  } catch (error: any) {
    console.error('[Client Support] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

