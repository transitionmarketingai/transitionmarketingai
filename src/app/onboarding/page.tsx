'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, Building2, Target, Bot, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

export default function OnboardingPageAIFirst() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Business Info
    businessName: '',
    industry: '',
    contactEmail: '',
    whatYouSell: '',
    
    // Step 2: Ideal Customer
    targetIndustry: '',
    targetLocation: '',
    companySize: '',
    painPoint: '',
  });

  const progress = (step / 3) * 100;

  const handleNext = () => {
    // Validation
    if (step === 1) {
      if (!formData.businessName || !formData.industry || !formData.contactEmail || !formData.whatYouSell) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    if (step === 2) {
      if (!formData.targetIndustry || !formData.targetLocation) {
        toast.error('Please fill in target industry and location');
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    toast.success('🤖 AI is now finding your ideal prospects!');
    // Save to localStorage for demo
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('user_data', JSON.stringify(formData));
    localStorage.setItem('ai_autopilot', 'active');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="h-6 w-6 text-purple-600" />
            <h1 className="text-3xl font-bold">AI is Ready to Work for You</h1>
          </div>
          <p className="text-gray-600">Just 3 quick questions so AI knows who to find</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && <><Building2 className="h-6 w-6 text-blue-600" /> Your Business</>}
              {step === 2 && <><Target className="h-6 w-6 text-purple-600" /> Your Ideal Customer</>}
              {step === 3 && <><Sparkles className="h-6 w-6 text-green-600" /> AI is Ready!</>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Business Info */}
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="businessName">Your Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g., ABC Solutions Pvt Ltd"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Your Industry *</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Software, E-commerce, Consulting"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Your Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="whatYouSell">What do you sell? *</Label>
                  <Textarea
                    id="whatYouSell"
                    placeholder="e.g., Marketing automation software that helps businesses generate more leads"
                    value={formData.whatYouSell}
                    onChange={(e) => setFormData({ ...formData, whatYouSell: e.target.value })}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    AI will use this to write personalized emails for you
                  </p>
                </div>
              </>
            )}

            {/* Step 2: Ideal Customer */}
            {step === 2 && (
              <>
                <div>
                  <Label htmlFor="targetIndustry">Who are your ideal customers? *</Label>
                  <Input
                    id="targetIndustry"
                    placeholder="e.g., E-commerce businesses, Software companies, Marketing agencies"
                    value={formData.targetIndustry}
                    onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    AI will search for businesses matching this description
                  </p>
                </div>
                <div>
                  <Label htmlFor="targetLocation">Where are they located? *</Label>
                  <Input
                    id="targetLocation"
                    placeholder="e.g., Mumbai, Bangalore, Delhi NCR, Pan India"
                    value={formData.targetLocation}
                    onChange={(e) => setFormData({ ...formData, targetLocation: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size (Optional)</Label>
                  <select
                    id="companySize"
                    className="w-full border rounded-md p-2"
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  >
                    <option value="">Any size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="10-50">10-50 employees</option>
                    <option value="50-200">50-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="painPoint">Their biggest challenge? (Optional)</Label>
                  <Textarea
                    id="painPoint"
                    placeholder="e.g., Struggling to generate consistent leads, spending too much on ads"
                    value={formData.painPoint}
                    onChange={(e) => setFormData({ ...formData, painPoint: e.target.value })}
                    rows={2}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    AI will use this to personalize outreach
                  </p>
                </div>
              </>
            )}

            {/* Step 3: AI Ready */}
            {step === 3 && (
              <>
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-12 w-12 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI is Ready to Work!</h3>
                  <p className="text-gray-600 mb-6">
                    Your AI marketing team will start finding prospects immediately
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    What Happens Next (100% Automated):
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-medium">AI Finds Your Prospects (Today)</div>
                        <div className="text-sm text-gray-600">AI will search for "{formData.targetIndustry}" in {formData.targetLocation} and deliver 50 qualified prospects by tomorrow morning</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-medium">AI Writes Personalized Emails (Automatic)</div>
                        <div className="text-sm text-gray-600">For each prospect, AI writes a unique email about "{formData.whatYouSell}"</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-medium">You Review & Approve (5 minutes)</div>
                        <div className="text-sm text-gray-600">See AI-written emails, approve the best ones, send with one click</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        4
                      </div>
                      <div>
                        <div className="font-medium">AI Handles Follow-Ups (Automatic)</div>
                        <div className="text-sm text-gray-600">If no response, AI sends 2-3 follow-ups automatically</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        5
                      </div>
                      <div>
                        <div className="font-medium">Get Meetings Booked</div>
                        <div className="text-sm text-gray-600">When prospects respond, AI helps you close the conversation</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-900 text-center">
                    ✨ <strong>Your 14-day free trial includes:</strong> 50 AI-found prospects + 50 AI-written emails + AI conversation assistant
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-xs text-blue-900 text-center">
                    No credit card required • AI starts working immediately • Cancel anytime
                  </p>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                {step === 3 ? (
                  <>🚀 Start AI Prospecting</>
                ) : (
                  <>Next <ArrowRight className="h-4 w-4 ml-2" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What to Expect */}
        {step < 3 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>⚡ Setup takes 3 minutes • AI delivers results in 24 hours</p>
          </div>
        )}
      </div>
    </div>
  );
}

