import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { event, properties, userId, timestamp } = await request.json();

    // Log analytics event (in production, send to your analytics service)
    console.log('Analytics Event:', {
      event,
      properties,
      userId: userId || (session?.user as any)?.id,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    });

    // TODO: Send to your analytics service (Mixpanel, Amplitude, etc.)
    // Example for Mixpanel:
    // await mixpanel.track(event, {
    //   ...properties,
    //   distinct_id: userId || session?.user?.id,
    //   time: timestamp,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
