'use client';

import React, { useState, useEffect, useContext } from 'react';

interface UserProfile {
  id: string;
  industry: string;
  companySize: string;
  role: string;
  experience: string;
  budget: string;
  priority: string[];
  preferredLanguage: string;
  location: string;
  behaviorPatterns: {
    mostUsedFeatures: string[];
    sessionDuration: number;
    loginFrequency: string;
  };
  personalizedRecommendations: string[];
}

interface PersonalizationContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  getPersonalizedContent: (key: string) => any;
  trackUserBehavior: (action: string, metadata?: any) => void;
}

const PersonalizationContext = React.createContext<PersonalizationContextType | null>(null);

// Industry-specific content customization
const industryTemplates = {
  'Technology & IT': {
    welcomeMessage: 'Welcome to your AI-driven lead generation command center for tech innovation!',
    quickActions: ['LinkedIn Tech Outreach', 'Developer Hiring Campaign', 'Startup Networking Sequence'],
    marketInsights: 'Tech sector shows 40% higher response rates during morning hours (9-11 AM)',
    recommendedCampaigns: ['Bangalore IT Startups', 'Hyderabad Tech Jobs', 'Pune Software Companies']
  },
  'E-commerce & Retail': {
    welcomeMessage: 'Maximize your online retail lead generation with AI-powered customer insights!',
    quickActions: ['E-commerce Lead Scoring', 'Retail Partner Outreach', 'Seasonal Campaign Setup'],
    marketInsights: 'E-commerce leads convert 23% better with product-specific messaging',
    recommendedCampaigns: ['Fashion Retail Partners', 'Electronics Dealers', 'Home Goods Suppliers']
  },
  'Healthcare': {
    welcomeMessage: 'Advanced healthcare lead generation with HIPAA-compliant AI automation!',
    quickActions: ['Doctor Outreach Sequences', 'Medical Equipment Sales', 'Healthcare Partner Programs'],
    marketInsights: 'Healthcare leads respond best to educational content (medical case studies)',
    recommendedCampaigns: ['Hospital Partnerships', 'Medical Device Sales', 'Telemedicine Outreach']
  },
  'Real Estate': {
    welcomeMessage: 'Transform your real estate leads with location-based AI targeting!',
    quickActions: ['Property Developer Outreach', 'Real Estate Agent Network', 'Investor Relationship Building'],
    marketInsights: 'Real estate leads engage 35% more during weekend viewing sessions',
    recommendedCampaigns: ['Commercial Property Sales', 'Residential Developer', 'Real Estate Investment']
  }
};

const roleSpecificInsights = {
  'Founder/CEO': {
    dashboardFocus: 'High-level metrics, ROI tracking, strategic overview',
    priorityMetrics: ['total_revenue', 'growth_rate', 'customer_lifetime_value'],
    recommendedTasks: ['Review ROI dashboards', 'Scale successful campaigns', 'Strategic market planning']
  },
  'Marketing Director': {
    dashboardFocus: 'Campaign performance, lead quality, automation workflows',
    priorityMetrics: ['lead_conversion_rate', 'campaign_performance', 'cost_per_lead'],
    recommendedTasks: ['Optimize campaign targeting', 'Improve lead scoring', 'A/B test messaging']
  },
  'Sales Manager': {
    dashboardFocus: 'Lead pipeline, conversion metrics, team performance',
    priorityMetrics: ['lead_velocity', 'sales_performance', 'pipeline_value'],
    recommendedTasks: ['Qualify hot leads', 'Follow up automation', 'Sales team training']
  }
};

export default function PersonalizationEngine() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showPersonalityQuiz, setShowPersonalityQuiz] = useState(false);
  const [personalizedContent, setPersonalizedContent] = useState<any>(null);

  // Load user profile from storage or create default
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // Create default profile or trigger onboarding
      setShowPersonalityQuiz(true);
    }
  }, []);

  // Generate personalized content based on profile
  useEffect(() => {
    if (userProfile) {
      const personalized = generatePersonalizedContent(userProfile);
      setPersonalizedContent(personalized);
      
      // Save to storage
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const generatePersonalizedContent = (profile: UserProfile) => {
    const industryTemplate = industryTemplates[profile.industry as keyof typeof industryTemplates];
    const roleInsights = roleSpecificInsights[profile.role as keyof typeof roleSpecificInsights];

    return {
      welcomeMessage: industryTemplate?.welcomeMessage || 'Welcome to your AI lead generation center!',
      quickActions: industryTemplate?.quickActions || ['New Campaign', 'Import Leads', 'Setup Automation'],
      marketInsights: industryTemplate?.marketInsights || 'Industry insights and best practices',
      dashboardLayout: roleInsights?.dashboardFocus || 'General performance overview',
      priorityMetrics: roleInsights?.priorityMetrics || ['total_leads', 'conversion_rate', 'cost_per_system'],
      recommendedTasks: roleInsights?.recommendedTasks || ['Create first campaign', 'Import contacts'],
      language: profile.preferredLanguage === 'Hindi' ? 'Hindi' : 'English',
      currency: '₹',
      timeZone: 'Asia/Kolkata' // Indian timezone
    };
  };

  // Track user behavior for personalization
  const trackUserBehavior = (action: string, metadata?: any) => {
    if (!userProfile) return;

    const updatedProfile = { ...userProfile };
    
    // Update behavior patterns
    if (action === 'feature_usage') {
      const features = updatedProfile.behaviorPatterns.mostUsedFeatures;
      const featureIndex = features.indexOf(metadata.feature);
      if (featureIndex > -1) {
        features.splice(featureIndex, 1);
      }
      features.unshift(metadata.feature);
      updatedProfile.behaviorPatterns.mostUsedFeatures = features.slice(0, 5); // Keep top 5
    }

    setUserProfile(updatedProfile);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Personalize Your Experience</h2>
            <p className="text-gray-600 mb-8">
              Tell us about your business to customize your AI lead generation platform
            </p>
            <button 
              onClick={() => setShowPersonalityQuiz(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PersonalizationContext.Provider value={{
      userProfile,
      setUserProfile,
      getPersonalizedContent: () => personalizedContent,
      trackUserBehavior
    }}>
      <div className="space-y-8">
        {/* Personalized Welcome Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {personalizedContent?.welcomeMessage}
              </h2>
              <p className="text-gray-600">
                Optimized for {userProfile.industry} • {userProfile.role} View
              </p>
            </div>
            <button
              onClick={() => setShowProfileEditor(true)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              ⚙️ Customize
            </button>
          </div>
        </div>

        {/* Personalized Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personalizedContent?.quickActions?.map((action, index) => (
              <button
                key={index}
                onClick={() => trackUserBehavior('feature_usage', { feature: action })}
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
              >
                <h4 className="font-semibold text-blue-900 mb-1">{action}</h4>
                <p className="text-sm text-blue-700">Quick start for {userProfile.industry}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Personalized Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Personalized Insights</h3>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">Best Time to Send Campaigns</h4>
                  <p className="text-yellow-700 text-sm">{personalizedContent?.marketInsights}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📈</div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Your Most Used Features</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userProfile.behaviorPatterns.mostUsedFeatures.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Dashboard Optimized For</h4>
                  <p className="text-blue-700 text-sm">{personalizedContent?.dashboardLayout}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Recommendations */}
        <PersonalizedRecommendations userProfile={userProfile} />

        {/* AI Chat Assistant */}
        <PersonalizedAIAssistant industry={userProfile.industry} />
      </div>

      {/* Personality Quiz Modal */}
      {showPersonalityQuiz && (
        <PersonalityQuizModal 
          onComplete={(profile) => {
            setUserProfile(profile);
            setShowPersonalityQuiz(false);
          }}
          onCancel={() => setShowPersonalityQuiz(false)}
        />
      )}
    </PersonalizationContext.Provider>
  );
}

// Component for personalized recommendations
function PersonalizedRecommendations({ userProfile }: { userProfile: UserProfile }) {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    // Generate AI-powered recommendations based on profile
    const aiRecommendations = [
      {
        type: 'campaign',
        title: 'Optimal Campaign Timing',
        description: `Based on ${userProfile.industry} patterns, campaigns sent Tuesday-Thursday at 10 AM show 23% higher engagement`,
        priority: 'high'
      },
      {
        type: 'automation',
        title: 'Smart Follow-up Sequence',
        description: 'Automated follow-up after 3 days increases conversion by 45%',
        priority: 'medium'
      },
      {
        type: 'integration',
        title: 'CRM Syncing Setup',
        description: 'Connect your existing CRM to automate lead handoff',
        priority: 'low'
      }
    ];

    setRecommendations(aiRecommendations);
  }, [userProfile]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Recommendations</h3>
      
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className={`p-4 rounded-lg border ${
            rec.priority === 'high' ? 'bg-red-50 border-red-200' :
            rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
            'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simplified Personality Quiz Modal (placeholder)
function PersonalityQuizModal({ onComplete, onCancel }: { 
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const questions = [
    {
      question: "What's your primary industry?",
      options: ["Technology & IT", "E-commerce & Retail", "Healthcare", "Real Estate", "Other"]
    },
    {
      question: "How big is your company?",
      options: ["1-10 employees", "10-50 employees", "50-200 employees", "200+ employees"]
    },
    {
      question: "What's your role?",
      options: ["Founder/CEO", "Marketing Director", "Sales Manager", "Marketing Specialist", "Other"]
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Create profile from answers
      const profile: UserProfile = {
        id: Date.now().toString(),
        industry: answers.industry || 'Technology & IT',
        companySize: answers.companySize || '10-50',
        role: answers.role || 'Marketing Director',
        experience: 'beginner',
        budget: 'standard',
        priority: ['lead-generation'],
        preferredLanguage: 'English',
        location: 'India',
        behaviorPatterns: {
          mostUsedFeatures: [],
          sessionDuration: 0,
          loginFrequency: 'daily'
        },
        personalizedRecommendations: []
      };
      
      onComplete(profile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Quick Setup ({currentStep + 1}/{questions.length})
        </h3>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">{questions[currentStep].question}</h4>
          
          <div className="space-y-2">
            {(questions[currentStep].options as string[]).map((option) => (
              <button
                key={option}
                onClick={() => setAnswers({ ...answers, [questions[currentStep].question]: option })}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  answers[questions[currentStep].question] === option
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Placeholder for AI Assistant
function PersonalizedAIAssistant({ industry }: { industry: string }) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">💬 AI Assistant for {industry}</h3>
      <p className="text-gray-600 mb-4">
        Get instant help tailored to your industry and specific needs
      </p>
      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
        Chat with AI Assistant
      </button>
    </div>
  );
}

// Export context for use in other components
export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};
