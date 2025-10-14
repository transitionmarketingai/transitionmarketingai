import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch notifications for customer
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

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

    const searchParams = request.nextUrl.searchParams;
    const unreadOnly = searchParams.get('unread') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
      .from('notifications')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data: notifications, error } = await query;

    if (error) {
      console.error('Fetch notifications error:', error);
      return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }

    const unreadCount = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', customer.id)
      .eq('is_read', false);

    return NextResponse.json({
      notifications: notifications || [],
      total: notifications?.length || 0,
      unread_count: unreadCount.count || 0,
    });

  } catch (error: any) {
    console.error('Notifications API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH - Mark notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationIds } = body;

    const supabase = createClient();

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

    // Mark as read
    const { error } = await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .in('id', notificationIds)
      .eq('customer_id', customer.id);

    if (error) {
      console.error('Update notifications error:', error);
      return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      updated: notificationIds.length,
    });

  } catch (error: any) {
    console.error('Update notifications error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

