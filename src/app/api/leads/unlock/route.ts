// API Endpoint: Unlock Lead Contact Information
// Deducts credits and reveals full contact details

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_ffcfced7c01011589c6b107a806e8f00dd71da39';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, userId } = body;

    if (!leadId || !userId) {
      return NextResponse.json(
        { error: 'Missing leadId or userId' },
        { status: 400 }
      );
    }

    // Check if already unlocked
    const { data: existing } = await supabase
      .from('unlocked_leads')
      .select('*')
      .eq('user_id', userId)
      .eq('lead_id', leadId)
      .single();

    if (existing) {
      // Already unlocked, just return the lead data
      const { data: lead } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

      return NextResponse.json({
        success: true,
        alreadyUnlocked: true,
        lead,
        message: 'Lead already unlocked',
      });
    }

    // Get user's current credits
    const { data: profile } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();

    const UNLOCK_COST = 5;

    if (!profile || profile.credits < UNLOCK_COST) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          creditsNeeded: UNLOCK_COST,
          creditsAvailable: profile?.credits || 0
        },
        { status: 402 }
      );
    }

    // Deduct credits
    const newCredits = profile.credits - UNLOCK_COST;
    await supabase
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', userId);

    // Record unlock
    await supabase
      .from('unlocked_leads')
      .insert({
        user_id: userId,
        lead_id: leadId,
        credits_spent: UNLOCK_COST,
      });

    // Log credit transaction
    await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        amount: -UNLOCK_COST,
        type: 'usage',
        description: 'Unlocked lead contact information',
        reference_id: `lead_unlock_${leadId}`,
      });

    // Get full lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError) {
      console.error('Error fetching lead:', leadError);
      return NextResponse.json(
        { error: 'Failed to fetch lead details' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead,
      creditsSpent: UNLOCK_COST,
      creditsRemaining: newCredits,
      message: 'Lead unlocked successfully!',
    });

  } catch (error) {
    console.error('Unlock lead error:', error);
    return NextResponse.json(
      { error: 'Failed to unlock lead' },
      { status: 500 }
    );
  }
}

// Bulk unlock endpoint
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { leadIds, userId } = body;

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0 || !userId) {
      return NextResponse.json(
        { error: 'Missing or invalid leadIds or userId' },
        { status: 400 }
      );
    }

    // Get user's current credits
    const { data: profile } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();

    const UNLOCK_COST = 5;
    const totalCost = leadIds.length * UNLOCK_COST;

    if (!profile || profile.credits < totalCost) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          creditsNeeded: totalCost,
          creditsAvailable: profile?.credits || 0
        },
        { status: 402 }
      );
    }

    // Check which leads are already unlocked
    const { data: alreadyUnlocked } = await supabase
      .from('unlocked_leads')
      .select('lead_id')
      .eq('user_id', userId)
      .in('lead_id', leadIds);

    const alreadyUnlockedIds = alreadyUnlocked?.map(u => u.lead_id) || [];
    const newLeadsToUnlock = leadIds.filter(id => !alreadyUnlockedIds.includes(id));

    if (newLeadsToUnlock.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All selected leads already unlocked',
        creditsSpent: 0,
        creditsRemaining: profile.credits,
      });
    }

    const actualCost = newLeadsToUnlock.length * UNLOCK_COST;

    // Deduct credits
    const newCredits = profile.credits - actualCost;
    await supabase
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', userId);

    // Record unlocks
    const unlockRecords = newLeadsToUnlock.map(leadId => ({
      user_id: userId,
      lead_id: leadId,
      credits_spent: UNLOCK_COST,
    }));

    await supabase
      .from('unlocked_leads')
      .insert(unlockRecords);

    // Log credit transaction
    await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        amount: -actualCost,
        type: 'usage',
        description: `Unlocked ${newLeadsToUnlock.length} leads`,
        reference_id: `bulk_unlock_${Date.now()}`,
      });

    // Get all unlocked leads
    const { data: leads } = await supabase
      .from('leads')
      .select('*')
      .in('id', leadIds);

    return NextResponse.json({
      success: true,
      leads,
      creditsSpent: actualCost,
      creditsRemaining: newCredits,
      unlockedCount: newLeadsToUnlock.length,
      message: `Successfully unlocked ${newLeadsToUnlock.length} leads!`,
    });

  } catch (error) {
    console.error('Bulk unlock error:', error);
    return NextResponse.json(
      { error: 'Failed to unlock leads' },
      { status: 500 }
    );
  }
}
