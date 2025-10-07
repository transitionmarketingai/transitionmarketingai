'use client';

import React, { useState } from 'react';

interface AnalyticsMetric {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon: string;
}

interface ChartDataPoint {
  period: string;
  leads: number;
  conversions: number;
  revenue: number;
}

interface SourceAttribution {
  source: string;
  leads: number;
  percentage: number;
  conversionRate: number;
  avgTime: string;
  color: string;
}

export default function AnalyticsDashboard() {
  const [activePeriod, setActivePeriod] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('overview');

  const metrics: AnalyticsMetric[] = [
    {
      title: 'Total Leads Generated',
      value: '2,847',
      change: 12.5,
      trend: 'up',
      color: 'blue',
      icon: '🎯'
    },
    {
      title: 'Conversion Rate',
      value: '14.2%',
      change: 2.1,
      trend: 'up',
      color: 'green',
      icon: '📈'
    },
    {
      title: 'Revenue Generated',
      value: '₹2.4M',
      change: 18.3,
      trend: 'up',
      color: 'purple',
      icon: '💰'
    },
    {
      title: 'Cost per Lead',
      value: '₹68',
      change: -5.2,
      trend: 'up', // Down is good for cost
      color: 'orange',
      icon: '📊'
    },
    {
      title: 'ROI',
      value: '142%',
      change: 8.7,
      trend: 'up',
      color: 'emerald',
      icon: '🚀'
    },
    {
      title: 'Response Time',
      value: '2.3 hrs',
      change: -0.8,
      trend: 'up', // Down is good for response time
      color: 'red',
      icon: '⏱️'
    }
  ];

  const chartData: ChartDataPoint[] = [
    { period: 'Week 1', leads: 342, conversions: 48, revenue: 240000 },
    { period: 'Week 2', leads: 289, conversions: 41, revenue: 205000 },
    { period: 'Week 3', leads: 456, conversions: 64, revenue: 320000 },
    { period: 'Week 4', leads: 389, conversions: 55, revenue: 275000 },
    { period: 'Current', leads: 312, conversions: 44, revenue: 220000 }
  ];

  const attributionData: SourceAttribution[] = [
    {
      source: 'LinkedIn Campaigns',
      leads: 1247,
        percentage: 44,
      conversionRate: 16.2,
      avgTime: '3.2 hrs',
      color: 'blue'
    },
    {
      source: 'Industry Templates',
      leads: 892,
        percentage: 31,
      conversionRate: 12.8,
      avgTime: '4.1 hrs',
      color: 'purple'
    },
    {
      source: 'Website Direct',
      leads: 423,
        percentage: 15,
      conversionRate: 18.9,
      avgTime: '1.8 hrs',
      color: 'green'
    },
    {
      source: 'Email Campaigns',
      leads: 189,
        percentage: 7,
      conversionRate: 11.4,
      avgTime: '5.6 hrs',
      color: 'orange'
    },
    {
      source: 'Referrals',
      leads: 96,
        percentage: 3,
      conversionRate: 22.9,
      avgTime: '0.5 hrs',
      color: 'emerald'
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
  };

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') {
      return change > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
    }
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">📊 Analytics Dashboard</h2>
          <div className="flex space-x-2">
            {[
              { id: '7d', name: 'Last 7 days' },
              { id: '30d', name: 'Last 30 days' },
              { id: '90d', name: 'Last 90 days' },
              { id: '1y', name: 'Last year' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setActivePeriod(period.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activePeriod === period.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <div className={`text-sm font-medium px-2 py-1 rounded-full ${getTrendColor(metric.trend, metric.change)}`}>
                {getTrendIcon(metric.trend)} {Math.abs(metric.change)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-gray-500">vs previous period</p>
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">📈 Leads Generated</h3>
          <div className="space-y-4">
            {chartData.map((point, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{point.period}</span>
                  <span className="text-sm font-medium text-gray-900">{point.leads} leads</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${(point.leads / Math.max(...chartData.map(d => d.leads))) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{point.conversions} conversions</span>
                  <span>₹{(point.revenue / 100000).toFixed(1)}L revenue</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Attribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">🎯 Source Attribution</h3>
          <div className="space-y-4">
            {attributionData.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`w-3 h-3 bg-${source.color}-500 rounded-full`}></span>
                  <span className="text-sm text-gray-900">{source.source}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">{source.leads} leads</span>
                  <span className="text-gray-500">{source.percentage}%</span>
                  <span className="font-medium text-gray-900">{source.conversionRate}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Attribution Pie Visual */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-3">Lead Source Distribution</div>
            <div className="flex flex-wrap gap-2">
              {attributionData.map((source, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div className={`w-3 h-3 bg-${source.color}-500 rounded-full`}></div>
                  <span className="text-xs text-gray-600">{source.source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">💰 ROI Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">142%</div>
            <div className="text-sm text-gray-600 mb-1">Overall ROI</div>
            <div className="text-xs text-green-600">↗️ +8.7% vs last month</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">₹68</div>
            <div className="text-sm text-gray-600 mb-1">Cost per Lead</div>
            <div className="text-xs text-green-600">↘️ -5.2% cost reduction</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">₹2.4M</div>
            <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
            <div className="text-xs text-green-600">↗️ +18.3% growth</div>
          </div>
        </div>

        {/* Campaign ROI Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">📊 Campaign Performance by ROI</h4>
          {[
            { campaign: 'Bangalore IT Startups', roi: 185, leads: 342, revenue: 680000 },
            { campaign: 'Mumbai Real Estate', roi: 156, leads: 267, revenue: 534000 },
            { campaign: 'Healthcare Partners', roi: 123, leads: 89, revenue: 267000 },
            { campaign: 'Delhi Consulting', roi: 98, leads: 156, revenue: 312000 }
          ].map((campaign, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-gray-900">{campaign.campaign}</div>
              </div>
              <div className="flex items-enter space-x-6 text-sm">
                <span className="text-gray-600">{campaign.leads} leads</span>
                <span className="text-gray-600">₹{(campaign.revenue / 100000).toFixed(1)}L revenue</span>
                <span className={`font-medium ${campaign.roi >= 150 ? 'text-green-600' : campaign.roi >= 100 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {campaign.roi}% ROI
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Response Time Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">⚡ Average Response Time</h4>
          <div className="space-y-3">
            {[
              { source: 'Website Contact', time: '0.5 hrs', score: 95 },
              { source: 'Referrals', time: '0.5 hrs', score: 95 },
              { source: 'LinkedIn', time: '2.1 hrs', score: 78 },
              { source: 'Email', time: '4.2 hrs', score: 65 },
              { source: 'Phone Inquiry', time: '1.0 hrs', score: 88 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-900">{item.source}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.score}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb<｜tool▁call▁begin｜>4">🎯 Conversion Pipeline</h4>
          <div className="space-y-3">
            {[
              { stage: 'Lead Generation', count: 2847, conversion: 100 },
              { stage: 'Initial Contact', count: 2034, conversion: 71.4 },
              { stage: 'Qualification', count: 1752, conversion: 86.1 },
              { stage: 'Proposal Sent', count: 890, conversion: 50.8 },
              { stage: 'Negotiation', count: 445, conversion: 50.0 },
              { stage: 'Closed Won', count: 267, conversion: 60.0 }
            ].map((stage, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                  <span className="text-sm text-gray-600">{stage.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(stage.count / 2847) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right">{stage.conversion}% conversion</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">🧠</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">AI Insights</h3>
            <p className="text-purple-100 mb-4">
              Based on your data analysis, here are our AI-powered recommendations:
            </p>
            <ul className="space-y-2 text-purple-100">
              <li>• Your LinkedIn campaigns are performing 23% better than industry average</li>
              <li>• Increasing email campaign frequency could generate 89 more leads this month:</li>
              <li>• Healthcare leads have highest conversion rate - consider expanding this segment</li>
              <li>• Response time improvement could increase conversions by 7.2%</li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              View Detailed Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
