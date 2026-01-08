'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Building, 
  ArrowRight,
  Star,
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const features = [
  {
    icon: Zap,
    title: '5 AI Agents',
    description: 'Content, Ads, Email, SEO, and Analytics agents working 24/7'
  },
  {
    icon: TrendingUp,
    title: '4.2x Average ROAS',
    description: 'Proven results with our AI-powered marketing optimization'
  },
  {
    icon: Users,
    title: '50+ Integrations',
    description: 'Connect with your existing marketing tools and platforms'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
    content: 'TransitionMarketingAI has revolutionized our marketing. ROI increased by 340% in just 3 months.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'CEO',
    company: 'ScaleUp Inc.',
    content: 'The AI agents work around the clock. Our marketing team is now 5x more productive.',
    rating: 5
  }
];

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    plan: 'growth',
    agreeToTerms: false,
    subscribeToNewsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, redirect to login with success message
      router.push('/login?message=Account created successfully! Please sign in.');
    }, 2000);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 2) return 'text-red-500';
    if (strength <= 3) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Start Your Free Trial</h1>
                  <p className="text-muted-foreground">
                    Join thousands of businesses already using AI to transform their marketing.
                  </p>
                </div>

                <Card>
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">Create Your Account</CardTitle>
                    <CardDescription>
                      Get started with a 14-day free trial. No credit card required.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                              required
                            />
                          </div>
                          {errors.firstName && (
                            <p className="text-sm text-red-500">{errors.firstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                              required
                            />
                          </div>
                          {errors.lastName && (
                            <p className="text-sm text-red-500">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                            required
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      {/* Company */}
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="company"
                            type="text"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className={`pl-10 ${errors.company ? 'border-red-500' : ''}`}
                            required
                          />
                        </div>
                        {errors.company && (
                          <p className="text-sm text-red-500">{errors.company}</p>
                        )}
                      </div>

                      {/* Plan Selection */}
                      <div className="space-y-3">
                        <Label>Choose Your Plan</Label>
                        <Tabs value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="starter">Starter</TabsTrigger>
                            <TabsTrigger value="growth">Growth</TabsTrigger>
                            <TabsTrigger value="scale">Scale</TabsTrigger>
                          </TabsList>
                          <TabsContent value="starter" className="p-4 border rounded-lg">
                            <div className="text-center">
                              <div className="text-2xl font-bold">$39<span className="text-sm text-muted-foreground">/month</span></div>
                              <p className="text-sm text-muted-foreground">Perfect for small businesses</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="growth" className="p-4 border rounded-lg">
                            <div className="text-center">
                              <div className="text-2xl font-bold">$97<span className="text-sm text-muted-foreground">/month</span></div>
                              <p className="text-sm text-muted-foreground">Ideal for growing businesses</p>
                              <Badge className="mt-2">Most Popular</Badge>
                            </div>
                          </TabsContent>
                          <TabsContent value="scale" className="p-4 border rounded-lg">
                            <div className="text-center">
                              <div className="text-2xl font-bold">$199<span className="text-sm text-muted-foreground">/month</span></div>
                              <p className="text-sm text-muted-foreground">For high-volume businesses</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                          </button>
                        </div>
                        {formData.password && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Password strength:</span>
                              <span className={getPasswordStrengthColor(passwordStrength(formData.password))}>
                                {getPasswordStrengthText(passwordStrength(formData.password))}
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`h-1 flex-1 rounded ${
                                    level <= passwordStrength(formData.password)
                                      ? getPasswordStrengthColor(passwordStrength(formData.password)).replace('text-', 'bg-')
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {errors.password && (
                          <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="agreeToTerms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the{' '}
                              <Link href="/terms" className="text-primary hover:underline">
                                Terms of Service
                              </Link>{' '}
                              and{' '}
                              <Link href="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                              </Link>
                            </label>
                          </div>
                        </div>
                        {errors.agreeToTerms && (
                          <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                        )}

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="subscribeToNewsletter"
                            checked={formData.subscribeToNewsletter}
                            onCheckedChange={(checked) => handleInputChange('subscribeToNewsletter', checked)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="subscribeToNewsletter"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Subscribe to our newsletter for marketing tips and updates
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Start Free Trial
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:underline">
                          Sign in
                        </Link>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">Why Choose TransitionMarketingAI?</h2>
                  <p className="text-muted-foreground">
                    Join thousands of businesses already using AI to automate and optimize their marketing.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-6 mb-8">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Testimonials */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-center mb-4">What Our Customers Say</h3>
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 italic">"{testimonial.content}"</p>
                      <div className="text-sm">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      <span>SOC 2 Compliant</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>14-day Free Trial</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}