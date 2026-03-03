"use client";
import { PinIcon } from "@/assets/icons/PinIcon";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Dashboard({ reports }: { reports: any }) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="space-y-8 py-16">
      <div className="flex-between font-inter font-bold">
        <h6 className="font-inter text-xl font-bold">
          {t("profile_saved_reports")}
        </h6>
        <Button
          variant={"ghost"}
          className="font-inter font-bold text-[#1A2DC9]"
        >
          {t("profile_start_new_report")}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {reports.map((report: any, index: number) => (
          <div
            key={index}
            onClick={() =>
              router.push(`/score?analysis_id=${report.analysis_id}`)
            }
            className="cursor-pointer border-secondary/10 h-fit space-y-1.5 rounded-2xl border p-6"
          >
            <div className="flex-between">
              <div className="flex-center font-inter gap-2">
                <PinIcon />
                <span>Jan 4, 2025</span>
              </div>
              <Button
                onClick={() =>
                  router.push(`/score?analysis_id=${report.analysis_id}`)
                }
                variant={"black"}
                size={"icon"}
                // className={cn(
                //   buttonVariants({ variant: "black", size: "icon" }),
                // )}
              >
                <MoreHorizontal />
              </Button>
            </div>
            <h6 className="font-inter text-left text-sm font-normal">
              {report.name}
            </h6>
            <p className="font-inter text-yellow text-left text-sm font-normal">
              {t("feature_big5_desc")}
            </p>
            <h5 className="font-inter line-clamp-2 text-3xl font-bold">
              {report.name}
            </h5>
          </div>
        ))}
        <Link
          href={"/upload"}
          className="flex h-full items-center justify-center space-y-1.5 rounded-2xl border border-dashed border-[#cccccc] bg-[#F2F2F2] p-6"
        >
          <div className="flex-center h-13.5 w-13.5 rounded-full bg-[#A1A7B1]">
            <Plus color="white" size={24} />
          </div>
        </Link>
      </div>
    </div>
  );
}
