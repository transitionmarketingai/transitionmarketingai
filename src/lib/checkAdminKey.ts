import { NextRequest } from 'next/server';

/**
 * Check Admin API Key
 * 
 * Validates that the request includes a valid admin API key in the x-admin-key header.
 * Used to protect inquiry-related API routes.
 */
export function checkAdminKey(req: NextRequest): boolean {
  const headerKey = req.headers.get('x-admin-key');
  // Support both ADMIN_API_KEY and NEXT_PUBLIC_ADMIN_KEY for backward compatibility
  const validKey = process.env.NEXT_PUBLIC_ADMIN_KEY || process.env.ADMIN_API_KEY;

  if (!validKey) return false;
  if (!headerKey) return false;

  return headerKey === validKey;
}

