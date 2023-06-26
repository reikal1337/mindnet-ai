import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaClient";
import type { Adapter } from "next-auth/adapters"


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    //   }
    // ),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Log in',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {label: "Email", type: "email", placeholder: "youremail@email.com"},
        password: {  label: "Password", type: "password", placeholder: "password..." }
      },
      async authorize(credentials, req) {
        // const {email,password} = credentials
        
      }
    })
  ],
  // pages: {
  //   signIn: "/login"
  // }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }