import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkAdminKey } from '@/lib/checkAdminKey';

/**
 * Create Verified Inquiry
 * 
 * Simple API route to insert a verified inquiry into Supabase "verified_inquiries" table.
 * This is a basic insert route for future use - not connected to forms yet.
 * Protected by admin API key.
 */
export async function POST(request: NextRequest) {
  // Check admin API key
  if (!checkAdminKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();

    const {
      name,
      phone,
      email,
      industry,
      requirement,
      budget,
      timeline,
      source,
      utm,
      verification_notes,
      verified_at,
    } = data;

    // Get Supabase configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { success: false, error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase.from('verified_inquiries').insert({
      name,
      phone,
      email: email || null,
      industry,
      requirement,
      budget,
      timeline,
      source,
      utm: utm || {},
      verification_status: 'pending',
      verification_notes: verification_notes ?? null,
      verified_at: verified_at ?? null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

