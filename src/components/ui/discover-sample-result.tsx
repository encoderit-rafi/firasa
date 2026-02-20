"use client";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { ArrowForward } from "@/assets/icons";
export default function DiscoverSampleResult({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href="/profile"
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        className,
      )}
      {...props}
    >
      <ArrowForward />
      Discover sample result
    </Link>
  );
}
