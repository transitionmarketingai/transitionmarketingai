import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-enhanced';

// Data Enrichment Service
class DataEnrichmentService {
  private apolloApiKey: string;
  private clearbitApiKey: string;
  private hunterApiKey: string;

  constructor() {
    this.apolloApiKey = process.env.APOLLO_API_KEY || '';
    this.clearbitApiKey = process.env.CLEARBIT_API_KEY || '';
    this.hunterApiKey = process.env.HUNTER_API_KEY || '';
  }

  // Enrich lead with Apollo API
  async enrichWithApollo(lead: any): Promise<any> {
    try {
      const response = await fetch('https://api.apollo.io/v1/mixed_people/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': this.apolloApiKey
        },
        body: JSON.stringify({
          q_organization_domains: lead.website ? [lead.website] : undefined,
          person_titles: lead.jobTitle ? [lead.jobTitle] : undefined,
          page: 1,
          per_page: 1
        })
      });

      if (!response.ok) {
        throw new Error(`Apollo API error: ${response.statusText}`);
      }

      const data = await response.json();
      const person = data.people?.[0];

      if (person) {
        return {
          email: person.email || lead.email,
          phone: person.sanitized_phone || lead.phone,
          linkedinUrl: person.linkedin_url || lead.linkedinUrl,
          twitterUrl: person.twitter_url,
          facebookUrl: person.facebook_url,
          githubUrl: person.github_url,
          profilePicture: person.photo_url || lead.profilePicture,
          summary: person.summary || lead.summary,
          experience: person.experience || lead.experience,
          education: person.education || lead.education,
          skills: person.skills || lead.skills,
          company: {
            name: person.organization?.name || lead.company,
            industry: person.organization?.industry || lead.industry,
            size: person.organization?.estimated_num_employees || lead.companySize,
            website: person.organization?.website_url || lead.website,
            linkedinUrl: person.organization?.linkedin_url,
            twitterUrl: person.organization?.twitter_url,
            facebookUrl: person.organization?.facebook_url,
            description: person.organization?.short_description,
            foundedYear: person.organization?.founded_year,
            location: person.organization?.primary_domain || lead.location
          },
          source: 'apollo',
          enrichedAt: new Date().toISOString()
        };
      }

      return null;

    } catch (error) {
      console.error('Apollo enrichment error:', error);
      return null;
    }
  }

  // Enrich lead with Clearbit API
  async enrichWithClearbit(lead: any): Promise<any> {
    try {
      const domain = lead.website ? lead.website.replace(/^https?:\/\//, '').replace(/^www\./, '') : null;
      
      if (!domain) {
        return null;
      }

      const response = await fetch(`https://company.clearbit.com/v2/companies/find?domain=${domain}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.clearbitApiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Clearbit API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        company: {
          name: data.name || lead.company,
          industry: data.category?.industry || lead.industry,
          size: data.metrics?.employees || lead.companySize,
          website: data.domain || lead.website,
          description: data.description,
          foundedYear: data.foundedYear,
          location: data.location?.city || lead.location,
          country: data.location?.country,
          logo: data.logo,
          social: {
            linkedin: data.linkedin?.handle,
            twitter: data.twitter?.handle,
            facebook: data.facebook?.handle
          },
          metrics: {
            employees: data.metrics?.employees,
            annualRevenue: data.metrics?.annualRevenue,
            marketCap: data.metrics?.marketCap
          },
          tech: data.tech || [],
          tags: data.tags || []
        },
        source: 'clearbit',
        enrichedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('Clearbit enrichment error:', error);
      return null;
    }
  }

  // Find email with Hunter API
  async findEmailWithHunter(lead: any): Promise<string | null> {
    try {
      const domain = lead.website ? lead.website.replace(/^https?:\/\//, '').replace(/^www\./, '') : null;
      
      if (!domain) {
        return null;
      }

      const response = await fetch(`https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${this.hunterApiKey}`);

      if (!response.ok) {
        throw new Error(`Hunter API error: ${response.statusText}`);
      }

      const data = await response.json();
      const emails = data.data?.emails || [];

      // Find email matching the lead's name
      const firstName = lead.firstName?.toLowerCase();
      const lastName = lead.lastName?.toLowerCase();

      for (const email of emails) {
        const emailValue = email.value.toLowerCase();
        if (firstName && lastName && 
            (emailValue.includes(firstName) && emailValue.includes(lastName))) {
          return email.value;
        }
      }

      // Return first email if no match found
      return emails[0]?.value || null;

    } catch (error) {
      console.error('Hunter email finding error:', error);
      return null;
    }
  }

  // Comprehensive lead enrichment
  async enrichLead(lead: any): Promise<any> {
    const enrichedData: any = {
      ...lead,
      enrichmentSources: [],
      enrichmentScore: 0
    };

    let score = 0;

    // Try Apollo enrichment
    try {
      const apolloData = await this.enrichWithApollo(lead);
      if (apolloData) {
        Object.assign(enrichedData, apolloData);
        enrichedData.enrichmentSources.push('apollo');
        score += 40;
      }
    } catch (error) {
      console.error('Apollo enrichment failed:', error);
    }

    // Try Clearbit enrichment
    try {
      const clearbitData = await this.enrichWithClearbit(lead);
      if (clearbitData) {
        Object.assign(enrichedData, clearbitData);
        enrichedData.enrichmentSources.push('clearbit');
        score += 30;
      }
    } catch (error) {
      console.error('Clearbit enrichment failed:', error);
    }

    // Try Hunter email finding
    try {
      const email = await this.findEmailWithHunter(lead);
      if (email && !enrichedData.email) {
        enrichedData.email = email;
        enrichedData.enrichmentSources.push('hunter');
        score += 20;
      }
    } catch (error) {
      console.error('Hunter email finding failed:', error);
    }

    // Additional scoring based on data completeness
    if (enrichedData.profilePicture) score += 5;
    if (enrichedData.linkedinUrl) score += 5;
    if (enrichedData.summary) score += 5;
    if (enrichedData.experience?.length > 0) score += 5;
    if (enrichedData.education?.length > 0) score += 5;
    if (enrichedData.skills?.length > 0) score += 5;

    enrichedData.enrichmentScore = Math.min(100, score);
    enrichedData.enrichedAt = new Date().toISOString();

    return enrichedData;
  }

  // Batch enrich multiple leads
  async batchEnrichLeads(leads: any[]): Promise<any[]> {
    const enrichedLeads = [];
    
    for (const lead of leads) {
      try {
        const enrichedLead = await this.enrichLead(lead);
        enrichedLeads.push(enrichedLead);
        
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Batch enrichment error for lead:', lead.id, error);
        enrichedLeads.push(lead); // Return original lead if enrichment fails
      }
    }

    return enrichedLeads;
  }
}

const enrichmentService = new DataEnrichmentService();

// Enrich single lead
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
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

    const enrichmentCost = 5; // 5 credits per enrichment
    if (user.creditBalance < enrichmentCost) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          required: enrichmentCost,
          available: user.creditBalance
        },
        { status: 402 }
      );
    }

    // Enrich lead
    const enrichedLead = await enrichmentService.enrichLead(lead);

    // Update lead in database
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        email: enrichedLead.email || lead.email,
        phone: enrichedLead.phone || lead.phone,
        linkedinUrl: enrichedLead.linkedinUrl || lead.linkedinUrl,
        profilePicture: enrichedLead.profilePicture || lead.profilePicture,
        summary: enrichedLead.summary || lead.summary,
        experience: enrichedLead.experience || lead.experience,
        education: enrichedLead.education || lead.education,
        skills: enrichedLead.skills || lead.skills,
        metadata: {
          ...lead.metadata,
          enrichmentSources: enrichedLead.enrichmentSources,
          enrichmentScore: enrichedLead.enrichmentScore,
          enrichedAt: enrichedLead.enrichedAt,
          company: enrichedLead.company
        },
        updatedAt: new Date()
      }
    });

    // Deduct credits
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        creditBalance: user.creditBalance - enrichmentCost,
        totalCreditsUsed: { increment: enrichmentCost }
      }
    });

    // Log credit transaction
    await prisma.creditTransaction.create({
      data: {
        userId: session.user.id,
        type: 'CONSUMPTION',
        amount: -enrichmentCost,
        description: `Lead enrichment for ${lead.firstName} ${lead.lastName}`,
        metadata: {
          leadId: leadId,
          enrichmentSources: enrichedLead.enrichmentSources,
          enrichmentScore: enrichedLead.enrichmentScore
        }
      }
    });

    // Create activity record
    await prisma.activity.create({
      data: {
        leadId: leadId,
        userId: session.user.id,
        type: 'LEAD_ENRICHED',
        description: `Lead enriched with ${enrichedLead.enrichmentSources.join(', ')}`,
        metadata: {
          enrichmentSources: enrichedLead.enrichmentSources,
          enrichmentScore: enrichedLead.enrichmentScore
        }
      }
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      enrichmentData: {
        sources: enrichedLead.enrichmentSources,
        score: enrichedLead.enrichmentScore,
        creditsUsed: enrichmentCost,
        remainingCredits: user.creditBalance - enrichmentCost
      }
    });

  } catch (error) {
    console.error('Enrichment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Batch enrich leads
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { leadIds } = await request.json();

    if (!leadIds || !Array.isArray(leadIds)) {
      return NextResponse.json(
        { error: 'Lead IDs array is required' },
        { status: 400 }
      );
    }

    if (leadIds.length > 50) {
      return NextResponse.json(
        { error: 'Maximum 50 leads can be enriched at once' },
        { status: 400 }
      );
    }

    // Get leads
    const leads = await prisma.lead.findMany({
      where: {
        id: { in: leadIds },
        userId: session.user.id
      }
    });

    if (leads.length === 0) {
      return NextResponse.json(
        { error: 'No leads found' },
        { status: 404 }
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

    const totalCost = leads.length * 5; // 5 credits per lead
    if (user.creditBalance < totalCost) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          required: totalCost,
          available: user.creditBalance
        },
        { status: 402 }
      );
    }

    // Batch enrich leads
    const enrichedLeads = await enrichmentService.batchEnrichLeads(leads);

    // Update leads in database
    const updatePromises = enrichedLeads.map(lead => 
      prisma.lead.update({
        where: { id: lead.id },
        data: {
          email: lead.email || lead.email,
          phone: lead.phone || lead.phone,
          linkedinUrl: lead.linkedinUrl || lead.linkedinUrl,
          profilePicture: lead.profilePicture || lead.profilePicture,
          summary: lead.summary || lead.summary,
          experience: lead.experience || lead.experience,
          education: lead.education || lead.education,
          skills: lead.skills || lead.skills,
          metadata: {
            ...lead.metadata,
            enrichmentSources: lead.enrichmentSources,
            enrichmentScore: lead.enrichmentScore,
            enrichedAt: lead.enrichedAt,
            company: lead.company
          },
          updatedAt: new Date()
        }
      })
    );

    await Promise.all(updatePromises);

    // Deduct credits
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        creditBalance: user.creditBalance - totalCost,
        totalCreditsUsed: { increment: totalCost }
      }
    });

    // Log credit transaction
    await prisma.creditTransaction.create({
      data: {
        userId: session.user.id,
        type: 'CONSUMPTION',
        amount: -totalCost,
        description: `Batch lead enrichment for ${leads.length} leads`,
        metadata: {
          leadIds: leadIds,
          enrichedCount: enrichedLeads.length
        }
      }
    });

    // Create activity record
    await prisma.activity.create({
      data: {
        userId: session.user.id,
        type: 'BATCH_ENRICHMENT',
        description: `Batch enrichment completed for ${leads.length} leads`,
        metadata: {
          leadIds: leadIds,
          enrichedCount: enrichedLeads.length,
          totalCost: totalCost
        }
      }
    });

    return NextResponse.json({
      success: true,
      enrichedCount: enrichedLeads.length,
      totalCost: totalCost,
      remainingCredits: user.creditBalance - totalCost,
      results: enrichedLeads.map(lead => ({
        id: lead.id,
        name: `${lead.firstName} ${lead.lastName}`,
        company: lead.company,
        enrichmentSources: lead.enrichmentSources,
        enrichmentScore: lead.enrichmentScore
      }))
    });

  } catch (error) {
    console.error('Batch enrichment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
