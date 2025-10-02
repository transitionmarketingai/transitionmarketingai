interface SalesforceConfig {
  accessToken: string;
  instanceUrl: string;
  apiVersion: string;
}

interface SalesforceContact {
  Id?: string;
  Email: string;
  FirstName?: string;
  LastName?: string;
  Company?: string;
  Title?: string;
  Phone?: string;
  City?: string;
  State?: string;
  Country?: string;
  LeadSource?: string;
  Status?: string;
  CreatedDate?: Date;
  LastModifiedDate?: Date;
  OwnerId?: string;
}

interface SalesforceLead {
  Id?: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Phone?: string;
  Company?: string;
  Title?: string;
  City?: string;
  State?: string;
  Country?: string;
  LeadSource?: string;
  Status?: string;
  Rating?: string;
  Industry?: string;
  OwnerId?: string;
}

interface SalesforceOpportunity {
  Id?: string;
  Name: string;
  Amount?: number;
  StageName?: string;
  CloseDate?: string;
  Probability?: number;
  LeadSource?: string;
  OwnerId?: string;
  AccountId?: string;
}

interface SalesforceQueryResult<T> {
  records: T[];
  totalSize: number;
  done: boolean;
  nextRecordsUrl?: string;
}

export class SalesforceCRMIntegration {
  private config: SalesforceConfig;

  constructor(config: SalesforceConfig) {
    this.config = config;
  }

  /**
   * Test Salesforce connection
   */
  async testConnection(): Promise<{ success: boolean; error?: string; limInfo?: any }> {
    try {
      const response = await this.makeRequest('/services/data/v57.0/limits');
      return {
        success: true,
        limInfo: response
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Connection failed'
      };
    }
  }

  /**
   * Create leads in Salesforce
   */
  async createLeads(leads: SalesforceLead[]): Promise<{ success: number; failed: number; errors: any[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as any[]
    };

    // Process leads in batches of 200 (Salesforce limit)
    const batchSize = 200;
    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize);
      
      try {
        const leadData = batch.map(lead => ({
          FirstName: lead.FirstName || '',
          LastName: lead.LastName || 'Unknown',
          Email: lead.Email,
          Phone: lead.Phone || '',
          Company: lead.Company || '',
          Title: lead.Title || '',
          City: lead.City || '',
          State: lead.State || '',
          Country: lead.Country || 'India',
          LeadSource: lead.LeadSource || 'Website',
          Status: lead.Status || 'Open - Not Contacted',
          Rating: lead.Rating || 'Cold',
          Industry: lead.Industry || ''
        }));

        const response = await this.makeRequest('/services/data/v57.0/composite/sobjects', {
          method: 'POST',
          body: JSON.stringify({
            allOrNew: true,
            records: leadData.map((lead, index) => ({
              attributes: { type: 'Lead' },
              ...lead
            }))
          })
        });

        if (response && Array.isArray(response)) {
          response.forEach((result: any, index: number) => {
            if (result.success) {
              results.success++;
              // Store the Salesforce ID for future reference
              leads[i + index].Id = result.id;
            } else {
              results.failed++;
              results.errors.push({
                index: i + index,
                errors: result.errors
              });
            }
          });
        }

      } catch (error: any) {
        console.error('Salesforce batch create failed:', error);
        results.failed += batch.length;
        results.errors.push({
          batch: i,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Convert leads to opportunities
   */
  async convertLeadsToOpportunities(leadIds: string[], opportunityData?: Partial<SalesforceOpportunity>): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      const conversionRequests = leadIds.map(leadId => ({
        leadId,
        convertedStatus: 'Closed - Converted',
        doNotCreateOpportunity: false,
        opportunityName: opportunityData?.Name || `${leadId} Opportunity`,
        amount: opportunityData?.Amount || 0,
        stage: opportunityData?.StageName || 'Prospecting',
        closeDate: opportunityData?.CloseDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }));

      const response = await this.makeRequest('/services/data/v57.0/composite', {
        method: 'POST',
        body: JSON.stringify({
          allOrNew: true,
          compositeRequest: conversionRequests.map((req, index) => ({
            method: 'POST',
            url: `/services/data/v57.0/sobjects/Lead/${req.leadId}/actions/convertLead`,
            referenceId: 'conversionBatch' + index,
            body: req
          }))
        })
      });

      // Process conversion results
      if (response && response.compositeResponse) {
        response.compositeResponse.forEach((result: any) => {
          if (result.httpStatusCode >= 200 && result.httpStatusCode < 300) {
            results.success++;
          } else {
            results.failed++;
          }
        });
      }

    } catch (error) {
      console.error('Lead conversion failed:', error);
      results.failed = leadIds.length;
    }

    return results;
  }

  /**
   * Search leads using SOQL
   */
  async searchLeads(criteria: {
    email?: string;
    company?: string;
    city?: string;
    state?: string;
    status?: string;
    limit?: number;
    customWhere?: string;
  }): Promise<SalesforceLead[]> {
    try {
      let whereClause = 'WHERE ' + Object.entries(criteria)
        .filter(([key, value]) => key !== 'limit' && key !== 'customWhere' && value)
        .map(([key, value]) => {
          const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
          return `${fieldName} = '${value}'`;
        })
        .join(' AND ');

      if (criteria.customWhere) {
        whereClause += (whereClause.includes('WHERE') ? ' AND ' : 'WHERE ') + criteria.customWhere;
      }

      const soql = `SELECT Id, FirstName, LastName, Email, Phone, Company, Title, City, State, Country, LeadSource, Status, Rating, Industry, CreatedDate, LastModifiedDate FROM Lead ${whereClause} ORDER BY CreatedDate DESC LIMIT ${criteria.limit || 100}`;

      const response = await this.makeRequest(`/services/data/v57.0/query/?q=${encodeURIComponent(soql)}`);
      
      return response.records || [];

    } catch (error) {
      console.error('Salesforce lead search failed:', error);
      throw new Error(`Lead search failed: ${(error as Error).message}`);
    }
  }

  /**
   * Get Indian-specific lead data
   */
  async getIndianLeadsByLocation(cities: string[]): Promise<SalesforceLead[]> {
    const cityFilter = cities.map(city => `City = '${city}'`).join(' OR ');
    return this.searchLeads({
      customWhere: `(${cityFilter})`,
      limit: 500
    });
  }

  /**
   * Update lead records
   */
  async updateLeads(updates: Array<{ id: string; fields: Partial<SalesforceLead> }>): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      const updateRequests = updates.map((update, index) => ({
        method: 'PATCH',
        url: `/services/data/v57.0/sobjects/Lead/${update.id}`,
        referenceId: 'updateBatch' + index,
        body: update.fields
      }));

      const response = await this.makeRequest('/services/data/v57.0/composite', {
        method: 'POST',
        body: JSON.stringify({
          allOrNew: true,
          compositeRequest: updateRequests
        })
      });

      if (response && response.compositeResponse) {
        response.compositeResponse.forEach((result: any) => {
          if (result.httpStatusCode >= 200 && result.httpStatusCode < 300) {
            results.success++;
          } else {
            results.failed++;
          }
        });
      }

    } catch (error) {
      console.error('Salesforce lead update failed:', error);
      results.failed = updates.length;
    }

    return results;
  }

  /**
   * Create opportunities from qualified leads
   */
  async createOpportunities(opportunities: SalesforceOpportunity[]): Promise<{ success: number; failed: number }> {
    const results = { success: 0,failed: 0 };

    try {
      const opportunityData = opportunities.map(opp => ({
        Name: opp.Name,
        Amount: opp.Amount || 0,
        StageName: opp.StageName || 'Prospecting',
        CloseDate: opp.CloseDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        LeadSource: opp.LeadSource || 'Website',
        AccountId: opp.AccountId,
        OwnerId: opp.OwnerId
      }));

      const response = await this.makeRequest('/services/data/v57.0/composite/sobjects', {
        method: 'POST',
        body: JSON.stringify({
          allOrNew: true,
          records: opportunityData.map((opp, index) => ({
            attributes: { type: 'Opportunity' },
            ...opp
          }))
        })
      });

      if (response && Array.isArray(response)) {
        response.forEach((result: any) => {
          if (result.success) {
            results.success++;
          } else {
            results.failed++;
          }
        });
      }

    } catch (error) {
      console.error('Opportunities creationFailed:', error);
      results.failed = opportunities.length;
    }

    return results;
  }

  /**
   * Create custom fields for Indian market
   */
  async createIndianCustomFields(): Promise<{ success: boolean; fields: string[] }> {
    const indianFields = [
      {
        label: 'Indian City',
        type: 'Text',
        length: 255,
        description: 'Indian city classification for geographic targeting'
      },
      {
        label: 'Business Size Category',
        type: 'Picklist',
        values: [
          'Startup (1-10 employees)',
          'SME (11-100 employees)', 
          'Enterprise (100+ employees)',
          'Corporate (1000+ employees)'
        ],
        description: 'Business size classification for Indian markets'
      },
      {
        label: 'Indian Industry Segment',
        type: 'Picklist', 
        values: [
          'Technology & IT Services',
          'Real Estate & Construction',
          'Healthcare & Pharmaceuticals',
          'Banking & Financial Services',
          'Manufacturing & Industrial',
          'Education & Training',
          'E-commerce & Retail',
          'Consulting & Professional Services'
        ],
        description: 'Industry segmentation for Indian business context'
      }
    ];

    const createdFields: string[] = [];

    for (const field of indianFields) {
      try {
        const fieldName = field.label.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        
        const customField = {
          label: field.label,
          type: field.type,
          description: field.description,
          ...(field.type === 'Text' && { length: field.length }),
          ...(field.type === 'Picklist' && { 
            picklist: {
              values: field.values.map(value => ({ value, label: value }))
            }
          })
        };

        await this.makeRequest(`/services/data/v57.0/sobjects/Lead/describe`, {
          method: 'POST',
          body: JSON.stringify({
            [fieldName]: customField
          })
        });

        createdFields.push(fieldName);
      } catch (error: any) {
        console.warn(`Failed to create field ${field.label}:`, error.message);
      }
    }

    return {
      success: createdFields.length === indianFields.length,
      fields: createdFields
    };
  }

  /**
   * Private method to make authenticated requests
   */
  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.config.instanceUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Salesforce API error: ${response.status} - ${errorData}`);
    }

    return response.json();
  }
}
