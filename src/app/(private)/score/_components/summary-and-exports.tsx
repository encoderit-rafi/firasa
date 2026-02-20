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
    <ScorePageCard className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-transparent divide-none">
      {export_items.map((item, index) => (
        <div className="size-full  p-8 rounded-xl bg-error-container/16 flex flex-col divide-y divide-error-container">
          <div className="flex-1 py-6 flex-center">{item.icon}</div>
          <div className="flex-1 py-6 flex-center">
            <Button variant={"outline"}>{item.title}</Button>
          </div>
        </div>
      ))}
    </ScorePageCard>
  );
}
