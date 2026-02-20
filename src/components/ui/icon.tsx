import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

export default function Icon({
  className,
  children,
  ...props
}: ComponentProps<"span"> & PropsWithChildren) {
  return (
    <span
      className={cn(
        "bg-error-container flex-center size-6 rounded-full text-center",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
