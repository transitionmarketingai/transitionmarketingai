// API endpoint to fetch leads from database

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_ffcfced7c01011589c6b107a806e8f00dd71da39';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const industry = searchParams.get('industry');
    const status = searchParams.get('status');
    const minScore = searchParams.get('minScore');

    // Build query
    let query = supabase
      .from('leads')
      .select('*')
      .order('ai_score', { ascending: false });

    // Apply filters
    if (industry) {
      query = query.eq('industry', industry);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (minScore) {
      query = query.gte('ai_score', parseInt(minScore));
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Transform insights from JSON to array
    const leads = data?.map(lead => ({
      ...lead,
      insights: lead.insights ? JSON.parse(lead.insights) : [],
    })) || [];

    return NextResponse.json({
      success: true,
      leads: leads,
      total: leads.length,
    });

  } catch (error) {
    console.error('Fetch leads error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

