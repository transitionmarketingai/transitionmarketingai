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
import { createClient } from '@supabase/supabase-js';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';

function timeSince(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

function isNewInquiry(dateString: string) {
  if (!dateString) return false;

  const created = new Date(dateString);
  const now = new Date();
  const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
  return diffHours <= 24;
}

function leadAgeDays(dateString: string) {
  if (!dateString) return 0;

  const created = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - created.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const industryColor: Record<string, string> = {
  'Real Estate': 'bg-blue-100 text-blue-700',
  Healthcare: 'bg-purple-100 text-purple-700',
  Education: 'bg-orange-100 text-orange-700',
  'B2B Services': 'bg-indigo-100 text-indigo-700',
  'Startups & SaaS': 'bg-pink-100 text-pink-700',
  Other: 'bg-gray-100 text-gray-700',
};

function isReadyToDeliver(inq: any) {
  return inq.verification_status === 'verified' && !inq.delivered;
}

function aiScoreClass(score: number | null | undefined) {
  if (score === null || score === undefined) return 'text-gray-600';
  if (score >= 70) return 'text-green-700';
  if (score >= 40) return 'text-yellow-700';
  return 'text-red-700';
}

function intentLevel(score: number | null | undefined) {
  if (score === null || score === undefined) return 'unknown';
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

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

  const [inquiries, setInquiries] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'created_desc' | 'created_asc' | 'delivered_desc' | 'delivered_asc'>('created_desc');
  const [search, setSearch] = useState('');
  const [deliveredFilter, setDeliveredFilter] = useState('');
  const [intentFilter, setIntentFilter] = useState('');
  const [readyOnly, setReadyOnly] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

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

  useEffect(() => {
    async function loadInquiries() {
      const { data, error } = await supabase
        .from('verified_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setInquiries(data);
      }
    }

    loadInquiries();
  }, []);

  useEffect(() => {
    async function loadSessions() {
      const { data, error } = await supabase
        .schema('verified')
        .from('sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSessions(data);
      }
    }

    loadSessions();
  }, []);

  // Client-side filtering, searching, and sorting
  const filteredInquiries = inquiries
    .filter((inq) => {
      const text = search;
      if (!text) return true;

      return (
        inq.name?.toLowerCase().includes(text) ||
        inq.phone?.toLowerCase().includes(text) ||
        inq.industry?.toLowerCase().includes(text) ||
        inq.requirement?.toLowerCase().includes(text)
      );
    })
    .filter((inq) => {
      if (!statusFilter) return true;
      return inq.verification_status === statusFilter;
    })
    .filter((inq) => {
      if (!deliveredFilter) return true;
      return String(inq.delivered) === deliveredFilter;
    })
    .filter((inq) => {
      if (!intentFilter) return true;
      const level = intentLevel(inq.ai_score);
      return level === intentFilter;
    })
    .filter((inq) => {
      if (!readyOnly) return true;
      return isReadyToDeliver(inq);
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  // Pagination
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedInquiries = filteredInquiries.slice(start, end);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Navigation */}
      <div className="flex gap-6 mb-8 text-sm border-b border-slate-200 pb-4">
        <Link href="/admin/dashboard" className="text-blue-600 hover:underline font-medium">
          Verified Inquiries
        </Link>
        <Link href="/admin/sessions" className="text-slate-600 hover:text-blue-600 hover:underline">
          Strategy Sessions
        </Link>
      </div>

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

        {/* Forecast Widget */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Next-Month Forecast
            </CardTitle>
            <Link href="/admin/forecast">
              <Button variant="ghost" size="sm">
                View Full Forecast
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Lead Growth</p>
                <p className="text-xl font-bold text-green-600">+12%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Revenue Growth</p>
                <p className="text-xl font-bold text-blue-600">+18%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Churn Risk</p>
                <p className="text-xl font-bold text-red-600">-1 pt</p>
              </div>
            </div>
            <Link href="/admin/forecast" className="text-xs text-blue-600 hover:underline mt-2 block">
              View detailed AI forecast →
            </Link>
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

      {/* Verified Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Verified Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <p className="text-sm text-slate-500">No inquiries found.</p>
          ) : (
            <div>
              {/* Summary Counts */}
              {(() => {
                const totalCount = inquiries.length;
                const verifiedCount = inquiries.filter(
                  (inq) => inq.verification_status === 'verified'
                ).length;
                const deliveredCount = inquiries.filter((inq) => inq.delivered).length;
                const readyCount = inquiries.filter((inq) => isReadyToDeliver(inq)).length;
                const highIntentCount = inquiries.filter(
                  (inq) => intentLevel(inq.ai_score) === 'high'
                ).length;
                const mediumIntentCount = inquiries.filter(
                  (inq) => intentLevel(inq.ai_score) === 'medium'
                ).length;
                const lowIntentCount = inquiries.filter(
                  (inq) => intentLevel(inq.ai_score) === 'low'
                ).length;

                return (
                  <div className="flex flex-wrap gap-4 mb-4 text-xs">
                    <div className="px-3 py-2 border rounded bg-white">
                      <div className="font-semibold">{totalCount}</div>
                      <div className="text-gray-600">Total inquiries</div>
                    </div>

                    <div className="px-3 py-2 border rounded bg-white">
                      <div className="font-semibold">{verifiedCount}</div>
                      <div className="text-gray-600">Verified</div>
                    </div>

                    <div className="px-3 py-2 border rounded bg-white">
                      <div className="font-semibold">{readyCount}</div>
                      <div className="text-gray-600">Ready to Deliver</div>
                    </div>

                    <div className="px-3 py-2 border rounded bg-white">
                      <div className="font-semibold">{deliveredCount}</div>
                      <div className="text-gray-600">Delivered</div>
                    </div>

                    <div className="px-3 py-2 border rounded bg-white">
                      <div className="font-semibold">{highIntentCount}</div>
                      <div className="text-gray-600 text-xs">High Intent</div>
                    </div>

                    <div className="px-3 py-2 border rounded bg-white">
                      <div className="font-semibold">{mediumIntentCount}</div>
                      <div className="text-gray-600 text-xs">Medium Intent</div>
                    </div>

                    <div className="px-3 py-2 border rounded bg-white">
                      <div className="font-semibold">{lowIntentCount}</div>
                      <div className="text-gray-600 text-xs">Low Intent</div>
                    </div>
                  </div>
                );
              })()}

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search inquiries…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  className="border border-slate-300 rounded-md px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />

                {/* Filter Controls */}
                <div className="flex gap-4 text-sm">
                {/* Filter by Status */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>

                {/* Filter by Delivered */}
                <select
                  value={deliveredFilter}
                  onChange={(e) => setDeliveredFilter(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Deliveries</option>
                  <option value="true">Delivered</option>
                  <option value="false">Not Delivered</option>
                </select>

                {/* Filter by AI Intent */}
                <select
                  value={intentFilter}
                  onChange={(e) => setIntentFilter(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Intent Levels</option>
                  <option value="high">High Intent</option>
                  <option value="medium">Medium Intent</option>
                  <option value="low">Low Intent</option>
                  <option value="unknown">No AI Score</option>
                </select>

                {/* Sort Options */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="created_desc">Newest First</option>
                  <option value="created_asc">Oldest First</option>
                  <option value="delivered_desc">Delivered At (Newest)</option>
                  <option value="delivered_asc">Delivered At (Oldest)</option>
                </select>
                </div>

                {/* Ready to Deliver Filter */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={readyOnly}
                    onChange={(e) => setReadyOnly(e.target.checked)}
                  />
                  <span>Show only Ready to Deliver</span>
                </label>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="border p-2 text-left font-semibold text-slate-700">Name</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Phone</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Email</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Industry</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Status</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">AI Score</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">AI Intent</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Delivered</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Lead Age</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Created</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                {paginatedInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className={`border-b hover:bg-slate-50 ${
                      isNewInquiry(inq.created_at) ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="border p-2">
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {inq.name || '-'}
                      </Link>
                      {isNewInquiry(inq.created_at) && (
                        <span className="ml-2 px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded">
                          New
                        </span>
                      )}
                    </td>
                        <td className="border p-2 text-slate-700">
                          {inq.phone || '-'}
                          {inq.phone && <CopyButton text={inq.phone} />}
                        </td>
                        <td className="border p-2 text-slate-700">
                          {inq.email || '—'}
                          {inq.email && <CopyButton text={inq.email} />}
                        </td>
                        <td className="border p-2">
                          <span
                            className={
                              'px-2 py-1 rounded text-xs font-medium ' +
                              (industryColor[inq.industry || ''] || industryColor['Other'])
                            }
                          >
                            {inq.industry || '-'}
                          </span>
                        </td>
                        <td className="border p-2 align-top">
                          <div className="flex flex-col gap-1 text-xs">
                            {/* Status badge */}
                            <span
                              className={
                                'px-2 py-1 rounded font-medium ' +
                                (inq.verification_status === 'verified'
                                  ? 'bg-green-100 text-green-700'
                                  : inq.verification_status === 'pending' || !inq.verification_status
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700')
                              }
                            >
                              {inq.verification_status || 'pending'}
                            </span>

                            {/* Verified at (if available) */}
                            {inq.verified_at && (
                              <span className="text-[11px] text-gray-600">
                                Verified: {new Date(inq.verified_at).toLocaleString()}
                              </span>
                            )}

                            {/* Notes indicator (if available) */}
                            {inq.verification_notes && (
                              <span className="inline-flex items-center text-[11px] text-gray-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></span>
                                Notes added
                              </span>
                            )}

                            {/* Ready to Deliver indicator */}
                            {isReadyToDeliver(inq) && (
                              <span className="mt-1 inline-block px-2 py-1 rounded text-[11px] bg-blue-100 text-blue-700">
                                Ready to Deliver
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="border p-2 text-center">
                          {inq.ai_score !== null && inq.ai_score !== undefined ? (
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${aiScoreClass(inq.ai_score)}`}>
                              {inq.ai_score}
                            </span>
                          ) : (
                            <span className="text-[11px] text-gray-500">—</span>
                          )}
                        </td>
                        <td className="border p-2 text-center">
                          {inq.ai_score !== null && inq.ai_score !== undefined ? (
                            <span
                              className={
                                'px-2 py-1 rounded text-[11px] font-semibold ' +
                                (intentLevel(inq.ai_score) === 'high'
                                  ? 'bg-green-100 text-green-700'
                                  : intentLevel(inq.ai_score) === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700')
                              }
                            >
                              {intentLevel(inq.ai_score) === 'high'
                                ? 'High Intent'
                                : intentLevel(inq.ai_score) === 'medium'
                                ? 'Medium Intent'
                                : 'Low Intent'}
                            </span>
                          ) : (
                            <span className="text-[11px] text-gray-500">No AI score</span>
                          )}
                        </td>
                        <td className="border p-2">
                          {inq.delivered ? (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                              Delivered
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              Not Delivered
                            </span>
                          )}
                        </td>
                        <td className="border p-2 text-slate-600 text-xs">
                          {inq.created_at
                            ? new Date(inq.created_at).toLocaleString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : '-'}
                        </td>
                        <td className="border p-2 text-center">
                          <Link
                            href={`/admin/inquiries/${inq.id}`}
                            className="text-blue-600 hover:underline text-xs"
                          >
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between gap-4 mt-4">
                <div className="text-sm text-slate-600">
                  Showing {start + 1}-{Math.min(end, filteredInquiries.length)} of {filteredInquiries.length} inquiries
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="border border-slate-300 rounded-md px-4 py-2 text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      if (end < filteredInquiries.length) {
                        setPage((p) => p + 1);
                      }
                    }}
                    disabled={end >= filteredInquiries.length}
                    className="border border-slate-300 rounded-md px-4 py-2 text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strategy Call Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Strategy Call Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-sm text-slate-500">No sessions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="border p-2 text-left font-semibold text-slate-700">Name</th>
                    <th className="border p-2 text-left font-semibold text-slate-700">Phone</th>
                    <th className="border p-2 text-left font-semibold text-slate-700">Industry</th>
                    <th className="border p-2 text-left font-semibold text-slate-700">Revenue Range</th>
                    <th className="border p-2 text-left font-semibold text-slate-700">Inquiry Volume</th>
                    <th className="border p-2 text-left font-semibold text-slate-700">UTM</th>
                    <th className="border p-2 text-left font-semibold text-slate-700">Referrer</th>
                    <th className="border p-2 text-left font-semibold text-slate-700">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="border p-2 text-slate-900">
                        <Link
                          href={`/admin/sessions/${s.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {s.name || '-'}
                        </Link>
                      </td>
                      <td className="border p-2 text-slate-700">{s.phone || '-'}</td>
                      <td className="border p-2 text-slate-700">{s.industry || '-'}</td>
                      <td className="border p-2 text-slate-700">{s.revenue_range || '-'}</td>
                      <td className="border p-2 text-slate-700">{s.inquiry_volume || '-'}</td>
                      <td className="border p-2">
                        <pre className="text-xs whitespace-pre-wrap text-slate-700">
                          {s.utm ? JSON.stringify(s.utm, null, 2) : '—'}
                        </pre>
                      </td>
                      <td className="border p-2 text-slate-700">{s.referrer || '—'}</td>
                      <td className="border p-2 text-slate-600 text-xs">
                        {s.created_at
                          ? new Date(s.created_at).toLocaleString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

