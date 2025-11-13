/**
 * API Helper Utilities
 * 
 * Common utilities for API routes including error handling and logging.
 */

import type { PostgrestError } from '@supabase/supabase-js';

/**
 * Handle Supabase errors with consistent logging and formatting
 */
export function handleSupabaseError(
  error: PostgrestError | null,
  context: string
): PostgrestError | null {
  if (error) {
    console.error(
      `[Supabase Error] ${context}:`,
      {
        message: error.message,
        details: error.details || '',
        hint: error.hint || '',
        code: error.code || '',
      }
    );
  }
  return error;
}

/**
 * Log admin events for debugging and auditing
 */
export function logAdminEvent(action: string, details?: Record<string, any>) {
  const timestamp = new Date().toISOString();
  console.log(`[Admin Event] ${timestamp} - ${action}`, details || '');
}

/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Create a success response
 */
export function createSuccessResponse<T>(data?: T): ApiResponse<T> {
  return {
    success: true,
    ...(data !== undefined && { data }),
  };
}

/**
 * Create an error response
 */
export function createErrorResponse(error: string): ApiResponse {
  return {
    success: false,
    error,
  };
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  body: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(
    (field) => body[field] === undefined || body[field] === null || body[field] === ''
  );

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

