import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;
export function ArrowDropdown({ className, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      className={cn("", className)}
      {...props}
      fill="currentColor"
    >
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  );
}
