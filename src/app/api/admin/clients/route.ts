import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse, handleSupabaseError } from '@/lib/apiHelpers';

export async function GET(req: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(req);
    if (authError) {
      return authError;
    }

    const supabase = getSupabaseServerClient();

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

    if (handleSupabaseError(clientsError, 'Fetching clients')) {
      return NextResponse.json(
        createErrorResponse('Failed to fetch clients'),
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
      createSuccessResponse({ clients: transformedClients })
    );
  } catch (error: any) {
    console.error('[Admin Clients GET] Unexpected error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(req);
    if (authError) {
      return authError;
    }

    const supabase = getSupabaseServerClient();
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
        createErrorResponse('Missing required fields: business_name, contact_person, email, phone'),
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

    if (handleSupabaseError(clientError, 'Creating client')) {
      return NextResponse.json(
        createErrorResponse('Failed to create client'),
        { status: 500 }
      );
    }

    return NextResponse.json(
      createSuccessResponse({ client, message: 'Client created successfully' }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[Admin Clients POST] Unexpected error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}

