'use client';

import { useMemo, useState } from 'react';

const MOCK_INQUIRIES = [
  {
    id: '1',
    name: 'Rahul Mehta',
    phone: '98xxxxxx10',
    email: 'rahul@example.com',
    industry: 'Real Estate',
    intentScore: 82,
    status: 'new', // new, in_progress, closed
    deliveredAt: '2025-01-20T10:15:00Z',
    requirement: '3BHK in Thane, 1.2–1.4 Cr budget.',
  },
  {
    id: '2',
    name: 'Dr. Anjali (Clinic)',
    phone: '99xxxxxx45',
    email: 'anjali@example.com',
    industry: 'Healthcare',
    intentScore: 67,
    status: 'in_progress',
    deliveredAt: '2025-01-18T16:40:00Z',
    requirement: 'Cosmetic dentistry leads for Andheri area.',
  },
  {
    id: '3',
    name: 'Meera (Parent)',
    phone: '97xxxxxx33',
    email: 'meera@example.com',
    industry: 'Education',
    intentScore: 74,
    status: 'closed',
    deliveredAt: '2025-01-15T08:05:00Z',
    requirement: 'CBSE coaching for Class 10 in Pune.',
  },
  {
    id: '4',
    name: 'Amit Patel',
    phone: '96xxxxxx22',
    email: 'amit@example.com',
    industry: 'B2B Services',
    intentScore: 91,
    status: 'new',
    deliveredAt: '2025-01-21T14:30:00Z',
    requirement: 'Legal consultation services for startups.',
  },
  {
    id: '5',
    name: 'Priya Sharma',
    phone: '95xxxxxx11',
    email: 'priya@example.com',
    industry: 'Healthcare',
    intentScore: 55,
    status: 'in_progress',
    deliveredAt: '2025-01-19T09:20:00Z',
    requirement: 'Skin treatment consultation in Mumbai.',
  },
  {
    id: '6',
    name: 'Vikram Singh',
    phone: '94xxxxxx88',
    email: 'vikram@example.com',
    industry: 'Real Estate',
    intentScore: 78,
    status: 'new',
    deliveredAt: '2025-01-22T11:45:00Z',
    requirement: 'Commercial office space in Gurgaon.',
  },
];

function formatDateTime(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function intentLevel(score: number | null | undefined): string {
  if (score === null || score === undefined) return 'Unknown';
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}

function intentColorClass(score: number | null | undefined): string {
  if (score === null || score === undefined) return 'bg-gray-100 text-gray-700';
  if (score >= 70) return 'bg-green-100 text-green-700';
  if (score >= 40) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}

export default function ClientDashboardPage() {
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [intentFilter, setIntentFilter] = useState('');

  const filtered = useMemo(() => {
    return MOCK_INQUIRIES.filter((inq) => {
      const text = search.toLowerCase();

      if (text) {
        const combined = `${inq.name} ${inq.email} ${inq.industry} ${inq.requirement}`.toLowerCase();
        if (!combined.includes(text)) return false;
      }

      if (industryFilter && inq.industry !== industryFilter) return false;

      if (statusFilter && inq.status !== statusFilter) return false;

      if (intentFilter) {
        const level = intentLevel(inq.intentScore);
        if (level !== intentFilter) return false;
      }

      return true;
    });
  }, [search, industryFilter, statusFilter, intentFilter]);

  const totalCount = MOCK_INQUIRIES.length;
  const newCount = MOCK_INQUIRIES.filter((i) => i.status === 'new').length;
  const inProgressCount = MOCK_INQUIRIES.filter((i) => i.status === 'in_progress').length;
  const closedCount = MOCK_INQUIRIES.filter((i) => i.status === 'closed').length;

  const highIntentCount = MOCK_INQUIRIES.filter((i) => intentLevel(i.intentScore) === 'High').length;
  const mediumIntentCount = MOCK_INQUIRIES.filter((i) => intentLevel(i.intentScore) === 'Medium').length;
  const lowIntentCount = MOCK_INQUIRIES.filter((i) => intentLevel(i.intentScore) === 'Low').length;

  function exportCSV() {
    const rows = [
      [
        'Name',
        'Phone',
        'Email',
        'Industry',
        'Intent Score',
        'Intent Level',
        'Status',
        'Delivered At',
        'Requirement',
      ],
      ...filtered.map((i) => [
        i.name,
        i.phone,
        i.email,
        i.industry,
        i.intentScore ?? '',
        intentLevel(i.intentScore),
        i.status,
        i.deliveredAt,
        i.requirement,
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => `"${String(value || '').replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inquiries.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Client Dashboard</h1>
        <p className="text-sm text-gray-600">
          View your verified inquiries delivered by Transition Marketing AI. Filter, search, and export to work with your team.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="px-3 py-2 border rounded bg-white">
          <div className="font-semibold text-base">{totalCount}</div>
          <div className="text-gray-600">Total inquiries</div>
        </div>
        <div className="px-3 py-2 border rounded bg-white">
          <div className="font-semibold text-base">{newCount}</div>
          <div className="text-gray-600">New</div>
        </div>
        <div className="px-3 py-2 border rounded bg-white">
          <div className="font-semibold text-base">{inProgressCount}</div>
          <div className="text-gray-600">In progress</div>
        </div>
        <div className="px-3 py-2 border rounded bg-white">
          <div className="font-semibold text-base">{closedCount}</div>
          <div className="text-gray-600">Closed</div>
        </div>

        <div className="px-3 py-2 border rounded bg-white">
          <div className="font-semibold text-base">{highIntentCount}</div>
          <div className="text-gray-600">High intent</div>
        </div>
        <div className="px-3 py-2 border rounded bg-white">
          <div className="font-semibold text-base">{mediumIntentCount}</div>
          <div className="text-gray-600">Medium intent</div>
        </div>
        <div className="px-3 py-2 border rounded bg-white">
          <div className="font-semibold text-base">{lowIntentCount}</div>
          <div className="text-gray-600">Low intent</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center text-sm">
        <input
          type="text"
          placeholder="Search by name, email, requirement…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 rounded-md px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All industries</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="B2B Services">B2B Services</option>
          <option value="Startups & SaaS">Startups & SaaS</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="in_progress">In progress</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={intentFilter}
          onChange={(e) => setIntentFilter(e.target.value)}
          className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All intent levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          onClick={exportCSV}
          className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-sm">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-2 text-left font-semibold text-slate-700">Name</th>
              <th className="border p-2 text-left font-semibold text-slate-700">Industry</th>
              <th className="border p-2 text-left font-semibold text-slate-700">Intent</th>
              <th className="border p-2 text-left font-semibold text-slate-700">Status</th>
              <th className="border p-2 text-left font-semibold text-slate-700">Delivered At</th>
              <th className="border p-2 text-left font-semibold text-slate-700">Requirement</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inq) => (
              <tr key={inq.id} className="hover:bg-gray-50">
                <td className="border p-2">
                  <div className="font-medium">{inq.name}</div>
                  <div className="text-xs text-gray-500">
                    {inq.phone} · {inq.email}
                  </div>
                </td>
                <td className="border p-2">{inq.industry}</td>
                <td className="border p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${intentColorClass(inq.intentScore)}`}
                  >
                    {intentLevel(inq.intentScore)} ({inq.intentScore ?? '—'})
                  </span>
                </td>
                <td className="border p-2 text-xs">
                  {inq.status === 'new' && (
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">New</span>
                  )}
                  {inq.status === 'in_progress' && (
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">In progress</span>
                  )}
                  {inq.status === 'closed' && (
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700">Closed</span>
                  )}
                </td>
                <td className="border p-2 text-xs">{formatDateTime(inq.deliveredAt)}</td>
                <td className="border p-2 text-xs">{inq.requirement}</td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td className="border p-4 text-center text-gray-500 text-xs" colSpan={6}>
                  No inquiries found for the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

