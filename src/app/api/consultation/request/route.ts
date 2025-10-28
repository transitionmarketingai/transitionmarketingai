import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWhatsAppNotification, formatPhoneForWhatsApp } from '@/lib/whatsapp/notifications';
import nodemailer from 'nodemailer';

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Admin contact details
const ADMIN_EMAIL = 'info@transitionmarketingai.com';
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || '918888888888'; // Add your WhatsApp number

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      message,
      preferredTime,
      preferredDay,
      whatsappUpdates,
    } = body;

    // Validate required fields
    if (!firstName || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createClient();

    // Insert consultation request into database
    const { data: consultation, error: consultationError } = await supabase
      .from('consultations')
      .insert({
        name: `${firstName} ${lastName || ''}`.trim(),
        email,
        phone,
        company: company || null,
        industry: industry || null,
        preferred_day: preferredDay || null,
        preferred_time: preferredTime || null,
        message: message || null,
        whatsapp_updates: whatsappUpdates || false,
        status: 'pending',
      })
      .select()
      .single();

    if (consultationError) {
      console.error('Consultation creation error:', consultationError);
      return NextResponse.json(
        { error: 'Failed to create consultation request' },
        { status: 500 }
      );
    }

    const fullName = `${firstName} ${lastName || ''}`.trim();
    const customerPhone = phone.replace(/\D/g, '');

    // 1. Send email to admin
    try {
      const adminEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">🔔 New Consultation Request</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${industry ? `<p><strong>Industry:</strong> ${industry}</p>` : ''}
          </div>

          ${preferredDay || preferredTime ? `
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">Preferred Time</h4>
              ${preferredDay ? `<p><strong>Day:</strong> ${preferredDay}</p>` : ''}
              ${preferredTime ? `<p><strong>Time:</strong> ${preferredTime}</p>` : ''}
            </div>
          ` : ''}

          ${message ? `
            <div style="margin: 20px 0;">
              <h4>Message:</h4>
              <p style="background: white; padding: 15px; border-radius: 8px;">${message}</p>
            </div>
          ` : ''}

          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/admin/consultations/${consultation.id}" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@transitionmarketingai.com',
        to: ADMIN_EMAIL,
        subject: `🔔 New Consultation Request - ${fullName}`,
        html: adminEmailContent,
      });
    } catch (emailError) {
      console.error('Admin email error:', emailError);
      // Don't fail the request if email fails
    }

    // 2. Send WhatsApp to admin
    try {
      const adminWhatsAppMessage = `🔔 New Consultation Request

Name: ${fullName}
Phone: ${phone}
Email: ${email}
${company ? `Company: ${company}` : ''}
${industry ? `Industry: ${industry}` : ''}

${preferredDay || preferredTime ? `Preferred: ${preferredDay || ''} ${preferredTime || ''}` : ''}

View: ${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/admin/consultations/${consultation.id}`;

      await sendWhatsAppNotification(formatPhoneForWhatsApp(ADMIN_WHATSAPP), adminWhatsAppMessage);
    } catch (whatsappError) {
      console.error('Admin WhatsApp error:', whatsappError);
      // Don't fail the request if WhatsApp fails
    }

    // 3. Send confirmation email to customer
    try {
      const customerEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Thank You for Your Interest!</h2>
          
          <p>Hi ${firstName},</p>
          
          <p>We've received your consultation request and our team will contact you within 24 hours at your preferred time.</p>

          ${preferredDay || preferredTime ? `
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Your Preferred Time:</strong></p>
              ${preferredDay ? `<p>Day: ${preferredDay}</p>` : ''}
              ${preferredTime ? `<p>Time: ${preferredTime}</p>` : ''}
            </div>
          ` : ''}

          <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #16a34a; margin-top: 0;">📅 Book Your Consultation Now</h3>
            <p>Select your preferred date and time instantly:</p>
            <a href="${process.env.CALENDLY_URL || 'https://calendly.com/transition-marketing-ai'}" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 10px;">
              Book Consultation
            </a>
          </div>

          <p>What to expect on the call:</p>
          <ul style="line-height: 2;">
            <li>Discussion about your business and target audience</li>
            <li>Analysis of your current lead generation challenges</li>
            <li>Custom plan proposal with pricing</li>
            <li>Answers to all your questions</li>
          </ul>

          <p>If you have any urgent questions, reply to this email or WhatsApp us.</p>
          
          <p>Best regards,<br>
          <strong>Transition Marketing AI Team</strong></p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@transitionmarketingai.com',
        to: email,
        subject: 'Thank You for Your Consultation Request',
        html: customerEmailContent,
      });
    } catch (emailError) {
      console.error('Customer email error:', emailError);
    }

    // 4. Send WhatsApp confirmation to customer (if opted in)
    if (whatsappUpdates && customerPhone) {
      try {
        const customerWhatsAppMessage = `✅ Consultation Request Confirmed!

Hi ${firstName},

We've received your request for a free consultation.

Our team will contact you within 24 hours${preferredDay || preferredTime ? ` at your preferred time` : ''}.

📅 Or book instantly:
${process.env.CALENDLY_URL || 'https://calendly.com/transition-marketing-ai'}

Looking forward to discussing how we can help your business grow!

Transition Marketing AI 🇮🇳`;

        await sendWhatsAppNotification(formatPhoneForWhatsApp(customerPhone), customerWhatsAppMessage);
      } catch (whatsappError) {
        console.error('Customer WhatsApp error:', whatsappError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        consultation,
        message: "Thank you! We'll contact you within 24 hours",
        calendly_url: process.env.CALENDLY_URL || null,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Consultation request error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

