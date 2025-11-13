'use client'

import React, { useState, useEffect } from 'react'

interface Campaign {
  id: string
  name: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  type: 'email' | 'linkedin' | 'multi-channel'
  leadsTargeted: number
  leadsGenerated: number
  conversionRate: number
  startDate: string
  endDate: string
  budget: number
  costPerLead: number
  roi: number
}

export default function CampaignManager() {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'analytics'>('overview')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    // Initialize with sample campaigns
    setCampaigns([
      {
        id: '1',
        name: 'Tech Recruitment Drive Q1',
        status: 'active',
        type: 'multi-channel',
        leadsTargeted: 1000,
        leadsGenerated: 847,
        conversionRate: 12.4,
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        budget: 5000,
        costPerLead: 5.92,
        roi: 187.2
      },
      {
        id: '2',
        name: 'Enterprise SaaS Outreach',
        status: 'active',
        type: 'linkedin',
        leadsTargeted: 500,
        leadsGenerated: 234,
        conversionRate: 8.7,
        startDate: '2024-02-15',
        endDate: '2024-04-15',
        budget: 2500,
        costPerLead: 10.68,
        roi: 142.8
      },
      {
        id: '3',
        name: 'Email Newsletter Growth',
        status: 'completed',
        type: 'email',
        leadsTargeted: 2000,
        leadsGenerated: 1891,
        conversionRate: 15.3,
        startDate: '2024-01-01',
        endDate: '2024-02-29',
        budget: 1200,
        costPerLead: 0.63,
        roi: 320.4
      }
    ])
  }, [])

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Campaign Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Active Campaigns</span>
            <span className="text-blue-600">🚀</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">2</div>
          <div className="text-xs text-blue-600 mt-1">Running now</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Total Leads</span>
            <span className="text-green-600">📈</span>
          </div>
          <div className="text-2xl font-bold text-green-900">2,972</div>
          <div className="text-xs text-green-600 mt-1">This quarter</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">Avg. ROI</span>
            <span className="text-purple-600">💰</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">216%</div>
          <div className="text-xs text-purple-600 mt-1">All campaigns</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-700">Cost/Lead</span>
            <span className="text-orange-600">💵</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">$5.73</div>
          <div className="text-xs text-orange-600 mt-1">Average cost</div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Campaigns</h3>
            <p className="text-sm text-gray-600">Manage and track your marketing campaigns</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Campaign
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">Budget: ${campaign.budget.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.leadsGenerated}/{campaign.leadsTargeted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.conversionRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`font-medium ${campaign.roi > 150 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {campaign.roi}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="text-blue-600 hover:text-blue-700 mr-3"
                    >
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-700">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderCreate = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter campaign name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="email">Email Campaign</option>
              <option value="linkedin">LinkedIn Outreach</option>
              <option value="multi-channel">Multi-Channel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Tech Startups, SaaS Companies"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$5,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Analytics</h3>
        
        <div className="h-64 flex items-end space-x-3">
          {[84, 95, 112, 127, 141, 156, 189, 203, 187, 234, 198, 216].map((value, index) => (
            <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" 
                 style={{ height: `${(value / 250) * 100}%` }}>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaign Manager</h3>
            <p className="text-gray-600">Create, manage, and optimize marketing campaigns</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">🚀</span>
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
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'create' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Create Campaign
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'analytics' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'create' && renderCreate()}
      {activeTab === 'analytics' && renderAnalytics()}

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold text-gray-900">{selectedCampaign.name}</h4>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Status</label>
                <div className="font-medium">{selectedCampaign.status}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Type</label>
                <div className="font-medium">{selectedCampaign.type}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Leads Generated</label>
                <div className="font-medium">{selectedCampaign.leadsGenerated}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Conversion Rate</label>
                <div className="font-medium">{selectedCampaign.conversionRate}%</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">ROI</label>
                <div className="font-medium text-green-600">{selectedCampaign.roi}%</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="text-sm text-gray-600">Cost per Lead</label>
                <div className="font-medium">${selectedCampaign.costPerLead}</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}















