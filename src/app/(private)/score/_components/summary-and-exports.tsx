import React from "react";
import { ScorePageCard } from "./score-page-card";
import { Button } from "@/components/ui/button";
import { DOCX, JSON, PDF } from "@/assets/icons";
const export_items = [
  {
    icon: <PDF />,
    title: "Download full PDF report",
  },
  {
    icon: <JSON />,
    title: "Export JSON Data",
  },
  {
    icon: <DOCX />,
    title: "Export to Docx",
  },
];
export default function SummaryAndExports() {
  return (
    <ScorePageCard className="flex flex-col items-center justify-between gap-6 divide-none bg-transparent lg:flex-row">
      {export_items.map((item, index) => (
        <div
          key={index}
          className="bg-error-container/16 divide-error-container flex size-full flex-col divide-y rounded-xl p-8"
        >
          <div className="flex-center flex-1 py-6">{item.icon}</div>
          <div className="flex-center flex-1 py-6">
            <Button variant={"outline"}>{item.title}</Button>
          </div>
        </div>
      ))}
    </ScorePageCard>
  );
}
