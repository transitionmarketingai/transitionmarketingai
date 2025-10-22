'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle,
  Loader2,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

interface LeadPrediction {
  conversionProbability: number;
  revenuePotential: number;
  timeToConvert: number;
  riskFactors: string[];
  opportunities: string[];
  recommendedActions: string[];
  confidence: number;
}

interface LeadPredictionProps {
  leadId: string;
  leadName: string;
  currentScore?: number;
  onScoreUpdate?: (newScore: number) => void;
}

export function LeadPredictionCard({ leadId, leadName, currentScore, onScoreUpdate }: LeadPredictionProps) {
  const [prediction, setPrediction] = useState<LeadPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [scoring, setScoring] = useState(false);

  const generatePrediction = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/ai/predictive-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction);
      
      if (onScoreUpdate) {
        onScoreUpdate(data.prediction.conversionProbability);
      }
      
      toast.success('AI prediction generated successfully');
    } catch (error) {
      toast.error('Failed to generate prediction');
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const scoreLead = async () => {
    try {
      setScoring(true);
      
      const response = await fetch('/api/ai/score-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId }),
      });

      if (!response.ok) {
        throw new Error('Failed to score lead');
      }

      const data = await response.json();
      
      if (onScoreUpdate) {
        onScoreUpdate(data.score.overallScore);
      }
      
      toast.success(`Lead scored: ${data.score.overallScore}/100 (${data.score.intent} intent)`);
      
      // Generate prediction after scoring
      await generatePrediction();
    } catch (error) {
      toast.error('Failed to score lead');
      console.error('Scoring error:', error);
    } finally {
      setScoring(false);
    }
  };

  const getIntentColor = (probability: number) => {
    if (probability >= 80) return 'bg-red-600';
    if (probability >= 60) return 'bg-yellow-600';
    return 'bg-gray-600';
  };

  const getIntentLabel = (probability: number) => {
    if (probability >= 80) return '🔥 Hot';
    if (probability >= 60) return 'Warm';
    return 'Cold';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Lead Analysis: {leadName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!prediction && !loading && (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">Generate AI-powered insights for this lead</p>
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={scoreLead} 
                disabled={scoring}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {scoring ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Scoring...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Score Lead
                  </>
                )}
              </Button>
              <Button 
                onClick={generatePrediction} 
                disabled={loading}
                variant="outline"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Prediction
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-purple-600" />
            <p className="text-gray-500 mt-2">Generating AI prediction...</p>
          </div>
        )}

        {prediction && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {prediction.conversionProbability}%
                </div>
                <div className="text-sm text-gray-600">Conversion Probability</div>
                <Badge className={`mt-1 ${getIntentColor(prediction.conversionProbability)}`}>
                  {getIntentLabel(prediction.conversionProbability)}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ₹{prediction.revenuePotential.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Revenue Potential</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {prediction.timeToConvert}d
                </div>
                <div className="text-sm text-gray-600">Time to Convert</div>
              </div>
            </div>

            {/* Confidence */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>AI Confidence</span>
                <span>{prediction.confidence}%</span>
              </div>
              <Progress value={prediction.confidence} className="h-2" />
            </div>

            {/* Risk Factors */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Risk Factors
              </h4>
              <div className="space-y-1">
                {prediction.riskFactors.map((risk, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                    {risk}
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Opportunities
              </h4>
              <div className="space-y-1">
                {prediction.opportunities.map((opportunity, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                    {opportunity}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Recommended Actions
              </h4>
              <div className="space-y-1">
                {prediction.recommendedActions.map((action, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    {action}
                  </div>
                ))}
              </div>
            </div>

            {/* Regenerate Button */}
            <div className="pt-4 border-t">
              <Button 
                onClick={generatePrediction} 
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Regenerate Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
