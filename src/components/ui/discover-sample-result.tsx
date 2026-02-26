"use client";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { ArrowForward } from "@/assets/icons";
import { useTranslation } from "react-i18next";
export default function DiscoverSampleResult({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  const { t } = useTranslation();
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
      {t("discover_sample_result")}
    </Link>
  );
}
