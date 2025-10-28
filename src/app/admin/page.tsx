'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  LayoutDashboard,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Settings,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Pause,
  Play,
  Link as LinkIcon,
  UserCog,
  Bell,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Star,
  Phone,
  Mail,
  MapPin,
  Home,
  ShieldCheck,
  CreditCard,
  Calendar
} from 'lucide-react';
import Logo from '@/components/Logo';
import Link from 'next/link';

// Demo data for admin
const ADMIN_STATS = {
  totalCustomers: 47,
  activeSubscriptions: 42,
  trialSubscriptions: 8,
  leadsDeliveredToday: 127,
  monthlyRevenue: 629958,
  adSpendToday: 42350,
  profitMargin: 33,
  activeCampaigns: 95,
  avgQualityScore: 84,
  refundRate: 1.2
};

const CUSTOMERS = [
  {
    id: 'C001',
    businessName: 'ABC Real Estate',
    contactPerson: 'Rahul Sharma',
    email: 'rahul@abcrealestate.com',
    phone: '+91 98765 43210',
    plan: 'Growth',
    mrr: 14999,
    status: 'active',
    leadsUsed: 48,
    leadsQuota: 50,
    joinedDate: 'Dec 15, 2023',
    industry: 'Real Estate',
    campaigns: 3,
    satisfaction: 4.8
  },
  {
    id: 'C002',
    businessName: 'XYZ Insurance Brokers',
    contactPerson: 'Priya Mehta',
    email: 'priya@xyzinsurance.com',
    phone: '+91 98123 45678',
    plan: 'Professional',
    mrr: 29999,
    status: 'active',
    leadsUsed: 115,
    leadsQuota: 120,
    joinedDate: 'Nov 20, 2023',
    industry: 'Insurance',
    campaigns: 5,
    satisfaction: 4.9
  },
  {
    id: 'C003',
    businessName: 'PQR Coaching Institute',
    contactPerson: 'Amit Kumar',
    email: 'amit@pqrcoaching.com',
    phone: '+91 97654 32109',
    plan: 'Starter',
    mrr: 7999,
    status: 'trial',
    leadsUsed: 18,
    leadsQuota: 20,
    joinedDate: 'Jan 10, 2024',
    industry: 'Education',
    campaigns: 2,
    satisfaction: 4.5
  },
  {
    id: 'C004',
    businessName: 'LMN Finance Solutions',
    contactPerson: 'Sneha Patel',
    email: 'sneha@lmnfinance.com',
    phone: '+91 96543 21098',
    plan: 'Growth',
    mrr: 0,
    status: 'paused',
    leadsUsed: 0,
    leadsQuota: 50,
    joinedDate: 'Sep 5, 2023',
    industry: 'Finance',
    campaigns: 0,
    satisfaction: 3.2
  }
];

const ALL_CAMPAIGNS = [
  {
    id: 'CAM001',
    name: '3BHK Andheri Campaign',
    customer: 'ABC Real Estate',
    customerId: 'C001',
    platform: 'Facebook',
    status: 'active',
    leads: 28,
    cpl: 302,
    budget: 15000,
    spent: 8456,
    impressions: '45.2K',
    clicks: 892,
    ctr: 1.97,
    quality: 87
  },
  {
    id: 'CAM002',
    name: 'Health Insurance Leads',
    customer: 'XYZ Insurance',
    customerId: 'C002',
    platform: 'Google',
    status: 'active',
    leads: 45,
    cpl: 215,
    budget: 20000,
    spent: 9675,
    impressions: '32.8K',
    clicks: 654,
    ctr: 1.99,
    quality: 91
  },
  {
    id: 'CAM003',
    name: 'JEE Coaching Students',
    customer: 'PQR Coaching',
    customerId: 'C003',
    platform: 'Facebook',
    status: 'low-performance',
    leads: 12,
    cpl: 450,
    budget: 10000,
    spent: 5400,
    impressions: '18.5K',
    clicks: 245,
    ctr: 1.32,
    quality: 78
  }
];

const ALL_LEADS = [
  {
    id: 'L001',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.k@email.com',
    customer: 'ABC Real Estate',
    customerId: 'C001',
    score: 92,
    status: 'delivered',
    property: '3BHK Apartment',
    budget: '₹80L-₹1Cr',
    location: 'Andheri West',
    source: 'Facebook',
    campaign: '3BHK Andheri Campaign',
    delivered: '5 mins ago'
  },
  {
    id: 'L002',
    name: 'Priya Sharma',
    phone: '+91 98123 45678',
    email: 'priya.s@email.com',
    customer: 'ABC Real Estate',
    customerId: 'C001',
    score: 88,
    status: 'delivered',
    property: '2BHK Apartment',
    budget: '₹60L-₹80L',
    location: 'Powai',
    source: 'Google',
    campaign: 'Budget Homes Campaign',
    delivered: '2 hours ago'
  },
  {
    id: 'L003',
    name: 'Invalid Lead',
    phone: '+91 00000 00000',
    email: 'invalid@test.com',
    customer: 'XYZ Insurance',
    customerId: 'C002',
    score: 42,
    status: 'rejected',
    property: 'Health Insurance',
    budget: '₹15K-₹20K',
    location: 'Mumbai',
    source: 'Facebook',
    campaign: 'Health Insurance Leads',
    delivered: '1 day ago'
  }
];

const SUPPORT_TICKETS = [
  {
    id: 'T001',
    customer: 'ABC Real Estate',
    subject: 'Lead phone number invalid',
    priority: 'high',
    status: 'open',
    lastUpdate: '2 hours ago',
    assignedTo: 'Support Agent'
  },
  {
    id: 'T002',
    customer: 'XYZ Insurance',
    subject: 'Need more health insurance leads',
    priority: 'medium',
    status: 'open',
    lastUpdate: '1 day ago',
    assignedTo: 'Campaign Manager'
  },
  {
    id: 'T003',
    customer: 'PQR Coaching',
    subject: 'Change target areas',
    priority: 'low',
    status: 'resolved',
    lastUpdate: '2 days ago',
    assignedTo: 'Support Agent'
  }
];

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof CUSTOMERS[0] | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof ALL_CAMPAIGNS[0] | null>(null);
  const [selectedLead, setSelectedLead] = useState<typeof ALL_LEADS[0] | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');

  const filteredCustomers = CUSTOMERS.filter(c => {
    const matchesSearch = c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || c.plan.toLowerCase() === filterPlan;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentView === 'overview' && 'Platform Overview'}
              {currentView === 'customers' && 'Customer Management'}
              {currentView === 'campaigns' && 'Campaign Management'}
              {currentView === 'leads' && 'All Leads'}
              {currentView === 'support' && 'Customer Support'}
              {currentView === 'billing' && 'Billing & Revenue'}
              {currentView === 'analytics' && 'Platform Analytics'}
              {currentView === 'integrations' && 'Integrations'}
              {currentView === 'team' && 'Team Management'}
              {currentView === 'settings' && 'System Settings'}
            </h1>
            <p className="text-sm text-gray-600">Manage your lead generation platform</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* View Selector Tabs */}
        <div className="flex gap-2 border-b">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'customers', label: 'Customers' },
            { id: 'campaigns', label: 'Campaigns' },
            { id: 'support', label: 'Support' },
            { id: 'billing', label: 'Billing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                currentView === tab.id
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* OVERVIEW */}
        {currentView === 'overview' && (
          <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Customers</p>
                        <p className="text-3xl font-bold text-gray-900">{ADMIN_STATS.totalCustomers}</p>
                        <p className="text-xs text-green-600 flex items-center mt-2">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          +3 this week
                        </p>
                      </div>
                      <Users className="h-10 w-10 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Monthly Revenue (MRR)</p>
                        <p className="text-3xl font-bold text-green-600">₹{ADMIN_STATS.monthlyRevenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-2">33% profit margin</p>
                      </div>
                      <DollarSign className="h-10 w-10 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Leads Today</p>
                        <p className="text-3xl font-bold text-gray-900">{ADMIN_STATS.leadsDeliveredToday}</p>
                        <p className="text-xs text-gray-500 mt-2">Across {ADMIN_STATS.activeSubscriptions} customers</p>
                      </div>
                      <TrendingUp className="h-10 w-10 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Campaigns</p>
                        <p className="text-3xl font-bold text-gray-900">{ADMIN_STATS.activeCampaigns}</p>
                        <p className="text-xs text-gray-500 mt-2">Avg CPL: ₹285</p>
                      </div>
                      <Target className="h-10 w-10 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { type: 'warning', icon: AlertCircle, text: '3 campaigns need attention (low performance)', color: 'text-yellow-600 bg-yellow-50' },
                      { type: 'info', icon: Users, text: '2 customers approaching quota limit (95%+)', color: 'text-blue-600 bg-blue-50' },
                      { type: 'success', icon: CheckCircle, text: '5 new signups today', color: 'text-green-600 bg-green-50' },
                      { type: 'info', icon: CreditCard, text: '4 subscription renewals tomorrow', color: 'text-purple-600 bg-purple-50' },
                    ].map((alert, idx) => (
                      <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${alert.color}`}>
                        <alert.icon className="h-5 w-5" />
                        <span className="text-sm font-medium flex-1">{alert.text}</span>
                        <Button size="sm" variant="ghost">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { time: '2 mins ago', text: 'New customer: "XYZ Interiors" signed up (Growth Plan)', icon: Users },
                        { time: '15 mins ago', text: 'Lead delivered: Rajesh Kumar → ABC Real Estate', icon: Home },
                        { time: '1 hour ago', text: 'Campaign optimized: 3BHK Andheri (CPL: ₹302)', icon: Target },
                        { time: '3 hours ago', text: 'Refund processed: Invalid lead for PQR Insurance', icon: CreditCard },
                        { time: 'Yesterday', text: 'Subscription renewed: ABC Real Estate (₹14,999)', icon: CheckCircle },
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <activity.icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">{activity.text}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Average Quality Score</span>
                        <span className="text-xl font-bold text-gray-900">{ADMIN_STATS.avgQualityScore}/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Refund Rate</span>
                        <span className="text-xl font-bold text-green-600">{ADMIN_STATS.refundRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Customer Satisfaction</span>
                        <span className="text-xl font-bold text-gray-900">4.6/5.0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Churn Rate</span>
                        <span className="text-xl font-bold text-green-600">8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        )}

        {/* CUSTOMERS */}
        {currentView === 'customers' && (
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search customers..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="trial">Trial</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterPlan} onValueChange={setFilterPlan}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Plans</SelectItem>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-blue-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Customer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCustomers.map((customer) => (
                  <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">{customer.businessName.charAt(0)}</span>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{customer.businessName}</CardTitle>
                            <CardDescription>{customer.contactPerson}</CardDescription>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={
                                customer.status === 'active' ? 'default' :
                                customer.status === 'trial' ? 'secondary' :
                                'outline'
                              }>
                                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                              </Badge>
                              <Badge variant="outline">{customer.plan} Plan</Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {customer.satisfaction}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Industry</p>
                            <p className="font-semibold">{customer.industry}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Joined</p>
                            <p className="font-semibold">{customer.joinedDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">MRR</p>
                            <p className="font-semibold text-green-600">₹{customer.mrr.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Campaigns</p>
                            <p className="font-semibold">{customer.campaigns} active</p>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Lead Usage</span>
                            <span className="text-sm font-semibold">{customer.leadsUsed}/{customer.leadsQuota}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                (customer.leadsUsed / customer.leadsQuota) * 100 > 90 ? 'bg-red-500' : 'bg-blue-600'
                              }`}
                              style={{ width: `${(customer.leadsUsed / customer.leadsQuota) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-3 border-t">
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                            setSelectedCustomer(customer);
                            setShowCustomerModal(true);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* CAMPAIGNS */}
        {currentView === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Showing {ALL_CAMPAIGNS.length} campaigns across {CUSTOMERS.length} customers</p>
                </div>
                <Button className="bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </div>

              <div className="space-y-4">
                {ALL_CAMPAIGNS.map((campaign) => (
                  <Card key={campaign.id} className={`${campaign.status === 'low-performance' ? 'border-yellow-500 border-2' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                            <Badge className={`${
                              campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                              campaign.status === 'low-performance' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {campaign.status === 'low-performance' ? '⚠️ Needs Attention' : 'Active'}
                            </Badge>
                            <Badge variant="outline">{campaign.platform}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Customer: <Link href="#" className="text-blue-600 hover:underline">{campaign.customer}</Link>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedCampaign(campaign);
                            setShowCampaignModal(true);
                          }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {campaign.status === 'active' ? (
                            <Button size="sm" variant="outline">
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-4">
                        <div>
                          <p className="text-xs text-gray-600">Leads</p>
                          <p className="text-lg font-bold">{campaign.leads}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">CPL</p>
                          <p className="text-lg font-bold">₹{campaign.cpl}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Impressions</p>
                          <p className="text-lg font-bold">{campaign.impressions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Clicks</p>
                          <p className="text-lg font-bold">{campaign.clicks}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">CTR</p>
                          <p className="text-lg font-bold">{campaign.ctr}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Quality</p>
                          <p className="text-lg font-bold">{campaign.quality}/100</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Budget: ₹{campaign.budget.toLocaleString()} | Spent: ₹{campaign.spent.toLocaleString()}</span>
                          <span className="font-semibold">{Math.round((campaign.spent / campaign.budget) * 100)}% used</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* SUPPORT TICKETS */}
        {currentView === 'support' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Support Tickets</CardTitle>
                      <CardDescription>{SUPPORT_TICKETS.filter(t => t.status === 'open').length} open tickets</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{SUPPORT_TICKETS.filter(t => t.priority === 'high').length} High Priority</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {SUPPORT_TICKETS.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            ticket.priority === 'high' ? 'bg-red-100' :
                            ticket.priority === 'medium' ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <MessageSquare className={`h-5 w-5 ${
                              ticket.priority === 'high' ? 'text-red-600' :
                              ticket.priority === 'medium' ? 'text-yellow-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-semibold text-gray-900">#{ticket.id} - {ticket.subject}</h4>
                              <Badge className={`${
                                ticket.status === 'open' ? 'bg-blue-100 text-blue-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                              </Badge>
                              <Badge variant="outline" className={`${
                                ticket.priority === 'high' ? 'border-red-600 text-red-700' :
                                ticket.priority === 'medium' ? 'border-yellow-600 text-yellow-700' :
                                'border-gray-400 text-gray-600'
                              }`}>
                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">Customer: {ticket.customer}</p>
                            <p className="text-xs text-gray-500 mt-1">Assigned: {ticket.assignedTo} • {ticket.lastUpdate}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Ticket
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* BILLING */}
        {currentView === 'billing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600">MRR (Monthly Recurring)</p>
                    <p className="text-3xl font-bold text-green-600">₹{ADMIN_STATS.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center mt-2">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      +₹29,998 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600">Ad Spend (This Month)</p>
                    <p className="text-3xl font-bold text-gray-900">₹4,20,000</p>
                    <p className="text-xs text-gray-500 mt-2">From customer subscriptions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600">Gross Profit</p>
                    <p className="text-3xl font-bold text-green-600">₹2,09,958</p>
                    <p className="text-xs text-gray-500 mt-2">33% margin</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown by Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { plan: 'Starter', price: 7999, customers: 15, revenue: 119985, color: 'bg-blue-600' },
                      { plan: 'Growth', price: 14999, customers: 22, revenue: 329978, color: 'bg-green-600' },
                      { plan: 'Professional', price: 29999, customers: 5, revenue: 149995, color: 'bg-purple-600' },
                    ].map((plan) => (
                      <div key={plan.plan}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-semibold text-gray-900">{plan.plan} Plan</span>
                            <span className="text-sm text-gray-600 ml-2">({plan.customers} customers × ₹{plan.price.toLocaleString()})</span>
                          </div>
                          <span className="font-bold text-gray-900">₹{plan.revenue.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className={`${plan.color} h-3 rounded-full`} style={{ width: `${(plan.revenue / ADMIN_STATS.monthlyRevenue) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Customer Detail Modal */}
      <Dialog open={showCustomerModal} onOpenChange={setShowCustomerModal}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCustomer?.businessName} - Customer Details</DialogTitle>
            <DialogDescription>Complete account information and performance</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer ID:</span>
                        <span className="font-medium">{selectedCustomer.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact:</span>
                        <span className="font-medium">{selectedCustomer.contactPerson}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedCustomer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Joined:</span>
                        <span className="font-medium">{selectedCustomer.joinedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Subscription</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium">{selectedCustomer.plan} Plan</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">MRR:</span>
                        <span className="font-medium text-green-600">₹{selectedCustomer.mrr.toLocaleString()}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge>{selectedCustomer.status}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Leads Quota:</span>
                        <span className="font-medium">{selectedCustomer.leadsQuota}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Usage:</span>
                        <span className="font-medium">{selectedCustomer.leadsUsed}/{selectedCustomer.leadsQuota} ({Math.round((selectedCustomer.leadsUsed/selectedCustomer.leadsQuota)*100)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Campaigns:</span>
                        <span className="font-medium">{selectedCustomer.campaigns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Satisfaction:</span>
                        <span className="font-medium flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-600 fill-yellow-600" />
                          {selectedCustomer.satisfaction}/5.0
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact Rate:</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversion Rate:</span>
                        <span className="font-medium">16.7%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Financial</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lifetime Value:</span>
                        <span className="font-medium">₹89,994</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ad Spend Allocated:</span>
                        <span className="font-medium">₹10,000/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Our Margin:</span>
                        <span className="font-medium text-green-600">₹4,999/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Customer
                </Button>
                <Button variant="outline" className="flex-1">
                  View Leads
                </Button>
                <Button variant="outline" className="flex-1">
                  Manage Campaigns
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Campaign Detail Modal */}
      <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCampaign?.name}</DialogTitle>
            <DialogDescription>Campaign performance and settings</DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Leads Generated</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedCampaign.leads}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Cost Per Lead</p>
                  <p className="text-2xl font-bold text-gray-900">₹{selectedCampaign.cpl}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Quality Score</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedCampaign.quality}/100</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impressions:</span>
                    <span className="font-semibold">{selectedCampaign.impressions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clicks:</span>
                    <span className="font-semibold">{selectedCampaign.clicks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CTR:</span>
                    <span className="font-semibold">{selectedCampaign.ctr}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-semibold">₹{selectedCampaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spent:</span>
                    <span className="font-semibold">₹{selectedCampaign.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-semibold">₹{(selectedCampaign.budget - selectedCampaign.spent).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedCampaign.status === 'low-performance' && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-900">
                    <strong>⚠️ Low Performance Detected</strong><br />
                    CPL is ₹{selectedCampaign.cpl} (target: ₹300). Consider optimizing targeting or pausing this campaign.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Campaign
                </Button>
                <Button variant="outline" className="flex-1">
                  {selectedCampaign.status === 'active' ? (
                    <><Pause className="h-4 w-4 mr-2" />Pause</>
                  ) : (
                    <><Play className="h-4 w-4 mr-2" />Resume</>
                  )}
                </Button>
                <Button variant="outline" className="flex-1">
                  View in {selectedCampaign.platform}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Campaign Detail Modal */}
      <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8 text-gray-600">
            Campaign detail modal coming soon...
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
