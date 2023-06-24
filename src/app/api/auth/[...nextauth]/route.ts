import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
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
      name: 'Log in',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username..." },
        email: {label: "Email", type: "email", placeholder: "youremail@email.com"},
        password: {  label: "Password", type: "password", placeholder: "password..." }
      },
      async authorize(credentials) {
        const user = {id: '1', name: "Tommy", username: "tommy89"}
        return user
      }
    })
  ],
  // pages: {
  //   signIn: "/login"
  // }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }