'use client';

import React, { useState } from 'react';

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

interface CompetitorComparison {
  tool: string;
  monthlyCost: number;
  setupTime: string;
  maintenance: string;
  limitations: string[];
  ourAdvantage: string;
}

export default function AdvancedLeadEcosystem() {
  const [activePhase, setActivePhase] = useState(0);

  const servicePhases: ServicePhase[] = [
    {
      id: 'discovery',
      title: '🤖 AI-Powered Lead Discovery',
      description: 'Automated prospecting across LinkedIn, company databases, and Indian business directories',
      duration: '15 minutes',
      costSavings: '₹8,000/month',
      automation: '90% automated',
      icon: '🤖',
      features: [
        'LinkedIn scraping beyond Sales Navigator limits',
        'Real-time Indian company database updates',
        'Industry event attendee extraction',
        'Funding/growth alert triggers',
        'Decision maker identification with AI',
        'Indian business context scoring'
      ],
      result: '500+ qualified prospects identified'
    },
    {
      id: 'outreach',
      title: '📧 Multi-Channel Outreach Automation',
      description: 'Intelligent outreach across LinkedIn, Email, WhatsApp, and voice calling',
      duration: 'Setup complete',
      costSavings: '₹5,000/month',
      automation: '95% automated',
      icon: '📧',
      features: [
        'Progressive LinkedIn → Email → WhatsApp sequence',
        'Hindi + Regional language message generation',
        'Cultural context optimization for Indian businesses',
        'Response rate optimization (timing + content)',
        'Email deliverability tracking and improvement',
        'Real-time engagement monitoring'
      ],
      result: '15% average response rate vs 3% industry average'
    },
    {
      id: 'nurturing',
      title: '⚡ Smart Lead Nurturing & Qualification',
      description: 'Behavior-based lead scoring, routing, and conversion acceleration',
      duration: 'Ongoing',
      costSavings: '₹4,000/month',
      automation: '85% automated',
      icon: '⚡',
      features: [
        'Behavioral trigger-based follow-up sequences',
        'Lead scoring with Indian business intelligence',
        'Hot/Warm/Cold classification and routing',
        'Meeting booking automation with calendar sync',
        'Demo scheduling and preparation workflows',
        'Proposal generation with industry templates'
      ],
      result: '40% lead-to-opportunity conversion rate'
    },
    {
      id: 'conversion',
      title: '🎯 Conversion & Revenue Optimization',
      description: 'Complete pipeline management from lead to customer with ROI tracking',
      duration: 'Continuous',
      costSavings: '₹6,000/month',
      automation: '80% automated',
      icon: '🎯',
      features: [
        'Pipeline velocity tracking and optimization',
        'Revenue attribution across all channels',
        'A/B testing for message optimization',
        'Contract management and e-signature workflows',
        'Customer lifetime value prediction',
        'Churn prediction and retention campaigns'
      ],
      result: '25% improvement in sales cycle length'
    }
  ];

  const competitorComparison: CompetitorComparison[] = [
    {
      tool: 'LinkedIn Sales Navigator',
      monthlyCost: 5000,
      setupTime: '2-3 weeks',
      maintenance: '10 hours/week',
      limitations: ['Limited to LinkedIn', 'Manual prospecting', 'No CRM integration', 'Basic analytics'],
      ourAdvantage: 'Complete multi-platform automation + CRM + Analytics'
    },
    {
      tool: 'HubSpot CRM',
      monthlyCost: 8000,
      setupTime: '4-6 weeks',
      maintenance: '15 hours/week',
      limitations: ['No LinkedIn integration', 'Limited Indian features', 'Complex setup', 'High learning curve'],
      ourAdvantage: 'Platform includes LinkedIn + Email + WhatsApp + regional features'
    },
    {
      tool: 'Email Marketing Tools',
      monthlyCost: 3000,
      setupTime: '2-3 weeks',
      maintenance: '5 hours/week',
      limitations: ['Only email channel', 'Limited personalization', 'No lead discovery', 'Basic automation'],
      ourAdvantage: 'Multi-channel + AI personalization + lead discovery'
    },
    {
      tool: 'Analytics Platforms',
      monthlyCost: 2000,
      setupTime: '1-2 weeks',
      maintenance: '3 hours/week',
      limitations: ['Separate dashboard', 'Data silos', 'Manual reporting', 'No real-time insights'],
      ourAdvantage: 'Integrated analytics + real-time + automated insights'
    }
  ];

  const valueProposition = [
    {
      metric: '₹19,000',
      description: 'Monthly cost savings',
      detail: 'vs traditional multi-tool setup'
    },
    {
      metric: '33 hours',
      description: 'Weekly time savings',
      detail: 'vs manual lead generation'
    },
    {
      metric: '15 minutes',
      description: 'Setup time',
      detail: 'vs 2-3 months traditional'
    },
    {
      metric: '🇮🇳',
      description: 'Indian optimized',
      detail: 'Hindi, GST, UPI, cultural context'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Value proposition banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          🚀 Complete Lead Generation Ecosystem - All in One Dashboard
        </h2>
        <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Stop juggling 4-5 different tools. Our AI-powered platform delivers everything small businesses need 
          for professional lead generation - discovery, outreach, nurturing, and conversion - all automated.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {valueProposition.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{item.metric}</div>
              <div className="text-gray-700 font-medium mb-1">{item.description}</div>
              <div className="text-sm text-gray-500">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Service phases */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          📋 Complete Service Delivery - 4 Phase Framework
        </h3>
        
        <div className="space-y-8">
          {servicePhases.map((phase, index) => (
            <div key={phase.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${
              activePhase === index ? 'border-blue-300 shadow-lg' : ''
            }`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{phase.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{phase.title}</h4>
                    <p className="text-gray-600 mt-1">{phase.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActivePhase(index)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {activePhase === index ? '▼ Hide' : '▶ Show'} Details
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Setup Duration</div>
                  <div className="font-semibold text-gray-900">{phase.duration}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Monthly Savings</div>
                  <div className="font-semibold text-green-600">{phase.costSavings}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Automation Level</div>
                  <div className="font-semibold text-blue-600">{phase.automation}</div>
                </div>
              </div>

              {activePhase === index && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">🔧 Advanced Capabilities:</h5>
                    <ul className="space-y-2">
                      {phase.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">📊 Guaranteed Results:</h5>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-lg font-semibold text-blue-600 mb-2">{phase.result}</div>
                      <div className="text-sm text-blue-800">
                        Based on industry benchmarks and proven frameworks optimized for Indian business market
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Competitor comparison */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          💰 Why Our Platform Beats Multiple Tools
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Current Tools</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Monthly Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Setup Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Maintenance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Limitations</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Our Advantage</th>
              </tr>
            </thead>
            <tbody>
              {competitorComparison.map((comp, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{comp.tool}</td>
                  <td className="py-3 px-4 text-red-600 font-semibold">₹{comp.monthlyCost.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{comp.setupTime}</td>
                  <td className="py-3 px-4 text-gray-600">{comp.maintenance}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <ul className="text-sm space-y-1">
        {comp.limitations.map((limit, i) => (
                          <li key={i}>• {limit}</li>
                        ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 text-green-600 font-medium">{comp.ourAdvantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-green-100 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-green-800 text-lg">🎯 Our All-in-One Solution</h4>
              <p className="text-green-700 mt-1">
                Everything small businesses need for professional lead generation
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">₹12,999</div>
              <div className="text-sm text-green-600">Monthly (All features included)</div>
              <div className="text-xs text-green-500 mt-1">Save ₹19,000+ monthly vs separate tools</div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation framework */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          🚀 Implementation Excellence Framework
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Quick Launch</h4>
            <p className="text-gray-600 text-sm">
              15-minute guided setup with industry template selection and automated configuration
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Performance Tracking</h4>
            <p className="text-gray-600 text-sm">
              Real-time analytics with weekly optimization recommendations and monthly success reviews
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Indian Support</h4>
            <p className="text-gray-600 text-sm">
              Hindi + English support team with deep understanding of Indian business context and culture
            </p>
          </div>
        </div>
      </div>

      {/* Success guarantee */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">🎯 Success Guarantee or Full Refund</h3>
        <p className="text-blue-100 mb-6">
          If you don't see significant improvement in lead quality and response rates within 30 days, 
          we'll provide a full refund - no questions asked.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-xl font-bold mb-1">500+</div>
            <div className="text-sm text-blue-100">Qualified Leads/Month</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-xl font-bold mb-1">15%</div>
            <div className="text-sm text-blue-100">Response Rate Minimum</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-xl font-bold mb-1">₹26</div>
            <div className="text-sm text-blue-100">Cost per Qualified Lead</div>
          </div>
        </div>
      </div>
    </div>
  );
}
