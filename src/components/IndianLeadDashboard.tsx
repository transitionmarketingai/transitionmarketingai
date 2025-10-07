'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DashboardSidebar from './DashboardSidebar';
import MobileDashboardOptimizer from './MobileDashboardOptimizer';
import RealTimeValueDemonstrator from './RealTimeValueDemonstrator';
import PersonalizationEngine from './PersonalizationEngine';
import AdvancedCRMIntegration from './AdvancedCRMIntegration';
import RealTimeStatusTracker from './RealTimeStatusTracker';
import RealCampaignCreator from './RealCampaignCreator';
import LeadImportManager from './LeadImportManager';
import AutomationWorkflowBuilder from './AutomationWorkflowBuilder';
import DemoEnvironment from './DemoEnvironment';
import StrategicPartnershipsManager from './StrategicPartnershipsManager';
import MarketExpansionStrategy from './MarketExpansionStrategy';

interface ServicePhase {
  id: string;
  title: string;
  description: string;
  duration: string;
  costSavings: string;
  automation: string;
  icon: string;
  features: string[];
  result: string;
}

interface LeadCampaign {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  leadsGenerated: number;
  conversionRate: number;
  lastRun: string;
  budget: number;
  roi: number;
  pipelineValue: number;
  costPerLead: number;
  monthlyTarget: number;
  cities: string[];
}

interface LeadAnalytics {
  totalLeads: number;
  qualifiedLeads: number;
  hotLeads: number;
  conversionRate: number;
  avgCostPerLead: number;
  monthlyRevenue: number;
  leadGrowth: number;
  topPerformingCampaign: string;
  topIndustry: string;
  avgResponseTime: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
}

export default function IndianLeadDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'leads' | 'automation' | 'analytics' | 'templates' | 'value-demo' | 'social-proof' | 'personalization' | 'integrations' | 'partnerships' | 'market-expansion'>('overview');
  const [showCampaignCreator, setShowCampaignCreator] = useState(false);
  const [showLeadImport, setShowLeadImport] = useState(false);
  const [showAutomationBuilder, setShowAutomationBuilder] = useState(false);
  const [showBetaOnboarding, setShowBetaOnboarding] = useState(false);
  const [showDemoEnvironment, setShowDemoEnvironment] = useState(false);
  const [campaigns, setCampaigns] = useState<LeadCampaign[]>([]);
  const [leadsToday, setLeadsToday] = useState(42);

  // Mock data for comprehensive lead generation platform
  const [analytics, setAnalytics] = useState<LeadAnalytics>({
    totalLeads: 1247,
    qualifiedLeads: 892,
    hotLeads: 234,
    conversionRate: 14.2,
    avgCostPerLead: 26,
    monthlyRevenue: 650000,
    leadGrowth: 28,
    topPerformingCampaign: 'Bangalore IT Startups',
    topIndustry: 'Technology & IT',
    avgResponseTime: '2.3 hours'
  });

  useEffect(() => {
    // Mock campaigns data
    setCampaigns([
      {
        id: '1',
        name: 'Bangalore IT Startups',
        industry: 'Technology & IT',
        status: 'active',
        leadsGenerated: 234,
        conversionRate: 12.5,
        lastRun: '2 hours ago',
        budget: 15000,
        roi: 185,
        pipelineValue: 850000,
        costPerLead: 26,
        monthlyTarget: 500,
        cities: ['Bangalore', 'Hyderabad']
      },
      {
        id: '2',
        name: 'Mumbai Real Estate',
        industry: 'Real Estate',
        status: 'active',
        leadsGenerated: 89,
        conversionRate: 8.2,
        lastRun: '1 day ago',
        budget: 8500,
        roi: 142,
        pipelineValue: 320000,
        costPerLead: 24,
        monthlyTarget: 300,
        cities: ['Mumbai', 'Delhi', 'Pune']
      },
      {
        id: '3',
        name: 'Delhi Consulting Firms',
        industry: 'Business Consulting',
        status: 'paused',
        leadsGenerated: 156,
        conversionRate: 18.7,
        lastRun: '3 days ago',
        budget: 12000,
        roi: 234,
        pipelineValue: 485000,
        costPerLead: 28,
        monthlyTarget: 200,
        cities: ['Delhi', 'Gurgaon', 'Noida']
      },
      {
        id: '4',
        name: 'Chennai Healthcare',
        industry: 'Healthcare',
        status: 'draft',
        leadsGenerated: 0,
        conversionRate: 0,
        lastRun: 'Never',
        budget: 0,
        roi: 0,
        pipelineValue: 0,
        costPerLead: 0,
        monthlyTarget: 100,
        cities: ['Chennai', 'Bangalore']
      }
    ]);

    // Simulate live lead generation
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLeadsToday(prev => prev + 1);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: 'new-campaign',
      title: '🚀 Launch New Campaign',
      description: 'Create AI-powered lead generation campaign',
      icon: '🚀',
      color: 'blue',
      onClick: () => setShowCampaignCreator(true)
    },
    {
      id: 'industry-template',
      title: '🎯 Use Industry Template',
      description: 'Quick-launch pre-built campaigns',
      icon: '🎯',
      color: 'green',
      onClick: () => setActiveTab('templates')
    },
    {
      id: 'import-leads',
      title: '📥 Import Leads',
      description: 'Upload and qualify existing prospects',
      icon: '📥',
      color: 'purple',
      onClick: () => setShowLeadImport(true)
    },
    {
      id: 'automation',
      title: '⚡ Setup Automation',
      description: 'Create smart nurturing workflows',
      icon: '⚡',
      color: 'orange',
      onClick: () => setShowAutomationBuilder(true)
    },
    {
      id: 'demo',
      title: '🚀 Live Demo',
      description: 'See AI lead generation in action',
      icon: '🚀',
      color: 'purple',
      onClick: () => setShowDemoEnvironment(true)
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Real System Status Tracker */}
      <RealTimeStatusTracker />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-gray-900">{analytics.totalLeads.toLocaleString()}</div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+{analytics.leadGrowth}%</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">Total Leads Generated</div>
          <div className="text-xs text-gray-500">Across all campaigns</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-gray-900">₹{analytics.avgCostPerLead}</div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">-₹5</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">Avg Cost per Qualified Lead</div>
          <div className="text-xs text-gray-500">Industry benchmark: ₹75</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+2.1%</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">Lead-to-Customer Rate</div>
          <div className="text-xs text-gray-500">Industry avg: 8%</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-gray-900">₹{(analytics.monthlyRevenue / 100000).toFixed(1)}L</div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+₹1.2L</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">Monthly Revenue</div>
          <div className="text-xs text-gray-500">Generated from leads</div>
        </div>
      </div>

      {/* Beta Testing Program */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">🚀 Beta Testing Program</h3>
            <p className="text-blue-100 mb-4 text-sm">Help us perfect AI-powered lead generation for Indian businesses</p>
            <div className="flex items-center space-x-3 text-xs text-blue-100">
              <span>✅ Free access</span>
              <span>✅ Personal onboarding</span>
              <span>✅ Direct team support</span>
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={() => setShowBetaOnboarding(true)}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm"
            >
              Join Beta Program
            </button>
            <div className="text-blue-100 text-xs mt-1">
              Already 47 businesses enrolled
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">🚀 Quick Actions - Get Started</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`p-4 rounded-lg border-2 border-transparent hover:border-${action.color}-200 hover:bg-${action.color}-50 transition-all duration-200 text-left group`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Campaigns Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">🎯 Active Lead Generation Campaigns</h3>
            <button onClick={() => setActiveTab('campaigns')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage All →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.industry} • {campaign.leadsGenerated} leads • ₹{campaign.costPerLead} cost</p>
                    <p className="text-xs text-gray-500">{campaign.cities.join(', ')} • Last run: {campaign.lastRun}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">ROI</p>
                      <p className="font-semibold text-green-600">{campaign.roi}%</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Lead Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">👥 Recent Lead Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { company: "TechCorp Solutions", name: "Rajesh Sharma", role: "CTO", status: "Hot Lead", score: 9, source: "LinkedIn", avatar: "👨‍💼" },
              { company: "DigitalFirst Apps", name: "Priya Singh", role: "Founder", status: "Warm", score: 7, source: "Email Campaign", avatar: "👩‍💼" },
              { company: "CloudBridge Systems", name: "Amit Kumar", role: "Product Manager", status: "Hot Lead", score: 9, source: "Website Form", avatar: "👨‍💻" },
              { company: "DataDriven Solutions", name: "Sunita Reddy", role: "Marketing Head", status: "Qualified", score: 8, source: "Referral", avatar: "👩‍⚕️" }
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                    {lead.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{lead.name} • {lead.role}</p>
                    <p className="text-sm text-gray-600">{lead.company}</p>
                    <p className="text-xs text-gray-500">{lead.source}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lead.score >= 9 ? 'bg-red-100 text-red-800' : 
                    lead.score >= 7 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-sm font-medium">Score: {lead.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🎯 AI Lead Generation Campaigns</h2>
          <p className="text-gray-600 mt-2">Create, manage, and optimize your AI-powered lead generation campaigns</p>
        </div>
        <button 
          onClick={() => setShowCampaignCreator(true)}
          className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
        >
          🚀 Launch New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <p className="text-gray-600">{campaign.industry} Industry</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg font-bold text-gray-900">{campaign.leadsGenerated}</div>
                <div className="text-sm text-gray-600">Leads Generated</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg font-bold text-green-600">{campaign.conversionRate}%</div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-600">₹{campaign.costPerLead}</div>
                <div className="text-sm text-gray-600">Cost per Lead</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-600">{campaign.roi}%</div>
                <div className="text-sm text-gray-600">ROI</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Monthly Target: {campaign.monthlyTarget} leads</span>
                <span className="text-gray-600">₹{(campaign.pipelineValue / 1000).toFixed(0)}K pipeline</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, (campaign.leadsGenerated / campaign.monthlyTarget) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Edit
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">🎯 Industry-Specific Lead Templates</h2>
        <p className="text-gray-600 mt-2">Pre-built AI campaigns optimized for Indian industries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Technology & IT', icon: '💻', leads: '200-800/month', cost: '₹50 avg', difficulty: 'Medium', cities: ['Bangalore', 'Hyderabad', 'Pune'], color: 'blue' },
          { name: 'E-commerce & Retail', icon: '🛒', leads: '500-2000/month', cost: '₹45 avg', difficulty: 'Easy', cities: ['Mumbai', 'Delhi', 'Bangalore'], color: 'green' },
          { name: 'Business Consulting', icon: '💼', leads: '100-500/month', cost: '₹75 avg', difficulty: 'Medium', cities: ['Mumbai', 'Delhi', 'Pune'], color: 'purple' },
          { name: 'Real Estate', icon: '🏢', leads: '200-800/month', cost: '₹65 avg', difficulty: 'Medium', cities: ['Mumbai', 'Delhi', 'Bangalore'], color: 'orange' },
          { name: 'Healthcare & Pharma', icon: '🏥', leads: '50-300/month', cost: '₹85 avg', difficulty: 'Hard', cities: ['Mumbai', 'Delhi', 'Bangalore'], color: 'red' },
          { name: 'Education & Training', icon: '🎓', leads: '300-1500/month', cost: '₹35 avg', difficulty: 'Easy', cities: ['Chennai', 'Hyderabad', 'Pune'], color: 'indigo' },
          { name: 'Finance & Insurance', icon: '💰', leads: '150-600/month', cost: '₹55 avg', difficulty: 'Medium', cities: ['Mumbai', 'Delhi', 'Bangalore'], color: 'yellow' },
          { name: 'Manufacturing & Industrial', icon: '🏭', leads: '100-400/month', cost: '₹45 avg', difficulty: 'Hard', cities: ['Chennai', 'Pune', 'Ahmedabad'], color: 'gray' }
        ].map((template, index) => (
          <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer ${
            index === 0 ? 'border-2 border-blue-200 ring-1 ring-blue-100' : ''
          }`}>
            <div className="text-center mb-4">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl ${
                template.color === 'blue' ? 'bg-blue-100' :
                template.color === 'green' ? 'bg-green-100' :
                template.color === 'purple' ? 'bg-purple-100' :
                template.color === 'orange' ? 'bg-orange-100' :
                template.color === 'red' ? 'bg-red-100' :
                template.color === 'indigo' ? 'bg-indigo-100' :
                template.color === 'yellow' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                {template.icon}
              </div>
              {index === 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-2 inline-block">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm">Proven lead generation for Indian businesses</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">Monthly Leads</span>
                <span className="font-semibold text-gray-900">{template.leads}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">Avg Cost per Lead</span>
                <span className="font-semibold text-gray-900">{template.cost}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">Difficulty</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  template.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  template.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {template.difficulty}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Popular in:</p>
              <div className="flex flex-wrap gap-2">
                {template.cities.map((city) => (
                  <span key={city} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
              index === 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              {index === 0 ? '🚀 Use This Template' : 'Use Template'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <MobileDashboardOptimizer activeSection={activeTab}>
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Sidebar */}
        <DashboardSidebar 
          activeSection={activeTab} 
          onSectionChange={(section) => setActiveTab(section as any)} 
        />
      {/* Compact Header with Key Metrics */}
      <div className="bg-white border-b border-gray-200 ml-56 w-auto relative z-20 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <h1 className="text-lg font-bold text-gray-900">Lead Generation Control</h1>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>Live: {leadsToday} leads today</span>
                  <span>•</span>
                  <span>ROI: +{analytics.conversionRate}%</span>
                  <span>•</span>
                  <span>Cost: ₹{analytics.avgCostPerLead}/lead</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">AI Active</span>
              </div>
              <button 
                onClick={() => {
                  // Tour functionality temporarily disabled
                  alert('Tour feature will be available soon!');
                }}
                className="px-6 py-3 bg-gray-400 text-white border-0 rounded-lg hover:bg-gray-500 hover:shadow-lg transition-all duration-200 text-sm font-semibold flex items-center space-x-2 z-50 relative"
                title="Platform tour temporarily disabled"
              >
                <span className="text-base">🎯</span>
                <span className="font-bold">Take Tour</span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Enhanced Sidebar Integration */}
      <div className="ml-56 px-6 py-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'leads' && (
          <div>
            <LeadImportManager 
              onComplete={(leads) => {
                console.log('Imported leads:', leads);
                // TODO: Update campaigns with new leads
              }}
              onClose={() => setActiveTab('overview')}
            />
          </div>
        )}
        {activeTab === 'automation' && (
          <div>
            <AutomationWorkflowBuilder 
              isOpen={true}
              onClose={() => setActiveTab('overview')}
              onComplete={(workflow) => {
                console.log('Workflow created:', workflow);
                setActiveTab('overview');
              }}
            />
          </div>
        )}
        {activeTab === 'analytics' && (
          <div>
            {/* <SimplifiedAnalytics /> */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">📊 Analytics Dashboard</h3>
              <p className="text-gray-600">Advanced analytics features coming soon...</p>
            </div>
          </div>
        )}
        {activeTab === 'value-demo' && (
          <div>
            <RealTimeValueDemonstrator />
          </div>
        )}
        {activeTab === 'social-proof' && (
          <div>
            {/* <SocialProofManager /> */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🌟 Social Proof Manager</h3>
              <p className="text-gray-600">Social proof features coming soon...</p>
            </div>
          </div>
        )}
        {activeTab === 'personalization' && (
          <div>
            <PersonalizationEngine />
          </div>
        )}
        {activeTab === 'integrations' && (
          <div>
            <AdvancedCRMIntegration />
          </div>
        )}
        {activeTab === 'partnerships' && (
          <div>
            <StrategicPartnershipsManager />
          </div>
        )}
        {activeTab === 'market-expansion' && (
          <div>
            <MarketExpansionStrategy />
          </div>
        )}
      </div>

      </div>
      
      
      {/* Real Campaign Creator Modal */}
      <RealCampaignCreator 
        isOpen={showCampaignCreator}
        onClose={() => setShowCampaignCreator(false)}
        onComplete={(campaign) => {
          console.log('New campaign created:', campaign);
          setCampaigns(prev => [...prev, campaign as LeadCampaign]);
          setShowCampaignCreator(false);
          setActiveTab('campaigns');
        }}
      />

      {/* Lead Import Manager Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${showLeadImport ? 'block' : 'hidden'}`}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <LeadImportManager 
            onComplete={(leads) => {
              console.log('Imported leads:', leads);
              setShowLeadImport(false);
              setActiveTab('leads');
            }}
            onClose={() => setShowLeadImport(false)}
          />
        </div>
      </div>

      {/* Automation Workflow Builder Modal */}
      <AutomationWorkflowBuilder 
        isOpen={showAutomationBuilder}
        onClose={() => setShowAutomationBuilder(false)}
        onComplete={(workflow) => {
          console.log('Automation workflow created:', workflow);
          setShowAutomationBuilder(false);
          setActiveTab('automation');
        }}
      />

      {/* Beta Testing Onboarding Modal */}
      {/* <BetaTestingOnboarding 
        isOpen={showBetaOnboarding}
        onClose={() => setShowBetaOnboarding(false)}
        onComplete={(betaUser, goals) => {
          console.log('Beta application submitted:', { betaUser, goals });
          setShowBetaOnboarding(false);
          // Show success message
        }}
      /> */}

      {/* Demo Environment Modal */}
      <DemoEnvironment 
        isOpen={showDemoEnvironment}
        onClose={() => setShowDemoEnvironment(false)}
        scenarioType="tech-startup"
      />
    </MobileDashboardOptimizer>
  );
}