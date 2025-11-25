import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkAdminKey } from '@/lib/checkAdminKey';

/**
 * Update Verification Status
 * 
 * Simple API route to update the verification_status of an inquiry.
 * This is a basic update route - no automation or AI logic.
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

    const { id, verification_status, notes } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing inquiry ID' },
        { status: 400 }
      );
    }

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

    const { error } = await supabase
      .from('verified_inquiries')
      .update({
        verification_status,
        verification_notes: notes || null,
        verified_at:
          verification_status === 'verified' ? new Date().toISOString() : null,
      })
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
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

