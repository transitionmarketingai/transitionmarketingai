'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  DollarSign,
  Package,
  Ticket,
  TrendingUp,
  AlertCircle,
  Plus,
  Upload,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    mrr: 0,
    leadsDelivered: 0,
    openTickets: 0,
    upcomingConsultations: 0,
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'client', message: 'New client: ABC Real Estate added', time: '2 hours ago' },
    { id: 2, type: 'lead', message: '50 leads delivered to Tech Corp', time: '4 hours ago' },
    { id: 3, type: 'payment', message: 'Payment received from Prime Retail (₹75,000)', time: '1 day ago' },
    { id: 4, type: 'ticket', message: 'Support ticket #1234 resolved', time: '1 day ago' },
  ]);

  useEffect(() => {
    // TODO: Fetch real stats from API
    setStats({
      totalClients: 47,
      activeClients: 42,
      mrr: 1645000,
      leadsDelivered: 4720,
      openTickets: 12,
      upcomingConsultations: 5,
    });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/admin/clients/new">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </Link>
        <Link href="/admin/leads/upload">
          <Button className="w-full justify-start" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Leads
          </Button>
        </Link>
        <Link href="/admin/billing/invoice/new">
          <Button className="w-full justify-start" variant="outline">
            <DollarSign className="h-4 w-4 mr-2" />
            Generate Invoice
          </Button>
        </Link>
        <Link href="/admin/consultations">
          <Button className="w-full justify-start" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Consultations
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Clients
            </CardTitle>
            <Users className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.totalClients}</div>
            <p className="text-sm text-slate-500 mt-1">
              <span className="text-green-600 font-medium">{stats.activeClients} active</span>
            </p>
          </CardContent>
        </Card>

        {/* MRR */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Monthly Recurring Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              ₹{(stats.mrr / 100000).toFixed(2)}L
            </div>
            <p className="text-sm text-slate-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+10.8%</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Leads Delivered */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Leads Delivered
            </CardTitle>
            <Package className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.leadsDelivered}</div>
            <p className="text-sm text-slate-500 mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        {/* Open Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Open Tickets
            </CardTitle>
            <Ticket className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.openTickets}</div>
            <p className="text-sm text-slate-500 mt-1">
              <Link href="/admin/support" className="text-blue-600 hover:underline">
                View all tickets
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Upcoming Consultations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Upcoming Consultations
            </CardTitle>
            <Calendar className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.upcomingConsultations}</div>
            <p className="text-sm text-slate-500 mt-1">
              This week
            </p>
          </CardContent>
        </Card>

        {/* Avg Cost Per Lead */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg Cost Per Lead
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">₹348</div>
            <p className="text-sm text-slate-500 mt-1">
              Across all clients
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <AlertCircle className="h-5 w-5" />
            Attention Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-orange-900">
                3 clients' payments failed
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Retry payments or contact clients
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-orange-300">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-orange-900">
                8 clients due for renewal this week
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Send renewal reminders
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-orange-300">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

