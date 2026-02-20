"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { signOut, useSession } from "next-auth/react";
export default function SignOut() {
  const { data: session } = useSession();
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
      variant="gradient-blue"
      className="h-7.5"
    >
      Sign Out
    </Button>
  );
}
