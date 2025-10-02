'use client';

import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  summary: {
    totalLeads: number;
    qualifiedLeads: number;
    conversionRate: number;
    monthlyRevenue: number;
    revenueGrowth: number;
    dailyLeadVelocity: number;
    avgLeadScore: number;
  };
  channels: {
    email: { sent: number; opened: number; clicked: number; bounceRate: number };
    linkedin: { connections: number; acceptanceRate: number; responses: number };
    whatsapp: { messages: number; responseRate: number; costPerMessage: number };
    phone: { callsAttempted: number; connected: number; appointments: number };
  };
  campaigns: {
    activeCampaigns: number;
    totalCampaigns: number;
    avgROI: number;
    bestCampaign: string;
  };
  crm: {
    hubspot: { contacts: number; deals: number; value: number; status: string };
    salesforce: { leads: number; opportunities: number; revenue: number; status: string };
    zoho: { leads: number; deals: number; value: number; status: string };
  };
}

interface InsightsData {
  title: string;
  type: 'success' | 'warning' | 'opportunity';
  description: string;
  recommendation: string;
  impact: number;
  confidence: number;
}

export default function SimplifiedAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [insights, setInsights] = useState<InsightsData[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'channels' | 'campaigns' | 'crm' | 'insights'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setIsLoading(true);
    
    // Simulate API loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setAnalytics({
      summary: {
        totalLeads: 1247,
        qualifiedLeads: 892,
        conversionRate: 71.5,
        monthlyRevenue: 234000,
        revenueGrowth: 24.5,
        dailyLeadVelocity: 42,
        avgLeadScore: 78.3
      },
      channels: {
        email: { sent: 15420, opened: 5672, clicked: 892, bounceRate: 3.4 },
        linkedin: { connections: 890, acceptanceRate: 67.5, responses: 234 },
        whatsapp: { messages: 3456, responseRate: 68.2, costPerMessage: 0.002 },
        phone: { callsAttempted: 456, connected: 234, appointments: 89 }
      },
      campaigns: {
        activeCampaigns: 8,
        totalCampaigns: 23,
        avgROI: 340,
        bestCampaign: 'Bangalore Tech Startups'
      },
      crm: {
        hubspot: { contacts: 456, deals: 123, value: 2340000, status: 'synced' },
        salesforce: { leads: 567, opportunities: 145, revenue: 1890000, status: 'synced' },
        zoho: { leads: 234, deals: 67, value: 567000, status: 'pending' }
      }
    });

    setInsights([
      {
        title: 'LinkedIn Performance Above Average',
        type: 'success',
        description: 'Connection acceptance rate at 67.5% compared to industry average of 52%',
        recommendation: 'Continue current LinkedIn strategy and scale to other regions',
        impact: 8,
        confidence: 92
      },
      {
        title: 'WhatsApp Response Rate Trending Up',
        type: 'opportunity',
        description: 'WhatsApp response rate of 68.2% outperforms industry benchmarks',
        recommendation: 'Increase WhatsApp messaging volume and add interactive templates',
        impact: 9,
        confidence: 88
      },
      {
        title: 'Email Open Rate Declining',
        type: 'warning',
        description: 'Email open rates dropped from 42% to 38% over the past 2 weeks',
        recommendation: 'A/B test subject lines and optimize send times',
        impact: 6,
        confidence: 76
      }
    ]);

    setIsLoading(false);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getInsightColor = (type: string): string => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'opportunity': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getInsightIcon = (type: string): string => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'opportunity': return '🎯';
      default: return 'ℹ️';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">📊 Advanced Analytics</h2>
            <p className="text-gray-600 mt-1">Comprehensive performance insights and AI-powered recommendations</p>
          </div>
          <button
            onClick={loadAnalytics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ⟳ Refresh Data
          </button>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '🏠' },
              { id: 'channels', label: 'Channels', icon: '📢' },
              { id: 'campaigns', label: 'Campaigns', icon: '🚀' },
              { id: 'crm', label: 'CRM', icon: '👥' },
              { id: 'insights', label: 'AI Insights', icon: '🧠' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-1 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Leads</p>
                  <p className="text-3xl font-bold">{formatNumber(analytics.summary.totalLeads)}</p>
                  <p className="text-green-100 text-sm mt-2">
                    {analytics.summary.dailyLeadVelocity} daily
                  </p>
                </div>
                <div className="text-6xl opacity-20">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Conversion Rate</p>
                  <p className="text-3xl font-bold">{analytics.summary.conversionRate.toFixed(1)}%</p>
                  <p className="text-blue-100 text-sm mt-2">
                    Avg Score: {analytics.summary.avgLeadScore.toFixed(1)}/100
                  </p>
                </div>
                <div className="text-6xl opacity-20">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Monthly Revenue</p>
                  <p className="text-3xl font-bold">{formatCurrency(analytics.summary.monthlyRevenue)}</p>
                  <p className="text-purple-100 text-sm mt-2">
                    Growth: +{analytics.summary.revenueGrowth.toFixed(1)}%
                  </p>
                </div>
                <div className="text-6xl opacity-20">💰</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Campaign ROI</p>
                  <p className="text-3xl font-bold">{analytics.campaigns.avgROI}%</p>
                  <p className="text-orange-100 text-sm mt-2">
                    {analytics.campaigns.activeCampaigns} active campaigns
                  </p>
                </div>
                <div className="text-6xl opacity-20">🚀</div>
              </div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Lead Generation Trends</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Interactive charts coming soon...</p>
            </div>
          </div>
        </div>
      )}

      {/* Channels Tab */}
      {activeTab === 'channels' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              📧 Email Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sent</span>
                <span className="font-medium">{formatNumber(analytics.channels.email.sent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Opened</span>
                <span className="font-medium">{formatNumber(analytics.channels.email.opened)} (36.8%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Clicked</span>
                <span className="font-medium">{formatNumber(analytics.channels.email.clicked)} (5.8%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Bounce Rate</span>
                <span className="font-medium text-red-600">{analytics.channels.email.bounceRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              💼 LinkedIn Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Connections Sent</span>
                <span className="font-medium">{analytics.channels.linkedin.connections}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Acceptance Rate</span>
                <span className="font-medium text-green-600">{analytics.channels.linkedin.acceptanceRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Responses</span>
                <span className="font-medium">{analytics.channels.linkedin.responses}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              💬 WhatsApp Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Messages Sent</span>
                <span className="font-medium">{formatNumber(analytics.channels.whatsapp.messages)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="font-medium text-green-600">{analytics.channels.whatsapp.responseRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cost per Message</span>
                <span className="font-medium">₹{analytics.channels.whatsapp.costPerMessage.toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              📞 Phone Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Calls Attempted</span>
                <span className="font-medium">{analytics.channels.phone.callsAttempted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Connected</span>
                <span className="font-medium">{analytics.channels.phone.connected}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Appointments</span>
                <span className="font-medium text-green-600">{analytics.channels.phone.appointments}</span>
              </div>
            </div>
          </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Campaign Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{analytics.campaigns.activeCampaigns}</div>
              <div className="text-sm text-blue-800">Active Campaigns</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{analytics.campaigns.avgROI}%</div>
              <div className="text-sm text-green-800">Average ROI</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{analytics.campaigns.totalCampaigns}</div>
              <div className="text-sm text-purple-800">Total Campaigns</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600 truncate">{analytics.campaigns.bestCampaign}</div>
              <div className="text-sm text-orange-800">Best Performing</div>
            </div>
          </div>
        </div>
      )}

      {/* CRM Tab */}
      {activeTab === 'crm' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(analytics.crm).map(([key, data]) => {
            const crmName = key.charAt(0).toUpperCase() + key.slice(1);
            const statusColor = data.status === 'synced' ? 'text-green-600' : 
                              data.status === 'pending' ? 'text-yellow-600' : 'text-red-600';
            
            return (
              <div key={key} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{crmName}</h3>
                  <div className={`w-2 h-2 rounded-full ${statusColor.replace('text-', 'bg-')}`}></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Contacts</span>
                    <span className="font-medium">{data.contacts || data.leads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Deals</span>
                    <span className="font-medium">{data.deals || data.opportunities}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Value</span>
                    <span className="font-medium">{formatCurrency(data.value || data.revenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Status</span>
                    <span className={`text-xs font-medium capitalize ${statusColor}`}>{data.status}</span>
                  </div>
                </div>
              </div>
            </option>
          })}
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div key={index} className={`border rounded-xl p-6 ${getInsightColor(insight.type)}`}>
              <div className="flex items-start space-x-3">
                <span className="text-lg">{getInsightIcon(insight.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{insight.title}</h3>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-white bg-opacity-70">
                      Impact: {insight.impact}/10
                    </span>
                  </div>
                  
                  <p className="text-sm mb-3">{insight.description}</p>
                  
                  <div className="bg-white bg-opacity-50 rounded-lg p-3">
                    <p className="text-sm font-medium mb-1">💡 Recommendation:</p>
                    <p className="text-sm">{insight.recommendation}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs">
                    <span>Confidence: {insight.confidence}%</span>
                    <span>Status: Ready to Implement</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
