// authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { API_BASE_URL } from "@/consts";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: token.token?.refresh_token,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { ...token, error: "RefreshTokenError" };
    }

    const newToken = data.data.token;

    return {
      ...token,
      token: {
        access_token: newToken.access_token,
        refresh_token: newToken.refresh_token,
      },
      accessTokenExpires: Date.now() + newToken.expires_in * 1000 - 60_000,
      error: undefined,
    };
  } catch (error) {
    return { ...token, error: "RefreshTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        access_token: {},
        refresh_token: {},
        expires_in: {},
        user_name: {},
        user_email: {},
        user_avatar: {},
        user_role: {},
      },
      async authorize(credentials): Promise<User | null> {
        const accessToken = credentials?.access_token;
        const refreshToken = credentials?.refresh_token;
        const expiresIn = credentials?.expires_in;

        if (!accessToken || !refreshToken) return null;

        // Use `as User` to satisfy TS if .d.ts isn't picked up
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
          accessTokenExpires:
            Date.now() + (Number(expiresIn) || 259200) * 1000 - 60_000,
        } as User;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return "/";
      return baseUrl;
    },

    async jwt({ token, user }) {
      // Initial sign-in
      if (user) {
        token.token = user.token;
        token.role = (user as User).role;
        token.avatar = (user as User).avatar;
        token.name = user.name;
        token.email = user.email;
        token.accessTokenExpires =
          (user as User).accessTokenExpires ||
          Date.now() + 259200 * 1000 - 60_000;
        return token;
      }

      // Token still valid
      if (
        token.accessTokenExpires &&
        Date.now() < Number(token.accessTokenExpires)
      ) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      return {
        ...session,
        token: token.token,
        error: token.error,
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
