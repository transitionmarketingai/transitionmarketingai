// Saved Searches API
// Manage user's saved search templates

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_ffcfced7c01011589c6b107a806e8f00dd71da39';
const supabase = createClient(supabaseUrl, supabaseKey);

// GET - Fetch user's saved searches
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved searches:', error);
      return NextResponse.json(
        { error: 'Failed to fetch saved searches' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      searches: data || [],
    });

  } catch (error) {
    console.error('Saved searches GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new saved search
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, filters } = body;

    if (!userId || !name || !filters) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('saved_searches')
      .insert({
        user_id: userId,
        name,
        filters,
        last_run: new Date().toISOString(),
        total_runs: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating saved search:', error);
      return NextResponse.json(
        { error: 'Failed to save search' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      search: data,
      message: 'Search saved successfully!',
    });

  } catch (error) {
    console.error('Saved searches POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update saved search (run again)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { searchId, userId } = body;

    if (!searchId || !userId) {
      return NextResponse.json(
        { error: 'Missing searchId or userId' },
        { status: 400 }
      );
    }

    // Increment run count and update last_run
    const { data, error } = await supabase
      .from('saved_searches')
      .update({
        last_run: new Date().toISOString(),
        total_runs: supabase.sql`total_runs + 1`,
      })
      .eq('id', searchId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating saved search:', error);
      return NextResponse.json(
        { error: 'Failed to update search' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      search: data,
    });

  } catch (error) {
    console.error('Saved searches PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove saved search
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchId = searchParams.get('searchId');
    const userId = searchParams.get('userId');

    if (!searchId || !userId) {
      return NextResponse.json(
        { error: 'Missing searchId or userId' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', searchId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting saved search:', error);
      return NextResponse.json(
        { error: 'Failed to delete search' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Search deleted successfully',
    });

  } catch (error) {
    console.error('Saved searches DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

