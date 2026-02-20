"use client";

import { OTPInput, type SlotProps } from "input-otp";
import { useId } from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>OTP input (spaced)</Label>
      <OTPInput
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        id={id}
        maxLength={4}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={String(idx)} {...slot} />
            ))}
          </div>
        )}
      />
      <p
        aria-live="polite"
        className="text-muted-foreground mt-2 text-xs"
        role="region"
      >
        Built with{" "}
        <a
          className="hover:text-foreground underline"
          href="https://github.com/guilhermerodz/input-otp"
          rel="noreferrer noopener nofollow"
          target="_blank"
        >
          Input OTP
        </a>
      </p>
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
