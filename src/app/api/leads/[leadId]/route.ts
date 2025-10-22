import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch single lead
export async function GET(
  request: NextRequest,
  { params }: { params: { leadId: string } }
) {
  try {
    const supabase = await createClient();

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

    // Fetch lead
    const { data: lead, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', params.leadId)
      .eq('customer_id', customer.id)
      .single();

    if (error || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead });

  } catch (error: any) {
    console.error('Fetch lead error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: { leadId: string } }
) {
  try {
    const body = await request.json();
    const supabase = await createClient();

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

    // Update lead
    const { data: updatedLead, error } = await supabase
      .from('leads')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.leadId)
      .eq('customer_id', customer.id)
      .select()
      .single();

    if (error) {
      console.error('Update lead error:', error);
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      );
    }

    // Log the update
    await supabase.from('audit_logs').insert({
      customer_id: customer.id,
      user_email: user.email,
      action: 'updated',
      resource_type: 'lead',
      resource_id: params.leadId,
      changes: body,
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
    });

  } catch (error: any) {
    console.error('Update lead error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: { leadId: string } }
) {
  try {
    const supabase = await createClient();

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

    // Delete lead
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', params.leadId)
      .eq('customer_id', customer.id);

    if (error) {
      console.error('Delete lead error:', error);
      return NextResponse.json(
        { error: 'Failed to delete lead' },
        { status: 500 }
      );
    }

    // Log deletion
    await supabase.from('audit_logs').insert({
      customer_id: customer.id,
      user_email: user.email,
      action: 'deleted',
      resource_type: 'lead',
      resource_id: params.leadId,
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    });

  } catch (error: any) {
    console.error('Delete lead error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


