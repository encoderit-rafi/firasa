import CircularProgress from "@/components/charts/CircularProgress";
import { DerivedMetric } from "@/global-types";
import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

export default function ScorePageProgress({
  score,
  level,
  title,
}: {
  title: string;
} & Pick<DerivedMetric, "level" | "score">) {
  return (
    <div className="flex flex-col items-center gap-1">
      <CircularProgress level={level} progress={score} />
      <span className="label-small-primary capitalize">
        {title.split("_").join(" ")}
      </span>
    </div>
  );
}
export function ProgressBox({
  className,
  children,
  ...props
}: PropsWithChildren & ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex flex-col items-center gap-1", className)}
    >
      {children}
    </div>
  );
}
export function ProgressLabel({
  className,
  children,
  ...props
}: PropsWithChildren & ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={cn("label-small-primary capitalize", className)}
    >
      {children}
    </span>
  );
}
