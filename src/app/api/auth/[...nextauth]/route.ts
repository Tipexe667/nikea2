// Import required modules
import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import env from "@/lib/env"; // Assuming env is a module exporting environment variables
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Initialize Prisma Client
const prismaClient = new PrismaClient();

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient), // Use PrismaAdapter for NextAuth
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID, // Use environment variables
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id; // Ensure user id is attached to the session
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await mergeAnonymousCartIntoUserCart(user.id); // Merge cart on sign-in
    },
  },
  secret: env.NEXTAUTH_SECRET, // Ensure you have a secret for NextAuth
};

// Export the handler for API routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
