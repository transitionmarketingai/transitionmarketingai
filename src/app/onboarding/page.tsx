'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Target, 
  MapPin, 
  Building, 
  Users, 
  MessageSquare, 
  Settings,
  Zap,
  Bot,
  Search,
  Send,
  BarChart3,
  Mail,
  Phone,
  Globe,
  Calendar,
  DollarSign
} from 'lucide-react';
import Logo from '@/components/Logo';

interface OnboardingData {
  businessName: string;
  industry: string;
  location: string;
  businessSize: string;
  targetAudience: string;
  monthlyBudget: string;
  goals: string[];
  contactMethods: string[];
  adAccounts: {
    facebook: boolean;
    google: boolean;
  };
}

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    businessName: '',
    industry: '',
    location: '',
    businessSize: '',
    targetAudience: '',
    monthlyBudget: '',
    goals: [],
    contactMethods: [],
    adAccounts: {
      facebook: false,
      google: false
    }
  });

  const totalSteps = 5;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // Save onboarding data and redirect to dashboard
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_data', JSON.stringify(data));
    window.location.href = '/dashboard';
  };

  const industries = [
    'Real Estate', 'Healthcare', 'Consulting', 'Manufacturing', 'E-commerce',
    'Technology', 'Education', 'Finance', 'Legal', 'Marketing', 'Other'
  ];

  const businessSizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', '201-1000 employees', '1000+ employees'
  ];

  const budgetRanges = [
    '₹5,000 - ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000+'
  ];

  const goals = [
    'Generate more qualified leads',
    'Increase sales conversion',
    'Automate outreach campaigns',
    'Improve lead quality',
    'Reduce manual work',
    'Scale business growth'
  ];

  const contactMethods = [
    'WhatsApp', 'Email', 'Phone calls', 'SMS', 'LinkedIn messages'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Transition Marketing AI! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Let's set up your AI-powered lead generation system in just 5 minutes
          </p>
        </div>

        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto border border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">Tell us about your business</CardTitle>
              <p className="text-gray-600">This helps us customize your AI lead generation</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={data.businessName}
                  onChange={(e) => updateData('businessName', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={data.industry} onValueChange={(value) => updateData('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Primary Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  value={data.location}
                  onChange={(e) => updateData('location', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="businessSize">Business Size *</Label>
                <Select value={data.businessSize} onValueChange={(value) => updateData('businessSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business size" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessSizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  placeholder="Describe your ideal customers (e.g., Small business owners, IT professionals, etc.)"
                  value={data.targetAudience}
                  onChange={(e) => updateData('targetAudience', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Goals & Budget */}
        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto border border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">What are your goals?</CardTitle>
              <p className="text-gray-600">Help us prioritize features for your success</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Select your primary goals:</Label>
                <div className="grid grid-cols-1 gap-3">
                  {goals.map((goal) => (
                    <div key={goal} className="flex items-center space-x-3">
                      <Checkbox
                        id={goal}
                        checked={data.goals.includes(goal)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateData('goals', [...data.goals, goal]);
                          } else {
                            updateData('goals', data.goals.filter(g => g !== goal));
                          }
                        }}
                      />
                      <Label htmlFor={goal} className="text-sm font-normal cursor-pointer">
                        {goal}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="monthlyBudget">Monthly Marketing Budget</Label>
                <Select value={data.monthlyBudget} onValueChange={(value) => updateData('monthlyBudget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((budget) => (
                      <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Contact Preferences */}
        {currentStep === 3 && (
          <Card className="max-w-2xl mx-auto border border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">How do you want to reach prospects?</CardTitle>
              <p className="text-gray-600">Choose your preferred communication channels</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Select contact methods:</Label>
                <div className="grid grid-cols-1 gap-3">
                  {contactMethods.map((method) => (
                    <div key={method} className="flex items-center space-x-3">
                      <Checkbox
                        id={method}
                        checked={data.contactMethods.includes(method)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateData('contactMethods', [...data.contactMethods, method]);
                          } else {
                            updateData('contactMethods', data.contactMethods.filter(m => m !== method));
                          }
                        }}
                      />
                      <Label htmlFor={method} className="text-sm font-normal cursor-pointer">
                        {method}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-gray-700">
                  WhatsApp and Email typically have the highest response rates. 
                  We recommend starting with these channels for best results.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Ad Account Setup */}
        {currentStep === 4 && (
          <Card className="max-w-2xl mx-auto border border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">Connect your ad accounts</CardTitle>
              <p className="text-gray-600">Link your existing ad accounts for seamless lead generation</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="facebook"
                    checked={data.adAccounts.facebook}
                    onCheckedChange={(checked) => updateData('adAccounts', { ...data.adAccounts, facebook: !!checked })}
                  />
                  <div className="flex-1">
                    <Label htmlFor="facebook" className="text-sm font-medium cursor-pointer">
                      Facebook & Instagram Ads
                    </Label>
                    <p className="text-xs text-gray-600">Connect your Meta Business account</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="google"
                    checked={data.adAccounts.google}
                    onCheckedChange={(checked) => updateData('adAccounts', { ...data.adAccounts, google: !!checked })}
                  />
                  <div className="flex-1">
                    <Label htmlFor="google" className="text-sm font-medium cursor-pointer">
                      Google Ads
                    </Label>
                    <p className="text-xs text-gray-600">Connect your Google Ads account</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">✅ Optional Setup</h4>
                <p className="text-sm text-gray-700">
                  Don't worry if you don't have ad accounts yet! You can always connect them later 
                  from your dashboard settings. We'll start with AI web scraping and outreach campaigns.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Review & Complete */}
        {currentStep === 5 && (
          <Card className="max-w-2xl mx-auto border border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">Review your setup</CardTitle>
              <p className="text-gray-600">Everything looks good? Let's get started!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Business:</span>
                  <span className="text-gray-600">{data.businessName}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Industry:</span>
                  <span className="text-gray-600">{data.industry}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Location:</span>
                  <span className="text-gray-600">{data.location}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Goals:</span>
                  <span className="text-gray-600">{data.goals.length} selected</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Contact Methods:</span>
                  <span className="text-gray-600">{data.contactMethods.join(', ')}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">🚀 What happens next?</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span>AI will start scraping prospects in your industry and location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span>Automated outreach campaigns will begin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span>You'll receive qualified leads in your dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span>Track performance and optimize campaigns</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={completeOnboarding}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800"
            >
              Complete Setup
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}