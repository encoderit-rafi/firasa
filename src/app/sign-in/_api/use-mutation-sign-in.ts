
import { api } from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { SignInType } from "../_types";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export const useMutationSignIn = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (body: SignInType) => {
      return api.post("/auth/login", body);
    },
    onSuccess: async (res) => {
      const response = res?.data;
      const { token, user, role } = response?.data;
      console.log("response success", response?.data);

      if (token?.access_token && token?.refresh_token) {
        const result = await signIn("credentials", {
          access_token: token.access_token,
          refresh_token: token.refresh_token,
          user_name: user?.name,
          user_email: user?.email,
          user_avatar: user?.avatar_url,
          user_role: role?.[0] || "",
          redirect: false,
          callbackUrl: "/",
        });

        if (result?.ok) {
          toast.success("Login successfully!");
          window.location.href = "/";
        } else {
          toast.error("Authentication failed");
        }
      }
    },
    onError: (error) => {
      const fallback = "Failed to login.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};