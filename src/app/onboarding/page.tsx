"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    targetIndustries: [] as string[],
    targetLocations: [] as string[],
    companySizeRange: '',
    budgetRange: '',
    keywords: '',
    idealCustomer: '',
    painPoints: '',
    monthlyLeadGoal: 100,
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education',
    'Real Estate', 'Retail', 'Manufacturing', 'SaaS/Startup',
    'Professional Services', 'E-commerce', 'Hospitality', 'Other'
  ];

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const budgetRanges = [
    'Below ₹25,000/month',
    '₹25,000 - ₹50,000/month',
    '₹50,000 - ₹1,00,000/month',
    '₹1,00,000 - ₹2,50,000/month',
    'Above ₹2,50,000/month'
  ];

  const handleIndustryToggle = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      targetIndustries: prev.targetIndustries.includes(industry)
        ? prev.targetIndustries.filter(i => i !== industry)
        : [...prev.targetIndustries, industry]
    }));
  };

  const handleLocationToggle = (location: string) => {
    setFormData(prev => ({
      ...prev,
      targetLocations: prev.targetLocations.includes(location)
        ? prev.targetLocations.filter(l => l !== location)
        : [...prev.targetLocations, location]
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Save preferences to database
      const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(Boolean);
      const painPointsArray = formData.painPoints.split(',').map(p => p.trim()).filter(Boolean);

      // Save to lead_preferences (existing)
      const { error: prefsError } = await supabase
        .from('lead_preferences')
        .insert({
          user_id: user?.id,
          target_industry: formData.targetIndustries,
          target_locations: formData.targetLocations,
          company_size_range: formData.companySizeRange,
          budget_range: formData.budgetRange,
          keywords: keywordsArray,
          ideal_customer_description: formData.idealCustomer,
          pain_points: painPointsArray,
          monthly_lead_goal: formData.monthlyLeadGoal,
        });

      // ALSO save to user_preferences (for new lead gen system)
      await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          target_industries: formData.targetIndustries,
          target_locations: formData.targetLocations,
          company_sizes: [formData.companySizeRange],
          budget: formData.budgetRange,
          keywords: keywordsArray,
          monthly_lead_goal: formData.monthlyLeadGoal,
        }, {
          onConflict: 'user_id'
        });

      if (prefsError) throw prefsError;

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          company_name: formData.companyName,
          onboarding_completed: true,
          onboarding_step: 4,
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Generate initial leads based on preferences
      await fetch('/api/leads/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: formData.targetIndustries[0] || 'Technology',
          location: formData.targetLocations[0] || 'Mumbai',
          companySize: formData.companySizeRange || '50-200',
          budget: formData.budgetRange || '₹50,000+',
          keywords: keywordsArray,
          quantity: 10,
          userId: user?.id,
        }),
      });

      router.push('/dashboard?welcome=true');
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">👋</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Transition Marketing AI!</h2>
        <p className="text-gray-600">Let's set up your account to generate the best leads for your business</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Company Name"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Monthly Lead Goal *
        </label>
        <input
          type="number"
          value={formData.monthlyLeadGoal}
          onChange={(e) => setFormData({ ...formData, monthlyLeadGoal: parseInt(e.target.value) })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="100"
        />
        <p className="text-sm text-gray-500 mt-1">How many qualified leads do you want per month?</p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎯</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Target Industries</h2>
        <p className="text-gray-600">Which industries are you targeting?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {industries.map((industry) => (
          <button
            key={industry}
            onClick={() => handleIndustryToggle(industry)}
            className={`px-4 py-3 rounded-xl border-2 transition-all ${
              formData.targetIndustries.includes(industry)
                ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            {industry}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ideal Customer Description
        </label>
        <textarea
          value={formData.idealCustomer}
          onChange={(e) => setFormData({ ...formData, idealCustomer: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="e.g., Mid-size B2B companies looking for digital transformation"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📍</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Target Locations</h2>
        <p className="text-gray-600">Which Indian cities are you focusing on?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {indianCities.map((city) => (
          <button
            key={city}
            onClick={() => handleLocationToggle(city)}
            className={`px-4 py-3 rounded-xl border-2 transition-all ${
              formData.targetLocations.includes(city)
                ? 'border-purple-500 bg-purple-50 text-purple-700 font-semibold'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company Size Range *
          </label>
          <select
            value={formData.companySizeRange}
            onChange={(e) => setFormData({ ...formData, companySizeRange: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select company size</option>
            {companySizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Budget Range *
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select budget range</option>
            {budgetRanges.map(budget => (
              <option key={budget} value={budget}>{budget}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔑</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Keywords & Pain Points</h2>
        <p className="text-gray-600">Help us find the perfect leads for you</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Keywords (comma-separated)
        </label>
        <input
          type="text"
          value={formData.keywords}
          onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="AI, automation, digital marketing, CRM"
        />
        <p className="text-sm text-gray-500 mt-1">Technologies or topics your ideal customers care about</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Customer Pain Points (comma-separated)
        </label>
        <textarea
          value={formData.painPoints}
          onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="manual processes, low conversion rates, poor lead quality"
        />
        <p className="text-sm text-gray-500 mt-1">What problems do your ideal customers face?</p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">🎉 You're All Set!</h3>
        <p className="text-blue-700 text-sm mb-3">
          Based on your preferences, we'll generate {formData.monthlyLeadGoal} highly-targeted leads per month.
        </p>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>✓ {formData.targetIndustries.length || 0} industries selected</li>
          <li>✓ {formData.targetLocations.length || 0} cities selected</li>
          <li>✓ AI-powered lead scoring enabled</li>
          <li>✓ 100 free trial credits included</li>
        </ul>
      </div>
    </div>
  );

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.companyName && formData.monthlyLeadGoal > 0;
      case 2:
        return formData.targetIndustries.length > 0;
      case 3:
        return formData.targetLocations.length > 0 && formData.companySizeRange && formData.budgetRange;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                s <= step ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Step {step} of 4
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-300 transition-all"
              >
                Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !canProceed()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Setting up your account...
                  </span>
                ) : (
                  'Complete Setup & Generate Leads'
                )}
              </button>
            )}
          </div>

          {/* Skip Option */}
          {step === 1 && (
            <div className="text-center mt-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Skip for now →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

