'use client';

import React, { useState, useEffect } from 'react';
import { leadQualifier } from '@/lib/ai/scoringEngine';

interface LeadScoreResult {
  overallScore: number;
  confidenceLevel: number;
  individualScores: {
    professionalAuthority: number;
    industryIntent: number;
    responseLikelihood: number;
  };
  recommendation: string;
  explanation: string;
  factors: {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
  timestamp: Date;
}

interface ProspectData {
  id: string;
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  industry: string;
  companySize: number;
  location: string;
  linkedinProfile?: string;
  phoneNumber?: string;
  recentActivity?: string[];
  engagementHistory: number;
  personalizationLevel: number;
  messageFrequency: number;
  lastContactDate?: Date;
  channelPreference?: 'email' | 'linkedin' | 'whatsapp' | 'phone';
}

interface ScoringSession {
  sessionId: string;
  prospectId: string;
  scoreResult: LeadScoreResult;
  status: 'scoring' | 'completed' | 'error';
  duration: number; // milliseconds
}

export default function RealtimeLeadScoring({ 
  prospects, 
  onScoringComplete, 
  isOpen, 
  onClose 
}: {
  prospects: ProspectData[];
  onScoringComplete?: (sessions: ScoringSession[]) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [scoringSessions, setScoringSessions] = useState<ScoringSession[]>([]);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<ScoringSession | null>(null);

  const batchSize = 5; // Process 5 prospects at a time to avoid overwhelming the API

  useEffect(() => {
    if (isOpen && prospects.length > 0 && scoringSessions.length === 0) {
      startLeadScoring();
    }
  }, [isOpen, prospects]);

  const startLeadScoring = async () => {
    setIsProcessing(true);
    const sessions: ScoringSession[] = [];

    // Initialize sessions for all prospects
    for (let i = 0; i < prospects.length; i++) {
      const session: ScoringSession = {
        sessionId: `scoring_${prospects[i].id}_${Date.now()}`,
        prospectId: prospects[i].id,
        scoreResult: {
          overallScore: 0,
          confidenceLevel: 0,
          individualScores: { professionalAuthority: 0, industryIntent: 0, responseLikelihood: 0 },
          recommendation: '',
          explanation: '',
          factors: { strengths: [], weaknesses: [], improvements: [] },
          timestamp: new Date()
        },
        status: 'scoring',
        duration: 0
      };
      sessions.push(session);
    }

    setScoringSessions(sessions);
    await processScoringBatches(sessions);
  };

  const processScoringBatches: (sessions: ScoringSession[]) => Promise<void> = async (sessions) => {
    for (let i = 0; i < sessions.length; i += batchSize) {
      const batch = sessions.slice(i, i + batchSize);
      const startTime = Date.now();

      try {
        // Process batch concurrently
        const promises = batch.map(async (session) => {
          const prospect = prospects.find(p => p.id === session.prospectId);
          if (!prospect) return session;

          try {
            // Convert prospect data to the format expected by AI engine
            const prospectData = {
              email: prospect.email,
              linkedinProfile: prospect.linkedinProfile,
              jobTitle: prospect.jobTitle,
              company: prospect.company,
              industry: prospect.industry,
              companySize: prospect.companySize,
              engagementHistory: prospect.engagementHistory,
              personalizationLevel: prospect.personalizationLevel,
              messageFrequency: prospect.messageFrequency,
              lastContactDate: prospect.lastContactDate,
              channelPreference: prospect.channelPreference
            };

            // Score the prospect using AI engine
            const scoreResult = await leadQualifier.qualifyProspect(prospectData);

            // Transform result to our format
            const leadScoreResult: LeadScoreResult = {
              overallScore: scoreResult.overallScore,
              confidenceLevel: scoreResult.confidenceLevel,
              individualScores: {
                professionalAuthority: scoreResult.individualScores.get('Professional Authority Model') || 0,
                industryIntent: scoreResult.individualScores.get('Industry Intent Model') || 0,
                responseLikelihood: scoreResult.individualScores.get('Response Likelihood Model') || 0
              },
              recommendation: scoreResult.recommendation || 'CONTACT',
              explanation: await generateExplanation(scoreResult),
              factors: await generateFactors(scoreResult),
              timestamp: scoreResult.timestamp
            };

            return {
              ...session,
              scoreResult: leadScoreResult,
              status: 'completed' as const,
              duration: Date.now() - startTime
            };

          } catch (error) {
            console.error(`Scoring failed for prospect ${prospect.id}:`, error);
            return {
              ...session,
              status: 'error' as const,
              duration: Date.now() - startTime,
              scoreResult: {
                ...session.scoreResult,
                recommendation: 'ERROR',
                explanation: 'AI scoring failed - requires manual review'
              }
            };
          }
        });

        const batchResults = await Promise.all(promises);

        // Update sessions with results
        setScoringSessions(prev => {
          const updated = [...prev];
          batchResults.forEach((result, index) => {
            const globalIndex = i + index;
            if (updated[globalIndex]) {
              updated[globalIndex] = result;
            }
          });
          return updated;
        });

        // Small delay between batches to avoid rate limiting
        if (i + batchSize < sessions.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

      } catch (error) {
        console.error('Batch processing failed:', error);
        // Mark failed sessions
        setScoringSessions(prev => {
          const updated = [...prev];
          batch.forEach((session, index) => {
            const globalIndex = i + index;
            if (updated[globalIndex]) {
              updated[globalIndex] = {
                ...session,
                status: 'error',
                scoreResult: {
                  ...session.scoreResult,
                  recommendation: 'ERROR',
                  explanation: 'Batch processing failed'
                }
              };
            }
          });
          return updated;
        });
      }
    }

    setIsProcessing(false);
    onScoringComplete?.(scoringSessions);
  };

  const generateExplanation = async (scoreResult: any): Promise<string> => {
    const scores = scoreResult.individualScores;
    const overall = scoreResult.overallScore;
    
    let explanation = `Overall Score: ${overall}/100 - `;
    
    if (overall >= 90) {
      explanation += 'Exceptional lead with high conversion potential. ';
    } else if (overall >= 75) {
      explanation += 'Strong lead with good conversion likelihood. ';
    } else if (overall >= 60) {
      explanation += 'Moderate lead with decent prospects. ';
    } else if (overall >= 40) {
      explanation += 'Lower priority lead requiring nurturing. ';
    } else {
      explanation += 'Cold lead with limited immediate potential. ';
    }

    explanation += `Professional Authority: ${scores.get('Professional Authority Model')}/100, `;
    explanation += `Industry Intent: ${scores.get('Industry Intent Model')}/100, `;
    explanation += `Response Likelihood: ${scores.get('Response Likelihood Model')}/100.`;

    return explanation;
  };

  const generateFactors = async (scoreResult: any): Promise<LeadScoreResult['factors']> => {
    const scores = scoreResult.individualScores;
    
    return {
      strengths: [],
      weaknesses: [],
      improvements: []
    };
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-red-800 bg-red-100 border-red-200';
    if (score >= 75) return 'text-orange-800 bg-orange-100 border-orange-200';
    if (score >= 60) return 'text-yellow-800 bg-yellow-100 border-yellow-200';
    if (score >= 40) return 'text-blue-800 bg-blue-100 border-blue-200';
    return 'text-gray-800 bg-gray-100 border-gray-200';
  };

  const getRecommendationColor = (recommendation: string): string => {
    switch (recommendation) {
      case 'CONTACT_NOW': return 'bg-red-100 text-red-800 border-red-200';
      case 'CONTACT': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'NURTURE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'QUALIFY': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ARCHIVE': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const completedSessions = scoringSessions.filter(s => s.status === 'completed');
  const errorSessions = scoringSessions.filter(s => s.status === 'error');
  const avgScore = completedSessions.length > 0 
    ? completedSessions.reduce((sum, s) => sum + s.scoreResult.overallScore, 0) / completedSessions.length
    : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full h-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Lead Scoring Engine</h2>
            <p className="text-gray-600">Real-time qualification of {prospects.length} prospects using advanced AI models</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Progress</div>
              <div className="text-lg font-bold text-blue-600">
                {completedSessions.length}/{scoringSessions.length}
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Scoring Results */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{completedSessions.length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{avgScore.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {completedSessions.filter(s => s.scoreResult.recommendation === 'CONTACT_NOW' || s.scoreResult.recommendation === 'CONTACT').length}
                </div>
                <div className="text-sm text-gray-600">Priority Leads</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">{errorSessions.length}</div>
                <div className="text-sm text-gray-600">Errors</div>
              </div>
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                  <span className="text-blue-800 font-medium">AI Models processing prospect data...</span>
                </div>
                <div className="mt-2 text-sm text-blue-700">
                  Analyzing professional authority, industry intent, and response likelihood for {scoringSessions.filter(s => s.status === 'scoring').length} prospects
                </div>
              </div>
            )}

            {/* Scoring Results */}
            <div className="space-y-4">
              {scoringSessions.map(session => {
                const prospect = prospects.find(p => p.id === session.prospectId);
                if (!prospect) return null;

                return (
                  <div
                    key={session.sessionId}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                      session.status === 'completed' ? 'border-gray-200 bg-white' :
                      session.status === 'error' ? 'border-red-200 bg-red-50' :
                      'border-blue-200 bg-blue-50'
                    }`}
                    onClick={() => setSelectedProspect(session)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {prospect.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{prospect.name}</div>
                          <div className="text-sm text-gray-600">{prospect.jobTitle} at {prospect.company}</div>
                          <div className="text-xs text-gray-500">{prospect.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {session.status === 'completed' && (
                          <>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(session.scoreResult.overallScore)}`}>
                              {session.scoreResult.overallScore}/100
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRecommendationColor(session.scoreResult.recommendation)}`}>
                              {session.scoreResult.recommendation.replace('_', ' ')}
                            </div>
                          </>
                        )}
                        {session.status === 'scoring' && (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-blue-600">Scoring...</span>
                          </div>
                        )}
                        {session.status === 'error' && (
                          <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                            ERROR
                          </div>
                        )}
                      </div>
                    </div>

                    {session.status === 'completed' && (
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Professional Authority</div>
                            <div className={`text-sm font-medium px-2 py-1 rounded ${getScoreColor(session.scoreResult.individualScores.professionalAuthority)}`}>
                              {session.scoreResult.individualScores.professionalAuthority}/100
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Industry Intent</div>
                            <div className={`text-sm font-medium px-2 py-1 rounded ${getScoreColor(session.scoreResult.individualScores.industryIntent)}`}>
                              {session.scoreResult.individualScores.industryIntent}/100
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Response Likelihood</div>
                            <div className={`text-sm font-medium px-2 py-1 rounded ${getScoreColor(session.scoreResult.individualScores.responseLikelihood)}`}>
                              {session.scoreResult.individualScores.responseLikelihood}/100
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          {session.scoreResult.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          {selectedProspect && (
            <div className="w-80 border-l border-gray-200 p-6 overflow-y-auto bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Score Details</h3>
                <button
                  onClick={() => setSelectedProspect(null)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedProspect.status === 'completed' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Score Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Overall Score</span>
                        <span className={`font-medium px-2 py-1 rounded ${getScoreColor(selectedProspect.scoreResult.overallScore)}`}>
                          {selectedProspect.scoreResult.overallScore}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Confidence</span>
                        <span className="font-medium text-gray-900">
                          {selectedProspect.scoreResult.confidenceLevel.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Recommendation</h4>
                    <div className={`p-3 rounded border ${getRecommendationColor(selectedProspect.scoreResult.recommendation)}`}>
                      {selectedProspect.scoreResult.recommendation.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Explanation</h4>
                    <p className="text-sm text-gray-600">
                      {selectedProspect.scoreResult.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Processing time: {scoringSessions.reduce((sum, s) => sum + s.duration, 0).toFixed(0)}ms
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onClose()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => onScoringComplete?.(scoringSessions)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Scores →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
