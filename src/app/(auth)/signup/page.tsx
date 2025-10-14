'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { ArrowRight, Building2, User, Mail, Phone, Briefcase } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: 'real_estate',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }

      toast.success('Account created successfully!', {
        description: 'Redirecting to dashboard...',
      });

      // Redirect to onboarding
      setTimeout(() => {
        router.push('/onboarding');
      }, 1000);

    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-3xl">Create Your Account</CardTitle>
          <CardDescription>Start your 14-day free trial - No credit card required</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Business Information
              </h3>
              
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g., ABC Real Estate"
                  required
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(val) => setFormData({ ...formData, industry: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Your Name *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g., Rajesh Kumar"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Create Password</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min. 8 characters"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
              size="lg"
            >
              {loading ? 'Creating Account...' : 'Start Free Trial'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Log in
              </Link>
            </p>

            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


