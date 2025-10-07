import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-enhanced';

// Analytics Service
class AnalyticsService {
  // Track user activity
  async trackActivity(userId: string, activityType: string, metadata: any = {}): Promise<void> {
    try {
      await prisma.activity.create({
        data: {
          userId: userId,
          type: activityType,
          description: this.getActivityDescription(activityType, metadata),
          metadata: metadata,
          createdAt: new Date()
        }
      });
    } catch (error) {
      console.error('Activity tracking error:', error);
    }
  }

  // Get activity description
  private getActivityDescription(activityType: string, metadata: any): string {
    switch (activityType) {
      case 'LOGIN':
        return 'User logged in';
      case 'LEAD_GENERATED':
        return `Generated ${metadata.count || 1} leads`;
      case 'EMAIL_SENT':
        return `Email sent to ${metadata.recipient || 'lead'}`;
      case 'WHATSAPP_SENT':
        return `WhatsApp message sent to ${metadata.recipient || 'lead'}`;
      case 'LINKEDIN_MESSAGE_SENT':
        return `LinkedIn message sent to ${metadata.recipient || 'lead'}`;
      case 'LEAD_ENRICHED':
        return `Lead enriched with ${metadata.sources?.join(', ') || 'data'}`;
      case 'CRM_SYNC':
        return `Lead synced to ${metadata.crmTypes?.join(', ') || 'CRM'}`;
      case 'CAMPAIGN_CREATED':
        return `Campaign "${metadata.campaignName || 'Untitled'}" created`;
      case 'CAMPAIGN_STARTED':
        return `Campaign "${metadata.campaignName || 'Untitled'}" started`;
      case 'CAMPAIGN_COMPLETED':
        return `Campaign "${metadata.campaignName || 'Untitled'}" completed`;
      case 'CREDIT_PURCHASED':
        return `Purchased ${metadata.amount || 0} credits`;
      case 'CREDIT_USED':
        return `Used ${metadata.amount || 0} credits for ${metadata.purpose || 'service'}`;
      default:
        return `Activity: ${activityType}`;
    }
  }

  // Generate dashboard analytics
  async getDashboardAnalytics(userId: string, period: string = '30d'): Promise<any> {
    try {
      const startDate = this.getStartDate(period);
      
      // Get basic metrics
      const [
        totalLeads,
        totalCampaigns,
        totalMessages,
        totalCreditsUsed,
        recentActivities
      ] = await Promise.all([
        prisma.lead.count({
          where: {
            userId: userId,
            createdAt: { gte: startDate }
          }
        }),
        prisma.campaign.count({
          where: {
            userId: userId,
            createdAt: { gte: startDate }
          }
        }),
        prisma.message.count({
          where: {
            userId: userId,
            createdAt: { gte: startDate }
          }
        }),
        prisma.creditTransaction.aggregate({
          where: {
            userId: userId,
            type: 'CONSUMPTION',
            createdAt: { gte: startDate }
          },
          _sum: { amount: true }
        }),
        prisma.activity.findMany({
          where: {
            userId: userId,
            createdAt: { gte: startDate }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        })
      ]);

      // Get lead generation trends
      const leadTrends = await this.getLeadTrends(userId, period);
      
      // Get message performance
      const messagePerformance = await this.getMessagePerformance(userId, period);
      
      // Get campaign performance
      const campaignPerformance = await this.getCampaignPerformance(userId, period);
      
      // Get credit usage trends
      const creditTrends = await this.getCreditTrends(userId, period);

      return {
        overview: {
          totalLeads,
          totalCampaigns,
          totalMessages,
          totalCreditsUsed: Math.abs(totalCreditsUsed._sum.amount || 0),
          period: period
        },
        trends: {
          leads: leadTrends,
          messages: messagePerformance,
          campaigns: campaignPerformance,
          credits: creditTrends
        },
        recentActivities: recentActivities.map(activity => ({
          id: activity.id,
          type: activity.type,
          description: activity.description,
          createdAt: activity.createdAt,
          metadata: activity.metadata
        }))
      };

    } catch (error) {
      console.error('Dashboard analytics error:', error);
      return {
        overview: {
          totalLeads: 0,
          totalCampaigns: 0,
          totalMessages: 0,
          totalCreditsUsed: 0,
          period: period
        },
        trends: {
          leads: [],
          messages: [],
          campaigns: [],
          credits: []
        },
        recentActivities: []
      };
    }
  }

  // Get lead generation trends
  private async getLeadTrends(userId: string, period: string): Promise<any[]> {
    const startDate = this.getStartDate(period);
    const groupBy = this.getGroupBy(period);

    const trends = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC(${groupBy}, "createdAt") as date,
        COUNT(*) as count,
        COUNT(CASE WHEN "source" = 'ai_generation' THEN 1 END) as ai_generated,
        COUNT(CASE WHEN "source" = 'linkedin_sales_navigator' THEN 1 END) as linkedin_generated,
        COUNT(CASE WHEN "source" = 'manual' THEN 1 END) as manual
      FROM "Lead"
      WHERE "userId" = ${userId} 
        AND "createdAt" >= ${startDate}
      GROUP BY DATE_TRUNC(${groupBy}, "createdAt")
      ORDER BY date ASC
    `;

    return trends;
  }

  // Get message performance
  private async getMessagePerformance(userId: string, period: string): Promise<any> {
    const startDate = this.getStartDate(period);

    const performance = await prisma.message.groupBy({
      by: ['channel', 'status'],
      where: {
        userId: userId,
        createdAt: { gte: startDate }
      },
      _count: { id: true }
    });

    const channelStats = {};
    performance.forEach(stat => {
      if (!channelStats[stat.channel]) {
        channelStats[stat.channel] = {};
      }
      channelStats[stat.channel][stat.status] = stat._count.id;
    });

    return channelStats;
  }

  // Get campaign performance
  private async getCampaignPerformance(userId: string, period: string): Promise<any[]> {
    const startDate = this.getStartDate(period);

    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: userId,
        createdAt: { gte: startDate }
      },
      include: {
        leads: true,
        messages: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return campaigns.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      totalLeads: campaign.totalLeadsFound,
      leadsProcessed: campaign.leadsProcessed,
      conversionRate: campaign.conversionRate,
      messagesSent: campaign.messages.length,
      createdAt: campaign.createdAt,
      performance: {
        openRate: this.calculateOpenRate(campaign.messages),
        responseRate: this.calculateResponseRate(campaign.messages),
        clickRate: this.calculateClickRate(campaign.messages)
      }
    }));
  }

  // Get credit usage trends
  private async getCreditTrends(userId: string, period: string): Promise<any[]> {
    const startDate = this.getStartDate(period);
    const groupBy = this.getGroupBy(period);

    const trends = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC(${groupBy}, "createdAt") as date,
        SUM(CASE WHEN "type" = 'CONSUMPTION' THEN ABS("amount") ELSE 0 END) as used,
        SUM(CASE WHEN "type" = 'PURCHASE' THEN "amount" ELSE 0 END) as purchased
      FROM "CreditTransaction"
      WHERE "userId" = ${userId} 
        AND "createdAt" >= ${startDate}
      GROUP BY DATE_TRUNC(${groupBy}, "createdAt")
      ORDER BY date ASC
    `;

    return trends;
  }

  // Calculate open rate
  private calculateOpenRate(messages: any[]): number {
    if (messages.length === 0) return 0;
    const opened = messages.filter(m => m.openedAt).length;
    return (opened / messages.length) * 100;
  }

  // Calculate response rate
  private calculateResponseRate(messages: any[]): number {
    if (messages.length === 0) return 0;
    const replied = messages.filter(m => m.repliedAt).length;
    return (replied / messages.length) * 100;
  }

  // Calculate click rate
  private calculateClickRate(messages: any[]): number {
    if (messages.length === 0) return 0;
    const clicked = messages.filter(m => m.clickedAt).length;
    return (clicked / messages.length) * 100;
  }

  // Get start date based on period
  private getStartDate(period: string): Date {
    const now = new Date();
    switch (period) {
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      case '1y':
        return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
  }

  // Get group by clause based on period
  private getGroupBy(period: string): string {
    switch (period) {
      case '7d':
        return 'day';
      case '30d':
        return 'day';
      case '90d':
        return 'week';
      case '1y':
        return 'month';
      default:
        return 'day';
    }
  }

  // Generate AI insights
  async generateAIInsights(userId: string): Promise<any> {
    try {
      const analytics = await this.getDashboardAnalytics(userId, '30d');
      
      // Generate insights based on data
      const insights = [];

      // Lead generation insights
      if (analytics.overview.totalLeads > 0) {
        const leadTrend = analytics.trends.leads;
        if (leadTrend.length > 1) {
          const recent = leadTrend[leadTrend.length - 1];
          const previous = leadTrend[leadTrend.length - 2];
          const growth = ((recent.count - previous.count) / previous.count) * 100;
          
          if (growth > 20) {
            insights.push({
              type: 'positive',
              category: 'lead_generation',
              title: 'Strong Lead Growth',
              description: `Your lead generation has grown by ${growth.toFixed(1)}% in the recent period.`,
              recommendation: 'Consider scaling your successful campaigns to maximize this momentum.'
            });
          } else if (growth < -10) {
            insights.push({
              type: 'warning',
              category: 'lead_generation',
              title: 'Lead Generation Decline',
              description: `Your lead generation has decreased by ${Math.abs(growth).toFixed(1)}% recently.`,
              recommendation: 'Review your targeting criteria and consider expanding to new industries or locations.'
            });
          }
        }
      }

      // Message performance insights
      const messageStats = analytics.trends.messages;
      if (messageStats.EMAIL) {
        const emailStats = messageStats.EMAIL;
        const totalSent = (emailStats.sent || 0) + (emailStats.failed || 0);
        if (totalSent > 0) {
          const openRate = ((emailStats.opened || 0) / totalSent) * 100;
          if (openRate < 20) {
            insights.push({
              type: 'warning',
              category: 'email_performance',
              title: 'Low Email Open Rate',
              description: `Your email open rate is ${openRate.toFixed(1)}%, which is below industry average.`,
              recommendation: 'Improve your subject lines and consider personalizing your messages more effectively.'
            });
          }
        }
      }

      // Credit usage insights
      if (analytics.overview.totalCreditsUsed > 0) {
        const creditTrend = analytics.trends.credits;
        if (creditTrend.length > 0) {
          const avgDailyUsage = analytics.overview.totalCreditsUsed / 30;
          if (avgDailyUsage > 100) {
            insights.push({
              type: 'info',
              category: 'credit_usage',
              title: 'High Credit Usage',
              description: `You're using an average of ${avgDailyUsage.toFixed(1)} credits per day.`,
              recommendation: 'Consider upgrading your plan or optimizing your campaigns for better efficiency.'
            });
          }
        }
      }

      // Campaign performance insights
      const campaigns = analytics.trends.campaigns;
      if (campaigns.length > 0) {
        const avgConversionRate = campaigns.reduce((sum, c) => sum + c.conversionRate, 0) / campaigns.length;
        if (avgConversionRate > 15) {
          insights.push({
            type: 'positive',
            category: 'campaign_performance',
            title: 'Excellent Conversion Rate',
            description: `Your average conversion rate is ${avgConversionRate.toFixed(1)}%, which is above industry standards.`,
            recommendation: 'Replicate the strategies from your best-performing campaigns across new initiatives.'
          });
        }
      }

      return {
        insights: insights,
        generatedAt: new Date().toISOString(),
        period: '30d'
      };

    } catch (error) {
      console.error('AI insights generation error:', error);
      return {
        insights: [],
        generatedAt: new Date().toISOString(),
        period: '30d'
      };
    }
  }
}

const analyticsService = new AnalyticsService();

// Track activity
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { activityType, metadata } = await request.json();

    if (!activityType) {
      return NextResponse.json(
        { error: 'Activity type is required' },
        { status: 400 }
      );
    }

    await analyticsService.trackActivity(session.user.id, activityType, metadata);

    return NextResponse.json({
      success: true,
      message: 'Activity tracked successfully'
    });

  } catch (error) {
    console.error('Activity tracking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get dashboard analytics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';
    const includeInsights = searchParams.get('insights') === 'true';

    const analytics = await analyticsService.getDashboardAnalytics(session.user.id, period);

    if (includeInsights) {
      const insights = await analyticsService.generateAIInsights(session.user.id);
      analytics.insights = insights;
    }

    return NextResponse.json({
      success: true,
      analytics: analytics
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get AI insights
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const insights = await analyticsService.generateAIInsights(session.user.id);

    // Save insights to database
    await prisma.aiInsight.create({
      data: {
        userId: session.user.id,
        insights: insights.insights,
        period: insights.period,
        generatedAt: new Date(insights.generatedAt)
      }
    });

    return NextResponse.json({
      success: true,
      insights: insights
    });

  } catch (error) {
    console.error('AI insights API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
