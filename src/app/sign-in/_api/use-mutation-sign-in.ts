import { api } from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { SignInType } from "../_types";
import { toast } from "sonner";
export const useMutationSignIn = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (body: SignInType) => {
      return api.post("/auth/login", body);
    },
    onSuccess: () => {
      toast.success("Login successfully!");
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
