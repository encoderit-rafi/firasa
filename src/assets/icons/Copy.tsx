import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;

export const Copy = ({ className, ...props }: Props) => {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      {...props}
    >
      <path
        d="M3.33317 3.33333V0.833333C3.33317 0.3731 3.70627 0 4.1665 0H14.1665C14.6267 0 14.9998 0.3731 14.9998 0.833333V12.5C14.9998 12.9602 14.6267 13.3333 14.1665 13.3333H11.6665V15.8326C11.6665 16.2932 11.2916 16.6667 10.8275 16.6667H0.838883C0.375492 16.6667 0 16.2962 0 15.8326L0.00216663 4.16739C0.00224996 3.70676 0.3772 3.33333 0.841183 3.33333H3.33317ZM4.99983 3.33333H11.6665V11.6667H13.3332V1.66667H4.99983V3.33333Z"
        fill="currentColor"
      />
    </svg>
  );
};
