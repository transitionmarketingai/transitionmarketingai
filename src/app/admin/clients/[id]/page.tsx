'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  IndianRupee,
  TrendingUp,
  Target,
  FileText,
  Upload,
  MessageSquare,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface Client {
  id: string;
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  industry: string;
  location?: string;
  status: 'active' | 'pending' | 'paused' | 'churned';
  created_at: string;
  notes?: string;
}

interface CustomPlan {
  id: string;
  client_id: string;
  plan_name: string;
  monthly_cost: number;
  leads_quota: number;
  services: any;
  custom_services: any;
  terms: string;
  status: 'draft' | 'active' | 'expired';
  start_date?: string;
  end_date?: string;
}

interface LeadDelivery {
  id: string;
  client_id: string;
  lead_name: string;
  lead_email: string;
  lead_phone: string;
  lead_source: string;
  quality_score: number;
  delivered_at: string;
  status: 'pending' | 'delivered' | 'verified' | 'invalid';
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [plan, setPlan] = useState<CustomPlan | null>(null);
  const [leads, setLeads] = useState<LeadDelivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (clientId) {
      fetchClientData();
    }
  }, [clientId]);

  const fetchClientData = async () => {
    try {
      setLoading(true);
      
      // Fetch client info
      const clientRes = await fetch(`/api/admin/clients/${clientId}`);
      if (clientRes.ok) {
        const clientData = await clientRes.json();
        setClient(clientData.client);
      }

      // Fetch custom plan
      const planRes = await fetch(`/api/admin/clients/${clientId}/plan`);
      if (planRes.ok) {
        const planData = await planRes.json();
        setPlan(planData.plan);
      }

      // Fetch lead deliveries
      const leadsRes = await fetch(`/api/admin/clients/${clientId}/leads`);
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }

    } catch (error) {
      console.error('Error fetching client data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading client details...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Client Not Found</h2>
          <p className="text-slate-600 mb-6">The client you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/admin/clients">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clients
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      paused: 'bg-gray-100 text-gray-700',
      churned: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const leadsThisMonth = leads.filter(lead => {
    const deliveredDate = new Date(lead.delivered_at);
    const now = new Date();
    return deliveredDate.getMonth() === now.getMonth() && 
           deliveredDate.getFullYear() === now.getFullYear();
  }).length;

  const avgQualityScore = leads.length > 0
    ? Math.round(leads.reduce((sum, lead) => sum + lead.quality_score, 0) / leads.length)
    : 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Link>
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{client.business_name}</h1>
              <Badge className={getStatusBadge(client.status)}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </Badge>
            </div>
            <p className="text-slate-600 text-lg">{client.contact_person}</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href={`/admin/clients/${clientId}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Client
              </Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href={`/admin/clients/${clientId}/plan`}>
                <Settings className="mr-2 h-4 w-4" />
                Manage Plan
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Monthly Revenue</p>
                <p className="text-2xl font-bold text-slate-900">
                  ₹{plan?.monthly_cost?.toLocaleString('en-IN') || '0'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Leads This Month</p>
                <p className="text-2xl font-bold text-slate-900">{leadsThisMonth}</p>
                <p className="text-xs text-slate-500">of {plan?.leads_quota || 0} quota</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Quality Score</p>
                <p className="text-2xl font-bold text-slate-900">{avgQualityScore}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Leads</p>
                <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plan">Plan & Billing</TabsTrigger>
          <TabsTrigger value="leads">Lead Deliveries</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="font-medium">{client.location || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Industry</p>
                    <p className="font-medium">{client.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Client Since</p>
                    <p className="font-medium">
                      {new Date(client.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes & Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 rounded-lg p-4 mb-4 min-h-[150px]">
                  <p className="text-slate-700 whitespace-pre-wrap">
                    {client.notes || 'No notes added yet.'}
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Notes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-auto py-4" asChild>
                  <Link href={`/admin/clients/${clientId}/leads/upload`}>
                    <Upload className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-semibold">Upload Leads</p>
                      <p className="text-xs text-slate-500">Add new lead batch</p>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="justify-start h-auto py-4" asChild>
                  <Link href={`/admin/clients/${clientId}/invoice`}>
                    <FileText className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-semibold">Create Invoice</p>
                      <p className="text-xs text-slate-500">Generate new invoice</p>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="justify-start h-auto py-4">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <p className="font-semibold">Send Message</p>
                    <p className="text-xs text-slate-500">Email or WhatsApp</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plan & Billing Tab */}
        <TabsContent value="plan" className="space-y-6">
          {plan ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Current Plan: {plan.plan_name}</CardTitle>
                  <Badge className={plan.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {plan.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Monthly Cost</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ₹{plan.monthly_cost.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Leads Quota</p>
                    <p className="text-2xl font-bold text-slate-900">{plan.leads_quota}</p>
                    <p className="text-xs text-slate-500">per month</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cost Per Lead</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ₹{Math.round(plan.monthly_cost / plan.leads_quota)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Included Services</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {plan.services && Object.entries(plan.services).map(([service, enabled]) => (
                      enabled && (
                        <div key={service} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-slate-700">{service.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {plan.terms && (
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-slate-900 mb-2">Custom Terms</h3>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-700 whitespace-pre-wrap">{plan.terms}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1" asChild>
                    <Link href={`/admin/clients/${clientId}/plan`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Plan
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    View Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Plan Assigned</h3>
                <p className="text-slate-600 mb-6">This client doesn't have a custom plan yet.</p>
                <Button asChild>
                  <Link href={`/admin/clients/${clientId}/plan`}>
                    Create Custom Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Lead Deliveries Tab */}
        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lead Deliveries ({leads.length})</CardTitle>
                <Button asChild>
                  <Link href={`/admin/clients/${clientId}/leads/upload`}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Leads
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {leads.length > 0 ? (
                <div className="space-y-3">
                  {leads.slice(0, 10).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{lead.lead_name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-slate-600">{lead.lead_email}</span>
                          <span className="text-sm text-slate-600">{lead.lead_phone}</span>
                          <Badge variant="secondary" className="text-xs">
                            {lead.lead_source}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900">{lead.quality_score}%</p>
                          <p className="text-xs text-slate-500">Quality</p>
                        </div>
                        <Badge className={
                          lead.status === 'verified' ? 'bg-green-100 text-green-700' :
                          lead.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                          lead.status === 'invalid' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }>
                          {lead.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {leads.length > 10 && (
                    <div className="text-center pt-4">
                      <Button variant="outline">
                        View All {leads.length} Leads
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No Leads Yet</h3>
                  <p className="text-slate-600 mb-6">Upload the first batch of leads for this client.</p>
                  <Button asChild>
                    <Link href={`/admin/clients/${clientId}/leads/upload`}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Leads
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-600">
                <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p>Activity tracking coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

