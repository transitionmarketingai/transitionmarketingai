'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import IndustryTemplates from './IndustryTemplates';

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
}

interface IndustryTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  monthlyLeads: string;
  avgConversion: string;
  popularIn: string[];
}

export default function IndianLeadDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'leads' | 'automation' | 'analytics'>('dashboard');
  const [showTour, setShowTour] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<LeadCampaign[]>([]);
  const [industries, setIndustries] = useState<IndustryTemplate[]>([]);

  useEffect(() => {
    // Mock data for Indian businesses
    setIndustries([
      {
        id: 'retail',
        name: 'Retail & E-commerce',
        icon: '🛒',
        description: 'Sell more products online with targeted lead generation',
        difficulty: 'easy',
        monthlyLeads: '500-2000',
        avgConversion: '8-15%',
        popularIn: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai']
      },
      {
        id: 'consulting',
        name: 'Business Consulting & Services',
        icon: '💼',
        description: 'Find decision makers in corporates and startups',
        difficulty: 'medium',
        monthlyLeads: '100-500',
        avgConversion: '15-25%',
        popularIn: ['Mumbai', 'Delhi', 'Pune', 'Hyderabad']
      },
      {
        id: 'realestate',
        name: 'Real Estate',
        icon: '🏢',
        description: 'Connect with property buyers and investors',
        difficulty: 'medium',
        monthlyLeads: '200-800',
        avgConversion: '5-12%',
        popularIn: ['Mumbai', 'Delhi', 'Bangalore', 'Pune']
      },
      {
        id: 'healthcare',
        name: 'Healthcare & Pharma',
        icon: '🏥',
        description: 'Reach doctors, hospitals, and medical professionals',
        difficulty: 'hard',
        monthlyLeads: '50-300',
        avgConversion: '10-20%',
        popularIn: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai']
      },
      {
        id: 'education',
        name: 'Education & Training',
        icon: '🎓',
        description: 'Target students, parents, and educational institutions',
        difficulty: 'easy',
        monthlyLeads: '300-1500',
        avgConversion: '6-18%',
        popularIn: ['Bangalore', 'Chennai', 'Hyderabad', 'Pune']
      },
      {
        id: 'finance',
        name: 'Finance & Insurance',
        icon: '💰',
        description: 'Connect with individuals and businesses for financial products',
        difficulty: 'medium',
        monthlyLeads: '150-600',
        avgConversion: '4-12%',
        popularIn: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai']
      },
      {
        id: 'manufacturing',
        name: 'Manufacturing & Industrial',
        icon: '🏭',
        description: 'Find B2B buyers for industrial products and services',
        difficulty: 'hard',
        monthlyLeads: '100-400',
        avgConversion: '8-20%',
        popularIn: ['Chennai', 'Pune', 'Ahmedabad', 'Mumbai']
      },
      {
        id: 'tech',
        name: 'Technology & IT Services',
        icon: '💻',
        description: 'Target tech startups and enterprises for B2B services',
        difficulty: 'medium',
        monthlyLeads: '200-800',
        avgConversion: '10-25%',
        popularIn: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai']
      }
    ]);

    setCampaigns([
      {
        id: '1',
        name: 'Bangalore IT Startups',
        industry: 'Technology',
        status: 'active',
        leadsGenerated: 234,
        conversionRate: 12.5,
        lastRun: '2 hours ago',
        budget: 15000,
        roi: 185
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
        roi: 142
      },
      {
        id: '3',
        name: 'Delhi Consulting Firms',
        industry: 'Consulting',
        status: 'paused',
        leadsGenerated: 156,
        conversionRate: 18.7,
        lastRun: '3 days ago',
        budget: 12000,
        roi: 234
      }
    ]);
  }, []);

  const quickStats = [
    { label: 'Leads Delivered This Month', value: '647', change: '+28%', changeType: 'positive' },
    { label: 'Active Lead Campaigns', value: '8', change: '+3', changeType: 'positive' },
    { label: 'Lead-to-Customer Rate', value: '14.2%', change: '+3.1%', changeType: 'positive' },
    { label: 'Cost per Qualified Lead', value: '₹42', change: '-₹5', changeType: 'positive' }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'text-green-800 bg-green-100' 
                  : 'text-red-800 bg-red-100'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions - P.A.R.A. Structure */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions - Lead Generation Platform</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button 
            onClick={() => setActiveTab('projects')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-3">🎯</div>
            <h4 className="font-semibold text-gray-900 mb-2">Start New Project</h4>
            <p className="text-gray-600 text-sm">Launch lead generation campaign with deadlines</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('areas')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-3">🏢</div>
            <h4 className="font-semibold text-gray-900 mb-2">Manage Areas</h4>
            <p className="text-gray-600 text-sm">Industry verticals & vertical management</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('resources')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-3">📚</div>
            <h4 className="font-semibold text-gray-900 mb-2">Access Resources</h4>
            <p className="text-gray-600 text-sm">Templates, tools & knowledge base</p>
          </button>

          <button 
            onClick={() => setActiveTab('archives')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-3">📦</div>
            <h4 className="font-semibold text-gray-900 mb-2">View Archives</h4>
            <p className="text-gray-600 text-sm">Completed campaigns & historical data</p>
          </button>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.industry} • {campaign.leadsGenerated} leads</p>
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
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-blue-600 hover:text-blue-800 font-medium">
            View All Campaigns →
          </button>
        </div>
      </div>
    </div>
  );

  const renderAreas = () => (
    <IndustryTemplates />
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Active Lead Generation Projects</h2>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create New Campaign
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
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
                    'bg-gray--rank text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Leads Generated</p>
                    <p className="text-2xl font-bold text-gray-900">{campaign.leadsGenerated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-green-600">{campaign.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget Used</p>
                    <p className="text-2xl font-bold text-gray-900">₹{campaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ROI</p>
                    <p className="text-2xl font-bold text-green-600">{campaign.roi}%</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Edit Campaign
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Export Leads
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Lead Generation Resources</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Export All
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Manual Lead
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-6">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Lead Pipeline</h3>
          <p className="text-gray-600 mb-6">
            Track your leads from generation to conversion with AI-powered insights
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600">Lead Opportunities</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">Qualified Leads</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">34</div>
              <div className="text-sm text-gray-600">Closed Deals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArchives = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Archives & Historical Data</h2>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Campaigns Archive</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter company name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Select Industry</option>
              {industries.map(industry => (
                <option key={industry.id}>{industry.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="City, State" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Budget</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="₹" />
          </div>
        </div>
        
        <div className="mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Advanced Lead Generation Suite</h1>
                <p className="text-sm text-gray-600">
                  Complete Lead Management Platform - Replace your current processes
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    AI-Powered
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowTour(true)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                title="Take a guided tour of the platform"
              >
                🎯 App Tour
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                📊 Analytics
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Upgrade Plan
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* App Tour Modal */}
      {showTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Platform Tour - Lead Generation Platform</h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📈</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Dashboard Overview</h4>
                  <p>Real-time lead metrics, conversion tracking, and campaign performance insights</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Active Campaigns</h4>
                  <p>Monitor and manage your ongoing lead generation projects and automated outreach</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏢</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Industry Templates</h4>
                  <p>Choose from 8 pre-built AI templates specifically designed for Indian business sectors</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Lead Database</h4>
                  <p>Access your qualified leads, manage lead scoring, and track nurturing progress</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Campaign Archives</h4>
                  <p>View historical performance data, completed campaigns, and optimization insights</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => setShowTour(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Skip Tour
              </button>
              <button 
                onClick={() => setShowTour(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊', description: 'Real-time metrics & performance overview' },
            { id: 'campaigns', label: 'Campaigns', icon: '🚀', description: 'Create & manage lead generation campaigns' },
            { id: 'leads', label: 'Lead Database', icon: '👥', description: 'Qualified leads, scoring & management' },
            { id: 'automation', label: 'Automation', icon: '⚡', description: 'AI-powered nurturing sequences & workflows' },
            { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Detailed insights & optimization reports' }
          ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group border-b-2 px-1 py-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-600 border-transparent hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title={tab.description}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <div className="mt-1 text-xs text-blue-600 opacity-75">
                    {tab.description}
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'leads' && renderLeads()}
        {activeTab === 'automation' && renderAutomation()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
}
