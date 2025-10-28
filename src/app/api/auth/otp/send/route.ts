import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Simple OTP generator (for production, use a proper SMS service)
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP in database (or Redis in production)
    const supabase = createClient();
    
    // For now, we'll use a simple table. In production, use Redis or Supabase Edge Functions
    const { error } = await supabase
      .from('otp_verifications')
      .upsert({
        phone: phone.replace(/\D/g, ''),
        otp,
        expires_at: new Date(expiry).toISOString(),
        verified: false,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('OTP storage error:', error);
      // If table doesn't exist, we'll just log it for now
    }

    // TODO: Send OTP via SMS service (Twilio/Gupshup/Fast2SMS)
    // For now, return OTP in development mode
    // In production, remove this and send via SMS
    
    const isDev = process.env.NODE_ENV === 'development';
    const otpToReturn = isDev ? otp : null;

    // In production, integrate with SMS service:
    // await sendSMS(phone, `Your OTP for Transition Marketing AI is ${otp}. Valid for 10 minutes.`);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // Only return OTP in development
      ...(isDev && { otp: otpToReturn }),
    });

  } catch (error: any) {
    console.error('OTP send error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send OTP' },
      { status: 500 }
    );
  }
}

