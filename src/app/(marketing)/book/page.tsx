'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, ArrowRight, Calendar, Shield } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { getStoredUTMParams, trackEvent } from '@/lib/tracking';

interface BookingData {
  fullName: string;
  businessName: string;
  industry: string;
  budgetRange: string;
  whatsapp: string;
  mainGoal: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const INDUSTRIES = [
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'b2b-professional-services', label: 'B2B / Professional Services' },
  { value: 'saas-startups', label: 'SaaS / Startups' },
  { value: 'local-business', label: 'Local Business' },
  { value: 'other', label: 'Other' },
];

const BUDGET_OPTIONS = [
  { value: 'under-30k', label: '< ₹30,000' },
  { value: '30k-75k', label: '₹30,000–₹75,000' },
  { value: '75k-150k', label: '₹75,000–₹150,000' },
  { value: '150k-plus', label: '₹150,000+' },
];

const GOAL_OPTIONS = [
  { value: 'generate-new-leads', label: 'Generate New Leads' },
  { value: 'scale-existing-campaign', label: 'Scale Existing Campaign' },
  { value: 'improve-conversion-rate', label: 'Improve Conversion Rate' },
];

const CALENDLY_URL = 'https://calendly.com/transitionmarketingai-info/30min';

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    businessName: '',
    industry: '',
    budgetRange: '',
    whatsapp: '',
    mainGoal: '',
    ...getStoredUTMParams(),
  });
  const [errors, setErrors] = useState<Partial<BookingData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  // Track when Calendly widget loads (Step 2) - fire book_session_complete
  useEffect(() => {
    if (step === 2) {
      trackEvent('book_session_complete', {
        event_category: 'conversion',
        event_label: 'calendly_widget_loaded',
        industry: bookingData.industry,
        budget_range: bookingData.budgetRange,
        main_goal: bookingData.mainGoal,
      });
    }
  }, [step, bookingData.industry, bookingData.budgetRange, bookingData.mainGoal]);

  const handleChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    
    // Fire book_session_start event when user starts typing
    if (!hasStartedTyping && value) {
      setHasStartedTyping(true);
      trackEvent('book_session_start', {
        event_category: 'conversion',
        event_label: 'booking_form_started',
      });
    }
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingData> = {};

    if (!bookingData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!bookingData.industry) {
      newErrors.industry = 'Please select your industry';
    }
    if (!bookingData.budgetRange) {
      newErrors.budgetRange = 'Please select your monthly ad budget range';
    }
    if (!bookingData.whatsapp) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^[6-9]\d{9}$/.test(bookingData.whatsapp.replace(/[\s-]/g, ''))) {
      newErrors.whatsapp = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!bookingData.mainGoal) {
      newErrors.mainGoal = 'Please select your main goal';
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
      // Store booking data in sessionStorage for Calendly prefill
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

      // Submit to webhook (Airtable/Sheets)
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'booking_form_submit',
              data: {
                full_name: bookingData.fullName,
                business_name: bookingData.businessName || '',
                industry: bookingData.industry,
                budget_range: bookingData.budgetRange,
                whatsapp: `+91${bookingData.whatsapp}`,
                main_goal: bookingData.mainGoal,
                utm_source: bookingData.utm_source || '',
                utm_medium: bookingData.utm_medium || '',
                utm_campaign: bookingData.utm_campaign || '',
                timestamp: new Date().toISOString(),
              },
            }),
          });
        } catch (webhookError) {
          console.error('Webhook error:', webhookError);
          // Continue even if webhook fails
        }
      }

      // Also submit to existing onboarding API for backward compatibility
      try {
        await fetch('/api/onboarding/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: bookingData.fullName,
            email: '', // Will get from Calendly
            phone: `+91${bookingData.whatsapp}`,
            industry: bookingData.industry,
            city: '', // Optional
            avg_customer_value: '',
            current_leads_per_month: '',
            desired_leads_per_month: '',
            comfort_budget_range: bookingData.budgetRange,
            has_sales_team: '',
            score: 50, // Default score
            ...bookingData,
          }),
        });
      } catch (apiError) {
        console.error('API error:', apiError);
        // Continue even if API fails
      }

      // Track form submission
      trackEvent('book_session_form_submitted', {
        event_category: 'conversion',
        event_label: 'qualification_form_complete',
        industry: bookingData.industry,
        budget_range: bookingData.budgetRange,
        main_goal: bookingData.mainGoal,
      });

      // Move to Step 2 (Calendly)
      setStep(2);
    } catch (error) {
      console.error('Error submitting booking form:', error);
      // Still move to Step 2 even if submission fails
      setStep(2);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Calendly booking completion
  const handleCalendlyEventScheduled = () => {
    trackEvent('book_session_calendly_booked', {
      event_category: 'conversion',
      event_label: 'consultation_scheduled',
      industry: bookingData.industry,
      budget_range: bookingData.budgetRange,
      main_goal: bookingData.mainGoal,
    });

    // Redirect to thank-you page after a delay
    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 2000);
  };

  // Build Calendly URL with prefill parameters
  const getCalendlyUrl = () => {
    const url = new URL(CALENDLY_URL);
    if (bookingData.fullName) {
      url.searchParams.set('name', bookingData.fullName);
    }
    if (bookingData.whatsapp) {
      url.searchParams.set('a1', `+91${bookingData.whatsapp}`);
    }
    if (bookingData.businessName) {
      url.searchParams.set('a2', bookingData.businessName);
    }
    return url.toString();
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
        <div className="max-w-2xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              Book Your Free Strategy Session
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              Takes 30 Seconds
            </p>
          </div>

          {/* Progress Bar - Step 1 of 2 → Step 2 of 2 */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
                </div>
                <span className="font-medium text-sm">Step {step} of 2</span>
              </div>
            </div>
          </div>

          {/* Step 1: Qualification Form */}
          {step === 1 && (
            <Card className="border-2 border-slate-200 shadow-xl">
              <CardContent className="p-6 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-base font-semibold mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={bookingData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className={errors.fullName ? 'border-red-500' : ''}
                      required
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Business / Brand Name */}
                  <div>
                    <Label htmlFor="businessName" className="text-base font-semibold mb-2 block">
                      Business / Brand Name <span className="text-slate-400 text-sm font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="ABC Enterprises"
                      value={bookingData.businessName}
                      onChange={(e) => handleChange('businessName', e.target.value)}
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <Label htmlFor="industry" className="text-base font-semibold mb-2 block">
                      Industry <span className="text-red-500">*</span>
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

                  {/* Monthly Ad Budget Range */}
                  <div>
                    <Label htmlFor="budgetRange" className="text-base font-semibold mb-2 block">
                      Monthly Ad Budget Range <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={bookingData.budgetRange}
                      onValueChange={(value) => handleChange('budgetRange', value)}
                    >
                      <SelectTrigger id="budgetRange" className={errors.budgetRange ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your monthly ad budget range" />
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
                        required
                      />
                    </div>
                    {errors.whatsapp && (
                      <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">
                      We'll send your personalized proposal here
                    </p>
                  </div>

                  {/* Main Goal */}
                  <div>
                    <Label htmlFor="mainGoal" className="text-base font-semibold mb-2 block">
                      Main Goal <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={bookingData.mainGoal}
                      onValueChange={(value) => handleChange('mainGoal', value)}
                    >
                      <SelectTrigger id="mainGoal" className={errors.mainGoal ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your main goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {GOAL_OPTIONS.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.mainGoal && (
                      <p className="text-red-500 text-sm mt-1">{errors.mainGoal}</p>
                    )}
                  </div>

                  {/* Privacy Note */}
                  <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">
                      We'll never share your contact information.
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
                        Book My Free Strategy Call
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
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    Thanks, {bookingData.fullName}!
                  </h2>
                  <p className="text-lg text-slate-700 mb-2">
                    You qualify for our <span className="font-semibold">Verified Leads Launch Program</span>.
                  </p>
                  <p className="text-base text-slate-600">
                    Choose a time below to discuss your custom quote.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 shadow-xl">
                <CardContent className="p-0">
                  <CalendlyEmbed
                    url={getCalendlyUrl()}
                    onEventScheduled={handleCalendlyEventScheduled}
                    height={700}
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
