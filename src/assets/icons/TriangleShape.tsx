import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function TriangleShape({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-gradient clip-triangle size-6", className)}
      {...props}
    />
  );
}
