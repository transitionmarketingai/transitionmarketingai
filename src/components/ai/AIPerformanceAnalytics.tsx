'use client'

import React, { useState, useEffect } from 'react'

interface PerformanceMetrics {
  overallImprovement: number
  personalizationAccuracy: number
  automationEfficiency: number
  responseRateImprovement: number
  avgResponseTimeReduction: number
  aiUptime: number
}

interface CampaignPerformance {
  id: string
  name: string
  period: string
  baseMetrics: {
    sent: number
    opened: number
    clicked: number
    replied: number
    conversionRate: number
  }
  aiMetrics: {
    sent: number
    opened: number
    clicked: number
    replied: number
    conversionRate: number
    personalizationRate: number
  }
  improvement: {
    openRateIncrease: number
    clickRateIncrease: number
    replyRateIncrease: number
    conversionIncrease: number
  }
}

interface AITrend {
  date: string
  personalizationAccuracy: number
  automationEfficiency: number
  avgResponseTime: number
  engagementScore: number
  optimizationScore: number
}

interface AIInsight {
  id: string
  type: 'optimization' | 'pattern' | 'anomaly' | 'prediction'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  actionable: boolean
  relatedMetric: string
  suggestions: string[]
}

export default function AIPerformanceAnalytics() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'trends' | 'insights'>('overview')
  const [dateRange, setDateRange] = useState<string>('30d')
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [campaigns, setCampaigns] = useState<CampaignPerformance[]>([])
  const [trends, setTrends] = useState<AITrend[]>([])
  const [insights, setInsights] = useState<AIInsight[]>([])

  useEffect(() => {
    setMetrics({
      overallImprovement: 23.4,
      personalizationAccuracy: 89.7,
      automationEfficiency: 94.2,
      responseRateImprovement: 45.8,
      avgResponseTimeReduction: 67.3,
      aiUptime: 99.8
    })

    setCampaigns([
      {
        id: '1',
        name: 'Tech Recruitment Drive',
        period: 'Last 30 days',
        baseMetrics: {
          sent: 1200,
          opened: 360,
          clicked: 85,
          replied: 24,
          conversionRate: 2.0
        },
        aiMetrics: {
          sent: 1200,
          opened: 472,
          clicked: 142,
          replied: 43,
          conversionRate: 3.6,
          personalizationRate: 94
        },
        improvement: {
          openRateIncrease: 31.1,
          clickRateIncrease: 67.1,
          replyRateIncrease: 79.2,
          conversionIncrease: 80.0
        }
      }
    ])

    setInsights([
      {
        id: '1',
        type: 'optimization',
        title: 'Email Timing Optimization',
        description: 'AI identified optimal sending times have improved open rates by 31%',
        impact: 'high',
        confidence: 94,
        actionable: true,
        relatedMetric: 'open_rate',
        suggestions: [
          'Continue optimizing send times based on AI recommendations',
          'Test different time zones for global campaigns',
          'Monitor for seasonal variations in optimal timing'
        ]
      },
      {
        id: '2',
        type: 'pattern',
        title: 'LinkedIn Engagement Pattern',
        description: 'Tech industry leads show 67% higher engagement on LinkedIn vs email',
        impact: 'medium',
        confidence: 87,
        actionable: true,
        relatedMetric: 'engagement_rate',
        suggestions: [
          'Increase LinkedIn outreach allocation for tech campaigns',
          'Develop LinkedIn-specific templates',
          'Optimize connection request messaging'
        ]
      }
    ])
  }, [])

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">AI Performance Overview</h3>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">+{metrics?.overallImprovement}%</div>
          <div className="text-sm text-purple-700">Overall Improvement</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{metrics?.personalizationAccuracy}%</div>
          <div className="text-sm text-blue-700">Personalization Accuracy</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{metrics?.automationEfficiency}%</div>
          <div className="text-sm text-green-700">Automation Efficiency</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600">+{metrics?.responseRateImprovement}%</div>
          <div className="text-sm text-orange-700">Response Rate</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-pink-600">-{metrics?.avgResponseTimeReduction}%</div>
          <div className="text-sm text-pink-700">Response Time</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-indigo-600">{metrics?.aiUptime}%</div>
          <div className="text-sm text-indigo-700">AI Uptime</div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">AI Impact on Campaign Performance</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Improvement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">AI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {campaign.baseMetrics.conversionRate}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.aiMetrics.conversionRate}%
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      +{campaign.improvement.conversionIncrease}%
                   </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${campaign.aiMetrics.personalizationRate}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {campaign.aiMetrics.personalizationRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderCampaigns = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Campaign Performance Breakdown</h3>

      {campaigns.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{campaign.name}</h4>
              <p className="text-gray-600">{campaign.period}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                +{campaign.improvement.conversionIncrease}%
              </div>
              <div className="text-sm text-gray-600">Conversion Improvement</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">+{campaign.improvement.openRateIncrease}%</div>
              <div className="text-sm text-gray-600 mb-1">Open Rate</div>
              <div className="text-xs text-gray-500">
                {campaign.baseMetrics.opened}/{campaign.baseMetrics.sent} → {campaign.aiMetrics.opened}/{campaign.aiMetrics.sent}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">+{campaign.improvement.clickRateIncrease}%</div>
              <div className="text-sm text-gray-600 mb-1">Click Rate</div>
              <div className="text-xs text-gray-500">
                {campaign.baseMetrics.clicked} → {campaign.aiMetrics.clicked}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">+{campaign.improvement.replyRateIncrease}%</div>
              <div className="text-sm text-gray-600 mb-1">Reply Rate</div>
              <div className="text-xs text-gray-500">
                {campaign.baseMetrics.replied} → {campaign.aiMetrics.replied}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">+{campaign.improvement.conversionIncrease}%</div>
              <div className="text-sm text-gray-600 mb-1">Conversion</div>
              <div className="text-xs text-gray-500">
                {campaign.baseMetrics.conversionRate}% → {campaign.aiMetrics.conversionRate}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{campaign.aiMetrics.personalizationRate}%</div>
              <div className="topics-gray-600 mb-1">AI Personalization</div>
              <div className="text-xs text-gray-500">Content Customization</div>
            </div>
          </div>

          {/* Performance Visualization */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-3">Performance Improvement Over Time</h5>
            <div className="h-32 flex items-end space-x-2">
              {[20, 25, 35, 45, 52, 61, 68, 72, 78, 83].map((value, index) => (
                <div key={index} className="flex-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t" 
                     style={{ height: `${(value / 100) * 100}%` }}>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderTrends = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">AI Performance Trends</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personalization Accuracy Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Personalization Accuracy</h4>
          <div className="h-64 flex items-end space-x-2">
            {[85, 87, 89, 88, 91, 89, 92, 90, 94, 89].map((value, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" 
                   style={{ height: `${(value / 100) * 100}%` }}>
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">Trending upward (+{89.7 - 85}%)</div>
        </div>

        {/* Automation Efficiency Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Automation Efficiency</h4>
          <div className="h-64 flex items-end space-x-2">
            {[91, 92, 93, 95, 94, 96, 95, 97, 96, 94].map((value, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t" 
                   style={{ height: `${(value / 100) * 100}%` }}>
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">Highly efficient (94.2%)</div>
        </div>
      </div>

      {/* Response Time Improvement */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Response Time Optimization</h4>
        <div className="h-48 flex items-end space-x-2">
          {[12, 9, 7, 5, 4, 3.5, 3.2, 3.8, 3.1, 3.9].map((value, index) => (
            <div key={index} className="flex-1 bg-gradient-to-t from-red-500 to-orange-400 rounded-t flex items-end justify-center text-white text-sm">
              <span className="transform rotate-90 text-xs">{value}h</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Response time reduced by 67.3% (12h → 3.9h average)
        </div>
      </div>
    </div>
  )

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">AI-Generated Insights</h3>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          🤖 Generate Deep Insights
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {insights.map(insight => (
          <div key={insight.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  insight.type === 'optimization' ? 'bg-blue-100 text-blue-800' :
                  insight.type === 'pattern' ? 'bg-green-100 text-green-800' :
                  insight.type === 'anomaly' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                  insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.impact.toUpperCase()} IMPACT
                </span>
                <span className="text-sm text-gray-600">
                  {insight.confidence}% confidence
                </span>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h4>
            <p className="text-gray-700 mb-4">{insight.description}</p>

            {insight.actionable && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">🎯 Actionable Recommendations</h5>
                <ul className="space-y-2">
                  {insight.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex space-x-2 mt-4">
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                Apply Changes
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                Learn More
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                Save Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Performance Analytics</h3>
            <p className="text-gray-600">Advanced AI insights and optimization recommendations</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'campaigns' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'trends' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Trends
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'insights' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          AI Insights
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'campaigns' && renderCampaigns()}
      {activeTab === 'trends' && renderTrends()}
      {activeTab === 'insights' && renderInsights()}
    </div>
  )
}
