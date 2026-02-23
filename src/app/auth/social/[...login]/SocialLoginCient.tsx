

"use client";

import { signIn } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type Props = {
  data: {
    success: boolean;
    message: string;
    data: {
      user: {
        id: number;
        name: string;
        email: string;
        avatar_url: string;
        email_verified_at: string | null;
        created_at: string;
        is_admin: number;
      };
      token: {
        token: {
          token_type: string;
          expires_in: number;
          access_token: string;
          refresh_token: string;
        };
        user: {
          id: number;
          name: string;
          email: string;
          avatar_url: string;
          email_verified_at: string | null;
          created_at: string;
          is_admin: number;
        };
      };
    };
  };
};

export default function SocialLoginClient({ data }: Props) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleSignIn = async () => {
      if (!data?.success) {
        toast.error("Social authentication failed");
        return;
      }

      const { token, user } = data.data;
      const tokenData = token.token;

      if (tokenData?.access_token && tokenData?.refresh_token) {
        const result = await signIn("credentials", {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_in: String(tokenData.expires_in),
          user_name: user?.name,
          user_id: String(user?.id),
          user_email: user?.email,
          user_avatar: user?.avatar_url,
          user_role: user?.is_admin ? "admin" : "user",
          redirect: false,
          callbackUrl: "/",
        });

        if (result?.ok) {
          toast.success("Login successfully!");
          window.location.href = "/";
        } else {
          toast.error("Authentication failed");
        }
      } else {
        toast.error("Invalid token received");
      }
    };

    handleSignIn();
  }, [data]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground">Signing you in...</p>
    </div>
  );
}