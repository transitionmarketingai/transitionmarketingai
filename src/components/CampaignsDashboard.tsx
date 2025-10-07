'use client';

import React, { useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  type: 'smart' | 'template' | 'custom';
  status: 'active' | 'paused' | 'completed' | 'draft';
  industry: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  targetLeads: number;
  generatedLeads: number;
  conversionRate: number;
  roi: number;
  costPerLead: number;
  cities: string[];
  channels: string[];
  createdAt: string;
  assignedTo: string;
}

interface CampaignTemplate {
  id: string;
  name: string;
  industry: string;
  description: string;
  estimatedLeads: string;
  avgCostPerLead: number;
  features: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
}

const CAMPAIGN_TYPES = {
  smart: { name: 'Smart Campaigns', icon: '🧠', color: 'purple' },
  template: { name: 'Industry Templates', icon: '📋', color: 'blue' },
  custom: { name: 'Custom Campaigns', icon: '⚙️', color: 'orange' }
};

const INDUSTRY_TEMPLATES: CampaignTemplate[] = [
  {
    id: 'tech-startups',
    name: 'Bangalore IT Startups',
    industry: 'Technology & IT',
    description: 'Target growing tech startups in Bangalore seeking funding, partnerships, or growth solutions',
    estimatedLeads: '200-500/month',
    avgCostPerLead: 26,
    features: ['LinkedIn Outreach', 'Email Sequences', 'Tech Event Targeting'],
    difficulty: 'beginner',
    popularity: 95
  },
  {
    id: 'real-estate',
    name: 'Mumbai Real Estate',
    industry: 'Real Estate',
    description: 'Connect with property developers, agents, and consultants in Mumbai\'s real estate market',
    estimatedLeads: '150-400/month',
    avgCostPerLead: 24,
    features: ['Property Listing Data', 'Agent Networks', 'Investment Outreach'],
    difficulty: 'intermediate',
    popularity: 87
  },
  {
    id: 'healthcare',
    name: 'Healthcare Professionals',
    industry: 'Healthcare',
    description: 'Target doctors, clinics, hospitals, and healthcare technology providers',
    estimatedLeads: '80-250/month',
    avgCostPerLead: 32,
    features: ['Medical Directory Access', 'Healthcare Events', 'Professional Networks'],
    difficulty: 'advanced',
    popularity: 72
  }
];

export default function CampaignsDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'templates' | 'analytics'>('overview');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const sampleCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Bangalore IT Startups Q4',
      type: 'smart',
      status: 'active',
      industry: 'Technology & IT',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      budget: 50000,
      spent: 23400,
      targetLeads: 500,
      generatedLeads: 342,
      conversionRate: 12.5,
      roi: 185,
      costPerLead: 68,
      cities: ['Bangalore', 'Hyderabad'],
      channels: ['LinkedIn', 'Email'],
      createdAt: '2 weeks ago',
      assignedTo: 'John Doe'
    },
    {
      id: '2',
      name: 'Mumbai Real Estate',
      type: 'template',
      status: 'active',
      industry: 'Real Estate',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      budget: 25000,
      spent: 18400,
      targetLeads: 300,
      generatedLeads: 216,
      conversionRate: 8.2,
      roi: 142,
      costPerLead: 85,
      cities: ['Mumbai', 'Delhi', 'Pune'],
      channels: ['LinkedIn', 'Phone'],
      createdAt: '1 month ago',
      assignedTo: 'Jane Smith'
    },
    {
      id: '3',
      name: 'Healthcare Partners Custom',
      type: 'custom',
      status: 'paused',
      industry: 'Healthcare',
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      budget: 15000,
      spent: 12000,
      targetLeads: 150,
      generatedLeads: 89,
      conversionRate: 6.8,
      roi: 98,
      costPerLead: 135,
      cities: ['Mumbai', 'Delhi', 'Bangalore'],
      channels: ['Email', 'LinkedIn', 'Events'],
      createdAt: '2 months ago',
      assignedTo: 'Mike Johnson'
    }
  ];

  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);

  const getStatusColor = (status: string) => {
    const statusColors = {
      'active': 'bg-green-100 text-green-800',
      'paused': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-blue-100 text-blue-800',
      'draft': 'bg-gray-100 text-gray-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const statusIcons = {
      'active': '▶️',
      'paused': '⏸️',
      'completed': '✅',
      'draft': '📝'
    };
    return statusIcons[status as keyof typeof statusIcons] || '🔄';
  };

  const getTypeColor = (type: string) => {
    const typeColors = {
      'smart': 'text-purple-600 bg-purple-100',
      'template': 'text-blue-600 bg-blue-100',
      'custom': 'text-orange-600 bg-orange-100'
    };
    return typeColors[type as keyof typeof typeColors] || 'text-gray-600 bg-gray-100';
  };

  const filteredTemplates = selectedIndustry === 'all' 
    ? INDUSTRY_TEMPLATES 
    : INDUSTRY_TEMPLATES.filter(template => template.industry.toLowerCase().includes(selectedIndustry.toLowerCase()));

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Campaign Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Campaigns</h3>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-xs text-gray-500">vs last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+23%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Leads Generated</h3>
          <p className="text-2xl font-bold text-gray-900">647</p>
          <p className="text-xs text-gray-500">this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">-₹15</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Avg. Cost per Lead</h3>
          <p className="text-2xl font-bold text-gray-900">₹73</p>
          <p className="text-xs text-gray-500">vs industry avg ₹120</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+31%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Average ROI</h3>
          <p className="text-2xl font-bold text-gray-900">142%</p>
          <p className="text-xs text-gray-500">vs target 100%</p>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">📊 Recent Campaigns</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + Start New Campaign
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{campaign.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.industry}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(campaign.type)}`}>
                      {CAMPAIGN_TYPES[campaign.type as keyof typeof CAMPAIGN_TYPES]?.icon} {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)} {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.generatedLeads}</div>
                    <div className="text-xs text-gray-500">of {campaign.targetLeads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{campaign.costPerLead}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.roi}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">View</button>
                      <button className="text-green-600 hover:text-green-700">Edit</button>
                      <button className="text-orange-600 hover:text-orange-700">Pause</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">📈 Leads Generated Over Time</h4>
          <div className="space-y-3">
            {[
              { week: 'Week 1', leads: 89, campaigns: 'Bangalore IT' },
              { week: 'Week 2', leads: 124, campaigns: 'Mumbai Real Estate' },
              { week: 'Week 3', leads: 156, campaigns: 'Healthcare Partners' },
              { week: 'Week 4', leads: 98, campaigns: 'Delhi Consulting' },
              { week: 'Week 5', leads: 180, campaigns: 'All Campaigns' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.week}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(item.leads / 200) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{item.leads}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">💰 ROI by Campaign Type</h4>
          <div className="space-y-4">
            {[
              { type: 'Smart Campaigns', roi: 185, color: 'purple', leads: 342 },
              { type: 'Industry Templates', roi: 156, color: 'blue', leads: 267 },
              { type: 'Custom Campaigns', roi: 123, color: 'orange', leads: 89 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.type}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></span>
                    <span className="text-sm font-semibold text-gray-900">{item.roi}%</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.leads} leads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Template Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🏭 Industry Templates</h3>
          <select 
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Industries</option>
            <option value="technology">Technology & IT</option>
            <option value="real estate">Real Estate</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
          </select>
        </div>
        <p className="text-gray-600">Choose from pre-built campaign templates optimized for specific industries</p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h4>
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{template.industry}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{template.popularity}% used</div>
                <div className="text-xs text-gray-500">this month</div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{template.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Expected Leads</span>
                <span className="text-sm font-medium text-gray-900">{template.estimatedLeads}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg. Cost per Lead</span>
                <span className="text-sm font-medium text-gray-900">₹{template.avgCostPerLead}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Difficulty</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  template.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {template.difficulty}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Features:</h5>
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group-hover:bg-blue-700">
              Use This Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Campaign Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'create', name: 'Create Campaign', icon: '🚀' },
              { id: 'templates', name: 'Templates', icon: '🏭' },
              { id: 'analytics', name: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'create' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">🚀 Create New Campaign</h3>
          <p className="text-gray-600 mb-6">Choose how you want to create your lead generation campaign</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-6 border-2 border-purple-200 rounded-xl hover:border-purple-500 transition-colors">
              <div className="text-3xl mb-3">🧠</div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Campaign</h4>
              <p className="text-sm text-gray-600">AI automatically creates optimized campaigns</p>
            </button>
            <button className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 transition-colors">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-semibold text-gray-900 mb-2">Industry Template</h4>
              <p className="text-sm text-gray-600">Use pre-built industry-specific templates</p>
            </button>
            <button className="p-6 border-2 border-orange-200 rounded-xl hover:border-orange-500 transition-colors">
              <div className="text-3xl mb-3">⚙️</div>
              <h4 className="font-semibold text-gray-900 mb-2">Custom Campaign</h4>
              <p className="text-sm text-gray-600">Build from scratch with full control</p>
            </button>
          </div>
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">📈 Campaign Analytics</h3>
          <p className="text-gray-600">Advanced analytics and performance insights coming soon</p>
        </div>
      )}
    </div>
  );
}

