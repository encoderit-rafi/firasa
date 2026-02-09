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
        "size-6 bg-error-container rounded-full text-center flex-center",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
