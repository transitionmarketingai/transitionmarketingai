import { NextRequest, NextResponse } from 'next/server';

interface BetaApplication {
  id: string;
  betaUser: {
    id: string;
    name: string;
    email: string;
    company: string;
    industry: string;
    role: string;
    companySize: string;
    currentLeadSources: string[];
    monthlyLeadTarget: number;
    painPoints: string[];
    expectations: string;
    techStack: string[];
  };
  businessGoals: {
    leadGenerationIncrease: number;
    costReduction: number;
    timeSavings: number;
    conversionRateImprovement: number;
  };
  status: 'pending' | 'approved' | 'rejected' | 'onboarding';
  createdAt: Date;
  assessmentScore: number;
  priorityLevel: 'high' | 'medium' | 'low';
}

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json();
    
    // Generate unique application ID
    const applicationId = `beta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Assess application priority and fit
    const assessment = assessBetaApplication(applicationData);
    
    // Create beta application record
    const betaApplication: BetaApplication = {
      id: applicationId,
      betaUser: applicationData.betaUser,
      businessGoals: applicationData.businessGoals,
      status: 'pending',
      createdAt: new Date(),
      assessmentScore: assessment.score,
      priorityLevel: assessment.priority
    };

    // TODO: Store in database
    console.log('Beta application received:', betaApplication);

    // Send confirmation email
    await sendBetaApplicationConfirmation(applicationData.betaUser.email, applicationId);

    // Send notification to admin team
    await notifyAdminTeamOfBetaApplication(betaApplication);

    return NextResponse.json({
      success: true,
      applicationId,
      status: 'pending',
      assessmentScore: assessment.score,
      priorityLevel: assessment.priority,
      expectedReviewTime: '24-48 hours',
      nextSteps: [
        'Application review by our team',
        'Product-market fit assessment', 
        'Onboarding schedule if approved',
        'Access credentials provided'
      ],
      message: 'Your beta application has been received! We\'ll review it within 24-48 hours.'
    });

  } catch (error: any) {
    console.error('Beta application processing failed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process beta application' },
      { status: 500 }
    );
  }
}

function assessBetaApplication(data: any): { score: number; priority: 'high' | 'medium' | 'low' } {
  let score = 0;

  // Industry assessment (prefer tech, real estate, healthcare)
  const preferredIndustries = [
    'Technology & IT Services',
    'Real Estate & Construction',
    'Healthcare & Pharmaceuticals'
  ];
  
  if (preferredIndustries.includes(data.betaUser.industry)) {
    score += 20;
  }

  // Company size assessment (prefer medium-sized companies)
  const companySize = data.betaUser.companySize;
  if (companySize.includes('51-200') || companySize.includes('200+')) {
    score += 25;
  } else if (companySize.includes('11-50')) {
    score += 15;
  }

  // Role assessment (prefer decision makers)
  const seniorRoles = ['Founder/CEO', 'Marketing Director/Manager', 'Sales Director/Manager'];
  if (seniorRoles.some(role => data.betaUser.role.includes(role))) {
    score += 20;
  }

  // Lead target assessment (prefer companies with decent targets)
  const targetLeads = data.betaUser.monthlyLeadTarget;
  if (targetLeads >= 100) {
    score += 25;
  } else if (targetLeads >= 50) {
    score += 15;
  } else if (targetLeads >= 20) {
    score += 10;
  }

  // Pain points assessment (multiple pain points = higher priority)
  const painPointsCount = data.betaUser.painPoints.length;
  score += Math.min(painPointsCount * 3, 15);

  // Growth goals assessment
  const leadIncrease = data.businessGoals.leadGenerationIncrease;
  if (leadIncrease >= 200) {
    score += 15;
  } else if (leadIncrease >= 100) {
    score += 10;
  } else if (leadIncrease >= 50) {
    score += 5;
  }

  // Tech stack assessment (CRM usage = higher fit)
  const hasCRM = data.betaUser.techStack.some((tool: string) => 
    tool.includes('CRM') || tool.includes('HubSpot') || tool.includes('Salesforce')
  );
  if (hasCRM) {
    score += 10;
  }

  // Determine priority
  let priority: 'high' | 'medium' | 'low';
  if (score >= 100) {
    priority = 'high';
  } else if (score >= 70) {
    priority = 'medium';
  } else {
    priority = 'low';
  }

  return { score, priority };
}

async function sendBetaApplicationConfirmation(email: string, applicationId: string): Promise<void> {
  // TODO: Implement actual email sending
  console.log(`Sending confirmation email to ${email} for application ${applicationId}`);
  
  const emailData = {
    to: email,
    subject: '🎉 Beta Application Received - Transition Marketing AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">🚀 Thank You for Your Interest!</h2>
        
        <p>Dear Applicant,</p>
        
        <p>Thank you for applying to our Beta Testing Program! We're excited about your interest in AI-powered lead generation.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Application Details</h3>
          <ul style="color: #374151;">
            <li><strong>Application ID:</strong> ${applicationId}</li>
            <li><strong>Status:</strong> Under Review</li>
            <li><strong>Expected Review Time:</strong> 24-48 hours</li>
          </ul>
        </div>
        
        <p>Our team will review your application considering:</p>
        <ul style="color: #374151;">
          <li>Company fit with our platform capabilities</li>
          <li>Growth potential and market opportunity</li>
          <li>Integration complexity with existing systems</li>
          <li>Beta testing capacity and timeline</li>
        </ul>
        
        <h3 style="color: #2563eb;">What Happens Next?</h3>
        <ol style="color: #374151;">
          <li><strong>Application Review</strong> - Our team assesses your fit</li>
          <li><strong>Product Meeting</strong> - Demo call if approved</li>
          <li><strong>Onboarding</strong> - Platform setup and training</li>
          <li><strong>Beta Testing</strong> - Real-world testing period</li>
          <li><strong>Feedback Loop</strong> - Regular check-ins and improvements</li>
        </ol>
        
        <p>We'll contact you at <strong>${email}</strong> with updates about your application.</p>
        
        <p>Best regards,<br>
        The Transition Marketing AI Team<br>
        👥 Beta Testing Program</p>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #6b7280;">
          <p>Questions? Reply to this email or contact our support team.</p>
        </div>
      </div>
    `
  };

  // TODO: Send via SendGrid or email service
  console.log('Email sent:', emailData);
}

async function notifyAdminTeamOfBetaApplication(application: BetaApplication): Promise<void> {
  // TODO: Send Slack notification or admin email
  console.log(`Admin notification: New beta application ${application.id}`, {
    company: application.betaUser.company,
    industry: application.betaUser.industry,
    score: application.assessmentScore,
    priority: application.priorityLevel,
    expectations: application.betaUser.expectations
  });
}

// GET endpoint to check application status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('id');
    
    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    // TODO: Retrieve from database
    const application: BetaApplication = {
      id: applicationId,
      betaUser: {
        id: '',
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Example Corp',
        industry: 'Technology & IT Services',
        role: 'Marketing Manager',
        companySize: 'Small Business (11-50 employees)',
        currentLeadSources: ['Cold Email Outreach', 'LinkedIn Direct Messages'],
        monthlyLeadTarget: 100,
        painPoints: ['Limited qualified leads', 'High cost per lead'],
        expectations: 'Increase leads and reduce costs',
        techStack: ['HubSpot CRM', 'Mailchimp']
      },
      businessGoals: {
        leadGenerationIncrease: 150,
        costReduction: 50,
        timeSavings: 20,
        conversionRateImprovement: 75
      },
      status: 'approved',
      createdAt: new Date(),
      assessmentScore: 95,
      priorityLevel: 'high'
    };

    return NextResponse.json({
      application,
      timeline: [
        {
          status: 'submitted',
          date: application.createdAt,
          description: 'Application submitted successfully'
        },
        {
          status: 'reviewed',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          description: 'Application approved by team'
        },
        {
          status: 'onboarding',
          date: new Date(),
          description: 'Onboarding process initiated'
        }
      ],
      nextSteps: [
        'Complete platform setup',
        'Schedule onboarding call',
        'Begin beta testing program'
      ]
    });

  } catch (error: any) {
    console.error('Failed to fetch application status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch application status' },
      { status: 500 }
    );
  }
}
