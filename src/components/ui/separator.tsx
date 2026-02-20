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
        "to-outline h-1 w-full min-w-24 rounded-full bg-linear-to-l from-transparent",
        className,
      )}
    ></div>
  );
}
