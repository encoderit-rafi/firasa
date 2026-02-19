import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-full label-large-primary hover:shadow-sm transition-all duration-300 ease-in-out cursor-pointer h-10",

  {
    variants: {
      variant: {
        // default: "bg-primary text-primary-foreground hover:bg-primary/90",
        default: "bg-gradient",
        "icon-muted":
          "bg-muted-gray hover:bg-linear-to-l from-[#FF77D7] to-[#FA6C12] size-10 text-on-surface rounded-full",
        "gradient-blue": "bg-gradient-blue text-white font-bold font-inter",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border border-outline text-outline title-medium-primary",
        "outline-variant":
          "border border-outline-variant text-on-background title-medium-primary ",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:shadow-none hover:underline",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "bg-error-container rounded-full",
        error: "text-white title-medium-primary rounded-full bg-danger",
        black: "bg-on-surface text-white label-large-primary rounded-full",
        absolute:
          "absolute cursor-pointer top-0 left-full bg-error-container flex items-center justify-center gap-2 h-8 w-24 rounded-t-none rounded-b-lg -translate-x-8 translate-y-8 -rotate-90 label-small-primary",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-4",
        error: "py-4 px-6 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "p-6 has-[>svg]:px-4",

        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  children,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </Comp>
  );
}

export { Button, buttonVariants };
