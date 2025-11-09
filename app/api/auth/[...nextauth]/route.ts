import NextAuth, { AuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { clientPromise } from '@/lib/mongodb'
import dbConnect from '@/lib/mongodb'
import User from '@/models/user'
import { nanoid } from 'nanoid'

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/join-us',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.roles = token.roles as string[]
        session.user.points = token.points as number
        session.user.rank = token.rank as string
        session.user.zeClubId = token.zeClubId as string
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        await dbConnect()
        const dbUser = await User.findOne({ email: user.email })
        if (dbUser) {
          if (!dbUser.discordId && account?.provider === 'discord') {
            dbUser.discordId = account.providerAccountId
            dbUser.zeClubId = `ZE-${nanoid(8)}`
            dbUser.points = 100
            dbUser.rank = 'Rookie'
            dbUser.roles = ['user']
            await dbUser.save()
          }
          token.id = dbUser._id.toString()
          token.roles = dbUser.roles
          token.points = dbUser.points
          token.rank = dbUser.rank
          token.zeClubId = dbUser.zeClubId
        }
      }
      return token
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        await dbConnect()
        const user = await User.findOne({ email: message.user.email })
        if (user && message.account?.provider === 'discord') {
          user.discordId = message.account.providerAccountId
          user.zeClubId = `ZE-${nanoid(8)}`
          user.points = 100
          user.rank = 'Rookie'
          user.roles = ['user']
          await user.save()
        }
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
