import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch all contacts for customer
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status'); // outreach_status
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const minScore = searchParams.get('minScore');
    const city = searchParams.get('city');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase
      .from('contacts')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('outreach_status', status);
    }

    if (source && source !== 'all') {
      query = query.eq('source', source);
    }

    if (minScore) {
      query = query.gte('quality_score', parseInt(minScore));
    }

    if (city) {
      query = query.eq('city', city);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,company.ilike.%${search}%`);
    }

    const { data: contacts, error } = await query;

    if (error) {
      console.error('Fetch contacts error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch contacts' },
        { status: 500 }
      );
    }

    // Get total count for pagination
    const { count } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', customer.id);

    // Get statistics
    const { data: stats } = await supabase
      .from('contacts')
      .select('outreach_status, verification_status')
      .eq('customer_id', customer.id);

    const statistics = {
      total: count || 0,
      pending: stats?.filter(s => s.outreach_status === 'pending').length || 0,
      sent: stats?.filter(s => s.outreach_status === 'sent').length || 0,
      responded: stats?.filter(s => s.outreach_status === 'responded').length || 0,
      converted: stats?.filter(s => s.verification_status === 'verified').length || 0,
    };

    return NextResponse.json({
      contacts,
      total: count || 0,
      limit,
      offset,
      statistics,
    });

  } catch (error: any) {
    console.error('Contacts API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new contact manually
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Check for duplicates
    const { data: existingContact } = await supabase
      .from('contacts')
      .select('id')
      .eq('customer_id', customer.id)
      .or(`phone.eq.${body.phone}${body.email ? `,email.eq.${body.email}` : ''}`)
      .single();

    if (existingContact) {
      return NextResponse.json(
        { error: 'Contact with this phone/email already exists' },
        { status: 409 }
      );
    }

    // Create contact
    const { data: newContact, error: createError } = await supabase
      .from('contacts')
      .insert({
        customer_id: customer.id,
        name: body.name,
        email: body.email || null,
        phone: body.phone,
        company: body.company || null,
        job_title: body.job_title || null,
        city: body.city || null,
        state: body.state || null,
        source: 'manual_import',
        quality_score: body.quality_score || 60,
        outreach_status: 'pending',
      })
      .select()
      .single();

    if (createError) {
      console.error('Create contact error:', createError);
      return NextResponse.json(
        { error: 'Failed to create contact' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: newContact,
    });

  } catch (error: any) {
    console.error('Create contact error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Bulk update contacts
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactIds, updates } = body;

    if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
      return NextResponse.json(
        { error: 'contactIds array is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Update contacts
    const { data: updatedContacts, error: updateError } = await supabase
      .from('contacts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .in('id', contactIds)
      .eq('customer_id', customer.id)
      .select();

    if (updateError) {
      console.error('Bulk update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update contacts' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      updated: updatedContacts?.length || 0,
      contacts: updatedContacts,
    });

  } catch (error: any) {
    console.error('Bulk update error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

