"use client";
import { Logo } from "@/assets/Logo";
import { ReactNode } from "react";
import { Button, buttonVariants } from "./button";

import { ArrowOutward, Menu, VideoCam } from "@/assets/icons";
import Translation from "./translation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useSession } from "next-auth/react";
import SignIn from "./sign-in";
import UploadOrRecordVideo from "./upload-or-record-video";
export type NavItemType = {
  label: ReactNode;
  href: string;
};
const nav_items: NavItemType[] = [
  {
    label: (
      <span className="flex-center">
        Discover
        <ArrowOutward />
      </span>
    ),
    href: "/#discover",
  },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Solution", href: "/#solution" },
  { label: "Pricing", href: "/#pricing" },
];

function NavListItem({ item }: { item: NavItemType }) {
  return (
    <li key={item.href} className="body-large-primary text-neutral-10">
      <Link href={item.href}>{item.label}</Link>
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
    <div className="border-bottom sticky top-0 z-50 bg-white">
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
              <SignIn />
              <Translation />
              <UploadOrRecordVideo />
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
