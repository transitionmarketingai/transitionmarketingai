'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  IndianRupee,
  Users,
  TrendingUp,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalClients: number;
  activeClients: number;
  totalLeadsDelivered: number;
  leadsThisMonth: number;
  avgQualityScore: number;
  pendingInvoices: number;
  paidInvoices: number;
  overdueInvoices: number;
}

interface ClientBreakdown {
  active: number;
  pending: number;
  paused: number;
  churned: number;
}

interface RevenueByMonth {
  month: string;
  revenue: number;
  clients: number;
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30');
  const [loading, setLoading] = useState(true);
  
  // Mock data - replace with real API calls
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 450000,
    monthlyRevenue: 125000,
    totalClients: 24,
    activeClients: 18,
    totalLeadsDelivered: 1250,
    leadsThisMonth: 320,
    avgQualityScore: 87,
    pendingInvoices: 5,
    paidInvoices: 18,
    overdueInvoices: 2,
  });

  const [clientBreakdown, setClientBreakdown] = useState<ClientBreakdown>({
    active: 18,
    pending: 3,
    paused: 2,
    churned: 1,
  });

  const [revenueByMonth, setRevenueByMonth] = useState<RevenueByMonth[]>([
    { month: 'Jan', revenue: 85000, clients: 12 },
    { month: 'Feb', revenue: 95000, clients: 15 },
    { month: 'Mar', revenue: 105000, clients: 17 },
    { month: 'Apr', revenue: 125000, clients: 18 },
  ]);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(false);
      // Implement real API calls here
      // const response = await fetch(`/api/admin/analytics?range=${timeRange}`);
      // const data = await response.json();
      // setStats(data.stats);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics & Reports</h1>
            <p className="text-slate-600">Business insights and performance metrics</p>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">
                +12%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                ₹{stats.monthlyRevenue.toLocaleString('en-IN')} this month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">
                {stats.activeClients} active
              </Badge>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Clients</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalClients}</p>
              <p className="text-xs text-slate-500 mt-1">
                {stats.activeClients} active clients
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <Badge className="bg-purple-100 text-purple-700">
                {stats.avgQualityScore}%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Leads Delivered</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalLeadsDelivered}</p>
              <p className="text-xs text-slate-500 mt-1">
                {stats.leadsThisMonth} this month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <Badge className="bg-amber-100 text-amber-700">
                {Math.round((stats.paidInvoices / (stats.paidInvoices + stats.pendingInvoices + stats.overdueInvoices)) * 100)}%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Invoice Status</p>
              <p className="text-2xl font-bold text-slate-900">{stats.paidInvoices} Paid</p>
              <p className="text-xs text-slate-500 mt-1">
                {stats.pendingInvoices} pending, {stats.overdueInvoices} overdue
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByMonth.map((month) => (
                    <div key={month.month}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{month.month} 2025</span>
                        <span className="text-sm font-bold text-slate-900">
                          ₹{month.revenue.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(month.revenue / 150000) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{month.clients} clients</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Client Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Client Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      <span className="font-medium text-slate-700">Active</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{clientBreakdown.active}</p>
                      <p className="text-xs text-slate-500">
                        {Math.round((clientBreakdown.active / stats.totalClients) * 100)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                      <span className="font-medium text-slate-700">Pending</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{clientBreakdown.pending}</p>
                      <p className="text-xs text-slate-500">
                        {Math.round((clientBreakdown.pending / stats.totalClients) * 100)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                      <span className="font-medium text-slate-700">Paused</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{clientBreakdown.paused}</p>
                      <p className="text-xs text-slate-500">
                        {Math.round((clientBreakdown.paused / stats.totalClients) * 100)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      <span className="font-medium text-slate-700">Churned</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{clientBreakdown.churned}</p>
                      <p className="text-xs text-slate-500">
                        {Math.round((clientBreakdown.churned / stats.totalClients) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Invoice #INV-1234 paid</p>
                    <p className="text-sm text-slate-600">ABC Real Estate - ₹25,000</p>
                  </div>
                  <span className="text-sm text-slate-500">2 hours ago</span>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">New client onboarded</p>
                    <p className="text-sm text-slate-600">XYZ Healthcare - Growth Plan</p>
                  </div>
                  <span className="text-sm text-slate-500">5 hours ago</span>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Lead batch delivered</p>
                    <p className="text-sm text-slate-600">50 leads to DEF Consulting</p>
                  </div>
                  <span className="text-sm text-slate-500">1 day ago</span>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Invoice overdue</p>
                    <p className="text-sm text-slate-600">GHI Manufacturing - ₹15,000</p>
                  </div>
                  <span className="text-sm text-slate-500">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Advanced revenue charts coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Client Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Client growth charts coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leads Tab */}
        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Lead Delivery Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Lead performance charts coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

