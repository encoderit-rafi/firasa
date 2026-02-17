import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

export function ScorePageCard({
  className,
  children,
  ...props
}: ComponentProps<"div"> & PropsWithChildren) {
  return (
    <div {...props} className={cn("card-with-divider container-md", className)}>
      {children}
    </div>
  );
}

export function ScorePageNotchCard({
  title,
  className,
  children,
  ...props
}: { title: string } & ComponentProps<"div"> & PropsWithChildren) {
  return (
    <div className="border-t border-t-error-container  w-full">
      <div className="label-small-primary rounded-b-xl w-fit bg-error-container px-3 py-1 mx-auto">
        {title}
      </div>
      <div {...props} className={cn("flex-1 shrink-0 w-full pt-8", className)}>
        {children}
      </div>
    </div>
  );
}
