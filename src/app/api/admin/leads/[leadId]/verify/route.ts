import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST - Verify a lead
export async function POST(
  request: NextRequest,
  { params }: { params: { leadId: string } }
) {
  try {
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

    const body = await request.json();
    const {
      phone_verified,
      email_verified,
      business_verified,
      verification_status,
      verification_notes,
    } = body;

    // Update lead verification status
    const updateData: any = {
      phone_verified: phone_verified || false,
      email_verified: email_verified || false,
      business_verified: business_verified || false,
      verification_status: verification_status || 'pending',
      verification_notes: verification_notes || null,
    };

    // Set verified_at if all checks pass
    if (verification_status === 'verified') {
      updateData.verified_at = new Date().toISOString();
    }

    const { data: lead, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', params.leadId)
      .select()
      .single();

    if (error) {
      console.error('Update lead verification error:', error);
      return NextResponse.json(
        { error: 'Failed to update lead verification' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead,
      message: 'Lead verification updated successfully',
    });
  } catch (error: any) {
    console.error('Verify lead API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

