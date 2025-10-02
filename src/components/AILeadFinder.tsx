'use client';

import React, { useState } from 'react';

interface AILead {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  linkedinUrl: string;
  score: number;
  email?: string;
  phone?: string;
  source: string;
  criteria: string[];
}

interface LeadFinderProps {
  onLeadSelect?: (lead: AILead) => void;
}

export default function AILeadFinder({ onLeadSelect }: LeadFinderProps) {
  const [criteria, setCriteria] = useState({
    name: '',
    location: '',
    industry: '',
    jobTitle: '',
    companySize: '',
    technologies: [] as string[],
    keywords: [] as string[]
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [leads, setLeads] = useState<AILead[]>([]);
  const [showForm, setShowForm] = useState(true);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 
    'Retail', 'Real Estate', 'Consulting', 'Marketing', 'E-commerce'
  ];

  const companySizes = [
    'Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 
    'Large (201-1000)', 'Enterprise (1000+)'
  ];

  const sampleLeads: AILead[] = [
    {
      id: '1',
      name: 'Rajesh Sharma',
      title: 'Head of Marketing',
      company: 'TechStarter Solutions',
      industry: 'Technology',
      location: 'Bangalore, India',
      linkedinUrl: 'https://linkedin.com/in/rajesh-sharma',
      email: 'rajesh@techstarter.com',
      phone: '+91 98765 43210',
      score: 95,
      source: 'LinkedIn + Company Website',
      criteria: ['Technology', 'Marketing Leadership', 'Bangalore']
    },
    {
      id: '2',
      name: 'Priya Singh',
      title: 'Product Manager',
      company: 'InnovateTech',
      industry: 'Technology',
      location: 'Mumbai, India',
      linkedinUrl: 'https://linkedin.com/in/priya-singh',
      email: 'priya@innovatetech.com',
      phone: '+91 87654 32100',
      score: 87,
      source: 'AI Web Crawler',
      criteria: ['Tech Product Management', 'Mumbai', 'B2B SaaS']
    },
    {
      id: '3',
      name: 'Amit Kumar',
      title: 'CEO',
      company: 'ScaleUp Ventures',
      industry: 'Finance',
      location: 'Delhi, India',
      linkedinUrl: 'https://linkedin.com/in/amit-kumar',
      email: 'amit@scaleupve.com',
      phone: '+91 76543 21000',
      score: 92,
      source: 'Industry Database',
      criteria: ['Fintech', 'Leadership', 'Delhi', 'Funding']
    },
    {
      id: '4',
      name: 'Sneha Patel',
      title: 'Marketing Director',
      company: 'GrowthHackers',
      industry: 'Marketing',
      location: 'Pune, India',
      linkedinUrl: 'https://linkedin.com/in/sneha-patel',
      email: 'sneha@growthhackers.in',
      phone: '+91 65432 10987',
      score: 89,
      source: 'Social Media + Website',
      criteria: ['Marketing', 'Growth', 'Pune', 'Digital']
    },
    {
      id: '5',
      name: 'Vikram Reddy',
      title: 'CTO',
      company: 'DataFlow Systems',
      industry: 'Technology',
      location: 'Hyderabad, India',
      linkedinUrl: 'https://linkedin.com/in/vikram-reddy',
      email: 'vikram@dataflow.com',
      phone: '+91 54321 09876',
      score: 91,
      source: 'Technical Publications',
      criteria: ['Technology', 'Leadership', 'Hyderabad', 'AI/ML']
    }
  ];

  const handleGenerateLeads = async () => {
    setIsGenerating(true);
    // Simulate AI lead generation
    setTimeout(() => {
      setLeads(sampleLeads);
      setIsGenerating(false);
      setShowForm(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 2 0 002 2z" />
            </svg>
            AI-Powered Lead Generation
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Prospects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use AI to discover qualified leads based on your ideal customer profile. 
            Our advanced algorithms scan multiple data sources to find prospects that match your criteria.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1M+</div>
            <div className="text-sm text-gray-600">Profiles Scanned</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">95%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600">Real-time Updates</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">10x</div>
            <div className="text-sm text-gray-600">Faster Than Manual</div>
          </div>
        </div>
      </div>

      {/* Lead Generation Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Define Your Ideal Customer Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Focus
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setCriteria({...criteria, industry: e.target.value})}
              >
                <option value="">Select Industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setCriteria({...criteria, companySize: e.target.value})}
              >
                <option value="">Select Company Size</option>
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title / Role
              </label>
              <input 
                type="text"
                placeholder="e.g., CEO, Marketing Manager, Founder"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setCriteria({...criteria, jobTitle: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input 
                type="text"
                placeholder="e.g., Bangalore, Mumbai, Remote"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setCriteria({...criteria, location: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technology Stack / Keywords
              </label>
              <input 
                type="text"
                placeholder="e.g., React, SaaS, AI/ML, Fintech"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setCriteria({...criteria, keywords: e.target.value.split(',')})}
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={handleGenerateLeads}
              disabled={isGenerating}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:brain-700 hover:shadow-lg text-white'
              }`}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  AI is finding perfect leads...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate AI-Powered Leads
                </span>
              )}
            </button>

            {isGenerating && (
              <div className="mt-4 text-sm text-gray-600">
                <p>🤖 Scanning LinkedIn profiles, company websites, and industry databases...</p>
                <p>📊 Analyzing company data, funding, and technology stacks...</p>
                <p>🎯 Scoring leads based on your ideal customer profile...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {leads.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Generated Leads</h2>
              <p className="text-gray-600">Found {leads.length} qualified prospects matching your criteria</p>
            </div>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Leads
            </button>
          </div>

          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.score)}`}>
                        {lead.score}% Match
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Title</p>
                        <p className="font-medium text-gray-900">{lead.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="font-medium text-gray-900">{lead.company}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">{lead.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {lead.criteria.map((crit, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                          {crit}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📧 {lead.email}</span>
                      <span>📱 {lead.phone}</span>
                      <span>🔄 Source: {lead.source}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => onLeadSelect?.(lead)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add to Pipeline
                    </button>
                    <a 
                      href={lead.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      View LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setShowForm(true)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Generate More Leads
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
