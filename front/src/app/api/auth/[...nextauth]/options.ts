import { LOGIN_URL } from "@/lib/apiEndPoint";
import axios from "axios";
import { type AuthOptions, type ISODateString } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomeSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  token?: string | null;
};

export const authOptions: AuthOptions = {

  secret: process.env.NEXTAUTH_SECRET ,

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomeSession;
      token: JWT;
      user: CustomUser;
    }) {
      session.user = token.user as CustomUser;
      return session;

    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",

     credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { data } = await axios.post(LOGIN_URL, credentials);
        const user = data?.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
