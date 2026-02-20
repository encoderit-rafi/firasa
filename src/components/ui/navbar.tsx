"use client";
import { Logo } from "@/assets/Logo";
import { ReactNode } from "react";
import { Button, buttonVariants } from "./button";

import { ArrowOutward, Menu, VideoCam } from "@/assets/icons";
import Translation from "./translation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SignOut from "./sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useSession } from "next-auth/react";
export type NavItemType = {
  label: ReactNode;
  href: string;
};
const nav_items: NavItemType[] = [
  {
    label: (
      <span className="flex-center">
        Descover
        <ArrowOutward />
      </span>
    ),
    href: "/descover",
  },
  { label: "How it works", href: "/how-it-works" },
  { label: "Solution", href: "/solution" },
  { label: "Pricing", href: "/pricing" },
];

function NavListItem({ item }: { item: NavItemType }) {
  return (
    <li key={item.href} className="body-large-primary text-neutral-10">
      <a href={item.href}>{item.label}</a>
    </li>
  );
}
function NavList({ item }: { item: NavItemType[] }) {
  return (
    <nav className="hidden md:block">
      <ul className="flex-center gap-lg">
        {item.map((item) => (
          <NavListItem key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="border-secondary/10 border-b">
      <header className="container-xl px-base flex-between py-3">
        <div className="flex-center gap-lg">
          <Logo />
          <NavList item={nav_items} />
        </div>

        {session?.user ? (
          <Link href="/profile">
            <Avatar className="border-blue size-13.5 border-4">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                // className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <>
            <div className="flex-center hidden gap-2 xl:flex">
              {/* <SignOut /> */}
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                )}
              >
                Sign in
              </Link>
              <Translation />
              <Link
                href="/upload"
                className={cn(
                  buttonVariants({
                    variant: "default",
                  }),
                )}
              >
                <VideoCam />
                Upload or record video
              </Link>
            </div>
            <Button variant={"ghost"} className="xl:hidden">
              <Menu />
            </Button>
          </>
        )}
      </header>
    </div>
  );
}
