import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch single contact
export async function GET(
  request: NextRequest,
  { params }: { params: { contactId: string } }
) {
  try {
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

    // Fetch contact
    const { data: contact, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', params.contactId)
      .eq('customer_id', customer.id)
      .single();

    if (error || !contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    // Get outreach history
    const { data: outreachHistory } = await supabase
      .from('outreach_messages')
      .select('*')
      .eq('contact_id', params.contactId)
      .order('sent_at', { ascending: false });

    return NextResponse.json({ 
      contact,
      outreach_history: outreachHistory || [],
    });

  } catch (error: any) {
    console.error('Fetch contact error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update contact
export async function PATCH(
  request: NextRequest,
  { params }: { params: { contactId: string } }
) {
  try {
    const body = await request.json();
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

    // Update contact
    const { data: updatedContact, error } = await supabase
      .from('contacts')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.contactId)
      .eq('customer_id', customer.id)
      .select()
      .single();

    if (error) {
      console.error('Update contact error:', error);
      return NextResponse.json(
        { error: 'Failed to update contact' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: updatedContact,
    });

  } catch (error: any) {
    console.error('Update contact error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { contactId: string } }
) {
  try {
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

    // Delete contact
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', params.contactId)
      .eq('customer_id', customer.id);

    if (error) {
      console.error('Delete contact error:', error);
      return NextResponse.json(
        { error: 'Failed to delete contact' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact deleted successfully',
    });

  } catch (error: any) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

