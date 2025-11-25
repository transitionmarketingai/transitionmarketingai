import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

/**
 * PRIMARY Strategy Call Booking Endpoint - Airtable
 * 
 * This is the PRIMARY ingestion point for all strategy call bookings.
 * Writes directly to Airtable "Bookings" table.
 * 
 * After successful Airtable write, triggers sync to Supabase (non-blocking).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract form data
    const {
      name,
      phone,
      industry,
      revenue_range,
      inquiry_volume,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
      business_name,
      main_goal, // Maps to inquiry_volume if inquiry_volume not provided
    } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Check which service is configured (Google Sheets or Airtable)
    const useGoogleSheets = !!process.env.GOOGLE_SHEETS_ID;
    const useAirtable = !!process.env.AIRTABLE_API_KEY && !!process.env.AIRTABLE_BASE_ID;

    if (!useGoogleSheets && !useAirtable) {
      console.error('[Bookings Create] ❌ No booking service configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Booking service not configured',
          details: 'Either GOOGLE_SHEETS_ID or AIRTABLE_API_KEY + AIRTABLE_BASE_ID must be set'
        },
        { status: 500 }
      );
    }

    // Google Sheets configuration
    const googleSheetsId = process.env.GOOGLE_SHEETS_ID;
    const googleSheetsName = process.env.GOOGLE_SHEETS_NAME || 'Bookings';
    const googleServiceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const googlePrivateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // Airtable configuration
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_STRATEGY_SESSIONS_BASE_ID || process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_BOOKINGS_TABLE_NAME || 'Bookings';

    let recordId: string | null = null;
    let responseData: any = null;
    let serviceUsed: 'google_sheets' | 'airtable' = 'airtable';

    // PRIMARY WRITE: Google Sheets or Airtable
    if (useGoogleSheets) {
      try {
        // Use Google Sheets
        serviceUsed = 'google_sheets';
        
        if (!googleServiceAccountEmail || !googlePrivateKey) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Google Sheets configuration incomplete',
              details: 'GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY required'
            },
            { status: 500 }
          );
        }

        // Prepare row data for Google Sheets
        const rowData = [
          new Date().toISOString(), // Timestamp
          name,
          phone,
          body.email || '',
          business_name || '',
          industry || '',
          main_goal || inquiry_volume || '',
          revenue_range || '',
          utm_source || '',
          utm_medium || '',
          utm_campaign || '',
          utm_term || '',
          utm_content || '',
          referrer || '',
          'New', // Status
        ];

        // Get access token
        const jwt = require('jsonwebtoken');
        const now = Math.floor(Date.now() / 1000);
        const token = jwt.sign(
          {
            iss: googleServiceAccountEmail,
            sub: googleServiceAccountEmail,
            aud: 'https://oauth2.googleapis.com/token',
            exp: now + 3600,
            iat: now,
            scope: 'https://www.googleapis.com/auth/spreadsheets',
          },
          googlePrivateKey,
          { algorithm: 'RS256' }
        );

        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: token,
          }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to get Google access token');
        }

        const { access_token } = await tokenResponse.json();

        // Append to Google Sheets
        const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetsId}/values/${googleSheetsName}:append?valueInputOption=RAW`;
        const sheetsResponse = await fetch(sheetsUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: [rowData] }),
        });

        if (!sheetsResponse.ok) {
          const errorText = await sheetsResponse.text();
          console.error('[Bookings Create] ❌ Google Sheets API error:', errorText);
          return NextResponse.json(
            { 
              success: false, 
              error: 'Failed to create booking in Google Sheets',
              details: errorText
            },
            { status: sheetsResponse.status }
          );
        }

        responseData = await sheetsResponse.json();
        const updatedRange = responseData.updates?.updatedRange;
        recordId = updatedRange?.match(/\d+$/)?.[0] || null;
        
        console.log('[Bookings Create] ✅ PRIMARY write to Google Sheets successful:', recordId);
      } catch (googleError: any) {
        console.error('[Bookings Create] ❌ Google Sheets request failed:', googleError);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to connect to Google Sheets',
            details: googleError.message
          },
          { status: 500 }
        );
      }
    } else {
      // Use Airtable (existing code)
      try {
        const airtablePayload = {
          fields: {
            name: name,
            phone: phone,
            industry: industry || '',
            revenue_range: revenue_range || '',
            inquiry_volume: inquiry_volume || main_goal || '',
            utm_source: utm_source || '',
            utm_medium: utm_medium || '',
            utm_campaign: utm_campaign || '',
            utm_term: utm_term || '',
            utm_content: utm_content || '',
            referrer: referrer || '',
            status: 'New',
            created_at: new Date().toISOString(),
          },
        };

        const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
        const airtableResponse = await fetch(airtableUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${airtableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(airtablePayload),
        });

        if (!airtableResponse.ok) {
          const errorText = await airtableResponse.text();
          console.error('[Bookings Create] ❌ Airtable API error:', errorText);
          return NextResponse.json(
            { 
              success: false, 
              error: 'Failed to create booking in Airtable',
              details: errorText
            },
            { status: airtableResponse.status }
          );
        }

        responseData = await airtableResponse.json();
        recordId = responseData.id;
        
        console.log('[Bookings Create] ✅ PRIMARY write to Airtable successful:', recordId);
      } catch (airtableError: any) {
        console.error('[Bookings Create] ❌ Airtable request failed:', airtableError);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to connect to Airtable',
            details: airtableError.message
          },
          { status: 500 }
        );
      }
    }

    // SECONDARY SYNC: Mirror to Supabase (non-blocking, fire-and-forget)
    // This runs in the background and doesn't affect the response
    if (recordId) {
      // Trigger Supabase sync asynchronously (don't await - non-blocking)
      (async () => {
        try {
          const supabase = getSupabaseServerClient();
          const utmData = {
            utm_source: utm_source || null,
            utm_medium: utm_medium || null,
            utm_campaign: utm_campaign || null,
            utm_term: utm_term || null,
            utm_content: utm_content || null,
          };

          const { error } = await supabase
            .schema('verified')
            .from('sessions')
            .insert({
              airtable_id: serviceUsed === 'airtable' ? (parseInt(recordId) || null) : null,
              google_sheets_row: serviceUsed === 'google_sheets' ? (parseInt(recordId) || null) : null,
              name: name,
              phone: phone,
              industry: industry || null,
              revenue_range: revenue_range || null,
              inquiry_volume: inquiry_volume || main_goal || null,
              utm: utmData,
            });

          if (error) {
            console.error('[Bookings Create] ⚠️ Supabase sync failed (non-critical):', error);
          } else {
            console.log('[Bookings Create] ✅ Supabase sync completed');
          }
        } catch (syncError) {
          console.error('[Bookings Create] ⚠️ Supabase sync error (non-critical):', syncError);
        }
      })(); // Immediately invoked async function - runs in background
    }

    // Return success
    return NextResponse.json({
      success: true,
      service: serviceUsed,
      record_id: recordId,
      record: responseData,
      message: `Booking created successfully in ${serviceUsed === 'google_sheets' ? 'Google Sheets' : 'Airtable'}`,
    });
  } catch (error: any) {
    console.error('[Bookings Create] ❌ Unexpected error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

