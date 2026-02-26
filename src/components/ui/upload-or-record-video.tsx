"use client";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { VideoCam } from "@/assets/icons";
import { useTranslation } from "react-i18next";
export default function UploadOrRecordVideo({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  const { t } = useTranslation();
  return (
    <Link
      href="/upload"
      className={cn(
        buttonVariants({
          variant: "default",
        }),
        className,
      )}
      {...props}
    >
      <VideoCam />
      {t("upload_or_record")}
    </Link>
  );
}
