'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function SessionDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .schema('verified')
        .from('sessions')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setSession(data);
      }
      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8">
        <p className="text-slate-600">Session not found.</p>
        <Link href="/admin/dashboard">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold text-slate-900">Strategy Session Details</h1>
      </div>

      {/* Session Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Session Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs mb-1">Name</p>
              <p className="text-slate-900 font-medium">{session.name || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Phone</p>
              <p className="text-slate-900 font-medium">{session.phone || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Industry</p>
              <p className="text-slate-900 font-medium">{session.industry || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Revenue Range</p>
              <p className="text-slate-900 font-medium">{session.revenue_range || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Inquiry Volume</p>
              <p className="text-slate-900 font-medium">{session.inquiry_volume || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Airtable ID</p>
              <p className="text-slate-900 font-medium">{session.airtable_id || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Referrer</p>
              <p className="text-slate-900 font-medium">{session.referrer || '—'}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-1">Created At</p>
              <p className="text-slate-900 font-medium">
                {session.created_at
                  ? new Date(session.created_at).toLocaleString('en-IN', {
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
          {session.utm && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-500 text-xs mb-2">UTM Parameters</p>
              <pre className="bg-slate-50 p-4 text-xs rounded-md whitespace-pre-wrap border border-slate-200 text-slate-700">
                {JSON.stringify(session.utm, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

