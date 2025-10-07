'use client';

import React, { useState, useEffect } from 'react';

export default function LeadGenerationDashboard() {
  const [activeTab, setActiveTab] = useState('generate');
  const [criteria, setCriteria] = useState({
    industry: '',
    location: '',
    companySize: '',
    keywords: ''
  });
  const [generatedLeads, setGeneratedLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample generated leads data
  useEffect(() => {
    setGeneratedLeads([
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@techcorp.in',
        company: 'TechCorp India Ltd',
        location: 'Bangalore',
        score: 95,
        title: 'CTO',
        phone: '+91-9876543210',
        industry: 'Technology',
        status: 'hot'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya.sharma@innovate.in',
        company: 'Innovate Solutions',
        location: 'Mumbai',
        score: 87,
        title: 'Marketing Director',
        phone: '+91-9765432109',
        industry: 'Marketing',
        status: 'warm'
      },
      {
        id: '3',
        name: 'Amit Patel',
        email: 'amit.patel@fintech.co',
        company: 'FinTech Solutions',
        location: 'Delhi',
        score: 92,
        title: 'CEO',
        phone: '+91-9654321098',
        industry: 'Finance',
        status: 'hot'
      }
    ]);
  }, []);

  const handleGenerateLeads = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/v1/leads/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry: criteria.industry,
          location: criteria.location,
          companySize: criteria.companySize,
          keywords: criteria.keywords,
          leadLimit: 10
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedLeads(data.leads);
        
        // Show success message
        alert(`Successfully generated ${data.leads.length} leads! Used ${data.creditsUsed} credits.`);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to generate leads');
      }
    } catch (error) {
      console.error('Error generating leads:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreLead = async (leadId: string) => {
    // Simulate scoring API call
    console.log('Scoring lead:', leadId);
  };

  const handleEnrichLead = async (leadId: string) => {
    // Simulate enrichment API call
    console.log('Enriching lead:', leadId);
  };

  const renderGenerateTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Lead Generation Criteria</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry Focus</label>
            <select 
              value={criteria.industry}
              onChange={(e) => setCriteria({...criteria, industry: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Industry</option>
              <optgroup label="Indian Tech Hubs">
                <option value="bangalore-tech">Bangalore IT</option>
                <option value="hyderabad-tech">Hyderabad Tech</option>
                <option value="mumbai-fintech">Mumbai FinTech</option>
                <option value="delhi-startups">Delhi Startups</option>
              </optgroup>
              <optgroup label="Traditional Industries">
                <option value="manufacturing">Manufacturing</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              value={criteria.location}
              onChange={(e) => setCriteria({...criteria, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Indian Cities</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="delhi">Delhi</option>
              <option value="chennai">Chennai</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="pune">Pune</option>
              <option value="kolkata">Kolkata</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
            <select 
              value={criteria.companySize}
              onChange={(e) => setCriteria({...criteria, companySize: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Sizes</option>
              <option value="startup">Startup (1-50)</option>
              <option value="small">Small (50-200)</option>
              <option value="medium">Medium (200-1000)</option>
              <option value="large">Large (1000+)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
            <input
              type="text"
              value={criteria.keywords}
              onChange={(e) => setCriteria({...criteria, keywords: e.target.value})}
              placeholder="e.g. SaaS, AI, Digital transformation"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerateLeads}
            disabled={loading || !criteria.industry}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating Leads...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Generate AI Leads</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">Generated Leads</h4>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              {generatedLeads.length} leads found
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {generatedLeads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.title}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.company}</div>
                    <div className="text-sm text-gray-500">{lead.industry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    🇮🇳 {lead.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      lead.score >= 90 ? 'bg-red-100 text-red-800' :
                      lead.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {lead.score}/100
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      lead.status === 'hot' ? 'bg-red-100 text-red-800' :
                      lead.status === 'warm' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleScoreLead(lead.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Score
                    </button>
                    <button
                      onClick={() => handleEnrichLead(lead.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Enrich
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSummaryTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-blue-600">1,247</div>
          <div className="text-sm text-gray-600">Total Leads</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-green-600">92%</div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-purple-600">₹45L</div>
          <div className="text-sm text-gray-600">Estimated Value</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-orange-600">₹34K</div>
          <div className="text-sm text-gray-600">Cost Saved</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Generation Summary</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Bangalore Tech Companies</span>
            <span className="text-sm font-medium">342 leads</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Mumbai FinTech</span>
            <span className="text-sm font-medium">285 leads</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Delhi Startups</span>
            <span className="text-sm font-medium">198 leads</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Chennai Manufacturing</span>
            <span className="text-sm font-medium">176 leads</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🇮🇳 AI Lead Generation</h2>
        <p className="text-gray-600">Generate high-quality leads from Indian companies using advanced AI algorithms</p>
        
        <div className="mt-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('generate')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'generate'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🚀 Generate Leads
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'summary'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📊 Summary
              </button>
            </nav>
          </div>
        </div>
      </div>

      {activeTab === 'generate' && renderGenerateTab()}
      {activeTab === 'summary' && renderSummaryTab()}
    </div>
  );
}

