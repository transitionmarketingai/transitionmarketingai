// Data Service for Real-time Dashboard Functionality
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: 'LinkedIn' | 'Email' | 'Website' | 'Referral' | 'Cold Call';
  score: number;
  lastContact: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  title: string;
  type: 'Blog' | 'Social' | 'Email' | 'Video' | 'Resource';
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  views: number;
  engagement: number;
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'LinkedIn' | 'Content' | 'Webinar' | 'Social';
  status: 'active' | 'paused' | 'completed' | 'draft';
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export interface Analytics {
  leads: {
    total: number;
    new: number;
    qualified: number;
    converted: number;
    conversionRate: number;
  };
  content: {
    total: number;
    published: number;
    scheduled: number;
    totalViews: number;
    avgEngagement: number;
  };
  revenue: {
    current: number;
    target: number;
    growth: number;
  };
  performance: {
    responseTime: number;
    costPerLead: number;
    roi: number;
  };
}

// Mock Data Generator
class DataService {
  private leads: Lead[] = [];
  private content: Content[] = [];
  private campaigns: Campaign[] = [];
  private analytics: Analytics;

  constructor() {
    this.generateMockData();
    this.analytics = this.calculateAnalytics();
  }

  private generateMockData() {
    // Generate Leads
    const leadNames = [
      'Sarah Johnson', 'Mike Chen', 'Lisa Wang', 'David Kumar', 'Priya Sharma',
      'Alex Rodriguez', 'Emma Thompson', 'Raj Patel', 'Jennifer Lee', 'Tom Wilson'
    ];
    const companies = [
      'TechCorp', 'InnovateLabs', 'Digital Solutions', 'Future Systems', 'SmartTech',
      'CloudBase', 'DataFlow', 'NextGen', 'ProActive', 'Elite Services'
    ];
    const sources: Lead['source'][] = ['LinkedIn', 'Email', 'Website', 'Referral', 'Cold Call'];
    const statuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'converted', 'lost'];

    for (let i = 0; i < 50; i++) {
      const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      this.leads.push({
        id: `lead-${i + 1}`,
        name: leadNames[Math.floor(Math.random() * leadNames.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        email: `lead${i + 1}@example.com`,
        phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        score: Math.floor(Math.random() * 100) + 1,
        lastContact: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        notes: `Lead from ${sources[Math.floor(Math.random() * sources.length)]} campaign`,
        createdAt: createdAt.toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    // Generate Content
    const contentTitles = [
      'AI Marketing Trends 2024', 'Lead Generation Best Practices', 'Content Strategy Guide',
      'Email Marketing Automation', 'Social Media Optimization', 'SEO Fundamentals',
      'Customer Journey Mapping', 'Marketing Analytics', 'Brand Building', 'Growth Hacking'
    ];
    const contentTypes: Content['type'][] = ['Blog', 'Social', 'Email', 'Video', 'Resource'];
    const contentStatuses: Content['status'][] = ['draft', 'scheduled', 'published', 'archived'];

    for (let i = 0; i < 30; i++) {
      const createdAt = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);
      const isPublished = Math.random() > 0.3;
      this.content.push({
        id: `content-${i + 1}`,
        title: contentTitles[Math.floor(Math.random() * contentTitles.length)],
        type: contentTypes[Math.floor(Math.random() * contentTypes.length)],
        status: contentStatuses[Math.floor(Math.random() * contentStatuses.length)],
        views: isPublished ? Math.floor(Math.random() * 5000) + 100 : 0,
        engagement: isPublished ? Math.random() * 20 + 5 : 0,
        publishedAt: isPublished ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        scheduledAt: !isPublished ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        createdAt: createdAt.toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    // Generate Campaigns
    const campaignNames = [
      'Q4 Email Campaign', 'LinkedIn Outreach', 'Content Marketing', 'Webinar Series',
      'Social Media Push', 'Newsletter Campaign', 'Product Launch', 'Customer Retention'
    ];
    const campaignTypes: Campaign['type'][] = ['Email', 'LinkedIn', 'Content', 'Webinar', 'Social'];
    const campaignStatuses: Campaign['status'][] = ['active', 'paused', 'completed', 'draft'];

    for (let i = 0; i < 15; i++) {
      const startDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
      const isCompleted = Math.random() > 0.6;
      this.campaigns.push({
        id: `campaign-${i + 1}`,
        name: campaignNames[Math.floor(Math.random() * campaignNames.length)],
        type: campaignTypes[Math.floor(Math.random() * campaignTypes.length)],
        status: campaignStatuses[Math.floor(Math.random() * campaignStatuses.length)],
        sent: Math.floor(Math.random() * 5000) + 100,
        opened: Math.floor(Math.random() * 1000) + 50,
        clicked: Math.floor(Math.random() * 200) + 10,
        converted: Math.floor(Math.random() * 50) + 1,
        startDate: startDate.toISOString(),
        endDate: isCompleted ? new Date(startDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        createdAt: startDate.toISOString()
      });
    }
  }

  private calculateAnalytics(): Analytics {
    const totalLeads = this.leads.length;
    const newLeads = this.leads.filter(l => l.status === 'new').length;
    const qualifiedLeads = this.leads.filter(l => l.status === 'qualified').length;
    const convertedLeads = this.leads.filter(l => l.status === 'converted').length;
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

    const totalContent = this.content.length;
    const publishedContent = this.content.filter(c => c.status === 'published').length;
    const scheduledContent = this.content.filter(c => c.status === 'scheduled').length;
    const totalViews = this.content.reduce((sum, c) => sum + c.views, 0);
    const avgEngagement = this.content.length > 0 ? this.content.reduce((sum, c) => sum + c.engagement, 0) / this.content.length : 0;

    const currentRevenue = convertedLeads * 25000; // Assuming ₹25k per conversion
    const targetRevenue = 500000; // ₹5L target
    const growth = ((currentRevenue - 300000) / 300000) * 100; // Assuming previous month was ₹3L

    const responseTime = 2.3; // hours
    const costPerLead = 45; // ₹45 per lead
    const roi = 340; // 340% ROI

    return {
      leads: {
        total: totalLeads,
        new: newLeads,
        qualified: qualifiedLeads,
        converted: convertedLeads,
        conversionRate
      },
      content: {
        total: totalContent,
        published: publishedContent,
        scheduled: scheduledContent,
        totalViews,
        avgEngagement
      },
      revenue: {
        current: currentRevenue,
        target: targetRevenue,
        growth
      },
      performance: {
        responseTime,
        costPerLead,
        roi
      }
    };
  }

  // Public Methods
  async getLeads(filters?: { status?: string; source?: string; search?: string }): Promise<Lead[]> {
    let filteredLeads = [...this.leads];

    if (filters?.status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === filters.status);
    }

    if (filters?.source) {
      filteredLeads = filteredLeads.filter(lead => lead.source === filters.source);
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredLeads = filteredLeads.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.company.toLowerCase().includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm)
      );
    }

    return filteredLeads.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async getContent(filters?: { type?: string; status?: string; search?: string }): Promise<Content[]> {
    let filteredContent = [...this.content];

    if (filters?.type) {
      filteredContent = filteredContent.filter(content => content.type === filters.type);
    }

    if (filters?.status) {
      filteredContent = filteredContent.filter(content => content.status === filters.status);
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredContent = filteredContent.filter(content => 
        content.title.toLowerCase().includes(searchTerm)
      );
    }

    return filteredContent.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async getCampaigns(): Promise<Campaign[]> {
    return [...this.campaigns].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAnalytics(): Promise<Analytics> {
    return { ...this.analytics };
  }

  async addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.leads.unshift(newLead);
    this.analytics = this.calculateAnalytics();
    return newLead;
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
    const index = this.leads.findIndex(lead => lead.id === id);
    if (index === -1) return null;

    this.leads[index] = {
      ...this.leads[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.analytics = this.calculateAnalytics();
    return this.leads[index];
  }

  async deleteLead(id: string): Promise<boolean> {
    const index = this.leads.findIndex(lead => lead.id === id);
    if (index === -1) return false;

    this.leads.splice(index, 1);
    this.analytics = this.calculateAnalytics();
    return true;
  }

  async addContent(content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>): Promise<Content> {
    const newContent: Content = {
      ...content,
      id: `content-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.content.unshift(newContent);
    this.analytics = this.calculateAnalytics();
    return newContent;
  }

  async updateContent(id: string, updates: Partial<Content>): Promise<Content | null> {
    const index = this.content.findIndex(content => content.id === id);
    if (index === -1) return null;

    this.content[index] = {
      ...this.content[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.analytics = this.calculateAnalytics();
    return this.content[index];
  }

  async deleteContent(id: string): Promise<boolean> {
    const index = this.content.findIndex(content => content.id === id);
    if (index === -1) return false;

    this.content.splice(index, 1);
    this.analytics = this.calculateAnalytics();
    return true;
  }

  // Real-time simulation
  startRealTimeUpdates(callback: (data: { leads: Lead[]; content: Content[]; analytics: Analytics }) => void) {
    const interval = setInterval(() => {
      // Simulate real-time updates
      if (Math.random() > 0.7) {
        // Add new lead
        const newLead = this.generateRandomLead();
        this.leads.unshift(newLead);
      }

      if (Math.random() > 0.8) {
        // Update existing lead
        const randomIndex = Math.floor(Math.random() * this.leads.length);
        if (this.leads[randomIndex]) {
          this.leads[randomIndex].updatedAt = new Date().toISOString();
        }
      }

      this.analytics = this.calculateAnalytics();
      callback({
        leads: this.leads.slice(0, 10), // Return latest 10
        content: this.content.slice(0, 10), // Return latest 10
        analytics: this.analytics
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }

  private generateRandomLead(): Lead {
    const names = ['New Lead', 'Prospect', 'Potential Customer'];
    const companies = ['New Company', 'Startup Inc', 'Growing Business'];
    const sources: Lead['source'][] = ['LinkedIn', 'Email', 'Website', 'Referral'];
    
    return {
      id: `lead-${Date.now()}`,
      name: names[Math.floor(Math.random() * names.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      email: `newlead${Date.now()}@example.com`,
      status: 'new',
      source: sources[Math.floor(Math.random() * sources.length)],
      score: Math.floor(Math.random() * 100) + 1,
      lastContact: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const dataService = new DataService();


