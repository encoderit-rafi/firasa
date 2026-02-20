"use client";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { VideoCam } from "@/assets/icons";
export default function UploadOrRecordVideo({
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
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
      Upload or record video
    </Link>
  );
}
