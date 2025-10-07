"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface LeadCriteria {
  industry: string;
  location: string;
  companySize: string;
  budget: string;
  keywords: string[];
  quantity: number;
}

interface LeadGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (criteria: LeadCriteria, saveSearch?: string) => void;
  userPreferences?: {
    target_industries?: string[];
    target_locations?: string[];
    company_sizes?: string[];
    budget?: string;
    keywords?: string[];
    monthly_lead_goal?: number;
  };
  generating?: boolean;
}

export default function LeadGenerationModal({
  isOpen,
  onClose,
  onGenerate,
  userPreferences,
  generating = false
}: LeadGenerationModalProps) {
  const [criteria, setCriteria] = useState<LeadCriteria>({
    industry: '',
    location: '',
    companySize: '',
    budget: '',
    keywords: [],
    quantity: 10
  });
  
  const [keywordInput, setKeywordInput] = useState('');
  const [saveSearchName, setSaveSearchName] = useState('');
  const [shouldSaveSearch, setShouldSaveSearch] = useState(false);

  // Load user preferences when modal opens
  useEffect(() => {
    if (isOpen && userPreferences) {
      setCriteria({
        industry: userPreferences.target_industries?.[0] || '',
        location: userPreferences.target_locations?.[0] || '',
        companySize: userPreferences.company_sizes?.[0] || '',
        budget: userPreferences.budget || '',
        keywords: userPreferences.keywords || [],
        quantity: userPreferences.monthly_lead_goal || 10
      });
      setKeywordInput(userPreferences.keywords?.join(', ') || '');
    }
  }, [isOpen, userPreferences]);

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const newKeywords = keywordInput.split(',').map(k => k.trim()).filter(k => k);
      setCriteria({ ...criteria, keywords: [...new Set([...criteria.keywords, ...newKeywords])] });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setCriteria({ ...criteria, keywords: criteria.keywords.filter(k => k !== keyword) });
  };

  const handleGenerate = () => {
    if (!criteria.industry || !criteria.location || !criteria.companySize) {
      toast.error('Please fill in all required fields');
      return;
    }

    const searchName = shouldSaveSearch && saveSearchName.trim() 
      ? saveSearchName.trim() 
      : undefined;

    onGenerate(criteria, searchName);
  };

  const estimatedCreditsNeeded = criteria.quantity * 20;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Generate AI Leads</h2>
            <p className="text-sm text-gray-600">Customize your search criteria</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 mb-1">How it works:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Generation is <strong>FREE</strong> - search as many times as you want</li>
                  <li>• Preview company name, industry, and AI score for free</li>
                  <li>• Unlock contact details for <strong>20 credits per lead</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Industry *
              </label>
              <select
                value={criteria.industry}
                onChange={(e) => setCriteria({ ...criteria, industry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Logistics">Logistics</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
                value={criteria.location}
                onChange={(e) => setCriteria({ ...criteria, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Lucknow">Lucknow</option>
              </select>
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size *
              </label>
              <select
                value={criteria.companySize}
                onChange={(e) => setCriteria({ ...criteria, companySize: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="10-50">10-50 employees</option>
                <option value="50-200">50-200 employees</option>
                <option value="200-500">200-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                value={criteria.budget}
                onChange={(e) => setCriteria({ ...criteria, budget: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any budget</option>
                <option value="₹10,000 - ₹50,000">₹10,000 - ₹50,000</option>
                <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                <option value="₹2,00,000+">₹2,00,000+</option>
              </select>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (Optional)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                placeholder="e.g., AI, automation, digital transformation"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddKeyword}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {criteria.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {keyword}
                  <button
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="hover:bg-blue-200 rounded-full"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Leads: {criteria.quantity}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={criteria.quantity}
              onChange={(e) => setCriteria({ ...criteria, quantity: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          {/* Estimated Cost */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Estimated Results:</div>
                <div className="text-sm text-gray-600">Generation is FREE • Preview is FREE</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">~{criteria.quantity}</div>
                <div className="text-xs text-gray-500">leads</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-yellow-300">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">To unlock all contacts:</span>
                <span className="font-bold text-blue-600">{estimatedCreditsNeeded} credits</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                (20 credits per lead • You only pay for leads you unlock)
              </div>
            </div>
          </div>

          {/* Save Search Option */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shouldSaveSearch}
                onChange={(e) => setShouldSaveSearch(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Save this search for quick access
              </span>
            </label>
            {shouldSaveSearch && (
              <input
                type="text"
                value={saveSearchName}
                onChange={(e) => setSaveSearchName(e.target.value)}
                placeholder="e.g., Mumbai Tech Leads"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button
            onClick={onClose}
            disabled={generating}
            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating || !criteria.industry || !criteria.location || !criteria.companySize}
            className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {generating ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate {criteria.quantity} Leads (FREE)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

