import { api } from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignUpType } from "../_types/signUpTypes";

export const useMutationSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (body: SignUpType) => {
      return api.post("/auth/register", body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Account created successfully!");
      window.localStorage.setItem("verify_email", res.data.data.email);
      router.push("/verify-otp");
    },
    onError: (error) => {
      const fallback = "Failed to create account.";
      if (isAxiosError(error)) {
        const data = error.response?.data;

        if (data?.errors) {
          const firstError = Object.values(data.errors).flat()[0];
          toast.error((firstError as string) || fallback);
          return;
        }

        toast.error(data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
