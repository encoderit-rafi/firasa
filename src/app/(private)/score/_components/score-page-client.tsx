"use client";
import {
  ArrowForward,
  Download,
  FacebookFilled,
  Language,
  LinkIcon,
  Share,
  ThreedotMenu,
  X,
} from "@/assets/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { useScoreShare } from "../_hooks/use-score-share";
import { ScoreShareDialog } from "./score-share-dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, handleCopyLink } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useMutationToggleSharing,
  useQueryGetVideoReport,
  useQueryGetUserReports,
} from "../_api";
import ScoreReportView from "./score-report-view";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TextSeparator from "@/components/ui/text-separator";
import PdfDownloadBtn from "./pdf/PdfDownloadBtn";

export default function ScorePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysis_id");
  const { data: reportData, isLoading } = useQueryGetVideoReport(analysisId);

  const { isOpen, setIsOpen, shareData, handleShare, sharePath } =
    useScoreShare(reportData?.share_token ?? null);
  const { data: userReports, isLoading: isLoadingUserReports } =
    useQueryGetUserReports();

  const { mutateAsync: toggleSharing, isPending: isTogglingSharing } =
    useMutationToggleSharing(analysisId);

  const handleVideoChange = (videoId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("analysis_id", videoId);
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  const handleShareClick = async () => {
    handleShare(""); // Message will be empty or we can set a default
  };

  if (isLoading)
    return (
      <div className="flex-center h-screen w-full">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="">
      <div className="bg-background sticky top-0 z-10">
        <div className="border-secondary/10 border-b">
          <div className="container-xl px-base flex items-center justify-between gap-4 py-2">
            <div className="flex-center gap-4">
              <Button
                variant="outline"
                size={"icon"}
                className="size-10"
                onClick={() => router.back()}
              >
                <ArrowForward className="rotate-180" />
              </Button>
              <Select
                defaultValue={analysisId || ""}
                value={analysisId || ""}
                onValueChange={handleVideoChange}
              >
                <SelectTrigger
                  className={cn(
                    "w-fit border-none shadow-none",
                    buttonVariants({
                      variant: "ghost",
                    }),
                  )}
                >
                  <div className="flex items-center">
                    <SelectValue placeholder="Select a video" />
                  </div>
                </SelectTrigger>
                <SelectContent
                  className="border-outline-variant border"
                  position="popper"
                >
                  <SelectGroup>
                    <SelectLabel>Video</SelectLabel>
                    {userReports?.map((report: any) => (
                      <SelectItem
                        key={String(report.analysis_id)}
                        value={String(report.analysis_id)}
                        className="line-clamp-1 text-nowrap"
                      >
                        {report.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-center gap-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="airplane-mode" className="body-medium-primary">
                  Public
                </Label>
                <Switch
                  id="airplane-mode"
                  size="xl"
                  checked={!!reportData?.share_token}
                  onCheckedChange={() => toggleSharing()}
                  disabled={isTogglingSharing}
                />
              </div>
              <PdfDownloadBtn />
              <Button
                variant="outline"
                size={"icon"}
                className="size-10"
                onClick={handleShareClick}
              >
                <Share />
              </Button>
              <Button variant="outline" size={"icon"} className="size-10">
                <ThreedotMenu />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {reportData && <ScoreReportView reportData={reportData} />}
      <ScoreShareDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        shareData={
          shareData ||
          `Drop your Firasa results and let people react.\n\nShow more at: ${sharePath}`
        }
        sharePath={sharePath}
      />
    </div>
  );
}
