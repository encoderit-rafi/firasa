import Logo from "@/assets/Logo";
import React, { ReactNode } from "react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Languages } from "lucide-react";
import { ArrowOutward, Guard, Model, VideoCam } from "@/assets/icons";
import { PropsCardFeature } from "../cards/feature/CardFeature";
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
export default function Navbar() {
  return (
    <div className="border-b border-secondary/10">
      <header className="container-lg px-3 md:px-6 xl:px-12 py-3 flex-between">
        <div className="flex-center gap-12">
          <div className="flex-center gap-3">
            <Logo />
            <span className="headline-medium-emphasized">Firase</span>
          </div>
          <nav>
            <ul className="flex-center gap-12">
              {nav_items.map((item) => (
                <li
                  key={item.href}
                  className="body-large-primary text-neutral-10"
                >
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex-center gap-2">
          <Button variant={"ghost"}>Sign in</Button>
          <Select defaultValue="english" value="english">
            <SelectTrigger className="w-full max-w-48">
              <Languages className="text-black mr-2" />
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>
            <VideoCam />
            Upload or record video
          </Button>
        </div>
      </header>
    </div>
  );
}
