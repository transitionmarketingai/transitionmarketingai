import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-enhanced';

// LinkedIn Sales Navigator API Integration
class LinkedInService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.LINKEDIN_SALES_NAVIGATOR_API_KEY || '';
    this.baseUrl = 'https://api.linkedin.com/v2';
  }

  // Search for leads using LinkedIn Sales Navigator
  async searchLeads(criteria: any): Promise<any[]> {
    try {
      const searchParams = {
        keywords: criteria.keywords || '',
        industry: criteria.industry || '',
        location: criteria.location || '',
        companySize: criteria.companySize || '',
        jobTitle: criteria.jobTitle || '',
        seniorityLevel: criteria.seniorityLevel || '',
        limit: criteria.limit || 50
      };

      // LinkedIn Sales Navigator API call
      const response = await fetch(`${this.baseUrl}/salesNavigator/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
          searchCriteria: {
            keywords: searchParams.keywords,
            industry: searchParams.industry,
            location: searchParams.location,
            companySize: searchParams.companySize,
            jobTitle: searchParams.jobTitle,
            seniorityLevel: searchParams.seniorityLevel
          },
          pagination: {
            count: searchParams.limit,
            start: 0
          }
        })
      });

      if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformLinkedInLeads(data.elements || []);

    } catch (error) {
      console.error('LinkedIn search error:', error);
      // Fallback to mock data for development
      return this.getMockLinkedInLeads(criteria);
    }
  }

  // Transform LinkedIn API response to our lead format
  private transformLinkedInLeads(linkedInLeads: any[]): any[] {
    return linkedInLeads.map(lead => ({
      firstName: lead.firstName?.localized?.en_US || '',
      lastName: lead.lastName?.localized?.en_US || '',
      email: lead.emailAddress || '',
      phone: lead.phoneNumber || '',
      company: lead.companyName || '',
      jobTitle: lead.jobTitle || '',
      industry: lead.industry || '',
      location: lead.location || '',
      companySize: lead.companySize || '',
      website: lead.companyWebsite || '',
      linkedinUrl: lead.linkedinProfileUrl || '',
      profilePicture: lead.profilePicture || '',
      summary: lead.summary || '',
      experience: lead.experience || [],
      education: lead.education || [],
      skills: lead.skills || [],
      source: 'linkedin_sales_navigator',
      score: this.calculateLinkedInScore(lead),
      metadata: {
        linkedinId: lead.id,
        connectionDegree: lead.connectionDegree,
        mutualConnections: lead.mutualConnections,
        lastActivity: lead.lastActivity,
        profileViews: lead.profileViews,
        premiumFeatures: lead.premiumFeatures
      }
    }));
  }

  // Calculate lead score based on LinkedIn data
  private calculateLinkedInScore(lead: any): number {
    let score = 50; // Base score

    // Connection degree scoring
    if (lead.connectionDegree === 1) {
      score += 20; // Direct connection
    } else if (lead.connectionDegree === 2) {
      score += 15; // Second degree
    } else if (lead.connectionDegree === 3) {
      score += 10; // Third degree
    }

    // Mutual connections scoring
    if (lead.mutualConnections > 10) {
      score += 15;
    } else if (lead.mutualConnections > 5) {
      score += 10;
    } else if (lead.mutualConnections > 0) {
      score += 5;
    }

    // Profile completeness scoring
    if (lead.profilePicture && lead.summary) {
      score += 10;
    }

    // Activity scoring
    if (lead.lastActivity && new Date(lead.lastActivity) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
      score += 10; // Active in last 30 days
    }

    return Math.max(0, Math.min(100, score));
  }

  // Mock data for development/testing
  private getMockLinkedInLeads(criteria: any): any[] {
    const mockLeads = [
      {
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'rajesh.kumar@techcorp.in',
        phone: '+91-98765-43210',
        company: 'TechCorp India',
        jobTitle: 'VP of Sales',
        industry: 'Technology',
        location: 'Bangalore',
        companySize: '200-1000',
        website: 'https://techcorp.in',
        linkedinUrl: 'https://linkedin.com/in/rajesh-kumar-techcorp',
        profilePicture: '/images/placeholder-avatar.jpg',
        summary: 'Experienced sales leader with 15+ years in Indian tech market',
        experience: [
          { title: 'VP of Sales', company: 'TechCorp India', duration: '3 years' },
          { title: 'Sales Director', company: 'InnovateTech', duration: '5 years' }
        ],
        education: [
          { degree: 'MBA', institution: 'IIM Bangalore', year: '2005' }
        ],
        skills: ['Sales Strategy', 'Team Leadership', 'CRM', 'Business Development'],
        source: 'linkedin_sales_navigator',
        score: 85,
        metadata: {
          linkedinId: 'mock-linkedin-1',
          connectionDegree: 2,
          mutualConnections: 8,
          lastActivity: new Date().toISOString(),
          profileViews: 150,
          premiumFeatures: ['Sales Navigator', 'InMail']
        }
      },
      {
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@fintechstartup.com',
        phone: '+91-87654-32109',
        company: 'FinTech Startup',
        jobTitle: 'Founder & CEO',
        industry: 'FinTech',
        location: 'Mumbai',
        companySize: '50-200',
        website: 'https://fintechstartup.com',
        linkedinUrl: 'https://linkedin.com/in/priya-sharma-founder',
        profilePicture: '/images/placeholder-avatar.jpg',
        summary: 'FinTech entrepreneur focused on digital payments in India',
        experience: [
          { title: 'Founder & CEO', company: 'FinTech Startup', duration: '2 years' },
          { title: 'Product Manager', company: 'PayU', duration: '4 years' }
        ],
        education: [
          { degree: 'B.Tech', institution: 'IIT Mumbai', year: '2010' }
        ],
        skills: ['Product Management', 'FinTech', 'Digital Payments', 'Startup Leadership'],
        source: 'linkedin_sales_navigator',
        score: 92,
        metadata: {
          linkedinId: 'mock-linkedin-2',
          connectionDegree: 1,
          mutualConnections: 15,
          lastActivity: new Date().toISOString(),
          profileViews: 300,
          premiumFeatures: ['Sales Navigator', 'InMail', 'Advanced Search']
        }
      },
      {
        firstName: 'Amit',
        lastName: 'Patel',
        email: 'amit.patel@manufacturing.co.in',
        phone: '+91-76543-21098',
        company: 'Patel Manufacturing',
        jobTitle: 'Operations Director',
        industry: 'Manufacturing',
        location: 'Ahmedabad',
        companySize: '1000+',
        website: 'https://patelmanufacturing.co.in',
        linkedinUrl: 'https://linkedin.com/in/amit-patel-manufacturing',
        profilePicture: '/images/placeholder-avatar.jpg',
        summary: 'Manufacturing operations expert with focus on automation and efficiency',
        experience: [
          { title: 'Operations Director', company: 'Patel Manufacturing', duration: '6 years' },
          { title: 'Plant Manager', company: 'Reliance Industries', duration: '8 years' }
        ],
        education: [
          { degree: 'B.E. Mechanical', institution: 'Gujarat University', year: '2000' }
        ],
        skills: ['Operations Management', 'Manufacturing', 'Automation', 'Process Improvement'],
        source: 'linkedin_sales_navigator',
        score: 78,
        metadata: {
          linkedinId: 'mock-linkedin-3',
          connectionDegree: 3,
          mutualConnections: 3,
          lastActivity: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          profileViews: 75,
          premiumFeatures: ['Sales Navigator']
        }
      }
    ];

    // Filter based on criteria
    return mockLeads.filter(lead => {
      if (criteria.industry && !lead.industry.toLowerCase().includes(criteria.industry.toLowerCase())) {
        return false;
      }
      if (criteria.location && !lead.location.toLowerCase().includes(criteria.location.toLowerCase())) {
        return false;
      }
      if (criteria.companySize && !lead.companySize.includes(criteria.companySize)) {
        return false;
      }
      return true;
    }).slice(0, criteria.limit || 10);
  }

  // Send connection request
  async sendConnectionRequest(linkedinId: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/salesNavigator/connectionRequests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
          recipientId: linkedinId,
          message: message
        })
      });

      return response.ok;

    } catch (error) {
      console.error('LinkedIn connection request error:', error);
      return false;
    }
  }

  // Send InMail message
  async sendInMail(linkedinId: string, subject: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/salesNavigator/inMail`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
          recipientId: linkedinId,
          subject: subject,
          message: message
        })
      });

      return response.ok;

    } catch (error) {
      console.error('LinkedIn InMail error:', error);
      return false;
    }
  }
}

const linkedinService = new LinkedInService();

// Search LinkedIn leads
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const criteria = await request.json();

    // Validate criteria
    if (!criteria.industry && !criteria.keywords) {
      return NextResponse.json(
        { error: 'Industry or keywords are required' },
        { status: 400 }
      );
    }

    // Search LinkedIn leads
    const linkedinLeads = await linkedinService.searchLeads(criteria);

    // Save leads to database
    const savedLeads = [];
    for (const leadData of linkedinLeads) {
      try {
        const lead = await prisma.lead.create({
          data: {
            ...leadData,
            userId: session.user.id,
            source: 'linkedin_sales_navigator',
            status: 'new',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        savedLeads.push(lead);
      } catch (error) {
        console.error('Error saving lead:', error);
        // Continue with other leads
      }
    }

    // Create activity record
    await prisma.activity.create({
      data: {
        userId: session.user.id,
        type: 'LINKEDIN_SEARCH',
        description: `LinkedIn search completed: ${savedLeads.length} leads found`,
        metadata: {
          criteria: criteria,
          leadsFound: savedLeads.length,
          source: 'linkedin_sales_navigator'
        }
      }
    });

    return NextResponse.json({
      success: true,
      leads: savedLeads,
      totalFound: savedLeads.length,
      source: 'linkedin_sales_navigator'
    });

  } catch (error) {
    console.error('LinkedIn API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Send LinkedIn connection request
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { leadId, message, type = 'connection' } = await request.json();

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

    const linkedinId = lead.metadata?.linkedinId;
    if (!linkedinId) {
      return NextResponse.json(
        { error: 'LinkedIn ID not found for this lead' },
        { status: 400 }
      );
    }

    // Send LinkedIn message
    let success = false;
    if (type === 'inmail') {
      success = await linkedinService.sendInMail(linkedinId, 'Business Opportunity', message);
    } else {
      success = await linkedinService.sendConnectionRequest(linkedinId, message);
    }

    if (success) {
      // Create message record
      await prisma.message.create({
        data: {
          leadId: leadId,
          userId: session.user.id,
          channel: 'LINKEDIN',
          subject: type === 'inmail' ? 'Business Opportunity' : 'Connection Request',
          content: message,
          status: 'sent',
          sentAt: new Date(),
          trackingId: `linkedin_${Date.now()}`
        }
      });

      // Create activity record
      await prisma.activity.create({
        data: {
          leadId: leadId,
          userId: session.user.id,
          type: 'LINKEDIN_MESSAGE_SENT',
          description: `${type === 'inmail' ? 'InMail' : 'Connection request'} sent to ${lead.firstName} ${lead.lastName}`,
          metadata: {
            type: type,
            linkedinId: linkedinId
          }
        }
      });

      return NextResponse.json({
        success: true,
        message: `${type === 'inmail' ? 'InMail' : 'Connection request'} sent successfully`
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send LinkedIn message' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('LinkedIn message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
