"use client"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { signOut, useSession } from "next-auth/react";
export default function SignOut() {
    const { data: session } = useSession();
    return (
        <>
            {session?.user ? <Button onClick={() => signOut({ callbackUrl: "/sign-in" })}>Sign Out</Button> : <Link
                href="/sign-in"
                className={cn(
                    buttonVariants({
                        variant: "ghost",
                    }),
                )}
            >
                Sign in
            </Link>}
        </>
    )
}