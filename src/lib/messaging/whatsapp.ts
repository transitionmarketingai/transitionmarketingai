import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

export interface WhatsAppMessage {
  to: string; // Phone number with country code
  message: string;
  templateVariables?: Record<string, string>;
}

export interface WhatsAppResult {
  success: boolean;
  messageId?: string;
  status?: string;
  error?: string;
}

// Send single WhatsApp message
export async function sendWhatsAppMessage(message: WhatsAppMessage): Promise<WhatsAppResult> {
  try {
    // Ensure phone has whatsapp: prefix
    const toNumber = message.to.startsWith('whatsapp:') 
      ? message.to 
      : `whatsapp:${message.to}`;

    const response = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: toNumber,
      body: message.message,
    });

    return {
      success: true,
      messageId: response.sid,
      status: response.status,
    };

  } catch (error: any) {
    console.error('WhatsApp send error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Send bulk WhatsApp messages (with rate limiting)
export async function sendBulkWhatsApp(
  messages: WhatsAppMessage[],
  delayMs: number = 1000 // 1 second between messages to avoid rate limits
): Promise<WhatsAppResult[]> {
  const results: WhatsAppResult[] = [];

  for (let i = 0; i < messages.length; i++) {
    const result = await sendWhatsAppMessage(messages[i]);
    results.push(result);

    // Delay between messages
    if (i < messages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    // Log progress every 10 messages
    if ((i + 1) % 10 === 0) {
      console.log(`Sent ${i + 1}/${messages.length} WhatsApp messages`);
    }
  }

  return results;
}

// Personalize message with variables
export function personalizeMessage(template: string, variables: Record<string, string>): string {
  let message = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    message = message.replace(regex, value);
  });

  return message;
}

// Validate WhatsApp phone number
export function validateWhatsAppNumber(phone: string): boolean {
  // Basic validation: starts with + and has 10-15 digits
  const cleaned = phone.replace(/\s+/g, '');
  return /^\+[1-9]\d{9,14}$/.test(cleaned);
}

// Format phone for WhatsApp (ensure +91 for India)
export function formatPhoneForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');
  
  // Add +91 if missing
  if (!cleaned.startsWith('+')) {
    if (cleaned.startsWith('91')) {
      cleaned = '+' + cleaned;
    } else {
      cleaned = '+91' + cleaned;
    }
  }

  return cleaned;
}

