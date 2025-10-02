'use client';

import React, { useState, useEffect } from 'react';

interface CampaignStatus {
  campaignId: string;
  name: string;
  status: 'running' | 'paused' | 'stopped' | 'error';
  leadsProcessedToday: number;
  lastActivity: Date;
  errors: string[];
}

interface SystemHealth {
  crmsConnected: boolean;
  emailService: 'healthy' | 'rate_limited' | 'error';
  enrichmentService: 'healthy' | 'degraded' | 'offline';
  automationEngine: 'running' | 'paused' | 'error';
  lastHealthCheck: Date;
}

interface RealTimeMetrics {
  totalCampaignsActive: number;
  totalLeadsProcessedToday: number;
  qualifiedLeadsToday: number;
  systemErrors: number;
  avgResponseTime: number;
}

export default function RealTimeStatusTracker() {
  const [isLoading, setIsLoading] = useState(true);
  const [realMetrics, setRealMetrics] = useState<RealTimeMetrics | null>(null);
  const [campaignStatuses, setCampaignStatuses] = useState<CampaignStatus[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Simulate real-time data fetching
    const fetchRealMetrics = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API calls
        const mockRealMetrics: RealTimeMetrics = {
          totalCampaignsActive: await getActualActiveCampaigns(),
          totalLeadsProcessedToday: await getTodayLeadsProcessed(),
          qualifiedLeadsToday: await getTodayQualifiedLeads(),
          systemErrors: await getSystemErrorCount(),
          avgResponseTime: await getAverageResponseTime()
        };

        setRealMetrics(mockRealMetrics);
        
        // Simulate campaign status updates
        const mockCampaignStatuses = await getCampaignStatuses();
        setCampaignStatuses(mockCampaignStatuses);
        
        // Check system health
        const healthCheck = await performSystemHealthCheck();
        setSystemHealth(healthCheck);
        
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Failed to fetch real metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial load
    fetchRealMetrics();

    // Update every 30 seconds with real data
    const interval = setInterval(fetchRealMetrics, 30000);

    return () => clearInterval(interval);
  }, []);

  // Real API calls (replace with actual implementations)
  const getActualActiveCampaigns = async (): Promise<number> => {
    // TODO: Connect to actual campaign database
    try {
      const response = await fetch('/api/campaigns/active-count');
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.log('Using fallback campaign count');
      return 0; // If no campaigns are actually set up
    }
  };

  const getTodayLeadsProcessed = async (): Promise<number> => {
    // TODO: Connect to actual lead processing logs
    try {
      const response = await fetch('/api/leads/today-count');
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      return 0; // No leads processed if system not active
    }
  };

  const getTodayQualifiedLeads = async (): Promise<number> => {
    try {
      const response = await fetch('/api/leads/today-qualified');
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      return 0;
    }
  };

  const getSystemErrorCount = async (): Promise<number> => {
    try {
      const response = await fetch('/api/system/error-count');
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      return 0;
    }
  };

  const getAverageResponseTime = async (): Promise<number> => {
    try {
      const response = await fetch('/api/system/avg-response-time');
      const data = await response.json();
      return data.ms || 0;
    } catch (error) {
      return 0;
    }
  };

  const getCampaignStatuses = async (): Promise<CampaignStatus[]> => {
    try {
      const response = await fetch('/api/campaigns/status');
      const campaigns = await response.json();
      return campaigns || [];
    } catch (error) {
      return []; // No active campaigns
    }
  };

  const performSystemHealthCheck = async (): Promise<SystemHealth> => {
    const healthChecks = {
      crmsConnected: false,
      emailService: 'offline' as const,
      enrichmentService: 'offline' as const,
      automationEngine: 'paused' as const,
      lastHealthCheck: new Date()
    };

    try {
      // Check CRM connections
      const crmResponse = await fetch('/api/system/crm-health');
      if (crmResponse.ok) {
        healthChecks.crmsConnected = true;
      }

      // Check email service
      const emailResponse = await fetch('/api/system/email-health');
      if (emailResponse.ok) {
        healthChecks.emailService = 'healthy';
      }

      // Check enrichment service
      const enrichmentResponse = await fetch('/api/system/enrichment-health');
      if (enrichmentResponse.ok) {
        healthChecks.enrichmentService = 'healthy';
      }

      // Check automation engine
      const automationResponse = await fetch('/api/system/automation-health');
      if (automationResponse.ok) {
        healthChecks.automationEngine = 'running';
      }

    } catch (error) {
      console.log('Health check failed:', error);
    }

    return healthChecks;
  };

  const getOverallSystemStatus = (): 'healthy' | 'degraded' | 'offline' => {
    if (!systemHealth) return 'offline';

    if (campaignStatuses.length === 0) {
      return 'offline'; // No campaigns active
    }

    const hasRunningCampaigns = campaignStatuses.some(c => c.status === 'running');
    const hasErrors = realMetrics?.systemErrors > 0;

    if (hasRunningCampaigns && !hasErrors) return 'healthy';
    if (hasRunningCampaigns || realMetrics?.totalLeadsProcessedToday > 0) return 'degraded';
    return 'offline';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'healthy': return '✅';
      case 'degraded': return '⚠️';
      case 'offline': return '⭕';
      case 'error': return '❌';
      default: return '⭕';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  const systemStatus = getOverallSystemStatus();

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getStatusIcon(systemStatus)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Lead Generation System Status
            </h3>
            <p className="text-sm text-gray-600">
              Real-time monitoring of campaign performance and system health
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemStatus)}`}>
            {systemStatus.toUpperCase()}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {realMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xl font-bold text-gray-900">{realMetrics.totalCampaignsActive}</div>
            <div className="text-sm text-gray-600">Active Campaigns</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xl font-bold text-gray-900">{realMetrics.totalLeadsProcessedToday}</div>
            <div className="text-sm text-gray-600">Leads Processed Today</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-xl font-bold text-green-600">{realMetrics.qualifiedLeadsToday}</div>
            <div className="text-sm text-gray-600">Qualified Today</div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className={`text-xl font-bold ${realMetrics.systemErrors > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {realMetrics.systemErrors}
            </div>
            <div className="text-sm text-gray-600">System Errors</div>
          </div>
        </div>
      )}

      {campaignStatuses.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Campaign Status</h4>
          <div className="space-y-2">
            {campaignStatuses.slice(0, 3).map((campaign) => (
              <div key={campaign.campaignId} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getStatusIcon(campaign.status)}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-xs text-gray-600">{campaign.leadsProcessedToday} leads today</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {campaign.lastActivity.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {systemHealth && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">System Health</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <span>{systemHealth.crmsConnected ? '✅' : '❌'}</span>
              <span className="text-xs text-gray-600">CRM Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              {systemHealth.emailService === 'healthy' ? '✅' : 
               systemHealth.emailService === 'degraded' ? '⚠️' : '❌'}
              <span className="text-xs text-gray-600">Email Service</span>
            </div>
            <div className="flex items-center space-x-2">
              {systemHealth.enrichmentService === 'healthy' ? '✅' : 
               systemHealth.enrichmentService === 'degraded' ? '⚠️' : '❌'}
              <span className="text-xs text-gray-600">Data Enrichment</span>
            </div>
            <div className="flex items-center space-x-2">
              {systemHealth.automationEngine === 'running' ? '✅' : '❌'}
              <span className="text-xs text-gray-600">Automation Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* Setup Helper for New Users */}
      {systemStatus === 'offline' && campaignStatuses.length === 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">🚀 Get Started</h4>
            <p className="text-sm text-blue-800 mb-3">
              No active campaigns found. Set up your first campaign to start generating leads.
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                Create First Campaign
              </button>
              <button className="px-4 py-2 border border-blue-300 text-blue-700 text-sm rounded-lg hover:bg-blue-50">
                Import Existing Leads
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
