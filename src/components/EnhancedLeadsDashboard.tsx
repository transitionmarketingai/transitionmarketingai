'use client';

import React, { useState } from 'react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  source: string;
  assignedTo?: string;
  createdAt: string;
  lastActivity: string;
  tags: string[];
}

interface PipelineStage {
  id: string;
  name: string;
  leads: number;
  value: number;
  conversionRate: number;
}

const PIPELINE_STAGES = [
  { id: 'new', name: 'New Leads', color: 'gray', icon: '🆕' },
  { id: 'contacted', name: 'Contacted', color: 'blue', icon: '📞' },
  { id: 'qualified', name: 'Qualified', color: 'yellow', icon: '⭐' },
  { id: 'proposal', name: 'Proposal', color: 'purple', icon: '📋' },
  { id: 'negotiation', name: 'Negotiation', color: 'orange', icon: '🤝' },
  { id: 'closed-won', name: 'Closed Won', color: 'green', icon: '✅' },
  { id: 'closed-lost', name: 'Closed Lost', color: 'red', icon: '❌' }
];

export default function EnhancedLeadsDashboard() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample pipeline data
  const pipelineData: PipelineStage[] = [
    { id: 'new', name: 'New Leads', leads: 142, value: 284000, conversionRate: 0 },
    { id: 'contacted', name: 'Contacted', leads: 103, value: 206000, conversionRate: 72 },
    { id: 'qualified', name: 'Qualified', leads: 89, value: 178000, conversionRate: 86 },
    { id: 'proposal', name: 'Proposal', leads: 47, value: 94000, conversionRate: 53 },
    { id: 'negotiation', name: 'Negotiation', leads: 23, value: 46000, conversionRate: 49 },
    { id: 'closed-won', name: 'Closed Won', leads: 34, value: 68000, conversionRate: 148 },
    { id: 'closed-lost', name: 'Closed Lost', leads: 19, value: 38000, conversionRate: 0 }
  ];

  // Sample leads data
  const sampleLeads: Lead[] = [
    {
      id: '1',
      name: 'Rajesh Sharma',
      company: 'TechCorp Solutions',
      email: 'rajesh@techcorp.com',
      phone: '+91 98765 43210',
      score: 92,
      status: 'qualified',
      status: 'qualified',
      source: 'LinkedIn Campaign',
      assignedTo: 'John Doe',
      createdAt: '2 days ago',
      lastActivity: 'Email sent',
      tags: ['IT', 'Enterprise', 'Hot Lead']
    },
    {
      id: '2',
      name: 'Priya Singh',
      company: 'DigitalFirst Apps',
      email: 'priya@digitalfirst.com',
      phone: '+91 98765 43211',
      score: 87,
      status: 'proposal',
      source: 'Industry Template',
      assignedTo: 'Jane Smith',
      createdAt: '1 week ago',
      lastActivity: 'Proposal sent',
      tags: ['Startup', 'Mobile App', 'High Value']
    },
    {
      id: '3',
      name: 'Amit Kumar',
      company: 'NextGen Tech',
      email: 'amit@nextgen.com',
      phone::+91 98765 43212',
      score: 76,
      status: 'contacted',
      source: 'LinkedIn Campaign',
      assignedTo: 'Mike Johnson',
      createdAt: '3 days ago',
      lastActivity: 'Called',
      tags: ['Tech', 'Growing Company', 'Medium Value']
    }
  ];

  const [leads, setLeads] = useState<Lead[]>(sampleLeads);

  const getStatusIcon = (status: string) => {
    const statusIcons: Record<string, string> = {
      'new': '🆕',
      'contacted': '📞',
      'qualified': '⭐',
      'proposal': '📋',
      'negotiation': '🤝',
      'closed-won': '✅',
      'closed-lost': '❌'
    };
    return statusIcons[status] || '🔄';
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'new': 'bg-gray-50 text-gray-700 border-gray-200',
      'contacted': 'bg-blue-50 text-blue-700 border-blue-200',
      'qualified': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'proposal': 'bg-purple-50 text-purple-700 border-purple-200',
      'negotiation': 'bg-orange-50 text-orange-700 border-orange-200',
      'closed-won': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'closed-lost': 'bg-red-50 text-red-700 border-red-200'
    };
    return statusColors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const filteredLeads = leads.filter(lead => 
    filterBy === 'all' || lead.status === filterBy
  );

  return (
    <div className="space-y-8">
      {/* Enhanced Pipeline Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-4">
                  🎯
                </span>
                Lead Pipeline
              </h3>
              <p className="text-gray-600 mt-1">Track your leads through each stage of the sales process</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
            {pipelineData.map((stage) => (
              <div 
                key={stage.id}
                className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  selectedStage === stage.id 
                    ? 'border-blue-300 bg-blue-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-${stage.color}-100 to-${stage.color}-200 group-hover:scale-110 transition-transform`}>
                    <span className="text-xl">{PIPELINE_STAGES.find(s => s.id === stage.id)?.icon}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stage.leads}</div>
                  <div className="text-sm font-medium text-gray-700 mb-2">{stage.name}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">₹{(stage.value / 1000).toFixed(0)}K</div>
                  {stage.conversionRate > 0 && (
                    <div className="text-xs text-emerald-600 font-medium">{stage.conversionRate}%</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Pipeline Visualization */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-800">Pipeline Flow Analysis</h4>
              <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">Last 30 days</div>
            </div>
            <div className="space-y-4">
              {PIPELINE_STAGES.slice(0, -1).map((stage, index) => {
                const data = pipelineData.find(d => d.id === stage.id);
                const nextData = pipelineData[index + 1];
                return (
                  <div key={stage.id} className="flex items-center space-x-6">
                    <div className="w-24 text-sm font-medium text-gray-700">{stage.name}</div>
                    <div className="flex-1 flex items-center space-x-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r from-${stage.color}-400 to-${stage.color}-500 transition-all duration-1000`}
                          style={{ width: `${Math.min((data?.leads || 0) / 2, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 w-16 text-right">
                        {data?.conversionRate}%
                      </div>
                    </div>
                    <div className="w-20 text-sm font-medium text-gray-600 text-right">{data?.leads || 0} leads</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced AI Lead Scoring */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
              🧠
            </span>
            AI Lead Scoring
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-3xl font-bold text-emerald-700 mb-2">156</div>
              <div className="text-sm text-emerald-600 font-medium">Hot Leads (>80)</div>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
              <div className="text-3xl font-bold text-yellow-700 mb-2">89</div>
              <div className="text-sm text-yellow-600 font-medium">Warm Leads (60-80)</div>
            </div>
            <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-200">
              <div className="text-3xl font-bold text-red-700 mb-2">23</div>
              <div className="text-sm text-red-600 font-medium">Cold Leads (<60)</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-700 mb-2">92.3%</div>
              <div className="text-sm text-blue-600 font-medium">Accuracy Score</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md">
              Improve Scoring Model
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold">
              View Scoring History
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Leads Management */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mr-3">
                  📋
                </span>
                Leads Management
              </h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Leads</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed-won">Closed Won</option>
              </select>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md flex items-center space-x-2">
                <span>+</span>
                <span>Add Lead</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Leads Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-blue-700 font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{lead.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{lead.company}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border whitespace-nowrap ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-600 truncate">{lead.email}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)}`}>
                        {getStatusIcon(lead.status)} {lead.status.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">{lead.source}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {lead.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{lead.lastActivity}</span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a 2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7.5-5L21 3m-2 2l2 2" />
                        </svg>
                      </button>
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>
                      <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Enhanced Table View
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Activity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{lead.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)}`}>
                        {getStatusIcon(lead.status)} {lead.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.assignedTo || 'Unassigned'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.lastActivity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium">Call</button>
                        <button className="text-purple-600 hover:text-purple-700 font-medium">Email</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enhanced Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                📊
              </span>
              Lead Sources
            </h4>
          </div>
          <div className="p-6 space-y-4">
            {[
              { source: 'LinkedIn Campaigns', count: 124, percentage: 45, color: 'blue' },
              { source: 'Industry Templates', count: 89, percentage: 32, color: 'purple' },
              { source: 'Direct Website', count: 34, percentage: 12, color: 'emerald' },
              { source: 'Referrals', count: 27, percentage: 10, color: 'orange' },
              { source: 'Email Campaigns', count: 6, percentage: 2, color: 'pink' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.source}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className={`bg-gradient-to-r from-${item.color}-400 to-${item.color}-500 h-2 rounded-full transition-all duration-1000`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mr-3">
                ⚡
              </span>
              Conversion Rates
            </h4>
          </div>
          <div className="p-6 space-y-5">
            {[
              { stage: 'Lead → Contacted', rate: '72%', color: 'emerald' },
              { stage: 'Contacted → Qualified', rate: '86%', color: 'blue' },
              { stage: 'Qualified → Proposal', rate: '53%', color: 'yellow' },
              { stage: 'Proposal → Closed', rate: '49%', color: 'orange' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                <div className="flex items-center space-x-3">
                  <span className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></span>
                  <span className="text-sm font-bold text-gray-900">{item.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

