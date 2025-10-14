'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Target, IndianRupee, Check, Loader2 } from 'lucide-react';
import type { OnboardingFormData, Industry, SubscriptionPlan } from '@/types/india-leadgen';
import { formatIndianCurrency } from '@/types/india-leadgen';

const TOTAL_STEPS = 6;

const INDUSTRIES: { value: Industry; label: string; icon: string }[] = [
  { value: 'real_estate', label: 'Real Estate', icon: '🏠' },
  { value: 'insurance', label: 'Insurance', icon: '🛡️' },
  { value: 'education', label: 'Education & Coaching', icon: '📚' },
  { value: 'healthcare', label: 'Healthcare & Wellness', icon: '🏥' },
  { value: 'finance', label: 'Finance & Loans', icon: '💰' },
  { value: 'home_services', label: 'Home Services', icon: '🔧' },
  { value: 'automobile', label: 'Automobile', icon: '🚗' },
  { value: 'legal', label: 'Legal Services', icon: '⚖️' },
];

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
  'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad'
];

const INDIAN_STATES = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu',
  'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Madhya Pradesh',
  'Kerala', 'Punjab', 'Haryana', 'Bihar', 'Andhra Pradesh'
];

const SUBSCRIPTION_PLANS: Array<{
  id: SubscriptionPlan;
  name: string;
  price: number;
  leads: number;
  popular?: boolean;
  features: string[];
}> = [
  {
    id: 'starter',
    name: 'Starter',
    price: 799900, // ₹7,999
    leads: 20,
    features: [
      '20 qualified leads/month',
      'Facebook + Google Ads',
      'WhatsApp + Email messaging',
      'Email support',
      'Basic analytics'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 1499900, // ₹14,999
    leads: 50,
    popular: true,
    features: [
      '50 qualified leads/month',
      'All ad platforms',
      'Full messaging suite',
      'Phone + WhatsApp support',
      'Advanced analytics',
      'Dedicated account manager'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 2999900, // ₹29,999
    leads: 120,
    features: [
      '120 qualified leads/month',
      'Priority lead delivery',
      '24/7 support',
      'Custom integrations',
      'White-label option',
      'API access'
    ]
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({
    service_cities: [],
    service_states: [],
    target_gender: 'all',
  });

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to complete onboarding');

      const data = await response.json();
      
      // Redirect to payment or dashboard
      if (data.payment_required) {
        router.push(`/payment?order_id=${data.razorpay_order_id}`);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessDetailsStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ContactInfoStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <ServiceAreasStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <TargetAudienceStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <ServiceDetailsStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <PlanSelectionStep
            data={formData}
            updateData={updateFormData}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to LeadGen Pro 🇮🇳
          </h1>
          <p className="text-gray-600">
            Let's set up your account to start generating qualified leads
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        {renderStep()}
      </div>
    </div>
  );
}

// ============================================================================
// STEP COMPONENTS
// ============================================================================

function BusinessDetailsStep({ 
  data, 
  updateData, 
  onNext 
}: { 
  data: Partial<OnboardingFormData>; 
  updateData: (d: Partial<OnboardingFormData>) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.business_name) newErrors.business_name = 'Business name is required';
    if (!data.industry) newErrors.industry = 'Please select an industry';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <CardTitle>Business Details</CardTitle>
        </div>
        <CardDescription>Tell us about your business</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="business_name">Business Name *</Label>
          <Input
            id="business_name"
            placeholder="e.g., ABC Real Estate"
            value={data.business_name || ''}
            onChange={(e) => updateData({ business_name: e.target.value })}
            className={errors.business_name ? 'border-red-500' : ''}
          />
          {errors.business_name && (
            <p className="text-sm text-red-500 mt-1">{errors.business_name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="industry">Industry *</Label>
          <Select
            value={data.industry}
            onValueChange={(value) => updateData({ industry: value as Industry })}
          >
            <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  <span className="flex items-center gap-2">
                    <span>{industry.icon}</span>
                    <span>{industry.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-sm text-red-500 mt-1">{errors.industry}</p>
          )}
        </div>

        <div>
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://your-website.com"
            value={data.website || ''}
            onChange={(e) => updateData({ website: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="gst_number">GST Number (Optional)</Label>
          <Input
            id="gst_number"
            placeholder="22AAAAA0000A1Z5"
            value={data.gst_number || ''}
            onChange={(e) => updateData({ gst_number: e.target.value.toUpperCase() })}
          />
        </div>

        <Button onClick={handleNext} className="w-full" size="lg">
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}

function ContactInfoStep({ 
  data, 
  updateData, 
  onNext,
  onPrev
}: { 
  data: Partial<OnboardingFormData>; 
  updateData: (d: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.contact_person) newErrors.contact_person = 'Contact name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.phone) newErrors.phone = 'Phone number is required';
    if (data.phone && !/^[6-9]\d{9}$/.test(data.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>How can we reach you?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="contact_person">Your Name *</Label>
          <Input
            id="contact_person"
            placeholder="Full Name"
            value={data.contact_person || ''}
            onChange={(e) => updateData({ contact_person: e.target.value })}
            className={errors.contact_person ? 'border-red-500' : ''}
          />
          {errors.contact_person && (
            <p className="text-sm text-red-500 mt-1">{errors.contact_person}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={data.email || ''}
            onChange={(e) => updateData({ email: e.target.value })}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">WhatsApp Number *</Label>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md text-gray-500">
              +91
            </span>
            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              value={data.phone || ''}
              onChange={(e) => updateData({ phone: e.target.value })}
              className={`flex-1 rounded-l-none ${errors.phone ? 'border-red-500' : ''}`}
              maxLength={10}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            We'll send lead notifications via WhatsApp
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={onPrev} variant="outline" className="flex-1">
            Back
          </Button>
          <Button onClick={handleNext} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ServiceAreasStep({ 
  data, 
  updateData, 
  onNext,
  onPrev
}: { 
  data: Partial<OnboardingFormData>; 
  updateData: (d: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [selectedCities, setSelectedCities] = useState<string[]>(data.service_cities || []);
  const [selectedStates, setSelectedStates] = useState<string[]>(data.service_states || []);

  const toggleCity = (city: string) => {
    const newCities = selectedCities.includes(city)
      ? selectedCities.filter(c => c !== city)
      : [...selectedCities, city];
    setSelectedCities(newCities);
    updateData({ service_cities: newCities });
  };

  const toggleState = (state: string) => {
    const newStates = selectedStates.includes(state)
      ? selectedStates.filter(s => s !== state)
      : [...selectedStates, state];
    setSelectedStates(newStates);
    updateData({ service_states: newStates });
  };

  const handleNext = () => {
    if (selectedCities.length > 0 || selectedStates.length > 0) {
      onNext();
    } else {
      alert('Please select at least one city or state');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-6 w-6 text-blue-600" />
          <CardTitle>Service Areas</CardTitle>
        </div>
        <CardDescription>Where do you want to generate leads?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-semibold mb-3 block">Major Cities</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {INDIAN_CITIES.slice(0, 12).map((city) => (
              <button
                key={city}
                onClick={() => toggleCity(city)}
                className={`p-3 text-sm rounded-lg border-2 transition-all ${
                  selectedCities.includes(city)
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {selectedCities.includes(city) && <Check className="h-4 w-4 inline mr-1" />}
                {city}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">Or Select States</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {INDIAN_STATES.slice(0, 9).map((state) => (
              <button
                key={state}
                onClick={() => toggleState(state)}
                className={`p-3 text-sm rounded-lg border-2 transition-all ${
                  selectedStates.includes(state)
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {selectedStates.includes(state) && <Check className="h-4 w-4 inline mr-1" />}
                {state}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={onPrev} variant="outline" className="flex-1">
            Back
          </Button>
          <Button onClick={handleNext} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TargetAudienceStep({ 
  data, 
  updateData, 
  onNext,
  onPrev
}: { 
  data: Partial<OnboardingFormData>; 
  updateData: (d: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-6 w-6 text-blue-600" />
          <CardTitle>Target Audience</CardTitle>
        </div>
        <CardDescription>Who are your ideal customers?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="target_description">Describe Your Target Audience *</Label>
          <Textarea
            id="target_description"
            placeholder="e.g., Home buyers in Mumbai looking for 2BHK apartments, budget ₹80L-₹1Cr"
            value={data.target_audience_description || ''}
            onChange={(e) => updateData({ target_audience_description: e.target.value })}
            rows={3}
          />
          <p className="text-sm text-gray-500 mt-1">
            Be specific - this helps our AI generate better qualified leads
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age_min">Age Range (Optional)</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="age_min"
                type="number"
                placeholder="Min"
                value={data.age_range_min || ''}
                onChange={(e) => updateData({ age_range_min: parseInt(e.target.value) })}
              />
              <span className="text-gray-500">to</span>
              <Input
                id="age_max"
                type="number"
                placeholder="Max"
                value={data.age_range_max || ''}
                onChange={(e) => updateData({ age_range_max: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={data.target_gender || 'all'}
              onValueChange={(value: any) => updateData({ target_gender: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="income_level">Income Level</Label>
          <Select
            value={data.income_level}
            onValueChange={(value: any) => updateData({ income_level: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select income level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget (₹3-8 LPA)</SelectItem>
              <SelectItem value="mid-range">Mid-Range (₹8-20 LPA)</SelectItem>
              <SelectItem value="premium">Premium (₹20+ LPA)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button onClick={onPrev} variant="outline" className="flex-1">
            Back
          </Button>
          <Button onClick={onNext} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ServiceDetailsStep({ 
  data, 
  updateData, 
  onNext,
  onPrev
}: { 
  data: Partial<OnboardingFormData>; 
  updateData: (d: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <IndianRupee className="h-6 w-6 text-blue-600" />
          <CardTitle>Service Details</CardTitle>
        </div>
        <CardDescription>Help us understand your business better</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="service_description">What Services Do You Offer? *</Label>
          <Textarea
            id="service_description"
            placeholder="e.g., We help buyers find and purchase residential properties in Mumbai. We handle everything from property search to legal paperwork."
            value={data.service_description || ''}
            onChange={(e) => updateData({ service_description: e.target.value })}
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="deal_value">Average Deal Value *</Label>
          <div className="flex gap-2 items-center">
            <span className="text-gray-500">₹</span>
            <Input
              id="deal_value"
              type="number"
              placeholder="500000"
              value={data.average_deal_value || ''}
              onChange={(e) => updateData({ average_deal_value: parseInt(e.target.value) })}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            This helps us calculate your ROI and optimize campaigns
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={onPrev} variant="outline" className="flex-1">
            Back
          </Button>
          <Button onClick={onNext} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PlanSelectionStep({ 
  data, 
  updateData,
  onPrev,
  onSubmit,
  loading
}: { 
  data: Partial<OnboardingFormData>; 
  updateData: (d: Partial<OnboardingFormData>) => void;
  onPrev: () => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(data.selected_plan || 'growth');

  const handlePlanSelect = (planId: SubscriptionPlan) => {
    setSelectedPlan(planId);
    updateData({ selected_plan: planId });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Plan</CardTitle>
        <CardDescription>Start with 7-day free trial. Cancel anytime.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                selectedPlan === plan.id
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {formatIndianCurrency(plan.price)}
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {selectedPlan === plan.id && (
                <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                  <Check className="h-5 w-5" />
                  Selected
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>7-Day Free Trial:</strong> Test our platform risk-free. 
            You'll only be charged after your trial ends. Cancel anytime with no questions asked.
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={onPrev} variant="outline" className="flex-1" disabled={loading}>
            Back
          </Button>
          <Button onClick={onSubmit} className="flex-1" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Start Free Trial →'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


