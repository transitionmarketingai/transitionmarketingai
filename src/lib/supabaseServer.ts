/**
 * Supabase Server Client Utility
 * 
 * Creates a singleton Supabase client for server-side operations.
 * Uses the SERVICE_ROLE_KEY for secure operations that bypass Row Level Security.
 * 
 * ⚠️ IMPORTANT: Never expose this client in client-side code.
 * Only use in API routes and server components.
 */

import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

let supabaseServerClient: SupabaseClient | null = null;

export function getSupabaseServerClient() {
  if (!supabaseServerClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY are required');
    }

    supabaseServerClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseServerClient;
}

