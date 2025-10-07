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
  { id: 'new', name: 'New Leads', color: 'gray' },
  { id: 'contacted', name: 'Contacted', color: 'blue' },
  { id: 'qualified', name: 'Qualified', color: 'yellow' },
  { id: 'proposal', name: 'Proposal', color: 'purple' },
  { id: 'negotiation', name: 'Negotiation', color: 'orange' },
  { id: 'closed-won', name: 'Closed Won', color: 'green' },
  { id: 'closed-lost', name: 'Closed Lost', color: 'red' }
];

export default function LeadsDashboard() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<string>('all');

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
      phone: '+91 98765 43212',
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
      'new': 'bg-gray-100 text-gray-800',
      'contacted': 'bg-blue-100 text-blue-800',
      'qualified': 'bg-yellow-100 text-yellow-800',
      'proposal': 'bg-purple-100 text-purple-800',
      'negotiation': 'bg-orange-100 text-orange-800',
      'closed-won': 'bg-green-100 text-green-800',
      'closed-lost': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredLeads = leads.filter(lead => 
    filterBy === 'all' || lead.status === filterBy
  );

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">🎯 Lead Pipeline</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
          {pipelineData.map((stage) => (
            <div 
              key={stage.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedStage === stage.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stage.leads}</div>
                <div className="text-sm text-gray-600 mb-2">{stage.name}</div>
                <div className="text-sm font-medium text-gray-900">₹{(stage.value / 1000).toFixed(0)}K</div>
                {stage.conversionRate > 0 && (
                  <div className="text-xs text-green-600 mt-1">{stage.conversionRate}%</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Visualization */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Pipeline Flow</span>
            <span className="text-sm text-gray-500">Last 30 days</span>
          </div>
          <div className="space-y-2">
            {PIPELINE_STAGES.slice(0, -1).map((stage, index) => {
              const data = pipelineData.find(d => d.id === stage.id);
              const nextData = pipelineData[index + 1];
              return (
                <div key={stage.id} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-gray-600">{stage.name}</div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                      <div 
                        className={`h-2 rounded-full bg-${stage.color}-500`}
                        style={{ width: `${(data?.leads || 0) / 1.5}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 w-12 text-right">
                      {data?.conversionRate}%
                    </div>
                  </div>
                  <div className="w-16 text-sm text-gray-600 text-right">{data?.leads || 0} leads</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Lead Scoring */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🧠 AI Lead Scoring</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600">Hot Leads (>80)</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">89</div>
            <div className="text-sm text-gray-600">Warm Leads (60-80)</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">23</div>
            <div className="text-sm text-gray-600">Cold Leads (<60)</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">92.3%</div>
            <div className="text-sm text-gray-600">Accuracy Score</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Improve Scoring Model
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            View Scoring History
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">📋 Leads Management</h3>
            <div className="flex items-center space-x-4">
              <select 
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Leads</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed-won">Closed Won</option>
              </select>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                + Add Lead
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{lead.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {getStatusIcon(lead.status)} {lead.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.assignedTo || 'Unassigned'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.lastActivity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">Edit</button>
                      <button className="text-green-600 hover:text-green-700">Call</button>
                      <button className="text-purple-600 hover:text-purple-700">Email</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 Lead Sources</h4>
          <div className="space-y-3">
            {[
              { source: 'LinkedIn Campaigns', count: 124, percentage: 45 },
              { source: 'Industry Templates', count: 89, percentage: 32 },
              { source: 'Direct Website', count: 34, percentage: 12 },
              { source: 'Referrals', count: 27, percentage: 10 },
              { source: 'Email Campaigns', count: 6, percentage: 2 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.source}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">⚡ Conversion Rates</h4>
          <div className="space-y-4">
            {[
              { stage: 'Lead → Contacted', rate: '72%', color: 'green' },
              { stage: 'Contacted → Qualified', rate: '86%', color: 'blue' },
              { stage: 'Qualified → Proposal', rate: '53%', color: 'yellow' },
              { stage: 'Proposal → Closed', rate: '49%', color: 'orange' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.stage}</span>
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></span>
                  <span className="text-sm font-semibold text-gray-900">{item.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

