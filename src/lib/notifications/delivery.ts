/**
 * Notification System for Lead Delivery
 * Handles instant email and WhatsApp notifications when leads arrive
 */

import nodemailer from 'nodemailer';
import { sendWhatsAppNotification } from '@/lib/whatsapp/notifications';

// Email transporter (reuse from consultation route)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailNotification {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmailNotification({ to, subject, html }: EmailNotification) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@transitionmarketingai.com',
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email notification error:', error);
    throw error;
  }
}

export async function sendWhatsAppDeliveryNotification(phone: string, message: string) {
  try {
    // Use existing WhatsApp notification function
    const { sendWhatsAppNotification } = await import('@/lib/whatsapp/notifications');
    return await sendWhatsAppNotification(phone, message);
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    throw error;
  }
}

