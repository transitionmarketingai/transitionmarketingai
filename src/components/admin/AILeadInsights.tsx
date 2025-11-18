'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';

interface Lead {
  id: string;
  name: string;
  business: string;
  industry: string;
  budget: string;
  goal: string;
  status: string;
}

interface LeadInsights {
  intentLevel: string;
  budgetRange: string;
  nextStep: string;
  confidenceScore: number;
  fullAnalysis: string;
}

interface AILeadInsightsProps {
  lead: Lead | null;
  onClose: () => void;
}

export default function AILeadInsights({ lead, onClose }: AILeadInsightsProps) {
  const [insights, setInsights] = useState<LeadInsights | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeLead = async () => {
    if (!lead) return;

    setLoading(true);
    try {
      const content = `
Name: ${lead.name}
Business: ${lead.business}
Industry: ${lead.industry}
Budget: ${lead.budget}
Goal: ${lead.goal}
Status: ${lead.status}
      `.trim();

      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'lead-analysis',
          content,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const analysis = data.data.result;
        
        // Parse AI response to extract structured data
        const intentMatch = analysis.match(/Intent level[:\s]+(High|Medium|Low)/i);
        const budgetMatch = analysis.match(/budget[:\s]+(₹?[\d,]+-?[\d,]*|[\d,]+-?[\d,]*)/i);
        const nextStepMatch = analysis.match(/next step[:\s]+([^.]+)/i);
        const scoreMatch = analysis.match(/(\d+)[\s-]*100/i);

        setInsights({
          intentLevel: intentMatch?.[1] || 'Medium',
          budgetRange: budgetMatch?.[1] || 'Not specified',
          nextStep: nextStepMatch?.[1] || 'Follow up',
          confidenceScore: scoreMatch ? parseInt(scoreMatch[1]) : 50,
          fullAnalysis: analysis,
        });

        trackEvent('ai_lead_analyzed', {
          event_category: 'ai',
          event_label: 'lead_analysis',
          lead_id: lead.id,
          intent_level: intentMatch?.[1] || 'Medium',
        });
      } else {
        toast.error('Failed to analyze lead');
      }
    } catch (error) {
      console.error('Error analyzing lead:', error);
      toast.error('Error analyzing lead');
    } finally {
      setLoading(false);
    }
  };

  if (!lead) return null;

  const getIntentBadge = (intent: string) => {
    switch (intent.toLowerCase()) {
      case 'high':
        return <Badge className="bg-green-100 text-green-800 border-green-300">High Intent</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium Intent</Badge>;
      case 'low':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Low Intent</Badge>;
      default:
        return <Badge variant="outline">{intent}</Badge>;
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full max-w-md border-2 border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Lead Insights
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-slate-600 mb-2">
            <strong>Lead:</strong> {lead.name} ({lead.business})
          </p>
          <p className="text-sm text-slate-600">
            <strong>Industry:</strong> {lead.industry} • <strong>Budget:</strong> {lead.budget}
          </p>
        </div>

        {!insights && (
          <Button
            onClick={analyzeLead}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Lead with AI
              </>
            )}
          </Button>
        )}

        {insights && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-600 mb-1">Intent Level</p>
                {getIntentBadge(insights.intentLevel)}
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Confidence Score</p>
                <p className={`text-lg font-bold ${getConfidenceColor(insights.confidenceScore)}`}>
                  {insights.confidenceScore}/100
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-600 mb-1">Estimated Budget</p>
              <p className="text-sm font-medium">{insights.budgetRange}</p>
            </div>

            <div>
              <p className="text-xs text-slate-600 mb-1">Recommended Next Step</p>
              <p className="text-sm font-medium text-blue-600">{insights.nextStep}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-slate-600 mb-2">Full Analysis</p>
              <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans bg-slate-50 p-3 rounded">
                {insights.fullAnalysis}
              </pre>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setInsights(null);
                analyzeLead();
              }}
              className="w-full"
            >
              Re-analyze
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}





