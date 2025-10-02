'use client';

import React, { useState, useEffect } from 'react';
import { BUSINESS_TIERS, financialCalculator } from '../lib/core/businessModel';
import { leadQualifier } from '../lib/ai/scoringEngine';

interface SustainableModelDemoProps {
  onModelComplete?: () => void;
}

export default function SustainableBusinessModelDemo({ onModelComplete }: SustainableModelDemoProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [businessMetrics, setBusinessMetrics] = useState<any>(null);
  const [leadsProcessed, setLeadsProcessed] = useState(0);
  const [autoProcessing, setAutoProcessing] = useState(false);

  // Simulate lead processing automation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoProcessing && selectedTier) {
      interval = setInterval(() => {
        setLeadsProcessed(prev => {
          const tier = BUSINESS_TIERS.find(t => t.id === selectedTier);
          if (tier && prev < tier.scope.maxProspects) {
            return prev + Math.floor(Math.random() * 3) + 1;
          }
          return prev;
        });
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoProcessing, selectedTier]);

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    setBusinessMetrics({
      margin: financialCalculator.calculateMargin(tierId),
      customerLTV: financialCalculator.calculateCustomerLifetimeValue(tierId),
      paybackPeriod: financialCalculator.calculatePaybackPeriod(tierId, 5000), // ₹5K CAC
      monthlyProfit: BUSINESS_TIERS.find(t => t.id === tierId)?.monthlyPrice - 
                   Object.values(BUSINESS_TIERS.find(t => t.id === tierId)?.costStructure || {}).reduce((sum: number, cost: number) => sum + cost, 0)
    });
  };

  const demoAIQualification = async () => {
    const sampleProspect = {
      email: 'ceo@techinnovate.com',
      jobTitle: 'CEO & Founder',
      company: 'TechInnovate Solutions',
      companySize: 150,
      industry: 'technology'
    };

    try {
      const result = await leadQualifier.qualifyProspect(sampleProspect);
      return result;
    } catch (error) {
      console.error('AI qualification demo error:', error);
      return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Sustainable Business Model Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Sustainable Business Model MVP</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Built on solid legal foundations, profitable unit economics, and scalable AI infrastructure
          </p>
        </div>

        {/* Key Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-green-600 text-2xl mb-3">⚖️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Legal Compliance</h3>
            <p className="text-sm text-gray-600">100% compliant data sourcing with proper consent management</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-blue-600 text-2xl mb-3">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">Profitable Margins</h3>
            <p className="text-sm text-gray-600">60-70% margins with sustainable pricing structure</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-purple-600 text-2xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Infrastructure</h3>
            <p className="text-sm text-gray-600">Real lead scoring, automation, and learning systems</p>
          </div>
        </div>
      </div>

      {/* Business Tier Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">🎯 Choose Your Sustainable Tier</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUSINESS_TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => handleTierSelect(tier.id)}
              className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${
                selectedTier === tier.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{tier.name}</h4>
                <div className="text-2xl font-bold text-blue-600">₹{tier.monthlyPrice.toLocaleString()}/mo</div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Prospects:</span>
                    <span className="font-medium">{tier.scope.maxProspects === Infinity ? 'Unlimited' : tier.scope.maxProspects}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Customer:</span>
                    <span className="font-medium">{tier.targetCustomer.companySize}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-1 mb-4">
                {tier.scope.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
                {tier.scope.features.length > 4 && (
                  <li className="text-sm text-blue-600">+{tier.scope.features.length - 4} more features</li>
                )}
              </ul>

              <div className="text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedTier === tier.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {selectedTier === tier.id ? 'Selected' : 'Click to Select'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Business Metrics */}
      {businessMetrics && selectedTier && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">📊 Live Business Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{businessMetrics.margin}%</div>
              <div className="text-sm text-green-700">Margin</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">₹{Math.round(businessMetrics.customerLTV/1000)}K</div>
              <div className="text-sm text-blue-700">LTV</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{businessMetrics.paybackPeriod.toFixed(1)} mo</div>
              <div className="text-sm text-purple-700">Payback</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">₹{Math.round(businessMetrics.monthlyProfit/1000)}K</div>
              <div className="text-sm text-orange-700">Monthly Profit</div>
            </div>
          </div>

          {/* AI Lead Processing Demo */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">🤖 AI Lead Processing Engine</h4>
              <button
                onClick={() => setAutoProcessing(!autoProcessing)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  autoProcessing
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {autoProcessing ? '⏸️ Stop' : '▶️ Start Demo'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Live Processing</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processed Leads:</span>
                    <span className="font-medium">{leadsProcessed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Qualification Rate:</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">AI Accuracy:</span>
                    <span className="font-medium text-blue-600">92%</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Demo AI Qualification</h5>
                <button
                  onClick={async () => {
                    const result = await demoAIQualification();
                    alert(`AI Score: ${result?.overallScore}/100\nRecommendation: ${result?.recommendation}\nExplanation: ${result?.explanation}`);
                  }}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                >
                  Test AI on Sample Prospect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Implementation Roadmap */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">🗺️ Implementation Roadmap</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Legal Compliance Infrastructure (Weeks 1-2)</h4>
              <p className="text-blue-700 text-sm mb-2">Implement GDPR-compliant data handling, consent management, and audit logging systems</p>
              <div className="text-xs text-blue-600">✅ Data sourcing policies • ✅ Consent tracking • ✅ Audit frameworks</div>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">AI Scoring Engine (Weeks 3-4)</h4>
              <p className="text-green-700 text-sm mb-2">Build ensemble scoring models for lead qualification with explainable AI</p>
              <div className="text-xs text-green-600">✅ Multi-model architecture • ✅ Confidence scoring • ✅ Performance tracking</div>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Automation Framework (Weeks 5-6)</h4>
              <p className="text-purple-700 text-sm mb-2">Implement CRM integrations, outreach automation, and campaign management</p>
              <div className="text-xs text-purple-600">⏳ HubSpot API • ⏳ Salesforce integration • ⏳ Email automation</div>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h4 className="font-semibold text-orange-900 mb-2">Market Launch (Weeks 7-8)</h4>
              <p className="text-orange-700 text-sm mb-2">Beta testing, pricing optimization, and go-to-market execution</p>
              <div className="text-xs text-orange-600">⏳ Customer onboarding • ⏳ Performance optimization • ⏳ Scaling</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">🚀 Ready to Build Something Sustainable?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          This business model provides the foundation for a truly scalable, profitable, and compliant 
          AI-powered lead generation business
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onModelComplete?.()}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            🏗️ Implement Foundation
          </button>
          <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            📋 Review Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
