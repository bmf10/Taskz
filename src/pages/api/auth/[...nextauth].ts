import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import mongodb from "@/libs/mongodb"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter: MongoDBAdapter(mongodb, { databaseName: "taskz" }),
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      }
    },
  },
}

export default NextAuth(authOptions)
