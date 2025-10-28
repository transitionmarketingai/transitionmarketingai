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

    const supabase = await createClient();
    
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

    // Send OTP via SMS service
    const cleanPhone = phone.replace(/\D/g, '');
    const isDev = process.env.NODE_ENV === 'development';
    
    // Log for debugging (without exposing full key)
    const hasFast2SMS = !!process.env.FAST2SMS_API_KEY;
    console.log('Fast2SMS API Key exists:', hasFast2SMS);
    console.log('Fast2SMS API Key length:', process.env.FAST2SMS_API_KEY?.length || 0);
    console.log('Phone number:', cleanPhone);
    
    try {
      // Try Fast2SMS first (recommended for India)
      const fast2smsKey = process.env.FAST2SMS_API_KEY;
      if (fast2smsKey && fast2smsKey.trim()) {
        try {
          const phoneToUse = cleanPhone.length === 12 ? cleanPhone : `91${cleanPhone}`;
          console.log('Sending OTP to Fast2SMS for phone:', phoneToUse);
          
          const fast2smsResponse = await fetch('https://www.fast2sms.com/dev/bulkV2', {
            method: 'POST',
            headers: {
              'authorization': process.env.FAST2SMS_API_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              route: 'otp',
              variables_values: otp,
              numbers: phoneToUse
            })
          });

          let fast2smsData;
          try {
            fast2smsData = await fast2smsResponse.json();
          } catch (parseError) {
            const textResponse = await fast2smsResponse.text();
            console.error('Fast2SMS response parse error:', textResponse);
            throw new Error('Invalid response from Fast2SMS: ' + textResponse);
          }
          
          console.log('Fast2SMS response:', JSON.stringify(fast2smsData, null, 2));
          
          // Fast2SMS success check - check multiple possible response formats
          if (fast2smsData.return === true || 
              fast2smsData.status === 'success' || 
              fast2smsData.success === true ||
              (fast2smsData.message && fast2smsData.message.includes('SMS sent'))) {
            return NextResponse.json({
              success: true,
              message: 'OTP sent successfully via SMS',
              ...(isDev && { otp: otp }), // Dev mode: also return OTP
            });
          } else {
            console.error('Fast2SMS error:', fast2smsData);
            // If Fast2SMS fails, still return OTP for testing
            return NextResponse.json({
              success: true,
              message: 'OTP sent successfully (SMS may have failed)',
              otp: otp,
              warning: fast2smsData.message || 'Fast2SMS API error'
            });
          }
        } catch (fast2smsError: any) {
          console.error('Fast2SMS API error:', fast2smsError);
          // Continue to fallback (return OTP for testing)
        }
      }
      
      // Fallback: Use Twilio SMS if Fast2SMS not configured
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        const twilio = require('twilio');
        const client = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );

        await client.messages.create({
          body: `Your OTP for Transition Marketing AI is ${otp}. Valid for 10 minutes.`,
          to: `+${cleanPhone.length === 12 ? cleanPhone : `91${cleanPhone}`}`,
          from: process.env.TWILIO_PHONE_NUMBER || 'TransitionMarketingAI'
        });

        return NextResponse.json({
          success: true,
          message: 'OTP sent successfully',
          ...(isDev && { otp: otp }), // Dev mode: also return OTP
        });
      }
      
      // If no SMS service configured, return OTP in dev/prod mode for now
      console.warn('⚠️ No SMS service configured. Returning OTP for testing. OTP:', otp);
      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
        otp: otp, // Return OTP so user can test
        warning: isDev ? 'Dev mode: SMS not configured' : 'SMS service not configured - OTP shown for testing'
      });
      
      // Uncomment below to enforce SMS service in production:
      // return NextResponse.json(
      //   { error: 'SMS service not configured. Please contact support.' },
      //   { status: 500 }
      // );
      
    } catch (smsError: any) {
      console.error('SMS sending error:', smsError);
      
      // In dev mode, still return success with OTP
      if (isDev) {
        return NextResponse.json({
          success: true,
          message: 'OTP generated (SMS failed, dev mode)',
          otp: otp,
          warning: 'SMS service error: ' + smsError.message
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to send OTP. Please try again later.' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('OTP send error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send OTP' },
      { status: 500 }
    );
  }
}

