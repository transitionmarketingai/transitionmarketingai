'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { 
  Sparkles, 
  Facebook, 
  Instagram, 
  Globe,
  Zap,
  TrendingUp,
  Target,
  Copy,
  Download,
  Send,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

type Platform = 'facebook' | 'instagram' | 'google';
type CampaignGoal = 'leads' | 'awareness' | 'sales' | 'traffic';

interface AdVariation {
  id: string;
  headline: string;
  description: string;
  cta: string;
  targetAudience: string;
  estimatedReach: string;
  estimatedCost: string;
  score: number;
}

export default function AIAdGeneratorPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [platform, setPlatform] = useState<Platform>('facebook');
  const [campaignGoal, setCampaignGoal] = useState<CampaignGoal>('leads');
  const [businessName, setBusinessName] = useState('My Business');
  const [industry, setIndustry] = useState('Real Estate');
  const [targetAudience, setTargetAudience] = useState('Home buyers in Mumbai, age 25-45');
  const [budget, setBudget] = useState('10000');
  const [keyMessage, setKeyMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [adVariations, setAdVariations] = useState<AdVariation[]>([]);
  const [selectedVariations, setSelectedVariations] = useState<Set<string>>(new Set());

  const generateCampaigns = async () => {
    setGenerating(true);
    toast.info('🤖 AI is crafting your ad campaigns...');

    // Simulate API call
    setTimeout(() => {
      const variations: AdVariation[] = [
        {
          id: '1',
          headline: `${industry === 'Real Estate' ? '🏠 Dream Home Awaits!' : '🚀 Transform Your Business Today!'}`,
          description: `Discover premium ${industry.toLowerCase()} solutions tailored for you. ${keyMessage || 'Limited time offer - act now!'}`,
          cta: campaignGoal === 'leads' ? 'Get Started Free' : 'Learn More',
          targetAudience: targetAudience,
          estimatedReach: '15,000 - 25,000',
          estimatedCost: `₹${(parseInt(budget) * 0.8).toLocaleString()} - ₹${parseInt(budget).toLocaleString()}`,
          score: 92,
        },
        {
          id: '2',
          headline: `${industry === 'Real Estate' ? '✨ Your Perfect Property is Here' : '💡 Innovation Starts Here'}`,
          description: `Join thousands who chose ${businessName}. ${keyMessage || 'Expert guidance, proven results.'}`,
          cta: campaignGoal === 'leads' ? 'Book Free Consultation' : 'Discover Now',
          targetAudience: targetAudience,
          estimatedReach: '18,000 - 28,000',
          estimatedCost: `₹${(parseInt(budget) * 0.75).toLocaleString()} - ₹${parseInt(budget).toLocaleString()}`,
          score: 88,
        },
        {
          id: '3',
          headline: `${industry === 'Real Estate' ? '🔑 Unlock Premium Living' : '⚡ Fast-Track Your Success'}`,
          description: `Exclusive ${industry.toLowerCase()} opportunities. ${keyMessage || 'Don\'t miss out - limited availability!'}`,
          cta: campaignGoal === 'leads' ? 'Claim Your Spot' : 'Explore Options',
          targetAudience: targetAudience,
          estimatedReach: '12,000 - 22,000',
          estimatedCost: `₹${(parseInt(budget) * 0.85).toLocaleString()} - ₹${parseInt(budget).toLocaleString()}`,
          score: 85,
        },
      ];

      setAdVariations(variations);
      setGenerating(false);
      setStep(3);
      toast.success('✨ 3 high-performing ad variations generated!');
    }, 3000);
  };

  const toggleVariation = (id: string) => {
    const newSelected = new Set(selectedVariations);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedVariations(newSelected);
  };

  const copyVariation = (variation: AdVariation) => {
    const text = `${variation.headline}\n\n${variation.description}\n\n${variation.cta}`;
    navigator.clipboard.writeText(text);
    toast.success('📋 Ad copy copied to clipboard!');
  };

  const launchCampaigns = () => {
    if (selectedVariations.size === 0) {
      toast.error('Please select at least one ad variation to launch');
      return;
    }
    toast.success(`🚀 Launching ${selectedVariations.size} campaign(s) to ${platform}!`);
    // In production, this would integrate with Meta/Google Ads API
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-500" />
            AI Ad Campaign Generator
          </h1>
          <p className="text-gray-600 mt-1">
            Create high-performing ad campaigns in seconds with AI
          </p>
        </div>
        <Badge variant="outline" className="text-purple-600 border-purple-300 px-4 py-2">
          ✨ Powered by GPT-4
        </Badge>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : '1'}
              </div>
              <span className="font-medium">Platform & Goal</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : '2'}
              </div>
              <span className="font-medium">Campaign Details</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                {step > 3 ? <CheckCircle2 className="h-5 w-5" /> : '3'}
              </div>
              <span className="font-medium">Review & Launch</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Platform & Goal Selection */}
      {step === 1 && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Advertising Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setPlatform('facebook')}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    platform === 'facebook' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Facebook className={`h-12 w-12 mx-auto mb-2 ${platform === 'facebook' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="font-semibold">Facebook Ads</div>
                  <div className="text-sm text-gray-500">2.9B+ users</div>
                </button>
                <button
                  onClick={() => setPlatform('instagram')}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    platform === 'instagram' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <Instagram className={`h-12 w-12 mx-auto mb-2 ${platform === 'instagram' ? 'text-pink-600' : 'text-gray-400'}`} />
                  <div className="font-semibold">Instagram Ads</div>
                  <div className="text-sm text-gray-500">2B+ users</div>
                </button>
                <button
                  onClick={() => setPlatform('google')}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    platform === 'google' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Globe className={`h-12 w-12 mx-auto mb-2 ${platform === 'google' ? 'text-green-600' : 'text-gray-400'}`} />
                  <div className="font-semibold">Google Ads</div>
                  <div className="text-sm text-gray-500">5.6B+ searches/day</div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCampaignGoal('leads')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    campaignGoal === 'leads' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Target className={`h-8 w-8 mx-auto mb-2 ${campaignGoal === 'leads' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="font-semibold">Generate Leads</div>
                  <div className="text-sm text-gray-500">Collect contact information</div>
                </button>
                <button
                  onClick={() => setCampaignGoal('awareness')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    campaignGoal === 'awareness' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <TrendingUp className={`h-8 w-8 mx-auto mb-2 ${campaignGoal === 'awareness' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="font-semibold">Brand Awareness</div>
                  <div className="text-sm text-gray-500">Increase visibility</div>
                </button>
                <button
                  onClick={() => setCampaignGoal('sales')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    campaignGoal === 'sales' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Zap className={`h-8 w-8 mx-auto mb-2 ${campaignGoal === 'sales' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="font-semibold">Drive Sales</div>
                  <div className="text-sm text-gray-500">Increase conversions</div>
                </button>
                <button
                  onClick={() => setCampaignGoal('traffic')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    campaignGoal === 'traffic' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <TrendingUp className={`h-8 w-8 mx-auto mb-2 ${campaignGoal === 'traffic' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="font-semibold">Website Traffic</div>
                  <div className="text-sm text-gray-500">Increase visitors</div>
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} size="lg" className="px-8">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Campaign Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Business Name</Label>
                <Input 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Mumbai Properties"
                />
              </div>
              <div>
                <Label>Industry</Label>
                <select 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option>Real Estate</option>
                  <option>Insurance</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>E-commerce</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Target Audience</Label>
              <Input 
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Home buyers in Mumbai, age 25-45, income ₹10L+"
              />
            </div>

            <div>
              <Label>Monthly Budget (₹)</Label>
              <Input 
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="10000"
              />
            </div>

            <div>
              <Label>Key Message (Optional)</Label>
              <Textarea 
                value={keyMessage}
                onChange={(e) => setKeyMessage(e.target.value)}
                placeholder="Any specific message or offer you want to highlight..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={generateCampaigns} 
                disabled={generating}
                className="flex-1"
                size="lg"
              >
                {generating ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    AI is generating campaigns...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate AI Campaigns
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review & Launch */}
      {step === 3 && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                    <h3 className="text-xl font-bold">AI Generated {adVariations.length} Campaign Variations</h3>
                  </div>
                  <p className="text-gray-600">
                    Each variation is optimized for {platform} {campaignGoal} campaigns
                  </p>
                </div>
                <Button onClick={() => setStep(2)} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>

          {adVariations.map((variation) => (
            <Card key={variation.id} className={`transition-all ${selectedVariations.has(variation.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={selectedVariations.has(variation.id)}
                      onChange={() => toggleVariation(variation.id)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <div>
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        AI Score: {variation.score}/100
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyVariation(variation)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
                    <div className="text-2xl font-bold mb-2">{variation.headline}</div>
                    <p className="text-gray-700 mb-3">{variation.description}</p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      {variation.cta}
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-gray-600">Target Audience</div>
                      <div className="font-semibold">{variation.targetAudience}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-gray-600">Est. Reach</div>
                      <div className="font-semibold">{variation.estimatedReach} people</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-gray-600">Est. Cost</div>
                      <div className="font-semibold">{variation.estimatedCost}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button 
              onClick={launchCampaigns}
              disabled={selectedVariations.size === 0}
              className="flex-1"
              size="lg"
            >
              <Send className="mr-2 h-5 w-5" />
              Launch {selectedVariations.size} Campaign{selectedVariations.size !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

