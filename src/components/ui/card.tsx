import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}
function CardAvatar({
  className,
  src,
  name,
  role,
  ...props
}: React.ComponentProps<"div"> & {
  src: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={src}
        alt={name}
        width={60}
        height={60}
        className="bg-gradient size-15 rounded-full object-cover object-center p-0.5"
      />
      <div className="flex flex-col items-center">
        <span className="title-medium-emphasized bg-gradient bg-clip-text text-transparent">
          {role}
        </span>
        <span className="body-small-primary text-white">{name}</span>
      </div>
    </div>
  );
}
export {
  Card,
  CardHeader,
  CardAvatar,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
