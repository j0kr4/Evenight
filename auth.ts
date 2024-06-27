import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UsersController } from "./src/lib/controllers/UsersController";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = (await UsersController.login(
          credentials.email,
          credentials.password
        )) as User;

        if (!user) {
          return "Invalid email or password";
        }

        const { id, email, name } =
          (await UsersController.login(
            credentials.email,
            credentials.password
          )) || {};

        if (!id || !email) {
          return null;
        }

        const nextAuthUser = {
          id: id,
          email: email,
          name: name,
        };

        return nextAuthUser;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
