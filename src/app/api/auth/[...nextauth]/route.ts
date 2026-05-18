import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Placeholder for actual DB authentication
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin") {
          return { id: "1", name: "Admin User", email: "admin@example.com", role: "ADMIN" };
        }
        if (credentials?.email && credentials?.password) {
           return { id: "2", name: "Demo User", email: credentials.email, role: "USER" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_development_only_12345',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
