import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    let query = supabase
      .from('verified_inquiries')
      .select(
        `
        id,
        name,
        phone,
        email,
        industry,
        ai_score,
        verification_status,
        delivered,
        delivered_at,
        requirement,
        client_email
      `
      )
      .eq('delivered', true)
      .order('delivered_at', { ascending: false })
      .limit(200);

    if (email) {
      query = query.eq('client_email', email);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error in /api/client/inquiries:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to load inquiries' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiries: data || [],
    });
  } catch (err) {
    console.error('Unexpected error in /api/client/inquiries:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}

