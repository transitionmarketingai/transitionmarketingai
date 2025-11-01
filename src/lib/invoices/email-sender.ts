/**
 * Invoice Email Sender
 * 
 * Sends invoice emails to clients with PDF attachment
 */

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

interface SendInvoiceEmailParams {
  to: string;
  invoice: any;
  client: any;
  pdfBuffer?: Buffer | null;
}

/**
 * Send invoice email to client
 */
export async function sendInvoiceEmail({
  to,
  invoice,
  client,
  pdfBuffer,
}: SendInvoiceEmailParams): Promise<void> {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0;">Transition Marketing AI</h1>
        <p style="color: #64748b; margin: 5px 0 0 0;">Lead Generation Services</p>
      </div>

      <h2 style="color: #1e293b; margin-bottom: 10px;">Invoice ${invoice.invoice_number}</h2>
      <p style="color: #64748b; margin-bottom: 20px;">
        Thank you for your business! Please find your invoice attached.
      </p>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Invoice Number:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${invoice.invoice_number}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Invoice Date:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${formatDate(invoice.invoice_date)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Due Date:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${formatDate(invoice.due_date)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Status:</td>
            <td style="padding: 8px 0;">
              <span style="background: ${invoice.status === 'paid' ? '#dcfce7' : '#fef3c7'}; color: ${invoice.status === 'paid' ? '#16a34a' : '#d97706'}; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                ${invoice.status}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <div style="margin: 20px 0;">
        <h3 style="color: #1e293b; margin-bottom: 15px;">Items:</h3>
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
          <thead style="background: #f1f5f9;">
            <tr>
              <th style="padding: 12px; text-align: left; color: #1e293b; font-size: 12px;">Description</th>
              <th style="padding: 12px; text-align: right; color: #1e293b; font-size: 12px;">Quantity</th>
              <th style="padding: 12px; text-align: right; color: #1e293b; font-size: 12px;">Unit Price</th>
              <th style="padding: 12px; text-align: right; color: #1e293b; font-size: 12px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.line_items?.map((item: any) => `
              <tr>
                <td style="padding: 12px; color: #1e293b; font-size: 12px;">${item.description || 'Service'}</td>
                <td style="padding: 12px; text-align: right; color: #1e293b; font-size: 12px;">${item.quantity || 1}</td>
                <td style="padding: 12px; text-align: right; color: #1e293b; font-size: 12px;">${formatCurrency(item.unit_price || 0)}</td>
                <td style="padding: 12px; text-align: right; color: #1e293b; font-size: 12px; font-weight: bold;">${formatCurrency((item.quantity || 1) * (item.unit_price || 0))}</td>
              </tr>
            `).join('') || ''}
          </tbody>
        </table>
      </div>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; text-align: right;">Subtotal:</td>
            <td style="padding: 8px 0; padding-left: 20px; font-weight: bold; color: #1e293b; text-align: right;">${formatCurrency(invoice.amount)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; text-align: right;">GST (18%):</td>
            <td style="padding: 8px 0; padding-left: 20px; font-weight: bold; color: #1e293b; text-align: right;">${formatCurrency(invoice.tax_amount)}</td>
          </tr>
          <tr style="border-top: 2px solid #2563eb; margin-top: 10px;">
            <td style="padding: 12px 0 8px 0; color: #1e293b; font-weight: bold; font-size: 16px; text-align: right;">Total Amount:</td>
            <td style="padding: 12px 0 8px 0; padding-left: 20px; font-weight: bold; color: #2563eb; font-size: 16px; text-align: right;">${formatCurrency(invoice.total_amount)}</td>
          </tr>
        </table>
      </div>

      ${invoice.status !== 'paid' ? `
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; color: #92400e; font-weight: bold;">Payment Due: ${formatDate(invoice.due_date)}</p>
          <p style="margin: 5px 0 0 0; color: #78350f; font-size: 14px;">
            Please make payment by the due date to avoid service interruption.
          </p>
          ${invoice.transaction_id ? `
            <div style="margin-top: 15px; text-align: center;">
              <a href="${invoice.transaction_id}" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Pay Now Securely
              </a>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 12px; margin: 0;">
          If you have any questions about this invoice, please contact us at{' '}
          <a href="mailto:info@transitionmarketingai.com" style="color: #2563eb; text-decoration: none;">
            info@transitionmarketingai.com
          </a>
        </p>
      </div>
    </div>
  `;

  const attachments = pdfBuffer ? [
    {
      filename: `Invoice-${invoice.invoice_number}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf',
    },
  ] : [];

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@transitionmarketingai.com',
    to,
    subject: `Invoice ${invoice.invoice_number} - ${formatCurrency(invoice.total_amount)}`,
    html: emailContent,
    attachments,
  });
}

