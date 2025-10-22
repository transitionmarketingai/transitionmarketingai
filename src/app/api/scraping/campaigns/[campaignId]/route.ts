import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// PATCH - Update scraping campaign status
export async function PATCH(request: NextRequest, { params }: { params: { campaignId: string } }) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const { data: campaign, error: updateError } = await supabase
      .from('scraping_campaigns')
      .update({
        status: body.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.campaignId)
      .eq('customer_id', customer.id)
      .select()
      .single();

    if (updateError) {
      console.error('Update scraping campaign error:', updateError);
      return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      campaign,
    });

  } catch (error: any) {
    console.error('Update scraping campaign error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete scraping campaign
export async function DELETE(request: NextRequest, { params }: { params: { campaignId: string } }) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const { error: deleteError } = await supabase
      .from('scraping_campaigns')
      .delete()
      .eq('id', params.campaignId)
      .eq('customer_id', customer.id);

    if (deleteError) {
      console.error('Delete scraping campaign error:', deleteError);
      return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error('Delete scraping campaign error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
