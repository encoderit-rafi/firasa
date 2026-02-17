import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

export function ScorePageSection({
  className,
  children,
  ...props
}: ComponentProps<"section"> & PropsWithChildren) {
  return (
    <section {...props} className={cn("space-y-8", className)}>
      {children}
    </section>
  );
}
export function ScorePageSectionTitle({
  className,
  children,
  ...props
}: ComponentProps<"h2"> & PropsWithChildren) {
  return (
    <h2
      {...props}
      className={cn("display-large-emphasized text-center", className)}
    >
      {children}
    </h2>
  );
}
