import { NextRequest, NextResponse } from 'next/server';
import { SalesforceCRMIntegration } from '@/lib/integrations/salesforceCRM';

export async function POST(request: NextRequest) {
  try {
    const { accessToken, instanceUrl, apiVersion = 'v57.0' } = await request.json();
    
    // Validate required fields
    if (!accessToken || !instanceUrl) {
      return NextResponse.json(
        { error: 'Access token and Instance URL are required' },
        { status: 400 }
      );
    }

    // Initialize Salesforce integration
    const salesforce = new SalesforceCRMIntegration({
      accessToken,
      instanceUrl,
      apiVersion
    });
    
    // Test connection
    const connectionTest = await salesforce.testConnection();
    
    if (!connectionTest.success) {
      return NextResponse.json(
        { error: connectionTest.error || 'Failed to connect to Salesforce' },
        { status: 400 }
      );
    }

    // Create custom fields for Indian market
    const customFieldsResult = await salesforce.createIndianCustomFields();
    
    // TODO: Store connection details securely for the user
    const connectionId = `salesforce_${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      connectionId,
      instanceUrl,
      apiVersion,
      limits: connectionTest.limInfo,
      customFields: customFieldsResult.fields,
      message: 'Salesforce connection established successfully'
    });

  } catch (error: any) {
    console.error('Salesforce connection failed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to connect to Salesforce' },
      { status: 500 }
    );
  }
}
