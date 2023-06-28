import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaClient";
import type { Adapter } from "next-auth/adapters"
// import { login } from "@/service/auth";
const bcrypt = require("bcrypt")



export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt"
  },
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
      async authorize(credentials) {
        const {email, password } = credentials as LoginUser
        if(!email ||!password) return null

        const user = await prisma.user.findUnique({
          where: {
              email: email
          }
        })
        if(!user) return null

        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword) return null

        return{
          id: user.id,
          email: user.email,

        }
      }
    })
  ],
  callbacks: {
    session({session, token}){
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        }
      }
    },
    jwt: ({token, user}) => {
      console.log('JWT Callback', { token, user })
      if(user) {
        return{
          ...token,
          id: user.id
        }
      }
      return token
    },
    async signIn(user, account, profile) {
      console.log("signIn")
      // Custom signIn callback
      // This callback is called after a successful sign-in

      // Redirect the user to the home page
      return 'http://localhost:3000/';
    }
  },
  // pages: {
  //   signIn: "/login"
  // }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }