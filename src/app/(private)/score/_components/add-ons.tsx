"use client";
import React from "react";
import { ScorePageCard } from "./score-page-card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function AddOns() {
  const { t } = useTranslation();

  const level_up_items = [
    {
      title: t("addons_discover_around"),
      price: 79,
      time: t("addons_one_time"),
      type: "regular",
      badge: {
        icon: "🗒",
        description: t("addons_7_reports"),
      },
    },
    {
      title: t("addons_partner_match"),
      price: 7,
      time: t("addons_one_time"),
      type: "disabled",
      badge: {
        icon: "🤝",
        description: t("addons_coming_soon"),
      },
    },
    {
      title: t("addons_monthly_pass"),
      price: 29,
      time: t("addons_mo"),
      type: "regular",
      badge: {
        icon: "📊",
        description: t("addons_7_reports"),
      },
    },
    {
      title: t("addons_discover_around"),
      price: 79,
      time: t("addons_one_time"),
      type: "popular",
      badge: {
        icon: "🗃",
        description: t("addons_7_reports"),
      },
    },
  ];

  return (
    <ScorePageCard className="flex flex-col items-center justify-between gap-6 divide-none bg-transparent lg:flex-row">
      {level_up_items.map((item, index) => (
        <div
          key={item.title + index}
          className={cn(
            "bg-error-container/16 divide-error-container relative flex size-full flex-col divide-y rounded-xl p-8",
            {
              "opacity-25": item.type == "disabled",
              "border-error border": item.type == "popular",
            },
          )}
        >
          {item.type == "popular" && (
            <span className="bg-error label-small-emphasized absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-white">
              🔥 {t("addons_popular")}
            </span>
          )}
          <div className="flex-center flex-1 flex-col py-6">
            <h4 className="text-outline">{item.title}</h4>
            <p className="display-large-emphasized mt-4 mb-2">
              ${item.price}
              <span className="title-small-emphasized text-outline font-semibold">
                /{item.time}
              </span>
            </p>
            <Badge variant={"text"}>
              <Icon>{item.badge.icon}</Icon>
              {item.badge.description}
            </Badge>
          </div>
          <div className="flex-center flex-1 py-6">
            <Button variant={"outline"}>{t("addons_buy_now")}</Button>
          </div>
        </div>
      ))}
    </ScorePageCard>
  );
}
