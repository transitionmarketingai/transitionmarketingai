/**
 * WhatsApp Message Generator for 30-Day Pilot Offers
 * 
 * Generates ready-to-send WhatsApp messages for clients
 */

interface Submission {
  name: string;
  phone: string;
  industry: string;
  city: string;
}

interface CallRecord {
  business_name?: string;
  ideal_customer?: string;
  avg_customer_value?: number;
  current_leads_per_month?: number;
  target_inquiries_min?: number;
  target_inquiries_max?: number;
  recommended_pilot_investment_min?: number;
  recommended_pilot_investment_max?: number;
  fit_level?: string;
  notes_for_campaign_strategy?: string;
}

interface MessageGeneratorOptions {
  calendlyUrl?: string;
  senderName?: string;
}

/**
 * Generate WhatsApp message for 30-Day Pilot offer
 */
export function generateWhatsAppMessage(
  submission: Submission,
  callRecord: CallRecord,
  options: MessageGeneratorOptions = {}
): string {
  const {
    calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com',
    senderName = 'Abhishek',
  } = options;

  const businessName = callRecord.business_name || submission.name;
  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  let message = `Hi ${submission.name},\n\n`;
  message += `Great speaking with you about ${businessName} earlier.\n\n`;
  message += `Here's a quick summary of the 30-Day Pilot we discussed for your ${submission.industry} business in ${submission.city}:\n\n`;

  // Client details
  if (callRecord.ideal_customer) {
    message += `- Ideal customer: ${callRecord.ideal_customer}\n`;
  }
  
  if (callRecord.avg_customer_value) {
    message += `- Avg customer value: ${formatCurrency(callRecord.avg_customer_value)}\n`;
  }
  
  if (callRecord.current_leads_per_month !== undefined) {
    message += `- Current inquiries/month: ${callRecord.current_leads_per_month}\n`;
  }
  
  if (callRecord.target_inquiries_min && callRecord.target_inquiries_max) {
    message += `- Target inquiries/month: ${callRecord.target_inquiries_min}–${callRecord.target_inquiries_max}\n`;
  }

  message += `\nOur 30-Day Pilot plan:\n`;
  message += `- We run AI-optimized campaigns on Google, Facebook & LinkedIn\n`;
  message += `- We target your ideal customer profile\n`;
  message += `- We verify each inquiry before sending it to you\n`;
  message += `- You receive all inquiries via WhatsApp + dashboard\n`;

  if (callRecord.notes_for_campaign_strategy) {
    message += `- Strategy focus: ${callRecord.notes_for_campaign_strategy}\n`;
  }

  if (callRecord.recommended_pilot_investment_min && callRecord.recommended_pilot_investment_max) {
    message += `\nEstimated pilot investment (all-inclusive):\n`;
    message += `- ${formatCurrency(callRecord.recommended_pilot_investment_min)}–${formatCurrency(callRecord.recommended_pilot_investment_max)} for the 30 days (ads included).\n`;
  }

  message += `\nGuarantee:\n`;
  message += `If we don't deliver the minimum inquiries we agree on, we'll continue working for free until we do. No excuses.\n\n`;

  message += `Next steps:\n`;
  message += `1️⃣ Confirm you're okay with this range and plan\n`;
  message += `2️⃣ I'll send you the payment link + agreement\n`;
  message += `3️⃣ We launch campaigns within 3–5 working days after payment\n\n`;

  message += `If you prefer, you can also book one more call here: ${calendlyUrl}\n\n`;
  message += `– ${senderName}, Transition Marketing AI`;

  return message;
}

/**
 * Format phone number to E164 format for WhatsApp
 * Assumes Indian numbers if no country code is present
 */
export function formatPhoneForWhatsApp(phone: string): string | null {
  if (!phone) return null;

  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  if (!digitsOnly) return null;

  // If it starts with country code (91 for India), use as is
  if (digitsOnly.startsWith('91') && digitsOnly.length >= 12) {
    return `+${digitsOnly}`;
  }

  // If it's 10 digits, assume it's an Indian number and prepend +91
  if (digitsOnly.length === 10) {
    return `+91${digitsOnly}`;
  }

  // If it's already in E164 format (starts with +), return as is
  if (phone.startsWith('+')) {
    return phone.replace(/\D/g, '').replace(/^/, '+');
  }

  // Default: try to format as Indian number
  if (digitsOnly.length >= 10) {
    const last10 = digitsOnly.slice(-10);
    return `+91${last10}`;
  }

  return null;
}

/**
 * Generate WhatsApp Web URL with pre-filled message
 */
export function generateWhatsAppWebUrl(phone: string, message: string): string | null {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  if (!formattedPhone) return null;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone.replace('+', '')}?text=${encodedMessage}`;
}

