/**
 * AI Lead Enrichment Service
 * Automatically enriches leads with company data, social profiles, and contact verification
 */

export interface EnrichmentData {
  // Company Information
  companySize?: string;
  companyRevenue?: string;
  companyIndustry?: string;
  employeeCount?: number;
  foundedYear?: number;
  website?: string;
  
  // Contact Verification
  emailVerified?: boolean;
  emailQuality?: 'valid' | 'risky' | 'invalid';
  phoneVerified?: boolean;
  
  // Social Profiles
  linkedinUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  
  // Decision Maker Info
  jobTitle?: string;
  department?: string;
  seniorityLevel?: 'C-Level' | 'Director' | 'Manager' | 'Individual Contributor';
  
  // Company Signals
  recentNews?: Array<{
    title: string;
    source: string;
    date: string;
    url: string;
  }>;
  fundingRound?: string;
  techStack?: string[];
  
  // Enrichment Metadata
  enrichmentScore: number; // 0-100, completeness of data
  lastEnriched: string;
  dataSources: string[];
}

interface LeadInput {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  location?: string;
}

export async function enrichLead(lead: LeadInput): Promise<EnrichmentData> {
  console.log('🔍 Enriching lead:', lead.name);
  
  // In production, this would call multiple APIs:
  // - Clearbit for company data
  // - Hunter.io for email verification
  // - LinkedIn/Apollo for contact info
  // - Google News API for recent news
  
  // For now, we'll use simulated enrichment with realistic data
  const enrichmentData = simulateEnrichment(lead);
  
  return enrichmentData;
}

function simulateEnrichment(lead: LeadInput): EnrichmentData {
  // Simulate realistic enrichment data
  const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
  const revenues = ['₹1-5 Cr', '₹5-10 Cr', '₹10-50 Cr', '₹50-100 Cr', '₹100+ Cr'];
  const seniorities: Array<'C-Level' | 'Director' | 'Manager' | 'Individual Contributor'> = ['C-Level', 'Director', 'Manager', 'Individual Contributor'];
  const departments = ['Sales', 'Marketing', 'Operations', 'Finance', 'IT', 'HR'];
  
  const hasCompany = !!lead.company;
  const hasEmail = !!lead.email;
  const hasPhone = !!lead.phone;
  
  // Calculate enrichment score
  let score = 50; // Base score
  if (hasCompany) score += 20;
  if (hasEmail) score += 15;
  if (hasPhone) score += 10;
  if (lead.location) score += 5;
  
  const enrichmentData: EnrichmentData = {
    enrichmentScore: score,
    lastEnriched: new Date().toISOString(),
    dataSources: ['Simulated Data'],
  };
  
  // Company Information
  if (hasCompany) {
    enrichmentData.companySize = companySizes[Math.floor(Math.random() * companySizes.length)];
    enrichmentData.companyRevenue = revenues[Math.floor(Math.random() * revenues.length)];
    enrichmentData.companyIndustry = lead.company?.includes('Tech') ? 'Technology' : 
                                     lead.company?.includes('Real') ? 'Real Estate' :
                                     lead.company?.includes('Pharma') ? 'Healthcare' :
                                     'Professional Services';
    enrichmentData.employeeCount = Math.floor(Math.random() * 500) + 10;
    enrichmentData.foundedYear = 2010 + Math.floor(Math.random() * 13);
    enrichmentData.website = `https://www.${lead.company?.toLowerCase().replace(/\s+/g, '')}.com`;
  }
  
  // Email Verification
  if (hasEmail) {
    enrichmentData.emailVerified = Math.random() > 0.2; // 80% verification rate
    enrichmentData.emailQuality = enrichmentData.emailVerified ? 'valid' : 'risky';
  }
  
  // Phone Verification
  if (hasPhone) {
    enrichmentData.phoneVerified = Math.random() > 0.3; // 70% verification rate
  }
  
  // Social Profiles (if company exists)
  if (hasCompany) {
    const companySlug = lead.company.toLowerCase().replace(/\s+/g, '');
    enrichmentData.linkedinUrl = `https://linkedin.com/company/${companySlug}`;
    if (Math.random() > 0.5) {
      enrichmentData.facebookUrl = `https://facebook.com/${companySlug}`;
    }
    if (Math.random() > 0.7) {
      enrichmentData.twitterUrl = `https://twitter.com/${companySlug}`;
    }
  }
  
  // Decision Maker Info
  enrichmentData.jobTitle = generateJobTitle(lead.name);
  enrichmentData.department = departments[Math.floor(Math.random() * departments.length)];
  enrichmentData.seniorityLevel = seniorities[Math.floor(Math.random() * seniorities.length)];
  
  // Recent News (if company exists)
  if (hasCompany && Math.random() > 0.4) {
    enrichmentData.recentNews = [
      {
        title: `${lead.company} expands operations in ${lead.location || 'India'}`,
        source: 'Economic Times',
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        url: '#',
      },
      {
        title: `${lead.company} launches new product line`,
        source: 'Business Standard',
        date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        url: '#',
      },
    ];
  }
  
  // Funding (for some companies)
  if (hasCompany && Math.random() > 0.6) {
    const fundingRounds = ['Seed', 'Series A', 'Series B', 'Series C', 'Pre-IPO'];
    enrichmentData.fundingRound = fundingRounds[Math.floor(Math.random() * fundingRounds.length)];
  }
  
  // Tech Stack (for tech companies)
  if (enrichmentData.companyIndustry === 'Technology') {
    const techOptions = ['React', 'Node.js', 'AWS', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'Salesforce', 'HubSpot'];
    const techCount = 3 + Math.floor(Math.random() * 4);
    enrichmentData.techStack = [];
    for (let i = 0; i < techCount; i++) {
      const tech = techOptions[Math.floor(Math.random() * techOptions.length)];
      if (!enrichmentData.techStack.includes(tech)) {
        enrichmentData.techStack.push(tech);
      }
    }
  }
  
  return enrichmentData;
}

function generateJobTitle(name: string): string {
  const titles = [
    'Founder & CEO',
    'Chief Technology Officer',
    'VP of Sales',
    'Marketing Director',
    'Head of Operations',
    'Business Development Manager',
    'Product Manager',
    'Senior Software Engineer',
    'Sales Manager',
    'Marketing Manager',
  ];
  
  // Use name hash to consistently generate same title for same name
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return titles[hash % titles.length];
}

export async function batchEnrichLeads(leads: LeadInput[]): Promise<Map<string, EnrichmentData>> {
  console.log(`🔍 Batch enriching ${leads.length} leads...`);
  
  const enrichmentMap = new Map<string, EnrichmentData>();
  
  // In production, this would batch process through APIs
  for (const lead of leads) {
    const enrichment = await enrichLead(lead);
    enrichmentMap.set(lead.email || lead.name, enrichment);
  }
  
  return enrichmentMap;
}

export function getEnrichmentQualityBadge(score: number): {
  label: string;
  color: string;
} {
  if (score >= 90) return { label: 'Excellent', color: 'green' };
  if (score >= 75) return { label: 'Good', color: 'blue' };
  if (score >= 60) return { label: 'Fair', color: 'yellow' };
  return { label: 'Limited', color: 'gray' };
}

