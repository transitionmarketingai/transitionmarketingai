'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  MessageSquare, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle,
  Loader2,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Users,
  DollarSign,
} from 'lucide-react';
import { toast } from 'sonner';

interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  emotions: {
    interest: number;
    urgency: number;
    skepticism: number;
    enthusiasm: number;
    frustration: number;
  };
  intent: 'buying' | 'browsing' | 'objection' | 'information' | 'comparison';
  keywords: string[];
  recommendations: string[];
  nextAction: string;
}

interface EngagementPattern {
  responseTime: number;
  responseLength: number;
  questionCount: number;
  engagementLevel: 'high' | 'medium' | 'low';
  preferredChannel: 'email' | 'whatsapp' | 'phone';
  bestTimeToContact: string;
  communicationStyle: 'formal' | 'casual' | 'technical' | 'friendly';
}

interface SentimentAnalysisProps {
  leadId: string;
  leadName: string;
  onAnalysisComplete?: (analysis: SentimentAnalysis) => void;
}

export function SentimentAnalysisCard({ leadId, leadName, onAnalysisComplete }: SentimentAnalysisProps) {
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null);
  const [engagementPattern, setEngagementPattern] = useState<EngagementPattern | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeSentiment = async (message: string) => {
    try {
      setAnalyzing(true);
      
      const response = await fetch('/api/ai/sentiment-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          leadId, 
          message,
          conversationId: 'temp' // You might want to pass actual conversation ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze sentiment');
      }

      const data = await response.json();
      setAnalysis(data.sentiment);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(data.sentiment);
      }
      
      toast.success('Sentiment analysis completed');
    } catch (error) {
      toast.error('Failed to analyze sentiment');
      console.error('Sentiment analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getBehaviorAnalysis = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/ai/sentiment-analysis?leadId=${leadId}`);

      if (!response.ok) {
        throw new Error('Failed to get behavior analysis');
      }

      const data = await response.json();
      setEngagementPattern(data.behaviorAnalysis.engagementPattern);
      
      toast.success('Behavior analysis completed');
    } catch (error) {
      toast.error('Failed to get behavior analysis');
      console.error('Behavior analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'buying': return 'text-green-600 bg-green-100';
      case 'objection': return 'text-red-600 bg-red-100';
      case 'information': return 'text-blue-600 bg-blue-100';
      case 'comparison': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Sentiment Analysis: {leadName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Analysis */}
        <div className="space-y-4">
          <h4 className="font-semibold">Quick Sentiment Analysis</h4>
          <div className="flex gap-2">
            <Button 
              onClick={() => analyzeSentiment('I am interested in your services')}
              disabled={analyzing}
              variant="outline"
              size="sm"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Test Positive
                </>
              )}
            </Button>
            <Button 
              onClick={() => analyzeSentiment('This is too expensive for me')}
              disabled={analyzing}
              variant="outline"
              size="sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              Test Negative
            </Button>
            <Button 
              onClick={getBehaviorAnalysis}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 mr-2" />
                  Behavior Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sentiment Results */}
        {analysis && (
          <div className="space-y-4">
            <h4 className="font-semibold">Latest Analysis</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Badge className={`${getSentimentColor(analysis.sentiment)} mb-2`}>
                  {analysis.sentiment.toUpperCase()}
                </Badge>
                <div className="text-sm text-gray-600">Sentiment</div>
                <div className="text-lg font-semibold">{analysis.confidence}%</div>
              </div>
              <div className="text-center">
                <Badge className={`${getIntentColor(analysis.intent)} mb-2`}>
                  {analysis.intent.toUpperCase()}
                </Badge>
                <div className="text-sm text-gray-600">Intent</div>
                <div className="text-lg font-semibold">High</div>
              </div>
            </div>

            {/* Emotions */}
            <div>
              <h5 className="font-medium mb-2">Emotional Analysis</h5>
              <div className="space-y-2">
                {Object.entries(analysis.emotions).map(([emotion, value]) => (
                  <div key={emotion} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{emotion}</span>
                    <div className="flex items-center gap-2 w-32">
                      <Progress value={value} className="h-2" />
                      <span className="text-sm font-medium">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            {analysis.keywords.length > 0 && (
              <div>
                <h5 className="font-medium mb-2">Key Keywords</h5>
                <div className="flex flex-wrap gap-1">
                  {analysis.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Recommendations
              </h5>
              <div className="space-y-1">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                    {rec}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Action */}
            <div>
              <h5 className="font-medium mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                Next Action
              </h5>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                {analysis.nextAction}
              </div>
            </div>
          </div>
        )}

        {/* Engagement Pattern */}
        {engagementPattern && (
          <div className="space-y-4">
            <h4 className="font-semibold">Engagement Pattern</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {engagementPattern.responseTime.toFixed(1)}h
                </div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {engagementPattern.responseLength}
                </div>
                <div className="text-sm text-gray-600">Avg Message Length</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {engagementPattern.questionCount}
                </div>
                <div className="text-sm text-gray-600">Questions Asked</div>
              </div>
              <div className="text-center">
                <Badge className={`${getEngagementColor(engagementPattern.engagementLevel)}`}>
                  {engagementPattern.engagementLevel.toUpperCase()}
                </Badge>
                <div className="text-sm text-gray-600">Engagement Level</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Preferred Channel</h5>
                <Badge variant="outline" className="capitalize">
                  {engagementPattern.preferredChannel}
                </Badge>
              </div>
              <div>
                <h5 className="font-medium mb-2">Best Contact Time</h5>
                <div className="text-sm text-gray-600">
                  {engagementPattern.bestTimeToContact}
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">Communication Style</h5>
              <Badge variant="outline" className="capitalize">
                {engagementPattern.communicationStyle}
              </Badge>
            </div>
          </div>
        )}

        {/* No Analysis State */}
        {!analysis && !engagementPattern && (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">
              Analyze lead sentiment and engagement patterns
            </p>
            <p className="text-sm text-gray-400">
              Click the buttons above to test sentiment analysis or get behavior insights
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
