'use client';

import React, { useState, useEffect } from 'react';

interface PartnershipProspect {
  id: string;
  company: string;
  industry: string;
  size: 'startup' | 'sme' | 'enterprise';
  type: 'technology' | 'consulting' | 'industry_association' | 'channel_partner' | 'vendor' | 'government';
  status: 'researching' | 'contacted' | 'discussing' | 'pilot' | 'partnership' | 'rejected';
  revenuePotential: number; // Annual potential in INR
  collaborationLevel: 'basic' | 'strategic' | 'exclusive';
  contactPerson: string;
  contactEmail: string;
  lastInteraction: Date;
  notes: string;
  nextSteps: string;
  probability: number; // 0-100%
}

interface PartnershipOpportunity {
  id: string;
  title: string;
  description: string;
  partnerType: string;
  industry: string;
  revenueModel: 'commission' | 'subscription_split' | 'license_fee' | 'revenue_share';
  estimatedValue: number;
  implementationComplexity: 'low' | 'medium' | 'high';
  timeline: string;
  competitiveAdvantage: string[];
  mutualBenefits: string[];
  successCriteria: string[];
}

interface PartnershipAnalytics {
  totalOpportunities: number;
  opportunitiesByStage: Record<string, number>;
  averageDealSize: number;
  successRate: number;
  revenueImpact: number;
  partnerRetentionRate: number;
}

interface IndianBusinessNetwork {
  city: string;
  industry: string;
  businessType: string;
  networkSize: number;
  averageAnnualRevenue: number;
  partnershipReadiness: 'high' | 'medium' | 'low';
  preferredCollaborationType: string[];
  localBusinessChallenges: string[];
  digitalAdoptionLevel: number;
}

export default function StrategicPartnershipsManager() {
  const [partnerships, setPartnerships] = useState<PartnershipProspect[]>([]);
  const [opportunities, setOpportunities] = useState<PartnershipOpportunity[]>([]);
  const [analytics, setAnalytics] = useState<PartnershipAnalytics | null>(null);
  const [activeTab, setActiveTab] = useState<'prospects' | 'opportunities' | 'analytics' | 'indian_networks'>('prospects');
  const [showNewPartnership, setShowNewPartnership] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPartnershipData();
  }, []);

  const loadPartnershipData = async () => {
    setIsLoading(true);
    
    // Simulate API loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setPartnerships([
      {
        id: '1',
        company: 'Zoho Corporation',
        industry: 'SaaS & CRM',
        size: 'enterprise',
        type: 'technology',
        status: 'discussing',
        revenuePotential: 25000000,
        collaborationLevel: 'strategic',
        contactPerson: 'Rajesh Gopinathan',
        contactEmail: 'rajesh.g@zoho.com',
        lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Initial discussions about CRM integration partnership. Strong interest in our AI capabilities.',
        nextSteps: 'Schedule technical integration demo with their engineering team',
        probability: 85
      },
      {
        id: '2',
        company: 'Confederation of Indian Industry (CII)',
        industry: 'Industry Association',
        size: 'enterprise',
        type: 'industry_association',
        status: 'contacted',
        revenuePotential: 15000000,
        collaborationLevel: 'strategic',
        contactPerson: 'Prashant Kishor',
        contactEmail: 'p.kishor@cii.in',
        lastInteraction: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        notes: 'Reached out through regional director. Interest in promoting digital transformation for SME members.',
        nextSteps: 'Follow up with proposal for joint SME digitization initiative',
        probability: 72
      },
      {
        id: '3',
        company: 'Amazon Web Services India',
        industry: 'Cloud Infrastructure',
        size: 'enterprise',
        type: 'vendor',
        status: 'researching',
        revenuePotential: 8000000,
        collaborationLevel: 'basic',
        contactPerson: 'Neha Sharma',
        contactEmail: 'neha.sharma@amazon.in',
        lastInteraction: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        notes: 'Potential for joint go-to-market strategy leveraging AWS infrastructure and our AI platform.',
        nextSteps: 'Research AWS partner programs and prepare partnership proposal',
        probability: 45
      },
      {
        id: '4',
        company: 'Tech Mahindra',
        industry: 'IT Services',
        size: 'enterprise',
        type: 'channel_partner',
        status: 'pilot',
        revenuePotential: 18000000,
        collaborationLevel: 'strategic',
        contactPerson: 'Manoj Kumar',
        contactEmail: 'manoj.kumar@techmahindra.com',
        lastInteraction: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Pilot project with their Enterprise Solutions division. Strong early results.',
        nextSteps: 'Present pilot results and negotiate annual partnership agreement',
        probability: 92
      },
      {
        id: '5',
        company: 'Startup India Initiative',
        industry: 'Government Initiative',
        size: 'enterprise',
        type: 'government',
        status: 'discussing',
        revenuePotential: 12000000,
        collaborationLevel: 'strategic',
        contactPerson: 'Priyanka Singh',
        contactEmail: 'priyanka.singh@startupindia.gov.in',
        lastInteraction: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        notes: 'Discussion about becoming preferred AI solution provider for Startup India ecosystem.',
        nextSteps: 'Prepare formal proposal with pilot program for 100 startups',
        probability: 78
      }
    ]);

    setOpportunities([
      {
        id: 'opp1',
        title: 'SAP India Integration Partnership',
        description: 'Integrate our AI lead generation platform with SAP Sales Cloud to provide enhanced B2B sales capabilities for enterprise customers.',
        partnerType: 'Technology Partner',
        industry: 'Enterprise Software',
        revenueModel: 'revenue_share',
        estimatedValue: 30000000,
        implementationComplexity: 'high',
        timeline: '6-9 months',
        competitiveAdvantage: [
          'Only AI platform integrated with SAP Sales Cloud',
          'Advanced Indian market localization',
          'GST compliance built-in'
        ],
        mutualBenefits: [
          'SAP: Access to advanced AI capabilities',
          'Us: Access to enterprise customer base',
          'Customers: Seamless CRM-AI integration'
        ],
        successCriteria: [
          'Integration completed within timeline',
          '100+ joint customers in year 1',
          '₹30M+ joint revenue target'
        ]
      },
      {
        id: 'opp2',
        title: 'State Bank of India Digital Banking',
        description: 'Partner with SBI to provide AI-powered lead generation for their digital banking solutions targeting MSME customers.',
        partnerType: 'Financial Services Partner',
        industry: 'Banking & Finance',
        revenueModel: 'license_fee',
        estimatedValue: 45000000,
        implementationComplexity: 'high',
        timeline: '9-12 months',
        competitiveAdvantage: [
          'First AI platform approved by public sector bank',
          'Compliance with RBI regulations',
          'Multi-language support for diverse customer base'
        ],
        mutualBenefits: [
          'SBI: Enhanced digital service offerings',
          'Us: Scale across 24,000+ SBI branches',
          'MSMEs: Access to advanced banking AI'
        ],
        successCriteria: [
          'Successfully deployed across 500+ branches',
          '₹45M+ annual license revenue',
          'Enhanced SBI digital service adoption'
        ]
      }
    ]);

    setAnalytics({
      totalOpportunities: 12,
      opportunitiesByStage: {
        'researching': 3,
        'contacted': 2,
        'discussing': 4,
        'pilot': 2,
        'partnership': 1
      },
      averageDealSize: 15750000,
      successRate: 0.68,
      revenueImpact: 89000000,
      partnerRetentionRate: 0.75
    });

    setIsLoading(false);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'researching': return 'bg-gray-100 text-gray-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'discussing': return 'bg-yellow-100 text-yellow-800';
      case 'pilot': return 'bg-green-100 text-green-800';
      case 'partnership': return 'bg-green-200 text-green-900';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number): string => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading partnership opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🤝 Strategic Partnerships</h2>
            <p className="text-gray-600 mt-1">Build powerful alliances to accelerate growth across Indian markets</p>
          </div>
          <button
            onClick={() => setShowNewPartnership(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + New Partnership
          </button>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'prospects', label: 'Partnership Prospects', icon: '🎯' },
              { id: 'opportunities', label: 'Major Opportunities', icon: '💎' },
              { id: 'analytics', label: 'Partnership Analytics', icon: '📊' },
              { id: 'indian_networks', label: 'Indian Business Networks', icon: '🇮🇳' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-1 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Partnership Prospects Tab */}
      {activeTab === 'prospects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {partnerships.map(partnership => (
              <div key={partnership.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🏢</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{partnership.company}</h3>
                      <p className="text-gray-600">{partnership.industry} • {partnership.size.toUpperCase()}</p>
                      <p className="text-sm text-gray-500">
                        Contact: {partnership.contactPerson} • {partnership.contactEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusColor(partnership.status)}`}>
                      {partnership.status.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className={`text-sm font-medium ${getProbabilityColor(partnership.probability)}`}>
                      {partnership.probability}% probability
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Revenue Potential</div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(partnership.revenuePotential)}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Collaboration Level</div>
                    <div className="text-lg font-bold text-gray-900">{partnership.collaborationLevel.toUpperCase()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Last Interaction</div>
                    <div className="text-lg font-bold text-gray-900">
                      {partnership.lastInteraction.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Notes</h4>
                    <p className="text-sm text-gray-600">{partnership.notes}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Next Steps</h4>
                    <p className="text-sm text-gray-600">{partnership.nextSteps}</p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Update Status
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Major Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          {opportunities.map(opportunity => (
            <div key={opportunity.id} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {opportunity.partnerType}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {opportunity.industry}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      {opportunity.revenueModel.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(opportunity.estimatedValue)}
                  </div>
                  <div className="text-sm text-gray-600">Estimated Value</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">🎯 Competitive Advantage</h4>
                  <ul className="space-y-2">
                    {opportunity.competitiveAdvantage.map((advantage, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">🤝 Mutual Benefits</h4>
                  <ul className="space-y-2">
                    {opportunity.mutualBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Implementation Timeline</div>
                  <div className="text-lg font-semibold text-gray-900">{opportunity.timeline}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Complexity Level</div>
                  <div className="text-lg font-semibold text-gray-900 capitalize">{opportunity.implementationComplexity}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Success Probability</div>
                  <div className="text-lg font-semibold text-green-600">85%</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">📊 Success Criteria</h4>
                <div className="space-y-2">
                  {opportunity.successCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-gray-400 mr-2">{index + 1}.</span>
                      <span>{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Initiate Partnership
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  Create Proposal
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  Risk Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && analytics && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Opportunities</p>
                  <p className="text-3xl font-bold">{analytics.totalOpportunities}</p>
                  <p className="text-blue-100 text-sm mt-2">
                    {Object.values(analytics.opportunitiesByStage).reduce((a, b) => a + b, 0)} active
                  </p>
                </div>
                <div className="text-6xl opacity-20">🎯</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Success Rate</p>
                  <p className="text-3xl font-bold">{(analytics.successRate * 100).toFixed(1)}%</p>
                  <p className="text-green-100 text-sm mt-2">
                    Industry avg: 45%
                  </p>
                </div>
                <div className="text-6xl opacity-20">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                   <p className="text-purple-100 text-sm">Revenue Impact</p>
                  <p className="text-3xl font-bold">{formatCurrency(analytics.revenueImpact)}</p>
                  <p className="text-purple-100 text-sm mt-2">
                    Annual projected
                  </p>
                </div>
                <div className="text-6xl opacity-20">💰</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Avg Deal Size</p>
                  <p className="text-3xl font-bold">{formatCurrency(analytics.averageDealSize)}</p>
                  <p className="text-orange-100 text-sm mt-2">
                    Strategic partnerships
                  </p>
                </div>
                <div className="text-6xl opacity-20">🤝</div>
              </div>
            </div>
          </div>

          {/* Partnership Pipeline */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Partnership Pipeline</h3>
            <div className="space-y-4">
              {Object.entries(analytics.opportunitiesByStage).map(([stage, count]) => (
                <div key={stage} className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 capitalize">{stage.replace('_', ' ')}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(count / analytics.totalOpportunities) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Indian Business Networks Tab */}
      {activeTab === 'indian_networks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Major Indian Business Cities */}
            {[
              {
                city: 'Bangalore',
                industry: 'Technology',
                businessType: 'Tech Startups, IT Services',
                networkSize: 15000,
                averageAnnualRevenue: 25000000,
                partnershipReadiness: 'high',
                preferredCollaborationType: ['Tech partnerships', 'Joint ventures', 'Resource sharing'],
                localBusinessChallenges: ['Talent shortage', 'High operational costs', 'Scaling challenges'],
                digitalAdoptionLevel: 95
              },
              {
                city: 'Mumbai',
                industry: 'Finance & Banking',
                businessType: 'Corporate Finance, Real Estate',
                networkSize: 25000,
                averageAnnualRevenue: 45000000,
                partnershipReadiness: 'high',
                preferredCollaborationType: ['Financial partnerships', 'Joint ventures', 'Co-marketing'],
                localBusinessChallenges: ['Regulatory compliance', 'High competition', 'Market saturation'],
                digitalAdoptionLevel: 85
              },
              {
                city: 'Delhi NCR',
                industry: 'Government & Consulting',
                businessType: 'Government Services, Consulting',
                networkSize: 20000,
                averageAnnualRevenue: 32000000,
                partnershipReadiness: 'medium',
                preferredCollaborationType: ['Government partnerships', 'Policy advocacy', 'Sectoral collaboration'],
                localBusinessChallenges: ['Bureaucratic processes', 'Policy changes', 'Competition from MNCs'],
                digitalAdoptionLevel: 70
              },
              {
                city: 'Chennai',
                industry: 'Manufacturing & Automotive',
                businessType: 'Auto Components, Chemicals',
                networkSize: 12000,
                averageAnnualRevenue: 28000000,
                partnershipReadiness: 'medium',
                preferredCollaborationType: ['Supply chain partnerships', 'Technology transfer', 'Joint R&D'],
                localBusinessChallenges: ['Supply chain disruptions', 'Environmental compliance', 'Technology integration'],
                digitalAdoptionLevel: 65
              }
            ].map((network, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{network.city}</h3>
                    <p className="text-gray-600">{network.industry} • {network.businessType}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    network.partnershipReadiness === 'high' ? 'bg-green-100 text-green-800' :
                    network.partnershipReadiness === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {network.partnershipReadiness.toUpperCase()} READINESS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Network Size</div>
                    <div className="text-lg font-bold text-gray-900">{network.networkSize.toLocaleString()} businesses</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Avg Revenue</div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(network.averageAnnualRevenue)}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Preferred Partnerships</h4>
                    <div className="flex flex-wrap gap-2">
                      {network.preferredCollaborationType.map((type, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Main Challenges</h4>
                    <div className="flex flex-wrap gap-2">
                      {network.localBusinessChallenges.map((challenge, i) => (
                        <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                          {challenge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Digital Adoption Level</span>
                    <span className="text-sm font-medium">{network.digitalAdoptionLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${network.digitalAdoptionLevel}%` }}
                    ></div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  Explore Partnership Opportunities
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Partnership Modal */}
      {showNewPartnership && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">+ New Partnership Prospect</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Manufacturing</option>
                  <option>Healthcare</option>
                  <option>Government</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => setShowNewPartnership(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // TODO: Add partnership logic
                  setShowNewPartnership(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Partnership Prospect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
