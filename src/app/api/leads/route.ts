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

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const source = searchParams.get("source")
    const search = searchParams.get("search")

    let filteredLeads = leads.filter(lead => lead.userId === (session.user as any).id)

    if (status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === status)
    }

    if (source) {
      filteredLeads = filteredLeads.filter(lead => lead.source === source)
    }

    if (search) {
      const searchTerm = search.toLowerCase()
      filteredLeads = filteredLeads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.company.toLowerCase().includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm)
      )
    }

    return NextResponse.json(filteredLeads)
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
    const { name, company, email, phone, source, notes } = body

    if (!name || !company || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      company,
      email,
      phone: phone || "",
      status: "new",
      source: source || "Website",
      score: Math.floor(Math.random() * 100) + 1,
      lastContact: new Date().toISOString(),
      notes: notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: (session.user as any).id
    }

    leads.push(newLead)

    return NextResponse.json(newLead, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
