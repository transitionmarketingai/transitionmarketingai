'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Types
type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  source: string;
  created_at: string;
  score: number;
};

type Campaign = {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  leads: number;
  budget: number;
  spent: number;
  ctr: number;
  cpc: number;
};

type Analytics = {
  totalLeads: number;
  newLeads: number;
  conversionRate: number;
  revenue: number;
  topSources: Array<{ source: string; count: number }>;
  recentActivity: Array<{ action: string; time: string; user: string }>;
};

// Mock data
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@techstartup.com',
    company: 'TechStartup Pvt Ltd',
    status: 'new',
    source: 'LinkedIn',
    created_at: '2024-01-15T10:30:00Z',
    score: 85
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@healthcare.com',
    company: 'HealthCare Solutions',
    status: 'contacted',
    source: 'Google Ads',
    created_at: '2024-01-14T14:20:00Z',
    score: 92
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit@fintech.com',
    company: 'FinTech Innovations',
    status: 'qualified',
    source: 'Facebook',
    created_at: '2024-01-13T09:15:00Z',
    score: 78
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    email: 'sneha@ecommerce.com',
    company: 'E-Commerce Plus',
    status: 'converted',
    source: 'Email',
    created_at: '2024-01-12T16:45:00Z',
    score: 95
  }
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'LinkedIn Lead Gen',
    status: 'active',
    leads: 45,
    budget: 50000,
    spent: 32000,
    ctr: 3.2,
    cpc: 45
  },
  {
    id: '2',
    name: 'Google Ads Campaign',
    status: 'active',
    leads: 32,
    budget: 75000,
    spent: 48000,
    ctr: 2.8,
    cpc: 52
  },
  {
    id: '3',
    name: 'Facebook Outreach',
    status: 'paused',
    leads: 28,
    budget: 30000,
    spent: 18000,
    ctr: 4.1,
    cpc: 38
  }
];

const mockAnalytics: Analytics = {
  totalLeads: 1247,
  newLeads: 89,
  conversionRate: 12.3,
  revenue: 156000,
  topSources: [
    { source: 'LinkedIn', count: 45 },
    { source: 'Google Ads', count: 32 },
    { source: 'Facebook', count: 28 },
    { source: 'Email', count: 15 }
  ],
  recentActivity: [
    { action: 'New lead added', time: '2 hours ago', user: 'Lead Finder Agent' },
    { action: 'Campaign optimized', time: '4 hours ago', user: 'Campaign Manager' },
    { action: 'Content published', time: '6 hours ago', user: 'Content Creator' }
  ]
};

// Sidebar Component
function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'leads', label: 'Leads', icon: '🎯' },
    { id: 'campaigns', label: 'Campaigns', icon: '📢' },
    { id: 'content', label: 'Content', icon: '✍️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Transition AI</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// KPI Cards Component
function KPICards({ analytics }: { analytics: Analytics }) {
  const kpis = [
    {
      title: 'Total Leads',
      value: analytics.totalLeads.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: '🎯'
    },
    {
      title: 'New This Month',
      value: analytics.newLeads.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: '📈'
    },
    {
      title: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      change: '+2.1%',
      trend: 'up',
      icon: '💯'
    },
    {
      title: 'Revenue',
      value: `₹${(analytics.revenue / 1000).toFixed(0)}K`,
      change: '+23.1%',
      trend: 'up',
      icon: '💰'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl">{kpi.icon}</div>
            <div className={`text-sm font-medium ${
              kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {kpi.change}
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{kpi.value}</div>
          <div className="text-gray-400 text-sm">{kpi.title}</div>
        </div>
      ))}
    </div>
  );
}

// Leads Table Component
function LeadsTable({ leads }: { leads: Lead[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'qualified': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'converted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-bold text-white">Leads Table</h3>
        <p className="text-gray-400 text-sm mt-1">Manage and track your leads</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white">{lead.name}</div>
                    <div className="text-sm text-gray-400">{lead.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{lead.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{lead.source}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-white mr-2">{lead.score}</div>
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                        style={{ width: `${lead.score}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Campaigns List Component
function CampaignsList({ campaigns }: { campaigns: Campaign[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-xl font-bold text-white">Campaigns List</h3>
        <p className="text-gray-400 text-sm mt-1">Active and paused campaigns</p>
      </div>
      
      <div className="p-6 space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">{campaign.name}</h4>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Leads</div>
                <div className="text-white font-medium">{campaign.leads}</div>
              </div>
              <div>
                <div className="text-gray-400">Budget</div>
                <div className="text-white font-medium">₹{campaign.budget.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400">CTR</div>
                <div className="text-white font-medium">{campaign.ctr}%</div>
              </div>
              <div>
                <div className="text-gray-400">CPC</div>
                <div className="text-white font-medium">₹{campaign.cpc}</div>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Spent</span>
                <span>₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                  style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Filters Component
function Filters() {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Source</label>
          <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">All Sources</option>
            <option value="linkedin">LinkedIn</option>
            <option value="google">Google Ads</option>
            <option value="facebook">Facebook</option>
            <option value="email">Email</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
          <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
        
        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

// Right Drawer Component
function RightDrawer({ selectedLead, onClose }: { selectedLead: Lead | null; onClose: () => void }) {
  if (!selectedLead) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-sm border-l border-gray-800 shadow-2xl">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Lead Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">{selectedLead.name}</h4>
            <p className="text-gray-400">{selectedLead.email}</p>
            <p className="text-gray-400">{selectedLead.company}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {selectedLead.status}
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Source</label>
              <p className="text-white">{selectedLead.source}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Lead Score</label>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-white mr-3">{selectedLead.score}</div>
                <div className="w-32 bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full" 
                    style={{ width: `${selectedLead.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Created</label>
              <p className="text-white">{new Date(selectedLead.created_at).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Contact Lead
            </button>
            <button className="w-full px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200">
              Add to Campaign
            </button>
            <button className="w-full px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [analytics, setAnalytics] = useState<Analytics>(mockAnalytics);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <KPICards analytics={analytics} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LeadsTable leads={leads} />
              <CampaignsList campaigns={campaigns} />
            </div>
          </div>
        );
      case 'leads':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <LeadsTable leads={leads} />
            </div>
            <div>
              <Filters />
            </div>
          </div>
        );
      case 'campaigns':
        return <CampaignsList campaigns={campaigns} />;
      case 'content':
        return (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-6xl mb-4">✍️</div>
            <h3 className="text-2xl font-bold text-white mb-4">Content Creator</h3>
            <p className="text-gray-400 mb-8">AI-powered content creation coming soon</p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Generate Content
            </button>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-white mb-4">Analytics Dashboard</h3>
            <p className="text-gray-400 mb-8">Advanced analytics and reporting coming soon</p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              View Reports
            </button>
          </div>
        );
      case 'integrations':
        return (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-6xl mb-4">🔗</div>
            <h3 className="text-2xl font-bold text-white mb-4">Integrations</h3>
            <p className="text-gray-400 mb-8">Connect your favorite tools and platforms</p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Manage Integrations
            </button>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h3 className="text-2xl font-bold text-white mb-4">Settings</h3>
            <p className="text-gray-400 mb-8">Configure your account and preferences</p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Open Settings
            </button>
          </div>
        );
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening with your marketing.</p>
          </div>
          
          {renderContent()}
        </div>
      </div>
      
      <RightDrawer selectedLead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}
