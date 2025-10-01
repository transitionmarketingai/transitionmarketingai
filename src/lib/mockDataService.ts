// Mock data service for dashboard (works without Supabase)

// Types
export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  source: string
  score: number
  notes?: string
  industry?: string
  created_at: string
  updated_at: string
}

export interface Content {
  id: string
  title: string
  type: 'blog' | 'social' | 'email' | 'ad' | 'landing'
  status: 'draft' | 'review' | 'published' | 'archived'
  performance: {
    views: number
    clicks: number
    conversions: number
    engagement: number
  }
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  name: string
  type: 'email' | 'social' | 'paid' | 'content'
  status: 'draft' | 'active' | 'paused' | 'completed'
  budget: number
  spent: number
  performance: {
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    cpc: number
    roas: number
  }
  created_at: string
  updated_at: string
}

export interface Analytics {
  totalLeads: number
  newLeads: number
  conversionRate: number
  revenue: number
  topSources: Array<{ source: string; count: number }>
  recentActivity: Array<{ type: string; description: string; timestamp: string }>
}

// In-memory storage (simulating database)
const STORAGE_KEY = 'dashboard_mock_data';

interface MockDataStore {
  leads: Lead[]
  content: Content[]
  campaigns: Campaign[]
}

// Initialize with sample data
const initialData: MockDataStore = {
  leads: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@techcorp.com',
      phone: '+91-9876543210',
      company: 'TechCorp India',
      status: 'qualified',
      source: 'LinkedIn',
      score: 85,
      notes: 'Interested in enterprise solution',
      industry: 'Technology',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@startup.io',
      phone: '+91-9876543211',
      company: 'Startup.io',
      status: 'contacted',
      source: 'Website',
      score: 72,
      notes: 'Follow up next week',
      industry: 'Technology',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      updated_at: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: '3',
      name: 'Priya Sharma',
      email: 'priya@digitalagency.com',
      phone: '+91-9876543212',
      company: 'Digital Agency',
      status: 'new',
      source: 'Email',
      score: 68,
      notes: 'Requested demo',
      industry: 'Marketing',
      created_at: new Date(Date.now() - 259200000).toISOString(),
      updated_at: new Date(Date.now() - 259200000).toISOString()
    }
  ],
  content: [
    {
      id: '1',
      title: 'AI Marketing Trends 2024',
      type: 'blog',
      status: 'published',
      performance: {
        views: 2847,
        clicks: 342,
        conversions: 28,
        engagement: 12.5
      },
      created_at: new Date(Date.now() - 432000000).toISOString(),
      updated_at: new Date(Date.now() - 432000000).toISOString()
    },
    {
      id: '2',
      title: 'Product Launch Announcement',
      type: 'email',
      status: 'published',
      performance: {
        views: 1523,
        clicks: 187,
        conversions: 15,
        engagement: 8.2
      },
      created_at: new Date(Date.now() - 518400000).toISOString(),
      updated_at: new Date(Date.now() - 518400000).toISOString()
    },
    {
      id: '3',
      title: 'Summer Campaign 2024',
      type: 'ad',
      status: 'review',
      performance: {
        views: 0,
        clicks: 0,
        conversions: 0,
        engagement: 0
      },
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  campaigns: [
    {
      id: '1',
      name: 'Q1 Product Launch',
      type: 'email',
      status: 'active',
      budget: 50000,
      spent: 32000,
      performance: {
        impressions: 45000,
        clicks: 2340,
        conversions: 156,
        ctr: 5.2,
        cpc: 13.68,
        roas: 3.2
      },
      created_at: new Date(Date.now() - 604800000).toISOString(),
      updated_at: new Date(Date.now() - 604800000).toISOString()
    },
    {
      id: '2',
      name: 'LinkedIn Outreach',
      type: 'social',
      status: 'active',
      budget: 30000,
      spent: 18500,
      performance: {
        impressions: 28000,
        clicks: 1680,
        conversions: 84,
        ctr: 6.0,
        cpc: 11.01,
        roas: 2.8
      },
      created_at: new Date(Date.now() - 1209600000).toISOString(),
      updated_at: new Date(Date.now() - 1209600000).toISOString()
    }
  ]
};

// Get data from localStorage or use initial data
function getData(): MockDataStore {
  if (typeof window === 'undefined') {
    return initialData;
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored data:', e);
    }
  }
  return initialData;
}

// Save data to localStorage
function saveData(data: MockDataStore): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Lead functions
export async function getLeads(): Promise<Lead[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const data = getData();
  return data.leads.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function addLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const data = getData();
    const now = new Date().toISOString();
    
    const newLead: Lead = {
      ...lead,
      id: generateId(),
      created_at: now,
      updated_at: now
    };
    
    data.leads.unshift(newLead);
    saveData(data);
    
    return newLead;
  } catch (error) {
    console.error('Error adding lead:', error);
    return null;
  }
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const data = getData();
    const leadIndex = data.leads.findIndex(l => l.id === id);
    
    if (leadIndex === -1) {
      return null;
    }
    
    data.leads[leadIndex] = {
      ...data.leads[leadIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    saveData(data);
    return data.leads[leadIndex];
  } catch (error) {
    console.error('Error updating lead:', error);
    return null;
  }
}

export async function deleteLead(id: string): Promise<boolean> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const data = getData();
    data.leads = data.leads.filter(l => l.id !== id);
    saveData(data);
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
}

// Content functions
export async function getContent(): Promise<Content[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const data = getData();
  return data.content.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function addContent(content: Omit<Content, 'id' | 'created_at' | 'updated_at'>): Promise<Content | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const data = getData();
    const now = new Date().toISOString();
    
    const newContent: Content = {
      ...content,
      id: generateId(),
      created_at: now,
      updated_at: now
    };
    
    data.content.unshift(newContent);
    saveData(data);
    
    return newContent;
  } catch (error) {
    console.error('Error adding content:', error);
    return null;
  }
}

export async function updateContent(id: string, updates: Partial<Content>): Promise<Content | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const data = getData();
    const contentIndex = data.content.findIndex(c => c.id === id);
    
    if (contentIndex === -1) {
      return null;
    }
    
    data.content[contentIndex] = {
      ...data.content[contentIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    saveData(data);
    return data.content[contentIndex];
  } catch (error) {
    console.error('Error updating content:', error);
    return null;
  }
}

// Campaign functions
export async function getCampaigns(): Promise<Campaign[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const data = getData();
  return data.campaigns.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function addCampaign(campaign: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>): Promise<Campaign | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const data = getData();
    const now = new Date().toISOString();
    
    const newCampaign: Campaign = {
      ...campaign,
      id: generateId(),
      created_at: now,
      updated_at: now
    };
    
    data.campaigns.unshift(newCampaign);
    saveData(data);
    
    return newCampaign;
  } catch (error) {
    console.error('Error adding campaign:', error);
    return null;
  }
}

// Analytics functions
export async function getAnalytics(): Promise<Analytics> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const data = getData();
  
  // Calculate analytics from stored data
  const totalLeads = data.leads.length;
  
  // Get new leads (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newLeads = data.leads.filter(
    lead => new Date(lead.created_at) >= sevenDaysAgo
  ).length;
  
  // Calculate conversion rate
  const convertedLeads = data.leads.filter(lead => lead.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  
  // Get top sources
  const sourceCounts = data.leads.reduce((acc: Record<string, number>, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});
  
  const topSources = Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Generate recent activity
  const recentActivity = [
    { 
      type: 'lead', 
      description: 'New lead added', 
      timestamp: new Date(Date.now() - 300000).toISOString() 
    },
    { 
      type: 'content', 
      description: 'Content published', 
      timestamp: new Date(Date.now() - 3600000).toISOString() 
    },
    { 
      type: 'campaign', 
      description: 'Campaign updated', 
      timestamp: new Date(Date.now() - 7200000).toISOString() 
    }
  ];
  
  return {
    totalLeads,
    newLeads,
    conversionRate: Math.round(conversionRate * 100) / 100,
    revenue: convertedLeads * 25000, // Mock revenue calculation
    topSources,
    recentActivity
  };
}

// Reset to initial data (for testing)
export function resetData(): void {
  saveData(initialData);
}

