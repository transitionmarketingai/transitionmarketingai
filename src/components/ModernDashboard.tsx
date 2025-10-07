'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Modern Dashboard Structure for World-Class Lead Management Platform
// Inspired by HubSpot, Salesforce, Salesforce Cloud, and modern productivity tools

interface DashboardSection {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  badge?: string;
  path: string;
  subsections?: DashboardSection[];
}

interface MetricCard {
  title: string;
  value: string | number;
  change: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
}

const MODERN_DASHBOARD_SECTIONS: DashboardSection[] = [
  {
    id: 'overview',
    name: 'Overview',
    icon: '📊',
    description: 'Key metrics and performance',
    color: 'blue',
    path: '/dashboard/overview'
  },
  {
    id: 'leads',
    name: 'Leads',
    icon: '🎯',
    description: 'Lead pipeline and management',
    color: 'green',
    badge: '23',
    path: '/dashboard/leads',
    subsections: [
      { id: 'pipeline', name: 'Pipeline', icon: '🔄', description: 'Lead flow and stages', color: 'blue', path: '/dashboard/leads/pipeline' },
      { id: 'qualification', name: 'Qualification', icon: '⚡', description: 'AI-powered scoring', color: 'yellow', path: '/dashboard/leads/qualification' },
      { id: 'import', name: 'Import', icon: '📥', description: 'Bulk lead import', color: 'purple', path: '/dashboard/leads/import' },
      { id: 'export', name: 'Export', icon: '📤', description: 'Lead export tools', color: 'gray', path: '/dashboard/leads/export' }
    ]
  },
  {
    id: 'campaigns',
    name: 'Campaigns',
    icon: '🚀',
    description: 'AI-powered marketing campaigns',
    color: 'purple',
    badge: '5 Active',
    path: '/dashboard/campaigns',
    subsections: [
      { id: 'smart-campaigns', name: 'Smart Campaigns', icon: '🧠', description: 'AI-generated campaigns', color: 'purple', path: '/dashboard/campaigns/smart' },
      { id: 'industry-templates', name: 'Templates', icon: '📋', description: 'Industry-specific templates', color: 'blue', path: '/dashboard/campaigns/templates' },
      { id: 'automation', name: 'Automation', icon: '⚙️', description: 'Workflow automation', color: 'orange', path: '/dashboard/campaigns/automation' },
      { id: 'analytics', name: 'Analytics', icon: '📈', description: 'Campaign performance', color: 'green', path: '/dashboard/campaigns/analytics' }
    ]
  },
  {
    id: 'contacts',
    name: 'Contacts',
    icon: '👥',
    description: 'Contact and relationship management',
    color: 'indigo',
    badge: '1.2K',
    path: '/dashboard/contacts',
    subsections: [
      { id: 'contact-database', name: 'Database', icon: '🗄️', description: 'All contacts and orgs', color: 'indigo', path: '/dashboard/contacts/database' },
      { id: 'companies', name: 'Companies', icon: '🏢', description: 'B2B organizations', color: 'blue', path: '/dashboard/contacts/companies' },
      { id: 'segments', name: 'Segments', icon: '🎛️', description: 'Contact segmentation', color: 'purple', path: '/dashboard/contacts/segments' },
      { id: 'interactions', name: 'Interactions', icon: '💬', description: 'Communication history', color: 'green', path: '/dashboard/contacts/interactions' }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: '📈',
    description: 'Performance insights and reporting',
    color: 'emerald',
    path: '/dashboard/analytics',
    subsections: [
      { id: 'overview-analytics', name: 'Overview', icon: '📊', description: 'Key metrics dashboard', color: 'emerald', path: '/dashboard/analytics/overview' },
      { id: 'roi', name: 'ROI', icon: '💰', description: 'Return on investment', color: 'green', path: '/dashboard/analytics/roi' },
      { id: 'attribution', name: 'Attribution', icon: '🎯', description: 'Lead source tracking', color: 'purple', path: '/dashboard/analytics/attribution' },
      { id: 'reports', name: 'Reports', icon: '📋', description: 'Custom reports', color: 'blue', path: '/dashboard/analytics/reports' }
    ]
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: '🔌',
    description: 'Connect with your tools',
    color: 'orange',
    path: '/dashboard/integrations',
    subsections: [
      { id: 'crm', name: 'CRM Systems', icon: '🔄', description: 'HubSpot, Salesforce, Pipedrive', color: 'orange', path: '/dashboard/integrations/crm' },
      { id: 'marketing', name: 'Marketing Tools', icon: '📧', description: 'Email, social, automation', color: 'pink', path: '/dashboard/integrations/marketing' },
      { id: 'data', name: 'Data Sources', icon: '📊', description: 'LinkedIn, directories, APIs', color: 'blue', path: '/dashboard/integrations/data' },
      { id: 'productivity', name: 'Productivity', icon: '⚡', description: 'Calendar, Slack, Notion', color: 'purple', path: '/dashboard/integrations/productivity' }
    ]
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: '🤖',
    description: 'Workflow intelligence',
    color: 'teal',
    path: '/dashboard/automation',
    subsections: [
      { id: 'sequences', name: 'Sequences', icon: '🔄', description: 'Drip campaigns', color: 'teal', path: '/dashboard/automation/sequences' },
      { id: 'triggers', name: 'Triggers', icon: '⚡', description: 'Smart triggers', color: 'yellow', path: '/dashboard/automation/triggers' },
      { id: 'ai-workflows', name: 'AI Workflows', icon: '🧠', description: 'Intelligent automation', color: 'purple', path: '/dashboard/automation/ai-workflows' },
      { id: 'logs', name: 'Activity Logs', icon: '📜', description: 'Automation history', color: 'gray', path: '/dashboard/automation/logs' }
    ]
  },
  {
    id: 'team',
    name: 'Team',
    icon: '👨‍👩‍👧‍👦',
    description: 'Team collaboration',
    color: 'rose',
    path: '/dashboard/team',
    subsections: [
      { id: 'members', name: 'Members', icon: '👥', description: 'Team members', color: 'rose', path: '/dashboard/team/members' },
      { id: 'roles', name: 'Roles', icon: '🔐', description: 'Permissions & roles', color: 'blue', path: '/dashboard/team/roles' },
      { id: 'activity', name: 'Activity', icon: '📊', description: 'Team performance', color: 'green', path: '/dashboard/team/activity' },
      { id: 'collaboration', name: 'Collaboration', icon: '🤝', description: 'Shared workspaces', color: 'purple', path: '/dashboard/team/collaboration' }
    ]
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    description: 'Account and preferences',
    color: 'gray',
    path: '/dashboard/settings',
    subsections: [
      { id: 'account', name: 'Account', icon: '👤', description: 'Profile & billing', color: 'blue', path: '/dashboard/settings/account' },
      { id: 'notifications', name: 'Notifications', icon: '🔔', description: 'Alert preferences', color: 'orange', path: '/dashboard/settings/notifications' },
      { id: 'security', name: 'Security', icon: '🔒', description: 'Privacy & security', color: 'red', path: '/dashboard/settings/security' },
      { id: 'api', name: 'API', icon: '🔑', description: 'API keys & docs', color: 'purple', path: '/dashboard/settings/api' }
    ]
  }
];

export default function ModernDashboard() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState('overview');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample metrics data
  const [metrics] = useState<MetricCard[]>([
    {
      title: 'Total Leads',
      value: '2,847',
      change: { value: 12.5, type: 'increase', period: 'vs last month' },
      icon: '🎯',
      color: 'green',
      trend: 'up'
    },
    {
      title: 'Active Campaigns',
      value: '5',
      change: { value: 2, type: 'increase', period: 'this quarter' },
      icon: '🚀',
      color: 'blue',
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: '14.2%',
      change: { value: 2.1, type: 'increase', period: 'vs last month' },
      icon: '📈',
      color: 'purple',
      trend: 'up'
    },
    {
      title: 'Avg. Cost per Lead',
      value: '₹26',
      change: { value: 5, type: 'decrease', period: 'vs last month' },
      icon: '💰',
      color: 'green',
      trend: 'down'
    },
    {
      title: 'Pipeline Value',
      value: '₹2.4M',
      change: { value: 18.3, type: 'increase', period: 'vs last quarter' },
      icon: '💎',
      color: 'emerald',
      trend: 'up'
    },
    {
      title: 'Response Time',
      value: '2.3 hrs',
      change: { value: 0.8, type: 'decrease', period: 'vs last week' },
      icon: '⏱️',
      color: 'orange',
      trend: 'down'
    }
  ]);

  const quickActions: QuickAction[] = [
    {
      id: 'create-lead',
      title: 'Create Lead',
      description: 'Manually add new contact',
      icon: '👤',
      color: 'blue',
      action: () => console.log('Create lead')
    },
    {
      id: 'launch-campaign',
      title: 'Launch Campaign',
      description: 'Start new AI campaign',
      icon: '🚀',
      color: 'purple',
      action: () => console.log('Launch campaign')
    },
    {
      id: 'bulk-upload',
      title: 'Bulk Upload',
      description: 'Import leads from CSV',
      icon: '📥',
      color: 'green',
      action: () => console.log('Bulk upload')
    },
    {
      id: 'schedule-m demo',
      title: 'Schedule Demo',
      description: 'Book client demo',
      icon: '📅',
      color: 'orange',
      action: () => console.log('Schedule demo')
    }
  ];

  const getCurrentSection = () => {
    return MODERN_DASHBOARD_SECTIONS.find(section => section.id === activeSection);
  };

  const getCurrentSubsection = () => {
    const currentSection = getCurrentSection();
    if (!currentSection?.subsections || !activeSubsection) return null;
    return currentSection.subsections.find(sub => sub.id === activeSubsection);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name || 'User'}! 👋:</span>
        <p className="text-blue-100 text-lg">Here's what's happening with your lead generation today</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <div className={`text-sm font-medium text-${metric.color}-600 bg-${metric.color}-100 px-2 py-1 rounded-full`}>
                {metric.change.value}% {metric.change.type === 'increase' ? '↗️' : '↘️'}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
            <p className="text-xs text-gray-500">{metric.change.period}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`p-4 rounded-lg border-2 border-transparent hover:border-${action.color}-200 bg-${action.color}-50 hover:bg-${action.color}-100 transition-all group`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Recent Activity</h3>
        <div className="space-y-3">
          {[
            { title: 'New lead Rajesh Sharma added to pipeline', time: '2 min ago', type: 'success' },
            { title: 'AI Campaign "Bangalore IT" generated 23 leads', time: '15 min ago', type: 'info' },
            { title: 'Priya Singh opened your email invitation', time: '1 hour ago', type: 'success' },
            { title: 'Campaign "Mumbai Real Estate" completed', time: '2 hours ago', type: 'warning' },
            { title: 'Team member updated contact database', time: '3 hours ago', type: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 flex-1">{activity.title}</span>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'leads':
        return <div className="p-6 bg-white rounded-xl"><h2 className="text-xl font-bold">Leads Management</h2><p className="text-gray-600">Lead pipeline and management tools</p></div>;
      case 'campaigns':
        return <div className="p-6 bg-white rounded-xl"><h2 className="text-xl font-bold">Campaigns</h2><p className="text-gray-600">AI-powered marketing campaigns</p></div>;
      case 'contacts':
        return <div className="p-6 bg-white rounded-xl"><h2 className="text-xl font-bold">Contacts</h2><p className="text-gray-600">Contact and relationship management</p></div>;
      case 'analytics':
        return <div className="p-6 bg-white rounded-xl"><h2 className="text-xl font-bold">Analytics</h2><p className="text-gray-600">Performance insights and reporting</p></div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Modern Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Transition AI</h1>
                <p className="text-xs text-gray-500">Lead Generation Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {MODERN_DASHBOARD_SECTIONS.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => {
                  setActiveSection(section.id);
                  setActiveSubsection(null);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeSection === section.id ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg mr-3">{section.icon}</span>
                {!sidebarCollapsed && (
                  <>
                    <div className="flex-1">
                      <span className="font-medium">{section.name}</span>
                      {section.badge && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">{section.badge}</span>
                      )}
                    </div>
                  </>
                )}
              </button>

              {/* Subsections */}
              {!sidebarCollapsed && activeSection === section.id && section.subsections && (
                <div className="ml-6 pl-6 border-l border-gray-200 space-y-1">
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => setActiveSubsection(subsection.id)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeSubsection === subsection.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{subsection.icon}</span>
                      {subsection.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute bottom-4 left-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
        >
          <span className="text-sm">{sidebarCollapsed ? '→' : '←'}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {activeSubsection ? getCurrentSubsection()?.name : getCurrentSection()?.name}
              </h2>
              <p className="text-gray-600">
                {activeSubsection ? getCurrentSubsection()?.description : getCurrentSection()?.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5a7.954 7.954 0 01-3-5c0-2.21.895-4.21 2.35-5.65A8.005 8.005 0 0115 7a8.006 8.006 0 013 5zm-7 0H3l5-5v5a8.006 8.006 0 003 5zm7-7H15l3-3H4z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>

              {/* User */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {session?.user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700">{session?.user?.name || 'User'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

