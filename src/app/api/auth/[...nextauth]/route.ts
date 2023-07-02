import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaClient";
import type { Adapter } from "next-auth/adapters"
// import { login } from "@/service/auth";
const bcrypt = require("bcrypt")



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt"
  },
  secret: process.env.JWT_SECRET,
  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    //   }
    // ),
    CredentialsProvider({
      name: 'credentials',
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
          name: user.username,
          email: user.email,

        }
      }
    })
  ],
  callbacks: {
    session({session, token}){
      session.user.id = token.id
      return session
    },
    jwt: ({token,account, user}) => {
      if(account){
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    },
    async signIn() {
      return Promise.resolve(true);
    },
    async redirect() {
      return Promise.resolve("/");
    },

  },
  pages: {
    signIn: "/login"
  }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }