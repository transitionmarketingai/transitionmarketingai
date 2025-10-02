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

      {/* Lead Generation Quick Actions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Launch - Start Lead Generation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button 
            onClick={() => setActiveTab('campaigns')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-blue-300"
          >
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="font-semibold text-gray-900 mb-2">New Campaign</h4>
            <p className="text-gray-600 text-sm">Launch AI-powered lead generation across multiple channels</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('leads')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-green-300"
          >
            <div className="text-3xl mb-3">👥</div>
            <h4 className="font-semibold text-gray-900 mb-2">Import Leads</h4>
            <p className="text-gray-600 text-sm">Upload and qualify existing prospect databases</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('automation')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-purple-300"
          >
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-semibold text-gray-900 mb-2">Setup Automation</h4>
            <p className="text-gray-600 text-sm">Create intelligent nurturing sequences and workflows</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('analytics')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-orange-300"
          >
            <div className="text-3xl mb-3">📈</div>
            <h4 className="font-semibold text-gray-900 mb-2">Performance Report</h4>
            <p className="text-gray-600 text-sm">Detailed insights and optimization recommendations</p>
          </button>
        </div>
      </div>

      {/* Active Lead Generation Campaigns */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Active Lead Generation Campaigns</h3>
            <button onClick={() => setActiveTab('campaigns')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </button>
          </div>
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

  const renderLeads = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Lead Database & Management</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Import Leads
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Total Leads</h4>
          <p className="text-3xl font-bold text-blue-600">1,247</p>
          <p className="text-sm text-gray-600">+15% this month</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Qualified Leads</h4>
          <p className="text-3xl font-bold text-green-600">892</p>
          <p className="text-sm text-gray-600">71.5% qualification rate</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Avg Lead Score</h4>
          <p className="text-3xl font-bold text-purple-600">8.2</p>
          <p className="text-sm text-gray-600">Out of 10</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Lead Activity</h4>
        <div className="space-y-3">
          {[
            { company: "TechCorp Solutions", status: "Hot Lead", score: 9, source: "LinkedIn" },
            { company: "DigitalFirst Apps", status: "Warm", score: 7, source: "Email Campaign" },
            { company: "CloudBridge Systems", status: "Hot Lead", score: 9, source: "Website Form" },
            { company: "DataDriven Solutions", status: "Qualified", score: 8, source: "Referral" }
          ].map((lead, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{lead.company}</p>
                <p className="text-sm text-gray-600">{lead.source}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.score >= 8 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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
  );

  const renderCampaigns = () => (
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

  const renderAutomation = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">AI-Powered Automation Workflows</h3>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Create Workflow
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Active Automation Sequences</h4>
          <div className="space-y-3">
            {[
              { name: "B2B SaaS Follow-up", triggers: 234, status: "Active" },
              { name: "Real Estate Nurturing", triggers: 156, status: "Active" },
              { name: "Healthcare Outreach", triggers: 89, status: "Paused" },
              { name: "E-commerce Retargeting", triggers: 445, status: "Active" }
            ].map((sequence, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sequence.name}</p>
                  <p className="text-sm text-gray-600">{sequence.triggers} triggers this week</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  sequence.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {sequence.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Quick Automation Templates</h4>
          <div className="grid grid-cols-1 gap-3">
            {[
              "LinkedIn Connection → Email Follow-up",
              "Website Visit → Retargeting Ads",
              "Lead Form → Welcome Email Series",
              "Demo Completed → Sales Call Booking"
            ].map((template, index) => (
              <button key={index} className="text-left p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-shadow">
                <p className="text-sm font-medium text-gray-900">{template}</p>
                <p className="text-xs text-gray-600">Drag to customize</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Performance Analytics & Insights</h3>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Report
          </button>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Platform Tour - Advanced Lead Generation Suite</h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📈</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Dashboard</h4>
                  <p>Real-time lead metrics, pipeline value, conversion rates and cost per lead tracking</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Campaigns</h4>
                  <p>Create and manage AI-powered lead generation campaigns across multiple channels</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">👥</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Lead Database</h4>
                  <p>Centralized lead management with AI scoring, qualification and nurturing progress</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Automation</h4>
                  <p>Smart nurturing sequences, follow-up workflows and intelligent lead assignment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📈</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Analytics</h4>
                  <p>Detailed performance insights, ROI tracking and optimization recommendations</p>
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
