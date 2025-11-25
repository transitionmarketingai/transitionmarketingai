'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, ArrowRight, Shield, Calendar, Lock } from 'lucide-react';
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
  // Conditional fields
  serviceType?: string;
  courseProgram?: string;
  studentAgeGrade?: string;
  serviceCategory?: string;
  teamSize?: string;
  currentToolChallenge?: string;
  propertyType?: string;
  timeline?: string;
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
  { value: 'generate-new-inquiries', label: 'Generate New Verified Inquiries' },
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
  const [isCalendlyBooked, setIsCalendlyBooked] = useState(false);

  // Track when user starts typing (first keystroke)
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

  // Track when Calendly widget loads (Step 2) - fire book_session_complete
  useEffect(() => {
    if (step === 2 && !isCalendlyBooked) {
      trackEvent('book_session_complete', {
        event_category: 'conversion',
        event_label: 'calendly_widget_loaded',
        industry: bookingData.industry,
        budget_range: bookingData.budgetRange,
        main_goal: bookingData.mainGoal,
      });
    }
  }, [step, bookingData.industry, bookingData.budgetRange, bookingData.mainGoal, isCalendlyBooked]);

  // Initialize reveal-on-scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [step]);

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingData> = {};

    if (!bookingData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!bookingData.industry) {
      newErrors.industry = 'Please select your industry';
    }
    // Budget range only required for Real Estate, B2B, SaaS
    if ((bookingData.industry === 'real-estate' || 
         bookingData.industry === 'b2b-professional-services' || 
         bookingData.industry === 'saas-startups') && 
        !bookingData.budgetRange) {
      newErrors.budgetRange = 'Please select your budget range';
    }
    if (!bookingData.whatsapp) {
      newErrors.whatsapp = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(bookingData.whatsapp.replace(/[\s-]/g, ''))) {
      newErrors.whatsapp = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!bookingData.mainGoal || !bookingData.mainGoal.trim()) {
      newErrors.mainGoal = 'Please tell us what you hope to achieve';
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

      // Fire book_session_start and book_session_submit events
      trackEvent('book_session_start', {
        event_category: 'conversion',
        event_label: 'booking_form_started',
      });
      
      trackEvent('book_session_submit', {
        event_category: 'conversion',
        event_label: 'qualification_form_submitted',
        industry: bookingData.industry,
        budget_range: bookingData.budgetRange,
        main_goal: bookingData.mainGoal,
      });

      // Get referrer for tracking
      const referrer = typeof window !== 'undefined' ? document.referrer : '';

      // Simple Airtable submission with UTM tracking
      try {
        // Get UTM values from localStorage
        const utm = {
          source: typeof window !== 'undefined' ? localStorage.getItem('utm_source') : null,
          medium: typeof window !== 'undefined' ? localStorage.getItem('utm_medium') : null,
          campaign: typeof window !== 'undefined' ? localStorage.getItem('utm_campaign') : null,
          term: typeof window !== 'undefined' ? localStorage.getItem('utm_term') : null,
          content: typeof window !== 'undefined' ? localStorage.getItem('utm_content') : null,
        };

        const airtableResponse = await fetch('/api/airtable-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: bookingData.fullName,
            phone: `+91${bookingData.whatsapp}`,
            industry: bookingData.industry,
            revenue_range: bookingData.budgetRange,
            inquiry_volume: bookingData.mainGoal,
            utm: utm,
          }),
        });

        if (airtableResponse.ok) {
          const result = await airtableResponse.json();
          console.log('✅ Submitted to Airtable:', result.record_id);
        } else {
          console.error('⚠️ Airtable submission failed (non-critical)');
        }
      } catch (airtableError) {
        console.error('⚠️ Airtable submission error (non-critical):', airtableError);
        // Continue even if Airtable fails - don't block user flow
      }

      // PRIMARY SUBMISSION: Write to Airtable (primary ingestion point)
      try {
        const bookingResponse = await fetch('/api/bookings/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: bookingData.fullName,
            phone: `+91${bookingData.whatsapp}`,
            industry: bookingData.industry,
            revenue_range: bookingData.budgetRange,
            inquiry_volume: bookingData.mainGoal,
            business_name: bookingData.businessName || '',
            utm_source: bookingData.utm_source || '',
            utm_medium: bookingData.utm_medium || '',
            utm_campaign: bookingData.utm_campaign || '',
            utm_term: bookingData.utm_term || '',
            utm_content: bookingData.utm_content || '',
            referrer: referrer,
            main_goal: bookingData.mainGoal, // Fallback for inquiry_volume
          }),
        });

        if (bookingResponse.ok) {
          const bookingResult = await bookingResponse.json();
          console.log('✅ PRIMARY: Booking created in Airtable:', bookingResult.airtable_id);
        } else {
          const errorText = await bookingResponse.text();
          console.error('❌ PRIMARY submission failed:', errorText);
          // Don't block form submission - continue to Calendly
        }
      } catch (bookingError) {
        console.error('❌ PRIMARY submission error (continuing to Calendly):', bookingError);
        // Continue even if primary submission fails - don't block user flow
      }

      // Submit to webhook (Airtable/Sheets) if configured - backward compatibility
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          const webhookResponse = await fetch(webhookUrl, {
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
                utm_term: bookingData.utm_term || '',
                utm_content: bookingData.utm_content || '',
                timestamp: new Date().toISOString(),
              },
            }),
          });

          if (webhookResponse.ok) {
            console.log('✅ Legacy webhook submitted successfully');
          }
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
            desired_leads_per_month: bookingData.mainGoal,
            comfort_budget_range: bookingData.budgetRange,
            has_sales_team: '',
            score: 50, // Default score
            utm_source: bookingData.utm_source,
            utm_medium: bookingData.utm_medium,
            utm_campaign: bookingData.utm_campaign,
            utm_term: bookingData.utm_term,
            utm_content: bookingData.utm_content,
            ...bookingData,
          }),
        });
      } catch (apiError) {
        console.error('API error:', apiError);
        // Continue even if API fails
      }

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
  const handleCalendlyEventScheduled = async () => {
    setIsCalendlyBooked(true);
    
    trackEvent('book_session_calendly_booked', {
      event_category: 'conversion',
      event_label: 'consultation_scheduled',
      industry: bookingData.industry,
      budget_range: bookingData.budgetRange,
      main_goal: bookingData.mainGoal,
    });

    // Send WhatsApp confirmation message
    try {
      const whatsappResponse = await fetch('/api/whatsapp-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: bookingData.whatsapp,
          name: bookingData.fullName,
          date_time: 'We\'ll confirm shortly', // Calendly event data could be passed here
          messageType: 'confirmation',
        }),
      });

      if (whatsappResponse.ok) {
        const result = await whatsappResponse.json();
        if (result.success) {
          trackEvent('lead_confirmation_sent', {
            event_category: 'whatsapp',
            event_label: 'confirmation_message_sent',
            phone_number: bookingData.whatsapp,
          });
          console.log('✅ WhatsApp confirmation sent');
        }
      } else {
        console.error('Failed to send WhatsApp confirmation:', await whatsappResponse.text());
      }
    } catch (error) {
      console.error('Error sending WhatsApp confirmation:', error);
      // Don't block the UI if WhatsApp fails
    }

    // Send email confirmation (if email is available from Calendly)
    // Note: Calendly doesn't provide email in the event, so we'll need to get it from the form or Calendly webhook
    // For now, we'll skip email if not available
    // In production, you'd want to capture email in the form or use Calendly webhooks
    const emailFromCalendly = null; // This would come from Calendly webhook in production
    
    if (emailFromCalendly) {
      try {
        const emailResponse = await fetch('/api/email-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: bookingData.fullName,
            email: emailFromCalendly,
            date_time: 'We\'ll confirm shortly',
            calendly_link: CALENDLY_URL,
            phone: bookingData.whatsapp,
            industry: bookingData.industry,
          }),
        });

        if (emailResponse.ok) {
          const result = await emailResponse.json();
          if (result.success) {
            trackEvent('email_confirmation_sent', {
              event_category: 'email',
              event_label: 'confirmation_email_sent',
              email: emailFromCalendly,
            });
            console.log('✅ Email confirmation sent');
          }
        } else {
          console.error('Failed to send email confirmation:', await emailResponse.text());
        }
      } catch (error) {
        console.error('Error sending email confirmation:', error);
        // Don't block the UI if email fails
      }
    }
  };

  // Build Calendly URL with prefill parameters
  const getCalendlyUrl = () => {
    const url = new URL(CALENDLY_URL);
    if (bookingData.fullName) {
      url.searchParams.set('name', bookingData.fullName);
    }
    if (bookingData.whatsapp) {
      // Calendly custom field for phone (a1 = custom field 1)
      url.searchParams.set('a1', `+91${bookingData.whatsapp}`);
    }
    if (bookingData.businessName) {
      // Calendly custom field for business name (a2 = custom field 2)
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
          {/* Hero Section */}
          {step === 1 && (
            <div className="text-center mb-10 reveal-on-scroll">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Book Your Free Strategy Session
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-2 leading-relaxed">
                Answer a few quick questions so we can understand your business and estimate how many verified inquiries we can deliver for you.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Takes less than 30 seconds.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-2 mb-8 text-sm font-medium text-slate-700">
                <span>🛡️ 100% Data Verified</span>
                <span className="text-slate-400">•</span>
                <span>Ad Spend Included</span>
                <span className="text-slate-400">•</span>
                <span>Exclusive Inquiries</span>
              </div>
            </div>
          )}

          {/* Progress Bar - Step 1 of 2 → Step 2 of 2 */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-500'}`}>
                  {step > 1 ? <CheckCircle className="h-3 w-3" /> : '1'}
                </div>
              </div>
              <span className="text-slate-400 mx-1">→</span>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-500'}`}>
                  {step > 2 ? <CheckCircle className="h-3 w-3" /> : '2'}
                </div>
              </div>
              <span className="ml-2 text-sm font-medium text-slate-600">Step {step} of 2</span>
            </div>
          </div>

          {/* Step 1: Qualification Form */}
          {step === 1 && (
            <Card className="border-2 border-slate-200 shadow-xl reveal-on-scroll">
              <CardContent className="p-6 md:p-10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Step 1 of 2: Tell Us About Your Business
                  </h2>
                  <p className="text-slate-600">
                    Answer a few quick questions so we can understand your business and estimate how many verified inquiries we can deliver for you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-base font-semibold mb-2 block">
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Shah"
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
                      Your Business / Company Name <span className="text-slate-400 text-sm font-normal">(optional)</span>
                    </Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="ABC Real Estate / XYZ Dental Clinic"
                      value={bookingData.businessName}
                      onChange={(e) => handleChange('businessName', e.target.value)}
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <Label htmlFor="industry" className="text-base font-semibold mb-2 block">
                      Select Your Industry <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={bookingData.industry}
                      onValueChange={(value) => handleChange('industry', value)}
                    >
                      <SelectTrigger id="industry" className={errors.industry ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select Your Industry" />
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

                  {/* Conditional Fields Based on Industry */}
                  {bookingData.industry === 'real-estate' && (
                    <>
                      <div>
                        <Label htmlFor="propertyType" className="text-base font-semibold mb-2 block">
                          Property Type <span className="text-slate-400 text-sm font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="propertyType"
                          type="text"
                          placeholder="Residential / Commercial / Plots"
                          value={bookingData.propertyType || ''}
                          onChange={(e) => handleChange('propertyType', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeline" className="text-base font-semibold mb-2 block">
                          Timeline <span className="text-slate-400 text-sm font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="timeline"
                          type="text"
                          placeholder="When do you need inquiries?"
                          value={bookingData.timeline || ''}
                          onChange={(e) => handleChange('timeline', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {bookingData.industry === 'healthcare' && (
                    <div>
                      <Label htmlFor="serviceType" className="text-base font-semibold mb-2 block">
                        Service Type <span className="text-slate-400 text-sm font-normal">(optional)</span>
                      </Label>
                      <Select
                        value={bookingData.serviceType || ''}
                        onValueChange={(value) => handleChange('serviceType', value)}
                      >
                        <SelectTrigger id="serviceType">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dental">Dental</SelectItem>
                          <SelectItem value="skin">Skin</SelectItem>
                          <SelectItem value="ortho">Ortho</SelectItem>
                          <SelectItem value="general-clinic">General Clinic</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {bookingData.industry === 'education' && (
                    <>
                      <div>
                        <Label htmlFor="courseProgram" className="text-base font-semibold mb-2 block">
                          Course / Program <span className="text-slate-400 text-sm font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="courseProgram"
                          type="text"
                          placeholder="What courses or programs do you offer?"
                          value={bookingData.courseProgram || ''}
                          onChange={(e) => handleChange('courseProgram', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentAgeGrade" className="text-base font-semibold mb-2 block">
                          Student Age / Grade Range <span className="text-slate-400 text-sm font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="studentAgeGrade"
                          type="text"
                          placeholder="e.g., 15-18 years / Class 9-12"
                          value={bookingData.studentAgeGrade || ''}
                          onChange={(e) => handleChange('studentAgeGrade', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {bookingData.industry === 'b2b-professional-services' && (
                    <>
                      <div>
                        <Label htmlFor="serviceCategory" className="text-base font-semibold mb-2 block">
                          Service Category <span className="text-slate-400 text-sm font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="serviceCategory"
                          type="text"
                          placeholder="e.g., Legal / Accounting / Consulting"
                          value={bookingData.serviceCategory || ''}
                          onChange={(e) => handleChange('serviceCategory', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {bookingData.industry === 'saas-startups' && (
                    <>
                      <div>
                        <Label htmlFor="teamSize" className="text-base font-semibold mb-2 block">
                          Team Size <span className="text-slate-400 text-sm font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="teamSize"
                          type="text"
                          placeholder="e.g., 5-10 / 10-50 / 50+"
                          value={bookingData.teamSize || ''}
                          onChange={(e) => handleChange('teamSize', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentToolChallenge" className="text-base font-semibold mb-2 block">
                          Current Tool / Challenge <span className="text-slate-400 text-sm font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="currentToolChallenge"
                          type="text"
                          placeholder="What tool are you replacing or what problem are you solving?"
                          value={bookingData.currentToolChallenge || ''}
                          onChange={(e) => handleChange('currentToolChallenge', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Monthly Ad Budget Range - Conditional for Real Estate, B2B, SaaS */}
                  {(bookingData.industry === 'real-estate' || 
                    bookingData.industry === 'b2b-professional-services' || 
                    bookingData.industry === 'saas-startups') && (
                    <div>
                      <Label htmlFor="budgetRange" className="text-base font-semibold mb-2 block">
                        Budget Range <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={bookingData.budgetRange}
                        onValueChange={(value) => handleChange('budgetRange', value)}
                      >
                        <SelectTrigger id="budgetRange" className={errors.budgetRange ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your budget range" />
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
                  )}

                  {/* WhatsApp Number */}
                  <div>
                    <Label htmlFor="whatsapp" className="text-base font-semibold mb-2 block">
                      Phone Number (WhatsApp preferred) <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium px-3 py-2 border border-slate-300 rounded-l-md bg-slate-50">
                        +91
                      </span>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="98765 43210"
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

                  {/* Primary Goal - Text Field */}
                  <div>
                    <Label htmlFor="mainGoal" className="text-base font-semibold mb-2 block">
                      What are you hoping to achieve with verified inquiries? <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mainGoal"
                      type="text"
                      placeholder="More patient bookings / property buyers / demo calls / admissions"
                      value={bookingData.mainGoal}
                      onChange={(e) => handleChange('mainGoal', e.target.value)}
                      className={errors.mainGoal ? 'border-red-500' : ''}
                      required
                    />
                    {errors.mainGoal && (
                      <p className="text-red-500 text-sm mt-1">{errors.mainGoal}</p>
                    )}
                  </div>

                  {/* Privacy Note */}
                  <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-700">
                      <p className="font-semibold mb-1">We never share or sell your data.</p>
                      <p>Your details are used only to prepare your proposal. Your data stays 100% private.</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#0053FF] hover:bg-[#0046E0] text-white font-semibold text-lg py-6 transition-all"
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
          {step === 2 && !isCalendlyBooked && (
            <div className="space-y-6 reveal-on-scroll">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  Step 2 of 2: Schedule Your Strategy Call.
                </h2>
                <p className="text-lg text-slate-700">
                  You qualify for our Verified Inquiry Launch Program 🎯 Choose a time below — we'll walk you through your custom plan and verified inquiry costs.
                </p>
              </div>

              <Card className="border-2 border-slate-200 shadow-xl">
                <CardContent className="p-0">
                  <CalendlyEmbed
                    url={getCalendlyUrl()}
                    onEventScheduled={handleCalendlyEventScheduled}
                    height={700}
                  />
                </CardContent>
              </Card>

              {/* Notes under widget */}
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 text-center">
                <p className="text-sm text-slate-700 font-medium">
                  📅 Average call 15–20 min <span className="text-slate-400 mx-2">•</span> 💬 See sample verified inquiries <span className="text-slate-400 mx-2">•</span> 🔒 No spam.
                </p>
              </div>

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

          {/* Confirmation Message (after Calendly booking) */}
          {step === 2 && isCalendlyBooked && (
            <Card className="border-2 border-green-200 bg-green-50/50 shadow-xl reveal-on-scroll">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  ✅ Thanks {bookingData.fullName.split(' ')[0]}!
                </h2>
                <p className="text-xl text-slate-700 leading-relaxed">
                  Your consultation is confirmed. We'll prepare your AI Marketing Report and reach out via WhatsApp before the call.
                </p>
                <div className="mt-8 space-y-4">
                  <Button size="lg" className="bg-[#0053FF] hover:bg-[#0046E0] text-white" asChild>
                    <Link href="/">
                      Back to Homepage
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <p className="text-sm text-slate-600">
                    <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
                      ← Back to Homepage
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
