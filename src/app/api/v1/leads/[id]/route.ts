// Individual Lead API endpoints
import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/apiClient'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const lead = await prisma.lead.findUnique({
      where: { 
        id: context.params.id,
        userId: session.user.id 
      },
      include: {
        campaign: true,
        activities: { 
          orderBy: { createdAt: 'desc' },
          take: 20
        },
        messages: {
          include: { lead: true },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: { 
            activities: true, 
            messages: true 
          }
        }
      }
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: lead
    })
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    const result = await apiClient.LeadService.updateLead(
      session.user.id,
      context.params.id,
      body
    )

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data
    })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deleted = await apiClient.LeadService.deleteLead(session.user.id, params.id)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete lead' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    )
  }
}
