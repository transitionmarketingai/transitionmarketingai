import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
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

        // Check demo credentials (skip onboarding for demo users)
        if (credentials.email === "demo@transitionai.com" && credentials.password === "demo123") {
          return {
            id: "demo-user",
            email: "demo@transitionai.com",
            name: "Demo User",
            image: null,
          }
        }
        
        // For real users, check database (TODO: implement Supabase auth)
        // For now, accept any valid email/password combo as demo
        if (credentials.email && credentials.password) {
          return {
            id: `user-${Date.now()}`,
            email: credentials.email,
            name: credentials.email.split('@')[0],
            image: null,
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
}
