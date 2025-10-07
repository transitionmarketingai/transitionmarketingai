import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-enhanced';

// CRM Integration Service
class CRMIntegrationService {
  private hubspotApiKey: string;
  private salesforceApiKey: string;
  private pipedriveApiKey: string;

  constructor() {
    this.hubspotApiKey = process.env.HUBSPOT_API_KEY || '';
    this.salesforceApiKey = process.env.SALESFORCE_API_KEY || '';
    this.pipedriveApiKey = process.env.PIPEDRIVE_API_KEY || '';
  }

  // HubSpot Integration
  async syncToHubSpot(lead: any): Promise<any> {
    try {
      const contactData = {
        properties: {
          email: lead.email,
          firstname: lead.firstName,
          lastname: lead.lastName,
          phone: lead.phone,
          company: lead.company,
          jobtitle: lead.jobTitle,
          industry: lead.industry,
          city: lead.location,
          website: lead.website,
          lifecyclestage: 'lead',
          lead_status: 'new',
          source: 'transition_marketing_ai',
          createdate: new Date().toISOString(),
          lastmodifieddate: new Date().toISOString()
        }
      };

      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.hubspotApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        crmId: data.id,
        crmType: 'hubspot',
        syncStatus: 'success',
        syncedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('HubSpot sync error:', error);
      return {
        crmType: 'hubspot',
        syncStatus: 'failed',
        error: error.message,
        syncedAt: new Date().toISOString()
      };
    }
  }

  // Salesforce Integration
  async syncToSalesforce(lead: any): Promise<any> {
    try {
      const leadData = {
        FirstName: lead.firstName,
        LastName: lead.lastName,
        Email: lead.email,
        Phone: lead.phone,
        Company: lead.company,
        Title: lead.jobTitle,
        Industry: lead.industry,
        City: lead.location,
        Website: lead.website,
        LeadSource: 'Transition Marketing AI',
        Status: 'New',
        CreatedDate: new Date().toISOString()
      };

      const response = await fetch(`${process.env.SALESFORCE_INSTANCE_URL}/services/data/v58.0/sobjects/Lead/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.salesforceApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        throw new Error(`Salesforce API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        crmId: data.id,
        crmType: 'salesforce',
        syncStatus: 'success',
        syncedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('Salesforce sync error:', error);
      return {
        crmType: 'salesforce',
        syncStatus: 'failed',
        error: error.message,
        syncedAt: new Date().toISOString()
      };
    }
  }

  // Pipedrive Integration
  async syncToPipedrive(lead: any): Promise<any> {
    try {
      const personData = {
        name: `${lead.firstName} ${lead.lastName}`,
        email: lead.email,
        phone: lead.phone,
        org_name: lead.company,
        owner_id: process.env.PIPEDRIVE_OWNER_ID || '1'
      };

      const response = await fetch('https://api.pipedrive.com/v1/persons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.pipedriveApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(personData)
      });

      if (!response.ok) {
        throw new Error(`Pipedrive API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        crmId: data.data.id,
        crmType: 'pipedrive',
        syncStatus: 'success',
        syncedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('Pipedrive sync error:', error);
      return {
        crmType: 'pipedrive',
        syncStatus: 'failed',
        error: error.message,
        syncedAt: new Date().toISOString()
      };
    }
  }

  // Sync lead to multiple CRMs
  async syncLeadToCRMs(lead: any, crmTypes: string[]): Promise<any[]> {
    const results = [];

    for (const crmType of crmTypes) {
      let result;
      
      switch (crmType.toLowerCase()) {
        case 'hubspot':
          result = await this.syncToHubSpot(lead);
          break;
        case 'salesforce':
          result = await this.syncToSalesforce(lead);
          break;
        case 'pipedrive':
          result = await this.syncToPipedrive(lead);
          break;
        default:
          result = {
            crmType: crmType,
            syncStatus: 'unsupported',
            error: 'Unsupported CRM type',
            syncedAt: new Date().toISOString()
          };
      }

      results.push(result);
    }

    return results;
  }

  // Get CRM integration status
  async getIntegrationStatus(userId: string): Promise<any> {
    try {
      const integrations = await prisma.integration.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' }
      });

      return {
        integrations: integrations,
        totalIntegrations: integrations.length,
        activeIntegrations: integrations.filter(i => i.isActive).length
      };

    } catch (error) {
      console.error('Integration status error:', error);
      return {
        integrations: [],
        totalIntegrations: 0,
        activeIntegrations: 0
      };
    }
  }

  // Test CRM connection
  async testConnection(crmType: string): Promise<boolean> {
    try {
      switch (crmType.toLowerCase()) {
        case 'hubspot':
          const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?limit=1', {
            headers: {
              'Authorization': `Bearer ${this.hubspotApiKey}`
            }
          });
          return hubspotResponse.ok;

        case 'salesforce':
          const salesforceResponse = await fetch(`${process.env.SALESFORCE_INSTANCE_URL}/services/data/v58.0/sobjects/Lead/describe`, {
            headers: {
              'Authorization': `Bearer ${this.salesforceApiKey}`
            }
          });
          return salesforceResponse.ok;

        case 'pipedrive':
          const pipedriveResponse = await fetch('https://api.pipedrive.com/v1/users/me', {
            headers: {
              'Authorization': `Bearer ${this.pipedriveApiKey}`
            }
          });
          return pipedriveResponse.ok;

        default:
          return false;
      }
    } catch (error) {
      console.error('CRM connection test error:', error);
      return false;
    }
  }
}

const crmService = new CRMIntegrationService();

// Sync lead to CRM
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { leadId, crmTypes } = await request.json();

    if (!leadId || !crmTypes || !Array.isArray(crmTypes)) {
      return NextResponse.json(
        { error: 'Lead ID and CRM types array are required' },
        { status: 400 }
      );
    }

    // Get lead details
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if lead belongs to user
    if (lead.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Sync lead to CRMs
    const syncResults = await crmService.syncLeadToCRMs(lead, crmTypes);

    // Update lead with CRM sync information
    const existingMetadata = lead.metadata || {};
    const crmSyncs = existingMetadata.crmSyncs || [];
    
    syncResults.forEach(result => {
      crmSyncs.push(result);
    });

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        metadata: {
          ...existingMetadata,
          crmSyncs: crmSyncs
        },
        updatedAt: new Date()
      }
    });

    // Create activity record
    await prisma.activity.create({
      data: {
        leadId: leadId,
        userId: session.user.id,
        type: 'CRM_SYNC',
        description: `Lead synced to ${crmTypes.join(', ')}`,
        metadata: {
          crmTypes: crmTypes,
          syncResults: syncResults
        }
      }
    });

    return NextResponse.json({
      success: true,
      leadId: leadId,
      syncResults: syncResults,
      syncedCRMs: crmTypes,
      successCount: syncResults.filter(r => r.syncStatus === 'success').length,
      failureCount: syncResults.filter(r => r.syncStatus === 'failed').length
    });

  } catch (error) {
    console.error('CRM sync API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get integration status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const integrationStatus = await crmService.getIntegrationStatus(session.user.id);

    return NextResponse.json({
      success: true,
      ...integrationStatus
    });

  } catch (error) {
    console.error('Integration status API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Test CRM connection
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { crmType } = await request.json();

    if (!crmType) {
      return NextResponse.json(
        { error: 'CRM type is required' },
        { status: 400 }
      );
    }

    const isConnected = await crmService.testConnection(crmType);

    // Update or create integration record
    await prisma.integration.upsert({
      where: {
        userId_crmType: {
          userId: session.user.id,
          crmType: crmType.toUpperCase()
        }
      },
      update: {
        isActive: isConnected,
        lastTestedAt: new Date(),
        connectionStatus: isConnected ? 'connected' : 'failed'
      },
      create: {
        userId: session.user.id,
        crmType: crmType.toUpperCase(),
        isActive: isConnected,
        lastTestedAt: new Date(),
        connectionStatus: isConnected ? 'connected' : 'failed',
        apiKey: 'configured', // Don't store actual API key
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      crmType: crmType,
      isConnected: isConnected,
      status: isConnected ? 'connected' : 'failed',
      testedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('CRM connection test API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
