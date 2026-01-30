import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;
export function Linkedin({ className, ...props }: Props) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      {...props}
    >
      <path
        d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44771 18 0 17.5523 0 17V1C0 0.44772 0.44771 0 1 0ZM2 2V16H16V2H2ZM4.5 6C3.67157 6 3 5.32843 3 4.5C3 3.67157 3.67157 3 4.5 3C5.32842 3 6 3.67157 6 4.5C6 5.32843 5.32842 6 4.5 6ZM3.5 7H5.5V14.5H3.5V7ZM9.00002 7.4295C9.58442 6.86534 10.2655 6.5 11 6.5C13.071 6.5 14.5 8.1789 14.5 10.25V14.5H12.5V10.25C12.5 9.2835 11.7165 8.5 10.75 8.5C9.78352 8.5 9.00002 9.2835 9.00002 10.25V14.5H7.00002V7H9.00002V7.4295Z"
        fill="#79747E"
      />
    </svg>
  );
}
