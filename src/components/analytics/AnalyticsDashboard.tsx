'use client'

import React, { useState, useEffect } from 'react'

interface Metric {
  name: string
  value: number
  change: number
  trend: 'up' | 'down'
  icon: string
  color: string
}

interface ChartData {
  date: string
  leads: number
  conversions: number
  revenue: number
  emails: number
}

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'leads' | 'revenue'>('overview')
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    setMetrics([
      {
        name: 'Total Leads Generated',
        value: 1247,
        change: 23.4,
        trend: 'up',
        icon: '🎯',
        color: 'blue'
      },
      {
        name: 'Conversion Rate',
        value: 12.8,
        change: 3.2,
        trend: 'up',
        icon: '📈',
        color: 'green'
      },
      {
        name: 'Email Open Rate',
        value: 34.2,
        change: -1.1,
        trend: 'down',
        icon: '📧',
        color: 'purple'
      },
      {
        name: 'Revenue Generated',
        value: 28450,
        change: 41.7,
        trend: 'up',
        icon: '💰',
        color: 'emerald'
      }
    ])

    setChartData([
      { date: '2024-01-01', leads: 89, conversions: 12, revenue: 2340, emails: 156 },
      { date: '2024-01-08', leads: 112, conversions: 18, revenue: 2890, emails: 189 },
      { date: '2024-01-15', leads: 134, conversions: 21, revenue: 3450, emails: 203 },
      { date: '2024-01-22', leads: 98, conversions: 15, revenue: 2780, emails: 167 },
      { date: '2024-01-29', leads: 145, conversions: 24, revenue: 3980, emails: 221 },
      { date: '2024-02-05', leads: 167, conversions: 28, revenue: 4560, emails: 245 },
      { date: '2024-02-12', leads: 123, conversions: 19, revenue: 3210, emails: 198 },
      { date: '2024-02-19', leads: 189, conversions: 32, revenue: 5230, emails: 267 },
      { date: '2024-02-26', leads: 156, conversions: 25, revenue: 4120, emails: 234 },
      { date: '2024-03-05', leads: 203, conversions: 35, revenue: 5890, emails: 298 },
      { date: '2024-03-12', leads: 178, conversions: 29, revenue: 4780, emails: 256 },
      { date: '2024-03-19', leads: 234, conversions: 41, revenue: 6740, emails: 324 }
    ])
  }, [])

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                metric.color === 'blue' ? 'bg-blue-100' :
                metric.color === 'green' ? 'bg-green-100' :
                metric.color === 'purple' ? 'bg-purple-100' :
                'bg-emerald-100'
              }`}>
                {metric.icon}
              </div>
              <div className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? '↗' : '↘'} {metric.change}%
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.name.includes('Revenue') ? `$${metric.value.toLocaleString()}` :
                 metric.name.includes('Rate') ? `${metric.value}%` :
                 metric.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">{metric.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Performance Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads Generated</h3>
          <div className="h-64 flex items-end space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-80" 
                   style={{ height: `${(data.leads / Math.max(...chartData.map(d => d.leads))) * 100}%` }}>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            {chartData.slice(0, 6).map((data, index) => (
              <span key={index}>{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            ))}
          </div>
        </div>

        {/* Conversion Rate Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate</h3>
          <div className="h-64 flex items-end space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t opacity-80" 
                   style={{ height: `${(data.conversions / Math.max(...chartData.map(d => d.conversions))) * 100}%` }}>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            {chartData.slice(0, 6).map((data, index) => (
              <span key={index}>{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
        <div className="h-48 flex items-end space-x-3">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t" 
                 style={{ height: `${(data.revenue / Math.max(...chartData.map(d => d.revenue))) * 100}%` }}>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          {chartData.slice(0, 8).map((data, index) => (
            <span key={index}>{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-6">
      {/* Performance KPIs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance KPIs</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">89.2%</div>
            <div className="text-sm text-gray-600 mb-1">Campaign Success Rate</div>
            <div className="text-xs text-green-600">+5.4% vs last month</div>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">2.3 days</div>
            <div className="text-sm text-gray-600 mb-1">Avg Response Time</div>
            <div className="text-xs text-green-600">-0.8 days vs last month</div>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">$4.27</div>
            <div className="text-sm text-gray-600 mb-1">Cost Per Acquisition</div>
            <div className="text-xs text-red-600">+0.3 vs last month</div>
          </div>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Channel Performance</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                📧
              </div>
              <div>
                <div className="font-medium">Email Campaigns</div>
                <div className="text-sm text-gray-600">Primary outreach channel</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-green-600">156% ROI</div>
              <div className="text-sm text-gray-600">847 leads</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                💼
              </div>
              <div>
                <div className="font-medium">LinkedIn Outreach</div>
                <div className="text-sm text-gray-600">Professional networking</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-green-600">142% ROI</div>
              <div className="text-sm text-gray-600">234 leads</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                🤖
              </div>
              <div>
                <div className="font-medium">AI Lead Generation</div>
                <div className="text-sm text-gray-600">Automated discovery</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-green-600">189% ROI</div>
              <div className="text-sm text-gray-600">166 leads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLeads = () => (
    <div className="space-y-6">
      {/* Lead Sources */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Sources Breakdown</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">AI Lead Generation</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">561</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email Outreach</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">349</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">LinkedIn Automation</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">187</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Website Forms</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">150</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Quality Score */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-3xl font-bold text-emerald-600 mb-2">87.3%</h3>
        <div className="text-sm text-gray-600 mb-4">Average Lead Quality Score</div>
        
        <div className="bg-gray-200 rounded-full h-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full" style={{ width: '87.3%' }}></div>
        </div>

        <div className="text-xs text-gray-600">
          <span className="font-medium">High Quality:</span> 892 leads (72%) • 
          <span className="font-medium"> Medium Quality:</span> 234 leads (19%) • 
          <span className="font-medium"> Low Quality:</span> 121 leads (9%)
        </div>
      </div>
    </div>
  )

  const renderRevenue = () => (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200 p-6">
        <h3 className="text-3xl font-bold text-emerald-900 mb-2">$28,450</h3>
        <div className="text-emerald-700 mb-4">Total Revenue Generated</div>
        <div className="text-sm text-emerald-600 flex items-center">
          <span className="mr-2">↗</span> +41.7% from last month • $4.27 average cost per lead
        </div>
      </div>

      {/* Revenue by Campaign */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Campaign</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                🚀
              </div>
              <div>
                <div className="font-medium">Tech Recruitment Drive Q1</div>
                <div className="text-sm text-gray-600">Multi-channel campaign</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-emerald-600">$12,340</div>
              <div className="text-sm text-gray-600">421 conversions</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                💼
              </div>
              <div>
                <div className="font-medium">Enterprise SaaS Outreach</div>
                <div className="text-sm text-gray-600">LinkedIn-focused campaign</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-emerald-600">$8,920</div>
              <div className="text-sm text-gray-600 ">234 conversions</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                📧
              </div>
              <div>
                <div className="font-medium">Email Newsletter Growth</div>
                <div className="text-sm text-gray-600">Content-driven campaign</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-emerald-600">$7,190</div>
                <div className="text-sm text-gray-600">189 conversions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">Performance insights and business intelligence</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">📈</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'performance' 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'leads' 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Leads Analysis
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'revenue' 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Revenue Tracking
        </button>
      </div>

      {/*Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'performance' && renderPerformance()}
      {activeTab === 'leads' && renderLeads()}
      {activeTab === 'revenue' && renderRevenue()}
    </div>
  )
}













