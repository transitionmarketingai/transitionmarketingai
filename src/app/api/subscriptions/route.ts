import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock subscription data - replace with actual database
let subscriptions = [
  {
    id: "1",
    userId: "1",
    plan: "growth",
    status: "active",
    currentPeriodStart: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    price: 12999,
    currency: "INR",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const subscription = subscriptions.find(sub => sub.userId === (session.user as any).id)

    if (!subscription) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { plan, price, currency } = body

    if (!plan || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already has a subscription
    const existingSubscription = subscriptions.find(sub => sub.userId === (session.user as any).id)
    
    if (existingSubscription) {
      return NextResponse.json({ error: "User already has a subscription" }, { status: 400 })
    }

    const newSubscription = {
      id: Date.now().toString(),
      userId: (session.user as any).id,
      plan,
      status: "pending",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      price,
      currency: currency || "INR",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    subscriptions.push(newSubscription)

    // TODO: Integrate with payment processor (Stripe/Razorpay)
    // For now, just return the subscription
    return NextResponse.json(newSubscription, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
