import Separator from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
export type PropsCardFeature = {
  title: string;
  description: string;
  icon: ReactNode;
  type?: "default" | "reverse";
};
export default function CardFeature({
  data: { title, description, icon, type = "default" },
  className,
}: {
  data: PropsCardFeature;
  className?: ComponentProps<"div">["className"];
}) {
  const isReverse = type === "reverse";
  return (
    <div
      className={cn(
        "flex-center gap-3",
        {
          "flex-row-reverse": isReverse,
        },
        className,
      )}
    >
      {icon}
      <div className="flex flex-col">
        <div
          className={cn("flex-center gap-3 text-nowrap", {
            "flex-row-reverse": isReverse,
          })}
        >
          <h5 className="title-small-emphasized text-error">{title}</h5>
          <Separator
            className={cn("", {
              "rotate-180": isReverse,
            })}
          />
        </div>
        <p
          className={cn(
            "body-small-primary text-left text-on-surface-variant",
            {
              "text-right": isReverse,
            },
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
