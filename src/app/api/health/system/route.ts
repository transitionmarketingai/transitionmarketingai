/**
 * System Health Check API
 * 
 * Checks the health of various system components:
 * - Supabase connectivity
 * - Environment variables
 * - Email provider configuration
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

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

export async function GET(req: NextRequest) {
  try {
    const checks: HealthChecks = {
      supabase: { status: 'ok' },
      env: { status: 'ok', missing: [] },
      email: { status: 'ok' },
    };

    // Check 1: Supabase Connectivity
    try {
      const supabase = getSupabaseServerClient();
      const { error } = await supabase
        .from('onboarding_submissions')
        .select('id')
        .range(0, 0)
        .limit(1);

      if (error) {
        checks.supabase = {
          status: 'error',
          message: `Failed to connect to Supabase: ${error.message}`,
        };
      } else {
        checks.supabase = { status: 'ok' };
      }
    } catch (error: any) {
      checks.supabase = {
        status: 'error',
        message: `Supabase client error: ${error.message || 'Unknown error'}`,
      };
    }

    // Check 2: Environment Variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'ADMIN_PASSWORD',
    ];

    // Optional: Check for SUPABASE_URL (alternative name)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

    const missing: string[] = [];
    
    if (!supabaseUrl) {
      missing.push('NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL');
    }
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      missing.push('SUPABASE_SERVICE_ROLE_KEY');
    }
    
    if (!process.env.ADMIN_PASSWORD) {
      missing.push('ADMIN_PASSWORD');
    }

    if (missing.length > 0) {
      checks.env = {
        status: 'warning',
        missing,
      };
    } else {
      checks.env = { status: 'ok' };
    }

    // Check 3: Email Provider Configuration
    const hasResend = !!process.env.RESEND_API_KEY;
    const hasSMTP = !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD
    );

    if (hasResend || hasSMTP) {
      checks.email = { status: 'ok' };
    } else {
      checks.email = {
        status: 'warning',
        message: 'No email provider configured (RESEND_API_KEY or SMTP credentials)',
      };
    }

    return NextResponse.json(
      createSuccessResponse({ checks })
    );
  } catch (error: any) {
    console.error('[Health Check] Unexpected error:', error);
    return NextResponse.json(
      createErrorResponse('Unexpected error during health check'),
      { status: 500 }
    );
  }
}

