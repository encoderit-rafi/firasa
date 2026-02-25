import React from "react";
import { ScorePageCard } from "./score-page-card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
const level_up_items = [
  {
    title: "Discover Personalities Around You",
    price: 79,
    time: "one‑time",
    type: "regular",
    badge: {
      icon: "🗒",
      description: "Up to 7 full reports",
    },
  },
  {
    title: "Partner Personality Match",
    price: 7,
    time: "one‑time",
    type: "disabled",
    badge: {
      icon: "🤝",
      description: "Coming soon",
    },
  },
  {
    title: "Monthly Discovery Pass",
    price: 29,
    time: "mo",
    type: "regular",
    badge: {
      icon: "📊",
      description: "Up to 7 full reports",
    },
  },
  {
    title: "Discover Personalities Around You",
    price: 79,
    time: "one‑time",
    type: "popular",
    badge: {
      icon: "🗃",
      description: "Up to 7 full reports",
    },
  },
];
export default function AddOns() {
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
              🔥 Popular
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
            <Button variant={"outline"}>Buy Now</Button>
          </div>
        </div>
      ))}
    </ScorePageCard>
  );
}
