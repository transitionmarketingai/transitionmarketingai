export interface CampaignTemplate {
  id: string;
  name: string;
  platform: 'facebook' | 'instagram' | 'google';
  industry: string;
  objective: string;
  description: string;
  targetAudience: {
    age: string;
    location: string;
    interests: string[];
  };
  budget: {
    daily: number;
    recommended: number;
  };
  adCreative: {
    headline: string;
    primaryText: string;
    callToAction: string;
  };
  leadFormQuestions: string[];
}

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  // Facebook Templates
  {
    id: 'fb-b2b-software',
    name: 'B2B Software Lead Generation',
    platform: 'facebook',
    industry: 'Software/SaaS',
    objective: 'Lead Generation',
    description: 'Target business decision-makers looking for software solutions',
    targetAudience: {
      age: '25-55',
      location: 'Mumbai, Delhi, Bangalore, Pune',
      interests: ['Business Software', 'SaaS', 'Enterprise Solutions', 'Productivity Tools'],
    },
    budget: {
      daily: 500,
      recommended: 15000,
    },
    adCreative: {
      headline: 'Transform Your Business with AI-Powered Solutions',
      primaryText: 'Get a free demo and see how our platform can help you scale faster. Trusted by 500+ businesses across India.',
      callToAction: 'Get Free Demo',
    },
    leadFormQuestions: [
      'Full Name',
      'Company Name',
      'Work Email',
      'Phone Number',
      'Company Size',
      'Current Challenges',
    ],
  },
  {
    id: 'fb-ecommerce',
    name: 'E-commerce Business Leads',
    platform: 'facebook',
    industry: 'E-commerce',
    objective: 'Lead Generation',
    description: 'Target online retailers and D2C brands',
    targetAudience: {
      age: '25-45',
      location: 'Pan India',
      interests: ['E-commerce', 'Online Shopping', 'Digital Marketing', 'Shopify'],
    },
    budget: {
      daily: 400,
      recommended: 12000,
    },
    adCreative: {
      headline: 'Grow Your E-commerce Sales by 10x',
      primaryText: 'Discover proven strategies used by top D2C brands. Get a free consultation today.',
      callToAction: 'Get Free Consultation',
    },
    leadFormQuestions: [
      'Full Name',
      'Business Name',
      'Email',
      'Phone',
      'Monthly Revenue',
      'Platform Used (Shopify, Amazon, etc.)',
    ],
  },
  {
    id: 'fb-marketing-agency',
    name: 'Marketing Agency Leads',
    platform: 'facebook',
    industry: 'Marketing',
    objective: 'Lead Generation',
    description: 'Target digital marketing agencies and consultants',
    targetAudience: {
      age: '25-50',
      location: 'Mumbai, Delhi, Bangalore, Hyderabad',
      interests: ['Digital Marketing', 'SEO', 'Social Media Marketing', 'Content Marketing'],
    },
    budget: {
      daily: 350,
      recommended: 10000,
    },
    adCreative: {
      headline: 'Scale Your Agency with Automation',
      primaryText: 'Automate your lead generation and focus on growing your clients. Book a free strategy call.',
      callToAction: 'Book Free Call',
    },
    leadFormQuestions: [
      'Full Name',
      'Agency Name',
      'Email',
      'Phone',
      'Team Size',
      'Services Offered',
    ],
  },

  // Instagram Templates
  {
    id: 'ig-lifestyle',
    name: 'Lifestyle & Wellness Leads',
    platform: 'instagram',
    industry: 'Lifestyle',
    objective: 'Lead Generation',
    description: 'Target health-conscious Instagram users',
    targetAudience: {
      age: '20-40',
      location: 'Tier 1 & 2 Cities',
      interests: ['Fitness', 'Wellness', 'Healthy Living', 'Yoga'],
    },
    budget: {
      daily: 300,
      recommended: 9000,
    },
    adCreative: {
      headline: 'Transform Your Health in 30 Days',
      primaryText: 'Join thousands who achieved their wellness goals. Get your free personalized plan today!',
      callToAction: 'Get Free Plan',
    },
    leadFormQuestions: [
      'Full Name',
      'Email',
      'Phone',
      'Age',
      'Current Goal',
      'Preferred Contact Method',
    ],
  },

  // Google Templates
  {
    id: 'google-local-services',
    name: 'Local Services Campaign',
    platform: 'google',
    industry: 'Local Services',
    objective: 'Lead Generation',
    description: 'Capture high-intent searches for local services',
    targetAudience: {
      age: '25-65',
      location: 'Specific city/region',
      interests: ['Local Services', 'Home Services', 'Professional Services'],
    },
    budget: {
      daily: 400,
      recommended: 12000,
    },
    adCreative: {
      headline: 'Professional [Service] Near You',
      primaryText: 'Trusted by 1000+ customers. Fast response. Book your free consultation now.',
      callToAction: 'Get Free Quote',
    },
    leadFormQuestions: [
      'Full Name',
      'Email',
      'Phone',
      'Service Needed',
      'Preferred Date',
      'Location',
    ],
  },
  {
    id: 'google-b2b',
    name: 'B2B Solution Seeker',
    platform: 'google',
    industry: 'B2B',
    objective: 'Lead Generation',
    description: 'Target businesses actively searching for solutions',
    targetAudience: {
      age: '25-60',
      location: 'Pan India',
      interests: ['Business Solutions', 'Enterprise Software', 'B2B Services'],
    },
    budget: {
      daily: 600,
      recommended: 18000,
    },
    adCreative: {
      headline: 'Enterprise Solution That Scales',
      primaryText: 'Trusted by Fortune 500 companies. See how we can help your business grow.',
      callToAction: 'Request Demo',
    },
    leadFormQuestions: [
      'Full Name',
      'Company Name',
      'Business Email',
      'Phone',
      'Company Size',
      'Industry',
    ],
  },
];

export function getTemplatesByPlatform(platform: string) {
  return CAMPAIGN_TEMPLATES.filter(t => t.platform === platform);
}

export function getTemplatesByIndustry(industry: string) {
  return CAMPAIGN_TEMPLATES.filter(t => 
    t.industry.toLowerCase().includes(industry.toLowerCase())
  );
}

export function getTemplateById(id: string) {
  return CAMPAIGN_TEMPLATES.find(t => t.id === id);
}

