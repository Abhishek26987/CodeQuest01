import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.sub
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }