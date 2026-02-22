"use client";
import { Button } from "./button";
import { signOut } from "next-auth/react";
export default function SignOut() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
      variant="gradient-blue"
      className="h-8"
    >
      Sign Out
    </Button>
  );
}
