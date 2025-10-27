'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Save,
  Calculator,
  IndianRupee,
  Target,
  Calendar,
  FileText,
  Plus,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface CustomService {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export default function AdminCustomPlanPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState<any>(null);

  const [planData, setPlanData] = useState({
    plan_name: '',
    monthly_cost: 0,
    leads_quota: 0,
    cost_per_lead: 0,
    contract_duration_months: 12,
    auto_renewal: true,
    custom_terms: '',
    includes_ai_scraping: true,
    includes_outreach: true,
    includes_meta_ads: false,
    includes_google_ads: false,
    meta_ads_budget: 0,
    google_ads_budget: 0,
    dedicated_support: false,
    custom_services: [] as CustomService[],
  });

  useEffect(() => {
    fetchClientAndPlan();
  }, [clientId]);

  const fetchClientAndPlan = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/clients/${clientId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch client');
      }

      const data = await response.json();
      setClient(data.client);

      // If plan exists, populate form
      if (data.client.custom_plans?.[0]) {
        const existingPlan = data.client.custom_plans[0];
        setPlanData({
          plan_name: existingPlan.plan_name || '',
          monthly_cost: existingPlan.monthly_cost || 0,
          leads_quota: existingPlan.leads_quota || 0,
          cost_per_lead: existingPlan.cost_per_lead || 0,
          contract_duration_months: existingPlan.contract_duration_months || 12,
          auto_renewal: existingPlan.auto_renewal ?? true,
          custom_terms: existingPlan.custom_terms || '',
          includes_ai_scraping: existingPlan.includes_ai_scraping ?? true,
          includes_outreach: existingPlan.includes_outreach ?? true,
          includes_meta_ads: existingPlan.includes_meta_ads ?? false,
          includes_google_ads: existingPlan.includes_google_ads ?? false,
          meta_ads_budget: existingPlan.meta_ads_budget || 0,
          google_ads_budget: existingPlan.google_ads_budget || 0,
          dedicated_support: existingPlan.dedicated_support ?? false,
          custom_services: existingPlan.custom_services || [],
        });
      }
    } catch (error: any) {
      console.error('Failed to fetch client:', error);
      toast.error('Failed to load client data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setPlanData(prev => ({ ...prev, [field]: value }));

    // Auto-calculate cost per lead when monthly cost or leads quota changes
    if (field === 'monthly_cost' || field === 'leads_quota') {
      const cost = field === 'monthly_cost' ? value : planData.monthly_cost;
      const leads = field === 'leads_quota' ? value : planData.leads_quota;
      
      if (leads > 0) {
        const costPerLead = cost / leads;
        setPlanData(prev => ({ ...prev, cost_per_lead: Math.round(costPerLead) }));
      }
    }
  };

  const addCustomService = () => {
    const newService: CustomService = {
      id: `service-${Date.now()}`,
      name: '',
      description: '',
      quantity: 1,
      unit_price: 0,
    };
    setPlanData(prev => ({
      ...prev,
      custom_services: [...prev.custom_services, newService],
    }));
  };

  const removeCustomService = (serviceId: string) => {
    setPlanData(prev => ({
      ...prev,
      custom_services: prev.custom_services.filter(s => s.id !== serviceId),
    }));
  };

  const updateCustomService = (serviceId: string, field: string, value: any) => {
    setPlanData(prev => ({
      ...prev,
      custom_services: prev.custom_services.map(s =>
        s.id === serviceId ? { ...s, [field]: value } : s
      ),
    }));
  };

  const calculateTotalCost = () => {
    let total = planData.monthly_cost;
    
    if (planData.includes_meta_ads) {
      total += planData.meta_ads_budget;
    }
    
    if (planData.includes_google_ads) {
      total += planData.google_ads_budget;
    }

    planData.custom_services.forEach(service => {
      total += service.quantity * service.unit_price;
    });

    return total;
  };

  const handleSavePlan = async () => {
    try {
      // Validation
      if (!planData.plan_name) {
        toast.error('Plan name is required');
        return;
      }

      if (planData.monthly_cost <= 0) {
        toast.error('Monthly cost must be greater than 0');
        return;
      }

      if (planData.leads_quota <= 0) {
        toast.error('Leads quota must be greater than 0');
        return;
      }

      setSaving(true);

      const response = await fetch(`/api/admin/clients/${clientId}/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error('Failed to save plan');
      }

      toast.success('Custom plan saved successfully!');
      router.push(`/admin/clients/${clientId}`);
    } catch (error: any) {
      console.error('Failed to save plan:', error);
      toast.error('Failed to save plan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <p className="text-slate-600">Loading client data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href={`/admin/clients/${clientId}`}>
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Client
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Custom Plan Builder</h1>
        <p className="text-slate-600 mt-1">
          Create a tailored plan for {client?.business_name}
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Plan Details */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="plan_name">Plan Name *</Label>
              <Input
                id="plan_name"
                value={planData.plan_name}
                onChange={(e) => handleInputChange('plan_name', e.target.value)}
                placeholder="E.g., Growth Plan, Premium Lead Package"
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="monthly_cost">Monthly Cost (₹) *</Label>
                <div className="relative mt-2">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="monthly_cost"
                    type="number"
                    value={planData.monthly_cost}
                    onChange={(e) => handleInputChange('monthly_cost', Number(e.target.value))}
                    className="pl-10"
                    min={0}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="leads_quota">Leads Quota (per month) *</Label>
                <div className="relative mt-2">
                  <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="leads_quota"
                    type="number"
                    value={planData.leads_quota}
                    onChange={(e) => handleInputChange('leads_quota', Number(e.target.value))}
                    className="pl-10"
                    min={0}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cost_per_lead">Cost Per Lead (₹)</Label>
                <div className="relative mt-2">
                  <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="cost_per_lead"
                    type="number"
                    value={planData.cost_per_lead}
                    readOnly
                    className="pl-10 bg-slate-50"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Auto-calculated</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contract_duration_months">Contract Duration (months)</Label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="contract_duration_months"
                    type="number"
                    value={planData.contract_duration_months}
                    onChange={(e) => handleInputChange('contract_duration_months', Number(e.target.value))}
                    className="pl-10"
                    min={1}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <Checkbox
                  id="auto_renewal"
                  checked={planData.auto_renewal}
                  onCheckedChange={(checked) => handleInputChange('auto_renewal', checked)}
                />
                <Label htmlFor="auto_renewal" className="cursor-pointer">
                  Auto-renewal enabled
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Included */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle>Services Included</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg">
                <Checkbox
                  id="includes_ai_scraping"
                  checked={planData.includes_ai_scraping}
                  onCheckedChange={(checked) => handleInputChange('includes_ai_scraping', checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="includes_ai_scraping" className="cursor-pointer font-semibold">
                    AI Web Scraping
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Automated prospect discovery from web sources
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg">
                <Checkbox
                  id="includes_outreach"
                  checked={planData.includes_outreach}
                  onCheckedChange={(checked) => handleInputChange('includes_outreach', checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="includes_outreach" className="cursor-pointer font-semibold">
                    Outreach Campaigns
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    WhatsApp & Email campaigns to prospects
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg">
                <Checkbox
                  id="includes_meta_ads"
                  checked={planData.includes_meta_ads}
                  onCheckedChange={(checked) => handleInputChange('includes_meta_ads', checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="includes_meta_ads" className="cursor-pointer font-semibold">
                    Meta Ads (Facebook/Instagram)
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Facebook and Instagram ad campaigns
                  </p>
                  {planData.includes_meta_ads && (
                    <div className="mt-3">
                      <Label htmlFor="meta_ads_budget" className="text-sm">Monthly Ad Budget (₹)</Label>
                      <Input
                        id="meta_ads_budget"
                        type="number"
                        value={planData.meta_ads_budget}
                        onChange={(e) => handleInputChange('meta_ads_budget', Number(e.target.value))}
                        className="mt-1"
                        min={0}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg">
                <Checkbox
                  id="includes_google_ads"
                  checked={planData.includes_google_ads}
                  onCheckedChange={(checked) => handleInputChange('includes_google_ads', checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="includes_google_ads" className="cursor-pointer font-semibold">
                    Google Ads
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Google Search and Display ads
                  </p>
                  {planData.includes_google_ads && (
                    <div className="mt-3">
                      <Label htmlFor="google_ads_budget" className="text-sm">Monthly Ad Budget (₹)</Label>
                      <Input
                        id="google_ads_budget"
                        type="number"
                        value={planData.google_ads_budget}
                        onChange={(e) => handleInputChange('google_ads_budget', Number(e.target.value))}
                        className="mt-1"
                        min={0}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg">
                <Checkbox
                  id="dedicated_support"
                  checked={planData.dedicated_support}
                  onCheckedChange={(checked) => handleInputChange('dedicated_support', checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="dedicated_support" className="cursor-pointer font-semibold">
                    Dedicated Support
                  </Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Priority support with dedicated account manager
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Services */}
        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Custom Services</CardTitle>
              <Button size="sm" variant="outline" onClick={addCustomService}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {planData.custom_services.length === 0 ? (
              <p className="text-slate-600 text-sm text-center py-8">
                No custom services added. Click "Add Service" to create one.
              </p>
            ) : (
              planData.custom_services.map((service) => (
                <div key={service.id} className="p-4 border border-slate-200 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                      <Input
                        placeholder="Service Name"
                        value={service.name}
                        onChange={(e) => updateCustomService(service.id, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Description"
                        value={service.description}
                        onChange={(e) => updateCustomService(service.id, 'description', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Quantity"
                        value={service.quantity}
                        onChange={(e) => updateCustomService(service.id, 'quantity', Number(e.target.value))}
                        min={1}
                      />
                      <Input
                        type="number"
                        placeholder="Unit Price (₹)"
                        value={service.unit_price}
                        onChange={(e) => updateCustomService(service.id, 'unit_price', Number(e.target.value))}
                        min={0}
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeCustomService(service.id)}
                      className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-slate-600">
                    Subtotal: ₹{(service.quantity * service.unit_price).toLocaleString('en-IN')}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Custom Terms */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle>Custom Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={planData.custom_terms}
              onChange={(e) => handleInputChange('custom_terms', e.target.value)}
              placeholder="Enter any custom terms, conditions, or special arrangements for this client..."
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Total Cost Summary */}
        <Card className="border border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Total Monthly Cost</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Base cost + Ad budgets + Custom services
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-900">
                  ₹{calculateTotalCost().toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  {planData.leads_quota} leads = ₹{planData.cost_per_lead} per lead
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={handleSavePlan}
            disabled={saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Custom Plan'}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/clients/${clientId}`)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

