import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock database - replace with actual database
let leads = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechCorp",
    email: "sarah@techcorp.com",
    phone: "+91-9876543210",
    status: "new",
    source: "LinkedIn",
    score: 85,
    lastContact: new Date().toISOString(),
    notes: "Interested in AI marketing solutions",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "1"
  },
  {
    id: "2",
    name: "Mike Chen",
    company: "InnovateLabs",
    email: "mike@innovatelabs.com",
    phone: "+91-9876543211",
    status: "contacted",
    source: "Email",
    score: 72,
    lastContact: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    notes: "Follow up scheduled for next week",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    userId: "1"
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const lead = leads.find(l => l.id === id && l.userId === (session.user as any).id)

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    return NextResponse.json(lead)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id } = await params
    const leadIndex = leads.findIndex(l => l.id === id && l.userId === (session.user as any).id)

    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    leads[leadIndex] = {
      ...leads[leadIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(leads[leadIndex])
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const leadIndex = leads.findIndex(l => l.id === id && l.userId === (session.user as any).id)

    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    leads.splice(leadIndex, 1)

    return NextResponse.json({ message: "Lead deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
