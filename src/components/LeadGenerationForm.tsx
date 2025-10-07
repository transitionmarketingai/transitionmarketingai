"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface LeadFilters {
  industry: string;
  locations: string[];
  companySizes: string[];
  budget: string;
  keywords: string[];
  minScore: number;
  quantity: number;
  searchName: string;
  saveSearch: boolean;
}

interface LeadGenerationFormProps {
  onGenerate: (filters: LeadFilters) => void;
  onboardingPreferences?: any;
  loading?: boolean;
}

export default function LeadGenerationForm({ 
  onGenerate, 
  onboardingPreferences,
  loading = false 
}: LeadGenerationFormProps) {
  const [filters, setFilters] = useState<LeadFilters>({
    industry: '',
    locations: [],
    companySizes: [],
    budget: '',
    keywords: [],
    minScore: 60,
    quantity: 10,
    searchName: '',
    saveSearch: false,
  });

  const [keywordInput, setKeywordInput] = useState('');

  // Pre-fill from onboarding preferences
  useEffect(() => {
    if (onboardingPreferences) {
      setFilters(prev => ({
        ...prev,
        industry: onboardingPreferences.industry || '',
        locations: onboardingPreferences.location ? [onboardingPreferences.location] : [],
        companySizes: onboardingPreferences.companySize ? [onboardingPreferences.companySize] : [],
        budget: onboardingPreferences.budget || '',
        keywords: onboardingPreferences.keywords || [],
      }));
    }
  }, [onboardingPreferences]);

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Real Estate',
    'Retail',
    'Education',
    'Manufacturing',
    'Logistics',
    'Agriculture',
    'Marketing',
    'Consulting',
    'Other'
  ];

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Lucknow'
  ];

  const companySizes = [
    '1-10',
    '10-50',
    '50-200',
    '200-500',
    '500-1000',
    '1000+'
  ];

  const budgets = [
    '₹10,000-₹25,000',
    '₹25,000-₹50,000',
    '₹50,000-₹1,00,000',
    '₹1,00,000-₹5,00,000',
    '₹5,00,000+'
  ];

  const quantities = [10, 25, 50, 100];

  const toggleLocation = (location: string) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const toggleCompanySize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      companySizes: prev.companySizes.includes(size)
        ? prev.companySizes.filter(s => s !== size)
        : [...prev.companySizes, size]
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !filters.keywords.includes(keywordInput.trim())) {
      setFilters(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFilters(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!filters.industry) {
      toast.error('Please select an industry');
      return;
    }

    if (filters.locations.length === 0) {
      toast.error('Please select at least one location');
      return;
    }

    if (filters.companySizes.length === 0) {
      toast.error('Please select at least one company size');
      return;
    }

    if (!filters.budget) {
      toast.error('Please select a budget range');
      return;
    }

    if (filters.saveSearch && !filters.searchName.trim()) {
      toast.error('Please enter a name for your saved search');
      return;
    }

    onGenerate(filters);
  };

  const usePreferences = () => {
    if (onboardingPreferences) {
      setFilters(prev => ({
        ...prev,
        industry: onboardingPreferences.industry || '',
        locations: onboardingPreferences.location ? [onboardingPreferences.location] : [],
        companySizes: onboardingPreferences.companySize ? [onboardingPreferences.companySize] : [],
        budget: onboardingPreferences.budget || '',
        keywords: onboardingPreferences.keywords || [],
      }));
      toast.success('Loaded your preferences!');
    } else {
      toast.info('Complete onboarding first to save preferences');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">🎯 Find Your Ideal Customers</h3>
          <p className="text-sm text-gray-600 mt-1">
            Preview is FREE • Contact info costs 5 credits per lead
          </p>
        </div>
        {onboardingPreferences && (
          <button
            type="button"
            onClick={usePreferences}
            className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            Use My Preferences
          </button>
        )}
      </div>

      {/* Industry */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Industry <span className="text-red-500">*</span>
        </label>
        <select
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select industry</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      {/* Locations */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Target Locations <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {locations.map(location => (
            <label
              key={location}
              className={`flex items-center gap-2 px-3 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                filters.locations.includes(location)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={filters.locations.includes(location)}
                onChange={() => toggleLocation(location)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium">{location}</span>
            </label>
          ))}
        </div>
        {filters.locations.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            Selected: {filters.locations.join(', ')}
          </p>
        )}
      </div>

      {/* Company Sizes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Company Size <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {companySizes.map(size => (
            <label
              key={size}
              className={`flex items-center gap-2 px-3 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                filters.companySizes.includes(size)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={filters.companySizes.includes(size)}
                onChange={() => toggleCompanySize(size)}
                className="w-4 h-4 text-green-600"
              />
              <span className="text-sm font-medium">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Budget Range <span className="text-red-500">*</span>
        </label>
        <select
          value={filters.budget}
          onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select budget range</option>
          {budgets.map(budget => (
            <option key={budget} value={budget}>{budget}</option>
          ))}
        </select>
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Keywords (Optional)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
            placeholder="Type keyword and press Enter"
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        {filters.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.keywords.map(keyword => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Min AI Score */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Minimum AI Score: <span className="text-blue-600 font-bold">{filters.minScore}</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={filters.minScore}
          onChange={(e) => setFilters({ ...filters, minScore: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 (Any)</span>
          <span>50 (Good)</span>
          <span>100 (Excellent)</span>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Number of Leads
        </label>
        <div className="grid grid-cols-4 gap-2">
          {quantities.map(qty => (
            <button
              key={qty}
              type="button"
              onClick={() => setFilters({ ...filters, quantity: qty })}
              className={`px-4 py-3 border-2 rounded-lg font-semibold transition-all ${
                filters.quantity === qty
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {qty}
            </button>
          ))}
        </div>
      </div>

      {/* Save Search */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.saveSearch}
            onChange={(e) => setFilters({ ...filters, saveSearch: e.target.checked })}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <div>
            <span className="font-semibold text-gray-900">Save this search</span>
            <p className="text-sm text-gray-600">Run this search again later without re-entering filters</p>
          </div>
        </label>

        {filters.saveSearch && (
          <input
            type="text"
            value={filters.searchName}
            onChange={(e) => setFilters({ ...filters, searchName: e.target.value })}
            placeholder="e.g., Mumbai Tech Companies Q4 2025"
            className="mt-3 w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={filters.saveSearch}
          />
        )}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <h4 className="font-semibold text-gray-900">Search Summary:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600">Industry:</span>
            <span className="ml-2 font-medium">{filters.industry || 'Not selected'}</span>
          </div>
          <div>
            <span className="text-gray-600">Locations:</span>
            <span className="ml-2 font-medium">{filters.locations.length > 0 ? filters.locations.join(', ') : 'None'}</span>
          </div>
          <div>
            <span className="text-gray-600">Company Sizes:</span>
            <span className="ml-2 font-medium">{filters.companySizes.length > 0 ? filters.companySizes.join(', ') : 'None'}</span>
          </div>
          <div>
            <span className="text-gray-600">Min Score:</span>
            <span className="ml-2 font-medium">{filters.minScore}+</span>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
          <span className="text-gray-700 font-semibold">
            Will generate: <span className="text-blue-600">{filters.quantity} lead previews</span>
          </span>
          <span className="text-sm text-green-600 font-semibold">
            ✅ Preview: FREE (0 credits)
          </span>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Leads...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Generate {filters.quantity} Leads - FREE
            </>
          )}
        </button>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-2 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="font-medium text-yellow-900">How it works:</p>
          <ul className="mt-1 space-y-1 list-disc list-inside text-yellow-800">
            <li>Generate leads = FREE (preview company info + AI score)</li>
            <li>Unlock contact info = 5 credits per lead (email, phone, name)</li>
            <li>Saved searches = Run anytime without re-entering filters</li>
          </ul>
        </div>
      </div>
    </form>
  );
}

