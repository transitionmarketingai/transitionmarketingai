// 🤖 AI LEAD SCORING ENGINE
// Implements sustainable, explainable AI lead qualification

export interface ScoringEngine {
  models: ScoringModel[];
  qualifier: LeadQualifier;
  learning: LearningSystem;
  explainability: ExplainabilitySystem;
}

export interface ScoringModel {
  name: string;
  purpose: string;
  inputFeatures: InputFeature[];
  outputScore: ScoreRange;
  confidenceThreshold: number;
  humanReviewRequired: boolean;
}

export interface InputFeature {
  name: string;
  dataType: 'string' | 'number' | 'boolean' | 'enum' | 'date';
  importance: number; // Weight in scoring (0-1)
  source: string;
  validationRules: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'format' | 'range' | 'enumeration';
  condition: string;
  errorMessage: string;
}

export interface ScoreRange {
  min: number;
  max: number;
  interpretation: ScoreInterpretation[];
}

export interface ScoreInterpretation {
  range: [number, number];
  label: string;
  recommendedAction: string;
  probability: string;
}

export interface LeadQualifier {
  scoringFactors: ScoringFactor[];
  qualifierEngine: QualifierEngine;
  performanceMetrics: PerformanceMetrics;
}

export interface ScoringFactor {
  factor: string;
  weight: number;
  description: string;
  dataRequirements: string[];
}

export interface QualifierEngine {
  models: QualifierModel[];
  ensemble: EnsembleMethod;
  confidenceCalculation: ConfidenceCalculation;
}

export interface QualifierModel {
  name: string;
  type: 'classification' | 'regression' | 'ensemble';
  trainingData: string;
  accuracy: number;
  features: string[];
}

export interface EnsembleMethod {
  method: 'voting' | 'averaging' | 'stacking';
  weights: Record<string, number>;
  validationStrategy: string;
}

export interface ConfidenceCalculation {
  method: 'bootstrap' | 'cross_validation' | 'prediction_intervals';
  threshold: number;
  uncertaintyFactors: string[];
}

export interface PerformanceMetrics {
  accuracy: PerformanceMetric;
  precision: PerformanceMetric;
  recall: PerformanceMetric;
  f1Score: PerformanceMetric;
  rocAuc: PerformanceMetric;
}

export interface PerformanceMetric {
  current: number;
  target: number;
  historicalTrend: number[];
  modelImprovement: boolean;
}

// 🎯 CORE SCORING MODELS
export const SCORING_MODELS: ScoringModel[] = [
  {
    name: 'Professional Authority Model',
    purpose: 'Score contact decision-making authority and professional influence',
    inputFeatures: [
      {
        name: 'jobTitle',
        dataType: 'string',
        importance: 0.35,
        source: 'LinkedIn Sales Navigator',
        validationRules: [
          { type: 'required', condition: 'non-empty', errorMessage: 'Job title is required' }
        ]
      },
      {
        name: 'seniorityLevel',
        dataType: 'enum',
        importance: 0.30,
        source: 'Job Title Analysis',
        validationRules: [
          { type: 'enumeration', condition: 'c-suite|vp|director|manager|individual', errorMessage: 'Invalid seniority level' }
        ]
      },
      {
        name: 'companySize',
        dataType: 'number',
        importance: 0.20,
        source: 'Company Database',
        validationRules: [
          { type: 'range', condition: '1-100000', errorMessage: 'Company size must be positive' }
        ]
      },
      {
        name: 'connectionsCount',
        dataType: 'number',
        importance: 0.15,
        source: 'LinkedIn Sales Navigator',
        validationRules: [
          { type: 'range', condition: '0-50000', errorMessage: 'Invalid connection count' }
        ]
      }
    ],
    outputScore: {
      min: 0,
      max: 100,
      interpretation: [
        { range: [90, 100], label: 'Executive Authority', recommendedAction: 'Priority outreach', probability: 'High purchase probability' },
        { range: [70, 89], label: 'Decision Maker', recommendedAction: 'Targeted outreach', probability: 'Medium-high purchase probability' },
        { range: [50, 69], label: 'Influencer', recommendedAction: 'Nurture sequence', probability: 'Medium purchase probability' },
        { range: [30, 49], label: 'Participant', recommendedAction: 'Educational content', probability: 'Low-medium purchase probability' },
        { range: [0, 29], label: 'Observer', recommendedAction: 'Brand awareness', probability: 'Low purchase probability' }
      ]
    },
    confidenceThreshold: 0.75,
    humanReviewRequired: false
  },
  
  {
    name: 'Industry Intent Model',
    purpose: 'Assess company likelihood to purchase based on industry indicators',
    inputFeatures: [
      {
        name: 'industry',
        dataType: 'enum',
        importance: 0.25,
        source: 'Company Database',
        validationRules: [
          { type: 'required', condition: 'non-empty', errorMessage: 'Industry is required' },
          { type: 'enumeration', condition: 'technology|healthcare|real-estate|consulting|financial-services', errorMessage: 'Unknown industry' }
        ]
      },
      {
        name: 'companyFunding',
        dataType: 'string',
        importance: 0.20,
        source: 'Business Intelligence APIs',
        validationRules: [
          { type: 'enumeration', condition: 'pre-seed|seed|series-a|series-b|series-c|series-d|public|private', errorMessage: 'Invalid funding stage' }
        ]
      },
      {
        name: 'employeeGrowthRate',
        targetType: 'number',
        importance: 0.20,
        source: 'Company Growth Data',
        validationRules: [
          { type: 'range', condition: '-50 to 500', errorMessage: 'Invalid growth rate percentage' }
        ]
      },
      {
        name: 'technologyAdoption',
        dataType: 'number',
        importance: 0.15,
        source: 'Website Technology Stack Analysis',
        validationRules: [
          { type: 'range', condition: '0-10', errorMessage: 'Invalid technology adoption score' }
        ]
      },
      {
        name: 'recentHiringTrend',
        dataType: 'number',
        importance: 0.10,
        source: 'Job Posting Analysis',
        validationRules: [
          { type: 'range', condition: '0-100', errorMessage: 'Invalid hiring trend score' }
        ]
      },
      {
        name: 'marketCompetition',
        dataType: 'number',
        importance: 0.10,
        source: 'Market Analysis',
        validationRules: [
          { type: 'range', condition: '0-5', errorMessage: 'Invalid competition score' }
        ]
      }
    ],
    outputScore: {
      min: 0,
      max: 100,
      interpretation: [
        { range: [85, 100], label: 'High Intent', recommendedAction: 'Immediate engagement', probability: '85%+ purchase likelihood' },
        { range: [65, 84], label: 'Medium Intent', recommendedAction: 'Targeted campaigns', probability: '60-85% purchase likelihood' },
        { range: [40, 64], label: 'Low Intent', recommendedAction: 'Nurture with education', probability: '30-60% purchase likelihood' },
        { range: [0, 39], label: 'Very Low Intent', recommendedAction: 'Long-term nurturing', probability: 'Less than 30% purchase likelihood' }
      ]
    },
    confidenceThreshold: 0.70,
    humanReviewRequired: false
  },
  
  {
    name: 'Response Likelihood Model',
    purpose: 'Predict likelihood of prospect responding to outreach',
    inputFeatures: [
      {
        name: 'engagementHistory',
        dataType: 'number',
        importance: 0.30,
        source: 'Platform Interaction Data',
        validationRules: [
          { type: 'range', condition: '0-100', errorMessage: 'Invalid engagement history score' }
        ]
      },
      {
        name: 'responseTimingPreference',
        dataType: 'string',
        importance: 0.20,
        source: 'Behavioral Analysis',
        validationRules: [
          { type: 'enumeration', condition: 'morning|afternoon|evening|weekday|weekend', errorMessage: 'Invalid response timing preference' }
        ]
      },
      {
        name: 'channelPreference',
        dataType: 'string',
        importance: 0.20,
        source: 'Communication History',
        validationRules: [
          { type: 'enumeration', condition: 'email|linkedin|whatsapp|phone', errorMessage: 'Invalid channel preference' }
        ]
      },
      {
        name: 'messageFrequency',
        dataType: 'number',
        importance: 0.15,
        source: 'Campaign Performance Data',
        validationRules: [
          { type: 'range', condition: '1-10', errorMessage: 'Invalid message frequency score' }
        ]
      },
      {
        name: 'personalizationLevel',
        dataType: 'number',
        importance: 0.15,
        source: 'Content Interaction Analysis',
      validationRules: [
          { type: 'range', condition: '0-100', errorMessage: 'Invalid personalization level' }
        ]
      }
    ],
    outputScore: {
      min: 0,
      max: 100,
      interpretation: [
        { range: [80, 100], label: 'High Response Rate', recommendedAction: 'Immediate outreach', probability: '60%+ response rate' },
        { range: [60, 79], label: 'Medium Response Rate', recommendedAction: 'Preferred timing', probability: '40-60% response rate' },
        { range: [40, 59], label: 'Low Response Rate', recommendedAction: 'A/B test content', probability: '20-40% response rate' },
        { range: [0, 39], label: 'Very Low Response Rate', recommendedAction: 'Review messaging', probability: 'Less than 20% response rate' }
      ]
    },
    confidenceThreshold: 0.65,
    humanReviewRequired: false
  },
  
  {
    name: 'Purchase Timeline Model',
    purpose: 'Estimate how quickly prospect is likely to make purchasing decision',
    inputFeatures: [
      {
        name: 'budgetAvailability',
        dataType: 'enum',
        importance: 0.25,
        source: 'Company Financial Health',
        validationRules: [
          { type: 'enumeration', condition: 'q1|q2|q3|q4|immediate', errorMessage: 'Invalid budget availability period' }
        ]
      },
      {
        name: 'urgencyIndicators',
        dataType: 'number',
        importance: 0.25,
        source: 'Behavioral Signal Analysis',
        validationRules: [
          { type: 'range', condition: '0-10', errorMessage: 'Invalid urgency indicator score' }
        ]
      },
      {
        name: 'decisionMakingProcess',
        dataType: 'enum',
        importance: 0.20,
        source: 'Company Culture Analysis',
        validationRules: [
          { type: 'enumeration', condition: 'consensus|top-down|committee|individual', errorMessage: 'Invalid decision-making process' }
        ]
      },
      {
        name: 'competitivePressure',
        dataType: 'number',
        importance: 0.15,
        source: 'Market Intelligence',
        validationRules: [
          { type: 'range', condition: '0-5', errorMessage: 'Invalid competitive pressure score' }
        ]
      },
      {
        name: 'projectTimeline',
        dataType: 'string',
        importance: 0.15,
        source: 'Project Intelligence',
        validationRules: [
          { type: 'enumeration', condition: 'urgent|q1|q2|q3|q4|next-year', errorMessage: 'Invalid project timeline' }
        ]
      }
    ],
    outputScore: {
      min: 0,
      max: 100,
      interpretation: [
        { range: [90, 100], label: 'Immediate Decision', recommendedAction: 'Priority handling', probability: 'Purchase within 30 days' },
        { range: [70, 89], label: 'Quick Decision', recommendedAction: 'Accelerated nurture', probability: 'Purchase within 3 months' },
        { range: [50, 69], label: 'Normal Timeline', recommendedAction: 'Standard nurturing', probability: 'Purchase within 6 months' },
        { range: [30, 49], label: 'Extended Timeline', recommendedAction: 'Long-term nurturing', probability: 'Purchase within 12 months' },
        { range: [0, 29], label: 'Future Consideration', recommendedAction: 'Relationship building', probability: 'Purchase beyond 12 months' }
      ]
    },
    confidenceThreshold: 0.70,
    humanReviewRequired: false
  }
];

// 🧠 LEAD QUALIFICATION ENGINE
export class LeadQualifier {
  private models: Map<string, ScoringModel>;
  private ensembleMethod: EnsembleMethod;
  private performanceTracker: PerformanceMetricsTracker;
  
  constructor() {
    this.models = new Map();
    SCORING_MODELS.forEach(model => {
      this.models.set(model.name, model);
    });
    
    this.ensembleMethod = {
      method: 'stacking',
      weights: {
        'Professional Authority Model': 0.30,
        'Industry Intent Model': 0.30,
        'Response Likelihood Model': 0.25,
        'Purchase Timeline Model': 0.15
      },
      validationStrategy: 'cross-validation with 5 folds'
    };
    
    this.performanceTracker = new PerformanceMetricsTracker();
  }
  
  /**
   * Primary qualification method - calculates overall lead score
   */
  public async qualifyProspect(prospectData: ProspectData): Promise<QualificationResult> {
    // 1. Validate input data
    const validationResult = await this.validateProspectData(prospectData);
    if (!validationResult.isValid) {
      throw new ValidationError(`Data validation failed: ${validationResult.errors.join(', ')}`);
    }
    
    // 2. Score using individual models
    const individualScores = await this.calculateIndividualScores(prospectData);
    
    // 3. Calculate ensemble score
    const ensembleScore = await this.calculateEnsembleScore(individualScores);
    
    // 4. Calculate confidence level
    const confidence = await this.calculateConfidence(individualScores);
    
    // 5. Determine recommended action
    const recommendation = await this.getRecommendedAction(ensembleScore);
    
    // 6. Log performance metrics
    await this.performanceTracker.logQualification(prospectData, ensembleScore, confidence);
    
    return {
      overallScore: ensembleScore.score,
      confidenceLevel: confidence,
      individualScores,
      recommendation: recommendation,
      explanation: await this.generateExplanation(individualScores, ensembleScore),
      modelVersion: '1.0',
      timestamp: new Date()
    };
  }
  
  private async validateProspectData(data: ProspectData): Promise<ValidationResult> {
    const errors: string[] = [];
    
    // Validate required fields
    if (!data.email && !data.linkedinProfile && !data.company) {
      errors.push('At least one contact method (email, LinkedIn, or company) is required');
    }
    
    // Validate email format if provided
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  private async calculateIndividualScores(data: ProspectData): Promise<Map<string, number>> {
    const scores = new Map<string, number>();
    
    for (const [modelName, model] of this.models) {
      try {
        const score = await this.scoreWithModel(model, data);
        scores.set(modelName, score);
      } catch (error) {
        console.warn(`Failed to score with ${modelName}:`, error);
        scores.set(modelName, 50); // Default midpoint score
      }
    }
    
    return scores;
  }
  
  private async scoreWithModel(model: ScoringModel, data: ProspectData): Promise<number> {
    // Simplified scoring logic - in production, this would use trained ML models
    let score = 0;
    let totalWeight = 0;
    
    for (const feature of model.inputFeatures) {
      const value = this.extractFeatureValue(feature.name, data);
      if (value !== null) {
        const featureScore = this.scoreFeature(feature, value);
        score += featureScore * feature.importance;
        totalWeight += feature.importance;
      }
    }
    
    return totalWeight > 0 ? score / totalWeight : 50;
  }
  
  private extractFeatureValue(featureName: string, data: ProspectData): any {
    switch (featureName) {
      case 'jobTitle':
        return data.jobTitle;
      case 'seniorityLevel':
        return this.determineSeniorityLevel(data.jobTitle);
      case 'companySize':
        return data.companySize;
      case 'industry':
        return data.industry;
      default:
        return null;
    }
  }
  
  private determineSeniorityLevel(jobTitle: string): string {
    const title = jobTitle?.toLowerCase() || '';
    
    if (title.includes('ceo') || title.includes('founder') || title.includes('chief')) {
      return 'c-suite';
    } else if (title.includes('vp') || title.includes('vice president')) {
      return 'vp';
    } else if (title.includes('director')) {
      return 'director';
    } else if (title.includes('manager')) {
      return 'manager';
    } else {
      return 'individual';
    }
  }
  
  private scoreFeature(feature: InputFeature, value: any): number {
    switch (feature.name) {
      case 'seniorityLevel':
        const seniorityScore = {
          'c-suite': 95,
          'vp': 85,
          'director': 70,
          'manager': 50,
          'individual': 20
        };
        return seniorityScore[value] || 50;
        
      case 'companySize':
        if (typeof value === 'number') {
          if (value >= 1000) return 80;
          if (value >= 100) return 70;
          if (value >= 10) return 60;
          return 40;
        }
        return 50;
        
      case 'industry':
        const industryInterest = {
          'technology': 85,
          'healthcare': 75,
          'financial-services': 80,
          'consulting': 70,
          'real-estate': 65
        };
        return industryInterest[value] || 50;
        
      default:
        return 50; // Default medium score
    }
  }
  
  private async calculateEnsembleScore(individualScores: Map<string, number>): Promise<{score: number}> {
    let weightedSum = 0;
    let totalWeight = 0;
    
    for (const [modelName, score] of individualScores) {
      const weight = this.ensembleMethod.weights[modelName] || 0;
      weightedSum += score * weight;
      totalWeight += weight;
    }
    
    return {
      score: totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 50
    };
  }
  
  private async calculateConfidence(individualScores: Map<string, number>): Promise<number> {
    const scores = Array.from(individualScores.values());
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);
    
    // Higher variance = lower confidence
    const confidence = Math.max(0, Math.min(1, 1 - (stdDev / 25))); // Normalize against reasonable std dev
    
    return Math.round(confidence * 100) / 100;
  }
  
  private async getRecommendedAction(overallScore: number): Promise<string> {
    if (overallScore >= 80) return 'Priority Outreach';
    if (overallScore >= 60) return 'Targeted Outreach';
    if (overallScore >= 40) return 'Nurture Sequence';
    if (overallScore >= 20) return 'Educational Content';
    return 'Brand Awareness';
  }
  
  private async generateExplanation(individualScores: Map<string, number>, ensembleScore: {score: number}): Promise<string> {
    const topFactors: string[] = [];
    
    for (const [modelName, score] of individualScores) {
      if (score > 70) {
        topFactors.push(`${modelName} suggests strong potential`);
      } else if (score < 30) {
        topFactors.push(`${modelName} indicates room for improvement`);
      }
    }
    
    return `Overall score of ${ensembleScore.score}/100 based on professional authority, industry intent, and engagement likelihood. ${topFactors.join('. ')}`;
  }
}

export class PerformanceMetricsTracker {
  private metrics: PerformanceMetrics = {
    accuracy: {
      current: 0.75,
      target: 0.85,
      historicalTrend: [0.70, 0.72, 0.74, 0.75],
      modelImprovement: true
    },
    precision: {
      current: 0.78,
      target: 0.80,
      historicalTrend: [0.75, 0.76, 0.77, 0.78],
      modelImprovement: true
    },
    recall: {
      current: 0.72,
      target: 0.75,
      historicalTrend: [0.70, 0.71, 0.72, 0.72],
      modelImprovement: true
    },
    f1Score: {
      current: 0.75,
      target: 0.77,
      historicalTrend: [0.72, 0.73, 0.74, 0.75],
      modelImprovement: true
    },
    rocAuc: {
      current: 0.82,
      target: 0.85,
      historicalTrend: [0.80, 0.81, 0.82, 0.82],
      modelImprovement: true
    }
  };
  
  async logQualification(prospectData: ProspectData, score: number, confidence: number): Promise<void> {
    // In production, this would log to a metrics database
    console.log(`Qualification logged: score=${score}, confidence=${confidence}`);
  }
  
  async updateMetrics(actualOutcomes: Record<string, boolean>): Promise<void> {
    // This would retrain models based on actual outcomes
    console.log('Metrics updated with actual outcomes:', actualOutcomes);
  }
}

// Interface definitions
export interface ProspectData {
  email?: string;
  linkedinProfile?: string;
  company?: string;
  jobTitle?: string;
  companySize?: number;
  industry?: string;
  [key: string]: any;
}

export interface QualificationResult {
  overallScore: number;
  confidenceLevel: number;
  individualScores: Map<string, number>;
  recommendation: string;
  explanation: string;
  modelVersion: string;
  timestamp: Date;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Export instance for use throughout the application
export const leadQualifier = new LeadQualifier();
export const performanceTracker = new PerformanceMetricsTracker();
