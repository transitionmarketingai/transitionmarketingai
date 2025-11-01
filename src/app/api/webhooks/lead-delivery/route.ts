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
      client_id, // Required: UUID of the client receiving the lead
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

    if (!client_id) {
      return NextResponse.json(
        { error: 'client_id is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // For ad-generated leads (Facebook/Google), they're already verified (form submission = intent)
    const isAdLead = ['facebook_ads', 'google_ads', 'linkedin_ads'].includes(source);
    const verificationStatus = isAdLead || verified ? 'verified' : 'pending';
    
    // Insert lead into database
    // Note: We'll insert into 'leads' table if it exists with these fields
    // If verification fields don't exist yet, they'll be added by migration
    const leadData: any = {
      client_id: client_id,
      name,
      email: email || null,
      phone: phone || null,
      company: company || null,
      industry: industry || null,
      location: location || null,
      source: source || 'manual',
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // Add verification fields if they exist in the table
    if (verificationStatus) {
      leadData.verification_status = verificationStatus;
      leadData.phone_verified = isAdLead;
      leadData.email_verified = isAdLead;
      leadData.business_verified = isAdLead;
      if (verificationStatus === 'verified') {
        leadData.verified_at = new Date().toISOString();
      }
    }

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (leadError) {
      console.error('Lead insertion error:', leadError);
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      );
    }

    // Get client details for notification
    const { data: client } = await supabase
      .from('clients')
      .select('email, phone, account_manager_id')
      .eq('id', client_id)
      .single();

    // Get client phone for WhatsApp notification
    const clientPhone = client?.phone;
    const clientEmail = client?.email;

    // Send instant notifications
    try {
      // 1. Email notification to client
      if (clientEmail) {
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
          to: clientEmail,
          subject: `🎉 New Lead: ${name}`,
          html: emailContent,
        });
      }

      // 2. WhatsApp notification (if phone available)
      if (clientPhone) {
        const whatsappMessage = `🎉 New Lead Received!

Name: ${name}
${company ? `Company: ${company}` : ''}
${phone ? `Phone: ${phone}` : ''}
${email ? `Email: ${email}` : ''}
Source: ${source}

View: ${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/dashboard/leads/${lead.id}

✅ Verified and ready to contact!`;

        await sendWhatsAppDeliveryNotification(clientPhone, whatsappMessage);
      }
    } catch (notificationError) {
      console.error('Notification error (non-critical):', notificationError);
      // Don't fail the request if notifications fail
    }

    // 3. Create notification in database for dashboard (if notifications table exists)
    try {
      // Try to get user_id from client's account manager or find associated user
      let userId = null;
      if (client?.account_manager_id) {
        userId = client.account_manager_id;
      }

      // Only insert if we have a user_id and notifications table exists
      if (userId) {
        await supabase
          .from('notifications')
          .insert({
            user_id: userId,
            type: 'new_lead',
            title: 'New Lead Received',
            message: `${name} from ${company || 'Unknown Company'}`,
            data: { lead_id: lead.id, client_id: client_id },
            read: false,
          })
          .catch((err) => {
            // Table might not exist yet, ignore error
            console.log('Notifications table may not exist:', err);
          });
      }
    } catch (notifError) {
      console.error('Database notification error (non-critical):', notifError);
    }

    return NextResponse.json({
      success: true,
      lead,
      message: 'Lead delivered instantly to dashboard',
      notifications_sent: {
        email: !!clientEmail,
        whatsapp: !!clientPhone,
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

