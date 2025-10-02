import crypto from 'crypto';
import axios from 'axios';

interface WhatsAppConfig {
  accessToken: string;
  phoneNumberId: string;
  businessAccountId: string;
  webhookVerifyToken: string;
  apiVersion?: string;
}

interface WhatsAppContact {
  phoneNumber: string;
  name?: {
    firstName?: string;
    lastName?: string;
    displayName?: string;
  };
  profile?: {
    name?: string;
  };
}

interface WhatsAppMessage {
  id?: string;
  to: string;
  type: 'text' | 'template' | 'media' | 'interactive';
  text?: {
    body: string;
  };
  template?: {
    name: string;
    language: {
      code: string;
    };
   -components?: Array<{
      type: string;
      parameters: Array<{
        type: string;
        text: string;
      }>;
    }>;
  };
  media?: {
    type: 'image' | 'video' | 'document' | 'audio';
    link?: string;
    caption?: string;
    filename?: string;
  };
  interactive?: {
    type: 'list' | 'button';
    header?: {
      type: 'text';
      text: string;
    };
    body: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action: {
      buttons?: Array<{
        type: 'reply';
        reply: {
          id: string;
          title: string;
        };
      }>;
      sections?: Array<{
        title: string;
        rows: Array<{
          id: string;
          title: string;
          description: string;
        }>;
      }>;
    };
  };
}

interface WhatsAppTemplate {
  id: string;
  name: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';
  language: string;
  components: Array<{
    type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
    format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    text?: string;
    example?: {
      header_text?: string[];
      body_text?: Array<Array<string>>;
      header_url?: string[];
    };
    buttons?: Array<{
      type: 'URL' | 'PHONE_NUMBER' | 'QUICK_REPLY';
      text: string;
      url?: string;
      phone_number?: string;
    }>;
  }>;
}

interface WhatsAppMetrics {
  messagingProduct: string;
  meta: Array<{
    dimension: {
      date: string;
    };
    metrics: Array<{
      event_type: 'sent' | 'delivered' | 'read';
      total_count: number;
    }>;
  }>;
}

interface WhatsAppCampaignResult {
  messageIds: string[];
  successCount: number;
  failureCount: number;
  errors: Array<{
    phoneNumber: string;
    error: string;
  }>;
  totalCost: number;
}

interface IndianBusinessTemplate {
  id: string;
  name: string;
  category: 'lead_nurturing' | 'appointment_setting' | 'follow_up' | 'product_info';
  language: 'english' | 'hindi' | 'mixed';
  content: string;
  variables: string[];
  expectedResponse: string;
  complianceScore: number; // Based on WhatsApp Business policy
}

export class WhatsAppBusinessIntegration {
  private config: WhatsAppConfig;
  private baseUrl: string;

  constructor(config: WhatsAppConfig) {
    this.config = config;
    this.baseUrl = `https://graph.facebook.com/v${config.apiVersion || '18.0'}`;
  }

  /**
   * Test WhatsApp Business API connection
   */
  async testConnection(): Promise<{ success: boolean; phoneNumber?: any; error?: string }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.config.phoneNumberId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return { success: true, phoneNumber: response.data };

    } catch (error: any) {
      console.error('WhatsApp connection test failed:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', this.config.webhookVerifyToken)
      .update(payload)
      .digest('hex');

    return signature === `sha256=${expectedSignature}`;
  }

  /**
   * Send text message
   */
  async sendTextMessage(to: string, message: string): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: {
            body: message
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.messages?.[0]?.id) {
        return {
          success: true,
          messageId: response.data.messages[0].id
        };
      }

      return { success: false, error: 'Message ID not found in response' };

    } catch (error: any) {
      console.error('Send text message failed:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  /**
   * Send template message
   */
  async sendTemplateMessage(to: string, templateName: string, parameters?: Array<{
    type: 'text';
    text: string;
  }>): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    try {
      const templatePayload: any = {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'en_US'
          }
        }
      };

      // Add parameters if provided
      if (parameters && parameters.length > 0) {
        templatePayload.template.components = [{
          type: 'body',
          parameters
        }];
      }

      const response = await axios.post(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        templatePayload,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.messages?.[0]?.id) {
        return {
          success: true,
          messageId: response.data.messages[0].id
        };
      }

      return { success: false, error: 'Message ID not found in response' };

    } catch (error: any) {
      console.error('Send template message failed:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  /**
   * Send interactive message with buttons
   */
  async sendInteractiveMessage(to: string, interactive: WhatsAppMessage['interactive']): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'interactive',
          interactive
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.messages?.[0]?.id) {
        return {
          success: true,
          messageId: response.data.messages[0].id
        };
      }

      return { success: false, error: 'Message ID not found in response' };

    } catch (error: any) {
      console.error('Send interactive message failed:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  /**
   * Bulk send messages with rate limiting
   */
  async bulkSendMessages(messages: WhatsAppMessage[], rateLimitMs: number = 200): Promise<WhatsAppCampaignResult> {
    const result: WhatsAppCampaignResult = {
      messageIds: [],
      successCount: 0,
      failureCount: 0,
      errors: [],
      totalCost: 0
    };

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      
      try {
        let response;
        
        // Send different message types
        switch (message.type) {
          case 'text':
            response = await this.sendTextMessage(message.to, message.text!.body);
            break;
          case 'template':
            response = await this.sendTemplateMessage(
              message.to, 
              message.template!.name,
              message.template?.components?.[0]?.parameters
            );
            break;
          case 'interactive':
            response = await this.sendInteractiveMessage(message.to, message.interactive!);
            break;
          default:
            throw new Error(`Unsupported message type: ${message.type}`);
        }

        if (response.success) {
          result.successCount++;
          result.messageIds.push(response.messageId!);
        } else {
          result.failureCount++;
          result.errors.push({
            phoneNumber: message.to,
            error: response.error!
          });
        }

        // Rate limiting - wait between messages
        if (i < messages.length - 1) {
          await new Promise(resolve => setTimeout(resolve, rateLimitMs));
        }

        // Estimate cost (based on WhatsApp Business pricing)
        result.totalCost += this.calculateMessageCost(message.type);

      } catch (error: any) {
        result.failureCount++;
        result.errors.push({
          phoneNumber: message.to,
          error: error.message
        });
      }
    }

    return result;
  }

  /**
   * Calculate message cost
   */
  private calculateMessageCost(messageType: string): number {
    // WhatsApp Business API pricing (example rates - update as needed)
    const pricing = {
      'text': 0.002, // $0.002 per text message
      'template': 0.002, // Same as text for approved templates
      'media': 0.005, // $0.005 per media message
      'interactive': 0.002 // Same as text
    };

    return pricing[messageType as keyof typeof pricing] || 0.002;
  }

  /**
   * Get message status
   */
  async getMessageStatus(messageId: string): Promise<{
    status?: 'sent' | 'delivered' | 'read' | 'failed';
    timestamp?: Date;
    recipientId?: string;
    error?: string;
  }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages/${messageId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        status: response.data.status,
        timestamp: new Date(response.data.timestamp || 0),
        recipientId: response.data.recipient_id
      };

    } catch (error: any) {
      return { error: error.message };
    }
  }

  /**
   * Create message templates
   */
  async createTemplate(template: WhatsAppTemplate): Promise<{
    success: boolean;
    templateId?: string;
    error?: string;
  }> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.config.businessAccountId}/message_templates`,
        {
          name: template.name,
          category: template.category,
          language: template.language,
          components: template.components
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        templateId: response.data.id
      };

    } catch (error: any) {
      console.error('Template creation failed:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  /**
   * Get Indian business message templates
   */
  async getIndianBusinessTemplates(): Promise<IndianBusinessTemplate[]> {
    // Pre-defined templates for Indian businesses
    return [
      {
        id: 'lead_welcome_hindi',
        name: 'Lead Welcome - Hindi',
        category: 'lead_nurturing',
        language: 'hindi',
        content: 'नमस्ते {firstName}! आपका स्वागत है। आपने {service} के बारे में जानकारी मांगी है। क्या आप एक 15 मिनट की मुफ्त कॉल पर चर्चा करना पसंद करेंगे? 📞',
        variables: ['firstName', 'service'],
        expectedResponse: 'Yes/No for phone call',
        complianceScore: 95
      },
      {
        id: 'appointment_confirmation_mixed',
        name: 'Appointment Confirmation - Mixed Language',
        category: 'appointment_setting',
        language: 'mixed',
        content: 'Hi {firstName}! Your appointment for {service} has been confirmed for {date} at {time}. Meeting details will be shared shortly. Looking forward! 🌟',
        variables: ['firstName', 'service', 'date', 'time'],
        expectedResponse: 'Acknowledgment',
        complianceScore: 98
      },
      {
        id: 'follow_up_real_estate',
        name: 'Real Estate Follow-up',
        category: 'follow_up',
        language: 'english',
        content: 'Hello {firstName}! How are you? We wanted to follow up on the {propertyType} opportunities we discussed. Any questions or updated requirements? 🏠',
        variables: ['firstName', 'propertyType'],
        expectedResponse: 'Questions or requirements update',
        complianceScore: 97
      },
      {
        id: 'product_info_saas',
        name: 'SaaS Product Information',
        category: 'product_info',
        language: 'english',
        content: 'Hi {firstName}! Thanks for your interest in our AI-powered {productName}. Here\'s a quick demo link: {demoLink} Will you be available for a brief walkthrough this week? 💻',
        variables: ['firstName', 'productName', 'demoLink'],
        expectedResponse: 'Availability confirmation',
        complianceScore: 93
      },
      {
        id: 'lead_nurture_healthcare',
        name: 'Healthcare Lead Nurture',
        category: 'lead_nurturing',
        language: 'english',
        content: 'Hello {firstName}! Healthcare digitization is transforming medical practices. Would you like to explore how our solution can help {companyName} improve patient care efficiencies? 🏥',
        variables: ['firstName', 'companyName'],
        expectedResponse: 'Interest expression',
        complianceScore: 96
      }
    ];
  }

  /**
   * Generate personalized Indian business message
   */
  generatePersonalizedIndianMessage(template: IndianBusinessTemplate, context: {
    firstName: string;
    lastName?: string;
    companyName?: string;
    industry?: string;
    service?: string;
    productName?: string;
    propertyType?: string;
    demoLink?: string;
    date?: string;
    time?: string;
  }): string {
    let message = template.content;

    // Replace template variables
    message = message.replace(/\{firstName\}/g, context.firstName);
    message = message.replace(/\{lastName\}/g, context.lastName || '');
    message = message.replace(/\{companyName\}/g, context.companyName || 'your company');
    message = message.replace(/\{industry\}/g, context.industry || 'business');
    message = message.replace(/\{service\}/g, context.service || 'our service');
    message = message.replace(/\{productName\}/g, context.productName || 'our product');
    message = message.replace(/\{propertyType\}/g, context.propertyType || 'property');
    message = message.replace(/\{demoLink\}/g, context.demoLink || 'demo link');
    message = message.replace(/\{date\}/g, context.date || 'the scheduled date');
    message = message.replace(/\{time\}/g, context.time || 'the scheduled time');

    return message;
  }

  /**
   * Validate Indian business compliance
   */
  validateIndianBusinessCompliance(message: string): {
    isCompliant: boolean;
    violations: string[];
    recommendations: string[];
    score: number;
  } {
    const violations: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check for promotional content (must be in approved templates)
    if (message.toLowerCase().includes('discount') || 
        message.toLowerCase().includes('offer') ||
        message.toLowerCase().includes('sale')) {
      violations.push('Promotional content detected');
      score -= 20;
      recommendations.push('Use approved promotional templates only');
    }

    // Check for spam indicators
    if (message.length > 1000) {
      violations.push('Message too long');
      score -= 10;
      recommendations.push('Keep messages concise (under 1000 characters)');
    }

    // Check for excessive punctuation/emojis
    const emojiCount = (message.match(/[\u{1F600}-\u{1F6FF}]/gu) || []).length;
    if (emojiCount > 5) {
      violations.push('Excessive emojis');
      score -= 5;
      recommendations.push('Limit emojis to 3-5 per message');
    }

    // Check for contact information (business context)
    const phonePattern = /\b\d{10}\b/;
    if (phonePattern.test(message)) {
      violations.push('Phone number in message');
      score -= 15;
      recommendations.push('Avoid sharing contact details in initial messages');
    }

    return {
      isCompliant: score >= 75,
      violations,
      recommendations,
      score
    };
  }

  /**
   * Get delivery analytics
   */
  async getDeliveryAnalytics(startDate: Date, endDate: Date): Promise<WhatsAppMetrics | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.config.phoneNumberId}/analytics`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          },
          params: {
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            granularity: 'day'
          }
        }
      );

      return response.data;

    } catch (error: any) {
      console.error('Failed to fetch delivery analytics:', error);
      return null;
    }
  }

  /**
   * Handle webhook events
   */
  async handleWebhookEvent(event: any): Promise<void> {
    try {
      switch (event.type) {
        case 'message':
          await this.handleIncomingMessage(event);
          break;
        case 'status':
          await this.handleStatusUpdate(event);
          break;
        case 'messaging_postback':
          await this.handlePostback(event);
          break;
        default:
          console.log('Unhandled webhook event type:', event.type);
      }
    } catch (error) {
      console.error('Webhook event handling failed:', error);
    }
  }

  /**
   * Handle incoming messages
   */
  private async handleIncomingMessage(event: any): Promise<void> {
    const message = event.message;
    const contact = event.contact;

    // Log received message for lead tracking
    console.log(`Received message from ${contact.wa_id}: ${message.text?.body || 'Media message'}`);

    // Auto-response logic based on templates and patterns
    if (message.type === 'text') {
      // Simple auto-responses for common queries
      await this.sendAutoResponse(contact.wa_id, message.text.body);
    }
  }

  /**
   * Send automatic responses to common queries
   */
  private async sendAutoResponse(phoneNumber: string, message: string): Promise<void> {
    const responseMap: { [key: string]: string } = {
      'hi': 'Hello! Thank you for reaching out. How can we help you today?',
      'hello': 'Hi there! Welcome. What information are you looking for?',
      'price': 'Thank you for your interest. Let me connect you with our sales team for pricing details.',
      'demo': 'Great! We\'d love to show you our solution. Let\'s schedule a demo call.'
    };

    const lowerMessage = message.toLowerCase().trim();
    const response = responseMap[lowerMessage] || null;

    if (response) {
      await this.sendTextMessage(phoneNumber, response);
    }
  }

  /**
   * Handle status updates (delivery, read receipts)
   */
  private async handleStatusUpdate(event: any): Promise<void> {
    const status = event.status;
    
    // Update message tracking
    console.log(`Message status: ${status.status.status} for ${status.id}`);
  }

  /**
   * Handle button/postback interactions
   */
  private async handlePostback(event: any): Promise<void> {
    const postback = event.postback;
    
    // Handle interactive button responses
    console.log(`Button clicked: ${postback.payload}`);
    
    // Generate follow-up responses based on button selection
    await this.handleButtonResponse(event.contact.wa_id, postback.payload);
  }

  /**
   * Handle interactive button responses
   */
  private async handleButtonResponse(phoneNumber: string, buttonPayload: string): Promise<void> {
    const responses: { [key: string]: string } = {
      'BOOK_DEMO': 'Excellent choice! Let me have our team contact you to schedule a demo.',
      'GET_INFO': 'Happy to help! What specific information would be useful for you?',
      'SPEAK_SALES': 'Perfect! I\'ll connect you with our sales team right away.',
      'SEND_BROCHURE': 'I\'ll send you our detailed brochure via email. Please check your inbox.'
    };

    const response = responses[buttonPayload];
    if (response) {
      await this<｜tool▁sep｜>phoneNumber, response);
    }
  }
}
