'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  CheckCircle,
  UserPlus,
  Building2,
  Target,
  IndianRupee,
  Calendar,
  TrendingUp,
  Users,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import OnboardingGuide from '@/components/admin/OnboardingGuide';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  industry?: string;
  status: string;
  created_at: string;
}

interface OnboardingData {
  // Basic Information
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  alternate_phone?: string;
  
  // Business Details
  industry: string;
  business_type: string; // B2B, B2C, B2B2C
  company_size: string;
  location: string;
  website?: string;
  
  // Current Situation
  current_lead_sources: string[];
  monthly_lead_volume: string;
  current_marketing_budget: string;
  pain_points: string;
  
  // Target Market
  target_audience: string;
  ideal_customer_profile: string;
  geographic_target: string;
  competitor_names?: string;
  
  // Lead Requirements
  desired_lead_volume: string;
  lead_quality_expectations: string;
  acceptable_cost_per_lead: string;
  urgency: string; // Immediate, Within 1 month, Within 3 months
  
  // Service Preferences
  preferred_lead_sources: string[];
  contact_method_preferences: string[];
  reporting_frequency: string;
  
  // Budget & Plan
  proposed_monthly_budget: string;
  proposed_leads_quota: string;
  proposed_cost_per_lead: string;
  payment_terms: string;
  contract_duration: string;
  
  // Additional Services
  need_outreach_service: boolean;
  need_appointment_setting: boolean;
  need_crm_integration: boolean;
  additional_requirements?: string;
  
  // Internal Notes
  consultation_notes: string;
  decision_maker: boolean;
  buying_timeline: string;
  objections?: string;
  next_steps: string;
}

export default function ClientOnboardingPage() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form data
  const [formData, setFormData] = useState<OnboardingData>({
    business_name: '',
    contact_person: '',
    email: '',
    phone: '',
    alternate_phone: '',
    industry: '',
    business_type: 'B2B',
    company_size: '',
    location: '',
    website: '',
    current_lead_sources: [],
    monthly_lead_volume: '',
    current_marketing_budget: '',
    pain_points: '',
    target_audience: '',
    ideal_customer_profile: '',
    geographic_target: '',
    competitor_names: '',
    desired_lead_volume: '',
    lead_quality_expectations: '',
    acceptable_cost_per_lead: '',
    urgency: 'Within 1 month',
    preferred_lead_sources: [],
    contact_method_preferences: [],
    reporting_frequency: 'Weekly',
    proposed_monthly_budget: '',
    proposed_leads_quota: '',
    proposed_cost_per_lead: '',
    payment_terms: 'Net 30 days',
    contract_duration: '3 months',
    need_outreach_service: false,
    need_appointment_setting: false,
    need_crm_integration: false,
    additional_requirements: '',
    consultation_notes: '',
    decision_maker: true,
    buying_timeline: '',
    objections: '',
    next_steps: '',
  });

  useEffect(() => {
    fetchConsultation();
  }, [consultationId]);

  const fetchConsultation = async () => {
    try {
      const response = await fetch(`/api/admin/consultations/${consultationId}`);
      if (response.ok) {
        const data = await response.json();
        setConsultation(data.consultation);
        
        // Pre-fill from consultation data
        setFormData(prev => ({
          ...prev,
          contact_person: data.consultation.name || '',
          email: data.consultation.email || '',
          phone: data.consultation.phone || '',
          business_name: data.consultation.company || '',
          industry: data.consultation.industry || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching consultation:', error);
      toast.error('Failed to load consultation data');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const calculateCostPerLead = () => {
    const budget = parseFloat(formData.proposed_monthly_budget) || 0;
    const leads = parseFloat(formData.proposed_leads_quota) || 0;
    if (leads > 0) {
      const cpl = Math.round(budget / leads);
      updateField('proposed_cost_per_lead', cpl.toString());
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.business_name || !formData.contact_person || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.proposed_monthly_budget || !formData.proposed_leads_quota) {
      toast.error('Please set proposed budget and leads quota');
      return;
    }

    setSaving(true);

    try {
      // Create client and custom plan
      const response = await fetch('/api/admin/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultation_id: consultationId,
          onboarding_data: formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Onboarding failed');
      }

      toast.success('Client onboarded successfully!');
      
      // Redirect to client detail page
      setTimeout(() => {
        router.push(`/admin/clients/${result.client_id}`);
      }, 1500);

    } catch (error: any) {
      console.error('Onboarding error:', error);
      toast.error(error.message || 'Failed to onboard client');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading consultation...</p>
        </div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 text-lg">Consultation not found</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/admin/consultations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Consultations
          </Link>
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
              <UserPlus className="h-8 w-8 text-blue-600" />
              Client Onboarding Form
            </h1>
            <p className="text-slate-600">Complete this form during/after the free consultation call</p>
          </div>
          <Badge className="bg-blue-100 text-blue-700">
            Consultation: {consultation.name}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-6 gap-2 mt-4">
            {['Basic Info', 'Business', 'Current State', 'Target Market', 'Requirements', 'Proposal'].map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx + 1)}
                className={`text-xs p-2 rounded ${
                  currentStep === idx + 1
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : currentStep > idx + 1
                    ? 'bg-green-50 text-green-700'
                    : 'bg-slate-50 text-slate-500'
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two-Column Layout: Form + Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form - 2/3 width */}
        <div className="lg:col-span-2">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Essential contact and business details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business_name">Business Name *</Label>
                <Input
                  id="business_name"
                  value={formData.business_name}
                  onChange={(e) => updateField('business_name', e.target.value)}
                  placeholder="ABC Real Estate Pvt Ltd"
                />
              </div>

              <div>
                <Label htmlFor="contact_person">Contact Person *</Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={(e) => updateField('contact_person', e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="john@abcrealestate.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+91-9876543210"
                />
              </div>

              <div>
                <Label htmlFor="alternate_phone">Alternate Phone</Label>
                <Input
                  id="alternate_phone"
                  value={formData.alternate_phone}
                  onChange={(e) => updateField('alternate_phone', e.target.value)}
                  placeholder="+91-9876543211"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://abcrealestate.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Business Details */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Business Details
            </CardTitle>
            <CardDescription>Information about the company and industry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(val) => updateField('industry', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="it_services">IT Services</SelectItem>
                    <SelectItem value="financial_services">Financial Services</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="business_type">Business Type *</Label>
                <Select value={formData.business_type} onValueChange={(val) => updateField('business_type', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B2B">B2B (Business to Business)</SelectItem>
                    <SelectItem value="B2C">B2C (Business to Consumer)</SelectItem>
                    <SelectItem value="B2B2C">B2B2C (Hybrid)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="company_size">Company Size *</Label>
                <Select value={formData.company_size} onValueChange={(val) => updateField('company_size', val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location (City, State) *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Mumbai, Maharashtra"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Current Situation */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Current Marketing Situation
            </CardTitle>
            <CardDescription>Understanding their current lead generation efforts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3 block">Current Lead Sources (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Cold Calling', 'Referrals', 'Facebook Ads', 'Google Ads', 'LinkedIn', 'Website', 'Events', 'Agencies', 'None'].map((source) => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox
                      id={source}
                      checked={formData.current_lead_sources.includes(source)}
                      onCheckedChange={() => toggleArrayField('current_lead_sources', source)}
                    />
                    <label htmlFor={source} className="text-sm cursor-pointer">{source}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthly_lead_volume">Current Monthly Lead Volume</Label>
                <Input
                  id="monthly_lead_volume"
                  value={formData.monthly_lead_volume}
                  onChange={(e) => updateField('monthly_lead_volume', e.target.value)}
                  placeholder="e.g., 20-30 leads/month"
                />
              </div>

              <div>
                <Label htmlFor="current_marketing_budget">Current Monthly Marketing Budget</Label>
                <Input
                  id="current_marketing_budget"
                  value={formData.current_marketing_budget}
                  onChange={(e) => updateField('current_marketing_budget', e.target.value)}
                  placeholder="e.g., ₹15,000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pain_points">Key Pain Points & Challenges *</Label>
              <Textarea
                id="pain_points"
                value={formData.pain_points}
                onChange={(e) => updateField('pain_points', e.target.value)}
                rows={4}
                placeholder="What are the biggest challenges they're facing with lead generation? (e.g., low quality leads, expensive cost per lead, inconsistent flow, time-consuming manual work)"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Target Market */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Target Market & Ideal Customer
            </CardTitle>
            <CardDescription>Who they want to reach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="target_audience">Target Audience *</Label>
              <Textarea
                id="target_audience"
                value={formData.target_audience}
                onChange={(e) => updateField('target_audience', e.target.value)}
                rows={3}
                placeholder="e.g., First-time home buyers in Mumbai, age 25-40, budget ₹50L-1Cr"
              />
            </div>

            <div>
              <Label htmlFor="ideal_customer_profile">Ideal Customer Profile (ICP) *</Label>
              <Textarea
                id="ideal_customer_profile"
                value={formData.ideal_customer_profile}
                onChange={(e) => updateField('ideal_customer_profile', e.target.value)}
                rows={4}
                placeholder="Describe the perfect customer: demographics, behavior, pain points, budget, decision-making process, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="geographic_target">Geographic Target *</Label>
                <Input
                  id="geographic_target"
                  value={formData.geographic_target}
                  onChange={(e) => updateField('geographic_target', e.target.value)}
                  placeholder="e.g., Mumbai, Navi Mumbai, Thane"
                />
              </div>

              <div>
                <Label htmlFor="competitor_names">Main Competitors (Optional)</Label>
                <Input
                  id="competitor_names"
                  value={formData.competitor_names}
                  onChange={(e) => updateField('competitor_names', e.target.value)}
                  placeholder="e.g., Competitor A, Competitor B"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Lead Requirements */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lead Requirements & Expectations
            </CardTitle>
            <CardDescription>What they need from your service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="desired_lead_volume">Desired Monthly Lead Volume *</Label>
                <Input
                  id="desired_lead_volume"
                  value={formData.desired_lead_volume}
                  onChange={(e) => updateField('desired_lead_volume', e.target.value)}
                  placeholder="e.g., 50 leads/month"
                />
              </div>

              <div>
                <Label htmlFor="acceptable_cost_per_lead">Acceptable Cost Per Lead *</Label>
                <Input
                  id="acceptable_cost_per_lead"
                  value={formData.acceptable_cost_per_lead}
                  onChange={(e) => updateField('acceptable_cost_per_lead', e.target.value)}
                  placeholder="e.g., ₹300-500"
                />
              </div>

              <div>
                <Label htmlFor="urgency">Urgency / Timeline *</Label>
                <Select value={formData.urgency} onValueChange={(val) => updateField('urgency', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate">Need leads immediately</SelectItem>
                    <SelectItem value="Within 1 month">Within 1 month</SelectItem>
                    <SelectItem value="Within 3 months">Within 3 months</SelectItem>
                    <SelectItem value="Just exploring">Just exploring options</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="reporting_frequency">Reporting Frequency *</Label>
                <Select value={formData.reporting_frequency} onValueChange={(val) => updateField('reporting_frequency', val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="lead_quality_expectations">Lead Quality Expectations *</Label>
              <Textarea
                id="lead_quality_expectations"
                value={formData.lead_quality_expectations}
                onChange={(e) => updateField('lead_quality_expectations', e.target.value)}
                rows={3}
                placeholder="What defines a 'good lead' for them? (e.g., verified phone, budget qualification, expressed interest, specific location)"
              />
            </div>

            <div>
              <Label className="mb-3 block">Preferred Lead Sources</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['AI Scraping', 'Facebook Ads', 'Google Ads', 'LinkedIn', 'Instagram', 'Website Forms'].map((source) => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox
                      id={`pref-${source}`}
                      checked={formData.preferred_lead_sources.includes(source)}
                      onCheckedChange={() => toggleArrayField('preferred_lead_sources', source)}
                    />
                    <label htmlFor={`pref-${source}`} className="text-sm cursor-pointer">{source}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Contact Method Preferences</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Phone Only', 'Email Only', 'WhatsApp', 'SMS', 'All Methods'].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={`contact-${method}`}
                      checked={formData.contact_method_preferences.includes(method)}
                      onCheckedChange={() => toggleArrayField('contact_method_preferences', method)}
                    />
                    <label htmlFor={`contact-${method}`} className="text-sm cursor-pointer">{method}</label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 6: Proposal & Internal Notes */}
      {currentStep === 6 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              Custom Proposal & Internal Notes
            </CardTitle>
            <CardDescription>Build their custom plan and capture consultation insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pricing Guidelines Reference */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 mb-2">💡 Pricing Guidelines</h3>
                  <p className="text-sm text-amber-800 mb-4">
                    Use these estimated ranges as reference when building the proposal. Final pricing should be based on client's specific requirements from steps 1-5.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <div className="font-semibold text-slate-900 mb-1">Small Business</div>
                  <div className="text-amber-700 font-bold text-lg">₹15K-25K/month</div>
                  <div className="text-slate-600 text-xs mt-1">~20-40 leads/month</div>
                  <div className="text-slate-500 text-xs mt-2">₹500-750 per lead</div>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-amber-400">
                  <div className="font-semibold text-slate-900 mb-1">Growing Business ⭐</div>
                  <div className="text-amber-700 font-bold text-lg">₹30K-50K/month</div>
                  <div className="text-slate-600 text-xs mt-1">~50-100 leads/month</div>
                  <div className="text-slate-500 text-xs mt-2">₹400-600 per lead</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <div className="font-semibold text-slate-900 mb-1">Enterprise</div>
                  <div className="text-amber-700 font-bold text-lg">₹60K-1L+/month</div>
                  <div className="text-slate-600 text-xs mt-1">~150-300+ leads/month</div>
                  <div className="text-slate-500 text-xs mt-2">₹350-500 per lead</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-300">
                <div className="text-xs text-amber-800 space-y-1">
                  <p><strong>💡 Pricing Factors to Consider:</strong></p>
                  <ul className="list-disc list-inside ml-2 space-y-0.5">
                    <li>Industry complexity (Real Estate ₹400/lead, Healthcare ₹500/lead, IT ₹350/lead)</li>
                    <li>Lead source mix (100% scraping vs 70/30 mix vs 60/40 mix)</li>
                    <li>Quality level required (basic vs verified vs premium)</li>
                    <li>Geographic targeting (local vs pan-India)</li>
                    <li>Volume discounts (26-50: 10%, 51-100: 15%, 101-200: 20%, 200+: 25%)</li>
                    <li>Additional services (outreach, appointment setting, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Proposal Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Proposed Custom Plan
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="proposed_monthly_budget">Monthly Budget (₹) *</Label>
                  <Input
                    id="proposed_monthly_budget"
                    type="number"
                    value={formData.proposed_monthly_budget}
                    onChange={(e) => {
                      updateField('proposed_monthly_budget', e.target.value);
                      setTimeout(calculateCostPerLead, 100);
                    }}
                    placeholder="25000"
                  />
                </div>

                <div>
                  <Label htmlFor="proposed_leads_quota">Leads Quota/Month *</Label>
                  <Input
                    id="proposed_leads_quota"
                    type="number"
                    value={formData.proposed_leads_quota}
                    onChange={(e) => {
                      updateField('proposed_leads_quota', e.target.value);
                      setTimeout(calculateCostPerLead, 100);
                    }}
                    placeholder="50"
                  />
                </div>

                <div>
                  <Label htmlFor="proposed_cost_per_lead">Cost Per Lead (₹)</Label>
                  <Input
                    id="proposed_cost_per_lead"
                    type="number"
                    value={formData.proposed_cost_per_lead}
                    readOnly
                    className="bg-slate-100"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payment_terms">Payment Terms *</Label>
                  <Select value={formData.payment_terms} onValueChange={(val) => updateField('payment_terms', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Advance">100% Advance</SelectItem>
                      <SelectItem value="Net 15 days">Net 15 days</SelectItem>
                      <SelectItem value="Net 30 days">Net 30 days</SelectItem>
                      <SelectItem value="50-50">50% Advance, 50% on delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="contract_duration">Contract Duration *</Label>
                  <Select value={formData.contract_duration} onValueChange={(val) => updateField('contract_duration', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 month">1 Month (Trial)</SelectItem>
                      <SelectItem value="3 months">3 Months</SelectItem>
                      <SelectItem value="6 months">6 Months</SelectItem>
                      <SelectItem value="12 months">12 Months (Annual)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label className="mb-3 block">Additional Services</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="outreach"
                      checked={formData.need_outreach_service}
                      onCheckedChange={(checked) => updateField('need_outreach_service', checked)}
                    />
                    <label htmlFor="outreach" className="text-sm cursor-pointer">
                      Outreach Service (Email/WhatsApp campaigns)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="appointment"
                      checked={formData.need_appointment_setting}
                      onCheckedChange={(checked) => updateField('need_appointment_setting', checked)}
                    />
                    <label htmlFor="appointment" className="text-sm cursor-pointer">
                      Appointment Setting Service
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crm"
                      checked={formData.need_crm_integration}
                      onCheckedChange={(checked) => updateField('need_crm_integration', checked)}
                    />
                    <label htmlFor="crm" className="text-sm cursor-pointer">
                      CRM Integration
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="additional_requirements">Additional Requirements</Label>
                <Textarea
                  id="additional_requirements"
                  value={formData.additional_requirements}
                  onChange={(e) => updateField('additional_requirements', e.target.value)}
                  rows={2}
                  placeholder="Any custom requirements or special requests"
                />
              </div>
            </div>

            {/* Internal Notes Section */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-amber-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Internal Notes (Not Visible to Client)
              </h3>

              <div>
                <Label htmlFor="consultation_notes">Consultation Notes *</Label>
                <Textarea
                  id="consultation_notes"
                  value={formData.consultation_notes}
                  onChange={(e) => updateField('consultation_notes', e.target.value)}
                  rows={4}
                  placeholder="Key points from the consultation call: their tone, concerns, budget flexibility, objections raised, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buying_timeline">Buying Timeline</Label>
                  <Input
                    id="buying_timeline"
                    value={formData.buying_timeline}
                    onChange={(e) => updateField('buying_timeline', e.target.value)}
                    placeholder="e.g., Ready to start next week"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="decision_maker"
                    checked={formData.decision_maker}
                    onCheckedChange={(checked) => updateField('decision_maker', checked)}
                  />
                  <label htmlFor="decision_maker" className="text-sm cursor-pointer font-medium">
                    Is Decision Maker?
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="objections">Objections / Concerns Raised</Label>
                <Textarea
                  id="objections"
                  value={formData.objections}
                  onChange={(e) => updateField('objections', e.target.value)}
                  rows={2}
                  placeholder="Any objections or concerns they mentioned (price, quality, timeline, etc.)"
                />
              </div>

              <div>
                <Label htmlFor="next_steps">Next Steps *</Label>
                <Textarea
                  id="next_steps"
                  value={formData.next_steps}
                  onChange={(e) => updateField('next_steps', e.target.value)}
                  rows={2}
                  placeholder="e.g., Send proposal via email, follow up on Friday, schedule demo, etc."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous Step
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Client...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Complete Onboarding
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
        </div>
        
        {/* Guide Sidebar - 1/3 width */}
        <div className="lg:col-span-1">
          <OnboardingGuide currentStep={currentStep} />
        </div>
      </div>
      </div>
    </div>
  );
}

