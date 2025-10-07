import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-enhanced';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

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
      templateId, 
      subject, 
      content, 
      scheduledFor,
      channel = 'EMAIL'
    } = await request.json();

    // Validate required fields
    if (!leadId || !content) {
      return NextResponse.json(
        { error: 'Lead ID and content are required' },
        { status: 400 }
      );
    }

    // Get lead details
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { user: true }
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

    // Check user's credit balance
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { creditBalance: true, plan: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const costPerEmail = 2; // 2 credits per email
    if (user.creditBalance < costPerEmail) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          required: costPerEmail,
          available: user.creditBalance
        },
        { status: 402 }
      );
    }

    // Personalize content
    const personalizedContent = personalizeContent(content, lead);
    const personalizedSubject = personalizeContent(subject || 'Re: Business Opportunity', lead);

    // Create message record
    const message = await prisma.message.create({
      data: {
        leadId: leadId,
        userId: session.user.id,
        channel: 'EMAIL',
        subject: personalizedSubject,
        content: personalizedContent,
        templateUsed: templateId || 'custom',
        status: scheduledFor ? 'pending' : 'sent',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        trackingId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
    });

    // Send email if not scheduled
    if (!scheduledFor) {
      try {
        const msg = {
          to: lead.email,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'noreply@transitionmarketingai.com',
            name: 'Transition Marketing AI'
          },
          subject: personalizedSubject,
          html: personalizedContent,
          trackingSettings: {
            clickTracking: { enable: true },
            openTracking: { enable: true }
          },
          customArgs: {
            messageId: message.id,
            leadId: leadId,
            userId: session.user.id
          }
        };

        await sgMail.send(msg);

        // Update message status
        await prisma.message.update({
          where: { id: message.id },
          data: { 
            status: 'sent',
            sentAt: new Date()
          }
        });

        // Deduct credits
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            creditBalance: user.creditBalance - costPerEmail,
            totalCreditsUsed: { increment: costPerEmail }
          }
        });

        // Log credit transaction
        await prisma.creditTransaction.create({
          data: {
            userId: session.user.id,
            type: 'CONSUMPTION',
            amount: -costPerEmail,
            description: `Email sent to ${lead.firstName} ${lead.lastName}`,
            metadata: {
              messageId: message.id,
              leadId: leadId,
              channel: 'EMAIL'
            }
          }
        });

        // Create activity record
        await prisma.activity.create({
          data: {
            leadId: leadId,
            userId: session.user.id,
            type: 'EMAIL_SENT',
            description: `Email sent to ${lead.firstName} ${lead.lastName} at ${lead.company}`,
            metadata: {
              messageId: message.id,
              subject: personalizedSubject
            }
          }
        });

        return NextResponse.json({
          success: true,
          message: 'Email sent successfully',
          messageId: message.id,
          creditsUsed: costPerEmail,
          remainingCredits: user.creditBalance - costPerEmail
        });

      } catch (emailError) {
        console.error('Email sending error:', emailError);
        
        // Update message status to failed
        await prisma.message.update({
          where: { id: message.id },
          data: { status: 'failed' }
        });

        return NextResponse.json(
          { error: 'Failed to send email. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      // Scheduled email - just create the record
      return NextResponse.json({
        success: true,
        message: 'Email scheduled successfully',
        messageId: message.id,
        scheduledFor: scheduledFor
      });
    }

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Personalize content with lead data
function personalizeContent(content: string, lead: any): string {
  return content
    .replace(/\{firstName\}/g, lead.firstName || '')
    .replace(/\{lastName\}/g, lead.lastName || '')
    .replace(/\{company\}/g, lead.company || '')
    .replace(/\{industry\}/g, lead.industry || '')
    .replace(/\{location\}/g, lead.location || '')
    .replace(/\{jobTitle\}/g, lead.jobTitle || '')
    .replace(/\{website\}/g, lead.website || '');
}

// Get email templates
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const templates = await prisma.messageTemplate.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { isPublic: true }
        ],
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      templates: templates
    });

  } catch (error) {
    console.error('Templates API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
