import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { aiFollowUpGenerator } from '@/lib/ai/followUpGenerator';

// POST - Generate AI follow-up sequence
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
      .select('id, business_name, industry')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Get lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', body.leadId)
      .eq('customer_id', customer.id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Prepare sequence context
    const context = {
      industry: customer.industry,
      leadName: lead.name,
      companyName: lead.lead_data?.company,
      leadRole: lead.lead_data?.jobTitle,
      leadSource: lead.source,
      businessName: customer.business_name,
      businessIndustry: customer.industry,
      leadData: lead.lead_data,
    };

    // Generate AI follow-up sequence
    const sequence = await aiFollowUpGenerator.generateSequence(context);

    // Save sequence to database
    const { data: savedSequence, error: saveError } = await supabase
      .from('outreach_campaigns')
      .insert({
        customer_id: customer.id,
        name: sequence.name,
        status: 'draft',
        target_criteria: {
          lead_id: lead.id,
          industry: customer.industry,
        },
        whatsapp_template: sequence.steps.find(s => s.channel === 'whatsapp')?.message,
        email_template: sequence.steps.find(s => s.channel === 'email')?.message,
        frequency: 'once',
        max_messages_per_run: sequence.steps.length,
      })
      .select()
      .single();

    if (saveError) {
      console.error('Save sequence error:', saveError);
      return NextResponse.json(
        { error: 'Failed to save sequence' },
        { status: 500 }
      );
    }

    // Create notification
    await supabase.from('notifications').insert({
      customer_id: customer.id,
      type: 'system',
      title: 'AI Follow-up Sequence Generated',
      message: `Generated ${sequence.steps.length}-step sequence for ${lead.name}`,
      lead_id: lead.id,
      priority: 'normal',
    });

    return NextResponse.json({
      success: true,
      sequence,
      savedSequence,
    });

  } catch (error: any) {
    console.error('AI follow-up generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get optimal timing for outreach
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const leadId = searchParams.get('leadId');
    const channel = searchParams.get('channel') as 'email' | 'whatsapp' | 'sms';
    
    if (!leadId || !channel) {
      return NextResponse.json(
        { error: 'Lead ID and channel are required' },
        { status: 400 }
      );
    }

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
      .select('id, industry')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .eq('customer_id', customer.id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Get optimal timing
    const timing = await aiFollowUpGenerator.generateOptimalTiming(
      lead.lead_data,
      customer.industry,
      channel
    );

    return NextResponse.json({
      success: true,
      timing,
    });

  } catch (error: any) {
    console.error('Get optimal timing error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
