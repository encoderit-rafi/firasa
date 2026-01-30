import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";
type SectionProps = ComponentProps<"section">;
type SectionTitleProps = ComponentProps<"h2">;
type SectionLabelProps = ComponentProps<"span">;
function Section({ children, className, ...props }: SectionProps) {
  return (
    <section {...props} className={cn("py-24", className)}>
      {children}
    </section>
  );
}
function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <span
      {...props}
      className={cn("title-small-emphasized text-error", className)}
    >
      {children}
    </span>
  );
}
function SectionTitle({ children, className, ...props }: SectionTitleProps) {
  return (
    <h2
      {...props}
      className={cn("text-on-surface display-small-emphasized", className)}
    >
      {children}
    </h2>
  );
}
function SectionDescription({
  children,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <p
      {...props}
      className={cn("text-on-surface body-large-primary", className)}
    >
      {children}
    </p>
  );
}
export { Section, SectionLabel, SectionTitle, SectionDescription };
