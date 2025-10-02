'use client';

import React, { useState, useEffect } from 'react';
import { dataService } from '@/lib/dataService';
import { supabase } from '@/lib/supabase';

interface OnboardingFlowProps {
  userEmail: string;
  onComplete: () => void;
}

interface OnboardingData {
  name: string;
  jobTitle: string;
  crmExperience: string;
  phoneNumber: string;
  companyName: string;
  companySize: string;
  industry: string;
  primaryGoal: string;
  monthlyLeadTarget?: string;
  currentLeadSources?: string[];
  preferredLanguage?: string;
  targetCities?: string[];
  monthlyBudget?: string;
}

export default function OnboardingFlow({ userEmail, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    name: '',
    jobTitle: '',
    crmExperience: '',
    phoneNumber: '',
    companyName: '',
    companySize: '',
    industry: '',
    primaryGoal: '',
    monthlyLeadTarget: '',
    currentLeadSources: [],
    preferredLanguage: 'English',
    targetCities: [],
    monthlyBudget: ''
  });
  const [errors, setErrors] = useState<Partial<OnboardingData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;

  // Progress calculation
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<OnboardingData> = {};
    
    switch (step) {
      case 1: // About You
        if (!formData.name.trim()) newErrors.name = 'Please add your name';
        if (!formData.jobTitle) newErrors.jobTitle = 'Please select your job title';
        if (!formData.crmExperience) newErrors.crmExperience = 'Please select your CRM experience';
        break;
      case 2: // Your Company  
        if (!formData.companyName.trim()) newErrors.companyName = 'Please add your company name';
        if (!formData.companySize) newErrors.companySize = 'Please select your company size';
        if (!formData.industry) newErrors.industry = 'Please select your industry';

        if (formData.phoneNumber && !isValidPhone(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    try {
      // Save onboarding data to database
      await dataService.saveOnboardingData({
        ...formData,
        email: userEmail,
        completedAt: new Date().toISOString()
      });
      
      // Mark user as onboarded
      await dataService.updateUserProfile({
        email: userEmail,
        onboardingCompleted: true,
        ...formData
      });
      
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which job title describes your role best? *
              </label>
              <select
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.jobTitle ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select your role</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="Sales Director">Sales Director</option>
                <option value="CEO/Founder">CEO/Founder</option>
                <option value="VP Sales">VP Sales</option>
                <option value="Account Executive">Account Executive</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Other">Other</option>
              </select>
              {errors.jobTitle && <p className="text-red-600 text-sm mt-1">{errors.jobTitle}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have you used a CRM before? *
              </label>
              <select
                value={formData.crmExperience}
                onChange={(e) => handleInputChange('crmExperience', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.crmExperience ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select your experience</option>
                <option value="Yes, extensively">Yes, extensively</option>
                <option value="Yes, basic usage">Yes, basic usage</option>
                <option value="No, this is my first CRM">No, this is my first CRM</option>
                <option value="I've tried but never fully adopted">I've tried but never fully adopted</option>
              </select>
              {errors.crmExperience && <p className="text-red-600 text-sm mt-1">{errors.crmExperience}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="+91">IN (+91)</option>
                  <option value="+1">US (+1)</option>
                  <option value="+44">UK (+44)</option>
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Phone number"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>}
              <p className="text-gray-500 text-xs mt-1">This may be used to contact you if you need assistance.</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your company name *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your company name"
              />
              {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your company size? *
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companySize ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select company size</option>
                <option value="Just me">Just me</option>
                <option value="2-10 employees">2-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-1000 employees">201-1000 employees</option>
                <option value="1000+ employees">1000+ employees</option>
              </select>
              {errors.companySize && <p className="text-red-600 text-sm mt-1">{errors.companySize}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What industry are you in? *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.industry ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select your industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Marketing/Advertising">Marketing/Advertising</option>
                <option value="Other">Other</option>
              </select>
              {errors.industry && <p className="text-red-600 text-sm mt-1">{errors.industry}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your primary goal with Transition CRM? *
              </label>
              <select
                value={formData.primaryGoal}
                onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.primaryGoal ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select your primary goal</option>
                <option value="Better lead management">Better lead management</option>
                <option value="Increase sales productivity">Increase sales productivity</option>
                <option value="Track sales pipeline">Track sales pipeline</option>
                <option value="Improve customer relationships">Improve customer relationships</option>
                <option value="Automate sales processes">Automate sales processes</option>
                <option value="Team collaboration">Team collaboration</option>
                <option value="Sales analytics and reporting">Sales analytics and reporting</option>
                <option value="Replace current CRM">Replace current CRM</option>
              </select>
              {errors.primaryGoal && <p className="text-red-600 text-sm mt-1">{errors.primaryGoal}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">🎉 You're almost ready!</h4>
              <p className="text-blue-800 text-sm">
                Based on your goals, we'll customize your CRM setup and provide personalized recommendations to help you succeed.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Transition CRM!</h3>
              <p className="text-gray-600 mb-6">
                Your account is now set up. We'll create a sample pipeline based on your preferences to help you get started.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-gray-900">What's next?</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Create your first contacts</li>
                <li>• Set up your sales pipeline</li>
                <li>• Explore reporting features</li>
                <li>• Invite team members</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = (step: number) => {
    const titles = ['About you', 'Your company', 'Your goals', 'Complete'];
    return titles[step - 1];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 < currentStep ? 'bg-green-500 text-white' :
                  i + 1 === currentStep ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {i + 1 < currentStep ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    i + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{getStepTitle(currentStep)}</h2>
            {currentStep === 1 && (
              <p className="text-gray-600 mb-4">
                We'll use this information to secure your account and tailor Transition CRM to your needs.
              </p>
            )}
            {currentStep === 2 && (
              <p className="text-gray-600 mb-4">
                Tell us about your company so we can customize features for your industry.
              </p>
            )}
            {currentStep === 3 && (
              <p className="text-gray-600 mb-4">
                Understanding your goals helps us provide relevant features and recommendations.
              </p>
            )}
            <p className="text-sm text-gray-500">You're signing up as {userEmail}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            {currentStep === 1 && "Tell us about your business"}
            {currentStep === 2 && "Company information & industry"}
            {currentStep === 3 && "Lead generation goals & targets"}
            {currentStep === 4 && "Communication preferences"}
            {currentStep === 5 && "Business location & markets"}
            {currentStep === 6 && "Final setup & activation"}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Back
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-md transition-colors"
            >
              {isSubmitting ? 'Setting up...' : 'Get Started'}
            </button>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="px-6 pb-4">
          <div className="text-center">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy - Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
