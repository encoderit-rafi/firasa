"use client";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
export default function TryNow({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href="/upload"
      className={cn(
        buttonVariants({
          variant: "error",
          size: "error",
        }),
        className,
      )}
      {...props}
    >
      Try now
    </Link>
  );
}
