'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';

function isFreshSession(dateString: string) {
  if (!dateString) return false;

  const created = new Date(dateString);
  const now = new Date();
  const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
  return diffHours <= 24;
}

function sessionAgeDays(dateString: string) {
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

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [industryFilter, setIndustryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

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
  const filteredSessions = sessions
    .filter((s) => {
      const text = search;
      if (!text) return true;

      return (
        s.name?.toLowerCase().includes(text) ||
        s.phone?.toLowerCase().includes(text) ||
        s.industry?.toLowerCase().includes(text)
      );
    })
    .filter((s) => {
      if (!industryFilter) return true;
      return s.industry === industryFilter;
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
  const paginatedSessions = filteredSessions.slice(start, end);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Navigation */}
      <div className="flex gap-6 mb-8 text-sm border-b border-slate-200 pb-4">
        <Link href="/admin/dashboard" className="text-slate-600 hover:text-blue-600 hover:underline">
          Verified Inquiries
        </Link>
        <Link href="/admin/sessions" className="text-blue-600 hover:underline font-medium">
          Strategy Sessions
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Strategy Sessions</h1>
        <p className="text-slate-600 mt-1">
          View all strategy call session bookings.
        </p>
      </div>

      {/* Strategy Call Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Strategy Call Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-sm text-slate-500">No sessions found.</p>
          ) : (
            <div>
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search sessions…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  className="border border-slate-300 rounded-md px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />

                {/* Filter Controls */}
                <div className="flex gap-4 text-sm">
                {/* Filter by Industry */}
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Industries</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="B2B Services">B2B Services</option>
                  <option value="Startups & SaaS">Startups & SaaS</option>
                  <option value="Other">Other</option>
                </select>

                {/* Sort by Date */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="border p-2 text-left font-semibold text-slate-700">Name</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Phone</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Industry</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Revenue Range</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Inquiry Volume</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Session Age</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">UTM</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Referrer</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Created</th>
                      <th className="border p-2 text-left font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                {paginatedSessions.map((s) => (
                  <tr
                    key={s.id}
                    className={`border-b hover:bg-slate-50 ${
                      isFreshSession(s.created_at) ? 'bg-green-50' : ''
                    }`}
                  >
                    <td className="border p-2">
                      <Link
                        href={`/admin/sessions/${s.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {s.name || '-'}
                      </Link>
                      {isFreshSession(s.created_at) && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-200 text-green-800 rounded">
                          Fresh
                        </span>
                      )}
                    </td>
                        <td className="border p-2 text-slate-700">
                          {s.phone || '-'}
                          {s.phone && <CopyButton text={s.phone} />}
                        </td>
                        <td className="border p-2">
                          <span
                            className={
                              'px-2 py-1 rounded text-xs font-medium ' +
                              (industryColor[s.industry || ''] || industryColor['Other'])
                            }
                          >
                            {s.industry || '-'}
                          </span>
                        </td>
                        <td className="border p-2 text-slate-700">{s.revenue_range || '-'}</td>
                    <td className="border p-2 text-slate-700">{s.inquiry_volume || '-'}</td>
                    <td className="border p-2 text-center">{sessionAgeDays(s.created_at)} days</td>
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
                        <td className="border p-2 text-center">
                          <Link
                            href={`/admin/sessions/${s.id}`}
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
                  Showing {start + 1}-{Math.min(end, filteredSessions.length)} of {filteredSessions.length} sessions
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
                      if (end < filteredSessions.length) {
                        setPage((p) => p + 1);
                      }
                    }}
                    disabled={end >= filteredSessions.length}
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
    </div>
  );
}

