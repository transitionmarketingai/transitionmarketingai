import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();

    // Verify admin authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { status, notes } = body;

    // Update consultation
    const { data: consultation, error: updateError } = await supabase
      .from('consultations')
      .update({
        status,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (updateError) {
      console.error('Consultation update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update consultation' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        consultation,
        message: 'Consultation updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin consultation update error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

