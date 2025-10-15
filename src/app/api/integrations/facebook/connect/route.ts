import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code required' }, { status: 400 });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_APP_URL + '/api/integrations/facebook/callback',
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 400 });
    }

    // Get user's ad accounts
    const adAccountsResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/adaccounts?access_token=${tokenData.access_token}&fields=id,name,account_status`
    );

    const adAccountsData = await adAccountsResponse.json();

    // Store in database
    const { error: dbError } = await supabase
      .from('ad_account_connections')
      .upsert({
        customer_id: user.id,
        platform: 'facebook',
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        ad_accounts: adAccountsData.data || [],
        connected_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save connection' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      accounts: adAccountsData.data || [],
    });
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET - Check connection status
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: connection } = await supabase
      .from('ad_account_connections')
      .select('*')
      .eq('customer_id', user.id)
      .eq('platform', 'facebook')
      .single();

    if (!connection) {
      return NextResponse.json({ connected: false });
    }

    // Check if token expired
    const isExpired = new Date(connection.expires_at) < new Date();

    return NextResponse.json({
      connected: !isExpired,
      accounts: connection.ad_accounts || [],
      connected_at: connection.connected_at,
    });
  } catch (error) {
    console.error('Check connection error:', error);
    return NextResponse.json({ connected: false });
  }
}

// DELETE - Disconnect account
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('ad_account_connections')
      .delete()
      .eq('customer_id', user.id)
      .eq('platform', 'facebook');

    if (error) {
      return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Disconnect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

