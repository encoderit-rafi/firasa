import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;
export function ArrowOutward({ className, ...props }: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      {...props}
    >
      <path
        d="M4.26634 11.9999L3.33301 11.0666L9.73301 4.66659H3.99967V3.33325H11.9997V11.3333H10.6663V5.59992L4.26634 11.9999Z"
        fill="currentColor"
      />
    </svg>
  );
}
