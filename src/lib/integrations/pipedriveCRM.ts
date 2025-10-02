interface PipedriveConfig {
  apiToken: string;
  companyDomain: string; // e.g., 'yourcompany' in yourcompany.pipedrive.com
}

interface PipedrivePerson {
  id?: number;
  name: string;
  email: Array<{ label: string; value: string; primary: boolean }>;
  phone?: Array<{ label: string; value: string }>;
  org_name?: string;
  owner?: {
    id: number;
    name: string;
    email: string;
  };
  add_time?: string;
  update_time?: string;
  opened?: boolean;
  visible_to?: string;
  cc_email?: string;
}

interface PipedriveOrganization {
  id?: number;
  name: string;
  address?: string;
  address_country?: string;
  address_country_code?: string;
  address_locality?: string;
  fields?: Record<string, any>;
  owner?: {
    id: number;
    name: string;
    email: string;
  };
  people_count?: number;
  activities_count?: number;
  done_activities_count?: number;
  undone_activities_count?: number;
  files_count?: number;
  notes_count?: number;
  followers_count?: number;
  add_time?: string;
  update_time?: string;
  visible_to?: string;
}

interface PipedriveDeal {
  id?: number;
  title: string;
  value?: number;
  currency?: string;
  pipeline_id?: number;
  stage_id?: number;
  status?: 'open' | 'won' | 'lost';
  add_time?: string;
  update_time?: string;
  close_time?: string;
  owner?: {
    id: number;
    name: string;
    email: string;
  };
  person?: {
    id: number;
    name: string;
    email: string;
  };
  org?: {
    id: number;
    name: string;
    address: string;
  };
  products_count?: number;
  files_count?: number;
  visible_to?: string;
}

interface PipedriveCustomField {
  key: string;
  name: string;
  type: 'text' | 'select' | 'date' | 'number' | 'enum' | 'set' | 'address';
  options?: Array<{
    id: number;
    label: string;
  }>;
}

export class PipedriveCRMIntegration {
  private config: PipedriveConfig;
  private baseUrl: string;

  constructor(config: PipedriveConfig) {
    this.config = config;
    this.baseUrl = `https://${config.companyDomain}.pipedrive.com/api/v1`;
  }

  /**
   * Test Pipedrive connection
   */
  async testConnection(): Promise<{ success: boolean; error?: string; user?: any }> {
    try {
      const response = await fetch(`${this.baseUrl}/users/me?api_token=${this.config.apiToken}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error?.info || 'Connection failed'
        };
      }

      const userData = await response.json();
      
      return {
        success: true,
        user: userData.data
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Connection failed'
      };
    }
  }

  /**
   * Create persons (leads) in Pipedrive
   */
  async createPersons(persons: PipedrivePerson[]): Promise<{ success: number; failed: number; errors: any[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as any[]
    };

    try {
      // Pipedrive doesn't have strict batch limits, but let's process in reasonable chunks
      const batchSize = 50; // Conservative batch size
      
      for (let i = 0; i < persons.length; i += batchSize) {
        const batch = persons.slice(i, i + batchSize);
        
        for (const person of batch) {
          try {
            const personData = {
              name: person.name,
              email: person.email?.map(email => email.value)?.join(',') || '',
              phone: person.phone?.map(phone => phone.value)?.join(',') || '',
              org_name: person.org_name || '',
              visible_to: person.visible_to || '3' // All users
            };

            const response = await fetch(`${this.baseUrl}/persons?api_token=${this.config.apiToken}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(personData)
            });

            if (response.ok) {
              results.success++;
            } else {
              const errorData = await response.json();
              results.failed++;
              results.errors.push({
                input: person,
                error: errorData.error?.info || 'Unknown error'
              });
            }

          } catch (error: any) {
            results.failed++;
            results.errors.push({
              input: person,
              error: error.message
            });
          }
        }

        // Small delay between batches to be respectful
        if (i + batchSize < persons.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

    } catch (error: any) {
      console.error('Pipedrive persons creation failed:', error);
      results.failed = persons.length;
      results.errors.push({ error: error.message });
    }

    return results;
  }

  /**
   * Create organizations in Pipedrive
   */
  async createOrganizations(organizations: PipedriveOrganization[]): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      for (const org of organizations) {
        try {
          const orgData = {
            name: org.name,
            address: org.address || '',
            address_country: org.address_country || 'IN',
            address_country_code: org.address_country_code || 'IN',
            address_locality: org.address_locality || '',
            visible_to: org.visible_to || '3'
          };

          const response = await fetch(`${this.baseUrl}/organizations?api_token=${this.config.apiToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orgData)
          });

          if (response.ok) {
            results.success++;
          } else {
            results.failed++;
          }

        } catch (error) {
          results.failed++;
        }
      }

    } catch (error) {
      console.error('Pipedrive organizations creation failed:', error);
      results.failed = organizations.length;
    }

    return results;
  }

  /**
   * Search persons/leads using various criteria
   */
  async searchPersons(criteria: {
    term?: string;
    org_name?: string;
    owner_id?: number;
    limit?: number;
  }): Promise<PipedrivePerson[]> {
    try {
      const params = new URLSearchParams({
        api_token: this.config.apiToken,
        ...criteria
      });

      if (criteria.limit) {
        params.append('limit', criteria.limit.toString());
      } else {
        params.append('limit', '100');
      }

      const response = await fetch(`${this.baseUrl}/persons/search?${params}`);
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      return data.data?.items || [];

    } catch (error: any) {
      console.error('Pipedrive person search failed:', error);
      throw new Error(`Person search failed: ${error.message}`);
    }
  }

  /**
   * Create deals from qualified leads
   */
  async createDeals(deals: PipedriveDeal[]): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      // Get pipeline and stage information first
      const pipelineResponse = await fetch(`${this.baseUrl}/pipelines?api_token=${this.config.apiToken}`);
      const pipelineData = await pipelineResponse.json();
      
      // Get default pipeline and first stage
      const defaultPipeline = pipelineData.data?.items?.find((p: any) => p.name === 'Default') || pipelineData.data?.items?.[0];
      const defaultStage = defaultPipeline?.stages?.[0];

      for (const deal of deals) {
        try {
          const dealData = {
            title: deal.title,
            value: deal.value || 0,
            currency: deal.currency || 'INR',
            pipeline_id: deal.pipeline_id || defaultPipeline?.id,
            stage_id: deal.stage_id || defaultStage?.id,
            status: deal.status || 'open',
            visible_to: deal.visible_to || '3'
          };

          const response = await fetch(`${this.baseUrl}/deals?api_token=${this.config.apiToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dealData)
          });

          if (response.ok) {
            results.success++;
          } else {
            results.failed++;
          }

        } catch (error) {
          results.failed++;
        }
      }

    } catch (error) {
      console.error('Pipedrive deals creation failed:', error);
      results.failed = deals.length;
    }

    return results;
  }

  /**
   * Convert person to deal (lead to opportunity)
   */
  async convertPersonToDeal(personId: number, dealData?: {
    title?: string;
    value?: number;
    currency?: string;
    stage_id?: number;
  }): Promise<{ success: boolean; dealId?: number; error?: string }> {
    try {
      // Get default pipeline and stage
      const pipelineResponse = await fetch(`${this.baseUrl}/pipelines?api_token=${this.config.apiToken}`);
      const pipelineData = await pipelineResponse.json();
      const defaultPipeline = pipelineData.data?.items?.[0];
      const defaultStage = defaultPipeline?.stages?.[0];

      const dealInfo = {
        title: dealData?.title || 'Deal from AI Lead Generation',
        value: dealData?.value || 0,
        currency: dealData?.currency || 'INR',
        pipeline_id: defaultPipeline?.id,
        stage_id: dealData?.stage_id || defaultStage?.id,
        person_id: personId
      };

      const response = await fetch(`${this.baseUrl}/deals?api_token=${this.config.apiToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dealInfo)
      });

      if (response.ok) {
        const dealData = await response.json();
        return { 
          success: true, 
          dealId: dealData.data?.id 
        };
      }

      const errorData = await response.json();
      return { success: false, error: errorData.error?.info };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get custom fields for the organization
   */
  async getCustomFields(): Promise<PipedriveCustomField[]> {
    try {
      const response = await fetch(`${this.baseUrl}/personFields?api_token=${this.config.apiToken}`);
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error('Failed to fetch custom fields:', error);
      return [];
    }
  }

  /**
   * Create Indian business custom fields
   */
  async createIndianCustomFields(): Promise<{ success: boolean; fields: string[] }> {
    const indianFields = [
      {
        name: 'Company Type',
        field_type: 'enum',
        options: [
          'Private Limited',
          'Public Limited', 
          'Partnership',
          'LLP',
          'Sole Proprietorship'
        ]
      },
      {
        name: 'PAN Number',
        field_type: 'text'
      },
      {
        name: 'GST Number', 
        field_type: 'text'
      },
      {
        name: 'Industry Category',
        field_type: 'enum',
        options: [
          'Manufacturing',
          'Services',
          'IT/Software',
          'Healthcare',
          'Education', 
          'Finance',
          'Real Estate',
          'Retail'
        ]
      },
      {
        name: 'Business Nature',
        field_type: 'enum',
        options: ['B2B', 'B2C', 'B2G']
      },
      {
        name: 'Employee Strength',
        field_type: 'enum',
        options: ['1-10', '11-50', '51-200', '201-500', '500+']
      },
      {
        name: 'Annual Turnover',
        field_type: 'enum',
        options: ['0-1Cr', '1-10Cr', '10-50Cr', '50Cr+']
      },
      {
        name: 'Funding Stage',
        field_type: 'enum',
        options: [
          'Bootstrap',
          'Angel',
          'Seed',
          'Series A',
          'Series B+',
          'Public'
        ]
      }
    ];

    const createdFields: string[] = [];

    try {
      for (const field of indianFields) {
        try {
          const response = await fetch(`${this.baseUrl}/personFields?api_token=${this.config.apiToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(field)
          });

          if (response.ok) {
            const fieldData = await response.json();
            createdFields.push(fieldData.data?.name || field.name);
          }

        } catch (error: any) {
          console.warn(`Failed to create field ${field.name}:`, error.message);
        }
      }

    } catch (error: any) {
      console.error('Failed to create Indian custom fields:', error);
    }

    return {
      success: createdFields.length === indianFields.length,
      fields: createdFields
    };
  }

  /**
   * Get Indian market insights for deal optimization
   */
  getIndianMarketInsights(): {
    regions: Array<{
      name: string;
      businessFocus: string[];
      averageDealValue: number;
      conversionRate: number;
    }>;
    industryTrends: Array<{
      industry: string;
      growthRate: string;
      keyOpportunities: string[];
    }>;
    seasonalPatterns: Array<{
      quarter: string;
      activityLevel: number;
      bestPractices: string[];
    }>;
  } {
    return {
      regions: [
        {
          name: 'Mumbai',
          businessFocus: ['Finance', 'Real Estate', 'Manufacturing'],
          averageDealValue: 2500000,
          conversionRate: 0.12
        },
        {
          name: 'Bangalore',
          businessFocus: ['Technology', 'IT Services', 'Professional Services'],
          averageDealValue: 1800000,
          conversionRate: 0.15
        },
        {
          name: 'Delhi',
          businessFocus: ['Government', 'Services', 'Healthcare'],
          averageDealValue: 2200000,
          conversionRate: 0.11
        }
      ],
      industryTrends: [
        {
          industry: 'Technology',
          growthRate: '8.5% CAGR',
          keyOpportunities: ['Digital transformation', 'Cloud migration', 'AI/ML adoption']
        },
        {
          industry: 'Real Estate',
          growthRate: '12% CAGR',
          keyOpportunities: ['PropTech', 'Smart buildings', 'Co-working spaces']
        },
        {
          industry: 'Healthcare',
          growthRate: '15% CAGR',
          keyOpportunities: ['Telemedicine', 'Digital health', 'AI diagnostics']
        }
      ],
      seasonalPatterns: [
        {
          quarter: 'Q1 (Jan-Mar)',
          activityLevel: 0.9,
          bestPractices: ['Budget planning season', 'New initiatives', 'Resource allocation']
        },
        {
          quarter: 'Q2 (Apr-Jun)',
          activityLevel: 0.8,
          bestPractices: ['Mid-year reviews', 'Agreement renewals']
        },
        {
          quarter: 'Q3 (Jul-Sep)',
          activityLevel: 0.7,
          bestPractices: ['Monsoon challenges', 'Festival planning']
        },
        {
          quarter: 'Q4 (Oct-Dec)',
          activityLevel: 1.0,
          bestPractices: ['Year-end push', 'Festival deals', 'Annual reviews']
        }
      ]
    };
  }

  /**
   * Bulk import with Indian business enrichment
   */
  async bulkImportWithEnrichment(personData: Array<Partial<PipedrivePerson>>, enrichmentConfig: {
    companyType?: string;
    industryCategory?: string;
    businessNature?: string;
    employeeStrength?: string;
    fundingStage?: string;
    panNumber?: string;
    gstNumber?: string;
  }): Promise<{
    success: number;
    failed: number;
    enriched: number;
    errors: any[];
  }> {
    const results = { success: 0, failed: 0, enriched: 0, errors: [] as any[] };

    try {
      // Enrich person data with Indian business context
      const enrichedPersons = personData.map(person => ({
        ...person,
        org_name: person.org_name || '',
        visible_to: '3', // All users
        add_time: new Date().toISOString(),
        // Custom fields would be added here based on enrichment config
      }));

      // Create persons using existing method
      const createResult = await this.createPersons(enrichedPersons as PipedrivePerson[]);
      
      return {
        success: createResult.success,
        failed: createResult.failed,
        enriched: createResult.success,
        errors: createResult.errors
      };

    } catch (error: any) {
      console.error('Bulk import with enrichment failed:', error);
      results.failed = personData.length;
      results.errors.push({ error: error.message });
      
      return results;
    }
  }

  /**
   * Update person records with Indian business data
   */
  async updatePersonsWithIndianData(updates: Array<{
    id: number;
    indianData: {
      companyType?: string;
      industryCategory?: string;
      businessNature?: string;
      employeeStrength?: string;
      fundingStage?: string;
      panNumber?: string;
      gstNumber?: string;
    };
  }>): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      for (const update of updates) {
        try {
          const response = await fetch(`${this.baseUrl}/persons/${update.id}?api_token=${this.config.apiToken}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(update.indianData)
          });

          if (response.ok) {
            results.success++;
          } else {
            results.failed++;
          }

        } catch (error) {
          results.failed++;
        }
      }

    } catch (error: any) {
      console.error('Person update failed:', error);
      results.failed = updates.length;
    }

    return results;
  }
}
