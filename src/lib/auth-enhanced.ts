// Enhanced Authentication with Prisma and Credit System Integration
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptionsEnhanced: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Demo user (skip onboarding for demo users)
          if (credentials.email === "demo@transitionai.com" && credentials.password === "demo123") {
            return {
              id: "demo-user",
              email: "demo@transitionai.com",
              name: "Demo User",
              image: null,
              plan: "STARTER",
              creditBalance: 500,
            }
          }

          // Look up user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              email: true,
              name: true,
              avatar: true,
              plan: true,
              creditBalance: true,
              status: true,
              password: true, // We'll add password field later
            }
          })

          if (!user) {
            return null
          }

          // For now, bypass password check (we'll implement proper password hashing later)
          // TODO: Implement proper password verification
          if (credentials.password === "password123") {
            return {
              id: user.id,
              email: user.email,
              name: user.name || user.email.split('@')[0],
              image: user.avatar,
              plan: user.plan,
              creditBalance: user.creditBalance,
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        // Handle Google OAuth sign-in
        try {
          let dbUser = await prisma.user.findUnique({
            where: { email: token.email! }
          })

          if (!dbUser) {
            // Create new user for Google OAuth
            dbUser = await prisma.user.create({
              data: {
                email: token.email!,
                name: token.name || token.email!.split('@')[0],
                avatar: token.picture,
                plan: 'STARTER',
                creditBalance: 500, // Welcome credits
              }
            })

            // Log credit transaction
            await prisma.creditTransaction.create({
              data: {
                userId: dbUser.id,
                type: 'BONUS',
                amount: 500,
                description: 'Welcome bonus credits',
                metadata: { source: 'google_oauth_signup' }
              }
            })
          } else {
            // Update last login
            await prisma.user.update({
              where: { id: dbUser.id },
              data: { lastLoginAt: new Date() }
            })
          }

          token.id = dbUser.id
          token.plan = dbUser.plan
          token.creditBalance = dbUser.creditBalance
        } catch (error) {
          console.error('Google auth error:', error)
        }
      }

      if (user) {
        token.id = user.id
        token.plan = (user as any).plan
        token.creditBalance = (user as any).creditBalance
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).plan = token.plan as string
        (session.user as any).creditBalance = token.creditBalance as number
      }
      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
}

// Helper functions for user management
export class UserAuthService {
  static async createUser(email: string, name: string, password?: string): Promise<any> {
    try {
      const hashedPassword = password ? await bcrypt.hash(password, 12) : null

      const user = await prisma.user.create({
        data: {
          email,
          name,
          plan: 'STARTER',
          creditBalance: 500, // Welcome credits
          // password: hashedPassword, // We'll add password field to schema later
        }
      })

      // Log welcome credits
      await prisma.creditTransaction.create({
        data: {
          userId: user.id,
          type: 'BONUS',
          amount: 500,
          description: 'Welcome bonus credits',
          metadata: { source: 'account_creation' }
        }
      })

      return user
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  static async getUserById(userId: string): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          businessProfile: true,
          _count: {
            select: {
              leads: true,
              campaigns: true,
              messages: true,
              activities: true
            }
          }
        }
      })
      return user
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  static async updateUserProfile(userId: string, data: any): Promise<any> {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          ...data,
          updatedAt: new Date()
        }
      })
      return user
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  static async getUserStats(userId: string): Promise<any> {
    try {
      const [
        totalLeads,
        totalCampaigns,
        totalMessages,
        creditBalance,
        recentActivity
      ] = await Promise.all([
        prisma.lead.count({ where: { userId } }),
        prisma.campaign.count({ where: { userId } }),
        prisma.message.count({ where: { userId } }),
        prisma.user.findUnique({
          where: { id: userId },
          select: { creditBalance: true }
        }),
        prisma.activity.findMany({
          where: { userId },
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { lead: true }
        })
      ])

      return {
        totalLeads,
        totalCampaigns,
        totalMessages,
        creditBalance: creditBalance?.creditBalance || 0,
        recentActivity
      }
    } catch (error) {
      console.error('Error getting user stats:', error)
      return {}
    }
  }

  static async updateLastLogin(userId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { lastLoginAt: new Date() }
      })
    } catch (error) {
      console.error('Error updating last login:', error)
    }
  }
}

// Export enhanced auth options
export { authOptionsEnhanced as authOptions }
