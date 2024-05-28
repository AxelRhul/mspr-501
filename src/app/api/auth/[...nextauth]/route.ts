import NextAuth, {NextAuthOptions, User} from "next-auth"
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn(user, account, profile) {
            return true;
        },
    }

} as NextAuthOptions)

export { handler as GET, handler as POST }