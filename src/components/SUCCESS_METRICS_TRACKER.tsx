'use client';

import React, { useState, useEffect } from 'react';

interface BusinessMetrics {
  monthlyRevenue: number;
  costSavings: number;
  leadConversion: string;
  customerLifetimeValue: number;
  churnRate: number;
  monthlyActiveUsers: number;
  revenueGrowth: number;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  progress: number;
}

export default function SUCCESS_METRICS_TRACKER() {
  const [metrics, setMetrics] = useState<BusinessMetrics>({
    monthlyRevenue: 1850000,
    costSavings: 234000,
    leadConversion: '23.4%',
    customerLifetimeValue: 425000,
    churnRate: 3.2,
    monthlyActiveUsers: 1247,
    revenueGrowth: 45.6
  });

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Monthly Recurring Revenue',
      target: 2500000,
      current: 1850000,
      deadline: '2024-03-01',
      progress: 74
    },
    {
      id: '2',
      name: 'Customer Acquisition',
      target: 150,
      current: 124,
      deadline: '2024-02-15',
      progress: 83
    },
    {
      id: '3',
      name: 'Cost Reduction Target',
      target: 400000,
      current: 234000,
      deadline: '2024-02-28',
      progress: 59
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">📊 Business Success Metrics</h2>
        <p className="text-gray-600 text-lg">Track your AI lead generation ROI and business growth</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Revenue', value: `₹${(metrics.monthlyRevenue / 100000).toFixed(1)}L`, change: '+45%', color: 'green' },
          { label: 'Cost Savings', value: `₹${(metrics.costSavings / 1000).toFixed(0)}K`, change: '+67%', color: 'blue' },
          { label: 'Lead Conversion', value: metrics.leadConversion, change: '+23%', color: 'purple' },
          { label: 'Customer LTV', value: `₹${(metrics.customerLifetimeValue / 100000).toFixed(1)}L`, change: '+34%', color: 'orange' }
        ].map((metric, index) => (
          <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
            metric.color === 'green' ? 'border-green-200' :
            metric.color === 'blue' ? 'border-blue-200' :
            metric.color === 'purple' ? 'border-purple-200' :
            'border-orange-200'
          }`}>
            <div className={`text-2xl font-bold mb-1 ${
              metric.color === 'green' ? 'text-green-600' :
              metric.color === 'blue' ? 'text-blue-600' :
              metric.color === 'purple' ? 'text-purple-600' :
              'text-orange-600'
            }`}>
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
            <div className="text-xs text-green-600 font-medium">{metric.change} this month</div>
          </div>
        ))}
      </div>

      {/* Goals Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">🎯 Quarterly Objectives</h3>
        
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{goal.name}</h4>
                  <p className="text-sm text-gray-600">Target: {goal.deadline}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{goal.progress}%</div>
                  <div className="text-sm text-gray-500">
                    ₹{goal.current.toLocaleString()} / #{goal.target.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Optimization */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">💰 Revenue Optimization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Pricing Strategy</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• Premium tier ROI: 280%</div>
              <div>• Enterprise conversion: 67%</div>
              <div>• Price sensitivity: Low</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Customer Growth</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• Month-over-month: +23%</div>
              <div>• Referral rate: 34%</div>
              <div>• New market penetration: High</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Efficiency Gains</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• Time savings: 85%</div>
              <div>• Cost reduction: 67%</div>
              <div>• Automation rate: 92%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
