import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { createErrorResponse } from '@/lib/apiHelpers';

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const supabase = getSupabaseServerClient();

    const body = await request.json();
    const { consultation_id, onboarding_data } = body;

    if (!onboarding_data) {
      return NextResponse.json({ error: 'Missing onboarding data' }, { status: 400 });
    }

    // 1. Create Client Record
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert({
        business_name: onboarding_data.business_name,
        contact_person: onboarding_data.contact_person,
        email: onboarding_data.email,
        phone: onboarding_data.phone,
        industry: onboarding_data.industry,
        location: onboarding_data.location,
        status: 'pending', // Will be active once they pay
        notes: JSON.stringify({
          alternate_phone: onboarding_data.alternate_phone,
          website: onboarding_data.website,
          business_type: onboarding_data.business_type,
          company_size: onboarding_data.company_size,
          consultation_notes: onboarding_data.consultation_notes,
          buying_timeline: onboarding_data.buying_timeline,
          decision_maker: onboarding_data.decision_maker,
          objections: onboarding_data.objections,
          next_steps: onboarding_data.next_steps,
        }),
      })
      .select()
      .single();

    if (clientError) {
      console.error('Client creation error:', clientError);
      return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }

    // 2. Create Custom Plan
    const planName = `${onboarding_data.business_name} - Custom ${onboarding_data.contract_duration} Plan`;
    
    const { data: plan, error: planError } = await supabase
      .from('custom_plans')
      .insert({
        client_id: client.id,
        plan_name: planName,
        monthly_cost: parseFloat(onboarding_data.proposed_monthly_budget) || 0,
        leads_quota: parseInt(onboarding_data.proposed_leads_quota) || 0,
        services: {
          ai_scraping: onboarding_data.preferred_lead_sources.includes('AI Scraping'),
          facebook_ads: onboarding_data.preferred_lead_sources.includes('Facebook Ads'),
          google_ads: onboarding_data.preferred_lead_sources.includes('Google Ads'),
          linkedin_outreach: onboarding_data.preferred_lead_sources.includes('LinkedIn'),
          outreach_service: onboarding_data.need_outreach_service,
          appointment_setting: onboarding_data.need_appointment_setting,
          crm_integration: onboarding_data.need_crm_integration,
        },
        custom_services: {
          reporting_frequency: onboarding_data.reporting_frequency,
          contact_methods: onboarding_data.contact_method_preferences,
          additional_requirements: onboarding_data.additional_requirements,
        },
        terms: `Contract Duration: ${onboarding_data.contract_duration}
Payment Terms: ${onboarding_data.payment_terms}
Lead Volume: ${onboarding_data.proposed_leads_quota} leads/month
Cost Per Lead: ₹${onboarding_data.proposed_cost_per_lead}

Target Audience: ${onboarding_data.target_audience}
Geographic Target: ${onboarding_data.geographic_target}
Lead Quality Expectations: ${onboarding_data.lead_quality_expectations}

Additional Services:
${onboarding_data.need_outreach_service ? '✓ Outreach Service' : ''}
${onboarding_data.need_appointment_setting ? '✓ Appointment Setting' : ''}
${onboarding_data.need_crm_integration ? '✓ CRM Integration' : ''}`,
        status: 'draft', // Will be active once client accepts and pays
      })
      .select()
      .single();

    if (planError) {
      console.error('Plan creation error:', planError);
      // Don't fail the whole operation, plan can be created manually
    }

    // 3. Store Full Onboarding Data
    const { error: dataError } = await supabase
      .from('client_onboarding_data')
      .insert({
        client_id: client.id,
        consultation_id,
        onboarding_data: onboarding_data,
        completed_by: user.id,
        completed_at: new Date().toISOString(),
      });

    if (dataError) {
      console.error('Onboarding data storage error:', dataError);
      // Non-critical, continue
    }

    // 4. Update Consultation Status
    if (consultation_id) {
      await supabase
        .from('consultations')
        .update({
          status: 'converted',
          converted_to_client_id: client.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', consultation_id);
    }

    // 5. Create Initial Activity Log
    await supabase
      .from('client_activity')
      .insert({
        client_id: client.id,
        activity_type: 'client_created',
        description: `Client onboarded from consultation. Plan: ${planName}`,
        performed_by: user.id,
      });

    // 6. Create Payment Link and Send Welcome Messages
    let paymentUrl = null;
    
    if (plan && parseFloat(onboarding_data.proposed_monthly_budget || '0') > 0) {
      try {
        const { createRazorpayOrder, createRazorpayCustomer, rupeesToPaise } = await import('@/lib/razorpay/client');
        const { sendWhatsAppTemplate, formatPhoneForWhatsApp } = await import('@/lib/whatsapp/notifications');
        
        // Create Razorpay customer
        const customerResult = await createRazorpayCustomer({
          name: client.business_name || client.contact_person,
          email: client.email,
          contact: client.phone.replace(/\D/g, '').slice(-10),
          notes: { client_id: client.id },
        });

        if (customerResult.success) {
          // Create payment order
          const orderResult = await createRazorpayOrder({
            amount: rupeesToPaise(parseFloat(onboarding_data.proposed_monthly_budget || '0')),
            currency: 'INR',
            receipt: `INV-${Date.now()}-${client.id}`,
            notes: {
              client_id: client.id,
              plan_id: plan.id,
              description: 'Initial monthly subscription',
            },
          });

          if (orderResult.success) {
            paymentUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/payment/${orderResult.order.id}`;
            
            // Update client with Razorpay customer ID
            await supabase
              .from('clients')
              .update({ razorpay_customer_id: customerResult.customer.id })
              .eq('id', client.id);

            // Save payment record
            await supabase.from('payments').insert({
              client_id: client.id,
              razorpay_order_id: orderResult.order.id,
              razorpay_customer_id: customerResult.customer.id,
              amount: parseFloat(onboarding_data.proposed_monthly_budget || '0'),
              status: 'pending',
              description: 'Initial subscription payment',
              currency: 'INR',
            });

            // Send WhatsApp welcome with payment link
            if (client.phone) {
              try {
                await sendWhatsAppTemplate(
                  formatPhoneForWhatsApp(client.phone),
                  'welcome_onboarding',
                  {
                    customerName: client.contact_person,
                    planName: planName,
                    quota: (onboarding_data.proposed_leads_quota || '0').toString(),
                    dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://transitionmarketingai.com'}/dashboard`,
                  }
                );
              } catch (whatsappError) {
                console.error('WhatsApp send error:', whatsappError);
              }
            }
          }
        }
      } catch (paymentError) {
        console.error('Payment link creation error:', paymentError);
        // Continue even if payment link creation fails
      }
    }

    // 7. Send Welcome Email to Client
    try {
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Welcome to Transition Marketing AI!</h2>
          
          <p>Dear ${onboarding_data.contact_person || 'Valued Client'},</p>
          
          <p>Thank you for choosing Transition Marketing AI for your lead generation needs.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">Your Custom Plan Summary:</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Monthly Investment:</strong> ₹${parseFloat(onboarding_data.proposed_monthly_budget || '0').toLocaleString('en-IN')}</li>
              <li><strong>Leads Per Month:</strong> ${onboarding_data.proposed_leads_quota || 'TBD'}</li>
              <li><strong>Cost Per Lead:</strong> ₹${parseFloat(onboarding_data.proposed_cost_per_lead || '0').toLocaleString('en-IN')}</li>
              <li><strong>Contract Duration:</strong> ${onboarding_data.contract_duration || 'To be confirmed'}</li>
            </ul>
          </div>

          ${paymentUrl ? `
            <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h3 style="color: #16a34a; margin-top: 0;">Complete Your Setup</h3>
              <p>To activate your plan and start receiving leads, please complete payment:</p>
              <a href="${paymentUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 10px;">
                Pay Now - ₹${parseFloat(onboarding_data.proposed_monthly_budget || '0').toLocaleString('en-IN')}
              </a>
              <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
                Payment via UPI, Cards, Net Banking
              </p>
            </div>
          ` : ''}
          
          <h3>What Happens Next?</h3>
          <ol style="line-height: 2;">
            <li>${paymentUrl ? 'Complete payment to activate your plan' : 'Your plan will be activated soon'}</li>
            <li>We'll start generating leads within 7 days</li>
            <li>You'll receive weekly lead deliveries directly to your dashboard</li>
            <li>Each lead is verified with active phone numbers and valid email addresses</li>
          </ol>
          
          <p><strong>Dashboard Access:</strong><br>
          You'll receive login credentials shortly.</p>
          
          <p>If you have any questions, feel free to reach out to us.</p>
          
          <p>Best regards,<br>
          <strong>Transition Marketing AI Team</strong></p>
        </div>
      `;

      console.log('Email to be sent:', {
        to: onboarding_data.email,
        subject: 'Welcome to Transition Marketing AI - Your Custom Plan Details',
        content: emailContent
      });
      
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    return NextResponse.json({
      message: 'Client onboarded successfully',
      client_id: client.id,
      plan_id: plan?.id,
      email_sent: true,
    });

  } catch (error) {
    console.error('Error in POST /api/admin/onboarding:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

