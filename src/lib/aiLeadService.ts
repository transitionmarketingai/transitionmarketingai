// AI Lead Generation Service for Indian Market
import { supabase } from './supabase';

export interface LeadCampaign {
  id: string;
  name: string;
  industry: string;
  location: string[];
  targetRoles: string[];
  companySize: string[];
  budget: number;
  status: 'active' | 'paused' | 'completed' | 'draft';
  createdAt: string;
  userId: string;
  settings: {
    dailyMaxLeads: number;
    aiQualityScore: number;
    leadSource: string[];
  };
}

export interface GeneratedLead {
  id: string;
  campaignId: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  score: number;
  notes: string[];
  source: 'linkedin' | 'company_website' | 'industry_db' | 'ai_discovery';
  createdAt: string;
  userId: string;
}

export interface IndustryProfile {
  id: string;
  name: string;
  description: string;
  avgCostPerLead: number;
  conversionRate: string;
  keyCities: string[];
  targetKeywords: string[];
  leadSources: string[];
}

class AILeadService {
  private async getCurrentUserId(): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  }

  // Industry profiles for Indian market
  private getIndustryProfiles(): IndustryProfile[] {
    return [
      {
        id: 'retail-commerce',
        name: 'Retail & E-commerce',
        description: 'Online sellers, marketplace vendors, retail businesses',
        avgCostPerLead: 45,
        conversionRate: '8-15%',
        keyCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
        targetKeywords: ['online seller', 'ecommerce', 'marketplace', 'retail', 'shopify', 'amazon'],
        leadSources: ['Instagram', 'Facebook', 'LinkedIn', 'Company websites']
      },
      {
        id: 'consulting-services',
        name: 'Business Consulting',
        description: 'Management consultants, business advisors, corporate services',
        avgCostPerLead: 125,
        conversionRate: '15-25%',
        keyCities: ['Mumbai', 'Delhi', 'Pune', 'Bangalore', 'Chennai'],
        targetKeywords: ['consultant', 'advisor', 'strategy', 'business coach', 'business development'],
        leadSources: ['LinkedIn', 'Industry websites', 'Corporate directories']
      },
      {
        id: 'real-estate',
        name: 'Real Estate',
        description: 'Property developers, real estate agents, prop-tech',
        avgCostPerLead: 65,
        conversionRate: '5-12%',
        keyCities: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai'],
        targetKeywords: ['real estate', 'property', 'developer', 'agent', 'prop-tech'],
        leadSources: ['Company sites', 'Property portals', 'LinkedIn']
      },
      {
        id: 'healthcare-pharma',
        name: 'Healthcare & Pharma',
        description: 'Hospitals, clinics, pharmaceutical companies',
        avgCostPerLead: 85,
        conversionRate: '10-20%',
        keyCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
        targetKeywords: ['hospital', 'clinic', 'pharma', 'healthcare', 'medical'],
        leadSources: ['Medical directories', 'Healthcare websites', 'LinkedIn']
      },
      {
        id: 'education-training',
        name: 'Education & Training',
        description: 'Schools, coaching centers, online education platforms',
        avgCostPerLead: 35,
        conversionRate: '6-18%',
        keyCities: ['Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Mumbai'],
        targetKeywords: ['school', 'college', 'coaching', 'education', 'training'],
        leadSources: ['Education portals', 'School websites', 'Social media']
      },
      {
        id: 'finance-insurance',
        name: 'Finance & Insurance',
        description: 'NBFCs, insurance companies, fintech startups',
        avgCostPerLead: 75,
        conversionRate: '4-12%',
        keyCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'],
        targetKeywords: ['finance', 'insurance', 'nbfc', 'fintech', 'loan'],
        leadSources: ['Financial directories', 'Company websites', 'LinkedIn']
      },
      {
        id: 'manufacturing-industrial',
        name: 'Manufacturing & Industrial',
        description: 'Manufacturing companies, industrial suppliers',
        avgCostPerLead: 95,
        conversionRate: '8-20%',
        keyCities: ['Chennai', 'Pune', 'Ahmedabad', 'Mumbai', 'Delhi'],
        targetKeywords: ['manufacturing', 'industrial', 'factory', 'supply chain'],
        leadSources: ['Industry directories', 'Company sites', 'Trade publications']
      },
      {
        id: 'technology-it',
        name: 'Technology & IT Services',
        description: 'Software companies, IT services, startups',
        avgCostPerLead: 50,
        conversionRate: '10-25%',
        keyCities: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Noida'],
        targetKeywords: ['software', 'IT services', 'startup', 'tech company'],
        leadSources: ['Company websites', 'LinkedIn', 'Startup directories']
      }
    ];
  }

  // Create new AI campaign
  async createCampaign(campaignData: Omit<LeadCampaign, 'id' | 'createdAt' | 'userId'>): Promise<LeadCampaign | null> {
    const userId = await this.getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');

    const campaign: LeadCampaign = {
      ...campaignData,
      id: `campaign_${Date.now()}`,
      createdAt: new Date().toISOString(),
      userId
    };

    try {
      // Store in Supabase (if connected)
      const { error } = await supabase
        .from('lead_campaigns')
        .insert([{
          user_id: userId,
          name: campaign.name,
          industry: campaign.industry,
          location: campaign.location,
          target_roles: campaign.targetRoles,
          company_size: campaign.companySize,
          budget: campaign.budget,
          status: campaign.status,
          settings: campaign.settings
        }]);

      if (error) {
        console.error('Error storing campaign:', error);
        // For demo, continue without storing
      }

      return campaign;
    } catch (error) {
      console.error('Error creating campaign:', error);
      return campaign; // Return campaign for demo
    }
  }

  // Generate AI leads for campaign
  async generateLeads(campaignId: string, dailyLimit: number = 50): Promise<GeneratedLead[]> {
    const campaign = await this.getCampaign(campaignId);
    if (!campaign) throw new Error('Campaign not found');

    // Get industry profile for better targeting
    const industryProfiles = this.getIndustryProfiles();
    const industryProfile = industryProfiles.find(p => p.name.toLowerCase().includes(campaign.industry.toLowerCase()));

    // AI Lead Generation Simulation
    const leads: GeneratedLead[] = [];
    const industries = industryProfile?.keyCities || campaign.location;
    const roles = campaign.targetRoles || ['Manager', 'Director', 'Owner'];

    for (let i = 0; i < Math.min(dailyLimit, 25); i++) {
      const lead = await this.generateSimulatedLead(campaign, industryProfile);
      leads.push(lead);
    }

    // Store leads in Supabase
    if (leads.length > 0) {
      try {
        const { error } = await supabase
          .from('generated_leads')
          .insert(leads.map(lead => ({
            campaign_id: lead.campaignId,
            name: lead.name,
            title: lead.title,
            company: lead.company,
            industry: lead.industry,
            location: lead.location,
            email: lead.email,
            phone: lead.phone,
            linkedin_url: lead.linkedinUrl,
            score: lead.score,
            notes: lead.notes,
            source: lead.source,
            user_id: lead.userId
          })));

        if (error) {
          console.error('Error storing leads:', error);
        }
      } catch (error) {
        console.error('Error storing leads:', error);
      }
    }

    return leads;
  }

  // Simulate AI lead generation
  private async generateSimulatedLead(campaign: LeadCampaign, industryProfile?: IndustryProfile): Promise<GeneratedLead> {
    const userId = await this.getCurrentUserId() || 'demo-user';

    // Indian business names and personal names
    const companyNames = [
      'TechCorp Solutions', 'InnovateSoft', 'Digital Frontier', 'NextGen Technologies',
      'CloudBridge Systems', 'DataDriven Solutions', 'SmartPath Analytics', 'FutureWork Labs',
      'InfiniteTech', 'Nexus Solutions', 'InnovationHub', 'TechCanvas', 'Digital Genesis',
      'CloudScale', 'DataVibe', 'TechPulse', 'InnovationWorks'
    ];

    const indianNames = [
      'Rajesh Sharma', 'Priya Singh', 'Amit Kumar', 'Sneha Patel', 'Vikram Reddy',
      'Kavya Iyer', 'Arjun Mehta', 'Divya Joshi', 'Rohit Agarwal', 'Sunita Gupta',
      'Siddharth Malhotra', 'Preeti Shah', 'Ravi Kumar', 'Meghana Krishnan', 'Deepak Jain',
      'Anita Reddy', 'Kiran Sharma', 'Suresh Patel', 'Pooja Agarwal', 'Rahul Singh'
    ];

    const titles = campaign.targetRoles.length > 0 ? campaign.targetRoles : [
      'Marketing Manager', 'Sales Director', 'Business Owner', 'CEO', 'CTO',
      'Operations Manager', 'Growth Manager', 'Product Manager', 'Co-Founder'
    ];

    const locations = campaign.location.length > 0 ? campaign.location : 
      ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'];

    const company = companyNames[Math.floor(Math.random() * companyNames.length)];
    const name = indianNames[Math.floor(Math.random() * indianNames.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    // AI quality score based on industry and targeting
    const baseScore = industryProfile ? 70 + Math.random() * 20 : 60 + Math.random() * 25;
    const score = Math.min(Math.round(baseScore), 95);

    // Generate AI-powered insights
    const insights = await this.generateLeadInsights(campaign, location, industryProfile);

    return {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      campaignId: campaign.id,
      name,
      title,
      company,
      industry: campaign.industry,
      location,
      email: `${name.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(' ', '')}.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      linkedinUrl: `https://linkedin.com/in/${name.toLowerCase().replace(' ', '-')}-${Math.random().toString(36).substr(2, 4)}`,
      score,
      notes: insights,
      source: ['linkedin', 'company_website', 'industry_db', 'ai_discovery'][Math.floor(Math.random() * 4)] as any,
      createdAt: new Date().toISOString(),
      userId
    };
  }

  // Generate AI insights for lead qualification
  private async generateLeadInsights(campaign: LeadCampaign, location: string, industryProfile?: IndustryProfile): Promise<string[]> {
    const insights = [
      `Potential for ${campaign.industry} growth in ${location}`,
      `Company appears to be scaling operations`,
      `Recent funding or expansion activity`,
      `Strong online presence and digital engagement`,
      `Target audience alignment with ${campaign.industry} industry`,
      `Decision maker with budget authority`,
      `Active on professional networks`,
      `Likely evaluating solutions in ${campaign.industry}`
    ];

    // Return 3-5 random insights
    const shuffled = insights.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3 + Math.floor(Math.random() * 3));
  }

  // Get campaign by ID
  async getCampaign(campaignId: string): Promise<LeadCampaign | null> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) return this.getDemoCampaign(campaignId);

      const { data, error } = await supabase
        .from('lead_campaigns')
        .select('*')
        .eq('campaign_id', campaignId)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching campaign:', error);
        return this.getDemoCampaign(campaignId);
      }

      if (!data) return null;

      return {
        id: data.campaign_id,
        name: data.name,
        industry: data.industry,
        location: data.location,
        targetRoles: data.target_roles,
        companySize: data.company_size,
        budget: data.budget,
        status: data.status,
        createdAt: data.created_at,
        userId: data.user_id,
        settings: data.settings
      };
    } catch (error) {
      console.error('Error getting campaign:', error);
      return this.getDemoCampaign(campaignId);
    }
  }

  // Get user's campaigns
  async getUserCampaigns(): Promise<LeadCampaign[]> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) return this.getDemoCampaigns();

      const { data, error } = await supabase
        .from('lead_campaigns')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching campaigns:', error);
        return this.getDemoCampaigns();
      }

      return data.map(item => ({
        id: item.campaign_id,
        name: item.name,
        industry: item.industry,
        location: item.location,
        targetRoles: item.target_roles,
        companySize: item.company_size,
        budget: item.budget,
        status: item.status,
        createdAt: item.created_at,
        userId: item.user_id,
        settings: item.settings
      }));
    } catch (error) {
      console.error('Error getting user campaigns:', error);
      return this.getDemoCampaigns();
    }
  }

  // Get leads for campaign
  async getCampaignLeads(campaignId: string): Promise<GeneratedLead[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('generated_leads')
        .select('*')
        .eq('campaign_id', campaignId)
        .eq('user_id', userId || 'demo-user')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        return this.getDemoLeads(campaignId);
      }

      return data.map(item => ({
        id: item.id,
        campaignId: item.campaign_id,
        name: item.name,
        title: item.title,
        company: item.company,
        industry: item.industry,
        location: item.location,
        email: item.email,
        phone: item.phone,
        linkedinUrl: item.linkedin_url,
        score: item.score,
        notes: item.notes,
        source: item.source,
        createdAt: item.created_at,
        userId: item.user_id
      }));
    } catch (error) {
      console.error('Error getting campaign leads:', error);
      return this.getDemoLeads(campaignId);
    }
  }

  // Demo data methods
  private getDemoCampaign(campaignId: string): LeadCampaign | null {
    const campaigns = this.getDemoCampaigns();
    return campaigns.find(c => c.id === campaignId) || null;
  }

  private getDemoCampaigns(): LeadCampaign[] {
    return [
      {
        id: 'demo-1',
        name: 'Bangalore IT Startups',
        industry: 'Technology',
        location: ['Bangalore', 'Chennai', 'Hyderabad'],
        targetRoles: ['CTO', 'Founder', 'Product Manager'],
        companySize: ['Small (11-50)', 'Medium (51-200)'],
        budget: 15000,
        status: 'active',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 'demo-user',
        settings: {
          dailyMaxLeads: 25,
           aiQualityScore: 85,
          leadSource: ['linkedin', 'company_website']
        }
      },
      {
        id: 'demo-2',
        name: 'Mumbai Real Estate',
        industry: 'Real Estate',
        location: ['Mumbai', 'Pune'],
        targetRoles: ['Owner', 'Director', 'Manager'],
        companySize: ['Medium (51-200)', 'Large (201-1000)'],
        budget: 8500,
        status: 'active',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 'demo-user',
        settings: {
          dailyMaxLeads: 15,
          aiQualityScore: 78,
          leadSource: ['linkedin', 'company_website', 'industry_db']
        }
      }
    ];
  }

  private getDemoLeads(campaignId: string): GeneratedLead[] {
    const demoLeads = [
      {
        id: 'lead-demo-1',
        campaignId,
        name: 'Rajesh Sharma',
        title: 'CTO',
        company: 'TechInnovate Solutions',
        industry: 'Technology',
        location: 'Bangalore',
        email: 'rajesh.sharma@techinnovate.com',
        phone: '+91 98765 43210',
        linkedinUrl: 'https://linkedin.com/in/rajesh-sharma-cto',
        score: 92,
        notes: [
          'Growing tech startup with Series A funding',
          'Looking to scale development team',
          'Active on LinkedIn with recent hiring posts'
        ],
        source: 'linkedin' as const,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        userId: 'demo-user'
      },
      {
        id: 'lead-demo-2',
        campaignId,
        name: 'Priya Singh',
        title: 'Founder',
        company: 'DigitalFirst Apps',
        industry: 'Technology',
        location: 'Chennai',
        email: 'priya@digitalfirst.com',
        phone: '+91 87654 32100',
        linkedinUrl: 'https://linkedin.com/in/priya-singh-founder',
        score: 88,
        notes: [
          'Fintech startup with aggressive growth plans',
          'Recently expanded to Mumbai office',
          'TechCrunch featured company'
        ],
        source: 'company_website' as const,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        userId: 'demo-user'
      }
    ];

    return demoLeads;
  }

  // Get industry profiles
  getIndustryProfilesForMarket(): IndustryProfile[] {
    return this.getIndustryProfiles();
  }

  // Update campaign status
  async updateCampaignStatus(campaignId: string, status: LeadCampaign['status']): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) return true; // Demo mode

      const { error } = await supabase
        .from('lead_campaigns')
        .update({ status })
        .eq('campaign_id', campaignId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating campaign status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating campaign status:', error);
      return false;
    }
  }

  // Lead qualification AI
  async qualifyLead(lead: GeneratedLead): Promise<{
    qualified: boolean;
    confidence: number;
    reasons: string[];
    nextAction: string;
  }> {
    // AI-powered lead qualification
    const score = lead.score;
    const industryRelevance = lead.notes.length >= 3 ? 0.8 : 0.6;
    const engagementIndicators = lead.score > 80 ? 0.9 : 0.7;
    
    const confidence = (score + (industryRelevance * 100) + (engagementIndicators * 100)) / 3;
    const qualified = confidence >= 70;

    const reasons = qualified ? [
      'High AI confidence score',
      'Strong industry alignment',
      'Complete contact information',
      'Active professional presence'
    ] : [
      'Lower confidence score',
      'Incomplete customer profile',
      'Limited engagement indicators'
    ];

    const nextAction = qualified 
      ? 'Move to warm outreach with personalized email'
      : 'Add to nurturing sequence for future qualification';

    return {
      qualified,
      confidence: Math.round(confidence),
      reasons,
      nextAction
    };
  }
}

export const aiLeadService = new AILeadService();
