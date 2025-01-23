import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./lib/db";
export const authConfig = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    credentials({
      async authorize(
        credentials: Partial<Record<string, unknown>>
      ): Promise<any> {
        if (!credentials) return null;
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: credentials.email as string },
            select: {
              id: true,
              email: true,
              role: true,
              status: true,
              password: true,
              name: true,
              image: true,
            },
          });

          if (
            dbUser &&
            (await bcrypt.compare(
              credentials.password as string,
              dbUser.password
            )) &&
            dbUser.role === "admin"
          ) {
            const { password, ...userWithoutPassword } = dbUser;
            return userWithoutPassword;
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user: any;
      trigger?: "signIn" | "signUp" | "update";
      session?: any;
    }) {
      if (user) {
        return {
          ...token,
          id: user.id as string,
          role: user.role as string,
          status: user.status as string,
          email: user.email as string,
          name: user.name as string,
          image: user.image as string,
        };
      }
      if (trigger === "update" && session.shopId) {
        return {
          ...token,
          id: session.user.id as string,
          role: session.user.role as string,
          status: session.user.status as string,
          email: session.user.email as string,
          name: session.user.name as string,
          image: session.user.image as string,
        };
      }
      return token;
    },

    session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.status = token.status as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image;
      return session;
    },
  },
} satisfies NextAuthConfig;
