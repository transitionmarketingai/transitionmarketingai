import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

    // Fetch all clients with their subscription details
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select(`
        *,
        custom_plans (
          monthly_cost,
          leads_quota,
          plan_name
        ),
        leads_delivered (
          id
        )
      `)
      .order('created_at', { ascending: false });

    if (clientsError) {
      console.error('Clients fetch error:', clientsError);
      return NextResponse.json(
        { error: 'Failed to fetch clients' },
        { status: 500 }
      );
    }

    // Transform data to include calculated fields
    const transformedClients = clients?.map(client => ({
      id: client.id,
      business_name: client.business_name,
      contact_person: client.contact_person,
      email: client.email,
      phone: client.phone,
      industry: client.industry || 'N/A',
      status: client.status,
      current_plan: client.custom_plans?.[0]?.plan_name || 'No Plan',
      monthly_revenue: client.custom_plans?.[0]?.monthly_cost || 0,
      leads_quota: client.custom_plans?.[0]?.leads_quota || 0,
      leads_delivered: client.leads_delivered?.length || 0,
      created_at: client.created_at,
    })) || [];

    return NextResponse.json(
      {
        success: true,
        clients: transformedClients,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin clients API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
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
    const {
      business_name,
      contact_person,
      email,
      phone,
      industry,
      status,
    } = body;

    // Validate required fields
    if (!business_name || !contact_person || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new client
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert({
        business_name,
        contact_person,
        email,
        phone,
        industry: industry || null,
        status: status || 'pending',
      })
      .select()
      .single();

    if (clientError) {
      console.error('Client creation error:', clientError);
      return NextResponse.json(
        { error: 'Failed to create client' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        client,
        message: 'Client created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Admin client creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

