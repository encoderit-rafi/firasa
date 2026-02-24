import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    token: {
      access_token: string;
      refresh_token: string;
    };
    role?: string;
    avatar?: string;
    method?: string;
    accessTokenExpires?: number;
  }

  interface Session extends DefaultSession {
    token: {
      access_token: string;
      refresh_token: string;
    };
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      avatar?: string;
      method?: string;
    };
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    token?: {
      access_token: string;
      refresh_token: string;
    };
    role?: string;
    avatar?: string;
    method?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
