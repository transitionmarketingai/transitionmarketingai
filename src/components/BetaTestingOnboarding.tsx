'use client';

import React, { useState } from 'react';

interface BetaUser {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  role: string;
  companySize: string;
  currentLeadSources: string[];
  monthlyLeadTarget: number;
  painPoints: string[];
  expectations: string;
  techStack: string[];
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  isCompleted: boolean;
}

interface BusinessGoals {
  leadGenerationIncrease: number;
  costReduction: number;
  timeSavings: number;
  conversionRateImprovement: number;
}

export default function BetaTestingOnboarding({ 
  onComplete, 
  userId, 
  isOpen, 
  onClose 
}: {
  onComplete?: (betaUser: BetaUser, goals: BusinessGoals) => void;
  userId?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [betaUser, setBetaUser] = useState<BetaUser>({
    id: userId || '',
    name: '',
    email: '',
    company: '',
    industry: '',
    role: '',
    companySize: '',
    currentLeadSources: [],
    monthlyLeadTarget: 0,
    painPoints: [],
    expectations: '',
    techStack: []
  });

  const [businessGoals, setBusinessGoals] = useState<BusinessGoals>({
    leadGenerationIncrease: 0,
    costReduction: 0,
    timeSavings: 0,
    conversionRateImprovement: 0
  });

  const INDIAN_INDUSTRIES = [
    'Technology & IT Services',
    'Real Estate & Construction', 
    'Healthcare & Pharmaceuticals',
    'Banking & Financial Services',
    'Manufacturing & Industrial',
    'Education & Training',
    'E-commerce & Retail',
    'Consulting & Professional Services',
    'Automotive',
    'Logistics & Transportation'
  ];

  const COMPANY_SIZES = [
    'Startup (1-10 employees)',
    'Small Business (11-50 employees)', 
    'Medium Business (51-200 employees)',
    'Enterprise (200+ employees)'
  ];

  const ROLES = [
    'Founder/CEO',
    'Marketing Director/Manager',
    'Sales Director/Manager', 
    'Business Development Head',
    'Marketing Executive',
    'Sales Executive',
    'Operations Manager'
  ];

  const CURRENT_LEAD_SOURCES = [
    'Cold Email Outreach',
    'Cold Calling',
    'LinkedIn Direct Messages',
    'Google Lead Ads',
    'Facebook/Instagram Ads',
    'Referrals',
    'Content Marketing',
    'Events/Trade Shows',
    'Website Forms',
    'Third-Party Data Sources'
  ];

  const PAIN_POINTS = [
    'Limited qualified leads',
    'High cost per lead',
    'Manual prospecting takes too much time',
    'Lead quality is inconsistent',
    'Difficult to scale lead generation',
    'Integration with CRM is poor',
    'Lack of automation tools',
    'Limited analytics and reporting',
    'Language barriers (Hindi/English)',
    'Regional market understanding'
  ];

  const TECH_STACK = [
    'HubSpot CRM',
    'Salesforce CRM',
    'Zoho CRM',
    'Pipedrive',
    'Mailchimp',
    'Constant Contact',
    'Sales Navigator',
    'Apollo.io',
    'Phantombuster',
    'Zapier',
    'WhatsApp Business',
    'Slack',
    'Microsoft Teams'
  ];

  const totalSteps = 6;

  if (!isOpen) return null;

  const updateBetaUser = (field: string, value: any) => {
    setBetaUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateBusinessGoals = (field: string, value: number) => {
    setBusinessGoals(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Submit beta user application
      const response = await fetch('/api/beta-testing/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          betaUser,
          businessGoals,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        onComplete?.(betaUser, businessGoals);
        onClose();
      }
    } catch (error) {
      console.error('Beta application failed:', error);
    }
  };

  const isCurrentStepValid = (): boolean => {
    switch (currentStep) {
      case 0: // Personal & Company Info
        return betaUser.name && betaUser.email && betaUser.company;
      case 1: // Business Profile  
        return betaUser.industry && betaUser.role && betaUser.companySize;
      case 2: // Current Setup
        return betaUser.currentLeadSources.length > 0 && betaUser.monthlyLeadTarget > 0;
      case 3: // Pain Points
        return betaUser.painPoints.length > 0;
      case 4: // Goals & Expectations
        return betaUser.expectations && businessGoals.leadGenerationIncrease > 0;
      case 5: // Tech Stack
        return true; // Optional step
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">🚀 Beta Testing Program</h2>
              <p className="text-blue-100 mt-1">Help shape the future of Indian lead generation</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
            </div>
           </div>
            <div className="w-full bg-blue-800 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 0: Personal & Company Information */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tell us about yourself</h3>
                <p className="text-gray-600">Help us understand your background and company</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={betaUser.name}
                    onChange={(e) => updateBetaUser('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={betaUser.email}
                    onChange={(e) => updateBetaUser('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={betaUser.company}
                  onChange={(e) => updateBetaUser('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
            </div>
          )}

          {/* Step 1: Business Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Profile</h3>
                <p className="text-gray-600">Help us understand your business context</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Industry *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {INDIAN_INDUSTRIES.map(industry => (
                    <label key={industry} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="industry"
                        value={industry}
                        checked={betaUser.industry === industry}
                        onChange={(e) => updateBetaUser('industry', e.target.value)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role *
                  </label>
                  <select
                    value={betaUser.role}
                    onChange={(e) => updateBetaUser('role', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    {ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size *</select>
                  <select
                    value={betaUser.companySize}
                    onChange={(e) => updateBetaUser('companySize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select company size</option>
                    {COMPANY_SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Current Lead Generation Setup */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Current Lead Generation</h3>
                <p className="text-gray-600">Tell us about your current lead generation approach</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Current Lead Sources * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CURRENT_LEAD_SOURCES.map(source => (
                    <label key={source} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={betaUser.currentLeadSources.includes(source)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateBetaUser('currentLeadSources', [...betaUser.currentLeadSources, source]);
                          } else {
                            updateBetaUser('currentLeadSources', betaUser.currentLeadSources.filter(s => s !== source));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Lead Target *</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={betaUser.monthlyLeadTarget}
                    onChange={(e) => updateBetaUser('monthlyLeadTarget', parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-32"
                    min="1"
                    placeholder="100"
                  />
                  <span className="text-gray-600">qualified leads per month</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pain Points */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Current Challenges</h3>
                <p className="text-gray-600">What are your biggest lead generation pain points?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select your main challenges * (Select all that apply)
                </label>
                <div className="space-y-3">
                  {PAIN_POINTS.map(painPoint => (
                    <label key={painPoint} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={betaUser.painPoints.includes(painPoint)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateBetaUser('painPoints', [...betaUser.painPoints, painPoint]);
                          } else {
                            updateBetaUser('painPoints', betaUser.painPoints.filter(p => p !== painPoint));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-gray-700">{painPoint}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Goals & Expectations */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Goals & Expectations</h3>
                <p className="text-gray-600">What improvements do you hope to achieve?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Generation Increase (%) *
                  </label>
                  <input
                    type="number"
                    value={businessGoals.leadGenerationIncrease}
                    onChange={(e) => updateBusinessGoals('leadGenerationIncrease', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="1000"
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Reduction (%)
                  </label>
                  <input
                    type="number"
                    value={businessGoals.costReduction}
                    onChange={(e) => updateBusinessGoals('costReduction', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="90"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Savings (hours/week)
                  </label>
                  <input
                    type="number"
                    value={businessGoals.timeSavings}
                    onChange={(e) => updateBusinessGoals('timeSavings', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="80"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conversion Rate Improvement (%)
                  </label>
                  <input
                    type="number"
                    value={businessGoals.conversionRateImprovement}
                    onChange={(e) => updateBusinessGoals('conversionRateImprovement', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="500"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Expectations *
                </label>
                <textarea
                  value={betaUser.expectations}
                  onChange={(e) => updateBetaUser('expectations', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="What specific outcomes do you hope to achieve with AI-powered lead generation?"
                />
              </div>
            </div>
          )}

          {/* Step 5: Tech Stack (Optional) */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Current Tools</h3>
                <p className="text-gray-600">Help us understand your current tech stack (optional)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tools you currently use (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {TECH_STACK.map(tool => (
                    <label key={tool} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={betaUser.techStack.includes(tool)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateBetaUser('techStack', [...betaUser.techStack, tool]);
                          } else {
                            updateBetaUser('techStack', betaUser.techStack.filter(t => t !== tool));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{tool}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isCurrentStepValid()}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg font-medium"
                >
                  🚀 Apply for Beta Access
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
