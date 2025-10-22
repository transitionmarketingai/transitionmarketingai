'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TestTube, 
  Mail, 
  MessageSquare, 
  Phone,
  TrendingUp,
  Target,
  Loader2,
  Zap,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { toast } from 'sonner';

interface ABTestVariant {
  id: string;
  name: string;
  subject?: string;
  message: string;
  channel: 'email' | 'whatsapp' | 'sms';
  personalizationLevel: 'low' | 'medium' | 'high';
  tone: 'professional' | 'casual' | 'urgent' | 'friendly';
  ctaType: 'direct' | 'soft' | 'question' | 'value';
}

interface ABTestResult {
  variantId: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  converted: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  conversionRate: number;
  confidence: number;
}

interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
  status: 'draft' | 'running' | 'completed' | 'paused';
  results?: ABTestResult[];
  winner?: string;
  insights?: string[];
  recommendations?: string[];
}

interface ABTestingCardProps {
  leadId?: string;
  leadName?: string;
  industry: string;
  onTestCreated?: (test: ABTest) => void;
}

export function ABTestingCard({ leadId, leadName, industry, onTestCreated }: ABTestingCardProps) {
  const [test, setTest] = useState<ABTest | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const generateABTest = async (originalMessage: string) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/ai/ab-testing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          originalMessage,
          leadContext: leadId ? { leadId, leadName } : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate A/B test');
      }

      const data = await response.json();
      setTest(data.abTest);
      
      if (onTestCreated) {
        onTestCreated(data.abTest);
      }
      
      toast.success('A/B test variants generated successfully');
    } catch (error) {
      toast.error('Failed to generate A/B test');
      console.error('A/B test generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeTest = async () => {
    if (!test || !selectedVariant) {
      toast.error('Please select a variant to test');
      return;
    }

    try {
      // Simulate test execution with mock results
      const mockResults: ABTestResult[] = test.variants.map(variant => ({
        variantId: variant.id,
        sent: Math.floor(Math.random() * 100) + 50,
        delivered: Math.floor(Math.random() * 90) + 45,
        opened: Math.floor(Math.random() * 40) + 20,
        clicked: Math.floor(Math.random() * 15) + 5,
        replied: Math.floor(Math.random() * 8) + 2,
        converted: Math.floor(Math.random() * 3) + 1,
        openRate: Math.floor(Math.random() * 30) + 20,
        clickRate: Math.floor(Math.random() * 15) + 5,
        replyRate: Math.floor(Math.random() * 10) + 3,
        conversionRate: Math.floor(Math.random() * 8) + 2,
        confidence: Math.floor(Math.random() * 20) + 70,
      }));

      const response = await fetch('/api/ai/ab-testing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          testId: test.id,
          results: mockResults
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to execute A/B test');
      }

      const data = await response.json();
      setTest(data.abTest);
      setShowResults(true);
      
      toast.success('A/B test executed successfully');
    } catch (error) {
      toast.error('Failed to execute A/B test');
      console.error('A/B test execution error:', error);
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

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'professional':
        return 'bg-blue-100 text-blue-700';
      case 'casual':
        return 'bg-green-100 text-green-700';
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'friendly':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPersonalizationColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5 text-blue-600" />
          Smart A/B Testing
        </CardTitle>
        <p className="text-sm text-gray-600">
          Generate and test multiple message variants to optimize performance
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Test Generation */}
        {!test && (
          <div className="space-y-4">
            <h4 className="font-semibold">Generate A/B Test Variants</h4>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                Enter your original message to generate optimized variants:
              </div>
              <textarea
                className="w-full p-3 border rounded-lg resize-none"
                rows={3}
                placeholder="Enter your original message here..."
                id="originalMessage"
              />
              <Button 
                onClick={() => {
                  const message = (document.getElementById('originalMessage') as HTMLTextAreaElement)?.value;
                  if (!message) {
                    toast.error('Please enter a message');
                    return;
                  }
                  generateABTest(message);
                }}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Variants...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate A/B Test Variants
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Test Variants */}
        {test && !showResults && (
          <div className="space-y-4">
            <h4 className="font-semibold">Test Variants</h4>
            <div className="space-y-4">
              {test.variants.map((variant, index) => (
                <div 
                  key={variant.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedVariant === variant.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedVariant(variant.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{variant.name}</div>
                        <div className="flex gap-2 mt-1">
                          <Badge className={getChannelColor(variant.channel)}>
                            {getChannelIcon(variant.channel)}
                            {variant.channel}
                          </Badge>
                          <Badge className={getToneColor(variant.tone)}>
                            {variant.tone}
                          </Badge>
                          <Badge className={getPersonalizationColor(variant.personalizationLevel)}>
                            {variant.personalizationLevel} personalization
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {selectedVariant === variant.id && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  
                  {variant.subject && (
                    <div className="text-sm font-medium mb-2">
                      Subject: {variant.subject}
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {variant.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button 
                onClick={executeTest}
                disabled={!selectedVariant}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Execute A/B Test
              </Button>
              <Button 
                onClick={() => setTest(null)}
                variant="outline"
              >
                Generate New Test
              </Button>
            </div>
          </div>
        )}

        {/* Test Results */}
        {test && showResults && test.results && (
          <div className="space-y-4">
            <h4 className="font-semibold">Test Results</h4>
            
            {/* Winner */}
            {test.winner && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Winning Variant
                </h5>
                <div className="text-sm text-green-700">
                  Variant {test.variants.findIndex(v => v.id === test.winner) + 1} performed best
                </div>
              </div>
            )}

            {/* Results Table */}
            <div className="space-y-3">
              {test.results.map((result, index) => {
                const variant = test.variants.find(v => v.id === result.variantId);
                const isWinner = result.variantId === test.winner;
                
                return (
                  <div 
                    key={result.variantId} 
                    className={`border rounded-lg p-4 ${isWinner ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isWinner ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{variant?.name}</div>
                          <div className="text-sm text-gray-600">
                            {result.sent} sent • {result.delivered} delivered
                          </div>
                        </div>
                      </div>
                      {isWinner && (
                        <Badge className="bg-green-600 text-white">
                          Winner
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          {result.openRate}%
                        </div>
                        <div className="text-xs text-gray-600">Open Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          {result.clickRate}%
                        </div>
                        <div className="text-xs text-gray-600">Click Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">
                          {result.replyRate}%
                        </div>
                        <div className="text-xs text-gray-600">Reply Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-orange-600">
                          {result.conversionRate}%
                        </div>
                        <div className="text-xs text-gray-600">Conversion</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insights */}
            {test.insights && test.insights.length > 0 && (
              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Key Insights
                </h5>
                <div className="space-y-1">
                  {test.insights.map((insight, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {test.recommendations && test.recommendations.length > 0 && (
              <div>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  Recommendations
                </h5>
                <div className="space-y-1">
                  {test.recommendations.map((rec, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button 
                onClick={() => {
                  setTest(null);
                  setShowResults(false);
                  setSelectedVariant(null);
                }}
                variant="outline"
                className="w-full"
              >
                Create New Test
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
