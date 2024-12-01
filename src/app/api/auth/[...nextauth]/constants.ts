import prisma from "@/utils/db/prisma";
import { AuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;
        const userFromDb = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!userFromDb) return null;

        const isPasswordCorrect = await bcrypt.compare(
          password,
          userFromDb.password
        );
        if (!isPasswordCorrect) return null;

        return {
          id: userFromDb.id,
          email: userFromDb.email,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};
