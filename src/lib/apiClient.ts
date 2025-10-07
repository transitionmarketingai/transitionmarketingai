// Enhanced API Client for Transition Marketing AI
// Comprehensive service layer with Prisma integration

import { prisma } from './prisma'
import { 
  User, 
  Lead, 
  Campaign, 
  Message, 
  Activity, 
  CreditTransaction, 
  UserRole, 
  UserPlan, 
  LeadStatus, 
  LeadSource,
  ActivityType,
  MessageChannel,
  CampaignStatus,
  CreditTransactionType,
  Prisma 
} from '@prisma/client'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface LeadFilters {
  status?: LeadStatus[]
  source?: LeadSource[]
  industry?: string[]
  campaignId?: string
  assignedTo?: string
  scoreMin?: number
  scoreMax?: number
  search?: string
}

export interface CampaignFilters {
  status?: CampaignStatus[]
  industry?: string[]
  search?: string
}

export interface MessageFilters {
  channel?: MessageChannel[]
  status?: string[]
  campaignId?: string
  leadId?: string
}

// ============================================================================
// CREDIT SYSTEM MANAGEMENT
// ============================================================================

export class CreditService {
  // Get user's current credit balance
  static async getBalance(userId: string): Promise<number> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { creditBalance: true }
      })
      return user?.creditBalance || 0
    } catch (error) {
      console.error('Error getting credit balance:', error)
      return 0
    }
  }

  // Consume credits for an action
  static async consumeCredits(
    userId: string, 
    amount: number, 
    type: string, 
    description: string,
    metadata?: any
  ): Promise<boolean> {
    try {
      await prisma.$transaction(async (tx) => {
        // Check if user has enough credits
        const user = await tx.user.findUnique({
          where: { id: userId },
          select: { creditBalance: true }
        })

        if (!user || user.creditBalance < amount) {
          throw new Error('Insufficient credits')
        }

        // Update user balance
        await tx.user.update({
          where: { id: userId },
          data: {
            creditBalance: { decrement: amount },
            totalCruUsed: { increment: amount }
          }
        })

        // Create transaction record
        await tx.creditTransaction.create({
          data: {
            userId,
            type: 'CONSUMPTION',
            amount: -amount,
            description,
            metadata: metadata || {}
          }
        })
      })

      return true
    } catch (error) {
      console.error('Error consuming credits:', error)
      return false
    }
  }

  // Add credits to user
  static async addCredits(
    userId: string,
    amount: number,
    type: CreditTransactionType = 'PURCHASE',
    description: string = 'Credit purchase',
    metadata?: any
  ): Promise<boolean> {
    try {
      await prisma.$transaction(async (tx) => {
        // Update user balance
        await tx.user.update({
          where: { id: userId },
          data: { creditBalance: { increment: amount } }
        })

        // Create transaction record
        await tx.creditTransaction.create({
          data: {
            userId,
            type,
            amount,
            description,
            metadata: metadata || {}
          }
        })
      })

      return true
    } catch (error) {
      console.error('Error adding credits:', error)
      return false
    }
  }

  // Get credit transaction history
  static async getTransactionHistory(
    userId: string, 
    limit: number = 20, 
    offset: number = 0
  ): Promise<PaginatedResponse<CreditTransaction>> {
    try {
      const [transactions, total] = await Promise.all([
        prisma.creditTransaction.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset
        }),
        prisma.creditTransaction.count({ where: { userId } })
      ])

      return {
        data: transactions,
        total,
        page: Math.floor(offset / limit) + 1,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    } catch (error) {
      console.error('Error getting transaction history:', error)
      return {
        data: [],
        total: 0,
        page: 1,
        limit,
        totalPages: 0
      }
    }
  }
}

// ============================================================================
// LEAD MANAGEMENT SERVICE
// ============================================================================

export class LeadService {
  // Get leads with advanced filtering
  static async getLeads(
    userId: string,
    filters: LeadFilters = {},
    limit: number = 50,
    offset: number = 0
  ): Promise<PaginatedResponse<Lead>> {
    try {
      const where: Prisma.LeadWhereInput = {
        userId,
        ...(filters.status?.length && { status: { in: filters.status } }),
        ...(filters.source?.length && { source: { in: filters.source } }),
        ...(filters.industry?.length && { industry: { in: filters.industry } }),
        ...(filters.campaignId && { campaignId: filters.campaignId }),
        ...(filters.assignedTo && { assignedTo: filters.assignedTo }),
        ...(filters.scoreMin && { score: { gte: filters.scoreMin } }),
        ...(filters.scoreMax && { score: { lte: filters.scoreMax } }),
        ...(filters.search && {
          OR: [
            { firstName: { contains: filters.search, mode: 'insensitive' } },
            { lastName: { contains: filters.search, mode: 'insensitive' } },
            { company: { contains: filters.search, mode: 'insensitive' } },
            { email: { contains: filters.search, mode: 'insensitive' } }
          ]
        })
      }

      const [leads, total] = await Promise.all([
        prisma.lead.findMany({
          where,
          include: {
            campaign: true,
            activities: { take: 5, orderBy: { createdAt: 'desc' } },
            messages: {
              take: 3,
              include: { lead: true },
              orderBy: { createdAt: 'desc' }
            },
            _count: {
              select: { activities: true, messages: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset
        }),
        prisma.lead.count({ where })
      ])

      return {
        data: leads,
       Total: total,
        page: Math.floor(offset / limit) + 1,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    } catch (error) {
      console.error('Error getting leads:', error)
      return {
        data: [],
        total: 0,
        page: 1,
        limit,
        totalPages: 0
      }
    }
  }

  // Create new lead
  static async createLead(userId: string, leadData: Prisma.LeadCreateInput): Promise<ApiResponse<Lead>> {
    try {
      const lead = await prisma.lead.create({
        data: {
          ...leadData,
          userId
        },
        include: {
          campaign: true,
          activities: true
        }
      })

      // Log activity
      await ActivityService.createActivity(userId, lead.id, 'NEW_LEAD', 'Lead created')

      return {
        data: lead,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error creating lead:', error)
      return {
        data: null,
        error: 'Failed to create lead',
        success: false
      }
    }
  }

  // Update lead
  static async updateLead(
    userId: string, 
    leadId: string, 
    updateData: Prisma.LeadUpdateInput
  ): Promise<ApiResponse<Lead>> {
    try {
      const lead = await prisma.lead.update({
        where: { id: leadId, userId },
        data: updateData,
        include: {
          campaign: true,
          activities: true
        }
      })

      // Log activity
      await ActivityService.createActivity(userId, leadId, 'LEAD_UPDATED', 'Lead information updated')

      return {
        data: lead,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error updating lead:', error)
      return {
        data: null,
        error: 'Failed to update lead',
        success: false
      }
    }
  }

  // Bulk operations
  static async bulkUpdateLeads(
    userId: string,
    leadIds: string[],
    updateData: Prisma.LeadUpdateInput
  ): Promise<boolean> {
    try {
      await prisma.lead.updateMany({
        where: { id: { in: leadIds }, userId },
        data: updateData
      })

      // Log bulk activity
      await ActivityService.createActivity(
        userId, 
        leadIds[0], // Use first lead ID for activity
        'BULK_UPDATE',
        `Updated ${leadIds.length} leads`
      )

      return true
    } catch (error) {
      console.error('Error updating leads:', error)
      return false
    }
  }

  // Delete lead
  static async deleteLead(userId: string, leadId: string): Promise<boolean> {
    try {
      await prisma.lead.delete({
        where: { id: leadId, userId }
      })

      return true
    } catch (error) {
      console.error('Error deleting lead:', error)
      return false
    }
  }

  // Get lead analytics
  static async getLeadAnalytics(userId: string): Promise<any> {
    try {
      const [
        totalLeads,
        statusCounts,
        sourceCounts,
        avgScore,
        recentLeads
      ] = await Promise.all([
        prisma.lead.count({ where: { userId } }),
        prisma.lead.groupBy({
          by: ['status'],
          where: { userId },
          _count: { status: true }
        }),
        prisma.lead.groupBy({
          by: ['source'],
          where: { userId },
          _count: { source: true }
        }),
        prisma.lead.aggregate({
          where: { userId },
          _avg: { score: true }
        }),
        prisma.lead.findMany({
          where: { userId },
          take: 10,
          orderBy: { createdAt: 'desc' }
        })
      ])

      return {
        totalLeads,
        statusCounts: statusCounts.reduce((acc, item) => {
          acc[item.status] = item._count.status
          return acc
        }, {}),
        sourceCounts: sourceCounts.reduce((acc, item) => {
          acc[item.source] = item._count.source
          return acc
        }, {}),
        avgScore: avgScore._avg.score || 0,
        recentLeads: recentLeads.length
      }
    } catch (error) {
      console.error('Error getting lead analytics:', error)
      return null
    }
  }
}

// ============================================================================
// CAMPAIGN MANAGEMENT SERVICE
// ============================================================================

export class CampaignService {
  // Get campaigns with filtering
  static async getCampaigns(
    userId: string,
    filters: CampaignFilters = {},
    limit: number = 50,
    offset: number = 0
  ): Promise<PaginatedResponse<Campaign>> {
    try {
      const where: Prisma.CampaignWhereInput = {
        userId,
        ...(filters.status?.length && { status: { in: filters.status } }),
        ...(filters.industry?.length && { industry: { in: filters.industry } }),
        ...(filters.search && {
          OR: [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } }
          ]
        })
      }

      const [campaigns, total] = await Promise.all([
        prisma.campaign.findMany({
          where,
          include: {
            leads: {
              select: { id: true, status: true }
            },
            _count: {
              select: { leads: true, messages: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset
        }),
        prisma.campaign.count({ where })
      ])

      return {
        data: campaigns,
        total,
        page: Math.floor(offset / limit) + 1,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    } catch (error) {
      console.error('Error getting campaigns:', error)
      return {
        data: [],
        total: 0,
        page: 1,
        limit,
        totalPages: 0
      }
    }
  }

  // Create campaign
  static async createCampaign(userId: string, campaignData: Prisma.CampaignCreateInput): Promise<ApiResponse<Campaign>> {
    try {
      // Check if user has enough credits
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { creditBalance: true }
      })

      if (!user || user.creditBalance < campaignData.budget) {
        return {
          data: null,
          error: 'Insufficient credits to create campaign',
          success: false
        }
      }

      const campaign = await prisma.campaign.create({
        data: {
          ...campaignData,
          userId
        },
        include: {
          leads: true,
          user: true
        }
      })

      return {
        data: campaign,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
      return {
        data: null,
        error: 'Failed to create campaign',
        success: false
      }
    }
  }

  // Start AI lead generation campaign
  static async startLeadGeneration(campaignId: string): Promise<boolean> {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { user: true }
      })

      if (!campaign) {
        throw new Error('Campaign not found')
      }

      // Update campaign status
      await prisma.campaign.update({
        where: { id: campaignId },
        data: {
          status: 'ACTIVE',
          startedAt: new Date()
        }
      })

      // TODO: Integrate with actual AI lead generation service
      // This would call external AI APIs to find and qualify leads
      // For now, we'll simulate with sample data

      return true
    } catch (error) {
      console.error('Error starting lead generation:', error)
      return false
    }
  }
}

// ============================================================================
// MESSAGING SERVICE
// ============================================================================

export class MessageService {
  // Send message to lead
  static async sendMessage(
    userId: string,
    leadId: string,
    channel: MessageChannel,
    content: string,
    subject?: string,
    scheduledFor?: Date
  ): Promise<ApiResponse<Message>> {
    try {
      // Check credits (messaging costs credits)
      const creditCost = this.getCreditCost(channel)
      const hasCredits = await CreditService.consumeCredits(
        userId,
        creditCost,
        'MESSAGE_SENT',
        `${channel} message sent to lead`,
        { leadId, channel }
      )

      if (!hasCredits) {
        return {
          data: null,
          error: 'Insufficient credits to send message',
          success: false
        }
      }

      const message = await prisma.message.create({
        data: {
          userId,
          leadId,
          channel,
          content,
          subject: subject || null,
          scheduledFor: scheduledFor || new Date(),
          status: scheduledFor ? 'scheduled' : 'pending'
        },
        include: {
          lead: true
        }
      })

      // TODO: Integrate with actual messaging platforms (SendGrid, LinkedIn API, etc.)
      // For now, we'll simulate message sending

      return {
        data: message,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error sending message:', error)
      return {
        data: null,
        error: 'Failed to send message',
        success: false
      }
    }
  }

  // Get message history for lead
  static async getLeadMessages(
    userId: string,
    leadId: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<PaginatedResponse<Message>> {
    try {
      const [messages, total] = await Promise.all([
        prisma.message.findMany({
          where: { userId, leadId },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset
        }),
        prisma.message.count({ where: { userId, leadId } })
      ])

      return {
        data: messages,
        total,
        page: Math.floor(offset / limit) + 1,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    } catch (error) {
      console.error('Error getting messages:', error)
      return {
        data: [],
        total: 0,
        page: 1,
        limit,
        totalPages: 0
      }
    }
  }

  // Create message template
  static async createTemplate(
    userId: string,
    name: string,
    channel: MessageChannel,
    content: string,
    subject?: string,
    industry?: string,
    tags: string[] = []
  ): Promise<ApiResponse<any>> {
    try {
      const template = await prisma.messageTemplate.create({
        data: {
          userId,
          name,
          channel,
          content,
          subject: subject || null,
          industry: industry || null,
          tags
        }
      })

      return {
        data: template,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error creating template:', error)
      return {
        data: null,
        error: 'Failed to create template',
        success: false
      }
    }
  }

  // Helper function for credit costs
  private static getCreditCost(channel: MessageChannel): number {
    switch (channel) {
      case 'EMAIL': return 1
      case 'LINKEDIN': return 2
      case 'SMS': return 3
      case 'VOICE_CALL': return 5
      case 'WHATSAPP': return 2
      default: return 1
    }
  }
}

// ============================================================================
// ACTIVITY SERVICE
// ============================================================================

export class ActivityService {
  static async createActivity(
    userId: string,
    leadId: string,
    type: ActivityType,
    description: string
  ): Promise<void> {
    try {
      await prisma.activity.create({
        data: {
          userId,
          leadId,
          type,
          description
        }
      })
    } catch (error) {
      console.error('Error creating activity:', error)
    }
  }
}

// ============================================================================
// ANALYTICS SERVICE
// ============================================================================

export class AnalyticsService {
  static async getDashboardMetrics(userId: string): Promise<any> {
    try {
      const now = new Date()
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

      // Get total counts
      const [
        totalLeads,
        totalCampaigns,
        totalMessages,
        recentLeads,
        avgLeadScore,
        creditBalance
      ] = await Promise.all([
        prisma.lead.count({ where: { userId } }),
        prisma.campaign.count({ where: { userId } }),
        prisma.message.count({ where: { userId } }),
        prisma.lead.count({
          where: {
            userId,
            createdAt: { gte: thirtyDaysAgo }
          }
        }),
        prisma.lead.aggregate({
          where: { userId },
          _avg: { score: true }
        }),
        prisma.user.findUnique({
          where: { id: userId },
          select: { creditBalance: true }
        })
      ])

      return {
        totalLeads,
        totalCampaigns,
        totalMessages,
        recentLeads,
        avgLeadScore: avgLeadScore._avg.score || 0,
        creditBalance: creditBalance?.creditBalance || 0
      }
    } catch (error) {
      console.error('Error getting dashboard metrics:', error)
      return {}
    }
  }
}

// Export all services
export const apiClient = {
  CreditService,
  LeadService,
  CampaignService,
  MessageService,
  ActivityService,
  AnalyticsService
}
