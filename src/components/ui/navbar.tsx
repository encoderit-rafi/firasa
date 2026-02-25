"use client";
import { useEffect, useState } from "react";
import { Logo } from "@/assets/Logo";
import { Button } from "./button";
import { ArrowOutward, Menu, VideoCam } from "@/assets/icons";
import Translation from "./translation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useSession } from "next-auth/react";
import SignIn from "./sign-in";
import UploadOrRecordVideo from "./upload-or-record-video";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { LogIn } from "lucide-react";

export type NavItemType = {
  label: string;
  href: string;
};

const nav_items: NavItemType[] = [
  { label: "Discover", href: "/#discover" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Solution", href: "/#solution" },
  { label: "Pricing", href: "/#pricing" },
];

function NavListItem({
  item,
  isActive,
}: {
  item: NavItemType;
  isActive: boolean;
}) {
  return (
    <li key={item.href} className="body-large-primary text-neutral-10">
      <Link href={item.href} className="flex-center">
        {item.label}
        {isActive && <ArrowOutward />}
      </Link>
    </li>
  );
}

function NavList({ activeSection }: { activeSection: string }) {
  return (
    <nav className="hidden md:block">
      <ul className="flex-center gap-lg">
        {nav_items.map((item) => (
          <NavListItem
            key={item.href}
            item={item}
            isActive={activeSection === item.href.replace("/#", "")}
          />
        ))}
      </ul>
    </nav>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    const sections = ["discover", "how-it-works", "solution", "pricing"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="border-bottom sticky top-0 z-50 bg-white">
      <header className="container-xl px-base flex-between py-3">
        <div className="flex-center gap-lg">
          <Logo />
          <NavList activeSection={activeSection} />
        </div>

        {session?.user ? (
          <Link href="/profile">
            <Avatar className="border-blue size-13.5 border-4">
              <AvatarImage
                src={session?.user?.avatar}
                alt={session?.user?.name || ""}
              />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <>
            <div className="flex-center hidden gap-2 xl:flex">
              <SignIn />
              <Translation />
              <UploadOrRecordVideo />
            </div>
            {/* <Button variant={"ghost"} className="xl:hidden">
              <Menu />
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="xl:hidden" size={"icon"}>
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mx-2">
                <Link href="/sign-in">
                  <DropdownMenuItem>
                    <LogIn />
                    Sign In
                  </DropdownMenuItem>
                </Link>
                <Link href="/upload">
                  <DropdownMenuItem>
                    <VideoCam />
                    Upload or record video
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </header>
    </div>
  );
}
