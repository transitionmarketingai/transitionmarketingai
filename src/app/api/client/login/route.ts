import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateClientToken, setClientSession } from '@/lib/clientAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { trackEvent } from '@/lib/tracking';

/**
 * Client Login API
 * Authenticates clients using email/password from Airtable
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        createErrorResponse('Email and password are required'),
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        createErrorResponse('Client authentication not configured'),
        { status: 500 }
      );
    }

    // Fetch client from Airtable
    const url = new URL(`https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}`);
    url.searchParams.set('filterByFormula', `AND({Email} = "${email}", {Status} = "Active")`);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        createErrorResponse('Failed to authenticate'),
        { status: 500 }
      );
    }

    const data = await response.json();
    const client = data.records?.[0];

    if (!client) {
      return NextResponse.json(
        createErrorResponse('Invalid email or password'),
        { status: 401 }
      );
    }

    // Verify password
    const storedPassword = client.fields.Password || client.fields['Password Hash'];
    
    if (!storedPassword) {
      // If no password is set, allow login with any password (for initial setup)
      // In production, you should require password setup
      console.warn(`[Client Login] No password set for client ${email}`);
    } else {
      const isValid = await bcrypt.compare(password, storedPassword);
      
      if (!isValid) {
        return NextResponse.json(
          createErrorResponse('Invalid email or password'),
          { status: 401 }
        );
      }
    }

    // Generate JWT token
    const token = generateClientToken({
      id: client.id,
      email: client.fields.Email || email,
      clientRecordId: client.id,
    });

    // Set session cookie
    const nextResponse = NextResponse.json(
      createSuccessResponse({
        token,
        client: {
          id: client.id,
          name: client.fields['Client Name'] || client.fields.Name || email,
          email: client.fields.Email || email,
        },
      })
    );

    setClientSession(nextResponse, token);

    // Fire analytics event
    trackEvent('client_login_success', {
      event_category: 'client',
      event_label: 'client_login',
      client_id: client.id,
    });

    return nextResponse;
  } catch (error: any) {
    console.error('[Client Login] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

