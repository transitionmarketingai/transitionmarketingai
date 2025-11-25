import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Simple Airtable Submission Endpoint with Supabase Mirror
 * 
 * 1. Submits strategy call form data directly to Airtable "Bookings" table.
 * 2. Mirrors the same data to Supabase "sessions" table.
 * 
 * Uses environment variables: AIRTABLE_API_KEY, AIRTABLE_BASE_ID, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Get Airtable configuration from environment variables
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const tableName = 'Bookings';

    // Validate Airtable configuration
    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        { success: false, error: 'Airtable configuration missing' },
        { status: 500 }
      );
    }

    // Prepare Airtable fields
    const fields: Record<string, any> = {
      Name: data.name,
      Phone: data.phone,
      Industry: data.industry,
      Revenue_Range: data.revenue_range,
      Inquiry_Volume: data.inquiry_volume,
    };

    // Add UTM fields if provided
    if (data.utm) {
      if (data.utm.source) fields.utm_source = data.utm.source;
      if (data.utm.medium) fields.utm_medium = data.utm.medium;
      if (data.utm.campaign) fields.utm_campaign = data.utm.campaign;
      if (data.utm.term) fields.utm_term = data.utm.term;
      if (data.utm.content) fields.utm_content = data.utm.content;
    }

    // Add referrer if provided
    if (data.referrer) {
      fields.Referrer = data.referrer;
    }

    // 1) Send to Airtable
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${tableName}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: fields,
        }),
      }
    );

    if (!airtableRes.ok) {
      const errorText = await airtableRes.text();
      console.error('[Airtable Submit] Error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to submit to Airtable' },
        { status: airtableRes.status }
      );
    }

    // Parse Airtable response so we can store its ID
    const airtableJson = await airtableRes.json();
    const airtableId = airtableJson?.id || null;
    console.log('[Airtable Submit] ✅ Airtable success:', airtableId);

    // 2) Mirror into Supabase (non-blocking - don't fail if Supabase fails)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        const { error: supabaseError } = await supabase
          .schema('verified')
          .from('sessions')
          .insert({
            airtable_id: airtableId ? parseInt(airtableId) : null,
            name: data.name,
            phone: data.phone,
            industry: data.industry || null,
            revenue_range: data.revenue_range || null,
            inquiry_volume: data.inquiry_volume || null,
            utm: data.utm || {},
            referrer: data.referrer || null,
          });

        if (supabaseError) {
          console.error('[Airtable Submit] ⚠️ Supabase mirror failed (non-critical):', supabaseError);
          // Don't fail the request - Airtable is primary
        } else {
          console.log('[Airtable Submit] ✅ Supabase mirror success');
        }
      } else {
        console.log('[Airtable Submit] ⚠️ Supabase not configured, skipping mirror');
      }
    } catch (supabaseError) {
      console.error('[Airtable Submit] ⚠️ Supabase mirror error (non-critical):', supabaseError);
      // Don't fail the request - Airtable is primary
    }

    return NextResponse.json({ success: true, record_id: airtableId });
  } catch (error: any) {
    console.error('[Airtable Submit] ❌ Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

