'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

function aiScoreClass(score: number | null | undefined) {
  if (score === null || score === undefined) return 'text-gray-600';
  if (score >= 70) return 'text-green-700';
  if (score >= 40) return 'text-yellow-700';
  return 'text-red-700';
}

export default function InquiryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [inquiry, setInquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [aiReason, setAiReason] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [deliverLoading, setDeliverLoading] = useState(false);

  async function loadInquiry() {
    if (!id) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('verified_inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setInquiry(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadInquiry();
  }, [id]);

  // Sync AI score state with inquiry data
  useEffect(() => {
    if (inquiry) {
      setAiScore(inquiry.ai_score ?? null);
      setAiReason(inquiry.ai_reason || '');
    }
  }, [inquiry]);

  async function handleVerify(status: 'verified' | 'rejected') {
    if (!id) return;

    const label =
      status === 'verified' ? 'verify this inquiry' : 'reject this inquiry';

    const ok = confirm(`Are you sure you want to ${label}?`);
    if (!ok) return;

    try {
      const res = await fetch('/api/inquiries/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY || '',
        },
        body: JSON.stringify({
          id,
          verification_status: status,
          notes,
        }),
      });

      const result = await res.json();
      console.log('Verification response:', result);

      // Reload inquiry data to update UI
      await loadInquiry();
    } catch (error) {
      console.error('Failed to update verification status:', error);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="p-8">
        <p className="text-slate-600">Inquiry not found.</p>
        <Link href="/admin/dashboard">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const isDecided =
    inquiry.verification_status === 'verified' ||
    inquiry.verification_status === 'rejected';

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Inquiry Details</h1>
      </div>

      {/* Status Badge */}
      {inquiry.verification_status === 'verified' && (
        <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded mb-4">
          ✔ Verified
        </span>
      )}

      {inquiry.verification_status === 'rejected' && (
        <span className="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded mb-4">
          ✘ Rejected
        </span>
      )}

      {!inquiry.verification_status && (
        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded mb-4">
          • Pending Verification
        </span>
      )}

      {/* Verification Buttons */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 text-sm rounded ${
              isDecided
                ? 'bg-green-300 text-white cursor-not-allowed'
                : 'bg-green-600 text-white'
            }`}
            disabled={isDecided}
            onClick={() => !isDecided && handleVerify('verified')}
          >
            Mark as Verified
          </button>
          <button
            className={`px-4 py-2 text-sm rounded ${
              isDecided
                ? 'bg-red-300 text-white cursor-not-allowed'
                : 'bg-red-600 text-white'
            }`}
            disabled={isDecided}
            onClick={() => !isDecided && handleVerify('rejected')}
          >
            Mark as Rejected
          </button>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Verification Notes (optional)
          </label>
          <textarea
            className="w-full border border-slate-300 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Add notes about this inquiry…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* Deliver to Client Button */}
        {(() => {
          const canDeliver =
            inquiry.verification_status === 'verified' && !inquiry.delivered;
          return (
            <div>
              <button
                className={
                  'px-4 py-2 text-sm rounded ' +
                  (canDeliver
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-300 text-white cursor-not-allowed')
                }
                disabled={!canDeliver || deliverLoading}
                onClick={async () => {
                  if (!canDeliver) return;

                  const ok = confirm('Deliver this inquiry to the client?');
                  if (!ok) return;

                  try {
                    setDeliverLoading(true);
                    const res = await fetch('/api/inquiries/deliver', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY || '',
                      },
                      body: JSON.stringify({ id }),
                    });

                    const json = await res.json();
                    console.log('Deliver response:', json);
                    // Refresh to show delivered status + timestamp
                    await loadInquiry();
                  } catch (e) {
                    console.error('Deliver failed:', e);
                  } finally {
                    setDeliverLoading(false);
                  }
                }}
              >
                {deliverLoading ? 'Delivering...' : 'Deliver to Client'}
              </button>
            </div>
          );
        })()}

        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-3 text-sm">Verification Details</h3>

          <p className="text-sm">
            <span className="font-medium">Status:</span>
            <span className="ml-2">
              {inquiry.verification_status || 'Not verified'}
            </span>
          </p>

          <p className="text-sm mt-2">
            <span className="font-medium">Verified At:</span>
            <span className="ml-2">
              {inquiry.verified_at
                ? new Date(inquiry.verified_at).toLocaleString()
                : '—'}
            </span>
          </p>

          <p className="text-sm mt-2">
            <span className="font-medium">Notes:</span>
            <span className="ml-2">{inquiry.verification_notes || '—'}</span>
          </p>

          <p className="text-sm mt-2">
            <span className="font-medium">Delivered:</span>
            <span className="ml-2">{inquiry.delivered ? 'Yes' : 'No'}</span>
          </p>

          <p className="text-sm mt-2">
            <span className="font-medium">Delivered At:</span>
            <span className="ml-2">
              {inquiry.delivered_at
                ? new Date(inquiry.delivered_at).toLocaleString()
                : '—'}
            </span>
          </p>
        </div>

        {/* AI Intent Score */}
        <div className="mt-6 p-4 border rounded bg-blue-50">
          <h3 className="font-semibold mb-3 text-sm">AI Intent Score</h3>

          {aiLoading && (
            <p className="text-xs text-blue-700">Generating AI score…</p>
          )}

          {!aiLoading && aiScore === null && (
            <p className="text-xs text-blue-700">No AI score generated yet.</p>
          )}

          {!aiLoading && aiScore !== null && (
            <div>
              <p className={`text-2xl font-bold ${aiScoreClass(aiScore)}`}>
                {aiScore}/100
              </p>

              {aiReason && (
                <p className="mt-2 text-xs text-blue-800">{aiReason}</p>
              )}

              {inquiry.ai_scored_at && (
                <p className="mt-2 text-[11px] text-gray-600">
                  Last scored: {new Date(inquiry.ai_scored_at).toLocaleString()}
                </p>
              )}
            </div>
          )}

          <button
            className="mt-3 px-3 py-1 bg-blue-600 text-white text-xs rounded"
            onClick={async () => {
              try {
                setAiLoading(true);
                const res = await fetch('/api/inquiries/ai-score', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id }),
                });
                const json = await res.json();
                if (json.success) {
                  setAiScore(json.score);
                  setAiReason(json.reason);
                  // Refresh to get updated inquiry data from DB
                  await loadInquiry();
                }
              } catch (e) {
                console.error('AI score fetch failed:', e);
              } finally {
                setAiLoading(false);
              }
            }}
          >
            {aiLoading ? 'Scoring...' : aiScore === null ? 'Generate AI Score' : 'Re-score Lead'}
          </button>
        </div>
      </div>

      {/* Inquiry Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Inquiry Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs mb-1">Name</p>
              <p className="text-slate-900 font-medium">{inquiry.name || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Phone</p>
              <p className="text-slate-900 font-medium">{inquiry.phone || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Email</p>
              <p className="text-slate-900 font-medium">{inquiry.email || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Industry</p>
              <p className="text-slate-900 font-medium">{inquiry.industry || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Requirement</p>
              <p className="text-slate-900 font-medium">{inquiry.requirement || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Budget</p>
              <p className="text-slate-900 font-medium">{inquiry.budget || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Timeline</p>
              <p className="text-slate-900 font-medium">{inquiry.timeline || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Source</p>
              <p className="text-slate-900 font-medium">{inquiry.source || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Verification Status</p>
              <p className="text-slate-900 font-medium">{inquiry.verification_status || 'pending'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Delivered</p>
              <p className="text-slate-900 font-medium">{inquiry.delivered ? 'Yes' : 'No'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Delivered At</p>
              <p className="text-slate-900 font-medium">
                {inquiry.delivered_at
                  ? new Date(inquiry.delivered_at).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '—'}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Created At</p>
              <p className="text-slate-900 font-medium">
                {inquiry.created_at
                  ? new Date(inquiry.created_at).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '—'}
              </p>
            </div>
          </div>

          {/* UTM Data */}
          {inquiry.utm && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-500 text-xs mb-2">UTM Parameters</p>
              <pre className="bg-slate-50 p-4 text-xs rounded-md whitespace-pre-wrap border border-slate-200 text-slate-700">
                {JSON.stringify(inquiry.utm, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

