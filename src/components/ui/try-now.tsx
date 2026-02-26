"use client";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
export default function TryNow({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  const { t } = useTranslation();
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
      {t("try_now")}
    </Link>
  );
}
