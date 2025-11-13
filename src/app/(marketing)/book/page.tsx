'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { getStoredUTMParams, trackEvent } from '@/lib/tracking';

interface BookingData {
  industry: string;
  budgetRange: string;
  goal: string;
  whatsapp: string;
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

const BUDGET_OPTIONS = [
  { value: 'under-25k', label: 'Under ₹25,000/month' },
  { value: '25k-40k', label: '₹25,000 - ₹40,000/month' },
  { value: '40k-60k', label: '₹40,000 - ₹60,000/month' },
  { value: '60k-100k', label: '₹60,000 - ₹1 Lakh/month' },
  { value: 'over-100k', label: 'Over ₹1 Lakh/month' },
];

const GOAL_OPTIONS = [
  { value: '30-50', label: '30-50 verified inquiries per month' },
  { value: '50-100', label: '50-100 verified inquiries per month' },
  { value: '100-200', label: '100-200 verified inquiries per month' },
  { value: '200+', label: '200+ verified inquiries per month' },
  { value: 'custom', label: 'Custom goal (we\'ll discuss)' },
];

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    industry: '',
    budgetRange: '',
    goal: '',
    whatsapp: '',
    ...getStoredUTMParams(),
  });
  const [errors, setErrors] = useState<Partial<BookingData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

  // Track when form opens
  useEffect(() => {
    trackEvent('book_session_start', {
      event_category: 'conversion',
      event_label: 'booking_form_opened',
    });
  }, []);

  // Track when Calendly widget loads (Step 2)
  useEffect(() => {
    if (step === 2) {
      trackEvent('book_session_calendly_loaded', {
        event_category: 'conversion',
        event_label: 'calendly_widget_visible',
      });
    }
  }, [step]);

  const handleChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingData> = {};

    if (!bookingData.industry) {
      newErrors.industry = 'Please select your industry';
    }
    if (!bookingData.budgetRange) {
      newErrors.budgetRange = 'Please select your ad budget range';
    }
    if (!bookingData.goal) {
      newErrors.goal = 'Please select your goal';
    }
    if (!bookingData.whatsapp) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^[6-9]\d{9}$/.test(bookingData.whatsapp.replace(/[\s-]/g, ''))) {
      newErrors.whatsapp = 'Please enter a valid 10-digit Indian mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Store booking data (for later use in Calendly pre-fill if needed)
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

      // Submit to backend (optional - for tracking/notifications)
      const response = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Booking User', // Will get from Calendly
          email: '', // Will get from Calendly
          phone: `+91${bookingData.whatsapp}`,
          industry: bookingData.industry,
          city: '', // Optional
          avg_customer_value: '',
          current_leads_per_month: '',
          desired_leads_per_month: bookingData.goal,
          comfort_budget_range: bookingData.budgetRange,
          has_sales_team: '',
          score: 50, // Default score
          ...bookingData,
        }),
      });

      // Track form submission
      trackEvent('book_session_form_submitted', {
        event_category: 'conversion',
        event_label: 'qualification_form_complete',
        industry: bookingData.industry,
        budget_range: bookingData.budgetRange,
        goal: bookingData.goal,
      });

      // Move to Step 2 (Calendly)
      setStep(2);
    } catch (error) {
      console.error('Error submitting booking form:', error);
      // Still move to Step 2 even if API call fails
      setStep(2);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Calendly booking completion
  const handleCalendlyEventScheduled = () => {
    trackEvent('book_session_complete', {
      event_category: 'conversion',
      event_label: 'consultation_scheduled',
      industry: bookingData.industry,
      budget_range: bookingData.budgetRange,
    });

    // Redirect to thank-you page after a delay
    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200/80 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Logo size="md" href="/" className="hover:opacity-90 transition-opacity" />
            <Link href="/">
              <Button variant="outline" className="text-sm">Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-28 md:pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
                </div>
                <span className="font-medium hidden sm:inline">Qualification</span>
              </div>
              <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {step > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
                </div>
                <span className="font-medium hidden sm:inline">Book Session</span>
              </div>
            </div>
          </div>

          {/* Step 1: Qualification Form */}
          {step === 1 && (
            <Card className="border-2 border-slate-200 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    Book Your Free Strategy Session
                  </h1>
                  <p className="text-lg text-slate-600">
                    Takes 30 seconds. We'll personalize your proposal before the call.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Industry */}
                  <div>
                    <Label htmlFor="industry" className="text-base font-semibold mb-2 block">
                      Your Industry <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={bookingData.industry}
                      onValueChange={(value) => handleChange('industry', value)}
                    >
                      <SelectTrigger id="industry" className={errors.industry ? 'border-red-500' : ''}>
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
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                    )}
                  </div>

                  {/* Budget Range */}
                  <div>
                    <Label htmlFor="budgetRange" className="text-base font-semibold mb-2 block">
                      Monthly Ad Budget Range <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={bookingData.budgetRange}
                      onValueChange={(value) => handleChange('budgetRange', value)}
                    >
                      <SelectTrigger id="budgetRange" className={errors.budgetRange ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your ad budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGET_OPTIONS.map((budget) => (
                          <SelectItem key={budget.value} value={budget.value}>
                            {budget.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budgetRange && (
                      <p className="text-red-500 text-sm mt-1">{errors.budgetRange}</p>
                    )}
                  </div>

                  {/* Goal */}
                  <div>
                    <Label htmlFor="goal" className="text-base font-semibold mb-2 block">
                      Your Goal <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={bookingData.goal}
                      onValueChange={(value) => handleChange('goal', value)}
                    >
                      <SelectTrigger id="goal" className={errors.goal ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {GOAL_OPTIONS.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.goal && (
                      <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
                    )}
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <Label htmlFor="whatsapp" className="text-base font-semibold mb-2 block">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium px-3 py-2 border border-slate-300 rounded-l-md bg-slate-50">
                        +91
                      </span>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="9876543210"
                        value={bookingData.whatsapp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange('whatsapp', value);
                        }}
                        className={`flex-1 rounded-l-none ${errors.whatsapp ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.whatsapp && (
                      <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">
                      We'll send your personalized proposal here
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Processing...'
                    ) : (
                      <>
                        Continue to Calendar
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Calendly Booking */}
          {step === 2 && (
            <div className="space-y-6">
              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Great! Now let's schedule your call
                  </h2>
                  <p className="text-slate-600">
                    Choose a time that works for you. We'll send your personalized proposal before the call.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 shadow-xl">
                <CardContent className="p-0">
                  <CalendlyEmbed
                    url={calendlyUrl}
                    onEventScheduled={handleCalendlyEventScheduled}
                  />
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="text-slate-600"
                >
                  ← Back to Form
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

