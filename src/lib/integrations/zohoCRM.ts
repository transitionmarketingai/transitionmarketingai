import axios from 'axios';

interface ZohoConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  dataCenter: 'US' | 'AU' | 'EU' | 'IN'; // Zoho data centers
  apiDomain?: string;
}

interface ZohoContact {
  id?: string;
  First_Name?: string;
  Last_Name?: string;
  Email?: string;
  Phone?: string;
  Company?: string;
  Designation?: string;
  City?: string;
  State?: string;
  Country?: string;
  Lead_Source?: string;
  Lead_Status?: string;
  Rating?: string;
  Industry?: string;
  Created_Time?: Date;
  Modified_Time?: Date;
  Owner?: {
    name: string;
    id: string;
  };
}

interface ZohoLead {
  id?: string;
  First_Name?: string;
  Last_Name?: string;
  Email?: string;
  Phone?: string;
  Company?: string;
  Designation?: string;
  City?: string;
  State?: string;
  Country?: string;
  Lead_Source?: string;
  Lead_Status?: string;
  Rating?: string;
  Industry?: string;
  Annual_Revenue?: number;
  No_of_Employees?: string;
  Created_Time?: Date;
  Modified_Time?: Date;
  Owner?: {
    name: string;
    id: string;
  };
}

interface ZohoDeal {
  id?: string;
  Deal_Name?: string;
  Stage?: string;
  Closing_Date?: string;
  Amount?: number;
  Expected_Revenue?: number;
  Probability?: number;
  Next_Step?: string;
  Lead_Source?: string;
  Campaign_Source?: string;
  Deal_Type?: string;
  Description?: string;
  Owner?: {
    name: string;
    id: string;
  };
}

interface ZohoCustomModule {
  module: string;
  apiName: string;
  data: Array<Record<string, any>>;
}

interface ZohoIndianBusinessData {
  companyType: 'Private Limited' | 'Public Limited' | 'Partnership' | 'LLP' | 'Sole Proprietorship';
  panNumber?: string;
  gstNumber?: string;
  industryCategory: 'Manufacturing' | 'Services' | 'IT/Software' | 'Healthcare' | 'Education' | 'Finance' | 'Real Estate' | 'Retail';
  businessNature: 'B2B' | 'B2C' | 'B2G';
  employeeStrength: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  annualTurnover: '0-1Cr' | '1-10Cr' | '10-50Cr' | '50Cr+';
  geographicalPresence: string[];
  primaryMarkets: string[];
  fundingStage: 'Bootstrap' | 'Angel' | 'Seed' | 'Series A' | 'Series B+' | 'Public';
}

export class ZohoCRMIntegration {
  private config: ZohoConfig;
  private accessToken: string;
  private tokenExpiry: number;

  constructor(config: ZohoConfig) {
    this.config = config;
    this.accessToken = '';
    this.tokenExpiry = 0;
    
    // Set API domain based on data center
    const domainMap = {
      'US': 'zohoapis.com',
      'AU': 'zohocloudapi.com.au', 
      'EU': 'zohoapis.eu',
      'IN': 'zohocloudapi.in'
    };
    
    this.config.apiDomain = config.apiDomain || domainMap[config.dataCenter];
  }

  /**
   * Authenticate with Zoho CRM
   */
  async authenticate(): Promise<{ success: boolean; error?: string }> {
    try {
      const tokenResponse = await axios.post(
        `https://accounts.zoho.${this.config.apiDomain}/oauth/v2/token`,
        {
          refresh_token: this.config.refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          grant_type: 'refresh_token'
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (tokenResponse.data.access_token) {
        this.accessToken = tokenResponse.data.access_token;
        this.tokenExpiry = Date.now() + (tokenResponse.data.expires_in * 1000);
        return { success: true };
      }

      return { success: false, error: 'Failed to obtain access token' };

    } catch (error: any) {
      console.error('Zoho authentication failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.error_description || error.message 
      };
    }
  }

  /**
   * Check if token needs refresh and refresh if necessary
   */
  private async ensureValidToken(): Promise<boolean> {
    if (!this.accessToken || Date.now() >= this.tokenExpiry - 300000) { // Refresh 5 minutes early
      const authResult = await this.authenticate();
      return authResult.success;
    }
    return true;
  }

  /**
   * Test Zoho CRM connection
   */
  async testConnection(): Promise<{ success: boolean; error?: string; limits?: any }> {
    try {
      const tokenValid = await this.ensureValidToken();
      if (!tokenValid) {
        return { success: false, error: 'Authentication failed' };
      }

      // Test with organizations API
      const response = await axios.get(
        `https://www.${this.config.apiDomain}/crm/v3/organizations`,
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          params: {
            page: 1,
            per_page: 1
          }
        }
      );

      // Get API limits information
      const limits = {
        dailyQuota: response.headers['x-ratelimit-daily-quota'] || 'Unknown',
        dailyUsed: response.headers['x-ratelimit-daily-used'] || 'Unknown',
        hourlyQuota: response.headers['x-ratelimit-hourly-quota'] || 'Unknown',
        hourlyUsed: response.headers['x-ratelimit-hourly-used'] || 'Unknown'
      };

      return { success: true, limits };

    } catch (error: any) {
      console.error('Zoho connection test failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.details || error.message 
      };
    }
  }

  /**
   * Create leads in Zoho CRM
   */
  async createLeads(leads: ZohoLead[]): Promise<{ success: number; failed: number; errors: any[] }> {
    const results = { success: 0, failed: 0, errors: [] as any[] };

    try {
      const tokenValid = await this.ensureValidToken();
      if (!tokenValid) {
        results.failed = leads.length;
        results.errors.push({ error: 'Authentication failed' });
        return results;
      }

      // Process in batches of 100 (Zoho limit)
      const batchSize = 100;
      for (let i = 0; i < leads.length; i += batchSize) {
        const batch = leads.slice(i, i + batchSize);
        
        try {
          const leadData = {
            data: batch.map(lead => ({
              First_Name: lead.First_Name || '',
              Last_Name: lead.Last_Name || '',
              Email: lead.Email,
              Phone: lead.Phone || '',
              Company: lead.Company || '',
              Designation: lead.Designation || '',
              City: lead.City || '',
              State: lead.State || '',
              Country: lead.Country || 'India',
              Lead_Source: lead.Lead_Source || 'Website',
              Lead_Status: lead.Lead_Status || 'Not Contacted',
              Rating: lead.Rating || 'Cold',
              Industry: lead.Industry || '',
              Annual_Revenue: lead.Annual_Revenue,
              No_of_Employees: lead.No_of_Employees
            }))
          };

          const response = await axios.post(
            `https://www.${this.config.apiDomain}/crm/v3/Leads`,
            leadData,
            {
              headers: {
                'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.data.data && Array.isArray(response.data.data)) {
            response.data.data.forEach((result: any, index: number) => {
              if (result.id) {
                results.success++;
              } else {
                results.failed++;
                results.errors.push({
                  input: batch[index],
                  error: result.details || 'Unknown error'
                });
              }
            });
          }

          // Handle any failed records
          if (response.data.data && response.data.data.some((item: any) => !item.id)) {
            results.failed += response.data.data.filter((item: any) => !item.id).length;
          }

        } catch (error: any) {
          console.error(`Zoho batch create failed for batch ${i}:`, error);
          results.failed += batch.length;
          results.errors.push({
            batch: i,
            error: error.response?.data?.details || error.message
          });
        }
      }

    } catch (error: any) {
      console.error('Zoho leads creation failed:', error);
      results.failed = leads.length;
      results.errors.push({ error: error.message });
    }

    return results;
  }

  /**
   * Search leads using Zoho query language
   */
  async searchLeads(criteria: {
    email?: string;
    company?: string;
    city?: string;
    state?: string;
    lead_status?: string;
    industry?: string;
    customWhere?: string;
    limit?: number;
  }): Promise<ZohoLead[]> {
    try {
      const tokenValid = await this.ensureValidToken();
      if (!tokenValid) {
        throw new Error('Authentication failed');
      }

      // Build Zoho query
      let zqlQuery = 'SELECT * FROM Leads WHERE ';
      
      const conditions: string[] = [];
      if (criteria.email) conditions.push(`Email = '${criteria.email}'`);
      if (criteria.company) conditions.push(`Company LIKE '%${criteria.company}%'`);
      if (criteria.city) conditions.push(`City LIKE '%${criteria.city}%'`);
      if (criteria.state) conditions.push(`State LIKE '%${criteria.state}%'`);
      if (criteria.lead_status) conditions.push(`Lead_Status = '${criteria.lead_status}'`);
      if (criteria.industry) conditions.push(`Industry = '${criteria.industry}'`);
      
      if (criteria.customWhere) {
        conditions.push(criteria.customWhere);
      }

      if (conditions.length === 0) {
        zqlQuery = 'SELECT * FROM Leads';
      } else {
        zqlQuery += conditions.join(' AND ');
      }

      zqlQuery += ` LIMIT ${criteria.limit || 100}`;

      const response = await axios.get(
        `https://www.${this.config.apiDomain}/crm/v3/coql`,
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          params: {
            select_query: zqlQuery
          }
        }
      );

      return response.data.data || [];

    } catch (error: any) {
      console.error('Zoho lead search failed:', error);
      throw new Error(`Lead search failed: ${error.response?.data?.details || error.message}`);
    }
  }

  /**
   * Convert leads to deals/opportunities
   */
  async convertLeadToDeal(leadId: string, dealData?: Partial<ZohoDeal>): Promise<{ success: boolean; dealId?: string; error?: string }> {
    try {
      const tokenValid = await this.ensureValidToken();
      if (!tokenValid) {
        throw new Error('Authentication failed');
      }

      const conversionData = {
        ...dealData,
        Layout: {
          name: 'Standard Layout',
          id: 'standard_layout_id'
        }
      };

      const response = await axios.post(
        `https://www.${this.config.apiDomain}/crm/v3/Leads/${leadId}/conversion`,
        {
          data: conversionData
        },
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.data && response.data.data.Deals && response.data.data.Deals[0]) {
        return { 
          success: true, 
          dealId: response.data.data.Deals[0].id 
        };
      }

      return { success: false, error: 'Conversion failed' };

    } catch (error: any) {
      console.error('Lead conversion failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.details || error.message 
      };
    }
  }

  /**
   * Update lead records
   */
  async updateLeads(updates: Array<{ id: string; data: Partial<ZohoLead> }>): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      const tokenValid = await this.ensureValidToken();
      if (!tokenValid) {
        results.failed = updates.length;
        return results;
      }

      // Process in batches of 100
      const batchSize = 100;
      for (let i = 0; i < updates.length; i += batchSize) {
        const batch = updates.slice(i, i + batchSize);
        
        const updateData = {
          data: batch.map(update => ({
            id: update.id,
            ...update.data
          }))
        };

        try {
          const response = await axios.put(
            `https://www.${this.config.apiDomain}/crm/v3/Leads`,
            updateData,
            {
              headers: {
                'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );

          results.success += batch.length;

        } catch (error) {
          console.error(`Update batch failed for batch ${i}:`, error);
          results.failed += batch.length;
        }
      }

    } catch (error) {
      console.error('Zoho lead update failed:', error);
      results.failed = updates.length;
    }

    return results;
  }

  /**
   * Create Indian business custom fields
   */
  async createIndianBusinessFields(): Promise<{ success: boolean; fields: string[] }> {
    const indianFields = [
      {
        api_name: 'Company_Type',
        display_name: 'Company Type',
        data_type: 'picklist',
        required: false,
        picklist_values: [
          { display_value: 'Private Limited', actual_value: 'private_limited' },
          { display_value: 'Public Limited', actual_value: 'public_limited' },
          { display_value: 'Partnership', actual_value: 'partnership' },
          { display_value: 'LLP', actual_value: 'llp' },
          { display_value: 'Sole Proprietorship', actual_value: 'sole_proprietorship' }
        ]
      },
      {
        api_name: 'PAN_Number',
        display_name: 'PAN Number',
        data_type: 'text',
        required: false,
        max_length: 10
      },
      {
        api_name: 'GST_Number',
        display_name: 'GST Number',
        data_type: 'text',
        required: false,
        max_length: 15
      },
      {
        api_name: 'Industry_Category',
        display_name: 'Industry Category',
        data_type: 'picklist',
        required: false,
        picklist_values: [
          { display_value: 'Manufacturing', actual_value: 'manufacturing' },
          { display_value: 'Services', actual_value: 'services' },
          { display_value: 'IT/Software', actual_value: 'it_software' },
          { display_value: 'Healthcare', actual_value: 'healthcare' },
          { display_value: 'Education', actual_value: 'education' },
          { display_value: 'Finance', actual_value: 'finance' },
          { display_value: 'Real Estate', actual_value: 'real_estate' },
          { display_value: 'Retail', actual_value: 'retail' }
        ]
      },
      {
        api_name: 'Business_Nature',
        display_name: 'Business Nature',
        data_type: 'picklist',
        required: false,
        picklist_values: [
          { display_value: 'B2B', actual_value: 'b2b' },
          { display_value: 'B2C', actual_value: 'b2c' },
          { display_value: 'B2G', actual_value: 'b2g' }
        ]
      },
      {
        api_name: 'Funding_Stage',
        display_name: 'Funding Stage',
        data_type: 'picklist',
        required: false,
        picklist_values: [
          { display_value: 'Bootstrap', actual_value: 'bootstrap' },
          { display_value: 'Angel', actual_value: 'angel' },
          { display_value: 'Seed', actual_value: 'seed' },
          { display_value: 'Series A', actual_value: 'series_a' },
          { display_value: 'Series B+', actual_value: 'series_b_plus' },
          { display_value: 'Public', actual_value: 'public' }
        ]
      }
    ];

    const createdFields: string[] = [];

    try {
      const tokenValid = await this.ensureValidToken();
      if (!tokenValid) {
        throw new Error('Authentication failed');
      }

      for (const field of indianFields) {
        try {
          const response = await axios.post(
            `https://www.${this.config.apiDomain}/crm/v3/settings/fields`,
            {
              data: {
                ...field,
                module: 'Leads'
              }
            },
            {
              headers: {
                'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.data.data && response.data.data[0]) {
            createdFields.push(field.api_name);
          }

        } catch (error: any) {
          // Field might already exist
          if (error.response?.status === 5050) { // Field already exists error
            createdFields.push(field.api_name);
          } else {
            console.warn(`Failed to create field ${field.display_name}:`, error.response?.data?.details);
          }
        }
      }

    } catch (error: any) {
      console.error('Failed to create Indian business fields:', error);
    }

    return {
      success: createdFields.length === indianFields.length,
      fields: createdFields
    };
  }

  /**
   * Get industry insights for Indian businesses
   */
  async getIndianIndustryInsights(industry: string): Promise<{
    marketSize: string;
    growthRate: string;
    keyTrends: string[];
    opportunities: string[];
    challenges: string[];
    cities: string[];
  }> {
    const insightsMap: { [key: string]: any } = {
      'Technology & IT Services': {
        marketSize: '₹9.5 lakh crore (2023)',
        growthRate: '8.5% CAGR',
        keyTrends: ['AI/ML adoption', 'Cloud migration', 'Digital transformation', 'Remote work solutions'],
        opportunities: ['SaaS adoption', 'Enterprise automation', 'Government digitization'],
        challenges: ['Talent shortage', 'Data security', 'Regulatory compliance'],
        cities: ['Bangalore', 'Hyderabad', **'Chennai', 'Pune', 'Delhi', 'Mumbai']
      },
      'Real Estate & Construction': {
        marketSize: '₹3.86 lakh crore (2023)',
        growthRate: '12% CAGR',
        keyTrends: ['PropTech revolution', 'Sustainable buildings', 'Smart cities', 'Co-working spaces'],
        opportunities: ['Digital property management', 'Virtual tours', 'PropTech integrations'],
        challenges: ['Regulatory approvals', 'Market volatility', 'Construction delays'],
        cities: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad']
      },
      'Healthcare & Pharmaceuticals': {
        marketSize: '₹3 lakh crore (2023)',
        growthRate: '15% CAGR',
        keyTrends: ['Telemedicine growth', 'AI diagnostics', 'Digital health records', 'Preventive care'],
        opportunities: ['Healthcare digitization', 'Remote monitoring', 'AI-powered diagnostics'],
        challenges: ['Regulatory compliance', 'Data privacy', 'Quality standards'],
        cities: ['Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi', 'Ahmedabad']
      },
      'Banking & Financial Services': {
        marketSize: '₹28 lakh crore (2022)',
        growthRate: '10% CAGR',
        keyTrends: ['Digital banking', 'Fintech innovation', 'UPI dominance', 'Credit scoring AI'],
        opportunities: ['Digital payments', 'Credit automation', 'Risk management'],
        challenges: ['Regulatory compliance', 'Cyber security', 'Financial inclusion'],
        cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad']
      }
    };

    return insightsMap[industry] || {
      marketSize: 'Industry-specific data',
      growthRate: 'Varies by segment',
      keyTrends: ['Digital transformation', 'Automation adoption', 'Market expansion'],
      opportunities: ['Process optimization', 'Customer experience', 'Market expansion'],
      challenges: ['Regulatory compliance', 'Talent acquisition', 'Technology adoption'],
      cities: ['Major metropolitan areas']
    };
  }

  /**
   * Bulk import with Indian business data enrichment
   */
  async bulkImportWithEnrichment(leadData: Array<Partial<ZohoLead>>, enrichmentConfig: ZohoIndianBusinessData): Promise<{
    success: number;
    failed: number;
    enriched: number;
    errors: any[];
  }> {
    const results = { success: 0, failed: 0, enriched: 0, errors: [] as any[] };

    try {
      // Enrich lead data with Indian business context
      const enrichedData = leadData.map(lead => ({
        ...lead,
        Industry_Category: enrichmentConfig.industryCategory,
        Business_Nature: enrichmentConfig.businessNature,
        Company_Type: enrichmentConfig.companyType,
        PAN_Number: enrichmentConfig.panNumber,
        GST_Number: enrichmentConfig.gstNumber,
        Funding_Stage: enrichmentConfig.fundingStage,
        Country: 'India',
        Created_Time: new Date(),
        Lead_Source: 'AI Lead Generation Platform'
      }));

      // Create leads using existing method
      const createResult = await this.createLeads(enrichedData as ZohoLead[]);
      
      return {
        success: createResult.success,
        failed: createResult.failed,
        enriched: createResult.success,
        errors: createResult.errors
      };

    } catch (error: any) {
      console.error('Bulk import with enrichment failed:', error);
      results.failed = leadData.length;
      results.errors.push({ error: error.message });
      
      return results;
    }
  }
}
