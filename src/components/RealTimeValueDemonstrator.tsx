'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface ValueCalculatorProps {
  industry: string;
  companySize: string;
  monthlyTarget: number;
  currentCostPerLead: number;
}

interface ROIProjection {
  monthlyLeads: number;
  costPerLead: number;
  totalCost: number;
  conversionRate: number;
  qualifiedLeads: number;
  avgDealValue: number;
  monthlyRevenue: number;
  roi: number;
  savings: number;
  timeToPayback: number;
}

export default function RealTimeValueDemonstrator() {
  const [calculatorData, setCalculatorData] = useState<ValueCalculatorProps>({
    industry: 'Technology & IT',
    companySize: '10-50',
    monthlyTarget: 100,
    currentCostPerLead: 75
  });

  const [roiProjection, setROIProjection] = useState<ROIProjection | null>(null);
  const [showCalculator, setShowCalculator] = useState(true);
  const [simulationActive, setSimulationActive] = useState(false);

  // Industry benchmarks (avg values)
  const industryBenchmarks = {
    'Technology & IT': { conversion: 12.5, avgDeal: 150000, cpl: 85 },
    'E-commerce': { conversion: 15.2, avgDeal: 45000, cpl: 65 },
    'Business Consulting': { conversion: 18.7, avgDeal: 180000, cpl: 95 },
    'Real Estate': { conversion: 8.2, avgDeal: 220000, cpl: 72 },
    'Healthcare': { conversion: 6.5, avgDeal: 320000, cpl: 125 },
    'Manufacturing': { conversion: 10.1, avgDeal: 195000, cpl: 78 },
    'Education': { conversion: 22.3, avgDeal: 85000, cpl: 45 }
  };

  // Calculate ROI projection
  const calculateROI = useCallback(() => {
    const benchmark = industryBenchmarks[calculatorData.industry as keyof typeof industryBenchmarks];
    const ourCPL = Math.max(benchmark.cpl * 0.65, 25); // Our platform is 35% better than industry avg
    
    const totalCost = calculatorData.monthlyTarget * ourCPL;
    const conversionRate = benchmark.conversion * 1.15; // We're 15% better
    const qualifiedLeads = Math.floor(calculatorData.monthlyTarget * conversionRate / 100);
    const monthlyRevenue = qualifiedLeads * benchmark.avgDeal;
    const roi = ((monthlyRevenue - totalCost) / totalCost) * 100;
    const savings = calculatorData.monthlyTarget * (calculatorData.currentCostPerLead - ourCPL);
    const timeToPayback = Math.ceil(totalCost / savings);

    setROIProjection({
      monthlyLeads: calculatorData.monthlyTarget,
      costPerLead: ourCPL,
      totalCost,
      conversionRate,
      qualifiedLeads,
      avgDealValue: benchmark.avgDeal,
      monthlyRevenue,
      roi,
      savings,
      timeToPayback: timeToPayback || 1
    });
  }, [calculatorData]);

  useEffect(() => {
    calculateROI();
  }, [calculateROI]);

  // Simulate live lead generation
  useEffect(() => {
    if (!simulationActive) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newCount = Math.floor(Math.random() * 3) + 1;
        setCalculatorData(prev => ({
          ...prev,
          monthlyTarget: prev.monthlyTarget + newCount
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [simulationActive]);

  const industries = Object.keys(industryBenchmarks);
  const companySizes = ['1-10', '10-50', '50-200', '200+'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">💡 Real-Time Value Calculator</h2>
            <p className="text-gray-600 mt-2">See how much you can save with AI-powered lead generation</p>
          </div>
          <button
            onClick={() => setSimulationActive(!simulationActive)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              simulationActive 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {simulationActive ? '⏸️ Stop Simulation' : '▶️ Live Demo'}
          </button>
        </div>
      </div>

      {roiProjection && (
        <>
          {/* Quick Results Banner */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-lg font-semibold">Your Potential ROI</h3>
                  <p className="text-green-100">With TransitionMarketing AI</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{Math.round(roiProjection.roi)}%</div>
                  <div className="text-sm text-green-100">ROI</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">₹{roiProjection.savings.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Monthly Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{roiProjection.qualifiedLeads}</div>
                <div className="text-sm text-gray-600">Qualified Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">₹{(roiProjection.monthlyRevenue / 100000).toFixed(1)}L</div>
                <div className="text-sm text-gray-600">Monthly Revenue</div>
              </div>
            </div>
          </div>

          {/* Calculator Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Inputs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">🎯 Configure Your Campaign</h3>
              
              <div className="space-y-6">
                {/* Industry Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={calculatorData.industry}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    {companySizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setCalculatorData(prev => ({ ...prev, companySize: size }))}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          calculatorData.companySize === size
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size} employees
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Lead Target */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Lead Target: {calculatorData.monthlyTarget} leads
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={calculatorData.monthlyTarget}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, monthlyTarget: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10</span>
                    <span>500</span>
                    <span>1000</span>
                  </div>
                </div>

                {/* Current Cost per Lead */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Current Cost per Lead: ₹{calculatorData.currentCostPerLead}
                  </label>
                  <input
                    type="range"
                    min="25"
                    max="300"
                    step="5"
                    value={calculatorData.currentCostPerLead}
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, currentCostPerLead: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹25</span>
                    <span>₹150</span>
                    <span>₹300</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* Savings Calculator */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Cost Comparison</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Current Method</span>
                    <span className="font-semibold">₹{calculatorData.currentCostPerLead}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-800">With Our AI Platform</span>
                    <span className="font-semibold text-green-700">₹{roiProjection.costPerLead}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-blue-800 font-medium">Monthly Savings</span>
                    <span className="text-xl font-bold text-blue-700">₹{roiProjection.savings.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-800">
                    <strong>Yearly Savings:</strong> ₹{(roiProjection.savings * 12).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Revenue Projection */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Revenue Projection</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lead Generation Rate</span>
                    <span className="font-medium">{roiProjection.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Qualified Leads/Month</span>
                    <span className="font-medium">{roiProjection.qualifiedLeads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Deal Value</span>
                    <span className="font-medium">₹{(roiProjection.avgDealValue / 100000).toFixed(1)}L</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-medium">Estimated Monthly Revenue</span>
                      <span className="text-xl font-bold text-green-600">₹{(roiProjection.monthlyRevenue / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payback Period */}
              <div className="background-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⏰ Return Timeline</h3>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{roiProjection.timeToPayback} Month{roiProjection.timeToPayback !== 1 ? 's' : ''}</div>
                  <div className="text-sm text-gray-600">Time to see positive ROI</div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-sm text-yellow-800">
                    🎯 <strong>Success Guarantee:</strong> Start seeing positive ROI within 2 months or get your money back
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">🚀 Ready to Start Your ROI Journey?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join over 500+ Indian businesses already saving ₹{roiProjection.savings.toLocaleString()}/month with our AI-powered lead generation
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  🎯 Start Free 14-Day Trial
                </button>
                <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  📞 Book Expert Demo
                </button>
              </div>
              
              <p className="text-sm text-blue-100 mt-4">
                ✨ No setup fees • Cancel anytime • Premium support included
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
