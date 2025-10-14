'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowLeft,
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Target,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { formatIndianCurrency } from '@/types/india-leadgen';

export default function AdminCustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.customerId as string;

  const [customer, setCustomer] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomerData();
  }, [customerId]);

  async function loadCustomerData() {
    const supabase = createClient();

    try {
      // Get customer
      const { data: customerData } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single();

      setCustomer(customerData);

      // Get subscription
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select('*, plan:subscription_plans(*)')
        .eq('customer_id', customerId)
        .eq('status', 'active')
        .single();

      setSubscription(subscriptionData);

      // Get campaigns
      const { data: campaignsData } = await supabase
        .from('ad_campaigns')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      setCampaigns(campaignsData || []);

      // Get leads
      const { data: leadsData } = await supabase
        .from('leads')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false })
        .limit(50);

      setLeads(leadsData || []);

    } catch (error) {
      console.error('Error loading customer:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Customer Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/admin')}>
              Back to Admin Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/admin')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {customer.business_name}
              </h1>
              <p className="text-sm text-gray-500">
                Customer since {new Date(customer.created_at).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p className="font-medium">{customer.contact_person}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{customer.email}</p>
                  </div>
                </div>
                {customer.service_areas && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Service Areas</p>
                      <p className="font-medium">
                        {customer.service_areas.cities?.join(', ') || 'N/A'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscription Info */}
            {subscription && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Plan</p>
                    <p className="font-medium capitalize">{customer.current_plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className={
                      subscription.is_trial ? 'bg-yellow-500' :
                      subscription.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                    }>
                      {subscription.is_trial ? 'Trial' : subscription.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quota Usage</p>
                    <p className="font-medium">
                      {subscription.leads_used_this_period} / {subscription.leads_quota}
                    </p>
                  </div>
                  {subscription.overage_leads > 0 && (
                    <div>
                      <p className="text-sm text-gray-500">Overage Leads</p>
                      <p className="font-medium text-orange-600">
                        {subscription.overage_leads} leads
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button className="w-full" variant="outline">
                  Setup Campaign
                </Button>
                <Button className="w-full" variant="outline" className="text-red-600">
                  Pause Account
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="leads" className="space-y-6">
              <TabsList>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              {/* Leads Tab */}
              <TabsContent value="leads">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name || 'Unknown'}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {lead.phone && <p>{lead.phone}</p>}
                                {lead.email && <p className="text-gray-500">{lead.email}</p>}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={lead.quality_score >= 70 ? 'default' : 'outline'}>
                                {lead.quality_score}/100
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {lead.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {new Date(lead.created_at).toLocaleDateString('en-IN')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Campaigns Tab */}
              <TabsContent value="campaigns">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Ad Campaigns</CardTitle>
                      <Button>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Create Campaign
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {campaigns.length === 0 ? (
                      <div className="text-center py-12">
                        <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No campaigns yet</p>
                        <Button>Setup First Campaign</Button>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Platform</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Leads</TableHead>
                            <TableHead>CPL</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {campaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                              <TableCell className="font-medium">
                                {campaign.campaign_name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {campaign.platform}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {formatIndianCurrency(campaign.daily_budget)}/day
                              </TableCell>
                              <TableCell>{campaign.leads_generated || 0}</TableCell>
                              <TableCell>
                                {campaign.cpl 
                                  ? formatIndianCurrency(campaign.cpl) 
                                  : 'N/A'}
                              </TableCell>
                              <TableCell>
                                <Badge className={
                                  campaign.status === 'active' ? 'bg-green-500' :
                                  campaign.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-500'
                                }>
                                  {campaign.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{leads.length}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Avg Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {leads.length > 0
                          ? (leads.reduce((sum, l) => sum + l.quality_score, 0) / leads.length).toFixed(0)
                          : 0}/100
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {leads.length > 0
                          ? ((leads.filter(l => l.is_converted).length / leads.length) * 100).toFixed(1)
                          : 0}%
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {campaigns.length > 0
                          ? formatIndianCurrency(campaigns.reduce((sum, c) => sum + (c.amount_spent || 0), 0))
                          : '₹0'}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Billing Tab */}
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Billing information will appear here</p>
                    {/* TODO: Add invoices table */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}


