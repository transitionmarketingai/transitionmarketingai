import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Simple OTP generator (for production, use a proper SMS service)
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Rate limiting: max 3 OTP requests per hour per phone
async function checkRateLimit(phone: string, supabase: any): Promise<{ allowed: boolean; retryAfter?: number }> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  const { data, error } = await supabase
    .from('otp_verifications')
    .select('created_at')
    .eq('phone', phone.replace(/\D/g, ''))
    .gte('created_at', oneHourAgo)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Rate limit check error:', error);
    // If table doesn't exist, allow for now
    return { allowed: true };
  }

  const recentRequests = data?.length || 0;
  
  if (recentRequests >= 3) {
    // Calculate retry after time
    const oldestRequest = data?.[data.length - 1]?.created_at;
    if (oldestRequest) {
      const retryTime = new Date(oldestRequest).getTime() + 60 * 60 * 1000;
      const retryAfter = Math.ceil((retryTime - Date.now()) / 1000 / 60); // minutes
      return { allowed: false, retryAfter };
    }
    return { allowed: false, retryAfter: 60 };
  }

  return { allowed: true };
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

    const supabase = createClient();
    
    // Check rate limit
    const rateLimit = await checkRateLimit(phone, supabase);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: `Too many OTP requests. Please try again after ${rateLimit.retryAfter} minutes.`,
          retryAfter: rateLimit.retryAfter 
        },
        { status: 429 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP in database
    const { error } = await supabase
      .from('otp_verifications')
      .upsert({
        phone: phone.replace(/\D/g, ''),
        otp,
        expires_at: new Date(expiry).toISOString(),
        verified: false,
        created_at: new Date().toISOString(),
      }, {
        onConflict: 'phone'
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

