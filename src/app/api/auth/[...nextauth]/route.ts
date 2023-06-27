import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaClient";
import type { Adapter } from "next-auth/adapters"
import { login } from "@/service/auth";


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
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {label: "Email", type: "email", placeholder: "youremail@email.com"},
        password: {  label: "Password", type: "password", placeholder: "password..." }
      },
      async authorize(credentials, req) {
        const {email, password } = credentials as LoginUser
          const isAuthenticated = await login(email, password)
          if(isAuthenticated){
            console.log("Logged in!")
            return credentials
          }
          console.log("Didin't log in!")
          return null
      }
    })
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Custom signIn callback
      // This callback is called after a successful sign-in

      // Redirect the user to the home page
      return 'http://localhost:3000/';
    }
  },
  pages: {
    signIn: "/login"
  }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }