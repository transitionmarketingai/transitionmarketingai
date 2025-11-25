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

    // Get Airtable configuration from environment variables
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_STRATEGY_SESSIONS_BASE_ID || process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_BOOKINGS_TABLE_NAME || 'Bookings';

    // Validate Airtable configuration
    if (!airtableApiKey || !airtableBaseId) {
      console.error('[Bookings Create] ❌ Airtable not configured. Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Airtable configuration missing',
          details: 'AIRTABLE_API_KEY and AIRTABLE_BASE_ID must be set in environment variables'
        },
        { status: 500 }
      );
    }

    // Prepare Airtable payload
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

    // PRIMARY WRITE: Airtable
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
    
    let airtableRecordId: string | null = null;
    let airtableResponseData: any = null;

    try {
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

      airtableResponseData = await airtableResponse.json();
      airtableRecordId = airtableResponseData.id;
      
      console.log('[Bookings Create] ✅ PRIMARY write to Airtable successful:', airtableRecordId);
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

    // SECONDARY SYNC: Mirror to Supabase (non-blocking, fire-and-forget)
    // This runs in the background and doesn't affect the response
    if (airtableRecordId) {
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
              airtable_id: parseInt(airtableRecordId) || null,
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

    // Return success with Airtable record ID
    return NextResponse.json({
      success: true,
      airtable_id: airtableRecordId,
      record: airtableResponseData,
      message: 'Booking created successfully in Airtable',
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

