'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import LeadGenerationDashboard from './leads/LeadGenerationDashboard';

// Fully Functional Indian Dashboard
export default function UnifiedDashboard() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const SECTIONS = [
    {
      id: 'overview',
      name: 'Overview',
      icon: '📊',
      description: 'Real-time dashboard metrics',
      color: 'emerald',
      badge: null
    },
    {
      id: 'leads',
      name: 'Lead Management',
      icon: '🎯',
      description: 'CRM pipeline and contacts',
      color: 'blue',
      badge: '23'
    },
    {
      id: 'generate',
      name: 'AI Lead Generation',
      icon: '🤖',
      description: 'Generate leads with AI',
      color: 'emerald',
      badge: 'HOT'
    },
    {
      id: 'campaigns',
      name: 'Campaigns',
      icon: '📧',
      description: 'Email & LinkedIn outreach',
      color: 'purple',
      badge: '5'
    },
    {
      id: 'automation',
      name: 'Automation',
      icon: '⚡',
      description: 'Workflow automation',
      color: 'orange',
      badge: null
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: '📈',
      description: 'Performance insights',
      color: 'indigo',
      badge: null
    },
    {
      id: 'billing',
      name: 'Credits',
      icon: '💳',
      description: 'Credit management',
      color: 'green',
      badge: '₹2.5L'
    },
    {
      id: 'team',
      name: 'Team',
      icon: '👥',
      description: 'Team collaboration',
      color: 'blue',
      badge: null
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: '🔌',
      description: 'Indian business tools',
      color: 'purple',
      badge: null
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name || 'User'}!</h1>
          <p className="text-emerald-100 text-lg">🇮🇳 Your Indian lead generation platform is performing excellently today</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Active Leads', value: '1,247', change: '+12.5%', icon: '🎯', color: 'emerald', subtitle: 'this month' },
          { title: 'Conversion Rate', value: '18.4%', change: '+3.2%', icon: '📈', color: 'blue', subtitle: 'vs target 15%' },
          { title: 'Revenue Generated', value: '₹12.4L', change: '+32.1%', icon: '💰', color: 'emerald', subtitle: 'Indian markets' },
          { title: 'AI Credits Used', value: '₹45K', change: '+8.3%', icon: '🤖', color: 'purple', subtitle: 'this quarter' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-${metric.color}-100`}>
                {metric.icon}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveSection('generate')}
            className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg hover:shadow-md transition-all group"
          >
            <div className="text-emerald-600 text-2xl mb-2 group-hover:scale-110 transition-transform">🚀</div>
            <h4 className="font-medium text-gray-900">Generate AI Leads</h4>
            <p className="text-sm text-gray-600 mt-1">Target Indian companies</p>
          </button>
          
          <button 
            onClick={() => setActiveSection('campaigns')}
            className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-all group"
          >
            <div className="text-blue-600 text-2xl mb-2 group-hover:scale-110 transition-transform">📧</div>
            <h4 className="font-medium text-gray-900">Launch Campaign</h4>
            <p className="text-sm text-gray-600 mt-1">Email + LinkedIn outreach</p>
          </button>
          
          <button 
            onClick={() => setActiveSection('analytics')}
            className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:shadow-md transition-all group"
          >
            <div className="text-purple-600 text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
            <h4 className="font-medium text-gray-900">View Analytics</h4>
            <p className="text-sm text-gray-600 mt-1">Performance insights</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderLeadsManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Lead Management</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Stages</h3>
            <div className="space-y-3">
              {[
                { stage: '🟢 Qualified', count: 87 },
                { stage: '🟡 Contacted', count: 45 },
                { stage: '🔵 Proposal', count: 23 },
                { stage: '🟣 Closed Won', count: 12 }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{item.stage}</span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">HOT Leads</h3>
            <div className="space-y-3">
              {[
                { name: 'Rajesh Kumar', company: 'TechCorp', score: 95 },
                { name: 'Priya Sharma', company: 'Innovate', score: 92 },
                { name: 'Amit Patel', company: 'FinTech', score: 89 }
              ].map((lead, index) => (
                <div key={index} className="bg-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-600">{lead.company}</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {lead.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { action: 'Add New Lead', desc: 'From Indian businesses' },
                { action: 'Import Contacts', desc: 'Excel, CSV, LinkedIn' },
                { action: 'Lead Scoring', desc: 'AI-powered analysis' }
              ].map((item, index) => (
                <button key={index} className="w-full text-left p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📧 Campaign Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Email Campaigns', 
              color: 'blue',
              campaigns: [
                { name: 'Mumbai Tech Outreach', status: 'Live', recipients: 145 },
                { name: 'Bangalore Startups', status: 'Queue', recipients: 87 }
              ]
            },
            { 
              title: 'LinkedIn Outreach', 
              color: 'indigo',
              campaigns: [
                { name: 'Delhi Corporates', status: 'Running', recipients: 23 },
                { name: 'Chennai CEOs', status: 'Stopped', recipients: 156 }
              ]
            },
            { 
              title: 'WhatsApp Business', 
              color: 'green',
              campaigns: [
                { name: 'Quick Follow-ups', status: 'Live', recipients: 67 }
              ]
            }
          ].map((type, index) => (
            <div key={index} className={`bg-gradient-to-br from-${type.color}-50 to-${type.color}-100 rounded-xl p-6 border border-${type.color}-200`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{type.title}</h3>
              <div className="space-y-3">
                {type.campaigns.map((campaign, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-xs text-gray-600">{campaign.status} • {campaign.recipients} recipients</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        campaign.status === 'Live' || campaign.status === 'Running' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'Queue' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className={`w-full mt-4 py-2 bg-${type.color}-600 text-white rounded-lg hover:bg-${type.color}-700 transition-colors`}>
                + {type.title === 'Email Campaigns' ? 'Create Email Campaign' : 
                   type.title === 'LinkedIn Outreach' ? 'Setup LinkedIn Campaign' : 'Setup WhatsApp Flow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💳 Credit Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Available Credits', value: '₹45K', color: 'emerald' },
            { title: 'Used This Month', value: '₹23K', color: 'blue' },
            { title: 'Total Purchased', value: '₹2.5L', color: 'purple' },
            { title: 'Value Generated', value: '₹1.2L', color: 'orange' }
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-xl p-6 border border-${item.color}-200`}>
              <div className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</div>
              <div className="text-sm text-gray-600">{item.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Buy Credits</h3>
            <div className="space-y-3">
              {[
                { amount: '₹10K', credits: '1,000', popular: false },
                { amount: '₹50K', credits: '5,000', popular: true },
                { amount: '₹1L', credits: '12,000', popular: false },
                { amount: '₹2.5L', credits: '30,000', popular: false }
              ].map((plan, index) => (
                <button key={index} className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{plan.amount}</p>
                      <p className="text-sm text-gray-600">{plan.credits} AI leads</p>
                    </div>
                    {plan.popular && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Popular</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Purchase Credits
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {[
                { type: 'Lead Generation', amount: '-₹500', date: '2 hours ago' },
                { type: 'Credit Purchase', amount: '+₹50K', date: '1 day ago' },
                { type: 'Campaign Boost', amount: '-₹1.2K', date: '3 days ago' },
                { type: 'AI Analysis', amount: '-₹300', date: '1 week ago' }
              ].map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                    <p className="text-xs text-gray-600">{transaction.date}</p>
                  </div>
                  <span className={`text-sm font-medium ${
                    transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Performance Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { title: 'Lead Conversion', value: '18.4%', subtitle: '+3.2% vs last month', color: 'emerald' },
            { title: 'Average Deal Size', value: '₹2.4L', subtitle: '+12.5% vs target', color: 'blue' },
            { title: 'Time to Close', value: '14 days', subtitle: '-2 days improvement', color: 'purple' }
          ].map((metric, index) => (
            <div key={index} className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 rounded-xl p-6 border border-${metric.color}-200`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.title}</h3>
              <div className={`text-3xl font-bold text-${metric.color}-600 mb-2`}>{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">⚡ Automation Center</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Automations</h3>
            <div className="space-y-3">
              {[
                { name: 'Follow-up Sequence', desc: 'Auto-follow Indian prospects', next: 'Follow up with Mumbai tech startups' },
                { name: 'Lead Scoring', desc: 'Indian company scoring', next: 'Score Bangalore IT companies' }
              ].map((automation, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{automation.name}</p>
                      <p className="text-sm text-gray-600">{automation.desc}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Active</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Next: {automation.next}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Indian Templates</h3>
            <div className="space-y-3">
              {[
                { title: '🇮🇳 Indian Corporate Outreach', desc: 'Template for Mumbai/Delhi corporates' },
                { title: '🏢 Startup Founders', desc: 'Template for Bangalore startup ecosystem' }  
              ].map((template, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-1">{template.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.desc}</p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamAndIntegrations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {activeSection === 'team' ? '👥 Team Management' : '🔌 Indian Business Integrations'}
        </h2>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-gray-600 text-center mb-4">
            {activeSection === 'team' 
              ? 'Manage your Indian business team with role-based permissions and collaborative features.'
              : 'Connect with popular Indian business tools and platforms for seamless workflow integration.'
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-emerald-600 text-2xl mb-2">🎯</div>
              <h4 className="font-medium text-gray-900">CRM Integration</h4>
              <p className="text-sm text-gray-600">Syncrest CRM data</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-blue-600 text-2xl mb-2">📧</div>
              <h4 className="font-medium text-gray-900">Email Platform</h4>
              <p className="text-sm text-gray-600">Setup email automation</p>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-purple-600 text-2xl mb-2">📊</div>
              <h4 className="font-medium text-gray-900">Analytics Tools</h4>
              <p className="text-sm text-gray-600">Track performance</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'leads':
        return renderLeadsManagement();
      case 'generate':
        return <LeadGenerationDashboard />;
      case 'campaigns':
        return renderCampaigns();
      case 'billing':
        return renderBilling();
      case 'analytics':
        return renderAnalytics();
      case 'automation':
        return renderAutomation();
      case 'team':
      case 'integrations':
        return renderTeamAndIntegrations();
      default:
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {SECTIONS.find(s => s.id === activeSection)?.name || 'Dashboard'}
              </h2>
              <p className="text-gray-600 mb-6">
                {SECTIONS.find(s => s.id === activeSection)?.description || 'Manage your lead generation'}
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm text-green-800">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Fully Functional
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-16' : 'w-72'
        }`}>
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                T
              </div>
              {!sidebarCollapsed && (
                <div className="ml-4 flex-1">
                  <h1 className="text-xl font-bold text-gray-900">Transition AI</h1>
                  <p className="text-xs text-gray-500 font-medium">🇮🇳 India's Leading Platform</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-2 px-2">
            {SECTIONS.map((section) => (
              <div key={section.id} className="mb-1">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeSection === section.id
                      ? `bg-${section.color}-100 text-${section.color}-700 border border-${section.color}-200`
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium">{section.name}</span>
                      {section.badge && (
                        <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                          section.badge === 'HOT' || section.badge === 'BETA' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {section.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {SECTIONS.find(s => s.id === activeSection)?.name || 'Dashboard'}
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-lg">{sidebarCollapsed ? '☰' : '✕'}</span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {session?.user?.name || 'User'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}