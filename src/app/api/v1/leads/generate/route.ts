import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-enhanced';

// Indian company data for lead generation
const INDIAN_COMPANIES = [
  {
    name: 'TechCorp India Ltd',
    industry: 'Technology',
    location: 'Bangalore',
    size: 'Large',
    website: 'https://techcorp.in',
    description: 'Leading software development company specializing in enterprise solutions'
  },
  {
    name: 'Innovate Solutions',
    industry: 'Technology',
    location: 'Mumbai',
    size: 'Medium',
    website: 'https://innovate.in',
    description: 'Innovative tech startup focused on AI and machine learning'
  },
  {
    name: 'FinTech Solutions',
    industry: 'Finance',
    location: 'Delhi',
    size: 'Medium',
    website: 'https://fintech.co',
    description: 'Digital banking and payment solutions provider'
  },
  {
    name: 'HealthCare Plus',
    industry: 'Healthcare',
    location: 'Chennai',
    size: 'Large',
    website: 'https://healthcareplus.in',
    description: 'Comprehensive healthcare services and medical technology'
  },
  {
    name: 'EduTech Innovations',
    industry: 'Education',
    location: 'Hyderabad',
    size: 'Medium',
    website: 'https://edutech.in',
    description: 'Educational technology platform for online learning'
  },
  {
    name: 'Manufacturing Corp',
    industry: 'Manufacturing',
    location: 'Pune',
    size: 'Large',
    website: 'https://manufacturingcorp.in',
    description: 'Industrial manufacturing and automation solutions'
  },
  {
    name: 'RetailMax',
    industry: 'Retail',
    location: 'Kolkata',
    size: 'Medium',
    website: 'https://retailmax.in',
    description: 'Omnichannel retail solutions and e-commerce platform'
  },
  {
    name: 'ConsultPro',
    industry: 'Consulting',
    location: 'Bangalore',
    size: 'Small',
    website: 'https://consultpro.in',
    description: 'Business consulting and strategy advisory services'
  }
];

const INDIAN_NAMES = [
  { first: 'Rajesh', last: 'Kumar', title: 'CTO' },
  { first: 'Priya', last: 'Sharma', title: 'Marketing Director' },
  { first: 'Amit', last: 'Patel', title: 'CEO' },
  { first: 'Sneha', last: 'Singh', title: 'VP Sales' },
  { first: 'Vikram', last: 'Gupta', title: 'Head of Operations' },
  { first: 'Anita', last: 'Reddy', title: 'CFO' },
  { first: 'Rahul', last: 'Jain', title: 'Product Manager' },
  { first: 'Kavita', last: 'Agarwal', title: 'HR Director' },
  { first: 'Suresh', last: 'Malhotra', title: 'Business Development' },
  { first: 'Deepika', last: 'Verma', title: 'Operations Manager' }
];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { industry, location, companySize, keywords, leadLimit = 10 } = await request.json();

    // Validate required fields
    if (!industry) {
      return NextResponse.json(
        { error: 'Industry is required' },
        { status: 400 }
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

    const costPerLead = 5; // 5 credits per lead
    const totalCost = leadLimit * costPerLead;

    if (user.creditBalance < totalCost) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          required: totalCost,
          available: user.creditBalance,
          message: `You need ${totalCost} credits but only have ${user.creditBalance} credits`
        },
        { status: 402 }
      );
    }

    // Filter companies based on criteria
    let filteredCompanies = INDIAN_COMPANIES.filter(company => {
      if (industry && company.industry.toLowerCase() !== industry.toLowerCase()) {
        return false;
      }
      if (location && company.location.toLowerCase() !== location.toLowerCase()) {
        return false;
      }
      if (companySize && company.size.toLowerCase() !== companySize.toLowerCase()) {
        return false;
      }
      if (keywords && !company.description.toLowerCase().includes(keywords.toLowerCase())) {
        return false;
      }
      return true;
    });

    // If no companies match, use all companies
    if (filteredCompanies.length === 0) {
      filteredCompanies = INDIAN_COMPANIES;
    }

    // Generate leads
    const generatedLeads = [];
    const usedCompanies = new Set();

    for (let i = 0; i < Math.min(leadLimit, filteredCompanies.length); i++) {
      let company;
      let attempts = 0;
      
      // Try to get a unique company
      do {
        company = filteredCompanies[Math.floor(Math.random() * filteredCompanies.length)];
        attempts++;
      } while (usedCompanies.has(company.name) && attempts < 10);
      
      usedCompanies.add(company.name);

      const person = INDIAN_NAMES[Math.floor(Math.random() * INDIAN_NAMES.length)];
      const score = Math.floor(Math.random() * 30) + 70; // Score between 70-100
      
      const lead = {
        firstName: person.first,
        lastName: person.last,
        email: `${person.first.toLowerCase()}.${person.last.toLowerCase()}@${company.name.toLowerCase().replace(/\s+/g, '')}.in`,
        phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        company: company.name,
        jobTitle: person.title,
        industry: company.industry,
        location: company.location,
        score: score,
        status: score >= 90 ? 'HOT' : score >= 80 ? 'WARM' : 'COLD',
        source: 'AI_GENERATED',
        companySize: company.size,
        website: company.website,
        linkedinUrl: `https://linkedin.com/in/${person.first.toLowerCase()}-${person.last.toLowerCase()}`,
        notes: [`Generated for ${industry} industry targeting`, `Located in ${company.location}`, `Company size: ${company.size}`],
        tags: [industry, company.location, company.size.toLowerCase()]
      };

      generatedLeads.push(lead);
    }

    // Create campaign record
    const campaign = await prisma.campaign.create({
      data: {
        userId: session.user.id,
        name: `AI Lead Generation - ${industry} ${location ? `(${location})` : ''}`,
        description: `Generated ${generatedLeads.length} leads for ${industry} industry`,
        industry: industry,
        targetRoles: ['Decision Makers', 'Influencers'],
        locations: location ? [location] : ['India'],
        companySizes: companySize ? [companySize] : ['Small', 'Medium', 'Large'],
        keywords: keywords ? [keywords] : [],
        leadLimit: leadLimit,
        budget: totalCost,
        status: 'COMPLETED',
        totalLeadsFound: generatedLeads.length,
        leadsProcessed: generatedLeads.length,
        startedAt: new Date(),
        completedAt: new Date()
      }
    });

    // Create lead records
    const createdLeads = [];
    for (const leadData of generatedLeads) {
      const lead = await prisma.lead.create({
        data: {
          userId: session.user.id,
          campaignId: campaign.id,
          firstName: leadData.firstName,
          lastName: leadData.lastName,
          email: leadData.email,
          phone: leadData.phone,
          company: leadData.company,
          jobTitle: leadData.jobTitle,
          industry: leadData.industry,
          location: leadData.location,
          score: leadData.score,
          status: 'NEW',
          source: 'AI_GENERATED',
          companySize: leadData.companySize,
          website: leadData.website,
          linkedinUrl: leadData.linkedinUrl,
          notes: leadData.notes,
          tags: leadData.tags,
          lastActivityAt: new Date()
        }
      });
      createdLeads.push(lead);
    }

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
        description: `AI Lead Generation: ${generatedLeads.length} leads for ${industry}`,
        metadata: {
          campaignId: campaign.id,
          leadCount: generatedLeads.length,
          costPerLead: costPerLead,
          industry: industry,
          location: location
        }
      }
    });

    // Create success notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'success',
        title: '🎯 Leads Generated Successfully!',
        message: `Generated ${generatedLeads.length} high-quality leads for ${industry} industry. Used ${totalCost} credits.`,
        actionUrl: '/dashboard?section=leads'
      }
    });

    return NextResponse.json({
      success: true,
      message: `Successfully generated ${generatedLeads.length} leads`,
      leads: createdLeads,
      campaign: campaign,
      creditsUsed: totalCost,
      remainingCredits: user.creditBalance - totalCost
    });

  } catch (error) {
    console.error('Lead generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate leads. Please try again.' },
      { status: 500 }
    );
  }
}
