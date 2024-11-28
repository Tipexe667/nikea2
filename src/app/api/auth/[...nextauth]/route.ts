import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import env from "@/lib/env"; // Assuming env is correctly exporting environment variables
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Validate required environment variables
if (!env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable.");
}
if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials (GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET).");
}

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Attach the user ID to the session object
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      try {
        await mergeAnonymousCartIntoUserCart(user.id); // Merge cart on sign-in
      } catch (error) {
        console.error("Error merging anonymous cart:", error);
      }
    },
  },
  secret: env.NEXTAUTH_SECRET, // Ensure the secret is used in production
};

// Export the handler for API routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
