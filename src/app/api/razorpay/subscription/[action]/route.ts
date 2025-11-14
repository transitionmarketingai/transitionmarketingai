import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createSuccessResponse, createErrorResponse } from '@/lib/apiHelpers';

interface SubscriptionActionParams {
  params: {
    action: 'pause' | 'resume' | 'cancel';
  };
}

/**
 * Razorpay Subscription Actions
 * Pause, Resume, or Cancel subscriptions
 * Requires admin authentication
 */
export async function POST(
  request: NextRequest,
  { params }: SubscriptionActionParams
) {
  try {
    // Require admin authentication
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const { action } = params;
    const body = await request.json();
    const { subscriptionId, clientRecordId } = body;

    if (!subscriptionId) {
      return NextResponse.json(
        createErrorResponse('Missing required field: subscriptionId'),
        { status: 400 }
      );
    }

    // Check Razorpay configuration
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        createErrorResponse('Razorpay not configured'),
        { status: 500 }
      );
    }

    // Import Razorpay dynamically
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    let result;
    
    // Perform action based on type
    switch (action) {
      case 'pause':
        result = await razorpay.subscriptions.pause(subscriptionId, {
          pause_at: 'now',
        });
        break;
      
      case 'resume':
        result = await razorpay.subscriptions.resume(subscriptionId, {
          resume_at: 'now',
        });
        break;
      
      case 'cancel':
        result = await razorpay.subscriptions.cancel(subscriptionId, {
          cancel_at_cycle_end: false,
        });
        break;
      
      default:
        return NextResponse.json(
          createErrorResponse('Invalid action. Must be: pause, resume, or cancel'),
          { status: 400 }
        );
    }

    // Update Airtable if clientRecordId provided
    if (clientRecordId) {
      const airtableApiKey = process.env.AIRTABLE_API_KEY;
      const airtableBaseId = process.env.AIRTABLE_BASE_ID;
      const clientsTableName = process.env.AIRTABLE_CLIENTS_TABLE_NAME || 'Clients';

      if (airtableApiKey && airtableBaseId) {
        try {
          await fetch(
            `https://api.airtable.com/v0/${airtableBaseId}/${clientsTableName}/${clientRecordId}`,
            {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${airtableApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fields: {
                  'Billing Status': action === 'cancel' ? 'Cancelled' : action === 'pause' ? 'Paused' : 'Active',
                },
              }),
            }
          );
        } catch (airtableError) {
          console.error('[Razorpay] Error updating Airtable:', airtableError);
          // Continue even if Airtable update fails
        }
      }
    }

    return NextResponse.json(
      createSuccessResponse({
        subscription: result,
        message: `Subscription ${action}d successfully`,
      })
    );
  } catch (error: any) {
    console.error(`[Razorpay] Error ${params.action}ing subscription:`, error);
    return NextResponse.json(
      createErrorResponse(error.message || `Failed to ${params.action} subscription`),
      { status: 500 }
    );
  }
}

