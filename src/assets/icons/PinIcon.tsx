import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;

export const PinIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      {...props}
    >
      <path
        d="M19.0919 8.4853L17.6777 9.8995L16.9706 9.1924L12.7279 13.435L12.0208 16.9706L10.6066 18.3848L6.36396 14.1421L1.41422 19.0919L0 17.6777L4.94975 12.7279L0.70711 8.4853L2.12132 7.07107L5.65686 6.36396L9.8995 2.12132L9.1924 1.41422L10.6066 0L19.0919 8.4853Z"
        fill="#FBBC05"
      />
    </svg>
  );
};
