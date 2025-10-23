'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemoMode = searchParams?.get('demo') === 'true';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isDemoMode) {
      // Auto-fill demo credentials
      setEmail('demo@leadgenpro.in');
      setPassword('demo123');
    }
  }, [isDemoMode]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // For demo mode, bypass auth
      if (email === 'demo@leadgenpro.in' || isDemoMode) {
        // Set demo mode in both localStorage and cookie
        localStorage.setItem('demo_mode', 'true');
        document.cookie = 'demo_mode=true; path=/; max-age=86400; SameSite=Lax'; // 24 hours
        
        localStorage.setItem('demo_customer', JSON.stringify({
          id: 'demo-customer-123',
          business_name: 'ABC Real Estate',
          contact_person: 'Demo User',
          industry: 'real_estate',
          current_plan: 'growth'
        }));
        
        // Check if onboarding is complete
        const onboardingCompleted = localStorage.getItem('onboarding_completed');
        if (!onboardingCompleted) {
          localStorage.setItem('onboarding_completed', 'true');
          localStorage.setItem('onboarding_data', JSON.stringify({
            businessName: 'ABC Real Estate',
            industry: 'Real Estate',
            location: 'Mumbai, Maharashtra',
            businessSize: '11-50 employees',
            targetAudience: 'Property buyers and investors',
            monthlyBudget: '₹25,000 - ₹50,000',
            goals: ['Generate more qualified leads', 'Increase sales conversion'],
            contactMethods: ['WhatsApp', 'Email'],
            adAccounts: { facebook: true, google: false }
          }));
        }
        
        setTimeout(() => {
          router.push('/dashboard?demo=true');
        }, 500);
        return;
      }

      // Real authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      // Success - redirect to dashboard
      router.push('/dashboard');

    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  }

  function handleDemoClick() {
    // Set demo mode in both localStorage and cookie
    localStorage.setItem('demo_mode', 'true');
    document.cookie = 'demo_mode=true; path=/; max-age=86400; SameSite=Lax'; // 24 hours
    
    localStorage.setItem('demo_customer', JSON.stringify({
      id: 'demo-customer-123',
      business_name: 'ABC Real Estate',
      contact_person: 'Demo User',
      industry: 'real_estate',
      current_plan: 'growth'
    }));
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_data', JSON.stringify({
      businessName: 'ABC Real Estate',
      industry: 'Real Estate',
      location: 'Mumbai, Maharashtra',
      businessSize: '11-50 employees',
      targetAudience: 'Property buyers and investors',
      monthlyBudget: '₹25,000 - ₹50,000',
      goals: ['Generate more qualified leads', 'Increase sales conversion'],
      contactMethods: ['WhatsApp', 'Email'],
      adAccounts: { facebook: true, google: false }
    }));
    router.push('/dashboard?demo=true');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Logo size="lg" className="mx-auto mb-2" />
          </Link>
          <p className="text-gray-600">Welcome back</p>
        </div>

        {isDemoMode && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <p className="font-semibold text-blue-900">Demo Mode</p>
            </div>
            <p className="text-sm text-blue-800">
              Explore the full platform with sample data. No signup required!
            </p>
          </div>
        )}

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full mt-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                size="lg"
                onClick={handleDemoClick}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Try Demo Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Explore full platform with sample data • No signup required
              </p>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/onboarding" className="text-blue-600 font-semibold hover:underline">
                  Start Free Trial
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

