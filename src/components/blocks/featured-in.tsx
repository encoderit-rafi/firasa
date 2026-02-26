"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function FeaturedIn() {
  const { t } = useTranslation();
  return (
    <section className="section space-y-8 overflow-x-hidden lg:space-y-24">
      <h6 className="text-outline text-center">{t("featured_in_title")}</h6>
      <div className="flex-center gap-24">
        <img
          src="/blink.png"
          alt="Blink logo"
          className="h-10 w-auto grayscale"
        />
        <img src="/ai.png" alt="AI logo" className="h-10 w-auto grayscale" />
        <img
          src="/forbes.png"
          alt="Forbes logo"
          className="h-10 w-auto grayscale"
        />
        <img
          src="/seedtable.png"
          alt="Seedtable logo"
          className="h-10 w-auto grayscale"
        />
        <img src="/spa.png" alt="SPA logo" className="h-10 w-auto grayscale" />
      </div>
    </section>
  );
}
