import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function GET(
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

    // Fetch client with related data
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select(`
        *,
        custom_plans (*),
        leads_delivered (*)
      `)
      .eq('id', params.id)
      .single();

    if (clientError) {
      console.error('Client fetch error:', clientError);
      return NextResponse.json(
        { error: 'Failed to fetch client' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        client,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin client detail API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    // Update client
    const { data: client, error: updateError } = await supabase
      .from('clients')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (updateError) {
      console.error('Client update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update client' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        client,
        message: 'Client updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin client update error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

