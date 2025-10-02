'use client';

import React, { useState, useEffect } from 'react';

interface TierCity {
  id: string;
  name: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  state: string;
  population: number;
  populationGrowth: number;
  businessCount: number;
  averageBusinessRevenue: number;
  digitalPenetration: number;
  marketReadiness: 'high' | 'medium' | 'low';
  competitiveLandscape: 'high' | 'medium' | 'low';
  costEconomics: 'expensive' | 'moderate' | 'cost_effective';
  keyIndustries: string[];
  businessChallenges: string[];
  expansionOpportunities: string[];
}

interface MarketExpansionStrategy {
  city: string;
  approach: 'direct' | 'partner' | 'franchise' | 'digital';
  investmentRequired: number;
  expectedROI: number;
  timeline: string;
  riskLevel: 'low' | 'medium' | 'high';
  marketEntryStrategy: string[];
  operationalChallenges: string[];
  expectedMarketShare: number;
  milestones: Array<{
    phase: string;
    duration: string;
    objectives: string[];
    metrics: string[];
    budget: number;
  }>;
}

interface RegionalCompetition {
  city: string;
  competitors: Array<{
    name: string;
    strength: 'leading' | 'strong' | 'weak';
    marketShare: number;
    services: string[];
    pricing: 'high' | 'medium' | 'low';
  }>;
  gaps: string[];
  differentiationOpportunities: string[];
}

interface MarketPenetrationMetrics {
  city: string;
  targetBusinesses: number;
  currentPenetration: number;
  monthlyTarget: number;
  acquisitionChannels: string[];
  avgAcquisitionCost: number;
  customerPenetrationRate: number;
  churnRate: number;
  revenuePerCustomer: number;
}

export default function MarketExpansionStrategy() {
  const [cities, setCities] = useState<TierCity[]>([]);
  const [strategies, setStrategies] = useState<MarketExpansionStrategy[]>([]);
  const [competitionData, setCompetitionData] = useState<RegionalCompetition[]>([]);
  const [penetrationMetrics, setPenetrationMetrics] = useState<MarketPenetrationMetrics[]>([]);
  const [activeTab, setActiveTab] = useState<'cities' | 'strategies' | 'competition' | 'penetration' | 'roadmap'>('cities');
  const [selectedCity, setSelectedCity] = useState<TierCity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Tier-2 Cities Data
    setCities([
      {
        id: 'jaipur',
        name: 'Jaipur',
        tier: 'tier2',
        state: 'Rajasthan',
        population: 3500000,
        populationGrowth: 2.8,
        businessCount: 45000,
        averageBusinessRevenue: 1850000,
        digitalPenetration: 62,
        marketReadiness: 'high',
        competitiveLandscape: 'medium',
        costEconomics: 'cost_effective',
        keyIndustries: ['Tourism', 'Manufacturing', 'Jewelry', 'Retail'],
        businessChallenges: ['Limited digital adoption', 'Skill shortage', 'Competition from metros'],
        expansionOpportunities: ['Local partnerships', 'Tourism sector focus', 'Government initiatives']
      },
      {
        id: 'lucknow',
        name: 'Lucknow',
        tier: 'tier2',
        state: 'Uttar Pradesh',
        population: 4200000,
        populationGrowth: 3.2,
        businessCount: 52000,
        averageBusinessRevenue: 1200000,
        digitalPenetration: 58,
        marketReadiness: 'medium',
        competitiveLandscape: 'low',
        costEconomics: 'cost_effective',
        keyIndustries: ['Government', 'Healthcare', 'Education', 'Manufacturing'],
        businessChallenges: ['Bureaucratic hurdles', 'Infrastructure gaps', 'Limited tech talent'],
        expansionOpportunities: ['Government digitization', 'Healthcare expansion', 'Educational institutions']
      },
      {
        id: 'surat',
        name: 'Surat',
        tier: 'tier2',
        state: 'Gujarat',
        population: 6800000,
        populationGrowth: 4.1,
        businessCount: 78000,
        averageBusinessRevenue: 2800000,
        digitalPenetration: 71,
        marketReadiness: 'high',
        competitiveLandscape: 'medium',
        costEconomics: 'moderate',
        keyIndustries: ['Diamonds', 'Textiles', 'Trading', 'Manufacturing'],
        businessChallenges: ['High competition in diamond industry', 'Export dependency', 'Quality control'],
        expansionOpportunities: ['Export-focused businesses', 'Manufacturing automation', 'Supply chain optimization']
      },
      {
        id: 'indore',
        name: 'Indore',
        tier: 'tier2',
        state: 'Madhya Pradesh',
        population: 3200000,
        populationGrowth: 2.5,
        businessCount: 38000,
        averageBusinessRevenue: 1650000,
        digitalPenetration: 65,
        marketReadiness: 'high',
        competitiveLandscape: 'low',
        costEconomics: 'cost_effective',
        keyIndustries: ['Education', 'Agriculture', 'Manufacturing', 'IT Services'],
        businessChallenges: ['Market awareness', 'Brand building', 'Competition from metros'],
        expansionOpportunities: ['Educational institutions', 'Agri-tech', 'Manufacturing digitization']
      },
      // Tier-3 Cities
      {
        id: 'aurangabad',
        name: 'Aurangabad',
        tier: 'tier3',
        state: 'Maharashtra',
        population: 1800000,
        populationGrowth: 3.5,
        businessCount: 22000,
        averageBusinessRevenue: 950000,
        digitalPenetration: 45,
        marketReadiness: 'low',
        competitiveLandscape: 'low',
        costEconomics: 'cost_effective',
        keyIndustries: ['Tourism', 'Agriculture', 'Manufacturing'],
        businessChallenges: ['Low digital literacy', 'Infrastructure gaps', 'Logistic challenges'],
        expansionOpportunities: ['Tourism digitization', 'Agri-business automation', 'Manufacturing insights']
      },
      {
        id: 'madurai',
        name: 'Madurai',
        tier: 'tier3',
        state: 'Tamil Nadu',
        population: 1700000,
        populationGrowth: 2.9,
        businessCount: 28000,
        averageBusinessRevenue: 1120000,
        digitalPenetration: 52,
        marketReadiness: 'medium',
        competitiveLandscape: 'low',
        costEconomics: 'cost_effective',
        keyIndustries: ['Tourism', 'Handlooms', 'Agriculture', 'Education'],
        businessChallenges: ['Traditional business models', 'Limited tech adoption', 'Market education'],
        expansionOpportunities: ['Cultural tourism automation', 'Handloom digitization', 'Educational tech']
      }
    ]);

    setStrategies([
      {
        city: 'Jaipur',
        approach: 'partner',
        investmentRequired: 2500000,
        expectedROI: 185,
        timeline: '12 months',
        riskLevel: 'medium',
        marketEntryStrategy: [
          'Partner with local business chambers',
          'Establish tourism industry partnerships',
          'Launch with jewelry and retail sectors',
          'Leverage government digitization initiatives'
        ],
        operationalChallenges: [
          'Building local market presence',
          'Competing with metro-based services',
          'Seasonal tourism fluctuations'
        ],
        expectedMarketShare: 15,
        milestones: [
          {
            phase: 'Market Entry',
            duration: '3 months',
            objectives: ['Establish local partnerships', 'Complete market research'],
            metrics: ['5 partnership agreements', '100 business contacts'],
            budget: 800000
          },
          {
            phase: 'Growth',
            duration: '6 months',
            objectives: ['Achieve first 100 customers', 'Build brand recognition'],
            metrics: ['100 customers', '25% market awareness'],
            budget: 1200000
          },
          {
            phase: 'Scale',
            duration: '3 months',
            objectives: ['Reach financial sustainability', 'Expand service offerings'],
            metrics: ['200+ customers', '₹15M+ revenue run rate'],
            budget: 500000
          }
        ]
      },
      {
        city: 'Lucknow',
        approach: 'direct',
        investmentRequired: 1850000,
        expectedROI: 220,
        timeline: '10 months',
        riskLevel: 'low',
        marketEntryStrategy: [
          'Direct government contract approach',
          'Healthcare sector focus',
          'Educational institutions partnership',
          'Manufacturing industry penetration'
        ],
        operationalChallenges: [
          'Government sales cycles',
          'Regulatory compliance requirements',
          'Competition from local IT companies'
        ],
        expectedMarketShare: 12,
        milestones: [
          {
            phase: 'Foundation',
            duration: '3 months',
            objectives: ['Complete regulatory approvals', 'Establish local presence'],
            metrics: ['Govt. approvals secured', 'Local office setup'],
            budget: 600000
          },
          {
            phase: 'Penetration',
            duration: '4 months',
            objectives: ['Sign first major contracts', 'Build customer base'],
            metrics: ['50 customers', '₹10M+ contracted revenue'],
            budget: 850000
          },
          {
            phase: 'Expansion',
            duration: '3 months',
            objectives: ['Achieve profitability', 'Scale operations'],
            metrics: ['150+ customers', '₹20M+ ARR'],
            budget: 400000
          }
        ]
      }
    ]);

    setCompetitionData([
      {
        city: 'Jaipur',
        competitors: [
          {
            name: 'Zoho (Remote)',
            strength: 'strong',
            marketShare: 25,
            services: ['CRM', 'Email Marketing', 'Basic Analytics'],
            pricing: 'medium'
          },
          {
            name: 'Salesforce Local Partner',
            strength: 'weak',
            marketShare: 8,
            services: ['Enterprise CRM'],
            pricing: 'high'
          },
          {
            name: 'Local IT Consultancy',
            strength: 'weak',
            marketShare: 15,
            services: ['Custom Solutions'],
            pricing: 'medium'
          }
        ],
        gaps: ['AI-powered lead generation', 'Industry-specific solutions', 'Regional language support'],
        differentiationOpportunities: ['Hindi-Gujarati interface', 'Tourism sector specialization', 'Cost-effective pricing']
      }
    ]);

    setPenetrationMetrics([
      {
        city: 'Jaipur',
        targetBusinesses: 45000,
        currentPenetration: 0,
        monthlyTarget: 50,
        acquisitionChannels: ['Partnership referrals', 'Digital marketing', 'Direct sales', 'Industry events'],
        avgAcquisitionCost: 850,
        customerPenetrationRate: 0,
        churnRate: 0,
        revenuePerCustomer: 36000
      },
      {
        city: 'Lucknow',
        targetBusinesses: 52000,
        currentPenetration: 0,
        monthlyTarget: 75,
        acquisitionChannels: ['Government contracts', 'Partner referrals', 'Direct sales', 'Healthcare/Tech conferences'],
        avgAcquisitionCost: 1200,
        customerPenetrationRate: 0,
        churnRate: 0,
        revenuePerCustomer: 42000
      }
    ]);

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

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getTierBadge = (tier: string): string => {
    switch (tier) {
      case 'tier1': return 'bg-blue-100 text-blue-800';
      case 'tier2': return 'bg-green-100 text-green-800';
      case 'tier3': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReadinessColor = (readiness: string): string => {
    switch (readiness) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing Indian market expansion opportunities...</p>
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
            <h2 className="text-2xl font-bold text-gray-900">🏙️ Market Expansion Strategy</h2>
            <p className="text-gray-600 mt-1">Strategic penetration into Tier-2 and Tier-3 Indian markets</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{cities.length}</div>
              <div className="text-sm text-gray-600">Target Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₹89M</div>
              <div className="text-sm text-gray-600">Investment Potential</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'cities', label: 'Target Cities', icon: '🏙️' },
              { id: 'strategies', label: 'Entry Strategies', icon: '🎯' },
              { id: 'competition', label: 'Competitive Analysis', icon: '⚔️' },
              { id: 'penetration', label: 'Penetration Metrics', icon: '📊' },
              { id: 'roadmap', label: 'Expansion Roadmap', icon: '🛣️' }
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

      {/* Target Cities Tab */}
      {activeTab === 'cities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cities.map(city => (
              <div 
                key={city.id} 
                className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedCity?.id === city.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTierBadge(city.tier)}`}>
                        {city.tier.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600">{city.state} • Population: {formatNumber(city.population)}</p>
                    <p className="text-sm text-gray-500">
                      {formatNumber(city.businessCount)} businesses • {city.populationGrowth}% growth
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReadinessColor(city.marketReadiness)}`}>
                    {city.marketReadiness.toUpperCase()} READINESS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Business Revenue</div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(city.averageBusinessRevenue)}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Digital Adoption</div>
                    <div className="text-lg font-bold text-gray-900">{city.digitalPenetration}%</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Industries</h4>
                    <div className="flex flex-wrap gap-2">
                      {city.keyIndustries.map((industry, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedCity?.id === city.id && (
                    <div className="space-y-3 pt-3 border-t border-gray-200">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Business Challenges</h4>
                        <div className="space-y-1">
                          {city.businessChallenges.map((challenge, i) => (
                            <div key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                              <span className="text-red-500 mt-1">•</span>
                              <span>{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Expansion Opportunities</h4>
                        <div className="space-y-1">
                          {city.expansionOpportunities.map((opportunity, i) => (
                            <div key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{opportunity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                    Create Strategy
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    Analyze Market
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Entry Strategies Tab */}
      {activeTab === 'strategies' && (
        <div className="space-y-6">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{strategy.city} Market Entry</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      strategy.approach === 'direct' ? 'bg-blue-100 text-blue-800' :
                      strategy.approach === 'partner' ? 'bg-green-100 text-green-800' :
                      strategy.approach === 'franchise' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {strategy.approach.toUpperCase()} APPROACH
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      strategy.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      strategy.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {strategy.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Investment: {formatCurrency(strategy.investmentRequired)} • 
                    Expected ROI: {strategy.expectedROI}% • 
                    Timeline: {strategy.timeline}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{strategy.expectedMarketShare}%</div>
                  <div className="text-sm text-gray-600">Expected Market Share</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">🎯 Market Entry Strategy</h4>
                  <ul className="space-y-2">
                    {strategy.marketEntryStrategy.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">⚠️ Operational Challenges</h4>
                  <ul className="space-y-2">
                    {strategy.operationalChallenges.map((challenge, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4">📅 Implementation Milestones</h4>
                <div className="space-y-4">
                  {strategy.milestones.map((milestone, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="font-semibold text-gray-900">{milestone.phase}</h5>
                          <p className="text-sm text-gray-600">Duration: {milestone.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">{formatCurrency(milestone.budget)}</div>
                          <div className="text-xs text-gray-500">Budget</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-xs font-medium text-gray-700 mb-2">OBJECTIVES</h6>
                          <ul className="space-y-1">
                            {milestone.objectives.map((objective, j) => (
                              <li key={j} className="text-xs text-gray-600 flex items-start space-x-1">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="text-xs font-medium text-gray-700 mb-2">METRICS</h6>
                          <ul className="space-y-1">
                            {milestone.metrics.map((metric, j) => (
                              <li key={j} className="text-xs text-gray-600 flex items-start space-x-1">
                                <span className="text-blue-500 mt-1">📊</span>
                                <span>{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Launch Strategy
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  Modify Plan
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                  Risk Assessment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Penetration Metrics Tab */}
      {activeTab === 'penetration' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Target Market</p>
                  <p className="text-3xl font-bold">{penetrationMetrics.reduce((acc, m) => acc + m.targetBusinesses, 0).toLocaleString()}</p>
                  <p className="text-blue-100 text-sm mt-2">Businesses across cities</p>
                </div>
                <div className="text-6xl opacity-20">🏢</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Monthly Targets</p>
                  <p className="text-3xl font-bold">{penetrationMetrics.reduce((acc, m) => acc + m.monthlyTarget, 0)}</p>
                  <p className="text-green-100 text-sm mt-2">New customers</p>
                </div>
                <div className="text-6xl opacity-20">🎯</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg Cost per Acquisition</p>
                  <p className="text-3xl font-bold">₹{Math.round(penetrationMetrics.reduce((acc, m) => acc + m.avgAcquisitionCost, 0) / penetrationMetrics.length)}</p>
                  <p className="text-purple-100 text-sm mt-2">Across all channels</p>
                </div>
                <div className="text-6xl opacity-20">💰</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {penetrationMetrics.map(metrics => (
              <div key={metrics.city} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{metrics.city} Market Penetration</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Target Market</div>
                    <div className="text-xl font-bold text-gray-900">{metrics.targetBusinesses.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Monthly Target</div>
                    <div className="text-xl font-bold text-gray-900">{metrics.monthlyTarget}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Acquisition Cost</div>
                    <div className="text-xl font-bold text-gray-900">₹{metrics.avgAcquisitionCost.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Revenue/Customer</div>
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(metrics.revenuePerCustomer)}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Acquisition Channels</h4>
                    <div className="flex flex-wrap gap-2">
                      {metrics.acquisitionChannels.map((channel, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Market Penetration Projection</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Year 1</span>
                        <span>{Math.round((metrics.monthlyTarget * 12) / metrics.targetBusinesses * 100) / 100}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(10, (metrics.monthlyTarget * 12) / metrics.targetBusinesses * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
