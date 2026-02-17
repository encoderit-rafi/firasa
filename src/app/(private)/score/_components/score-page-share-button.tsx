import { cn } from "@/lib/utils";
import { Share } from "lucide-react";
import { ComponentProps, PropsWithChildren } from "react";

export default function ScorePageShareButton({
  className,
  children,
  ...props
}: ComponentProps<"button"> & PropsWithChildren) {
  return (
    <button
      {...props}
      className={cn(
        "absolute cursor-pointer top-0 left-full bg-error-container flex items-center justify-center gap-2 h-8 w-24 rounded-b-lg -translate-x-8 translate-y-8 -rotate-90",
        className,
      )}
    >
      <Share className="size-3" />
      <span className="label-small-primary">Share</span>
    </button>
  );
}
