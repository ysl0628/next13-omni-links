import NextAuth, { AuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/libs/prismadb'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      version: '2.0' // opt-in to Twitter OAuth 2.0
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error('Invalid credentials')
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.hashedPassword)
          throw new Error('Invalid credentials')

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isValid) throw new Error('Invalid credentials')

        return user
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      // 設定登入時將user的name 設為 prisma 的username
      const exists = await prisma.user.findUnique({
        where: {
          email: user.email as string
        }
      })

      if (account?.type === 'oauth' && !exists) {
        const defaultUsername = user?.email?.split('@')[0]

        try {
          const newUser = await prisma.user.create({
            data: {
              username: defaultUsername,
              name: user.name,
              email: user.email,
              emailVerified: null,
              createdAt: new Date(),
              updatedAt: new Date(),
              image: user.image
            }
          })

          await prisma.account.create({
            data: {
              type: account.type,
              userId: newUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              token_type: account.token_type,
              scope: account.scope,
              expires_at: account.expires_at
            }
          })
        } catch (error) {
          console.log('error', error)
        }
        return true
      }
      return true
    }
  },
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
