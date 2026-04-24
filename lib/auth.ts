import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authSecret =
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV !== "production"
    ? "dev-only-secret-change-me"
    : undefined);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: authSecret,
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? session.user.email ?? "";
      }

      return session;
    }
  }
});
