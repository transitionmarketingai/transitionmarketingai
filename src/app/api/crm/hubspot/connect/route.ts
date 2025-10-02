import { NextRequest, NextResponse } from 'next/server';
import { HubSpotCRMIntegration } from '@/lib/integrations/hubspotCRM';

export async function POST(request: NextRequest) {
  try {
    const { apiKey, portalId } = await request.json();
    
    // Validate required fields
    if (!apiKey || !portalId) {
      return NextResponse.json(
        { error: 'API key and Portal ID are required' },
        { status: 400 }
      );
    }

    // Initialize HubSpot integration
    const hubspot = new HubSpotCRMIntegration({ apiKey, portalId });
    
    // Test connection
    const connectionTest = await hubspot.testConnection();
    
    if (!connectionTest.success) {
      return NextResponse.json(
        { error: connectionTest.error || 'Failed to connect to HubSpot' },
        { status: 400 }
      );
    }

    // Create custom properties for Indian market
    const propertiesResult = await hubspot.createCustomProperties();
    
    // TODO: Store connection details securely for the user
    // This would typically encrypt and store in database
    
    return NextResponse.json({
      success: true,
      connectionId: `hubspot_${Date.now()}`,
      portalId,
      contactLimit: connectionTest.limit,
      customProperties: propertiesResult.properties,
      message: 'HubSpot connection established successfully'
    });

  } catch (error: any) {
    console.error('HubSpot connection failed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to connect to HubSpot' },
      { status: 500 }
    );
  }
}
