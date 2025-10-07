import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-enhanced';

// WhatsApp Business API Integration
class WhatsAppService {
  private accessToken: string;
  private phoneNumberId: string;
  private baseUrl: string;

  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    this.baseUrl = 'https://graph.facebook.com/v18.0';
  }

  // Send WhatsApp message
  async sendMessage(phoneNumber: string, message: string, templateId?: string): Promise<boolean> {
    try {
      // Format phone number for WhatsApp (remove + and add country code if needed)
      const formattedNumber = this.formatPhoneNumber(phoneNumber);

      const messageData: any = {
        messaging_product: 'whatsapp',
        to: formattedNumber,
        type: 'text',
        text: {
          body: message
        }
      };

      // Use template if provided
      if (templateId) {
        messageData.type = 'template';
        messageData.template = {
          name: templateId,
          language: {
            code: 'en'
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: message
                }
              ]
            }
          ]
        };
        delete messageData.text;
      }

      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('WhatsApp API error:', errorData);
        return false;
      }

      return true;

    } catch (error) {
      console.error('WhatsApp send message error:', error);
      return false;
    }
  }

  // Send WhatsApp template message
  async sendTemplateMessage(phoneNumber: string, templateName: string, parameters: any[]): Promise<boolean> {
    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);

      const messageData = {
        messaging_product: 'whatsapp',
        to: formattedNumber,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'en'
          },
          components: [
            {
              type: 'body',
              parameters: parameters.map(param => ({
                type: 'text',
                text: param
              }))
            }
          ]
        }
      };

      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      return response.ok;

    } catch (error) {
      console.error('WhatsApp template message error:', error);
      return false;
    }
  }

  // Send WhatsApp media message
  async sendMediaMessage(phoneNumber: string, mediaUrl: string, mediaType: string, caption?: string): Promise<boolean> {
    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);

      const messageData = {
        messaging_product: 'whatsapp',
        to: formattedNumber,
        type: mediaType,
        [mediaType]: {
          link: mediaUrl,
          caption: caption || ''
        }
      };

      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      return response.ok;

    } catch (error) {
      console.error('WhatsApp media message error:', error);
      return false;
    }
  }

  // Format phone number for WhatsApp
  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add country code if not present (assuming India +91)
    if (cleaned.length === 10) {
      cleaned = '91' + cleaned;
    } else if (cleaned.startsWith('0')) {
      cleaned = '91' + cleaned.substring(1);
    }
    
    return cleaned;
  }

  // Get WhatsApp message status
  async getMessageStatus(messageId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${messageId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();

    } catch (error) {
      console.error('WhatsApp status error:', error);
      return null;
    }
  }

  // Create WhatsApp template
  async createTemplate(templateData: any): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(templateData)
      });

      return response.ok;

    } catch (error) {
      console.error('WhatsApp template creation error:', error);
      return false;
    }
  }

  // Get WhatsApp templates
  async getTemplates(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error('WhatsApp templates error:', error);
      return [];
    }
  }
}

const whatsappService = new WhatsAppService();

// Send WhatsApp message
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { 
      leadId, 
      message, 
      templateId, 
      mediaUrl, 
      mediaType,
      scheduledFor 
    } = await request.json();

    if (!leadId || !message) {
      return NextResponse.json(
        { error: 'Lead ID and message are required' },
        { status: 400 }
      );
    }

    // Get lead details
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if lead belongs to user
    if (lead.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Check if lead has phone number
    if (!lead.phone) {
      return NextResponse.json(
        { error: 'Lead does not have a phone number' },
        { status: 400 }
      );
    }

    // Check user's credit balance
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { creditBalance: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const costPerMessage = 3; // 3 credits per WhatsApp message
    if (user.creditBalance < costPerMessage) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          required: costPerMessage,
          available: user.creditBalance
        },
        { status: 402 }
      );
    }

    // Personalize message
    const personalizedMessage = message
      .replace(/\{firstName\}/g, lead.firstName || '')
      .replace(/\{lastName\}/g, lead.lastName || '')
      .replace(/\{company\}/g, lead.company || '')
      .replace(/\{industry\}/g, lead.industry || '');

    // Create message record
    const messageRecord = await prisma.message.create({
      data: {
        leadId: leadId,
        userId: session.user.id,
        channel: 'WHATSAPP',
        subject: 'WhatsApp Message',
        content: personalizedMessage,
        templateUsed: templateId || 'custom',
        status: scheduledFor ? 'pending' : 'sent',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        trackingId: `whatsapp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
    });

    // Send WhatsApp message if not scheduled
    if (!scheduledFor) {
      try {
        let success = false;

        if (mediaUrl && mediaType) {
          success = await whatsappService.sendMediaMessage(
            lead.phone, 
            mediaUrl, 
            mediaType, 
            personalizedMessage
          );
        } else if (templateId) {
          success = await whatsappService.sendTemplateMessage(
            lead.phone, 
            templateId, 
            [personalizedMessage]
          );
        } else {
          success = await whatsappService.sendMessage(
            lead.phone, 
            personalizedMessage
          );
        }

        if (success) {
          // Update message status
          await prisma.message.update({
            where: { id: messageRecord.id },
            data: { 
              status: 'sent',
              sentAt: new Date()
            }
          });

          // Deduct credits
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              creditBalance: user.creditBalance - costPerMessage,
              totalCreditsUsed: { increment: costPerMessage }
            }
          });

          // Log credit transaction
          await prisma.creditTransaction.create({
            data: {
              userId: session.user.id,
              type: 'CONSUMPTION',
              amount: -costPerMessage,
              description: `WhatsApp message sent to ${lead.firstName} ${lead.lastName}`,
              metadata: {
                messageId: messageRecord.id,
                leadId: leadId,
                channel: 'WHATSAPP'
              }
            }
          });

          // Create activity record
          await prisma.activity.create({
            data: {
              leadId: leadId,
              userId: session.user.id,
              type: 'WHATSAPP_MESSAGE_SENT',
              description: `WhatsApp message sent to ${lead.firstName} ${lead.lastName}`,
              metadata: {
                messageId: messageRecord.id,
                phone: lead.phone
              }
            }
          });

          return NextResponse.json({
            success: true,
            message: 'WhatsApp message sent successfully',
            messageId: messageRecord.id,
            creditsUsed: costPerMessage,
            remainingCredits: user.creditBalance - costPerMessage
          });

        } else {
          // Update message status to failed
          await prisma.message.update({
            where: { id: messageRecord.id },
            data: { status: 'failed' }
          });

          return NextResponse.json(
            { error: 'Failed to send WhatsApp message. Please try again.' },
            { status: 500 }
          );
        }

      } catch (error) {
        console.error('WhatsApp sending error:', error);
        
        // Update message status to failed
        await prisma.message.update({
          where: { id: messageRecord.id },
          data: { status: 'failed' }
        });

        return NextResponse.json(
          { error: 'Failed to send WhatsApp message. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      // Scheduled message - just create the record
      return NextResponse.json({
        success: true,
        message: 'WhatsApp message scheduled successfully',
        messageId: messageRecord.id,
        scheduledFor: scheduledFor
      });
    }

  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get WhatsApp templates
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const templates = await whatsappService.getTemplates();

    return NextResponse.json({
      success: true,
      templates: templates
    });

  } catch (error) {
    console.error('WhatsApp templates error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Webhook for WhatsApp message status updates
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify webhook signature (implement proper verification)
    const signature = request.headers.get('x-hub-signature-256');
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // Process webhook data
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            for (const message of change.value.messages || []) {
              // Update message status in database
              if (message.status) {
                await prisma.message.updateMany({
                  where: {
                    trackingId: message.id
                  },
                  data: {
                    status: message.status.toLowerCase(),
                    deliveredAt: message.status === 'delivered' ? new Date() : undefined,
                    readAt: message.status === 'read' ? new Date() : undefined
                  }
                });
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
