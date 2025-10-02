import sgMail from '@sendgrid/mail';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'follow-up' | 'nurture' | 'sales' | 'custom';
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailTarget {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
  customFields?: Record<string, any>;
}

export interface EmailCampaign {
  id: string;
  name: string;
  template: EmailTemplate;
  targets: EmailTarget[];
  scheduledDate?: Date;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused';
  results?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
    spamReported: number;
  };
}

export interface EmailSequence {
  id: string;
  name: string;
  steps: Array<{
    template: EmailTemplate;
    delayHours: number;
    condition?: {
      field: string;
      operator: string;
      value: string;
    };
  }>;
  isActive: boolean;
  statistics: {
    totalSent: number;
    avgOpenRate: number;
    avgClickRate: number;
    avgReplyRate: number;
  };
}

export class EmailService {
  private apiKey: string;
  private fromEmail: string;
  private fromName: string;

  constructor(config: {
    apiKey: string;
    fromEmail: string;
    fromName: string;
  }) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName;
    
    sgMail.setApiKey(this.apiKey);
  }

  /**
   * Send single personalized email
   */
  async sendEmail(
    to: EmailTarget,
    template: EmailTemplate,
    campaignId?: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const personalizedSubject = this.replaceVariables(template.subject, to);
      const personalizedContent = this.replaceVariables(template.content, to);

      const msg = {
        to: to.email,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject: personalizedSubject,
        html: personalizedContent,
        trackingSettings: {
          openTracking: { enable: true },
          clickTracking: { enable: true },
          subscriptionTracking: { enable: true }
        },
        categories: ['lead-generation', 'automation'],
        customArgs: {
          campaignId: campaignId || '',
          templateId: template.id,
          recipientId: to.email
        }
      };

      const response = await sgMail.send(msg);
      
      return {
        success: true,
        messageId: response[0]?.headers['x-message-id']
      };

    } catch (error: any) {
      console.error('Email send failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email'
      };
    }
  }

  /**
   * Send bulk campaign emails
   */
  async sendBulkEmails(
    campaign: EmailCampaign,
    batchSize: number = 100
  ): Promise<{ success: number; failed: number; errors: any[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as any[]
    };

    // Process emails in batches to respect rate limits
    for (let i = 0; i < campaign.targets.length; i += batchSize) {
      const batch = campaign.targets.slice(i, i + batchSize);
      
      try {
        const promises = batch.map(target => 
          this.sendEmail(target, campaign.template, campaign.id)
        );

        const batchResults = await Promise.allSettled(promises);
        
        batchResults.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value.success) {
            results.success++;
          } else {
            results.failed++;
            results.errors.push({
              target: batch[index].email,
              error: result.status === 'rejected' ? result.reason : result.value.error
            });
          }
        });

        // Rate limiting: 100 emails per second max
        if (i + batchSize < campaign.targets.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (error) {
        console.error('Bulk email batch failed:', error);
        results.failed += batch.length;
        results.errors.push({
          batch: i,
          error: (error as Error).message
        });
      }
    }

    return results;
  }

  /**
   * Trigger email sequence for a lead
   */
  async triggerSequence(target: EmailTarget, sequence: EmailSequence): Promise<{ success: boolean; error?: string }> {
    try {
      for (const step of sequence.steps) {
        // Check condition if specified
        if (step.condition && !this.evaluateCondition(target, step.condition)) {
          continue;
        }

        // Send the email
        const result = await this.sendEmail(target, step.template);
        if (!result.success) {
          console.warn(`Sequence step failed for ${target.email}:`, result.error);
        }

        // Wait for next step delay (unless it's the last step)
        if (step !== sequence.steps[sequence.steps.length - 1]) {
          await new Promise(resolve => 
            setTimeout(resolve, step.delayHours * 60 * 60 * 1000)
          );
        }
      }

      return { success: true };

    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Sequence execution failed'
      };
    }  
  }

  /**
   * Replace template variables with actual values
   */
  private replaceVariables(content: string, target: EmailTarget): string {
    let processedContent = content;
    
    // Replace basic variables
    processedContent = processedContent.replace(/\{\{firstName\}\}/g, target.firstName || '');
    processedContent = processedContent.replace(/\{\{lastName\}\}/g, target.lastName || '');
    processedContent = processedContent.replace(/\{\{email\}\}/g, target.email);
    processedContent = processedContent.replace(/\{\{company\}\}/g, target.company || '');
    processedContent = processedContent.replace(/\{\{jobTitle\}\}/g, target.jobTitle || '');
    processedContent = processedContent.replace(/\{\{fullName\}\}/g, `${target.firstName || ''} ${target.lastName || ''}`.trim());
    
    // Replace custom fields
    if (target.customFields) {
      Object.entries(target.customFields).forEach(([key, value]) => {
        processedContent = processedContent.replace(
          new RegExp(`\\{\\{${key}\\}\\}`, 'g'), 
          String(value || '')
        );
      });
    }
    
    // Replace common dynamic content
    processedContent = processedContent.replace(/\{\{currentDate\}\}/g, new Date().toLocaleDateString());
    processedContent = processedContent.replace(/\{\{currentYear\}\}/g, new Date().getFullYear().toString());
    
    return processedContent;
  }

  /**
   * Evaluate condition for sequence step
   */
  private evaluateCondition(target: EmailTarget, condition: {
    field: string;
    operator: string;
    value: string;
  }): boolean {
    const targetValue = this.getFieldValue(target, condition.field);
    
    switch (condition.operator) {
      case 'equals':
        return targetValue === condition.value;
      case 'not_equals':
        return targetValue !== condition.value;
      case 'contains':
        return String(targetValue).toLowerCase().includes(condition.value.toLowerCase());
      case 'empty':
        return !targetValue || String(targetValue).trim() === '';
      case 'greater_than':
        return Number(targetValue) > Number(condition.value);
      case 'less_than':
        return Number(targetValue) < Number(condition.value);
      default:
        return true;
    }
  }

  /**
   * Get field value from target object
   */
  private getFieldValue(target: EmailTarget, field: string): any {
    switch (field) {
      case 'firstName':
        return target.firstName;
      case 'lastName':
        return target.lastName;
      case 'email':
        return target.email;
      case 'company':
        return target.company;
      case 'jobTitle':
        return target.jobTitle;
      default:
        return target.customFields?.[field];
    }
  }

  /**
   * Create email template
   */
  createTemplate(templateData: Partial<EmailTemplate>): EmailTemplate {
    const template: EmailTemplate = {
      id: templateData.id || `template_${Date.now()}`,
      name: templateData.name || 'Untitled Template',
      subject: templateData.subject || 'Subject Line',
      content: templateData.content || '<p>Email content here</p>',
      type: templateData.type || 'custom',
      variables: templateData.variables || [],
      isActive: templateData.isActive !== false,
      createdAt: templateData.createdAt || new Date(),
      updatedAt: new Date()
    };

    return template;
  }

  /**
   * Get email templates optimized for Indian businesses
   */
  getIndianBusinessTemplates(): EmailTemplate[] {
    return [
      {
        id: 'welcome_indian_business',
        name: 'Welcome - Indian Business',
        subject: 'Welcome! {{company}} के लिए AI Lead Generation समाधान',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>नमस्ते {{firstName}}!</h2>
            <p>I hope this email finds you well. My name is Rajesh, and I'm reaching out from our AI Lead Generation platform.</p>
            
            <p>I noticed {{company}} is in the {{city}} market, and I believe we can help you generate more qualified leads for your {{industry}} business.</p>
            
            <p>Our platform has helped {{companySize}} businesses in {{region}} increase their lead generation by 300% on average.</p>
            
            <h3>Here's what we can do for {{company}}:</h3>
            <ul>
              <li>✅ AI-powered prospect research and qualification</li>
              <li>✅ Automated multi-channel outreach (Email, LinkedIn, WhatsApp)</li>
              <li>✅ CRM integration for seamless lead management</li>
              <li>✅ ROI tracking and performance analytics</li>
            </ul>
            
            <p>Would you be interested in a 15-minute demo to see how this could work for {{company}}?</p>
            
            <p>Best regards,<br>
            Rajesh Sharma<br>
            Lead Generation Specialist<br>
            {{senderEmail}}</p>
          </div>
        `/,
        type: 'welcome',
        variables: ['firstName', 'company', 'city', 'industry', 'companySize', 'region', 'senderEmail'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      {
        id: 'follow_up_product_demo',
        name: 'Follow-up - Product Demo',
        subject: '{{firstName}}, quick demo request - {{company}} के लिए lead generation',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hi {{firstName}},</h2>
            
            <p>I hope you're having a productive week at {{company}}!</p>
            
            <p>Following up on my previous email about AI-powered lead generation for {{company}}.</p>
            
            <p>Here's a quick 2-minute video showing how we helped a similar {{industry}} company increase their qualified leads:</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="{{demoVideo}}" style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Watch Demo Video</a>
            </div>
            
            <p><strong>{{company}} का क्या benefit होगा:</strong></p>
            <ul>
              <li>🎯 10-20 qualified leads per month</li>
              <li>💰 ₹25-50 average cost per qualified lead</li>
              <li>📈 4x faster lead generation process</li>
              <li>🔄 Complete automation setup</li>
            </ul>
            
            <p>Interested to see how this would work specifically for {{company}}?</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="{{calendarLink}}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Book 15-Min Demo</a>
            </div>
            
            <p>Best regards,<br>Rajesh</p>
          </div>
        `,
        type: 'follow-up',
        variables: ['firstName', 'company', 'industry', 'demoVideo', 'calendarLink'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        id: 'nurture_industry_insights',
        name: 'Nurture - Industry Insights',
        subject: '{{industry}} industry trends - insights for {{company}}',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>{{industry}} Industry Update</h2>
            
            <p>Hi {{firstName}},</p>
            
            <p>I thought you'd find this interesting since {{company}} is in the {{industry}} space.</p>
            
            <h3>Latest {{industry}} Trends:</h3>
            <ul>
              <li>{{industryTrend1}}</li>
              <li>{{industryTrend2}}</li>
              <li>{{industryTrend3}}</li>
            </ul>
            
            <p><strong>How this affects {{company}}:</strong></p>
            <p>{{industryAnalysis}}</p>
            
            <p>With these market changes, many {{industry}} companies are leveraging AI-powered lead generation to:</p>
            <ul>
              <li>Adapt to new customer behavior patterns</li>
              <li>Identify emerging market opportunities</li>
              <li>Scale customer acquisition</li>
            </ul>
            
            <p>Would you like to discuss how {{company}} could capitalize on these trends?</p>
            
            <p>Warm regards,<br>Rajesh</p>
          </div>
        `,
        type: 'nurture',
        variables: ['firstName', 'company', 'industry', 'industryTrend1', 'industryTrend2', 'industryTrend3', 'industryAnalysis'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  /**
   * Track email engagement events
   */
  async trackEngagement(event: {
    eventType: 'open' | 'click' | 'bounce' | 'unsubscribe' | 'spam_report';
    email: string;
    campaignId?: string;
    templateId?: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }): Promise<void> {
    try {
      // TODO: Store engagement data in database
      console.log('Email engagement tracked:', event);
      
      // Update campaign statistics
      if (event.campaignId) {
        // TODO: Update campaign results
      }
      
    } catch (error) {
      console.error('Failed to track email engagement:', error);
    }
  }

  /**
   * Validate email address and deliverability
   */
  async validateEmail(email: string): Promise<{
    isValid: boolean;
    deliverable: boolean;
    riskLevel: 'low' | 'medium' | 'high';
    suggestions: string[];
  }> {
    try {
      // Basic regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);
      
      if (!isValid) {
        return {
          isValid: false,
          deliverable: false,
          riskLevel: 'high',
          suggestions: ['Check email format', 'Ensure @ symbol is present', 'Verify domain extension']
        };
      }

      // Additional validation would be implemented here
      // This could include domain checking, MX record validation, etc.
      
      return {
        isValid: true,
        deliverable: true,
        riskLevel: 'low',
        suggestions: []
      };

    } catch (error) {
      console.error('Email validation failed:', error);
      return {
        isValid: false,
        deliverable: false,
        riskLevel: 'high',
        suggestions: ['Unable to validate email']
      };
    }
  }
}
