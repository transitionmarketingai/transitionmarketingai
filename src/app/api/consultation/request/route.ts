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
      preferredDate,
      budgetRange,
      requirements,
      contactPreference,
      whatsappUpdates,
    } = body;

    // Validate required fields
    if (!firstName || firstName.length < 2) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }
    
    if (!company || company.length < 2) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }
    
    if (!preferredDate) {
      return NextResponse.json(
        { error: 'Preferred date is required' },
        { status: 400 }
      );
    }
    
    if (!preferredTime) {
      return NextResponse.json(
        { error: 'Preferred time is required' },
        { status: 400 }
      );
    }
    
    if (!budgetRange) {
      return NextResponse.json(
        { error: 'Budget range is required' },
        { status: 400 }
      );
    }


    // Create Supabase client
    const supabase = await createClient();

    // Format preferred time if both date and time are provided
    const fullPreferredTime = preferredDate && preferredTime 
      ? `${preferredDate} at ${preferredTime}`
      : preferredDate 
      ? preferredDate 
      : preferredTime 
      ? preferredTime 
      : preferredDay || null;

    // Insert consultation request into database
    const { data: consultation, error: consultationError } = await supabase
      .from('consultations')
      .insert({
        name: `${firstName} ${lastName || ''}`.trim(),
        email: email || null,
        phone: phone || null,
        company: company || null,
        industry: industry || null,
        preferred_day: preferredDay || fullPreferredTime || null,
        preferred_time: fullPreferredTime || null,
        message: message || requirements || null,
        budget_range: budgetRange || null,
        contact_preference: contactPreference || 'phone',
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
    const customerPhone = phone ? phone.replace(/\D/g, '') : '';

    // 1. Send email to admin
    try {
      const adminEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">🔔 New Consultation Request</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${industry ? `<p><strong>Industry:</strong> ${industry}</p>` : ''}
          ${budgetRange ? `<p><strong>Budget Range:</strong> ${budgetRange}</p>` : ''}
          </div>

            ${fullPreferredTime ? `
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">Preferred Time</h4>
              <p><strong>${fullPreferredTime}</strong></p>
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
${email ? `Email: ${email}` : ''}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}
${industry ? `Industry: ${industry}` : ''}
${budgetRange ? `Budget: ${budgetRange}` : ''}

${fullPreferredTime ? `Preferred: ${fullPreferredTime}` : ''}
${requirements ? `Requirements: ${requirements}` : ''}

View: ${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/admin/consultations/${consultation.id}`;

      await sendWhatsAppNotification(formatPhoneForWhatsApp(ADMIN_WHATSAPP), adminWhatsAppMessage);
    } catch (whatsappError) {
      console.error('Admin WhatsApp error:', whatsappError);
      // Don't fail the request if WhatsApp fails
    }

    // 3. Send confirmation email to customer
    if (email) {
      try {
        const customerEmailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">Thank You, ${firstName}! ✅</h2>
            
            <p>We've received your consultation request for a <strong>free strategy call</strong>.</p>

            ${fullPreferredTime ? `
              <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Your Preferred Time:</strong></p>
                <p style="font-size: 18px; color: #2563eb;">${fullPreferredTime}</p>
              </div>
            ` : ''}

            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #16a34a; margin-top: 0;">📞 What Happens Next?</h3>
              <p>We'll call you at the scheduled time for your <strong>30-minute strategy call</strong> to discuss your lead generation needs.</p>
            </div>

            <p><strong>On the call, we'll discuss:</strong></p>
            <ul style="line-height: 2;">
              <li>Your business and target audience</li>
              <li>Current lead generation challenges</li>
              <li>Custom plan proposal with pricing</li>
              <li>How we can help you get verified leads</li>
            </ul>
            
            <p>Looking forward to speaking with you!</p>
            
            <p>Best regards,<br>
            <strong>Transition Marketing AI Team</strong></p>
          </div>
        `;

        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@transitionmarketingai.com',
          to: email,
          subject: '✅ Consultation Request Confirmed - We\'ll Call You Soon!',
          html: customerEmailContent,
        });
      } catch (emailError) {
        console.error('Customer email error:', emailError);
      }
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

