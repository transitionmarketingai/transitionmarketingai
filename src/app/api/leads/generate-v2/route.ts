// AI Lead Generation API v2
// Generates lead previews (FREE) with masked contact info
// Contact details revealed only after unlock (paid)

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_ffcfced7c01011589c6b107a806e8f00dd71da39';
const supabase = createClient(supabaseUrl, supabaseKey);

interface LeadFilters {
  industry: string;
  locations: string[];
  companySizes: string[];
  budget: string;
  keywords: string[];
  minScore: number;
  quantity: number;
  userId?: string;
  saveSearch?: boolean;
  searchName?: string;
}

interface LeadPreview {
  id: number;
  company: string;
  industry: string;
  location: string;
  companySize: string;
  website: string;
  aiScore: number;
  insights: string[];
  
  // Masked contact info
  contactPreview: string;
  emailPreview: string;
  phonePreview: string;
  
  unlocked: boolean;
  creditsRequired: number;
  
  // Full contact (only if unlocked)
  contactName?: string;
  email?: string;
  phone?: string;
}

// Mask contact information
function maskContactInfo(contact: { name: string; email: string; phone?: string }) {
  const maskString = (str: string, visibleStart: number = 1, visibleEnd: number = 1) => {
    if (str.length <= visibleStart + visibleEnd) return '████';
    const start = str.substring(0, visibleStart);
    const end = str.substring(str.length - visibleEnd);
    const middle = '█'.repeat(Math.min(8, str.length - visibleStart - visibleEnd));
    return `${start}${middle}${end}`;
  };

  const nameParts = contact.name.split(' ');
  const contactPreview = nameParts.length > 1
    ? `${nameParts[0].charAt(0)}${'█'.repeat(4)} ${nameParts[nameParts.length - 1].charAt(0)}${'█'.repeat(4)}`
    : maskString(contact.name, 1, 1);

  const emailParts = contact.email.split('@');
  const emailPreview = `${emailParts[0].charAt(0)}${'█'.repeat(4)}@${emailParts[1].substring(0, 1)}${'█'.repeat(4)}.com`;

  const phonePreview = contact.phone 
    ? `+91-${contact.phone.slice(-10, -6)}${'█'.repeat(6)}`
    : '+91-98████████';

  return {
    contactPreview,
    emailPreview,
    phonePreview,
  };
}

// Generate AI insights
function generateAIInsights(company: string, industry: string, location: string): string[] {
  const insights = [
    `Active in ${location} market`,
    `${industry} industry leader`,
    `Growing team of professionals`,
    `Strong online presence detected`,
    `Regular hiring activity`,
    `Active social media engagement`,
    `Recent company updates available`,
    `Established market presence`,
  ];

  // Return 3 random insights
  return insights.sort(() => 0.5 - Math.random()).slice(0, 3);
}

// Generate mock leads (replace with real data source)
async function generateLeadPreviews(filters: LeadFilters): Promise<LeadPreview[]> {
  const mockCompanies = [
    { name: 'TechCorp Solutions', industry: 'Technology', city: 'Mumbai', size: '50-200' },
    { name: 'HealthFirst Clinic', industry: 'Healthcare', city: 'Delhi', size: '10-50' },
    { name: 'EduTech Innovations', industry: 'Education', city: 'Bangalore', size: '20-100' },
    { name: 'FinancePro Advisors', industry: 'Finance', city: 'Chennai', size: '5-25' },
    { name: 'RetailMax Stores', industry: 'Retail', city: 'Pune', size: '100-500' },
    { name: 'Manufacturing Hub', industry: 'Manufacturing', city: 'Ahmedabad', size: '500-1000' },
    { name: 'Logistics Prime', industry: 'Logistics', city: 'Hyderabad', size: '200-500' },
    { name: 'AgriGrow Solutions', industry: 'Agriculture', city: 'Lucknow', size: '50-100' },
    { name: 'Digital Marketing Pros', industry: 'Marketing', city: 'Kolkata', size: '20-50' },
    { name: 'E-commerce Ventures', industry: 'Retail', city: 'Jaipur', size: '10-20' },
    { name: 'CloudTech Systems', industry: 'Technology', city: 'Mumbai', size: '100-200' },
    { name: 'AI Innovations Lab', industry: 'Technology', city: 'Bangalore', size: '50-100' },
    { name: 'FinServe India', industry: 'Finance', city: 'Mumbai', size: '200-500' },
    { name: 'MediCare Plus', industry: 'Healthcare', city: 'Delhi', size: '50-200' },
    { name: 'AutoParts Direct', industry: 'Manufacturing', city: 'Pune', size: '100-200' },
  ];

  // Get unlocked lead companies for this user (to avoid duplicates)
  let excludeCompanies: string[] = [];
  if (filters.userId) {
    const { data: unlocked } = await supabase
      .from('unlocked_leads')
      .select('lead_id')
      .eq('user_id', filters.userId);

    if (unlocked && unlocked.length > 0) {
      const { data: unlockedLeads } = await supabase
        .from('leads')
        .select('company')
        .in('id', unlocked.map(u => u.lead_id));
      
      excludeCompanies = unlockedLeads?.map(l => l.company) || [];
    }
  }

  // Filter companies
  const filtered = mockCompanies.filter(comp => {
    // Exclude already unlocked
    if (excludeCompanies.includes(comp.name)) return false;
    
    // Match industry
    if (comp.industry !== filters.industry) return false;
    
    // Match location
    if (!filters.locations.includes(comp.city)) return false;
    
    // Match company size
    if (!filters.companySizes.includes(comp.size)) return false;
    
    // Match keywords (if any)
    if (filters.keywords.length > 0) {
      const hasKeyword = filters.keywords.some(kw => 
        comp.name.toLowerCase().includes(kw.toLowerCase())
      );
      if (!hasKeyword) return false;
    }
    
    return true;
  });

  const leads: LeadPreview[] = [];
  
  for (let i = 0; i < Math.min(filters.quantity, filtered.length * 2); i++) {
    const comp = filtered[i % filtered.length];
    
    // Generate mock contact
    const contactName = `Contact Person ${i + 1}`;
    const email = `contact${i + 1}@${comp.name.toLowerCase().replace(/\s/g, '')}.com`;
    const phone = `+919${Math.floor(100000000 + Math.random() * 900000000)}`;

    // Mask contact info
    const masked = maskContactInfo({ name: contactName, email, phone });

    // Generate AI score
    const aiScore = Math.floor(Math.random() * 40) + 60; // 60-100

    // Check if meets minimum score
    if (aiScore < filters.minScore) {
      continue;
    }

    const lead: LeadPreview = {
      id: Date.now() + i, // Temporary ID
      company: comp.name,
      industry: comp.industry,
      location: comp.city,
      companySize: comp.size,
      website: `https://${comp.name.toLowerCase().replace(/\s/g, '')}.com`,
      aiScore,
      insights: generateAIInsights(comp.name, comp.industry, comp.city),
      
      // Masked info
      contactPreview: masked.contactPreview,
      emailPreview: masked.emailPreview,
      phonePreview: masked.phonePreview,
      
      unlocked: false,
      creditsRequired: 5,
    };

    leads.push(lead);
  }

  // Sort by AI score (highest first)
  return leads.sort((a, b) => b.aiScore - a.aiScore).slice(0, filters.quantity);
}

export async function POST(req: Request) {
  try {
    const filters: LeadFilters = await req.json();

    // Validation
    if (!filters.industry || !filters.locations || filters.locations.length === 0 ||
        !filters.companySizes || filters.companySizes.length === 0 || !filters.budget) {
      return NextResponse.json(
        { error: 'Missing required filters' },
        { status: 400 }
      );
    }

    console.log('Generating leads with filters:', filters);

    // Generate lead previews
    const leadPreviews = await generateLeadPreviews(filters);

    // Save search to history
    if (filters.userId) {
      try {
        await supabase.from('lead_searches').insert({
          user_id: filters.userId,
          filters: filters as any,
          results_count: leadPreviews.length,
        });

        // Save as saved search if requested
        if (filters.saveSearch && filters.searchName) {
          await supabase.from('saved_searches').insert({
            user_id: filters.userId,
            name: filters.searchName,
            filters: filters as any,
            last_run: new Date().toISOString(),
            total_runs: 1,
          });
        }
      } catch (err) {
        console.error('Error saving search:', err);
        // Continue anyway
      }
    }

    return NextResponse.json({
      success: true,
      leads: leadPreviews,
      total: leadPreviews.length,
      creditsUsed: 0, // Preview is FREE
      message: `Generated ${leadPreviews.length} lead previews. Unlock contact info for 5 credits each.`,
      filters: filters, // Return filters used
    });

  } catch (error) {
    console.error('Lead generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate leads' },
      { status: 500 }
    );
  }
}

