"use client"
import { OTPInput, type SlotProps } from "input-otp";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function OtpInput() {
    const id = useId();
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

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

    const handleResend = useCallback(() => {
        if (isResendDisabled) return;

        // TODO: Call your resend OTP API here
        console.log("Resending OTP...");

        // Reset the timer
        setTimer(30);
        setIsResendDisabled(true);
    }, [isResendDisabled]);

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
                    render={({ slots }) => (
                        <div className="flex gap-2">
                            {slots.map((slot, idx) => (
                                <Slot key={String(idx)} {...slot} />
                            ))}
                        </div>
                    )}
                />
            </div>
            <Button>Verify</Button>
            <Button
                variant="outline"
                disabled={isResendDisabled}
                onClick={handleResend}
            >
                {isResendDisabled
                    ? `Resend OTP ${formatTime(timer)}`
                    : "Resend OTP"}
            </Button>
        </>
    )
}

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                "flex md:h-[60px] md:w-[52px] h-[52px] w-[48px] items-center justify-center rounded-[14px] border border-[#E2E0DF] bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow]",
                { "z-10 border-[#FA6C12] ": props.isActive },
                { "z-10 border-[#FA6C12] ": props.char },
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
        </div>
    );
}