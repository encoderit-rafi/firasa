import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = {
  className?: string;
} & ComponentProps<"div">;
export default function Separator({ className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        "h-1 min-w-24 w-full bg-linear-to-l from-transparent to-outline rounded-full",
        className,
      )}
    ></div>
  );
}
