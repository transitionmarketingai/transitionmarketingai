'use client';

import React, { useState, useEffect } from 'react';

interface CampaignConfig {
  // Basic Info
  name: string;
  description: string;
  targetIndustry: string;
  
  // Targeting
  regions: string[];
  companySizeRange: { min: number; max: number };
  jobTitles: string[];
  
  // Lead Sources
  sources: {
    crmsImport: boolean;
    csvUpload: boolean;
    linkedinSalesNavigator: boolean;
    webScraping: boolean;
  };
  
  // CRM Integration
  connectedCRM?: string;
  importCredentials?: {
    apiKey?: string;
    crmUrl?: string;
    fieldMapping?: Record<string, string>;
  };
  
  // Outreach Configuration
  outreachChannels: ('email' | 'linkedin' | 'whatsapp' | 'phone')[];
  emailSequence?: EmailSequence[];
  linkedinMessages?: LinkedInMessage[];
  
  // Automation Settings
  automationRules: {
    qualificationScore: number;
    autoFollowUp: boolean;
    escalationRules: EscalationRule[];
  };
  
  // Budget & Limits
  monthlyBudget: number;
  maxLeadsPerMonth: number;
  costPerLeadTarget: number;
  
  // Schedule
  businessHours: {
    start: string;
    end: string;
    timezone: string;
    workingDays: string[];
  };
}

interface EmailSequence {
  id: string;
  subject: string;
  content: string;
  timing: number; // hours after previous email
  template: string;
}

interface LinkedInMessage {
  id: string;
  content: string;
  timing: number; // days after email sequence start
}

interface EscalationRule {
  condition: string;
  action: string;
  assignTo?: string;
}

interface CRMConnection {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
}

const PRE_CONFIGURED_TEMPLATES = {
  'technology': {
    name: 'Bangalore IT Companies',
    targeting: {
      regions: ['Bangalore', 'Hyderabad', 'Pune'],
      jobTitles: ['CTO', 'CEO', 'VP Engineering', 'Head of Technology'],
      companySize: { min: 10, max: 1000 }
    },
    emailSequence: [
      {
        id: 'intro',
        subject: 'Tech Solutions for Growing Software Companies',
        content: 'Hi {firstName}, I noticed {company} is expanding rapidly in {city}...',
        timing: 0,
        template: 'tech-intro'
      }
    ]
  },
  'real-estate': {
    name: 'Mumbai Real Estate Development',
    targeting: {
      regions: ['Mumbai', 'Delhi', 'Bangalore'],
      jobTitles: ['Director', 'VP Sales', 'Business Development Head'],
      companySize: { min: 20, max: 500 }
    }
  }
};

const INDIAN_BUSINESS_REGIONS = [
  'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 
  'Pune', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida',
  'Chandigarh', 'Indore', 'Kochi', 'Coimbatore', 'Jaipur'
];

const INDUSTRY_OPTIONS = [
  'Technology & IT', 'Real Estate', 'Healthcare', 'Finance', 
  'E-commerce', 'Manufacturing', 'Education', 'Consulting',
  'Retail', 'Automotive', 'Pharma', 'Logistics'
];

const JOB_TITLE_TEMPLATES = {
  'Technology & IT': ['CTO', 'VP Engineering', 'Head of Development', 'Tech Lead'],
  'Real Estate': ['Director', 'VP Sales', 'Business Development Head', 'Property Manager'],
  'Healthcare': ['Medical Superintendent', 'Hospital Director', 'Chief Medical Officer'],
  'Finance': ['CFO', 'Finance Manager', 'Accounts Head', 'Investment Manager']
};

export default function RealCampaignCreator({ onComplete, isOpen, onClose }: {
  onComplete?: (campaign: CampaignConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignConfig, setCampaignConfig] = useState<CampaignConfig>({
    name: '',
    description: '',
    targetIndustry: '',
    regions: [],
    companySizeRange: { min: 10, max: 1000 },
    jobTitles: [],
    sources: {
      crmsImport: false,
      csvUpload: false,
      linkedinSalesNavigator: false,
      webScraping: false
    },
    outreachChannels: ['email'],
    automationRules: {
      qualificationScore: 70,
      autoFollowUp: true,
      escalationRules: []
    },
    monthlyBudget: 10000,
    maxLeadsPerMonth: 500,
    costPerLeadTarget: 50,
    businessHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Kolkata',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }
  });

  const [availableCRMs, setAvailableCRMs] = useState<CRMConnection[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const totalSteps = 6;

  useEffect(() => {
    // Load available CRM integrations
    loadCRMConnections();
  }, []);

  const loadCRMConnections = async () => {
    try {
      // TODO: Replace with actual CRM API calls
      const mockCRMs: CRMConnection[] = [
        { id: 'hubspot', name: 'HubSpot', url: 'app.hubspot.com', status: 'disconnected', lastSync: new Date() },
        { id: 'salesforce', name: 'Salesforce', url: 'salesforce.com', status: 'disconnected', lastSync: new Date() },
        { id: 'zoho', name: 'Zoho CRM', url: 'zoho.com/crm', status: 'disconnected', lastSync: new Date() },
        { id: 'pipedrive', name: 'Pipedrive', url: 'pipedrive.com', status: 'disconnected', lastSync: new Date() }
      ];
      setAvailableCRMs(mockCRMs);
    } catch (error) {
      console.error('Failed to load CRM connections:', error);
    }
  };

  const updateConfig = (updates: Partial<CampaignConfig>) => {
    setCampaignConfig(prev => ({ ...prev, ...updates }));
    
    // Auto-populate job titles when industry changes
    if (updates.targetIndustry && JOB_TITLE_TEMPLATES[updates.targetIndustry as keyof typeof JOB_TITLE_TEMPLATES]) {
      const templates = JOB_TITLE_TEMPLATES[updates.targetIndustry as keyof typeof JOB_TITLE_TEMPLATES];
      setCampaignConfig(prev => ({ ...prev, jobTitles: templates }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const errors: string[] = [];

    switch (currentStep) {
      case 1:
        if (!campaignConfig.name.trim()) errors.push('Campaign name is required');
        if (!campaignConfig.targetIndustry) errors.push('Please select an industry');
        break;
      
      case 2:
        if (campaignConfig.regions.length === 0) errors.push('Select at least one region');
        if (campaignConfig.jobTitles.length === 0) errors.push('Select at least one job title');
        break;
      
      case 3:
        const hasSources = Object.values(campaignConfig.sources).some(v => v);
        if (!hasSources) errors.push('Select at least one lead source');
        break;
      
      case 4:
        if (campaignConfig.outreachChannels.length === 0) errors.push('Select at least one outreach channel');
        break;
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsValidating(true);
    
    try {
      // TODO: Implement actual campaign creation API
      const response = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignConfig)
      });

      if (response.ok) {
        const createdCampaign = await response.json();
        onComplete?.(createdCampaign);
        onClose();
      } else {
        const error = await response.json();
        setValidationErrors([error.message || 'Failed to create campaign']);
      }
    } catch (error) {
      setValidationErrors(['Network error. Please try again.']);
    } finally {
      setIsValidating(false);
    }
  };

  const useTemplate = (industry: keyof typeof PRE_CONFIGURED_TEMPLATES) => {
    const template = PRE_CONFIGURED_TEMPLATES[industry];
    updateConfig({
      name: template.name,
      targetIndustry: industry,
      regions: template.targeting.regions,
      jobTitles: template.targeting.jobTitles,
      companySizeRange: template.targeting.companySize,
      emailSequence: template.emailSequence
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create New Campaign</h2>
              <p className="text-gray-600 mt-1">Set up AI-powered lead generation campaign</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-red-600 mr-2">⚠️</span>
                <span className="font-semibold text-red-800">Please fix these issues:</span>
              </div>
              <ul className="list-disc list-inside text-red-700 text-sm">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step 1: Basic Campaign Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Campaign Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    value={campaignConfig.name}
                    onChange={(e) => updateConfig({ name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Bangalore IT Companies Q4 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry Focus *
                  </label>
                  <select
                    value={campaignConfig.targetIndustry}
                    onChange={(e) => updateConfig({ targetIndustry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Industry</option>
                    {INDUSTRY_OPTIONS.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Description
                </label>
                <textarea
                  value={campaignConfig.description}
                  onChange={(e) => updateConfig({ description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your campaign goals and target audience..."
                />
              </div>

              {/* Industry Templates */}
              {campaignConfig.targetIndustry && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Recommended Template</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    We have pre-configured templates for {campaignConfig.targetIndustry} campaigns.
                  </p>
                  <button
                    onClick={() => useTemplate(campaignConfig.targetIndustry as keyof typeof PRE_CONFIGURED_TEMPLATES)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    disabled={!PRE_CONFIGURED_TEMPLATES[campaignConfig.targetIndustry as keyof typeof PRE_CONFIGURED_TEMPLATES]}
                  >
                    Use {campaignConfig.targetIndustry} Template
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Targeting Configuration */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Target Audience</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Geographic Regions *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {INDIAN_BUSINESS_REGIONS.map(region => (
                    <label key={region} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={campaignConfig.regions.includes(region)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateConfig({ regions: [...campaignConfig.regions, region] });
                          } else {
                            updateConfig({ regions: campaignConfig.regions.filter(r => r !== region) });
                          }
                        }}
                        className="mr-2 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size Range
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={campaignConfig.companySizeRange.min}
                    onChange={(e) => updateConfig({ 
                      companySizeRange: { ...campaignConfig.companySizeRange, min: parseInt(e.target.value) }
                    })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    value={campaignConfig.companySizeRange.max}
                    onChange={(e) => updateConfig({ 
                      companySizeRange: { ...campaignConfig.companySizeRange, max: parseInt(e.target.value) }
                    })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                  <span className="text-sm text-gray-500">employees</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Target Job Titles *
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Add job title (press Enter to add)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        updateConfig({ jobTitles: [...campaignConfig.jobTitles, e.currentTarget.value.trim()] });
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {campaignConfig.jobTitles.map((title, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {title}
                        <button
                          onClick={() => updateConfig({ jobTitles: campaignConfig.jobTitles.filter((_, i) => i !== index) })}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Suggested: {JOB_TITLE_TEMPLATES[campaignConfig.targetIndustry as keyof typeof JOB_TITLE_TEMPLATES]?.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Lead Sources */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Lead Sources</h3>
              
              <div className="space-y-4">
                {[
                  { key: 'crmsImport', label: 'CRM Import', desc: 'Import prospects from connected CRM systems' },
                  { key: 'csvUpload', label: 'CSV/Excel Upload', desc: 'Upload prospect lists in spreadsheet format' },
                  { key: 'linkedinSalesNavigator', label: 'LinkedIn Sales Navigator', desc: 'Search and import via LinkedIn API' },
                  { key: 'webScraping', label: 'Public Directory Search', desc: 'Search Google My Business, industry directories' }
                ].map(source => (
                  <label key={source.key} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={campaignConfig.sources[source.key as keyof typeof campaignConfig.sources]}
                      onChange={(e) => updateConfig({
                        sources: { ...campaignConfig.sources, [source.key]: e.target.checked }
                      })}
                      className="mt-1 rounded border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{source.label}</div>
                      <div className="text-sm text-gray-600">{source.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* CRM Connection Status */}
              {campaignConfig.sources.crmsImport && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Connected CRM Systems</h4>
                  <div className="space-y-2">
                    {availableCRMs.map(crm => (
                      <div key={crm.id} className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <span className={`w-2 h-2 rounded-full ${crm.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          <span className="text-sm font-medium text-gray-900">{crm.name}</span>
                        </div>
                        <button className={`px-3 py-1 rounded text-xs font-medium ${
                          crm.status === 'connected' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {crm.status === 'connected' ? 'Connected' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Additional steps 4-6 would continue here... */}
          {/* For brevity, I'll show just the navigation buttons */}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2 border-border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isValidating}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {isValidating ? 'Creating...' : '🚀 Create Campaign'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
