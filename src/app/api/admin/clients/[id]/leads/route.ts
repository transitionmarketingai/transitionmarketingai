import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check admin auth
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clientId = params.id;

    // Fetch leads delivered to this client
    const { data: leads, error } = await supabase
      .from('leads_delivered')
      .select('*')
      .eq('client_id', clientId)
      .order('delivered_at', { ascending: false });

    if (error) {
      console.error('Error fetching client leads:', error);
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }

    return NextResponse.json({ leads: leads || [] });

  } catch (error) {
    console.error('Error in GET /api/admin/clients/[id]/leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check admin auth
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clientId = params.id;
    const body = await request.json();
    const { leads } = body;

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({ error: 'Invalid leads data' }, { status: 400 });
    }

    // Insert leads
    const leadsToInsert = leads.map(lead => ({
      client_id: clientId,
      lead_name: lead.name,
      lead_email: lead.email,
      lead_phone: lead.phone,
      lead_source: lead.source || 'manual_upload',
      lead_data: lead.data || {},
      quality_score: lead.quality_score || 85,
      status: 'delivered',
      delivered_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from('leads_delivered')
      .insert(leadsToInsert)
      .select();

    if (error) {
      console.error('Error inserting leads:', error);
      return NextResponse.json({ error: 'Failed to upload leads' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Leads uploaded successfully',
      count: data.length,
      leads: data
    });

  } catch (error) {
    console.error('Error in POST /api/admin/clients/[id]/leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

