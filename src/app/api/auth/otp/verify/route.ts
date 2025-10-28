import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Phone and OTP are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Verify OTP
    const { data: otpData, error } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('phone', phone.replace(/\D/g, ''))
      .eq('otp', otp)
      .eq('verified', false)
      .single();

    if (error || !otpData) {
      return NextResponse.json(
        { 
          error: 'Invalid OTP code. Please check and try again, or request a new OTP.',
          verified: false 
        },
        { status: 400 }
      );
    }

    // Check if OTP expired
    const expiresAt = new Date(otpData.expires_at).getTime();
    if (Date.now() > expiresAt) {
      return NextResponse.json(
        { 
          error: 'OTP has expired. Please request a new OTP (valid for 10 minutes).',
          verified: false,
          expired: true
        },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    await supabase
      .from('otp_verifications')
      .update({ verified: true, verified_at: new Date().toISOString() })
      .eq('id', otpData.id);

    return NextResponse.json({
      success: true,
      verified: true,
      message: 'Phone number verified successfully',
    });

  } catch (error: any) {
    console.error('OTP verify error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify OTP', verified: false },
      { status: 500 }
    );
  }
}

