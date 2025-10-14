'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  CheckCircle,
  TrendingUp,
  MessageCircle,
  Target,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  Search,
  Facebook,
  Chrome,
  Zap,
} from 'lucide-react';

export default function DashboardOverview() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics/dashboard?period=30');
      const data = await response.json();

      if (response.ok) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Load analytics error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">Loading dashboard...</div>
      </div>
    );
  }

  const { contacts, leads, campaigns, outreach, trends } = analytics || {};

  // Prepare chart data
  const sourceData = [
    { name: 'Outreach', value: leads?.by_source?.outreach || 0, color: '#10b981' },
    { name: 'Meta Ads', value: leads?.by_source?.meta_ads || 0, color: '#3b82f6' },
    { name: 'Google Ads', value: leads?.by_source?.google_ads || 0, color: '#ef4444' },
  ];

  const pipelineData = [
    { status: 'New', count: leads?.by_status?.new || 0 },
    { status: 'Contacted', count: leads?.by_status?.contacted || 0 },
    { status: 'Qualified', count: leads?.by_status?.qualified || 0 },
    { status: 'Won', count: leads?.by_status?.won || 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">Your lead generation performance at a glance</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/contacts')}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-600">Total Contacts</CardTitle>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contacts?.total || 0}</div>
            <div className="text-sm text-gray-500 mt-1">
              {contacts?.pending || 0} pending outreach
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/leads')}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-600">Verified Leads</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{leads?.total || 0}</div>
            <div className="text-sm text-gray-500 mt-1">
              {leads?.by_status?.new || 0} new today
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{outreach?.response_rate || 0}%</div>
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+5% vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-600">Active Campaigns</CardTitle>
              <Target className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{campaigns?.active_campaigns || 0}</div>
            <div className="text-sm text-gray-500 mt-1">
              ₹{(campaigns?.total_spent || 0).toLocaleString()} spent
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Leads by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Zap className="h-4 w-4 text-green-600" />
                  Outreach
                </div>
                <div className="font-bold">{leads?.by_source?.outreach || 0}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Meta
                </div>
                <div className="font-bold">{leads?.by_source?.meta_ads || 0}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Chrome className="h-4 w-4 text-red-600" />
                  Google
                </div>
                <div className="font-bold">{leads?.by_source?.google_ads || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Contacts & Leads Trend (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="contacts" stroke="#8b5cf6" name="Contacts Added" />
              <Line type="monotone" dataKey="leads" stroke="#10b981" name="Verified Leads" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Outreach Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Sent:</span>
              <span className="font-bold">{outreach?.total_sent || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Responses:</span>
              <span className="font-bold text-green-600">{outreach?.total_responses || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Conversions:</span>
              <span className="font-bold text-purple-600">{outreach?.conversions || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Campaign Spending</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Spent:</span>
              <span className="font-bold">₹{(campaigns?.total_spent || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg CPL:</span>
              <span className="font-bold">₹{campaigns?.avg_cpl || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Leads from Ads:</span>
              <span className="font-bold">{campaigns?.leads_from_ads || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Contact Score:</span>
              <span className="font-bold">{contacts?.avg_quality_score || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Lead Score:</span>
              <span className="font-bold">{leads?.avg_quality_score || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Hot Leads:</span>
              <span className="font-bold text-red-600">{leads?.by_intent?.hot || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Button
              onClick={() => router.push('/dashboard/contacts')}
              variant="outline"
              className="h-24 flex-col"
            >
              <Users className="h-8 w-8 mb-2 text-blue-600" />
              <span>View Contacts</span>
              {contacts?.pending > 0 && (
                <Badge className="mt-1">{contacts.pending} pending</Badge>
              )}
            </Button>

            <Button
              onClick={() => router.push('/dashboard/leads')}
              variant="outline"
              className="h-24 flex-col"
            >
              <CheckCircle className="h-8 w-8 mb-2 text-green-600" />
              <span>View Leads</span>
              {leads?.by_status?.new > 0 && (
                <Badge className="mt-1 bg-green-600">{leads.by_status.new} new</Badge>
              )}
            </Button>

            <Button
              onClick={() => router.push('/dashboard/campaigns')}
              variant="outline"
              className="h-24 flex-col"
            >
              <Target className="h-8 w-8 mb-2 text-purple-600" />
              <span>Manage Campaigns</span>
            </Button>

            <Button
              onClick={() => router.push('/dashboard/conversations')}
              variant="outline"
              className="h-24 flex-col"
            >
              <MessageCircle className="h-8 w-8 mb-2 text-orange-600" />
              <span>Conversations</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

