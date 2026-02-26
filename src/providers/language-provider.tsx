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
      document.documentElement.dir = "ltr";
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Initial sync with detected/stored language
    if (i18n.isInitialized) {
      handleLanguageChange(i18n.language);
    } else {
      i18n.on("initialized", () => {
        handleLanguageChange(i18n.language);
      });
    }

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
      i18n.off("initialized", () => {});
    };
  }, [i18n]);

  return <>{children}</>;
}
