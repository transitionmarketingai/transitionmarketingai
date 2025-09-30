import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock database - replace with actual database
let content = [
  {
    id: "1",
    title: "AI Marketing Trends 2024",
    type: "Blog",
    status: "published",
    views: 2847,
    engagement: 12.4,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "1"
  },
  {
    id: "2",
    title: "Lead Generation Best Practices",
    type: "Blog",
    status: "draft",
    views: 0,
    engagement: 0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "1"
  },
  {
    id: "3",
    title: "Social Media Automation Guide",
    type: "Social",
    status: "scheduled",
    views: 0,
    engagement: 0,
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let filteredContent = content.filter(item => item.userId === (session.user as any).id)

    if (type) {
      filteredContent = filteredContent.filter(item => item.type === type)
    }

    if (status) {
      filteredContent = filteredContent.filter(item => item.status === status)
    }

    if (search) {
      const searchTerm = search.toLowerCase()
      filteredContent = filteredContent.filter(item =>
        item.title.toLowerCase().includes(searchTerm)
      )
    }

    return NextResponse.json(filteredContent)
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
    const { title, type, status, scheduledAt } = body

    if (!title || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newContent = {
      id: Date.now().toString(),
      title,
      type,
      status: status || "draft",
      views: 0,
      engagement: 0,
      publishedAt: status === "published" ? new Date().toISOString() : undefined,
      scheduledAt: scheduledAt || (status === "scheduled" ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : undefined),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: (session.user as any).id
    }

    content.push(newContent)

    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
