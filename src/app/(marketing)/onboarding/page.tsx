'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useRouter } from 'next/navigation';
import { getStoredUTMParams, trackOnboardingSubmit } from '@/lib/tracking';

interface QuizData {
  industry: string;
  city: string;
  avgCustomerValue: string;
  currentInquiries: string;
  desiredInquiries: string;
  budgetRange: string;
  hasSalesTeam: string;
  name: string;
  email: string;
  phone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const INDUSTRIES = [
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'healthcare-wellness', label: 'Healthcare & Wellness' },
  { value: 'real-estate-builders', label: 'Real Estate & Builders' },
  { value: 'dealerships-service-centers', label: 'Dealerships & Service Centers' },
  { value: 'retail-local-businesses', label: 'Retail & Local Businesses' },
  { value: 'startups-saas', label: 'Startups & SaaS' },
  { value: 'education-training', label: 'Education & Training Providers' },
  { value: 'home-renovation', label: 'Home & Renovation Services' },
  { value: 'event-media-hospitality', label: 'Event, Media & Hospitality' },
  { value: 'travel-tour', label: 'Travel & Tour Services' },
  { value: 'finance-insurance', label: 'Finance & Insurance Services' },
  { value: 'freelancers-creators', label: 'Freelancers & Creators' },
  { value: 'logistics-b2b', label: 'Logistics & B2B Service Providers' },
];

const CUSTOMER_VALUE_OPTIONS = [
  { value: 'under-10k', label: 'Under ₹10,000' },
  { value: '10k-50k', label: '₹10,000 - ₹50,000' },
  { value: '50k-1l', label: '₹50,000 - ₹1 Lakh' },
  { value: '1l-5l', label: '₹1 Lakh - ₹5 Lakhs' },
  { value: 'over-5l', label: 'Over ₹5 Lakhs' },
];

const INQUIRY_OPTIONS = [
  { value: '0-5', label: '0-5 inquiries' },
  { value: '5-15', label: '5-15 inquiries' },
  { value: '15-30', label: '15-30 inquiries' },
  { value: '30-50', label: '30-50 inquiries' },
  { value: '50+', label: '50+ inquiries' },
];

const DESIRED_INQUIRY_OPTIONS = [
  { value: '30-50', label: '30-50 inquiries' },
  { value: '50-100', label: '50-100 inquiries' },
  { value: '100-200', label: '100-200 inquiries' },
  { value: '200+', label: '200+ inquiries' },
];

const BUDGET_OPTIONS = [
  { value: 'under-25k', label: 'Under ₹25,000' },
  { value: '25k-40k', label: '₹25,000 - ₹40,000' },
  { value: '40k-60k', label: '₹40,000 - ₹60,000' },
  { value: '60k-100k', label: '₹60,000 - ₹1 Lakh' },
  { value: 'over-100k', label: 'Over ₹1 Lakh' },
];

const TIER1_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
];

// Lead Scoring Logic
function calculateScore(data: QuizData): number {
  let score = 0;

  // High-ticket industries: +20
  const highTicketIndustries = [
    'real-estate-builders',
    'healthcare-wellness',
    'finance-insurance',
    'logistics-b2b',
    'startups-saas',
  ];
  if (highTicketIndustries.includes(data.industry)) {
    score += 20;
  }

  // Customer value: +10 to +30
  const valueScores: Record<string, number> = {
    'under-10k': 0,
    '10k-50k': 10,
    '50k-1l': 15,
    '1l-5l': 25,
    'over-5l': 30,
  };
  score += valueScores[data.avgCustomerValue] || 0;

  // Budget: +10 to +30
  const budgetScores: Record<string, number> = {
    'under-25k': 10,
    '25k-40k': 15,
    '40k-60k': 20,
    '60k-100k': 25,
    'over-100k': 30,
  };
  score += budgetScores[data.budgetRange] || 0;

  // Sales team: +15 (Yes), 0 (No)
  if (data.hasSalesTeam === 'yes') {
    score += 15;
  }

  // Current inquiries > 10: +10
  const currentNum = parseInt(data.currentInquiries.split('-')[0] || '0');
  if (currentNum > 10 || data.currentInquiries === '50+') {
    score += 10;
  }

  // Desired leads > 50: +10
  const desiredNum = parseInt(data.desiredInquiries.split('-')[0] || '0');
  if (desiredNum > 50 || data.desiredInquiries === '200+') {
    score += 10;
  }

  // Tier-1 cities: +10
  if (TIER1_CITIES.some(city => data.city.toLowerCase().includes(city.toLowerCase()))) {
    score += 10;
  }

  return Math.min(score, 100); // Cap at 100
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get UTM params from localStorage on mount
  const [utmParams] = useState(() => {
    if (typeof window !== 'undefined') {
      return getStoredUTMParams();
    }
    return {};
  });

  const [quizData, setQuizData] = useState<QuizData>({
    industry: '',
    city: '',
    avgCustomerValue: '',
    currentInquiries: '',
    desiredInquiries: '',
    budgetRange: '',
    hasSalesTeam: '',
    name: '',
    email: '',
    phone: '',
    ...utmParams,
  });

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

  const updateQuizData = (field: keyof QuizData, value: string) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return quizData.industry !== '';
      case 2: return quizData.city.trim() !== '';
      case 3: return quizData.avgCustomerValue !== '';
      case 4: return quizData.currentInquiries !== '';
      case 5: return quizData.desiredInquiries !== '';
      case 6: return quizData.budgetRange !== '';
      case 7: return quizData.hasSalesTeam !== '';
      case 8: return quizData.name.trim() !== '' && quizData.email.trim() !== '' && quizData.phone.trim() !== '';
      default: return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;

    setIsSubmitting(true);

    try {
      // Calculate score
      const score = calculateScore(quizData);

      // Include UTM params in submission
      const submissionData = {
        ...quizData,
        score,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      };

      // Track submission event
      trackOnboardingSubmit({
        industry: quizData.industry,
        score,
        utmSource: utmParams.utm_source,
        utmMedium: utmParams.utm_medium,
        utmCampaign: utmParams.utm_campaign,
      });

      // Store results in backend
      const response = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      // Redirect all users to thank-you page (simplified funnel)
      router.push('/thank-you');
    } catch (error) {
      console.error('Submission error:', error);
      // Still redirect even if storage fails
      const score = calculateScore(quizData);
      // Redirect all users to thank-you page (simplified funnel)
      router.push('/thank-you');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="industry" className="text-lg font-semibold mb-3 block">
                1. What industry are you in?
              </Label>
              <Select value={quizData.industry} onValueChange={(value) => updateQuizData('industry', value)}>
                <SelectTrigger id="industry" className="h-14 text-base">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="city" className="text-lg font-semibold mb-3 block">
                2. Which city is your business located in?
              </Label>
              <Input
                id="city"
                type="text"
                value={quizData.city}
                onChange={(e) => updateQuizData('city', e.target.value)}
                placeholder="Enter your city"
                className="h-14 text-base"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                3. What's your average customer value?
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {CUSTOMER_VALUE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateQuizData('avgCustomerValue', option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      quizData.avgCustomerValue === option.value
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-300 hover:border-blue-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                4. How many inquiries do you currently get per month?
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {INQUIRY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateQuizData('currentInquiries', option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      quizData.currentInquiries === option.value
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-300 hover:border-blue-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                5. How many inquiries do you want per month?
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {DESIRED_INQUIRY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateQuizData('desiredInquiries', option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      quizData.desiredInquiries === option.value
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-300 hover:border-blue-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                6. What's your comfort monthly ad budget?
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {BUDGET_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateQuizData('budgetRange', option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      quizData.budgetRange === option.value
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-300 hover:border-blue-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                7. Do you have a sales team?
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => updateQuizData('hasSalesTeam', 'yes')}
                  className={`p-6 rounded-lg border-2 text-lg font-semibold transition-all ${
                    quizData.hasSalesTeam === 'yes'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-300 hover:border-blue-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateQuizData('hasSalesTeam', 'no')}
                  className={`p-6 rounded-lg border-2 text-lg font-semibold transition-all ${
                    quizData.hasSalesTeam === 'no'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-300 hover:border-blue-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-lg font-semibold mb-3 block">
                8. Your contact information
              </Label>
              <div className="space-y-4">
                <Input
                  id="name"
                  type="text"
                  value={quizData.name}
                  onChange={(e) => updateQuizData('name', e.target.value)}
                  placeholder="Full Name"
                  className="h-14 text-base"
                  required
                />
                <Input
                  id="email"
                  type="email"
                  value={quizData.email}
                  onChange={(e) => updateQuizData('email', e.target.value)}
                  placeholder="Email Address"
                  className="h-14 text-base"
                  required
                />
                <Input
                  id="phone"
                  type="tel"
                  value={quizData.phone}
                  onChange={(e) => updateQuizData('phone', e.target.value)}
                  placeholder="Phone Number"
                  className="h-14 text-base"
                  required
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" href="/" />
            <Link href="/" className="text-slate-600 hover:text-slate-900">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              See If You Qualify
            </h1>
            <p className="text-xl text-slate-600">
              Takes 30 seconds. Helps us calculate your estimated inquiries & investment.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Quiz Card */}
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type="submit"
                      disabled={!canProceed()}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!canProceed() || isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      {isSubmitting ? 'Submitting...' : 'See My Results'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

