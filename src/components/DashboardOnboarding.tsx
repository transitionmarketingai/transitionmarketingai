"use client";

import { useState, useEffect } from 'react';

interface OnboardingStep {
  title: string;
  description: string;
  target?: string;
  action?: string;
  icon: string;
}

interface DashboardOnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function DashboardOnboarding({ onComplete, onSkip }: DashboardOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps: OnboardingStep[] = [
    {
      title: 'Welcome to Transition Marketing AI!',
      description: 'Let\'s take a quick tour of your new AI-powered lead generation dashboard. This will only take 2 minutes.',
      icon: '👋',
      action: 'Start Tour'
    },
    {
      title: 'Dashboard Overview',
      description: 'Here you\'ll see your key metrics: total leads, active deals, conversion rates, and revenue. Check this daily to track your progress.',
      icon: '📊',
      target: 'overview'
    },
    {
      title: 'Generate AI Leads',
      description: 'Click here to use AI to find qualified prospects. Just set your filters and let our AI do the rest.',
      icon: '🤖',
      target: 'ai-leads',
      action: 'Generate Leads'
    },
    {
      title: 'Track Your Pipeline',
      description: 'Manage your deals through each stage of the sales process. Drag and drop to move deals forward.',
      icon: '🏗️',
      target: 'crm-pipeline'
    },
    {
      title: 'Multi-Channel Outreach',
      description: 'Reach your leads via Email, WhatsApp, and LinkedIn. Set up automated campaigns for better engagement.',
      icon: '📧',
      target: 'email-campaigns'
    },
    {
      title: 'You\'re All Set!',
      description: 'You\'re ready to start generating leads and growing your business. Need help? Check our help center or chat with support.',
      icon: '🎉',
      action: 'Get Started'
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => onComplete(), 300);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => onSkip(), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8">
          {/* Step Counter */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip Tour
            </button>
          </div>

          {/* Icon */}
          <div className="text-6xl mb-6 text-center">
            {currentStepData.icon}
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              {currentStepData.action || (currentStep === steps.length - 1 ? 'Finish' : 'Next')}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-blue-600 w-8' 
                    : index < currentStep 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



















