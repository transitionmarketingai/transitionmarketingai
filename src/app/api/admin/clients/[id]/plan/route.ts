import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();

    // Verify admin authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const clientId = params.id;

    // Check if plan already exists for this client
    const { data: existingPlan } = await supabase
      .from('custom_plans')
      .select('id')
      .eq('client_id', clientId)
      .single();

    let plan;

    if (existingPlan) {
      // Update existing plan
      const { data: updatedPlan, error: updateError } = await supabase
        .from('custom_plans')
        .update({
          ...body,
          client_id: clientId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingPlan.id)
        .select()
        .single();

      if (updateError) {
        console.error('Plan update error:', updateError);
        return NextResponse.json(
          { error: 'Failed to update plan' },
          { status: 500 }
        );
      }

      plan = updatedPlan;
    } else {
      // Create new plan
      const { data: newPlan, error: createError } = await supabase
        .from('custom_plans')
        .insert({
          ...body,
          client_id: clientId,
        })
        .select()
        .single();

      if (createError) {
        console.error('Plan creation error:', createError);
        return NextResponse.json(
          { error: 'Failed to create plan' },
          { status: 500 }
        );
      }

      plan = newPlan;
    }

    // Update client status to active if it was pending
    await supabase
      .from('clients')
      .update({ status: 'active' })
      .eq('id', clientId)
      .eq('status', 'pending');

    return NextResponse.json(
      {
        success: true,
        plan,
        message: 'Plan saved successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin plan save error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

