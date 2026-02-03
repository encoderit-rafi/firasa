import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;

export const Triangle = ({ className, ...props }: Props) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      {...props}
    >
      <path d="M0 16L10 0L20 16H0Z" fill="url(#paint0_linear_61539_18458)" />
      <defs>
        <linearGradient
          id="paint0_linear_61539_18458"
          x1="20"
          y1="8"
          x2="4.36675e-08"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF77D7" />
          <stop offset="1" stop-color="#FA6C12" />
        </linearGradient>
      </defs>
    </svg>
  );
};
