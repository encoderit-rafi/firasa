"use client";

import { OTPInput, type SlotProps } from "input-otp";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
// import { Button } from "../../../components/ui/button";
import {
  useMutationVerifyOtp,
  useMutationResendOtp,
} from "@/app/verify-otp/_api/use-mutation-verify-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OtpInput() {
  const id = useId();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const { mutate: verifyOtp, isPending: isVerifying } = useMutationVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useMutationResendOtp();

  const getEmail = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("verify_email");
  }, []);

  useEffect(() => {
    const email = getEmail();
    if (!email) {
      toast.error("No email found. Please sign up again.");
      router.push("/sign-up");
    }
  }, [getEmail, router]);

  useEffect(() => {
    if (timer <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = useCallback(() => {
    const email = getEmail();

    if (!email) {
      toast.error("No email found. Please sign up again.");
      router.push("/sign-up");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    verifyOtp({
      email,
      otp_code: Number(otp),
    });
  }, [otp, getEmail, verifyOtp, router]);

  const handleResend = useCallback(() => {
    if (isResendDisabled) return;

    const email = getEmail();

    if (!email) {
      toast.error("No email found. Please sign up again.");
      router.push("/sign-up");
      return;
    }

    resendOtp(
      { email },
      {
        onSuccess: () => {
          setTimer(30);
          setIsResendDisabled(true);
        },
      },
    );
  }, [isResendDisabled, getEmail, resendOtp, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    }
    return `${secs}s`;
  };

  return (
    <>
      <div className="*:not-first:mt-2">
        <OTPInput
          containerClassName="flex items-center justify-center gap-3 has-disabled:opacity-50"
          id={id}
          maxLength={6}
          value={otp}
          onChange={setOtp}
          render={({ slots }) => (
            <div className="flex gap-2">
              {slots.map((slot, idx) => (
                <Slot key={String(idx)} {...slot} />
              ))}
            </div>
          )}
        />
      </div>
      <Button
        onClick={handleVerify}
        disabled={otp.length !== 6 || isVerifying}
        loading={isVerifying}
      >
        Verify
      </Button>
      <Button
        variant="outline"
        disabled={isResendDisabled || isResending}
        onClick={handleResend}
        loading={isResending}
      >
        {isResendDisabled ? `Resend OTP ${formatTime(timer)}` : "Resend OTP"}
      </Button>
    </>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex md:h-15 md:w-13 h-13 w-12 items-center justify-center rounded-[14px] border border-[#E2E0DF] bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow]",
        { "z-10 border-[#FA6C12] ": props.isActive },
        { "z-10 border-[#FA6C12] ": props.char },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
