// 🏗️ CORE BUSINESS MODEL INTERFACES & LOGIC
// This implements the sustainable MVP business model design

export interface CoreBusinessModel {
  // Core Pricing Tiers with Sustainable Economics
  tiers: BusinessTier[];
  // Customer lifecycle management
  customerLifecycle: CustomerLifecycle;
  // Revenue and cost calculations
  financials: FinancialMetrics;
}

export interface BusinessTier {
  id: string;
  name: string;
  monthlyPrice: number;
  currency: 'INR' | 'USD';
  
  // Clear scope definition
  scope: {
    maxProspects: number;
    prospectScopeValue: number; // max prospect value/month
    features: string[];
    limitations: string[];
  };
  
  // Cost structure (sustainable unit economics)
  costStructure: {
    platformHosting: number;
    aiProcessing: number;
    dataAPIs: number;
    support: number;
    accountManagement?: number;
    dedicatedResources?: number;
  };
  
  // Expected customer profile
  targetCustomer: {
    companySize: string;
    industryTypes: string[];
    existingTools: string[];
    budgetRange: string;
    decisionMaker: string;
  };
}

export interface CustomerLifecycle {
  stages: LifecycleStage[];
  automation: LifecycleAutomation;
}

export interface LifecycleStage {
  name: string;
  duration: string;
  objectives: string[];
  successMetrics: string[];
  automation: boolean;
}

export interface LifecycleAutomation {
  onboarding: OnboardingFlow;
  activation: ActivationMetrics;
  engagement: EngagementTriggers;
  expansion: ExpansionLogic;
  retention: RetentionStrategy;
}

// 🎯 SUSTAINABLE PRICING TIERS
export const BUSINESS_TIERS: BusinessTier[] = [
  {
    id: 'lead_intelligence_platform',
    name: 'Lead Intelligence Platform',
    monthlyPrice: 9999,
    currency: 'INR',
    
    scope: {
      maxProspects: 1000,
      prospectScopeValue: 1000000, // ₹10L worth of prospects processed monthly
      features: [
        'AI-powered prospect analytics & scoring',
        'Contact enrichment & verification',
        'Industry intelligence reports',
        'CRM data synchronization',
        'Basic outreach automation',
        'Email deliverability optimization',
        'Response tracking & categorization',
        'Weekly analytics dashboard'
      ],
      limitations: [
        'Email channel only (no LinkedIn/WhatsApp)',
        'Standard response templates',
        'Community support (no dedicated AM)',
        '5 CRM integrations maximum'
      ]
    },
    
    costStructure: {
      platformHosting: 500,
      aiProcessing: 1200,
      dataAPIs: 800,
      support: 500,
      accountManagement: 0
    },
    
    targetCustomer: {
      companySize: '10-50 employees',
      industryTypes: ['Technology & IT', 'E-commerce', 'Business Services'],
      existingTools: ['HubSpot', 'Salesforce', 'Any CRM'],
      budgetRange: '₹50,000-200,000/month marketing budget',
      decisionMaker: 'Marketing Manager, Sales Manager'
    }
  },
  
  {
    id: 'professional_outreach_service',
    name: 'Professional Outreach Service',
    monthlyPrice: 29999,
    currency: 'INR',
    
    scope: {
      maxProspects: 500,
      prospectScopeValue: 2000000, // ₹20L worth of prospects processed monthly
      features: [
        'All Lead Intelligence Platform features',
        'Automated email sequences (A/B tested)',
        'LinkedIn messaging optimization',
        'WhatsApp Business integration',
        'Multichannel response routing',
        'Advanced campaign analytics',
        'Dedicated success manager',
        'Priority customer support',
        'Custom content templates',
        'Advanced CRM integrations (API access)'
      ],
      limitations: [
        'Maximum 500 prospects per month',
        'Business hours support (IST)',
        'Standard response time SLA (24 hours)',
        'Monthly strategy calls maximum'
      ]
    },
    
    costStructure: {
      platformHosting: 1000,
      aiProcessing: 2000,
      dataAPIs: 1200,
      support: 2000,
      accountManagement: 5000,
      dedicatedResources: 2000
    },
    
    targetCustomer: {
      companySize: '50-200 employees',
      industryTypes: ['Technology & IT', 'Consulting', 'Real Estate', 'Healthcare'],
      existingTools: ['HubSpot', 'Salesforce', 'Custom CRM', 'Marketing Automation'],
      budgetRange: '₹200,000-500,000/month marketing budget',
      decisionMaker: 'Marketing Director, Sales Director, VP Sales'
    }
  },
  
  {
    id: 'enterprise_automation_suite',
    name: 'Enterprise Automation Suite',
    monthlyPrice: 99999,
    currency: 'INR',
    
    scope: {
      maxProspects: Infinity, // Unlimited prospects
      prospectScopeValue: 10000000, // ₹1Cr+ worth of prospects processed monthly
      features: [
        'All Professional Outreach Service features',
        'White-label platform access',
        'Custom industry templates',
        'Advanced AI models (custom trained)',
        'Priority feature development',
        'SLA guarantee (99.5% uptime)',
        'Dedicated engineering support',
        'Custom CRM development',
        'Advanced integrations (Webhook APIs)',
        'Multi-brand management',
        'Advanced analytics & custom reports'
      ],
      limitations: [
        'Annual contract minimum',
        'India data residency required (for sensitive data)',
        'Custom development timeline: 4-8 weeks',
        'Advanced features require additional onboarding'
      ]
    },
    
    costStructure: {
      platformHosting: 2000,
      aiProcessing: 5000,
      dataAPIs: 3000,
      support: 5000,
      accountManagement: 8000,
      dedicatedResources: 8000
    },
    
    targetCustomer: {
      companySize: '200+ employees',
      industryTypes: ['Technology & IT', 'Enterprise Software', 'Consulting Services', 'Financial Services'],
      existingTools: ['Enterprise CRM', 'Custom Systems', 'Advanced Marketing Stacks'],
      budgetRange: '₹500,000+/month marketing budget',
      decisionMaker: 'VP Marketing, CMO, Sales Operations Manager'
    }
  }
];

// 📊 FINANCIAL METRICS CALCULATIONS
export class FinancialCalculator {
  
  calculateMargin(tierId: string): number {
    const tier = BUSINESS_TIERS.find(t => t.id === tierId);
    if (!tier) throw new Error(`Tier not found: ${tierId}`);
    
    const totalCosts = Object.values(tier.costStructure).reduce((sum, cost) => sum + cost, 0);
    const margin = ((tier.monthlyPrice - totalCosts) / tier.monthlyPrice) * 100;
    
    return Math.round(margin * 100) / 100; // Round to 2 decimal places
  }
  
  calculateCustomerLifetimeValue(tierId: string, avgMonthsActive: number = 24): number {
    const tier = BUSINESS_TIERS.find(t => t.id === tierId);
    if (!tier) throw new Error(`Tier not found: ${tierId}`);
    
    const monthlyMargin = tier.monthlyPrice - Object.values(tier.costStructure).reduce((sum, cost) => sum + cost, 0);
    return monthlyMargin * avgMonthsActive;
  }
  
  calculatePaybackPeriod(tierId: string, customerAcquisitionCost: number): number {
    const tier = BUSINESS_TIERS.find(t => t.id === tierId);
    if (!tier) throw new Error(`Tier not found: ${tierId}`);
    
    const monthlyMargin = tier.monthlyPrice - Object.values(tier.costStructure).reduce((sum, cost) => sum + cost, 0);
    return customerAcquisitionCost / monthlyMargin;
  }
}

// 🎯 CUSTOMER LIFECYCLE MANAGEMENT
export const CUSTOMER_LIFECYCLE: CustomerLifecycle = {
  stages: [
    {
      name: 'Discovery & Evaluation',
      duration: '7-14 days',
      objectives: [
        'Understand prospect pain points',
        'Evaluate platform fit',
        'Demonstrate ROI potential'
      ],
      successMetrics: [
        'Demo completion rate',
        'Platform trial activation',
        'Resource download engagement'
      ],
      automation: true
    },
    {
      name: 'Onboarding & Setup',
      duration: '21-30 days',
      objectives: [
        'Complete account setup',
        'Import initial prospect data',
        'Configure CRM integration',
        'Train users on core features'
      ],
      successMetrics: [
        'Onboarding completion rate',
        'CRM sync success rate',
        'First campaign launch',
        'User activation score'
      ],
      automation: true
    },
    {
      name: 'Activation & Value Realization',
      duration: '30-60 days',
      objectives: [
        'Achieve first qualified lead',
        'Benchmark platform performance',
        'Optimize outreach sequences',
        'Scale prospect processing'
      ],
      successMetrics: [
        'Lead qualification success rate',
        'Email open rates improvement',
        'CRM sync accuracy',
        'Customer satisfaction score'
      ],
      automation: true
    },
    {
      name: 'Growth & Optimization',
      duration: '60-180 days',
      objectives: [
        'Increase monthly lead volume',
        'Improve response rates',
        'Optimize AI scoring accuracy',
        'Expand team usage'
      ],
      successMetrics: [
        'Monthly prospect volume growth',
        'Response rate optimization',
        'Team adoption rate',
        'Revenue impact measurement'
      ],
      automation: false // Requires consultative approach
    },
    {
      name: 'Renewal & Expansion',
      duration: '180+ days',
      objectives: [
        'Annual contract renewal',
        'Usage tier upgrades',
        'Feature expansion',
        'Success story generation'
      ],
      successMetrics: [
        'Annual renewal rate',
        'Upsell conversion rate',
        'Feature adoption rate',
        'Reference account creation'
      ],
      automation: false // Strategic relationship management
    }
  ],
  
  automation: {
    onboarding: {
      triggerEvents: ['subscription_activated', 'payment_confirmed'],
      automationFlows: [
        'automated_welcome_sequence',
        'prospect_upload_guidance',
        'crm_setup_walkthrough',
        'first_campaign_template_selection'
      ],
      performanceTargets: {
        onboardingCompletion: 0.90, // 90% complete within 30 days
        timeToFirstValue: 14, // Days to first qualified lead
        userActivationScore: 0.75 // 75% feature adoption
      }
    },
    
    activation: {
      triggerEvents: ['first_prospect_upload', 'crm_integration_complete', 'first_campaign_launch'],
      automationFlows: [
        'performance_benchmark_setup',
        'optimization_recommendations',
        'success_metrics_tracking',
        'milestone_achievement_celebration'
      ],
      performanceTargets: {
        firstQualifiedLead: 21, // Days to first qualified lead
        responseRateImprovement: 0.25, // 25% improvement over baseline
        platformSatisfactionScore: 8.0 // 8/10 customer satisfaction
      }
    },
    
    engagement: {
      triggerEvents: ['campaign_performance_decline', 'feature_usage_drop', 'support_ticket_escalation'],
      automationFlows: [
        'performance_diagnostic_analysis',
        'optimization_recommendations',
        'proactive_outreach',
        'escalation_to_human_team'
      ],
      performanceTargets: {
        responseTimeToIssues: 4, // Hours
        resolutionRate: 0.85, // 85% of issues resolved via automation
        customerSatisfactionDuringIssues: 7.5 // Maintain 7.5/10 satisfaction
      }
    },
    
    expansion: {
      triggerEvents: ['usage_threshold_exceeded', 'success_story_milestone', 'new_feature_release'],
      automationFlows: [
        'usage_analysis_reporting',
        'upgrade_recommendations',
        'success_story_harvesting',
        'custom_feature_proposition'
      ],
      performanceTargets: {
        upsellConversionRate: 0.20, // 20% upgrade rate
        timeToUpsell: 180, // Days average
        referenceAccountCreation: 0.15 // 15% provide references
      }
    },
    
    retention: {
      triggerEvents: ['churn_risk_prediction', 'engagement_score_decline', 'competitor_evaluation'],
      automationFlows: [
        'engagement_score_monitoring',
        'churn_prediction_analysis',
        'retention_intervention_automation',
        'success_manager_escalation'
      ],
      performanceTargets: {
        annualRetentionRate: 0.90, // 90% annual retention
        churnPredictionAccuracy: 0.85, // 85% accuracy prediction
        interventionSuccessRate: 0.60 // 60% of interventions successful
      }
    }
  }
};

// Interface exports for type safety
export interface OnboardingFlow {
  triggerEvents: string[];
  automationFlows: string[];
  performanceTargets: {
    onboardingCompletion: number;
    timeToFirstValue: number;
    userActivationScore: number;
  };
}

export interface ActivationMetrics {
  triggerEvents: string[];
  automationFlows: string[];
  performanceTargets: {
    firstQualifiedLead: number;
    responseRateImprovement: number;
    platformSatisfactionScore: number;
  };
}

export interface EngagementTriggers {
  triggerEvents: string[];
  automationFlows: string[];
  performanceTargets: {
    responseTimeToIssues: number;
    resolutionRate: number;
    customerSatisfactionDuringIssues: number;
  };
}

export interface ExpansionLogic {
  triggerEvents: string[];
  automationFlows: string[];
  performanceTargets: {
    upsellConversionRate: number;
    timeToUpsell: number;
    referenceAccountCreation: number;
  };
}

export interface RetentionStrategy {
  triggerEvents: string[];
  automationFlows: string[];
  performanceTargets: {
    annualRetentionRate: number;
    churnPredictionAccuracy: number;
    interventionSuccessRate: number;
  };
}

export interface LifecycleStage {
  name: string;
  duration: string;
  objectives: string[];
  successMetrics: string[];
  automation: boolean;
}

// Export calculator instance for use throughout the application
export const financialCalculator = new FinancialCalculator();
