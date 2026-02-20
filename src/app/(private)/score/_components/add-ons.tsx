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
    <ScorePageCard className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-transparent divide-none">
      {level_up_items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "size-full p-8 rounded-xl bg-error-container/16 flex flex-col divide-y divide-error-container relative",
            {
              "opacity-25": item.type == "disabled",
              "border border-error": item.type == "popular",
            },
          )}
        >
          {item.type == "popular" && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-error text-white rounded-full py-1 px-3 label-small-emphasized">
              🔥 Popular
            </span>
          )}
          <div className="flex-1 py-6 flex-center flex-col">
            <h4 className="text-outline">{item.title}</h4>
            <p className="display-large-emphasized mt-4 mb-2">
              ${item.price}
              <span className="title-small-emphasized font-semibold text-outline">
                /{item.time}
              </span>
            </p>
            <Badge variant={"text"}>
              <Icon>{item.badge.icon}</Icon>
              {item.badge.description}
            </Badge>
          </div>
          <div className="flex-1 py-6 flex-center">
            <Button variant={"outline"}>Buy Now</Button>
          </div>
        </div>
      ))}
    </ScorePageCard>
  );
}
