import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/tracking';

interface EmailLeadData {
  name: string;
  email: string;
  date_time?: string;
  calendly_link?: string;
  phone?: string;
  industry?: string;
}

/**
 * Send confirmation email after booking
 * Supports SMTP (nodemailer) or Resend API
 */
export async function POST(request: NextRequest) {
  try {
    const body: EmailLeadData = await request.json();
    const { name, email, date_time, calendly_link, phone, industry } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name and email' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0A3A8C 0%, #2563EB 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Your Free Strategy Call is Confirmed ✅</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you for booking your free strategy call with Transition Marketing AI.
            </p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 12px;">
                  <strong style="color: #0A3A8C;">Call Time:</strong> ${date_time || "We'll confirm shortly"}
                </li>
                ${calendly_link ? `
                <li style="margin-bottom: 12px;">
                  <strong style="color: #0A3A8C;">Meeting Link:</strong> 
                  <a href="${calendly_link}" style="color: #2563EB; text-decoration: none;">${calendly_link}</a>
                </li>
                ` : ''}
              </ul>
            </div>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              We'll analyze your goals and show you how many verified, warm inquiries we can deliver for your business.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Before the call, you'll receive a short summary of your custom AI Marketing Report.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 14px; color: #6b7280; margin: 0;">
                Talk soon,<br/>
                <strong style="color: #0A3A8C;">— The Transition Marketing AI Team</strong>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af;">
              <a href="https://transitionmarketingai.com" style="color: #2563EB; text-decoration: none;">Visit our website</a> | 
              <a href="https://transitionmarketingai.com/contact" style="color: #2563EB; text-decoration: none;">Contact us</a>
            </p>
          </div>
        </body>
      </html>
    `;

    // Try Resend first (if configured), then fall back to SMTP
    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;

    let emailSent = false;

    // Option 1: Use Resend API (recommended)
    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.SMTP_FROM || 'Transition Marketing AI <hello@transitionmarketingai.com>',
            to: email,
            subject: 'Your Free Strategy Call is Confirmed ✅',
            html: emailHtml,
          }),
        });

        if (resendResponse.ok) {
          emailSent = true;
          console.log('[Email] Confirmation sent via Resend');
        } else {
          const errorText = await resendResponse.text();
          console.error('[Email] Resend API error:', errorText);
        }
      } catch (error) {
        console.error('[Email] Resend error:', error);
      }
    }

    // Option 2: Fall back to SMTP (nodemailer)
    if (!emailSent && smtpHost && smtpUser && smtpPass) {
      try {
        const nodemailer = await import('nodemailer');
        
        const transporter = nodemailer.default.createTransport({
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT || '465'),
          secure: process.env.SMTP_PORT === '465' || process.env.SMTP_SECURE === 'true',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Transition Marketing AI" <hello@transitionmarketingai.com>',
          to: email,
          subject: 'Your Free Strategy Call is Confirmed ✅',
          html: emailHtml,
        });

        emailSent = true;
        console.log('[Email] Confirmation sent via SMTP');
      } catch (error) {
        console.error('[Email] SMTP error:', error);
      }
    }

    if (!emailSent) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured. Set RESEND_API_KEY or SMTP credentials.' },
        { status: 500 }
      );
    }

    // Fire analytics event
    trackEvent('email_confirmation_sent', {
      event_category: 'email',
      event_label: 'confirmation_email_sent',
      email: email,
      industry: industry || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent successfully',
      data: {
        email,
        name,
      },
    });
  } catch (error) {
    console.error('[Email] Error sending confirmation:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function GET() {
  const hasResend = !!process.env.RESEND_API_KEY;
  const hasSMTP = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
  
  return NextResponse.json({
    success: true,
    configured: hasResend || hasSMTP,
    provider: hasResend ? 'Resend' : hasSMTP ? 'SMTP' : 'None',
    message: hasResend || hasSMTP
      ? `Email service configured (${hasResend ? 'Resend' : 'SMTP'})`
      : 'Email service not configured. Set RESEND_API_KEY or SMTP credentials.',
  });
}

