"use client";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
export default function SignIn({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href="/sign-in"
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
        className,
      )}
      {...props}
    >
      Sign in
    </Link>
  );
}
