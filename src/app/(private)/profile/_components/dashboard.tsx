import { Button } from "@/components/ui/button";
import { Dot, MoreHorizontal, Pin, PinIcon } from "lucide-react";
import React from "react";

export default function Dashboard() {
  return (
    <div className="py-16 space-y-8">
      <div className="flex-between font-bold font-inter">
        <h6 className="text-xl font-bold font-inter">Saved reports results</h6>
        <Button
          variant={"ghost"}
          className="text-[#1A2DC9] font-bold font-inter"
        >
          Start a new report
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="h-fit border border-secondary/10 rounded-2xl p-6 space-y-1.5">
          <div className="flex-between">
            <div className="flex-center gap-2 font-inter">
              <PinIcon />
              <span>Jan 4, 2025</span>
            </div>
            <Button variant={"black"} size={"icon"} className="rout">
              <MoreHorizontal />
            </Button>
          </div>
          <h6 className="font-normal text-sm font-inter text-left">
            Abdulhameid Grandoka
          </h6>
          <p className="font-normal text-sm font-inter text-left text-yellow">
            Core Identity
          </p>
          <h5 className="font-bold font-inter line-clamp-2 text-3xl">
            Values Hierarchy
          </h5>
        </div>
        <div className="h-full border border-dashed border-secondary/10 rounded-2xl p-6 space-y-1.5"></div>
      </div>
    </div>
  );
}
