import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;

export const FacebookFilled = ({ className, ...props }: Props) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      {...props}
    >
      <g clip-path="url(#clip0_61048_1762)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.95748 17.3242V9.33672H9.54416L9.96667 5.78672H6.95748V4.05787C6.95748 3.14374 6.98239 2.23672 8.34492 2.23672H9.72497V-0.301531C9.72497 -0.339694 8.53956 -0.425781 7.34032 -0.425781C4.83574 -0.425781 3.26749 1.04481 3.26749 3.74547V5.78672H0.5V9.33672H3.26749V17.3242H6.95748Z"
          fill="#3756F1"
        />
      </g>
      <defs>
        <clipPath id="clip0_61048_1762">
          <rect width="14" height="17.1483" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
