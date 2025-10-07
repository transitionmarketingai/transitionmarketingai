'use client'

import React, { useState, useEffect } from 'react'

interface RevenueMetrics {
  totalRevenue: number
  monthlyRevenue: number
  revenueGrowth: number
  monthlyActiveUsers: number
  averageRevenuePerUser: number
  churnRate: number
  customerLifetimeValue: number
}

interface RevenueDataPoint {
  date: string
  revenue: number
  users: number
  conversions: number
  churnCount: number
}

interface TopCustomers {
  name: string
  email: string
  joinDate: string
  totalSpent: number
  planType: string
  status: 'active' | 'churned' | 'pending'
  lastActivity: string
}

interface PaymentMethod {
  type: 'card' | 'paypal' | 'bank'
  brand?: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
}

export default function RevenueAnalytics() {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'customers' | 'metrics'>('overview')
  const [dateRange, setDateRange] = useState<string>('30d')
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics | null>(null)
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([])
  const [topCustomers, setTopCustomers] = useState<TopCustomers[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  useEffect(() => {
    setRevenueMetrics({
      totalRevenue: 125847.50,
      monthlyRevenue: 12447.50,
      revenueGrowth: 23.4,
      monthlyActiveUsers: 1247,
      averageRevenuePerUser: 148.73,
      churnRate: 5.2,
      customerLifetimeValue: 1184.50
    })

    setRevenueData([
      { date: '2024-03-01', revenue: 8947, users: 1203, conversions: 47, churnCount: 23 },
      { date: '2024-03-08', revenue: 9623, users: 1234, conversions: 52, churnCount: 18 },
      { date: '2024-03-15', revenue: 10145, users: 1267, conversions: 61, churnCount: 14 },
      { date: '2024-03-22', revenue: 10987, users: 1298, conversions: 68, churnCount: 11 },
      { date: '2024-03-29', revenue: 12447, users: 1345, conversions: 81, churnCount: 9 }
    ])

    setTopCustomers([
      {
        name: 'TechCorp Solutions',
        email: 'billing@techcorp.com',
        joinDate: '2023-01-15',
        totalSpent: 8890.50,
        planType: 'Enterprise',
        status: 'active',
        lastActivity: '2024-03-15T10:30:00Z'
      },
      {
        name: 'Growth Marketing Inc',
        email: 'finance@growthmkting.com',
        joinDate: '2023-06-08',
        totalSpent: 6347.25,
        planType: 'Professional',
        status: 'active',
        lastActivity: '2024-03-14T14:22:00Z'
      },
      {
        name: 'StartupXYZ',
        email: 'admin@startupxyz.io',
        joinDate: '2023-03-20',
        totalSpent: 4472.00,
        planType: 'Professional',
        status: 'active',
        lastActivity: '2024-03-10T09:15:00Z'
      },
      {
        name: 'Digital Agency Pro',
        email: 'billing@digitalpro.com',
        joinDate: '2023-08-12',
        totalSpent: 3124.75,
        planType: 'Starter',
        status: 'churned',
        lastActivity: '2024-02-28T17:45:00Z'
      }
    ])

    setPaymentMethods([
      { type: 'card', brand: 'visa', last4: '4242', expiryMonth: 12, expiryYear: 2025 },
      { type: 'paypal' },
      { type: 'card', brand: 'mastercard', last4: '1234', expiryMonth: 8, expiryYear: 2026 }
    ])
  }, [])

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Revenue Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Total Revenue</span>
            <span className="text-green-600">💰</span>
          </div>
          <div className="text-2xl font-bold text-green-900">
            ${revenueMetrics?.totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">All time</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Monthly Revenue</span>
            <span className="text-blue-600">📈</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">
            ${revenueMetrics?.monthlyRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-blue-600 mt-1">+{revenueMetrics?.revenueGrowth}% growth</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">ARPU</span>
            <span className="text-purple-600">👤</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            ${revenueMetrics?.averageRevenuePerUser.toFixed(2)}
          </div>
          <div className="text-xs text-purple-600 mt-1">Average per user</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-700">MAU</span>
            <span className="text-orange-600">🔥</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {revenueMetrics?.monthlyActiveUsers.toLocaleString()}
          </div>
          <div className="text-xs text-orange-600 mt-1">Active users</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Customer LTV</span>
            <span className="text-gray-600">💎</span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            ${revenueMetrics?.customerLifetimeValue.toFixed(2)}
          </div>
          <div className="text-xs text-gray-600 mt-1">Lifetime value</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Churn Rate</span>
            <span className="text-gray-600">📉</span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {revenueMetrics?.churnRate}%
          </div>
          <div className="text-xs text-gray-600 mt-1">Monthly churn</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Growth Rate</span>
            <span className="text-gray-600">🚀</span>
          </div>
          <div className="text-xl font-bold text-green-600">
            +{revenueMetrics?.revenueGrowth}%
          </div>
          <div className="text-xs text-gray-600 mt-1">Month over month</div>
        </div>
      </div>

      {/* Revenue Trends Mini Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend (30 Days)</h3>
        <div className="h-32 flex items-end space-x-2">
          {revenueData.map((point, index) => (
            <div key={index} className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t flex items-end justify-center">
              <span className="text-white text-xs font-medium mb-1">${(point.revenue/1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          {revenueData.map((point, index) => (
            <span key={index}>{new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          ))}
        </div>
      </div>

      {/* Recent Major Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Major Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {topCustomers.slice(0, 3).map(customer => (
            <div key={customer.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">
                    {customer.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  <div className="text-xs text-gray-600">{customer.planType} Plan</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  ${customer.totalSpent.toFixed(2)}
                </div>
                <div className="text-xs text-gray-600">
                  {new Date(customer.lastActivity).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTrends = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Detailed Revenue Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Revenue Over Time</h4>
        <div className="h-64 flex items-end space-x-3">
          {revenueData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t mb-1"
                style={{ height: `${(point.revenue / Math.max(...revenueData.map(d => d.revenue))) * 200}px` }}
                title={`$${point.revenue.toLocaleString()}`}
              ></div>
              <span className="text-xs text-gray-600">
                {new Date(point).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">User Growth</h4>
          <div className="h-48 flex items-end space-x-2">
            {revenueData.map((point, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" 
                   style={{ height: `${(point.users / Math.max(...revenueData.map(d => d.users))) * 150}px` }}>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Conversion Rate</h4>
          <div className="h-48 flex items-end space-x-2">
            {revenueData.map((point, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t" 
                   style={{ height: `${(point.conversions / Math.max(...revenueData.map(d => d.conversions))) * 150}px` }}>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Customer Analytics</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Export Customer Data
        </button>
      </div>

      {/* Customer Segments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Active Customers</span>
            <span className="text-green-600">✅</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">87</div>
          <div className="text-xs text-gray-600 mt-1">High engagement</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">At Risk</span>
            <span className="text-yellow-600">⚠️</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">12</div>
          <div className="text-xs text-gray-600 mt-1">Low activity</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Churned</span>
            <span className="text-red-600">❌</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">23</div>
          <div className="text-xs text-gray-600 mt-1">This month</div>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Top Revenue Customers</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCustomers.map((customer, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">
                          {customer.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.planType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' :
                      customer.status === 'churned' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(customer.lastActivity).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderMetrics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Metrics</h3>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Generate Report
        </button>
      </div>

      {/* ARPU and LTV */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Revenue Per User Trends</h4>
          <div className="h-48 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current ARPU</span>
              <span className="text-xl font-bold text-gray-900">${revenueMetrics?.averageRevenuePerUser.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Target ARPU</span>
              <span className="text-xl font-bold text-green-600">$180.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Gap</span>
              <span className="text-xl font-bold text-yellow-600">
                ${(180 - (revenueMetrics?.averageRevenuePerUser || 0)).toFixed(2)}
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                style={{ width: `${((revenueMetrics?.averageRevenuePerUser || 0) / 180) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Churn Analysis</h4>
          <div className="h-48 flex items-end space-x-2">
            {revenueData.map((point, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t mb-1"
                  style={{ height: `${(point.churnCount / Math.max(...revenueData.map(d => d.churnCount))) * 150}px` }}
                  title={`${point.churnCount} churns`}
                ></div>
                <span className="text-xs text-gray-600 transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                  {point.churnCount}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-gray-600">Churn Trend: Decreasing 📉</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Payment Methods Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">💳</div>
            <div className="text-2xl font-bold text-gray-900">73%</div>
            <div className="text-sm text-gray-600">Credit Cards</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🏦</div>
            <div className="text-2xl font-bold text-gray-900">19%</div>
            <div className="text-sm text-gray-600">Bank Transfer</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📧</div>
            <div className="text-2xl font-bold text-gray-900">6%</div>
            <div className="text-sm text-gray-600">PayPal</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📱</div>
            <div className="text-2xl font-bold text-gray-900">2%</div>
            <div className="text-sm text-gray-600">Other</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-green-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Analytics</h3>
            <p className="text-gray-600">Comprehensive revenue tracking and customer insights</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-green-100 rounded-2xl flex items-center justify-center">
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
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'customers' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Customers
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'metrics' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Advanced Metrics
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'trends' && renderTrends()}
      {activeTab === 'customers' && renderCustomers()}
      {activeTab === 'metrics' && renderMetrics()}
    </div>
  )
}
