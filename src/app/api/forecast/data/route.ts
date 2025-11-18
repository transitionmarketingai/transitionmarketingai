import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';
import { aggregateHistoricalData } from '@/lib/forecast/dataAggregator';

/**
 * Fetch historical data for forecasting
 * Requires admin authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const searchParams = request.nextUrl.searchParams;
    const months = parseInt(searchParams.get('months') || '12');

    // Aggregate historical data
    const historicalData = await aggregateHistoricalData(months);

    return NextResponse.json(
      createSuccessResponse({
        data: historicalData,
        months,
      })
    );
  } catch (error: any) {
    console.error('[Forecast Data] Error:', error);
    return NextResponse.json(
      createErrorResponse(error.message || 'Internal server error'),
      { status: 500 }
    );
  }
}


