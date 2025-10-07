'use client'

import React, { useState, useEffect } from 'react'

interface CreditBalance {
  available: number
  used: number
  total: number
  pending: number
  expires: string | null
}

interface CreditTransaction {
  id: string
  amount: number
  type: 'purchase' | 'bonus' | 'consumption' | 'refund'
  description: string
  timestamp: string
  balanceBefore: number
  balanceAfter: number
  campaignId?: string
  status: 'completed' | 'pending' | 'failed'
}

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'monthly' | 'yearly'
  credits: number
  features: string[]
  popular?: boolean
  current?: boolean
}

interface UsageStats {
  emailsSent: number
  aiPersonalizations: number
  linkedinActions: number
  campaignsRun: number
  totalCost: number
  savingsThisMonth: number
}

interface BillingHistory {
  id: string
  date: string
  description: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  invoiceId: string
  receiptUrl?: string
}

export default function CreditManagementDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'billing' | 'plans'>('overview')
  const [creditBalance, setCreditBalance] = useState<CreditBalance | null>(null)
  const [transactions, setTransactions] = useState<CreditTransaction[]>([])
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([])
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([])
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  useEffect(() => {
    // Initialize data
    setCreditBalance({
      available: 1250,
      used: 4890,
      total: 10000,
      pending: 150,
      expires: '2024-04-15T23:59:59Z'
    })

    setTransactions([
      {
        id: '1',
        amount: -500,
       type: 'consumption',
        description: 'AI Lead Generation Campaign - March Tech Recruitment',
        timestamp: '2024-03-15T10:30:00Z',
        balanceBefore: 1750,
        balanceAfter: 1250,
        campaignId: 'campaign_1',
        status: 'completed'
      },
      {
        id: '2',
        amount: 1000,
        type: 'bonus',
        description: 'Welcome Bonus for New Features',
        timestamp: '2024-03-10T09:00:00Z',
        balanceBefore: 750,
        balanceAfter: 1750,
        status: 'completed'
      },
      {
        id: '3',
        amount: 150,
        type: 'purchase',
        description: 'Additional Credits Purchase',
        timestamp: '2024-03-05T14:22:00Z',
        balanceBefore: 600,
        balanceAfter: 750,
        status: 'completed'
      }
    ])

    setSubscriptionPlans([
      {
        id: 'starter',
        name: 'Starter',
        price: 49,
        currency: 'USD',
        interval: 'monthly',
        credits: 1000,
        features: [
          '1,000 credits/month',
          'Basic AI personalization',
          'Email campaigns',
          'Basic analytics'
        ],
        current: true
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 149,
        currency: 'USD',
        interval: 'monthly',
        credits: 5000,
        features: [
          '5,000 credits/month',
          'Advanced AI personalization',
          'Multi-channel campaigns',
          'LinkedIn automation',
          'Advanced analytics',
          'Priority support'
        ],
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 399,
        currency: 'USD',
        interval: 'monthly',
        credits: 20000,
        features: [
          '20,000 credits/month',
          'Enterprise AI features',
          'Custom integrations',
          'White-label options',
          'Dedicated account manager',
          'Custom pricing'
        ]
      }
    ])

    setUsageStats({
      emailsSent: 1247,
      aiPersonalizations: 234,
      linkedinActions: 156,
      campaignsRun: 12,
      totalCost: 4890,
      savingsThisMonth: 2300
    })

    setBillingHistory([
      {
        id: '1',
        date: '2024-03-01T00:00:00Z',
        description: 'Starter Plan - March 2024',
        amount: 49.00,
        status: 'paid',
        invoiceId: 'INV-2024-001',
        receiptUrl: '/receipts/march-2024.pdf'
      },
      {
        id: '2',
        date: '2024-03-05T14:22:00Z',
        description: 'Additional Credits - 150 Credits',
        amount: 15.00,
        status: 'paid',
        invoiceId: 'INV-2024-002'
      },
      {
        id: '3',
        date: '2024-02-01T00:00:00Z',
        description: 'Starter Plan - February 2024',
        amount: 49.00,
        status: 'paid',
        invoiceId: 'INV-2024-003',
        receiptUrl: '/receipts/february-2024.pdf'
      }
    ])
  }, [])

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Credit Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Available Credits</span>
            <span className="text-blue-600">💰</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{creditBalance?.available.toLocaleString()}</div>
          <div className="text-xs text-blue-600 mt-1">Ready to use</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Credits Used</span>
            <span className="text-green-600">📊</span>
          </div>
          <div className="text-2xl font-bold text-green-900">{creditBalance?.used.toLocaleString()}</div>
          <div className="text-xs text-green-600 mt-1">This month</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">Pending Credits</span>
            <span className="text-purple-600">⏳</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{creditBalance?.pending.toLocaleString()}</div>
          <div className="text-xs text-purple-600 mt-1">Processing</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-700">Plan Credits</span>
            <span className="text-orange-600">🎯</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">{creditBalance?.total.toLocaleString()}</div>
          <div className="text-xs text-orange-600 mt-1">Per month</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowPurchaseModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            💳 Purchase Credits
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            📄 View Invoices
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            🔄 Upgrade Plan
          </button>
        </div>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h3>
        {subscriptionPlans.find(plan => plan.current) && (
          <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {subscriptionPlans.find(plan => plan.current)?.name} Plan
                </h4>
                <p className="text-gray-600">
                  ${subscriptionPlans.find(plan => plan.current)?.price}/month • 
                  {subscriptionPlans.find(plan => plan.current)?.credits.toLocaleString()} credits included
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Next billing</div>
                <div className="font-medium text-gray-900">April 1, 2024</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  transaction.type === 'consumption' ? 'bg-red-100 text-red-600' :
                  transaction.type === 'purchase' ? 'bg-green-100 text-white' :
                  transaction.type === 'bonus' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {transaction.type === 'consumption' ? '⬇' : 
                   transaction.type === 'purchase' ? '💰' :
                   transaction.type === 'bonus' ? '🎁' : '↩'}
                </span>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  <div className="text-xs text-gray-600">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <span className={`text-sm font-medium ${
                transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount} credits
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderUsage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Credit Usage Analytics</h3>
        <select className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Feature Usage</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email Campaigns</span>
              <span className="font-medium">{usageStats?.emailsSent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">AI Personalization</span>
              <span className="font-medium">{usageStats?.aiPersonalizations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">LinkedIn Actions</span>
              <span className="font-medium">{usageStats?.linkedinActions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Campaigns Run</span>
              <span className="font-medium">{usageStats?.campaignsRun}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Cost Summary</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Credits Used</span>
              <span className="font-medium">{usageStats?.totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Value</span>
              <span className="font-medium text-green-600">${((usageStats?.totalCost || 0) * 0.01).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-gray-600">Savings This Month</span>
              <span className="font-medium text-green-600">${usageStats?.savingsThisMonth.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Top Features</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email Automation</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm text-gray-600">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AI Personalization</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-sm text-gray-600">60%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">LinkedIn Outreach</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-sm text-gray-600">35%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Trends Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Credit Usage Trends</h4>
        <div className="h-64 flex items-end space-x-2">
          {[120, 180, 220, 190, 280, 320, 290, 340, 310, 380, 420, 489].map((value, index) => (
            <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" 
                 style={{ height: `${(value / 500) * 100}%` }}>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  )

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Download Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {billingHistory.map(bill => (
              <tr key={bill.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(bill.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{bill.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${bill.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bill.status === 'paid' ? 'bg-green-100 text-green-800' :
                    bill.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bill.invoiceId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">View</button>
                    {bill.receiptUrl && (
                      <button className="text-green-600 hover:text-green-700">Receipt</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPlans = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Choose Your Plan</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button className="px-3 py-1 text-sm bg-white rounded shadow-sm">Monthly</button>
          <button className="px-3 py-1 text-sm text-gray-600">Yearly (Save 20%)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map(plan => (
          <div key={plan.id} className={`bg-white rounded-lg border-2 p-6 relative ${
            plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
          }`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-gray-900">{plan.name}</h4>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/{plan.interval}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {plan.credits.toLocaleString()} credits included
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-center">
              {plan.current ? (
                <button disabled className="w-full py-2 px-4 bg-gray-100 text-gray-400 rounded-lg">
                  Current Plan
                </button>
              ) : plan.popular ? (
                <button
                  onClick={() => {
                    setSelectedPlan(plan.id)
                    // Handle upgrade logic
                  }}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Upgrade Plan
                </button>
              ) : (
                <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  {plan.id === 'starter' ? 'Downgrade' : 'Choose Plan'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Credit Management</h3>
            <p className="text-gray-600">Track usage, manage billing, and optimize your plan</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }>`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('usage')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'usage' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }>`}
        >
          Usage Analytics
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'billing' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }>`}
        >
          Billing History
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'plans' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }>`}
        >
          Plans
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'usage' && renderUsage()}
      {activeTab === 'billing' && renderBilling()}
      {activeTab === 'plans' && renderPlans()}

      {/* Purchase Credits Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold text-gray-900">Purchase Credits</h4>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Package
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="500">500 Credits - $50</option>
                  <option value="1000">1,000 Credits - $90 (Save $10)</option>
                  <option value="2500">2,500 Credits - $200 (Save $50)</option>
                  <option value="5000">5,000 Credits - $350 (Save $150)</option>
                </select>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                  <strong>Current Balance:</strong> {creditBalance?.available.toLocaleString()} credits
                </div>
                <div className="text-sm text-blue-600">
                  Credits never expire and can be used for any feature
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                💳 Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
