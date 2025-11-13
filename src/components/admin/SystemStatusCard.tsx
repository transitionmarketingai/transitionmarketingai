'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react';

interface HealthCheckResult {
  status: 'ok' | 'error' | 'warning';
  message?: string;
  missing?: string[];
}

interface HealthChecks {
  supabase: HealthCheckResult;
  env: HealthCheckResult;
  email: HealthCheckResult;
}

interface HealthCheckResponse {
  success: boolean;
  data?: {
    checks: HealthChecks;
  };
  error?: string;
}

export default function SystemStatusCard() {
  const [healthData, setHealthData] = useState<HealthChecks | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthStatus = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/health/system');
      const data: HealthCheckResponse = await response.json();

      if (data.success && data.data) {
        setHealthData(data.data.checks);
      } else {
        setError(data.error || 'Failed to fetch system status');
      }
    } catch (err: any) {
      console.error('Health check error:', err);
      setError('Unable to fetch system status');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  const getOverallStatus = (): 'ok' | 'warning' | 'error' => {
    if (!healthData) return 'error';

    if (
      healthData.supabase.status === 'ok' &&
      healthData.env.status === 'ok' &&
      healthData.email.status === 'ok'
    ) {
      return 'ok';
    }

    if (
      healthData.supabase.status === 'error' ||
      healthData.env.status === 'error' ||
      healthData.email.status === 'error'
    ) {
      return 'error';
    }

    return 'warning';
  };

  const overallStatus = healthData ? getOverallStatus() : 'error';

  const getStatusIcon = (status: 'ok' | 'error' | 'warning') => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusText = (status: 'ok' | 'error' | 'warning') => {
    switch (status) {
      case 'ok':
        return 'text-green-700';
      case 'warning':
        return 'text-yellow-700';
      case 'error':
        return 'text-red-700';
    }
  };

  const getOverallBadge = () => {
    switch (overallStatus) {
      case 'ok':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
            <CheckCircle className="h-4 w-4" />
            All systems operational
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
            <AlertCircle className="h-4 w-4" />
            Attention needed
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold">
            <XCircle className="h-4 w-4" />
            System issues detected
          </span>
        );
    }
  };

  return (
    <Card className="border-2 border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            System Status
          </CardTitle>
          <div className="flex items-center gap-2">
            {getOverallBadge()}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchHealthStatus}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            <span className="ml-2 text-slate-600">Checking system status...</span>
          </div>
        ) : error ? (
          <div className="py-4">
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <XCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchHealthStatus}
              className="mt-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : healthData ? (
          <div className="space-y-4">
            {/* Supabase Status */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              {getStatusIcon(healthData.supabase.status)}
              <div className="flex-1">
                <div className={`font-semibold ${getStatusText(healthData.supabase.status)}`}>
                  {healthData.supabase.status === 'ok' ? 'Supabase: Connected' : 'Supabase: Error'}
                </div>
                {healthData.supabase.message && (
                  <div className="text-sm text-slate-600 mt-1">
                    {healthData.supabase.message}
                  </div>
                )}
              </div>
            </div>

            {/* Environment Variables Status */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              {getStatusIcon(healthData.env.status)}
              <div className="flex-1">
                <div className={`font-semibold ${getStatusText(healthData.env.status)}`}>
                  {healthData.env.status === 'ok'
                    ? 'Environment: All required variables present'
                    : 'Environment: Missing variables'}
                </div>
                {healthData.env.missing && healthData.env.missing.length > 0 && (
                  <div className="text-sm text-slate-600 mt-1">
                    Missing: {healthData.env.missing.join(', ')}
                  </div>
                )}
              </div>
            </div>

            {/* Email Status */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              {getStatusIcon(healthData.email.status)}
              <div className="flex-1">
                <div className={`font-semibold ${getStatusText(healthData.email.status)}`}>
                  {healthData.email.status === 'ok'
                    ? 'Email: Ready'
                    : 'Email: Missing configuration'}
                </div>
                {healthData.email.message && (
                  <div className="text-sm text-slate-600 mt-1">
                    {healthData.email.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

