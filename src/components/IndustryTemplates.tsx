'use client';

import React, { useState } from 'react';

interface IndustryTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  marketSize: string;
  avgDealValue: string;
  targetRoles: string[];
  cities: string[];
  channels: string[];
  conversionRate: string;
  costPerLead: string;
  templates: {
    email: string[];
    linkedin: string[];
    whatsapp: string[];
  };
  campaigns: {
    awareness: string[];
    consideration: string[];
    conversion: string[];
  };
  metrics: {
    industryBenchmark: string;
    bestPerforming: string[];
    seasonalTrends: string[];
  };
}

const industryData: IndustryTemplate[] = [
  {
    id: 'technology',
    name: 'Technology & IT Services',
    icon: '💻',
    description: 'SaaS platforms, software development, IT consulting, cloud services',
    marketSize: '₹15.8 Lakh Cr',
    avgDealValue: '₹2.5 Lakh',
    targetRoles: ['CTO', 'VP Engineering', 'Head of IT', 'Technical Director', 'Product Manager'],
    cities: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai', 'Delhi'],
    channels: ['LinkedIn', 'Email', 'Technical Forums', 'Industry Events'],
    conversionRate: '8-15%',
    costPerLead: '₹65',
    templates: {
      email: [
        'Thought Leadership: Latest Tech Trends',
        'Solution-Fit: Custom Software Development',
        'ROI Calculator: Cost-Benefit Analysis',
        'Case Study: Successful Implementation'
      ],
      linkedin: [
        'Industry Insights Sharing',
        'Thought Leadership Post',
        'Company Milestone Celebration',
        'Resource Sharing'
      ],
      whatsapp: [
        'Quick Demo Request',
        'Technical Query Response',
        'Meeting Reminder',
        'Follow-up Verification'
      ]
    },
    campaigns: {
      awareness: [
        'Whitepaper Downloads',
        'Webinar Registrations',
        'Industry Report Sharing',
        'Tech Trend Discussions'
      ],
      consideration: [
        'Product Demonstrations',
        'Custom Solution Proposals',
        'ROI Calculations',
        'Security Compliance Info'
      ],
      conversion: [
        'Free Trial Offers',
        'Pilot Project Proposals',
        'Implementation Roadmap',
        'Team Onboarding Plans'
      ]
    },
    metrics: {
      industryBenchmark: 'Lead volume: 500-2000/month',
      bestPerforming: ['LinkedIn Outreach', 'Technical Webinars', 'Open Source Contributions'],
      seasonalTrends: ['Q4 Budget Planning', 'Q1 Technology Upgrades', 'Monsoon: Remote Work Solutions']
    }
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Retail',
    icon: '🛒',
    description: 'Online marketplaces, retail chains, D2C brands, logistics & fulfillment',
    marketSize: '₹5.7 Lakh Cr',
    avgDealValue: '₹1.2 Lakh',
    targetRoles: ['Growth Manager', 'Digital Marketing Head', 'E-commerce Director', 'Operations Head'],
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'],
    channels: ['WhatsApp', 'Email', 'Social Media', 'Marketplace Platforms'],
    conversionRate: '6-18%',
    costPerLead: '₹35',
    templates: {
      email: [
        'Seasonal Marketing: Festival Promotions',
        'Performance Analytics: Growth Metrics',
        'Competitive Analysis: Market Position',
        'Logistics Optimization: Cost Reduction'
      ],
      linkedin: [
        'Industry Growth Statistics',
        'Digital Transformation Case Study',
        'Customer Success Stories',
        'Market Trend Analysis'
      ],
      whatsapp: [
        'Live Chat Support',
        'Order Status Updates',
        'Product Recommendations',
        'Customer Feedback Collection'
      ]
    },
    campaigns: {
      awareness: [
        'Festival Season Campaigns',
        'Digital Payments Promotion',
        'Mobile Commerce Education',
        'Sustainable Shopping Awareness'
      ],
      consideration: [
        'Platform Comparison Guides',
        'ROI Calculation Tools',
        'Customer Journey Maps',
        'Competitive Pricing Analysis'
      ],
      conversion: [
        'Free Setup Offers',
        'Commission Holiday',
        'Extended Support Period',
        'Inventory Management Training'
      ]
    },
    metrics: {
      industryBenchmark: 'Lead volume: 1000-2000/month',
      bestPerforming: ['WhatsApp Marketing', 'Festival Campaigns', 'Social Commerce'],
      seasonalTrends: ['Diwali/Wedding Season', 'Q3 Back-to-School', 'Summer Pre-Festival']
    }
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: '🏢',
    description: 'Residential complexes, commercial properties, land development, PropTech',
    marketSize: '₹20 Lakh Cr',
    avgDealValue: '₹45 Lakh',
    targetRoles: ['Real Estate CEO', 'Investment Manager', 'Property Developer', 'Broker Principal'],
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Kolkata'],
    channels: ['WhatsApp', 'Email', 'Property Portals', 'Telecalling'],
    conversionRate: '4-12%',
    costPerLead: '₹125',
    templates: {
      email: [
        'Market Intelligence: Area Appreciation',
        'Investment Opportunity: Emerging Locations',
        'Legal Compliance: RERA Updates',
        'Financing Options: EMI Calculator'
      ],
      linkedin: [
        'Market Trends Analysis',
        'Investment Success Stories',
        'Infrastructure Development Updates',
        'Exclusive Launch Previews'
      ],
      whatsapp: [
        'Virtual Property Tours',
        'Price Drop Alerts',
        'Document Status Updates',
        'Booking Process Guidance'
      ]
    },
    campaigns: {
      awareness: [
        'Area Development Updates',
        'Investment Education Series',
        'Property Management Tips',
        'Legal Rights Awareness'
      ],
      consideration: [
        'Property Site Visits',
        'Investment Calculator Tools',
        'Loan Eligibility Check',
        'Legal Document Review'
      ],
      conversion: [
        'Early Bird Discounts',
        'Flexible Payment Plans',
        'Free Registration Offers',
        'After-Sales Service Guarantee'
      ]
    },
    metrics: {
      industryBenchmark: 'Lead volume: 200-800/month',
      bestPerforming: ['Virtual Tours', 'Price Alerts', 'Legal Consultation'],
      seasonalTrends: ['Monsoon: Rain Protection Features', 'Festival: Festival Promotions', 'Q4 Budget Planning']
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Pharma',
    icon: '🏥',
    description: 'Hospitals, clinics, pharmaceutical companies, medical equipment',
    marketSize: '₹8.8 Lakh Cr',
    avgDealValue: '₹8.5 Lakh',
    targetRoles: ['Hospital Administrator', 'Chief Medical Officer', 'Procurement Head'],
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
    channels: ['Email', 'Industry Publications', 'Medical Conferences', 'Telecalling'],
    conversionRate: '10-20%',
    costPerLead: '₹185',
    templates: {
      email: [
        'Medical Research: Clinical Studies',
        'Compliance Updates: Regulatory Changes',
        'Cost-Effectiveness: ROI Analysis',
        'Patient Safety: Quality Assurance'
      ],
      linkedin: [
        'Medical Innovation Updates',
        'Healthcare Policy Analysis',
        'Patient Care Stories',
        'Medical Research Findings'
      ],
      whatsapp: [
        'Emergency Response Support',
        'Appointment Scheduling',
        'Patient Care Updates',
        'Staff Training Notifications'
      ]
    },
    campaigns: {
      awareness: [
        'Healthcare Awareness Campaigns',
        'Medical Innovation Updates',
        'Public Health Initiatives',
        'Preventive Care Education'
      ],
      consideration: [
        'Equipment Demonstrations',
        'Clinical Trial Promotions',
        'ComplianceTraining',
        'Partnership Opportunities'
      ],
      conversion: [
        'Free Consultation Offers',
        'Trial Installation',
        'Extended Warranties',
        'Training Programs'
      ]
    },
    metrics: {
      industryBenchmark: 'Lead volume: 300-1000/month',
      bestPerforming: ['Medical Publications', 'Conference Networking', 'Regulatory Updates'],
      seasonalTrends: ['Monsoon Disease Prevention', 'Winter Health Campaigns', 'Summer Dehydration Awareness']
    }
  }
];

interface CityMetrics {
  [key: string]: {
    population: string;
    businessHub: string;
    averageIncome: string;
    techAdoption: string;
    languagePreferences: string[];
    bestTimeToContact: string;
  };
}

const cityMetrics: CityMetrics = {
  'Mumbai': {
    population: '20.4M',
    businessHub: 'Financial Capital',
    averageIncome: '₹8.5 L',
    techAdoption: '85%',
    languagePreferences: ['English', 'Hindi', 'Marathi'],
    bestTimeToContact: '10 AM - 1 PM, 3 PM - 6 PM'
  },
  'Delhi': {
    population: '32.9M',
    businessHub: 'Government & Corporates',
    averageIncome: '₹7.2 L',
    techAdoption: '78%',
    languagePreferences: ['English', 'Hindi', 'Punjabi'],
    bestTimeToContact: '11 AM - 2 PM, 4 PM - 7 PM'
  },
  'Bangalore': {
    population: '13.6M',
    businessHub: 'Tech Innovation Hub',
    averageIncome: '₹9.8 L',
    techAdoption: '92%',
    languagePreferences: ['English', 'Hindi', 'Kannada'],
    bestTimeToContact: '10 AM - 12 PM, 2 PM - 5 PM'
  },
  'Chennai': {
    population: '11M',
    businessHub: 'Manufacturing & IT',
    averageIncome: '₹6.9 L',
    techAdoption: '82%',
    languagePreferences: ['English', 'Hindi', 'Tamil'],
    bestTimeToContact: '10:30 AM - 1 PM, 3:30 PM - 6 PM'
  },
  'Hyderabad': {
    population: '9.7M',
    businessHub: 'Pharma & IT Services',
    averageIncome: '₹7.8 L',
    techAdoption: '88%',
    languagePreferences: ['English', 'Hindi', 'Telugu'],
    bestTimeToContact: '11 AM - 1:30 PM, 4 PM - 6:30 PM'
  },
  'Pune': {
    population: '7M',
    businessHub: 'Education & Technology',
    averageIncome: '₹8.2 L',
    techAdoption: '86%',
    languagePreferences: ['English', 'Hindi', 'Marathi'],
    bestTimeToContact: '10 AM - 1 PM, 3 PM - 6 PM'
  }
};

export default function IndustryTemplates() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'campaigns' | 'metrics' | 'cities'>('overview');

  const handleIndustrySelect = (industry: IndustryTemplate) => {
    setSelectedIndustry(industry);
    setActiveTab('overview');
  };

  const renderIndustryOverview = () => (
    <div className="space-y-6">
      {selectedIndustry && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Market Size</h4>
              <p className="text-xl font-bold text-blue-600">{selectedIndustry.marketSize}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-2">Avg Deal Value</h4>
              <p className="text-xl font-bold text-green-600">{selectedIndustry.avgDealValue}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-2">Conversion Rate</h4>
              <p className="text-xl font-bold text-purple-600">{selectedIndustry.conversionRate}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <h4 className="font-semibold text-orange-900 mb-2">Cost per Lead</h4>
              <p className="text-xl font-bold text-orange-600">{selectedIndustry.costPerLead}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Target Roles</h4>
              <div className="space-y-2">
                {selectedIndustry.targetRoles.map((role, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Primary Cities</h4>
              <div className="space-y-2">
                {selectedIndustry.cities.map((city, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Effective Channels</h4>
              <div className="space-y-2">
                {selectedIndustry.channels.map((channel, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {selectedIndustry && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">📧</span>
              Email Templates
            </h4>
            <div className="space-y-3">
              {selectedIndustry.templates.email.map((template, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <p className="text-gray-700">{template}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">💼</span>
              LinkedIn Templates
            </h4>
            <div className="space-y-3">
              {selectedIndustry.templates.linkedin.map((template, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <p className="text-gray-700">{template}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">📱</span>
              WhatsApp Templates
            </h4>
            <div className="space-y-3">
              {selectedIndustry.templates.whatsapp.map((template, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <p className="text-gray-700">{template}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      {selectedIndustry && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
            <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Awareness Campaigns
            </h4>
            <div className="space-y-3">
              {selectedIndustry.campaigns.awareness.map((campaign, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-gray-700">{campaign}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
            <h4 className="font-semibold text-green-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">️💡</span>
              Consideration Campaigns
            </h4>
            <div className="space-y-3">
              {selectedIndustry.campaigns.consideration.map((campaign, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-green-200">
                  <p className="text-gray-700">{campaign}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6">
            <h4 className="font-semibold text-purple-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">💸</span>
              Conversion Campaigns
            </h4>
            <div className="space-y-3">
              {selectedIndustry.campaigns.conversion.map((campaign, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-purple-200">
                  <p className="text-gray-700">{campaign}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-6">
      {selectedIndustry && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Best Performing Strategies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedIndustry.metrics.bestPerforming.map((strategy, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {strategy}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Seasonal Trends</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedIndustry.metrics.seasonalTrends.map((trend, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-gray-700">{trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCities = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">City-Specific Targeting Strategies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cityMetrics).map(([city, data]) => (
          <div key={city} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-4">{city}</h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Population:</span>
                <span className="ml-2 font-medium">{data.population}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Business Hub:</span>
                <span className="ml-2 font-medium">{data.businessHub}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Avg Income:</span>
                <span className="ml-2 font-medium">{data.averageIncome}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Tech Adoption:</span>
                <span className="ml-2 font-medium">{data.techAdoption}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Languages:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {data.languagePreferences.map((lang, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Best Time:</span>
                <span className="ml-2 font-medium text-sm">{data.bestTimeToContact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">AI-Powered Industry Templates</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {industryData.length} Pre-Built Lead Generation Templates
        </span>
      </div>

      {/* Industry Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {industryData.map((industry) => (
          <button
            key={industry.id}
            onClick={() => handleIndustrySelect(industry)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selectedIndustry?.id === industry.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="text-3xl mb-2">{industry.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{industry.name}</h3>
            <p className="text-sm text-gray-600">{industry.description}</p>
            <div className="mt-2 flex justify-between text-xs">
              <span className="text-green-600">Rate: {industry.conversionRate}</span>
              <span className="text-blue-600">Cost: {industry.costPerLead}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Industry Details */}
      {selectedIndustry && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="text-3xl mr-3">{selectedIndustry.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedIndustry.name}</h3>
              <p className="text-gray-600">{selectedIndustry.description}</p>
            </div>
          </div>

          {/* Sub-navigation */}
          <nav className="flex space-x-8 mb-6 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'templates', label: 'Templates', icon: '📝' },
              { id: 'campaigns', label: 'Campaigns', icon: '🎯' },
              { id: 'metrics', label: 'Metrics', icon: '📈' },
              { id: 'cities', label: 'Cities', icon: '🏙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Content Based on Active Tab */}
          {activeTab === 'overview' && renderIndustryOverview()}
          {activeTab === 'templates' && renderTemplates()}
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'metrics' && renderMetrics()}
          {activeTab === 'cities' && renderCities()}
        </div>
      )}
    </div>
  );
}
