import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none overflow-hidden font-medium text-xs leading-4 tracking-wide px-2 py-1 text-white capitalize",
  {
    variants: {
      variant: {
        low: "bg-danger",
        moderate: "bg-warning text-black",
        high: "bg-success",
        text: "bg-white border border-error-container font-medium text-xs leading-4 tracking-wide p-1 pr-2 text-black",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  },
);

function Badge({
  className,
  variant = "text",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
