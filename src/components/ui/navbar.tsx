import { Logo } from "@/assets/Logo";
import { ReactNode } from "react";
import { Button, buttonVariants } from "./button";

import { ArrowOutward, Menu, VideoCam } from "@/assets/icons";
import Translation from "./translation";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
  return (
    <div className="border-b border-secondary/10">
      <header className="container-lg px-3 xl:px-6 py-3 flex-between">
        <div className="flex-center gap-lg">
          <Logo />
          <NavList item={nav_items} />
        </div>
        <div className="hidden xl:flex flex-center gap-2">
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
      </header>
    </div>
  );
}
