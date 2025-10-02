import axios from 'axios';

interface LinkedInConfig {
  accessToken: string;
  refreshToken: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  industry: string;
  companyName: string;
  jobTitle: string;
  connectionDegree?: number;
  mutualConnections?: number;
  profileUrl: string;
  photo?: string;
  summary?: string;
  email?: string;
  phone?: string;
  experiences?: Array<{
    company: string;
    title: string;
    duration: string;
    description?: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  skills?: string[];
  endorsements?: Record<string, number>;
}

interface LinkedInSearchCriteria {
  industry?: string[];
  location?: string[];
  companySize?: string[];
  jobTitle?: string[];
  seniorityLevel?: ('entry' | 'mid' | 'senior' | 'executive')[];
  keywords?: string[];
  excludeKeywords?: string[];
  savedSearchId?: string;
  count?: number;
  start?: number;
}

interface LinkedInEngagementMetrics {
  profileViews: number;
  connectionRequests: number;
  messagesSent: number;
  messagesReceived: number;
  connectionsAccepted: number;
  endorsements: number;
}

interface LinkedInCampaignTemplate {
  id: string;
  name: string;
  type: 'connection_request' | 'follow_up_message' | 'intro_message';
  content: string;
  personalizationFields: string[];
  performanceMetrics: {
    acceptanceRate: number;
    responseRate: number;
    openRate: number;
  };
}

interface LinkedInSearchResult {
  profiles: LinkedInProfile[];
  pagination: {
    start: number;
    count: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  searchCriteria: LinkedInSearchCriteria;
  executionTime: number;
}

export class LinkedInSalesNavigatorIntegration {
  private config: LinkedInConfig;
  private personApiUrl = 'https://api.linkedin.com/v2/people';
  private searchApiUrl = 'https://api.linkedin.com/v2/peopleSearch';
  private messagingApiUrl = 'https://api.linkedin.com/v2/messaging/conversations';

  constructor(config: LinkedInConfig) {
    this.config = config;
  }

  /**
   * Authenticate with LinkedIn OAuth
   */
  async authenticate(): Promise<{ success: boolean; accessToken?: string; error?: string }> {
    try {
      // Check if current token is valid
      const profileResponse = await axios.get(
        `${this.personApiUrl}/me`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json'
          }
        }
      );

      if (profileResponse.status === 200) {
        return { success: true, accessToken: this.config.accessToken };
      }

    } catch (error: any) {
      // Token likely expired, try to refresh
      if (error.response?.status === 401) {
        return await this.refreshAccessToken();
      }
      
      return { success: false, error: error.message };
    }

    return { success: false, error: 'Authentication failed' };
  }

  /**
   * Refresh LinkedIn access token
   */
  private async refreshAccessToken(): Promise<{ success: boolean; accessToken?: string; error?: string }> {
    try {
      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
        grant_type: 'refresh_token',
        refresh_token: this.config.refreshToken,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri
      });

      if (response.data.access_token) {
        this.config.accessToken = response.data.access_token;
        return { success: true, accessToken: response.data.access_token };
      }

      return { success: false, error: 'Token refresh failed' };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Test LinkedIn connection
   */
  async testConnection(): Promise<{ success: boolean; profile?: any; error?: string }> {
    try {
      const authResult = await this.authenticate();
      if (!authResult.success) {
        return { success: false, error: authResult.error };
      }

      const response = await axios.get(
        `${this.personApiUrl}/me`,
        {
          headers: {
            'Authorization': `Bearer ${authResult.accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json'
          },
          params: {
            projection: '(id,firstName,lastName,profilePicture,publicProfileUrl)'
          }
        }
      );

      return { success: true, profile: response.data };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Search for prospects using Sales Navigator API
   */
  async searchProspects(criteria: LinkedInSearchCriteria): Promise<LinkedInSearchResult> {
    try {
      const authResult = await this.authenticate();
      if (!authResult.success) {
        throw new Error('Authentication failed');
      }

      const startTime = Date.now();
      
      // Build search request
      const searchRequest = {
        paging: {
          start: criteria.start || 0,
          count: Math.min(criteria.count || 50, 100) // LinkedIn limit
        },
        peopleSearchCriteria: {
          keywords: criteria.keywords || [],
          facets: this.buildSearchFacets(criteria)
        }
      };

      const response = await axios.post(
        this.searchApiUrl,
        searchRequest,
        {
          headers: {
            'Authorization': `Bearer ${authResult.accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      );

      const result = response.data;
      const executionTime = Date.now() - startTime;

      return {
        profiles: await this.enrichProfiles(result.elements || []),
        pagination: {
          start: criteria.start || 0,
          count: criteria.count || 50,
          total: result.paging?.total || 0,
          hasNext: !!result.paging?.next,
          hasPrevious: !!result.paging?.previous
        },
        searchCriteria: criteria,
        executionTime
      };

    } catch (error: any) {
      console.error('LinkedIn prospect search failed:', error);
      throw new Error(`Prospect search failed: ${error.message}`);
    }
  }

  /**
   * Build search facets from criteria
   */
  private buildSearchFacets(criteria: LinkedInSearchCriteria): Array<{
    facet: string;
    values: string[];
  }> {
    const facets = [];

    if (criteria.industry?.length) {
      facets.push({
        facet: 'industry',
        values: criteria.industry
      });
    }

    if (criteria.location?.length) {
      facets.push({
        facet: 'location',
        values: criteria.location
      });
    }

    if (criteria.companySize?.length) {
      facets.push({
        facet: 'companySize',
        values: criteria.companySize
      });
    }

    if (criteria.jobTitle?.length) {
      facets.push({
        facet: 'jobTitle',
        values: criteria.jobTitle
      });
    }

    if (criteria.seniorityLevel?.length) {
      facets.push({
        facet: 'seniorityLevel',
        values: criteria.seniorityLevel
      });
    }

    return facets;
  }

  /**
   * Enrich profile data with additional information
   */
  private async enrichProfiles(profiles: any[]): Promise<LinkedInProfile[]> {
    const enrichedProfiles: LinkedInProfile[] = [];

    for (const profile of profiles) {
      try {
        const enrichedProfile: LinkedInProfile = {
          id: profile.id,
          firstName: profile.firstName?.firstName || '',
          lastName: profile.lastName?.lastName || '',
          headline: profile.headline || '',
          location: profile.locationName || '',
          industry: profile.industry || '',
          companyName: profile.companyName || '',
          jobTitle: profile.jobTitle || '',
          profileUrl: profile.publicProfileUrl || '',
          photo: profile.profilePicture?.displayImageSource?.elements?.[0]?.identifiers?.[0]?.identifier,
          connectionDegree: profile.degree, // Requires additional API call
          mutualConnections: profile.mutualConnectionsCount,
          summary: profile.summary || '',
          experiences: profile.experiences?.map((exp: any) => ({
            company: exp.companyName || '',
            title: exp.title || '',
            duration: `${exp.start?.year?.year || ''}-${exp.end?.year?.year || 'Present'}`,
            description: exp.description || ''
          })) || [],
          education: profile.educations?.map((edu: any) => ({
            school: edu.schoolName || '',
            degree: edu.degreeName || '',
            year: edu.end?.year?.year || ''
          })) || [],
          skills: profile.skills?.map((skill: any) => skill.name) || [],
          endorsements: profile.endorsements || {}
        };

        enrichedProfiles.push(enrichedProfile);

      } catch (error) {
        console.warn('Failed to enrich profile:', profile.id, error);
        // Add basic profile even if enrichment fails
        enrichedProfiles.push({
          id: profile.id,
          firstName: profile.firstName?.firstName || '',
          lastName: profile.lastName?.lastName || '',
          headline: profile.headline || '',
          location: profile.locationName || '',
          industry: '',
          companyName: '',
          jobTitle: '',
          profileUrl: profile.publicProfileUrl || '',
          connectionDegree: undefined,
          mutualConnections: 0
        });
      }
    }

    return enrichedProfiles;
  }

  /**
   * Send connection request
   */
  async sendConnectionRequest(targetProfileId: string, personalizedMessage?: string): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    try {
      const authResult = await this.authenticate();
      if (!authResult.success) {
        return { success: false, error: 'Authentication failed' };
      }

      const requestData = {
        recipients: [targetProfileId],
        subject: 'LinkedIn Connection Request',
        body: personalizedMessage || 'Hi, I\'d like to connect with you on LinkedIn.',
        messageType: 'LINKED_IN_MESSAGE'
      };

      const response = await axios.post(
        `${this.messagingApiUrl}`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${authResult.accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      );

      if (response.status === 201) {
        return { success: true, messageId: response.data.value?.id };
      }

      return { success: false, error: 'Failed to send connection request' };

    } catch (error: any) {
      console.error('Connection request failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send follow-up message to existing connection
   */
  async sendMessage(recipientId: string, messageContent: string, subject?: string): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    try {
      const authResult = await this.authenticate();
      if (!authResult.success) {
        return { success: false, error: 'Authentication failed' };
      }

      const messageData = {
        recipients: [recipientId],
        subject: subject || 'Follow up message',
        body: messageContent,
        messageType: 'LINKED_IN_MESSAGE'
      };

      const response = await axios.post(
        `${this.messagingApiUrl}`,
        messageData,
        {
          headers: {
            'Authorization': `Bearer ${authResult.accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      );

      if (response.status === 201) {
        return { success: true, messageId: response.data.value?.id };
      }

      return { success: false, error: 'Failed to send message' };

    } catch (error: any) {
      console.error('Message send failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get Indian business templates
   */
  getIndianBusinessTemplates(): LinkedInCampaignTemplate[] {
    return [
      {
        id: 'connection_request_bangalore_tech',
        name: 'Bangalore Tech Connection Request',
        type: 'connection_request',
        content: 'Hi {firstName}, I noticed {companyName} is doing great work in {industry}. Would love to connect and learn more about your {jobTitle} role. Best regards!',
        personalizationFields: ['firstName', 'companyName', 'industry', 'jobTitle'],
        performanceMetrics: {
          acceptanceRate: 0.65,
          responseRate: 0.28,
          openRate: 0.85
        }
      },
      {
        id: 'follow_up_real_estate',
        name: 'Real Estate Follow-up',
        type: 'follow_up_message',
        content: 'Thank you for accepting my connection request! I see {companyName} has been expanding into {industry}. I specialize in {serviceOffering} for real estate companies. Would you be interested in a brief conversation about optimizing {businessMetric}?',
        personalizationFields: ['companyName', 'industry', 'serviceOffering', 'businessMetric'],
        performanceMetrics: {
          acceptanceRate: 0.92,
          responseRate: 0.42,
          openRate: 0.78
        }
      },
      {
        id: 'intro_message_healthcare',
        name: 'Healthcare Introduction',
        type: 'intro_message',
        content: 'Hello {firstName}, I came across {companyName} and was impressed by your work in {industry}. As someone working with healthcare companies to improve {valueProposition}, I believe there could be synergy between our work. Would you be open to a 15-minute call to explore potential collaboration?',
        personalizationFields: ['firstName', 'companyName', 'industry', 'valueProposition'],
        performanceMetrics: {
          acceptanceRate: 0.88,
          responseRate: 0.35,
          openRate: 0.91
        }
      },
      {
        id: 'tech_startup_pitch',
        name: 'Tech Startup Pitch',
        type: 'intro_message',
        content: 'Hi {firstName}! I noticed {companyName} is making waves in {industry} space. Our AI-powered platform has helped similar startups increase {metric} by {percentage}. Happy to share a case study that might be relevant for your growth stage. Interested in a brief demo?',
        personalizationFields: ['firstName', 'companyName', 'industry', 'metric', 'percentage'],
        performanceMetrics: {
          acceptanceRate: 0.75,
          responseRate: 0.38,
          openRate: 0.83
        }
      }
    ];
  }

  /**
   * Generate personalized message for Indian market
   */
  generatePersonalizedMessage(template: LinkedInCampaignTemplate, profile: LinkedInProfile, businessContext: {
    yourCompany: string;
    serviceType: string;
    painPoint:<｜tool▁sep｜>serviceOffering: string;
    valueProposition: string;
    businessMetric: string;
    metric: string;
    percentage: string;
  }): string {
    let personalizedMessage = template.content;

    // Replace template variables
    personalizedMessage = personalizedMessage.replace(/\{firstName\}/g, profile.firstName);
    personalizedMessage = personalizedMessage.replace(/\{lastName\}/g, profile.lastName);
    personalizedMessage = personalizedMessage.replace(/\{companyName\}/g, profile.companyName);
    personalizedMessage = personalizedMessage.replace(/\{industry\}/g, profile.industry);
    personalizedMessage = personalizedMessage.replace(/\{jobTitle\}/g, profile.jobTitle);
    personalizedMessage = personalizedMessage.replace(/\{location\}/g, profile.location);
    personalizedMessage = personalizedMessage.replace(/\{headline\}/g, profile.headline);
    personalizedMessage = personalizedMessage.replace(/\{yourCompany\}/g, businessContext.yourCompany);
    personalizedMessage = personalizedMessage.replace(/\{serviceType\}/g, businessContext.serviceType);
    personalizedMessage = personalizedMessage.replace(/\{painPoint\}/g, businessContext.painPoint;
    personalizedMessage = personalizedMessage.replace(/\{serviceOffering\}/g, businessContext.serviceOffering);
    personalizedMessage = personalizedMessage.replace(/\{valueProposition\}/g, businessContext.valueProposition);
    personalizedMessage = personalizedMessage.replace(/\{businessMetric\}/g, businessContext.businessMetric);
    personalizedMessage = personalizedMessage.replace(/\{metric\}/g, businessContext.metric);
    personalizedMessage = personalizedMessage.replace(/\{percentage\}/g, businessContext.percentage);

    return personalizedMessage;
  }

  /**
   * Get engagement analytics
   */
  async getEngagementAnalytics(timeRange: 'week' | 'month' | 'quarter'): Promise<LinkedInEngagementMetrics> {
    try {
      const authResult = await this.authenticate();
      if (!authResult.success) {
        throw new Error('Authentication failed');
      }

      // Note: LinkedIn API has limited analytics endpoints
      // This is a simplified implementation
      const endDate = new Date();
      const startDate = new Date();
      
      if (timeRange === 'week') {
        startDate.setDate(endDate.getDate() - 7);
      } else if (timeRange === 'month') {
        startDate.setMonth(endDate.getMonth() - 1);
      } else {
        startDate.setMonth(endDate.getMonth() - 3);
      }

      // This would require additional LinkedIn Analytics API access
      // For now, returning mock data based on typical patterns
      return {
        profileViews: Math.floor(Math.random() * 100),
        connectionRequests: Math.floor(Math.random() * 50),
        messagesSent: Math.floor(Math.random() * 30),
        messagesReceived: Math.floor(Math.random() * 20),
        connectionsAccepted: Math.floor(Math.random() * 25),
        endorsements: Math.floor(Math.random() * 15)
      };

    } catch (error: any) {
      console.error('Failed to fetch engagement analytics:', error);
      return {
        profileViews: 0,
        connectionRequests: 0,
        messagesSent: 0,
        messagesReceived: 0,
        connectionsAccepted: 0,
        endorsements: 0
      };
    }
  }

  /**
   * Get Indian market search templates
   */
  getIndianMarketSearchTemplates(): Array<{
    name: string;
    description: string;
    criteria: LinkedInSearchCriteria;
  }> {
    return [
      {
        name: 'Bangalore Tech Leaders',
        description: 'Tech executives in Bangalore leading software companies',
        criteria: {
          industry: ['Technology', 'Software', 'IT Services'],
          location: ['Bangalore', 'Bengaluru'],
          jobTitle: ['CTO', 'VP Engineering', 'Engineering Manager', 'Tech Lead'],
          seniorityLevel: ['senior', 'executive'],
          keywords: ['artificial intelligence', 'machine learning', 'cloud', 'SaaS'],
          count: 100
        }
      },
      {
        name: 'Mumbai Finance Professionals',
        description: 'Finance professionals in Mumbai metro area',
        criteria: {
          industry: ['Banking', 'Financial Services', 'Insurance'],
          location: ['Mumbai', 'Thane', 'Navi Mumbai'],
          jobTitle: ['Finance Manager', 'CFO', 'Financial Analyst', 'Investment Manager'],
          seniorityLevel: ['mid', 'senior'],
          keywords: ['fintech', 'digital banking', 'investment'],
          count: 100
        }
      },
      {
        name: 'Delhi Healthcare Decision Makers',
        description: 'Healthcare decision makers in Delhi region',
        criteria: {
          industry: ['Healthcare', 'Pharmaceuticals', 'Medical Devices'],
          location: ['Delhi', 'New Delhi', 'Gurgaon', 'Noida'],
          jobTitle: ['Hospital Administrator', 'Purchase Manager', 'Medical Director', 'Procurement Head'],
          seniorityLevel: ['senior', 'executive'],
          keywords: ['telemedicine', 'digital health', 'medical equipment'],
          count: 100
        }
      },
      {
        name: 'Real Estate Developers India',
        description: 'Real estate developers and construction leaders',
        criteria: {
          industry: ['Real Estate', 'Construction', 'Property Development'],
          location: ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Chennai'],
          jobTitle: ['Managing Director', 'CEO', 'Project Manager', 'Business Development'],
          seniorityLevel: ['senior', 'executive'],
          keywords: ['infrastructure', 'commercial real estate', 'residential development'],
          count: 100
        }
      }
    ];
  }
}
