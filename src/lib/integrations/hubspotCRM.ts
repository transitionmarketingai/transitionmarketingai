import { Configuration, DefaultApi, BatchInputSimplePublicObjectInput, PublicObjectSearchRequest } from '@hubspot/api-client';

export interface HubSpotConfig {
  apiKey: string;
  portalId: string;
}

export interface HubSpotContact {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobtitle?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  lifecycleStage?: 'lead' | 'marketingqualifiedlead' | 'salesqualifiedlead' | 'opportunity' | 'customer';
  leadStatus?: string;
  hubspot_owner_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HubSpotDeal {
  id?: string;
  dealName: string;
  dealStage?: string;
  amount?: string;
  closedate?: string;
  pipeline?: string;
  hubspot_owner_id?: string;
  associationType?: string;
  associations?: Array<{ id: string; type: string }>;
}

export interface HubSpotList {
  listId: string;
  name: string;
  membershipCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class HubSpotCRMIntegration {
  private client: DefaultApi;
  private config: HubSpotConfig;

  constructor(config: HubSpotConfig) {
    this.config = config;
    
    const hubspotConfig = new Configuration({
      accessToken: config.apiKey
    });
    
    this.client = new DefaultApi(hubspotConfig);
  }

  /**
   * Test HubSpot connection and return health status
   */
  async testConnection(): Promise<{ success: boolean; error?: string; limit: number }> {
    try {
      // Test with a simple contacts list request
      const testResponse = await this.client.crmContactsApi.getPage(
        undefined, // limit
        undefined, // after
        undefined, // properties
        undefined, // archived
        undefined  // public object search request
      );

      return {
        success: true,
        limit: testResponse.total || 0
      };
    } catch (error: any) {
      console.error('HubSpot connection test failed:', error);
      return {
        success: false,
        error: error.message || 'Connection failed',
        limit: 0
      };
    }
  }

  /**
   * Create contacts in HubSpot from lead list
   */
  async createContacts(contacts: HubSpotContact[]): Promise<{ success: number; failed: number; errors: any[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as any[]
    };

    // Process contacts in batches of 100 (HubSpot limit)
    const batchSize = 100;
    for (let i = 0; i < contacts.length; i += batchSize) {
      const batch = contacts.slice(i, i + batchSize);
      
      try {
        const batchInput: BatchInputSimplePublicObjectInput = {
          inputs: batch.map(contact => ({
            properties: {
              email: contact.email,
              firstname: contact.firstName || '',
              lastname: contact.lastName || '',
              company: contact.company || '',
              jobtitle: contact.jobtitle || '',
              phone: contact.phone || '',
              city: contact.city || '',
              state: contact.state || '',
              country: contact.country || 'India',
              lifecycle_stage: contact.lifecycleStage || 'lead',
              hs_lead_status: contact.leadStatus || 'NEW'
            }
          })),
          idProperty: 'email' // Use email as unique identifier
        };

        const response = await this.client.crmContactsApi.batchApi.create(batchInput);
        
        results.success += response.results?.length || 0;
        
        // Handle any errors in the batch
        if (response.errors) {
          results.failed += response.errors.length;
          results.errors.push(...response.errors);
        }

      } catch (error) {
        console.error('HubSpot batch create failed:', error);
        results.failed += batch.length;
        results.errors.push({
          batch: i,
          error: (error as Error).message
        });
      }
    }

    return results;
  }

  /**
   * Search for contacts based on criteria
   */
  async searchContacts(criteria: {
    query?: string;
    properties?: string[];
    limit?: number;
    filters?: Array<{ propertyName: string; operator: string; value: string }>;
  }): Promise<HubSpotContact[]> {
    try {
      const searchRequest: PublicObjectSearchRequest = {
        query: criteria.query || '',
        properties: criteria.properties || ['email', 'firstname', 'lastname', 'company', 'jobtitle'],
        limit: criteria.limit || 100,
        sorts: [{ propertyName: 'createdate', direction: 'DESCENDING' }]
      };

      if (criteria.filters) {
        searchRequest.filterGroups = [{
          filters: criteria.filters.map(filter => ({
            propertyName: filter.propertyName,
            operator: filter.operator,
            value: filter.value
          }))
        }];
      }

      const response = await this.client.crmContactsApi.searchApi.doSearch(searchRequest);
      
      return (response.results || []).map(contact => ({
        id: contact.id,
        email: contact.properties?.email || '',
        firstName: contact.properties?.firstname || '',
        lastName: contact.properties?.lastname || '',
        company: contact.properties?.company || '',
        jobtitle: contact.properties?.jobtitle || '',
        phone: contact.properties?.phone || '',
        city: contact.properties?.city || '',
        state: contact.properties?.state || '',
        country: contact.properties?.country || '',
        lifecycleStage: contact.properties?.lifecycle_stage || 'lead',
        leadStatus: contact.properties?.hs_lead_status || 'NEW'
      }));

    } catch (error) {
      console.error('HubSpot search failed:', error);
      throw new Error(`Search failed: ${(error as Error).message}`);
    }
  }

  /**
   * Update existing contacts
   */
  async updateContacts(updates: Array<{ id: string; properties: Partial<HubSpotContact> }>): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      const batchInput: BatchInputSimplePublicObjectInput = {
        inputs: updates.map(update => ({
          id: update.id,
          properties: update.properties
        })),
        idProperty: 'id'
      };

      const response = await this.client.crmContactsApi.batchApi.update(batchInput);
      
      results.success = response.results?.length || 0;
      results.failed = response.errors?.length || 0;

    } catch (error) {
      console.error('HubSpot batch update failed:', error);
      results.failed = updates.length;
    }

    return results;
  }

  /**
   * Create deals from qualified leads
   */
  async createDeals(deals: HubSpotDeal[]): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      const batchInput: BatchInputSimplePublicObjectInput = {
        inputs: deals.map(deal => ({
          properties: {
            dealname: deal.dealName,
            dealstage: deal.dealStage || 'appointmentscheduled',
            amount: deal.amount || '0',
            closedate: deal.closedate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            pipeline: deal.pipeline || 'default',
            hubspot_owner_id: deal.hubspot_owner_id
          },
          associations: deal.associations || []
        }))
      };

      const response = await this.client.crmDealsApi.batchApi.create(batchInput);
      
      results.success = response.results?.length || 0;
      results.failed = response.errors?.length || 0;

    } catch (error) {
      console.error('HubSpot deals creation failed:', error);
      results.failed = deals.length;
    }

    return results;
  }

  /**
   * Get lists for campaign assignment
   */
  async getLists(): Promise<HubSpotList[]> {
    try {
      const response = await this.client.crmListsApi.getAll(undefined, undefined, undefined, undefined, true);
      
      return (response.results || []).map(list => ({
        listId: list.listId || '',
        name: list.name || '',
        membershipCount: list.membershipCount || 0,
        createdAt: list.createdAt ? new Date(list.createdAt) : new Date(),
        updatedAt: list.updatedAt ? new Date(list.updatedAt) : new Date()
      }));

    } catch (error) {
      console.error('HubSpot lists retrieval failed:', error);
      return [];
    }
  }

  /**
   * Add contacts to a list
   */
  async addContactsToList(listId: string, contactIds: string[]): Promise<{ success: number; failed: number }> {
    const results = { success: 0, failed: 0 };

    try {
      const batchInput = {
        inputs: contactIds.map(id => ({
          id,
          listId
        }))
      };

      const response = await this.client.crmListsApi.listsApi.addContactsToList(listId, batchInput);
      
      results.success = response.numContactsAdded || 0;
      results.failed = contactIds.length - (response.numContactsAdded || 0);

    } catch (error) {
      console.error('HubSpot add to list failed:', error);
      results.failed = contactIds.length;
    }

  return results;
  }

  /**
   * Create custom properties for Indian market
   */
  async createCustomProperties(): Promise<{ success: boolean; properties: string[] }> {
    const indianProperties = [
      {
        name: 'indian_city',
        label: 'Indian City',
        type: 'string',
        fieldType: 'text',
        description: 'City in India for geographic targeting'
      },
      {
        name: 'industry_focus',
        label: 'Industry Focus',
        type: 'enumeration',
        fieldType: 'select',
        options: [
          { label: 'Technology & IT', value: 'technology', displayOrder: 1 },
          { label: 'Real Estate', value: 'realestate', displayOrder: 2 },
          { label: 'Healthcare', value: 'healthcare', displayOrder: 3 },
          { label: 'Finance', value: 'finance', displayOrder: 4 }
        ],
        description: 'Indian industry classification'
      },
      {
        name: 'business_size',
        label: 'Business Size',
        type: 'enumeration',
        fieldType: 'select',
        options: [
          { label: 'Startup (1-10)', value: 'startup', displayOrder: 1 },
          { label: 'SME (11-100)', value: 'sme', displayOrder: 2 },
          { label: 'Enterprise (100+)', value: 'enterprise', displayOrder: 3 }
        ],
        description: 'Business size classification for Indian companies'
      }
    ];

    const createdProperties: string[] = [];

    for (const property of indianProperties) {
      try {
        await this.client.crmPropertiesApi.create('contacts', {
          name: property.name,
          label: property.label,
          type: property.type,
          fieldType: property.fieldType,
          description: property.description,
          options: (property as any).options || undefined,
          ...(property.type === 'enumeration' && { options: (property as any).options })
        });

        createdProperties.push(property.name);
      } catch (error: any) {
        // Property might already exist
        if (error.code === 409) {
          createdProperties.push(property.name);
        } else {
          console.warn(`Failed to create property ${property.name}:`, error.message);
        }
      }
    }

    return {
      success: createdProperties.length === indianProperties.length,
      properties: createdProperties
    };
  }
}
