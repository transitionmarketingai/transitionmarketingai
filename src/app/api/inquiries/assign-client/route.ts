import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key') || '';

    if (
      !process.env.NEXT_PUBLIC_ADMIN_KEY ||
      adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY
    ) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, client_email } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing inquiry id' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('verified_inquiries')
      .update({
        client_email: client_email || null,
      })
      .eq('id', id)
      .select('id, client_email')
      .single();

    if (error) {
      console.error('Error updating client_email:', error);
      return NextResponse.json(
        { success: false, error: 'Database update failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiry: data,
    });
  } catch (err) {
    console.error('assign-client error:', err);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

