import NextAuth, {NextAuthOptions, User} from "next-auth"
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const NextAuthConfig = NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
        })
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn({user, account, profile}) {
            return true;
        },
    }

} as NextAuthOptions)