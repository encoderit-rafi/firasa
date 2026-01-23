import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto px-1", {
  variants: {
    variant: {
      default: "container",
      lg: "w-full max-w-360",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Container({
  className,
  variant = "default",
  // size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="container"
      data-variant={variant}
      className={cn(containerVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Container, containerVariants };
