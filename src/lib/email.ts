import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(template: EmailTemplate) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, email would be sent:', template);
    return { success: true, messageId: 'mock-message-id' };
  }

  try {
    const msg = {
      to: template.to,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@transitionmarketingai.com',
      subject: template.subject,
      text: template.text || template.html.replace(/<[^>]*>/g, ''),
      html: template.html,
    };

    const response = await sgMail.send(msg);
    return { success: true, messageId: response[0].headers['x-message-id'] };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error };
  }
}

export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to Transition Marketing AI!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to Transition Marketing AI!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for joining Transition Marketing AI. We're excited to help you automate your marketing and grow your business.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Complete your profile setup</li>
          <li>Explore the dashboard</li>
          <li>Set up your first campaign</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Transition Marketing AI Team</p>
      </div>
    `,
  }),

  auditRequest: (name: string, company: string, industry: string, goal: string) => ({
    subject: 'Your AI Marketing Audit Request - Transition Marketing AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Thank you for your audit request!</h1>
        <p>Hi ${name},</p>
        <p>We've received your request for an AI Marketing Audit for <strong>${company}</strong>.</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Goals:</strong> ${goal}</p>
        <p>Our team will review your information and send you a comprehensive audit within 24-48 hours.</p>
        <p>In the meantime, feel free to explore our dashboard and see how we can help automate your marketing.</p>
        <p>Best regards,<br>The Transition Marketing AI Team</p>
      </div>
    `,
  }),

  subscriptionConfirmation: (name: string, plan: string, price: string) => ({
    subject: 'Subscription Confirmed - Transition Marketing AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Subscription Confirmed!</h1>
        <p>Hi ${name},</p>
        <p>Your subscription to the <strong>${plan}</strong> plan has been confirmed.</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Price:</strong> ${price}/month</p>
        <p>You now have access to all features in your plan. Log in to your dashboard to get started.</p>
        <p>If you have any questions, our support team is here to help.</p>
        <p>Best regards,<br>The Transition Marketing AI Team</p>
      </div>
    `,
  }),

  leadNotification: (leadName: string, company: string, source: string) => ({
    subject: 'New Lead Generated - Transition Marketing AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">New Lead Generated!</h1>
        <p>Great news! A new lead has been generated for your account.</p>
        <p><strong>Name:</strong> ${leadName}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p>Log in to your dashboard to view the full lead details and take action.</p>
        <p>Best regards,<br>The Transition Marketing AI Team</p>
      </div>
    `,
  }),

  contentPublished: (title: string, type: string, views: number) => ({
    subject: 'Content Published - Transition Marketing AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Content Published!</h1>
        <p>Your content has been successfully published.</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Views:</strong> ${views}</p>
        <p>Keep an eye on the performance in your dashboard.</p>
        <p>Best regards,<br>The Transition Marketing AI Team</p>
      </div>
    `,
  }),
};
