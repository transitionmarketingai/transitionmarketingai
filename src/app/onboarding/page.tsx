'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, Building2, Target, Bell, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Business Info
    businessName: '',
    industry: '',
    contactEmail: '',
    contactPhone: '',
    
    // Step 2: Target & Goals
    targetIndustry: '',
    targetLocation: '',
    leadGoal: '',
    
    // Step 3: Lead Gen Preferences
    leadGenMethods: [] as string[],
    
    // Step 4: Notifications
    emailNotifications: true,
    whatsappNotifications: true,
  });

  const progress = (step / 4) * 100;

  const handleNext = () => {
    // Validation
    if (step === 1) {
      if (!formData.businessName || !formData.industry || !formData.contactEmail) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    if (step === 2) {
      if (!formData.targetIndustry || !formData.targetLocation) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    if (step === 3) {
      if (formData.leadGenMethods.length === 0) {
        toast.error('Please select at least one lead generation method');
        return;
      }
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    toast.success('Welcome to your dashboard! 🎉');
    // Save to localStorage for demo
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('user_data', JSON.stringify(formData));
    router.push('/dashboard');
  };

  const toggleLeadGenMethod = (method: string) => {
    if (formData.leadGenMethods.includes(method)) {
      setFormData({
        ...formData,
        leadGenMethods: formData.leadGenMethods.filter(m => m !== method),
      });
    } else {
      setFormData({
        ...formData,
        leadGenMethods: [...formData.leadGenMethods, method],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome! Let's Get You Set Up</h1>
          <p className="text-gray-600">Just a few quick questions to personalize your experience</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {step} of 4</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && <><Building2 className="h-6 w-6 text-blue-600" /> Your Business</>}
              {step === 2 && <><Target className="h-6 w-6 text-green-600" /> Target & Goals</>}
              {step === 3 && <><Sparkles className="h-6 w-6 text-purple-600" /> Lead Generation</>}
              {step === 4 && <><Bell className="h-6 w-6 text-orange-600" /> Notifications</>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Business Info */}
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
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
                    placeholder="e.g., Software, E-commerce, Healthcare"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone</Label>
                    <Input
                      id="contactPhone"
                      placeholder="+91 98765 43210"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Target & Goals */}
            {step === 2 && (
              <>
                <div>
                  <Label htmlFor="targetIndustry">Who are your ideal customers? *</Label>
                  <Input
                    id="targetIndustry"
                    placeholder="e.g., Software Companies, E-commerce Businesses"
                    value={formData.targetIndustry}
                    onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="targetLocation">Target Location *</Label>
                  <Input
                    id="targetLocation"
                    placeholder="e.g., Mumbai, Bangalore, Delhi NCR, Pan India"
                    value={formData.targetLocation}
                    onChange={(e) => setFormData({ ...formData, targetLocation: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="leadGoal">Monthly Lead Goal</Label>
                  <select
                    id="leadGoal"
                    className="w-full border rounded-md p-2"
                    value={formData.leadGoal}
                    onChange={(e) => setFormData({ ...formData, leadGoal: e.target.value })}
                  >
                    <option value="">Select goal</option>
                    <option value="10-25">10-25 leads</option>
                    <option value="25-50">25-50 leads</option>
                    <option value="50-100">50-100 leads</option>
                    <option value="100+">100+ leads</option>
                  </select>
                </div>
              </>
            )}

            {/* Step 3: Lead Gen Methods */}
            {step === 3 && (
              <>
                <p className="text-sm text-gray-600 mb-2">Select how you want to generate leads:</p>
                <div className="space-y-3">
                  {[
                    { id: 'ai_search', name: 'AI Search', desc: 'Find leads using AI from Google Maps, LinkedIn' },
                    { id: 'facebook', name: 'Facebook Ads', desc: 'Run lead generation campaigns on Facebook' },
                    { id: 'instagram', name: 'Instagram Ads', desc: 'Capture leads from Instagram Stories & Feed' },
                    { id: 'google', name: 'Google Ads', desc: 'Get leads from Google Search' },
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => toggleLeadGenMethod(method.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.leadGenMethods.includes(method.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.desc}</div>
                        </div>
                        {formData.leadGenMethods.includes(method.id) && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 4: Notifications */}
            {step === 4 && (
              <>
                <p className="text-sm text-gray-600 mb-4">Choose how you want to be notified about new leads:</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <div>
                      <div className="font-semibold">Email Notifications</div>
                      <div className="text-sm text-gray-600">Get lead alerts via email</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-4">
                    <div>
                      <div className="font-semibold">WhatsApp Notifications</div>
                      <div className="text-sm text-gray-600">Instant alerts on WhatsApp</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.whatsappNotifications}
                      onChange={(e) => setFormData({ ...formData, whatsappNotifications: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                  <p className="font-semibold text-green-900 mb-2">🎉 You're All Set!</p>
                  <p className="text-sm text-green-700">
                    Your dashboard will be ready with sample campaigns and demo leads to explore all features.
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
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {step === 4 ? (
                  <>Complete Setup</>
                ) : (
                  <>Next <ArrowRight className="h-4 w-4 ml-2" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

