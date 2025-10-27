import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
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

    // Fetch all consultations
    const { data: consultations, error: consultationsError } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (consultationsError) {
      console.error('Consultations fetch error:', consultationsError);
      return NextResponse.json(
        { error: 'Failed to fetch consultations' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        consultations: consultations || [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin consultations API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

