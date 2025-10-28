import twilio from 'twilio';

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Twilio sandbox number

/**
 * Send WhatsApp notification to a phone number
 */
export async function sendWhatsAppNotification(
  to: string,
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Format phone number for WhatsApp
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    
    const result = await twilioClient.messages.create({
      from: WHATSAPP_FROM,
      to: formattedTo,
      body: message
    });

    console.log('WhatsApp message sent:', result.sid);

    return {
      success: true,
      messageId: result.sid
    };

  } catch (error: any) {
    console.error('WhatsApp send error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to send WhatsApp message'
    };
  }
}

/**
 * Send WhatsApp message with template (for approved business messages)
 */
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  parameters: Record<string, string>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // This requires WhatsApp Business API with approved templates
    // For now, we'll format the template manually
    
    const templates: Record<string, (params: Record<string, string>) => string> = {
      new_lead_notification: (p) => `🎯 New Lead Received!

Name: ${p.leadName}
Phone: ${p.leadPhone}
Quality Score: ${p.qualityScore}/100

${p.qualificationReason}

View details: ${p.leadUrl}

⏰ Contact within 1 hour for best results!`,

      quota_alert: (p) => `⚠️ Quota Alert

You've used ${p.leadsUsed} of ${p.leadsQuota} leads this month.

${p.message}

View dashboard: ${p.dashboardUrl}`,

      welcome_message: (p) => `Welcome to LeadGen Pro! 🎉

Hi ${p.customerName},

Your account is now active! We're setting up your lead generation campaigns.

✓ Plan: ${p.planName}
✓ Monthly Quota: ${p.quota} leads
✓ Campaign Launch: Within 24 hours

You'll start receiving qualified leads soon.

Dashboard: ${p.dashboardUrl}
Support: Reply to this message anytime

Team LeadGen Pro`,

      trial_ending: (p) => `⏰ Trial Ending Soon

Hi ${p.customerName},

Your free trial ends in ${p.daysLeft} days.

To continue receiving leads:
1. Add payment method: ${p.paymentUrl}
2. Or contact us for help

Current results:
✓ ${p.leadsGenerated} leads delivered
✓ Average quality: ${p.avgQuality}/100

Questions? Reply to this message.`,

      payment_due: (p) => `💳 Payment Reminder

Hi ${p.customerName},

Your payment of ${p.amount} is due on ${p.dueDate}.

Pay now: ${p.paymentUrl}

To avoid service interruption, please update payment.

Support: Reply for help`,

      weekly_summary: (p) => `📊 Weekly Lead Summary

Hi ${p.customerName},

Your lead delivery for ${p.weekRange}:

✅ Total Leads: ${p.totalLeads}
⭐ Avg Quality: ${p.avgQuality}/100
📧 CSV export sent via email
🔗 Dashboard: ${p.dashboardUrl}

All leads are verified and ready to contact.

Best,
Transition Marketing AI Team`,
    };

    const template = templates[templateName];
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    const message = template(parameters);
    return await sendWhatsAppNotification(to, message);

  } catch (error: any) {
    console.error('WhatsApp template error:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to send WhatsApp template'
    };
  }
}

/**
 * Send bulk WhatsApp notifications
 */
export async function sendWhatsAppBulk(
  recipients: Array<{ phone: string; message: string }>
): Promise<Array<{ phone: string; success: boolean; messageId?: string; error?: string }>> {
  const results = await Promise.allSettled(
    recipients.map(async (recipient) => ({
      phone: recipient.phone,
      ...(await sendWhatsAppNotification(recipient.phone, recipient.message))
    }))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        phone: recipients[index].phone,
        success: false,
        error: result.reason?.message || 'Failed to send'
      };
    }
  });
}

/**
 * Receive WhatsApp messages (webhook handler)
 */
export async function handleWhatsAppWebhook(webhookData: any) {
  try {
    const from = webhookData.From; // whatsapp:+919876543210
    const body = webhookData.Body; // Message content
    const messageId = webhookData.MessageSid;

    // Extract phone number
    const phone = from.replace('whatsapp:', '');

    console.log('WhatsApp message received from:', phone);
    console.log('Message:', body);

    // TODO: Process the message
    // - Find lead by phone number
    // - Save to conversation history
    // - Notify customer
    // - Auto-respond if needed

    return {
      success: true,
      messageId,
      phone,
      message: body
    };

  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return {
      success: false,
      error: 'Failed to process WhatsApp webhook'
    };
  }
}

/**
 * Format Indian phone number for WhatsApp
 */
export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digits
  let cleaned = phone.replace(/\D/g, '');

  // Add country code if not present
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned; // India country code
  }

  // Add whatsapp prefix
  return `whatsapp:+${cleaned}`;
}

/**
 * Validate Indian phone number
 */
export function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Should be 10 digits and start with 6-9
  if (cleaned.length === 10) {
    return /^[6-9]\d{9}$/.test(cleaned);
  }
  
  // Or 12 digits with country code
  if (cleaned.length === 12) {
    return /^91[6-9]\d{9}$/.test(cleaned);
  }
  
  return false;
}

/**
 * Send lead notification to customer
 */
export async function notifyCustomerNewLead(params: {
  customerPhone: string;
  leadName: string;
  leadPhone?: string;
  leadEmail?: string;
  qualityScore: number;
  qualificationStatus: string;
  qualificationReason: string;
  leadUrl: string;
}) {
  const emoji = params.qualityScore >= 80 ? '🔥 HOT' : params.qualityScore >= 60 ? '⭐' : '👤';
  
  const message = `${emoji} New Lead Received!

Name: ${params.leadName}
${params.leadPhone ? `Phone: ${params.leadPhone}` : ''}
${params.leadEmail ? `Email: ${params.leadEmail}` : ''}
Quality Score: ${params.qualityScore}/100

${params.qualificationReason}

View & Contact: ${params.leadUrl}

⏰ Best to contact within 1 hour!`;

  return await sendWhatsAppNotification(params.customerPhone, message);
}

/**
 * Send quota alert to customer
 */
export async function notifyQuotaAlert(params: {
  customerPhone: string;
  leadsUsed: number;
  leadsQuota: number;
  percentageUsed: number;
  dashboardUrl: string;
}) {
  let message = '';
  
  if (params.percentageUsed >= 90) {
    message = `⚠️ Quota Almost Reached!

You've used ${params.leadsUsed} of ${params.leadsQuota} leads (${params.percentageUsed.toFixed(0)}%)

Only ${params.leadsQuota - params.leadsUsed} leads remaining this month!

Consider:
• Purchasing additional leads
• Upgrading your plan
• Optimizing lead quality

Manage: ${params.dashboardUrl}`;
  } else if (params.percentageUsed >= 70) {
    message = `📊 Quota Update

You've used ${params.leadsUsed} of ${params.leadsQuota} leads (${params.percentageUsed.toFixed(0)}%)

${params.leadsQuota - params.leadsUsed} leads remaining this month.

Dashboard: ${params.dashboardUrl}`;
  }

  if (message) {
    return await sendWhatsAppNotification(params.customerPhone, message);
  }

  return { success: true };
}

/**
 * Send payment reminder
 */
export async function notifyPaymentDue(params: {
  customerPhone: string;
  customerName: string;
  amount: string;
  dueDate: string;
  paymentUrl: string;
}) {
  const message = `💳 Payment Due

Hi ${params.customerName},

Payment of ${params.amount} is due on ${params.dueDate}.

Pay securely: ${params.paymentUrl}

To avoid service interruption, please update payment.

Questions? Reply to this message or call support.`;

  return await sendWhatsAppNotification(params.customerPhone, message);
}

/**
 * Send welcome message to new customer
 */
export async function sendWelcomeMessage(params: {
  customerPhone: string;
  customerName: string;
  planName: string;
  quota: number;
  dashboardUrl: string;
}) {
  const message = `🎉 Welcome to LeadGen Pro!

Hi ${params.customerName},

Your ${params.planName} plan is now active!

What's Next:
✓ We're setting up your campaigns
✓ You'll get ${params.quota} leads/month
✓ First leads within 24-48 hours

Dashboard: ${params.dashboardUrl}

Questions? Reply anytime!
Team LeadGen Pro 🇮🇳`;

  return await sendWhatsAppNotification(params.customerPhone, message);
}


