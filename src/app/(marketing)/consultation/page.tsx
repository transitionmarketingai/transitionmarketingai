'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CheckCircle,
  User,
  Calendar,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Building2,
  Bot,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

export default function ConsultationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    budgetRange: '',
    showRequirements: false,
    requirements: '',
    contactPreference: 'phone',
  });
  
  // Time slots for selection
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    // Mark field as touched
    if (!touched[field]) {
      setTouched(prev => ({ ...prev, [field]: true }));
    }
  };

  const validateField = (field: string, value: any): string | null => {
    switch (field) {
      case 'firstName':
        if (!value || value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return null;
      case 'email':
        if (!value) {
          return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return null;
      case 'company':
        if (!value || value.trim().length < 2) {
          return 'Company name must be at least 2 characters';
        }
        return null;
      case 'preferredDate':
        if (!value) {
          return 'Please select a preferred date';
        }
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          return 'Date cannot be in the past';
        }
        return null;
      case 'preferredTime':
        if (!value) {
          return 'Please select a preferred time';
        }
        return null;
      case 'budgetRange':
        if (!value) {
          return 'Please select your monthly budget';
        }
        return null;
      default:
        return null;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(formData).forEach(field => {
      if (field === 'showRequirements' || field === 'contactPreference') return;
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
        setTouched(prev => ({ ...prev, [field]: true }));
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      firstName: true,
      email: true,
      company: true,
      preferredDate: true,
      preferredTime: true,
      budgetRange: true,
    });
    
    // Validate form
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: '',
          email: formData.email,
          phone: '',
          company: formData.company,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          budgetRange: formData.budgetRange,
          requirements: formData.showRequirements ? formData.requirements : '',
          contactPreference: formData.contactPreference,
          whatsappUpdates: false,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit consultation request');
      }

      setIsSuccess(true);
      toast.success('Consultation request submitted successfully!');
    } catch (error: any) {
      console.error('Consultation request error:', error);
      toast.error(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/">
                <Logo size="md" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Success Message */}
        <section className="py-24 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Booking Confirmed! ✅
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Your <strong>30-minute strategy call</strong> has been scheduled
            </p>
            
            {/* Booking Details */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200 text-left max-w-lg mx-auto">
              <h3 className="font-semibold text-slate-900 mb-4">📅 Your Booking Details</h3>
              <div className="space-y-3 text-slate-700">
                <div>
                  <p className="text-sm text-slate-600">Name</p>
                  <p className="font-semibold">{formData.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-semibold">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Company</p>
                  <p className="font-semibold">{formData.company}</p>
                </div>
                {(formData.preferredDate || formData.preferredTime) && (
                  <div className="pt-3 border-t border-blue-200">
                    <p className="text-sm text-slate-600 mb-1">Scheduled Time</p>
                    <p className="text-base text-blue-600 font-semibold">
                      {formData.preferredDate && new Date(formData.preferredDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      {formData.preferredDate && formData.preferredTime ? ' at ' : ''}
                      {formData.preferredTime && (() => {
                        const [hours, minutes] = formData.preferredTime.split(':');
                        const date = new Date();
                        date.setHours(parseInt(hours), parseInt(minutes));
                        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      })()}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">30-minute strategy call</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Email Confirmation */}
            <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-200 max-w-lg mx-auto">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-slate-900 mb-1">Confirmation Email Sent</p>
                  <p className="text-sm text-slate-600">Check your inbox ({formData.email}) for booking confirmation and calendar invite.</p>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200 text-left max-w-lg mx-auto">
              <h3 className="font-semibold text-slate-900 mb-3">📞 What Happens Next?</h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-lg">1.</span>
                  <span>You'll receive a confirmation email with call details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-lg">2.</span>
                  <span>We'll call you at the scheduled time for your <strong>30-minute strategy call</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold text-lg">3.</span>
                  <span>After the call, you'll receive a custom plan proposal with pricing</span>
                </li>
              </ul>
            </div>

            {/* Contact Options */}
            <div className="space-y-4 max-w-lg mx-auto mb-8">
              {/* WhatsApp Button */}
              <Button 
                size="lg" 
                className="w-full bg-green-600 hover:bg-green-700 text-white" 
                asChild
              >
                <a 
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918888888888'}?text=Hi, I just booked a consultation. Name: ${formData.firstName}, Company: ${formData.company}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat with Us on WhatsApp
                </a>
              </Button>

              {/* Phone Number */}
              <div className="text-center">
                <p className="text-sm text-slate-600 mb-2">Or call us directly:</p>
                <a 
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+918888888888'}`}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 88888 88888'}
                </a>
              </div>
            </div>

            <Button size="lg" variant="outline" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/">
                Back to Homepage
              </Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <Badge variant="outline" className="border-green-600 text-green-700 bg-green-50">
              🇮🇳 India
            </Badge>
          </div>
        </div>
      </nav>

      {/* Form Section - Above the fold */}
      <section className="py-8 px-4 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-3xl mx-auto">
          {/* Compact Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Book Your Free 30-Min Strategy Call
            </h1>
            <p className="text-slate-600">
              Discuss your lead generation needs and get a custom plan
            </p>
          </div>

          {/* Form */}
          <Card className="border border-slate-200 shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <Label htmlFor="firstName" className="text-slate-700">
                          Your Name <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            onBlur={() => {
                              const error = validateField('firstName', formData.firstName);
                              if (error) {
                                setErrors(prev => ({ ...prev, firstName: error }));
                              }
                            }}
                            className={`pl-10 ${touched.firstName && errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Enter your full name"
                          />
                        </div>
                        {touched.firstName && errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email" className="text-slate-700">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onBlur={() => {
                              const error = validateField('email', formData.email);
                              if (error) {
                                setErrors(prev => ({ ...prev, email: error }));
                              }
                            }}
                            className={`pl-10 ${touched.email && errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="your.email@company.com"
                          />
                        </div>
                        {touched.email && errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                {/* Company */}
                <div>
                  <Label htmlFor="company" className="text-slate-700">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                        <div className="relative mt-1">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="company"
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            onBlur={(e) => {
                              const value = e.target.value.trim();
                              if (value && value.length < 2) {
                                toast.error('Company name must be at least 2 characters');
                              }
                            }}
                            className="pl-10"
                            placeholder="Your company name"
                            minLength={2}
                            maxLength={200}
                          />
                        </div>
                </div>

                {/* Budget Range - Required */}
                <div>
                  <Label htmlFor="budgetRange" className="text-slate-700">
                    Monthly Budget <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) => handleInputChange('budgetRange', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your monthly budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10000-25000">₹10,000 - ₹25,000/month</SelectItem>
                      <SelectItem value="25000-50000">₹25,000 - ₹50,000/month</SelectItem>
                      <SelectItem value="50000-100000">₹50,000 - ₹1,00,000/month</SelectItem>
                      <SelectItem value="100000+">₹1,00,000+/month</SelectItem>
                      <SelectItem value="custom">Custom budget</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500 mt-1">
                    💡 Higher plans = Lower cost per lead. We'll show you options during the call.
                  </p>
                </div>

                {/* Date & Time - Required */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredDate" className="text-slate-700">
                      Preferred Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="preferredDate"
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="pl-10"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="preferredTime" className="text-slate-700">
                      Preferred Time <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) => handleInputChange('preferredTime', value)}
                        required
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {(() => {
                                const [hours, minutes] = time.split(':');
                                const date = new Date();
                                date.setHours(parseInt(hours), parseInt(minutes));
                                return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                              })()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Optional Requirements */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="showRequirements"
                      checked={formData.showRequirements}
                      onChange={(e) => handleInputChange('showRequirements', e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="showRequirements" className="text-slate-700 cursor-pointer">
                      Tell us about your specific requirements (optional)
                    </Label>
                  </div>
                  {formData.showRequirements && (
                    <Textarea
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      placeholder="e.g., Target industry, geographic area, lead volume needed, specific criteria..."
                      rows={3}
                      className="mt-2"
                    />
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      <Phone className="mr-2 h-5 w-5" />
                      Confirm Booking
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-slate-500 mt-4">
                  This is a <strong>30-minute strategy call</strong>. By submitting, you agree to our{' '}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section - Below the fold */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-slate-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">100% Free</h3>
                <p className="text-sm text-slate-600">No cost, no commitment required</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">30 Minutes</h3>
                <p className="text-sm text-slate-600">Quick strategy call to discuss your needs</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-200">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Custom Plan</h3>
                <p className="text-sm text-slate-600">Personalized proposal with pricing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

