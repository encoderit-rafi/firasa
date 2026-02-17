"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SocialCallback() {
  const params = useSearchParams();

  useEffect(() => {
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const user_email = params.get("user_email");
    const user_name = params.get("user_name");
    const user_avatar = params.get("user_avatar");
    const user_role = params.get("user_role");

    if (access_token && refresh_token) {
      //   signIn("credentials", {
      //     access_token,
      //     refresh_token,
      //     user_email,
      //     user_name,
      //     user_avatar,
      //     user_role,
      //     redirect: true,
      //     callbackUrl: "/",
      //   });
      console.log(
        "social login",
        access_token,
        refresh_token,
        user_email,
        user_name,
        user_avatar,
        user_role,
      );
    }
  }, [params]);

  return <p>Signing you in...</p>;
}
