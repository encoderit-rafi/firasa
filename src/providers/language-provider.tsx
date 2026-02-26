"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/utlis/i18n";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = "ltr"; // Default to LTR for overall layout as requested
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Initial sync with detected/stored language
    const sync = () => {
      handleLanguageChange(i18n.language);
    };

    if (i18n.isInitialized) {
      sync();
    } else {
      i18n.on("initialized", sync);
    }

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
      i18n.off("initialized", () => {});
    };
  }, [i18n]);

  return <>{children}</>;
}
