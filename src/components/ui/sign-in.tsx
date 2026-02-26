"use client";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
export default function SignIn({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  const { t } = useTranslation();
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
      {t("sign_in")}
    </Link>
  );
}
