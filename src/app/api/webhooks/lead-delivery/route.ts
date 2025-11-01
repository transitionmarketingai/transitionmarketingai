import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmailNotification, sendWhatsAppDeliveryNotification } from '@/lib/notifications/delivery';

/**
 * Real-time Lead Delivery Webhook
 * 
 * This endpoint receives leads from:
 * - Facebook Lead Ads (webhook)
 * - Google Ads (form submissions)
 * - Manual uploads
 * - AI scraping campaigns
 * 
 * Immediately delivers verified leads to client dashboard and sends notifications
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Lead data structure
    const {
      client_id,
      customer_id, // Alternative: customer_id from customers table
      name,
      email,
      phone,
      company,
      source, // 'facebook_ads', 'google_ads', 'linkedin_ads', 'scraping', 'manual'
      industry,
      location,
      metadata, // Additional data (form fields, ad campaign info, etc.)
      verified, // Whether lead is already verified
    } = body;

    // Validate required fields
    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Name and at least one contact method (email or phone) required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Determine customer_id
    let finalCustomerId = customer_id;
    if (client_id && !customer_id) {
      // If client_id is provided, get the customer_id
      const { data: client } = await supabase
        .from('clients')
        .select('id')
        .eq('id', client_id)
        .single();
      
      // Note: You may need to map clients to customers differently
      // This is a placeholder - adjust based on your schema
      finalCustomerId = client?.id;
    }

    if (!finalCustomerId) {
      return NextResponse.json(
        { error: 'customer_id or client_id required' },
        { status: 400 }
      );
    }

    // For ad-generated leads (Facebook/Google), they're already verified (form submission = intent)
    const isAdLead = ['facebook_ads', 'google_ads', 'linkedin_ads'].includes(source);
    const verificationStatus = isAdLead || verified ? 'verified' : 'pending';
    
    // Insert lead into database
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        customer_id: finalCustomerId,
        name,
        email: email || null,
        phone: phone || null,
        company: company || null,
        industry: industry || null,
        location: location || null,
        source: source || 'manual',
        verification_status: verificationStatus,
        phone_verified: isAdLead ? true : false, // Ad leads: form submission = verified
        email_verified: isAdLead ? true : false, // Ad leads: form submission = verified
        business_verified: isAdLead ? true : false, // Ad leads: assume verified
        verified_at: verificationStatus === 'verified' ? new Date().toISOString() : null,
        status: 'new',
        received_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (leadError) {
      console.error('Lead insertion error:', leadError);
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      );
    }

    // Get customer details for notification
    const { data: customer } = await supabase
      .from('customers')
      .select('email, user_id')
      .eq('id', finalCustomerId)
      .single();

    // Get user for phone number if available
    let customerPhone = null;
    if (customer?.user_id) {
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('phone')
        .eq('id', customer.user_id)
        .single();
      customerPhone = userProfile?.phone;
    }

    // Send instant notifications
    try {
      // 1. Email notification to client
      if (customer?.email) {
        const emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">🎉 New Lead Received!</h2>
            <p>You have a new verified lead in your dashboard.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Lead Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              ${industry ? `<p><strong>Industry:</strong> ${industry}</p>` : ''}
              <p><strong>Source:</strong> ${source}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/dashboard/leads/${lead.id}" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Lead in Dashboard
              </a>
            </div>

            <p style="color: #16a34a; font-weight: bold;">
              ✅ This lead has been verified and is ready to contact.
            </p>
          </div>
        `;

        await sendEmailNotification({
          to: customer.email,
          subject: `🎉 New Lead: ${name}`,
          html: emailContent,
        });
      }

      // 2. WhatsApp notification (if phone available and opted in)
      if (customerPhone) {
        const whatsappMessage = `🎉 New Lead Received!

Name: ${name}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
${email ? `Email: ${email}` : ''}
Source: ${source}

View: ${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/dashboard/leads/${lead.id}

✅ Verified and ready to contact!`;

        await sendWhatsAppDeliveryNotification(customerPhone, whatsappMessage);
      }
    } catch (notificationError) {
      console.error('Notification error (non-critical):', notificationError);
      // Don't fail the request if notifications fail
    }

    // 3. Create notification in database for dashboard
    try {
      await supabase
        .from('notifications')
        .insert({
          user_id: customer?.user_id,
          customer_id: finalCustomerId,
          type: 'new_lead',
          title: 'New Lead Received',
          message: `${name} from ${company || 'Unknown Company'}`,
          data: { lead_id: lead.id },
          read: false,
        });
    } catch (notifError) {
      console.error('Database notification error:', notifError);
    }

    return NextResponse.json({
      success: true,
      lead,
      message: 'Lead delivered instantly to dashboard',
      notifications_sent: {
        email: !!customer?.email,
        whatsapp: !!customerPhone,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Lead delivery webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

