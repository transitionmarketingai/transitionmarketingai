'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle,
  Phone,
  Mail,
  Building2,
  User,
  MessageCircle,
  Clock,
  Calendar,
  Sparkles,
  Bot,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

export default function ConsultationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    whatsappUpdates: false,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendOTP = async () => {
    if (!formData.phone) {
      toast.error('Please enter your phone number first');
      return;
    }

    setSendingOtp(true);
    try {
      const response = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const result = await response.json();

      if (response.ok) {
        setOtpSent(true);
        toast.success(`OTP sent to ${formData.phone}`);
        if (result.otp) {
          // Development mode - show OTP
          console.log('OTP (dev only):', result.otp);
        }
      } else {
        toast.error(result.error || 'Failed to send OTP');
      }
    } catch (error: any) {
      console.error('OTP send error:', error);
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }

    setVerifyingOtp(true);
    try {
      const response = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp }),
      });

      const result = await response.json();

      if (response.ok && result.verified) {
        setOtpVerified(true);
        toast.success('Phone number verified!');
      } else {
        toast.error(result.error || 'Invalid OTP');
      }
    } catch (error: any) {
      console.error('OTP verify error:', error);
      toast.error('Failed to verify OTP');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpVerified) {
      toast.error('Please verify your phone number first');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: '', // Optional
          email: formData.email,
          phone: formData.phone,
          whatsappUpdates: formData.whatsappUpdates,
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
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Thank You for Your Request! ✅
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              We've received your consultation request. Our team will contact you within 24 hours.
            </p>

            {/* Calendar Booking Section */}
            <div className="bg-blue-50 rounded-lg p-8 mb-8 border border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">📅 Book Your Consultation Now</h3>
              <p className="text-slate-600 mb-6">
                Select your preferred date and time instantly. We'll send you a calendar invite and reminder.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/transition-marketing-ai'} target="_blank">
                  Book Consultation Now
                  <Calendar className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-blue-50 rounded-lg p-8 mb-8 border border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">What Happens Next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Free Consultation Call</p>
                    <p className="text-sm text-slate-600">We'll discuss your business, target audience, and lead generation goals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Custom Proposal</p>
                    <p className="text-sm text-slate-600">We'll create a tailored plan with pricing based on your requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Onboarding & Setup</p>
                    <p className="text-sm text-slate-600">Once approved, we'll send you a secure payment link and set up your account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Start Receiving Leads</p>
                    <p className="text-sm text-slate-600">Access your dashboard and start getting verified, qualified leads</p>
                  </div>
                </div>
              </div>
            </div>
            {formData.whatsappUpdates && (
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span>You'll receive updates via WhatsApp at {formData.phone}</span>
              </div>
            )}
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
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

      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Bot className="h-4 w-4 mr-2" />
            Free Consultation - No Commitment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get Your Custom Lead Generation Plan
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Tell us about your business and we'll create a tailored AI-powered lead generation strategy
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>100% Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>Custom Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>No Obligation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Request Free Consultation</CardTitle>
                  <p className="text-slate-600">Fill out the form below and we'll call you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <Label htmlFor="firstName" className="text-slate-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="pl-10"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-slate-700">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    {/* Phone with OTP Verification */}
                    <div>
                      <Label htmlFor="phone" className="text-slate-700">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="space-y-3 mt-2">
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="pl-10"
                            placeholder="+91 98765 43210"
                            disabled={otpVerified}
                          />
                          {!otpVerified && formData.phone && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleSendOTP}
                              disabled={sendingOtp}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                              {sendingOtp ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                            </Button>
                          )}
                          {otpVerified && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        
                        {otpSent && !otpVerified && (
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Enter 6-digit OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              maxLength={6}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              onClick={handleVerifyOTP}
                              disabled={verifyingOtp || otp.length !== 6}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              {verifyingOtp ? 'Verifying...' : 'Verify'}
                            </Button>
                          </div>
                        )}
                        
                        {otpVerified && (
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            Phone number verified
                          </p>
                        )}
                      </div>
                    </div>

                    {/* WhatsApp Opt-in */}
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <Checkbox
                        id="whatsappUpdates"
                        checked={formData.whatsappUpdates}
                        onCheckedChange={(checked) => handleInputChange('whatsappUpdates', checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="whatsappUpdates"
                          className="text-sm font-medium text-slate-900 cursor-pointer flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4 text-green-600" />
                          Send me updates via WhatsApp
                        </Label>
                        <p className="text-xs text-slate-600 mt-1">
                          Get instant updates about your consultation, proposal, and onboarding on WhatsApp
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar className="mr-2 h-5 w-5" />
                          Request Free Consultation
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-slate-500">
                      By submitting this form, you agree to our{' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-6">
              <Card className="border border-slate-200 bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-lg">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900">Quick Response</p>
                      <p className="text-xs text-slate-600">We'll call you within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900">Custom Strategy</p>
                      <p className="text-xs text-slate-600">Tailored to your business needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900">Flexible Pricing</p>
                      <p className="text-xs text-slate-600">Plans based on your budget</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900">No Commitment</p>
                      <p className="text-xs text-slate-600">Free consultation, no strings attached</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Bot className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">AI-Powered Lead Generation</h3>
                    <p className="text-sm text-slate-600">
                      Our AI works 24/7 to find, qualify, and deliver verified leads directly to your dashboard
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

