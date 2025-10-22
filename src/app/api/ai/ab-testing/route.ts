import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { smartABTesting } from '@/lib/ai/smartABTesting';

// POST - Generate A/B test variants
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

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

    // Validate required fields
    if (!body.originalMessage) {
      return NextResponse.json(
        { error: 'Original message is required' },
        { status: 400 }
      );
    }

    // Generate A/B test variants
    const variants = await smartABTesting.generateABTestVariants(
      body.originalMessage,
      customer.industry,
      body.leadContext
    );

    // Save A/B test to database
    const { data: abTest, error: saveError } = await supabase
      .from('ab_tests')
      .insert({
        customer_id: customer.id,
        name: `A/B Test - ${new Date().toLocaleDateString()}`,
        industry: customer.industry,
        variants: variants,
        status: 'draft',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) {
      console.error('Save A/B test error:', saveError);
      return NextResponse.json(
        { error: 'Failed to save A/B test' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      variants,
      abTest,
    });

  } catch (error: any) {
    console.error('A/B test generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get A/B test results
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const testId = searchParams.get('testId');
    
    if (!testId) {
      return NextResponse.json(
        { error: 'Test ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

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
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Get A/B test
    const { data: abTest, error: abTestError } = await supabase
      .from('ab_tests')
      .select('*')
      .eq('id', testId)
      .eq('customer_id', customer.id)
      .single();

    if (abTestError || !abTest) {
      return NextResponse.json(
        { error: 'A/B test not found' },
        { status: 404 }
      );
    }

    // Analyze results if test is completed
    if (abTest.status === 'completed' && abTest.results) {
      const analysis = await smartABTesting.analyzeABTestResults(abTest);
      
      // Update test with analysis
      await supabase
        .from('ab_tests')
        .update({
          winner: analysis.winner,
          insights: analysis.insights,
          recommendations: analysis.recommendations,
          updated_at: new Date().toISOString(),
        })
        .eq('id', testId);

      return NextResponse.json({
        success: true,
        abTest: {
          ...abTest,
          winner: analysis.winner,
          insights: analysis.insights,
          recommendations: analysis.recommendations,
        },
        analysis,
      });
    }

    return NextResponse.json({
      success: true,
      abTest,
    });

  } catch (error: any) {
    console.error('A/B test results error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update A/B test results
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

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
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    if (!body.testId || !body.results) {
      return NextResponse.json(
        { error: 'Test ID and results are required' },
        { status: 400 }
      );
    }

    // Update A/B test results
    const { data: updatedTest, error: updateError } = await supabase
      .from('ab_tests')
      .update({
        results: body.results,
        status: 'completed',
        end_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', body.testId)
      .eq('customer_id', customer.id)
      .select()
      .single();

    if (updateError) {
      console.error('Update A/B test error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update A/B test' },
        { status: 500 }
      );
    }

    // Analyze results
    const analysis = await smartABTesting.analyzeABTestResults(updatedTest);

    return NextResponse.json({
      success: true,
      abTest: updatedTest,
      analysis,
    });

  } catch (error: any) {
    console.error('A/B test update error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
