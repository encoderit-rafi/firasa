// authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        access_token: {},
        refresh_token: {},
        user_name: {},
        user_email: {},
        user_avatar: {},
        user_role: {},
      },
      async authorize(credentials): Promise<User | null> {
        const accessToken = credentials?.access_token;
        const refreshToken = credentials?.refresh_token;

        if (accessToken && refreshToken) {
          return {
            id: credentials?.user_email || accessToken,
            name: credentials?.user_name || null,
            email: credentials?.user_email || null,
            avatar: credentials?.user_avatar || "",
            role: credentials?.user_role || "",
            token: {
              access_token: accessToken,
              refresh_token: refreshToken,
            },
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return "/";
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.role = user.role;
        token.avatar = user.avatar;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        token: token.token,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          role: token.role,
          avatar: token.avatar,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Host-authjs.csrf-token"
          : "authjs.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};