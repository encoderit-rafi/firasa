import { api } from "@/axios";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useMutationVerifyOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: (body: { email: string; otp_code: number }) => {
      return api.post("/auth/verify-otp", body);
    },
    onSuccess: (res) => {
      localStorage.removeItem("verify_email");
      toast.success(res?.data?.message || "OTP verified successfully!");
      router.push("/sign-in");
    },
    onError: (error) => {
      const fallback = "Failed to verify OTP.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};

export const useMutationResendOtp = () => {
  return useMutation({
    mutationKey: ["resend-otp"],
    mutationFn: (body: { email: string }) => {
      return api.post("/auth/resend-otp", body);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message || "OTP resent successfully!");
    },
    onError: (error) => {
      const fallback = "Failed to resend OTP.";
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message || fallback);
      } else {
        toast.error(fallback);
      }
    },
  });
};
