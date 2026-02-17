import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

export default function ScorePageContainer({
  type = "left",
  className,
  children,
  ...props
}: {
  type: "left" | "right";
} & ComponentProps<"div"> &
  PropsWithChildren) {
  return (
    <div
      {...props}
      className={cn(
        "flex-1 w-full lg:w-1/2 shrink-0",
        {
          "max-lg:pb-8 lg:pr-8": type === "left",
          "max-lg:pt-8 lg:pl-8": type === "right",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
