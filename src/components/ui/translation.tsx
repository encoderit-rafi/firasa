"use client";

import { useTranslation } from "react-i18next";
import { Language } from "@/assets/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export default function Translation() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className={cn(
          "w-fit max-w-40",
          buttonVariants({
            variant: "outline",
          }),
        )}
      >
        <div className="flex items-center gap-2">
          <Language className="size-4 text-black" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent
        className="border-outline-variant border"
        position="popper"
      >
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar">Arabic (العربية)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
