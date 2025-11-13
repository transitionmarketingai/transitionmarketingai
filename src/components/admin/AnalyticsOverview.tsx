'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, TrendingUp, Users, Calendar, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface StatusBreakdown {
  status: string;
  count: number;
}

interface CallOutcomeBreakdown {
  call_outcome: string;
  count: number;
}

interface AnalyticsMetrics {
  submissions: {
    total: number;
    qualified: number;
    medium: number;
    low: number;
    byStatus: StatusBreakdown[];
    last7days: number;
  };
  calls: {
    total: number;
    byOutcome: CallOutcomeBreakdown[];
  };
}

interface AnalyticsResponse {
  success: boolean;
  data?: {
    metrics: AnalyticsMetrics;
  };
  error?: string;
}

export default function AnalyticsOverview() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/analytics');
      const data: AnalyticsResponse = await response.json();

      if (data.success && data.data) {
        setMetrics(data.data.metrics);
      } else {
        setError(data.error || 'Failed to fetch analytics');
      }
    } catch (err: any) {
      console.error('Analytics fetch error:', err);
      setError('Unable to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-700 bg-blue-100';
      case 'in_progress':
        return 'text-yellow-700 bg-yellow-100';
      case 'completed':
        return 'text-green-700 bg-green-100';
      case 'follow_up':
        return 'text-purple-700 bg-purple-100';
      case 'not_fit':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'Pilot Sold':
        return 'text-green-700 bg-green-100';
      case 'Good Fit – Follow-up':
        return 'text-blue-700 bg-blue-100';
      case 'Not Ready – Nurture':
        return 'text-yellow-700 bg-yellow-100';
      case 'Not a Fit':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (isLoading) {
    return (
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle>Funnel Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            <span className="ml-2 text-slate-600">Loading analytics...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle>Funnel Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4">
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <XCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAnalytics}
              className="mt-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) {
    return null;
  }

  const totalSubmissions = metrics.submissions.total;
  const qualifiedPercent = totalSubmissions > 0 
    ? Math.round((metrics.submissions.qualified / totalSubmissions) * 100) 
    : 0;
  const mediumPercent = totalSubmissions > 0 
    ? Math.round((metrics.submissions.medium / totalSubmissions) * 100) 
    : 0;
  const lowPercent = totalSubmissions > 0 
    ? Math.round((metrics.submissions.low / totalSubmissions) * 100) 
    : 0;

  return (
    <Card className="border-2 border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Funnel Overview
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAnalytics}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Top Row Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Total Leads</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">{metrics.submissions.total}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-slate-900">Qualified (70+)</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">{metrics.submissions.qualified}</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-slate-900">Last 7 Days</h3>
              </div>
              <p className="text-3xl font-bold text-purple-600">{metrics.submissions.last7days}</p>
            </div>
          </div>

          {/* Breakdown by Score Tier */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Score Breakdown</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700">Qualified (70+)</span>
                  <span className="text-sm text-slate-600">
                    {metrics.submissions.qualified} ({qualifiedPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${qualifiedPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700">Medium (40-69)</span>
                  <span className="text-sm text-slate-600">
                    {metrics.submissions.medium} ({mediumPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${mediumPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700">Low (&lt;40)</span>
                  <span className="text-sm text-slate-600">
                    {metrics.submissions.low} ({lowPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${lowPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status Breakdown and Call Outcomes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Breakdown */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Status Breakdown</h3>
              <div className="space-y-2">
                {metrics.submissions.byStatus.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {formatStatus(item.status)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call Outcomes */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Call Outcomes</h3>
              <div className="space-y-2">
                {metrics.calls.byOutcome.map((item) => (
                  <div
                    key={item.call_outcome}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {item.call_outcome}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getOutcomeColor(item.call_outcome)}`}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
                {metrics.calls.total === 0 && (
                  <p className="text-sm text-slate-500 italic">No calls recorded yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

