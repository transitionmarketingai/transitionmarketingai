import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/tracking';

interface EmailFollowupData {
  name: string;
  email: string;
  customMessage?: string;
  proposalLink?: string;
  attachment?: string; // Base64 encoded PDF
  attachmentName?: string; // PDF filename
}

/**
 * Send post-call follow-up email
 * Supports SMTP (nodemailer) or Resend API
 */
export async function POST(request: NextRequest) {
  try {
    const body: EmailFollowupData = await request.json();
    const { name, email, customMessage, proposalLink } = body;

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
            <h1 style="color: white; margin: 0; font-size: 24px;">Your Verified Lead Proposal is on the Way</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
            
            ${customMessage ? `
            <p style="font-size: 16px; margin-bottom: 20px;">${customMessage}</p>
            ` : `
            <p style="font-size: 16px; margin-bottom: 20px;">
              It was great speaking with you today! Our team is finalizing your Verified Lead Proposal — expect it within 24 hours.
            </p>
            `}
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <p style="font-size: 16px; font-weight: 600; color: #0A3A8C; margin-top: 0;">The proposal includes:</p>
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Expected verified inquiries per month</li>
                <li style="margin-bottom: 8px;">Industry-specific ad strategy</li>
                <li style="margin-bottom: 8px;">Estimated ROI & ad-spend breakdown</li>
                <li style="margin-bottom: 8px;">Campaign timeline & delivery schedule</li>
              </ul>
            </div>
            
            ${proposalLink ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${proposalLink}" style="display: inline-block; background: #0A3A8C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">View Your Proposal</a>
            </div>
            ` : `
            <p style="font-size: 16px; margin-bottom: 20px;">
              Meanwhile, view sample results here: 
              <a href="https://transitionmarketingai.com" style="color: #2563EB; text-decoration: none;">See Results</a>
            </p>
            `}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 14px; color: #6b7280; margin: 0;">
                Best regards,<br/>
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
        const emailPayload: any = {
          from: process.env.SMTP_FROM || 'Transition Marketing AI <hello@transitionmarketingai.com>',
          to: email,
          subject: 'Your Verified Lead Proposal is on the Way',
          html: emailHtml,
        };

        // Add PDF attachment if provided
        if (body.attachment && body.attachmentName) {
          emailPayload.attachments = [
            {
              filename: body.attachmentName,
              content: body.attachment, // Base64 encoded PDF
            },
          ];
        }

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });

        if (resendResponse.ok) {
          emailSent = true;
          console.log('[Email] Follow-up sent via Resend');
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
          subject: 'Your Verified Lead Proposal is on the Way',
          html: emailHtml,
        });

        emailSent = true;
        console.log('[Email] Follow-up sent via SMTP');
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
    trackEvent('email_followup_sent', {
      event_category: 'email',
      event_label: 'followup_email_sent',
      email: email,
    });

    return NextResponse.json({
      success: true,
      message: 'Follow-up email sent successfully',
      data: {
        email,
        name,
      },
    });
  } catch (error) {
    console.error('[Email] Error sending follow-up:', error);
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

