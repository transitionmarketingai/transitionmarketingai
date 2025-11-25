import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

/**
 * Sync Strategy Call Booking: Airtable → Supabase
 * 
 * This endpoint:
 * 1. Writes booking data to Airtable
 * 2. Mirrors the same data to Supabase "sessions" table
 * 
 * Backward compatible - doesn't break existing flows
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
      business_name, // Optional
      main_goal, // Optional - maps to inquiry_volume
    } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Get Airtable configuration
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_STRATEGY_SESSIONS_BASE_ID || process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_BOOKINGS_TABLE_NAME || 'Bookings';

    let airtableRecordId: number | null = null;

    // Step 1: Write to Airtable (if configured)
    if (airtableApiKey && airtableBaseId) {
      try {
        const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
        
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

        const airtableResponse = await fetch(airtableUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${airtableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(airtablePayload),
        });

        if (airtableResponse.ok) {
          const airtableData = await airtableResponse.json();
          airtableRecordId = airtableData.id;
          console.log('[Sync] ✅ Written to Airtable:', airtableRecordId);
        } else {
          const errorText = await airtableResponse.text();
          console.error('[Sync] ⚠️ Airtable write failed:', errorText);
          // Continue to Supabase even if Airtable fails
        }
      } catch (airtableError) {
        console.error('[Sync] ⚠️ Airtable error (continuing to Supabase):', airtableError);
        // Continue to Supabase even if Airtable fails
      }
    } else {
      console.log('[Sync] ⚠️ Airtable not configured, skipping Airtable write');
    }

    // Step 2: Mirror to Supabase "sessions" table
    try {
      const supabase = getSupabaseServerClient();
      
      const utmData = {
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_term: utm_term || null,
        utm_content: utm_content || null,
      };

      const { data: sessionData, error: supabaseError } = await supabase
        .schema('verified')
        .from('sessions')
        .insert({
          airtable_id: airtableRecordId,
          name: name,
          phone: phone,
          industry: industry || null,
          revenue_range: revenue_range || null,
          inquiry_volume: inquiry_volume || main_goal || null,
          utm: utmData,
        })
        .select()
        .single();

      if (supabaseError) {
        console.error('[Sync] ❌ Supabase write error:', supabaseError);
        // If Airtable succeeded but Supabase failed, still return success
        // (Airtable is the source of truth for now)
        if (airtableRecordId) {
          return NextResponse.json({
            success: true,
            airtable_id: airtableRecordId,
            warning: 'Supabase sync failed, but Airtable write succeeded',
          });
        }
        throw supabaseError;
      }

      console.log('[Sync] ✅ Written to Supabase:', sessionData.id);

      return NextResponse.json({
        success: true,
        airtable_id: airtableRecordId,
        supabase_id: sessionData.id,
        message: 'Booking synced successfully',
      });
    } catch (supabaseError: any) {
      console.error('[Sync] ❌ Supabase error:', supabaseError);
      
      // If Airtable succeeded, return partial success
      if (airtableRecordId) {
        return NextResponse.json({
          success: true,
          airtable_id: airtableRecordId,
          warning: 'Airtable write succeeded, but Supabase sync failed',
        });
      }
      
      return NextResponse.json(
        { success: false, error: 'Failed to sync booking', details: supabaseError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[Sync] ❌ Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

