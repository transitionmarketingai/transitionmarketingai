'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CheckCircle, Zap, AlertCircle, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    termsAccepted: false,
    newsletterOptIn: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          businessName: `${formData.firstName} ${formData.lastName}'s Business`,
          contactPerson: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          industry: 'real_estate', // Will be set in onboarding
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }

      // Success - redirect to onboarding
      router.push('/onboarding');
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'Signup failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Logo size="md" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Start Your Free Trial
              </h1>
              <p className="text-xl text-gray-600">
                Join 500+ businesses already generating qualified leads with AI
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={loading}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={loading}
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@company.com" 
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a strong password (min 8 characters)" 
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      minLength={8}
                      required 
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="termsAccepted" 
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: !!checked }))}
                      disabled={loading}
                      required 
                    />
                    <Label htmlFor="termsAccepted" className="text-sm leading-relaxed">
                      I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="newsletterOptIn" 
                      checked={formData.newsletterOptIn}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletterOptIn: !!checked }))}
                      disabled={loading}
                    />
                    <Label htmlFor="newsletterOptIn" className="text-sm leading-relaxed">
                      Send me updates and tips about AI lead generation
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
              </p>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What you get with your free trial:
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">14-Day Free Trial</h3>
                    <p className="text-gray-600">No credit card required, cancel anytime</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">500 AI-Scraped Contacts</h3>
                    <p className="text-gray-600">High-quality prospects in your industry and location</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Automated Outreach</h3>
                    <p className="text-gray-600">WhatsApp and Email campaigns that work 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-Time Dashboard</h3>
                    <p className="text-gray-600">Track leads, campaigns, and ROI in one place</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Lead Scoring</h3>
                    <p className="text-gray-600">Focus on the highest-quality prospects first</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">₹5,000 Ad Credits</h3>
                    <p className="text-gray-600">Meta and Google Ads integration included</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Ready to get started?</h3>
              <p className="text-blue-100 mb-4">
                Join thousands of businesses already using AI to generate qualified leads
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" />
                <span>Setup takes less than 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
