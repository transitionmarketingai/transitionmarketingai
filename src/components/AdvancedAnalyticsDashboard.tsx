'use client';

import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  overview: {
    totalLeads: number;
    qualifiedLeads: number;
    conversionRate: number;
    avgCostPerLead: number;
    monthlyRevenue: number;
    roi: number;
  };
  trends: Array<{
    date: string;
    leads: number;
    cost: number;
    revenue: number;
  }>;
  campaigns: Array<{
    id: string;
    name: string;
    performance: number;
    cost: number;
    leads: number;
    roi: number;
  }>;
  insights: Array<{
    type: 'success' | 'warning' | 'opportunity';
    title: string;
    description: string;
    action: string;
  }>;
}

export default function AdvancedAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [activeTimeRange, setActiveTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('leads');

  useEffect(() => {
    // Mock data - replace with API call
    const mockData: AnalyticsData = {
      overview: {
        totalLeads: 1247,
        qualifiedLeads: 892,
        conversionRate: 14.2,
        avgCostPerLead: 26,
        monthlyRevenue: 650000,
        roi: 185
      },
      trends: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        leads: Math.floor(Math.random() * 50) + 20,
        cost: Math.floor(Math.random() * 2000) + 500,
        revenue: Math.floor(Math.random() * 15000) + 5000
      })).reverse(),
      campaigns: [
        { id: '1', name: 'Bangalore IT Startups', performance: 94, cost: 15000, leads: 234, roi: 185 },
        { id: '2', name: 'Mumbai Real Estate', performance: 78, cost: 8500, leads: 89, roi: 142 },
        { id: '3', name: 'Delhi Consulting', performance: 67, cost: 12000, leads: 156, roi: 234 },
        { id: '4', name: 'Chennai Healthcare', performance: 45, cost: 5000, leads: 45, roi: 98 }
      ],
      insights: [
        {
          type: 'success',
          title: 'ROI Above Target',
          description: 'Campaign ROI is 25% higher than industry average',
          action: 'Scale successful campaigns'
        },
        {
          type: 'opportunity',
          title: 'Untapped Market',
          description: 'Gurgaon Tech sector shows 60% higher engagement',
          action: 'Launch new campaign'
        },
        {
          type: 'warning',
          title: 'Cost Increase',
          description: 'Average CPL increased by 15% this month',
          action: 'Review targeting criteria'
        }
      ]
    };

    setData(mockData);
  }, [activeTimeRange]);

  if (!data) {
    return <div>Loading analytics...</div>;
  }

  const formatCurrency = (amount: number) => 
    `₹${amount >= 100000 ? (amount / 100000).toFixed(1) + 'L' : amount.toLocaleString()}`;

  const formatPercentage = (value: number) => `${value}%`;

  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📈 Advanced Analytics</h2>
          <p className="text-gray-600 mt-2">Deep insights into your AI lead generation performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={activeTimeRange}
            onChange={(e) => setActiveTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
            📊 Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[
          { label: 'Total Leads', value: data.overview.totalLeads.toLocaleString(), change: '+28%', color: 'blue' },
          { label: 'Qualified Leads', value: data.overview.qualifiedLeads.toLocaleString(), change: '+15%', color: 'green' },
          { label: 'Conversion Rate', value: `${data.overview.conversionRate}%`, change: '+2.1%', color: 'purple' },
          { label: 'Avg Cost/Lead', value: `₹${data.overview.avgCostPerLead}`, change: '-₹5', color: 'orange' },
          { label: 'Monthly Revenue', value: formatCurrency(data.overview.monthlyRevenue), change: '+₹1.2L', color: 'green' },
          { label: 'ROI', value: `${data.overview.roi}%`, change: '+25%', color: 'blue' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className={`text-2xl font-bold mb-1 ${
              metric.color === 'blue' ? 'text-blue-600' :
              metric.color === 'green' ? 'text-green-600' :
              metric.color === 'purple' ? 'text-purple-600' :
              metric.color === 'orange' ? 'text-orange-600' :
              'text-gray-600'
            }`}>
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
            <div className="text-xs text-green-600 font-medium">{metric.change}</div>
          </div>
        ))}
      </div>

      {/* Performance Trends Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">📊 Performance Trends</h3>
          <div className="flex space-x-2">
            {['leads', 'cost', 'revenue'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  selectedMetric === metric
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 flex items-end space-x-2 p-4 bg-gray-50 rounded-lg">
          {data.trends.map((trend, index) => {
            const maxValue = Math.max(...data.trends.map(t => 
              selectedMetric === 'leads' ? t.leads : 
              selectedMetric === 'cost' ? t.cost : 
              t.revenue
            ));
            const value = selectedMetric === 'leads' ? trend.leads : 
                         selectedMetric === 'cost' ? trend.cost : 
                         trend.revenue;
            const height = (value / maxValue) * 100;

            return (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm opacity-75 hover:opacity-100 transition-opacity relative group">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm transition-all duration-300"
                    style={{ height: `${height}%` }}
                  />
                  
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {selectedMetric === 'leads' ? value : 
                     selectedMetric === 'cost' ? `₹${value}` : 
                     `₹${formatCurrency(value)}`}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(trend.date).getDate()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">🎯 Campaign Performance</h3>
        
        <div className="space-y-4">
          {data.campaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                  campaign.performance >= 90 ? 'bg-green-500' :
                  campaign.performance >= 70 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                  {campaign.performance}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                  <p className="text-sm text-gray-600">
                    {campaign.leads} leads • {formatCurrency(campaign.cost)} spent
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{campaign.roi}% ROI</div>
                  <div className="text-xs text-gray-500">Return on Investment</div>
                </div>
                
                <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium">
                  Optimize →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">🤖 AI-Powered Insights</h3>
        
        <div className="space-y-4">
          {data.insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              insight.type === 'success' ? 'bg-green-50 border-green-200' :
              insight.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  insight.type === 'success' ? 'bg-green-100' :
                  insight.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {insight.type === 'success' ? '✅' : 
                   insight.type === 'warning' ? '⚠️' : '💡'}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    {insight.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Recommended Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { action: 'Scale Top Campaign', description: 'Increase budget for Bangalore IT campaign', priority: 'High' },
            { action: 'Launch New Market', description: 'Enter Gurgaon tech sector with 60% engagement', priority: 'High' },
            { action: 'Optimize Targeting', description: 'Reduce CPL by refining audience criteria', priority: 'Medium' }
          ].map((recommendation, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{recommendation.action}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  recommendation.priority === 'High' ? 'bg-red-100 text-red-700' :
                  recommendation.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {recommendation.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                Implement Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
