// Email sending using SendGrid or Resend
// Using Resend for this implementation (simpler API)

interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Send single email
export async function sendEmail(message: EmailMessage): Promise<EmailResult> {
  try {
    // Using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'leads@transitionmarketingai.com', // Configure your domain
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return {
      success: true,
      messageId: data.id,
    };

  } catch (error: any) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Send bulk emails (with rate limiting)
export async function sendBulkEmails(
  emails: EmailMessage[],
  delayMs: number = 100 // 100ms between emails
): Promise<EmailResult[]> {
  const results: EmailResult[] = [];

  for (let i = 0; i < emails.length; i++) {
    const result = await sendEmail(emails[i]);
    results.push(result);

    // Delay between emails
    if (i < emails.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    // Log progress
    if ((i + 1) % 50 === 0) {
      console.log(`Sent ${i + 1}/${emails.length} emails`);
    }
  }

  return results;
}

// Create HTML email template
export function createEmailTemplate(
  message: string,
  variables: Record<string, string>
): string {
  let html = message;

  // Replace variables
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, value);
  });

  // Wrap in basic HTML template
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        ${html.replace(/\n/g, '<br>')}
        
        <div class="footer">
          <p>This email was sent by Transition Marketing AI on behalf of ${variables.business_name || 'our client'}.</p>
          <p>If you wish to unsubscribe, <a href="{{unsubscribe_url}}">click here</a>.</p>
        </div>
      </body>
    </html>
  `;
}

// Validate email address
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Personalize message
export function personalizeEmailMessage(
  template: string,
  variables: Record<string, string>
): string {
  let message = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    message = message.replace(regex, value);
  });

  return message;
}

