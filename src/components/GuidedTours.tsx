'use client';

import React, { useState, useEffect } from 'react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  targetElement: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: string;
  buttons: Array<{
    text: string;
    action: 'next' | 'skip' | 'completed';
    variant: 'primary' | 'secondary';
  }>;
}

const onboardingTour: TourStep[] = [
  {
    id: 'welcome',
    title: '🎯 Welcome to Your AI Lead Generation Dashboard!',
    description: 'This is your command center for automated lead generation. Let me show you the key features.',
    targetElement: '',
    position: 'top',
    buttons: [
      { text: 'Skip Tour', action: 'skip', variant: 'secondary' },
      { text: 'Start Tour', action: 'next', variant: 'primary' }
    ]
  },
  {
    id: 'overview',
    title: '📊 Overview Dashboard',
    description: 'Monitor your lead generation performance in real-time. See key metrics, active campaigns, and recent activity.',
    targetElement: '.metrics-grid',
    position: 'bottom',
    buttons: [
      { text: 'Skip', action: 'skip', variant: 'secondary' },
      { text: 'Next', action: 'next', variant: 'primary' }
    ]
  },
  {
    id: 'campaigns',
    title: '🎯 AI Campaigns',
    description: 'Create and manage AI-powered lead generation campaigns. Launch targeted outreach to your ideal customers.',
    targetElement: '[data-tour="campaigns"]',
    position: 'right',
    buttons: [
      { text: 'Previous', action: 'next', variant: 'secondary' },
      { text: 'Next', action: 'next', variant: 'primary' }
    ]
  },
  {
    id: 'templates',
    title: '🏭 Industry Templates',
    description: 'Use pre-built templates for different industries. Get started quickly with proven configurations.',
    targetElement: '[data-tour="templates"]',
    position: 'right',
    buttons: [
      { text: 'Previous', action: 'next', variant: 'secondary' },
      { text: 'Next', action: 'next', variant: 'primary' }
    ]
  },
  {
    id: 'leads',
    title: '👥 Lead Database',
    description: 'Your qualified leads are stored here with AI scoring, status tracking, and pipeline management.',
    targetElement: '[data-tour="leads"]',
    position: 'left',
    buttons: [
      { text: 'Previous', action: 'next', variant: 'secondary' },
      { text: 'Next', action: 'next', variant: 'primary' }
    ]
  },
  {
    id: 'automation',
    title: '⚡ Smart Automation',
    description: 'Set up auto-responses, follow-up sequences, and lead nurturing workflows.',
    targetElement: '[data-tour="automation"]',
    position: 'right',
    action: 'Try creating your first automation',
    buttons: [
      { text: 'Complete Tour', action: 'completed', variant: 'primary' }
    ]
  }
];

const featureTours: Record<string, TourStep[]> = {
  campaigns: [
    {
      id: 'campaign-basics',
      title: 'Creating Your First Campaign',
      description: 'Learn how to set up a successful AI lead generation campaign.',
      targetElement: '.create-campaign-btn',
      position: 'bottom',
      buttons: [
        { text: 'Skip', action: 'skip', variant: 'secondary' },
        { text: 'Start', action: 'next', variant: 'primary' }
      ]
    }
  ]
};

const helpCenterSteps = [
  {
    title: '📚 Help Center',
    description: 'Access guides, tutorials, and best practices for lead generation.',
    action: 'Open Help Center',
    target: 'help-center'
  },
  {
    title: '🎓 Academy',
    description: 'Learn advanced techniques and strategies.',
    action: 'Visit Academy',
    target: 'academy'
  },
  {
    title: '💬 Support',
    description: 'Get direct assistance from our experts.',
    action: 'Contact Support',
    target: 'support'
  }
];

interface GuidedToursProps {
  activeTour?: string;
  onCloseTour: () => void;
}

export default function GuidedTours({ activeTour, onCloseTour }: GuidedToursProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tourData, setTourData] = useState<TourStep[]>(onboardingTour);
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  useEffect(() => {
    if (activeTour && featureTours[activeTour]) {
      setTourData(featureTours[activeTour]);
      setCurrentStep(0);
    } else {
      setTourData(onboardingTour);
      setCurrentStep(0);
    }
  }, [activeTour]);

  const currentTourStep = tourData[currentStep];
  const progressPercentage = ((currentStep + 1) / tourData.length) * 100;

  const handleTourAction = (action: string, buttonAction: string) => {
    if (buttonAction === 'skip' || buttonAction === 'completed') {
      onCloseTour();
      return;
    }

    if (buttonAction === 'next' && action === 'next') {
      if (currentStep < tourData.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onCloseTour();
      }
    }
  };

  const highlightElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (currentTourStep?.targetElement && currentTourStep.targetElement !== '') {
      highlightElement(currentTourStep.targetElement);
    }
  }, [currentStep]);

  if (!currentTourStep) return null;

  return (
    <>
      {/* Tour Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep + 1} of {tourData.length}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Tour Content */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {currentTourStep.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {currentTourStep.description}
            </p>
            
            {currentTourStep.action && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">💡</span>
                  <span className="text-blue-800 font-medium">{currentTourStep.action}</span>
                </div>
              </div>
            )}
          </div>

          {/* Tour Actions */}
          <div className="flex justify-between space-x-3">
            {currentTourStep.buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleTourAction('next', button.action)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  button.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {button.text}
              </button>
            ))}
          </div>

          {/* Tour Navigation */}
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="absolute top-6 left-6 p-2 text-gray-600 hover:text-gray-900"
            >
              ←
            </button>
          )}
          
          {/* Help Link */}
          <button
            onClick={() => setShowHelpCenter(true)}
            className="absolute top-6 right-6 text-sm text-blue-600 hover:text-blue-700"
          >
            Help
          </button>
        </div>
      </div>

      {/* Help Center Modal */}
      {showHelpCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">🎯 Help Center</h3>
              <button
                onClick={() => setShowHelpCenter(false)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {helpCenterSteps.map((step, index) => (
                <button
                  key={index}
                  className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>
                    <span className="text-blue-600 text-sm font-medium">{step.action} →</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowHelpCenter(false)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Continue Platform Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
