import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { prisma } from '@/lib/prisma'

const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to dashboard after successful login
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/dashboard`
    },
    async session({ session, user }: { session: { user?: { id?: string } }; user: { id: string } }) {
      if (session?.user && user) {
        session.user.id = user.id
      }
      return session
    },
    async jwt({ token, user }: { token: { id?: string }; user?: { id: string } }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// @ts-expect-error - NextAuth v4 compatibility with Next.js 15
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }