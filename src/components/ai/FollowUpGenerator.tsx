'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  Zap,
  Loader2,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

interface FollowUpStep {
  stepNumber: number;
  dayDelay: number;
  channel: 'email' | 'whatsapp' | 'sms';
  subject?: string;
  message: string;
  aiGenerated: boolean;
  personalizationPoints: string[];
}

interface FollowUpSequence {
  id: string;
  name: string;
  industry: string;
  channels: ('email' | 'whatsapp' | 'sms')[];
  steps: FollowUpStep[];
  totalDuration: number;
}

interface FollowUpGeneratorProps {
  leadId: string;
  leadName: string;
  leadIndustry: string;
  onSequenceGenerated?: (sequence: FollowUpSequence) => void;
}

export function FollowUpGenerator({ leadId, leadName, leadIndustry, onSequenceGenerated }: FollowUpGeneratorProps) {
  const [sequence, setSequence] = useState<FollowUpSequence | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const generateSequence = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/ai/generate-follow-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate sequence');
      }

      const data = await response.json();
      setSequence(data.sequence);
      
      if (onSequenceGenerated) {
        onSequenceGenerated(data.sequence);
      }
      
      toast.success('AI follow-up sequence generated successfully');
    } catch (error) {
      toast.error('Failed to generate follow-up sequence');
      console.error('Sequence generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'sms':
        return <Phone className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email':
        return 'bg-blue-100 text-blue-700';
      case 'whatsapp':
        return 'bg-green-100 text-green-700';
      case 'sms':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const executeSequence = async () => {
    try {
      // This would integrate with your outreach system
      toast.success('Follow-up sequence scheduled successfully');
    } catch (error) {
      toast.error('Failed to schedule sequence');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          AI Follow-up Generator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Generate personalized follow-up sequences for {leadName}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!sequence && !loading && (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">
              Create an AI-powered follow-up sequence tailored for {leadIndustry} industry
            </p>
            <Button 
              onClick={generateSequence} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate AI Sequence
                </>
              )}
            </Button>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-blue-600" />
            <p className="text-gray-500 mt-2">Generating personalized follow-up sequence...</p>
          </div>
        )}

        {sequence && (
          <div className="space-y-6">
            {/* Sequence Overview */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">{sequence.name}</h3>
              <div className="flex gap-4 text-sm text-blue-700">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {sequence.totalDuration} days
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {sequence.steps.length} steps
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  AI Generated
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <h4 className="font-semibold">Follow-up Steps</h4>
              {sequence.steps.map((step, index) => (
                <div key={step.stepNumber} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {step.stepNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge className={getChannelColor(step.channel)}>
                            {getChannelIcon(step.channel)}
                            {step.channel}
                          </Badge>
                          {step.dayDelay > 0 && (
                            <span className="text-sm text-gray-500">
                              +{step.dayDelay} days
                            </span>
                          )}
                        </div>
                        {step.subject && (
                          <div className="text-sm font-medium mt-1">{step.subject}</div>
                        )}
                      </div>
                    </div>
                    {step.aiGenerated && (
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        <Zap className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-3 whitespace-pre-wrap">
                    {step.message}
                  </div>
                  
                  {step.personalizationPoints.length > 0 && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Personalized:</span> {step.personalizationPoints.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="flex-1"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
              <Button 
                onClick={executeSequence}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Execute Sequence
              </Button>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Sequence Timeline</h4>
                <div className="space-y-2">
                  {sequence.steps.map((step, index) => {
                    const totalDays = sequence.steps.slice(0, index + 1).reduce((sum, s) => sum + s.dayDelay, 0);
                    return (
                      <div key={step.stepNumber} className="flex items-center gap-3 text-sm">
                        <div className="w-16 text-gray-500">Day {totalDays}</div>
                        <div className="flex items-center gap-2">
                          {getChannelIcon(step.channel)}
                          <span className="font-medium">{step.channel}</span>
                        </div>
                        <div className="text-gray-600">
                          {step.subject || 'Message'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Regenerate */}
            <div className="pt-4 border-t">
              <Button 
                onClick={generateSequence} 
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
                    <Zap className="h-4 w-4 mr-2" />
                    Regenerate Sequence
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
