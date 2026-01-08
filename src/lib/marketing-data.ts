// Marketing Data Models and Mock Data
export interface Campaign {
  id: string;
  name: string;
  type: 'content' | 'ads' | 'email' | 'seo' | 'social';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget?: number;
  startDate: string;
  endDate?: string;
  metrics: CampaignMetrics;
  settings: CampaignSettings;
}

export interface CampaignMetrics {
  impressions?: number;
  clicks?: number;
  conversions?: number;
  cost?: number;
  revenue?: number;
  ctr?: number;
  cpc?: number;
  roas?: number;
  conversionRate?: number;
  openRate?: number;
  clickRate?: number;
  engagement?: number;
  reach?: number;
  followers?: number;
  rankings?: number;
  traffic?: number;
}

export interface CampaignSettings {
  targetAudience: string[];
  keywords?: string[];
  platforms: string[];
  budget?: number;
  schedule?: string;
  automation?: boolean;
}

export interface Content {
  id: string;
  title: string;
  type: 'blog' | 'social' | 'email' | 'ad' | 'landing';
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  content: string;
  seoScore?: number;
  engagement?: number;
  publishDate?: string;
  tags: string[];
  platform: string;
}

export interface Audience {
  id: string;
  name: string;
  size: number;
  demographics: {
    age: string;
    gender: string;
    location: string;
    interests: string[];
  };
  behavior: {
    engagement: number;
    conversion: number;
    lifetimeValue: number;
  };
}

export interface Keyword {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  position?: number;
  trend: 'up' | 'down' | 'stable';
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'newsletter' | 'promotional' | 'nurture';
  openRate: number;
  clickRate: number;
  unsubRate: number;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused' | 'draft';
  subscribers: number;
  conversionRate: number;
}

// Mock Data
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q4 Product Launch',
    type: 'ads',
    status: 'active',
    budget: 5000,
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    metrics: {
      impressions: 125000,
      clicks: 3750,
      conversions: 187,
      cost: 3750,
      revenue: 18700,
      ctr: 3.0,
      cpc: 1.0,
      roas: 4.99
    },
    settings: {
      targetAudience: ['tech professionals', 'small business owners'],
      keywords: ['AI marketing', 'automation tools'],
      platforms: ['google', 'facebook', 'linkedin'],
      budget: 5000,
      automation: true
    }
  },
  {
    id: '2',
    name: 'Weekly Newsletter',
    type: 'email',
    status: 'active',
    startDate: '2024-01-01',
    metrics: {
      openRate: 89.2,
      clickRate: 12.4,
      conversions: 45,
      revenue: 2250
    },
    settings: {
      targetAudience: ['subscribers', 'customers'],
      platforms: ['mailchimp'],
      schedule: 'weekly',
      automation: true
    }
  },
  {
    id: '3',
    name: 'SEO Content Strategy',
    type: 'seo',
    status: 'active',
    startDate: '2024-01-01',
    metrics: {
      rankings: 156,
      traffic: 45200,
      conversions: 234,
      revenue: 11700
    },
    settings: {
      targetAudience: ['organic search users'],
      keywords: ['marketing automation', 'AI tools', 'digital marketing'],
      platforms: ['google'],
      automation: true
    }
  }
];

export const mockContent: Content[] = [
  {
    id: '1',
    title: '5 Ways AI is Revolutionizing Digital Marketing',
    type: 'blog',
    status: 'published',
    content: 'Artificial Intelligence is transforming how businesses approach digital marketing...',
    seoScore: 92,
    engagement: 89.2,
    publishDate: '2024-12-15',
    tags: ['AI', 'marketing', 'automation'],
    platform: 'website'
  },
  {
    id: '2',
    title: 'Holiday Sale - 50% Off All Plans',
    type: 'email',
    status: 'published',
    content: 'Don\'t miss our biggest sale of the year...',
    engagement: 78.5,
    publishDate: '2024-12-20',
    tags: ['sale', 'holiday', 'promotion'],
    platform: 'email'
  }
];

export const mockAudiences: Audience[] = [
  {
    id: '1',
    name: 'Tech Professionals',
    size: 15420,
    demographics: {
      age: '25-45',
      gender: 'mixed',
      location: 'US, UK, Canada',
      interests: ['technology', 'AI', 'automation']
    },
    behavior: {
      engagement: 89.2,
      conversion: 12.4,
      lifetimeValue: 1250
    }
  },
  {
    id: '2',
    name: 'Small Business Owners',
    size: 8930,
    demographics: {
      age: '30-55',
      gender: 'mixed',
      location: 'North America',
      interests: ['business growth', 'marketing', 'efficiency']
    },
    behavior: {
      engagement: 76.8,
      conversion: 8.9,
      lifetimeValue: 890
    }
  }
];

export const mockKeywords: Keyword[] = [
  {
    keyword: 'AI marketing automation',
    volume: 12000,
    difficulty: 65,
    cpc: 2.50,
    position: 3,
    trend: 'up'
  },
  {
    keyword: 'digital marketing tools',
    volume: 8500,
    difficulty: 58,
    cpc: 1.80,
    position: 7,
    trend: 'stable'
  },
  {
    keyword: 'marketing automation software',
    volume: 6200,
    difficulty: 72,
    cpc: 3.20,
    position: 5,
    trend: 'up'
  }
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Series - Day 1',
    subject: 'Welcome to TransitionMarketingAI!',
    content: 'Thank you for joining us...',
    type: 'welcome',
    openRate: 94.2,
    clickRate: 18.7,
    unsubRate: 0.3
  },
  {
    id: '2',
    name: 'Weekly Newsletter',
    subject: 'This Week in Marketing: AI Trends & Tips',
    content: 'Here are the latest marketing insights...',
    type: 'newsletter',
    openRate: 89.2,
    clickRate: 12.4,
    unsubRate: 0.8
  }
];

export const mockAutomationWorkflows: AutomationWorkflow[] = [
  {
    id: '1',
    name: 'Welcome Series',
    trigger: 'new_subscriber',
    actions: ['send_welcome_email', 'add_to_segment', 'schedule_follow_up'],
    status: 'active',
    subscribers: 15420,
    conversionRate: 12.4
  },
  {
    id: '2',
    name: 'Abandoned Cart Recovery',
    trigger: 'cart_abandoned',
    actions: ['send_reminder_email', 'offer_discount', 'schedule_final_email'],
    status: 'active',
    subscribers: 8930,
    conversionRate: 18.7
  }
];

// Utility Functions
export const calculateROI = (revenue: number, cost: number): number => {
  return cost > 0 ? ((revenue - cost) / cost) * 100 : 0;
};

export const calculateROAS = (revenue: number, cost: number): number => {
  return cost > 0 ? revenue / cost : 0;
};

export const getPerformanceGrade = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'D';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up': return '↗️';
    case 'down': return '↘️';
    case 'stable': return '→';
    default: return '→';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active': return 'green';
    case 'paused': return 'yellow';
    case 'completed': return 'blue';
    case 'draft': return 'gray';
    default: return 'gray';
  }
};
