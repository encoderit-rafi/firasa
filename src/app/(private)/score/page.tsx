"use client";
import {
  ArrowForward,
  Download,
  Facebook,
  FacebookFilled,
  Instagram,
  Language,
  Linkedin,
  LinkIcon,
  Menu,
  Share,
  ThreedotMenu,
  X,
} from "@/assets/icons";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Button, buttonVariants } from "@/components/ui/button";

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
import { Copy, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { ReactNode, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  useMutationToggleSharing,
  useMutationRenameReport,
  useQueryGetVideoReport,
  useQueryGetUserReports,
} from "./_api";
import ScoreReportView from "./_components/score-report-view";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TextSeparator from "@/components/ui/text-separator";
import { LinkedinFilled } from "@/assets/icons/LinkedinFilled";
import PdfDownloadBtn from "./_components/pdf/PdfDownloadBtn";
// import { InstagramFilled } from "@/assets/icons/InstagramFilled";

export default function ScorePage() {
  return (
    <Suspense>
      <ScorePageContent />
    </Suspense>
  );
}

function ScorePageContent() {
  // const router = useRouter();
  const [fullPath, setFullPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullPath(window.location.href);
    }
  }, []);

  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysis_id");
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenRename, setIsOpenRename] = useState(false);
  const [editName, setEditName] = useState("");
  const [editingAnalysisId, setEditingAnalysisId] = useState<string | null>(
    null
  );
  const { data: reportData, isLoading } = useQueryGetVideoReport(analysisId);
  const { data: userReports, isLoading: isLoadingUserReports } =
    useQueryGetUserReports();
  console.log("👉 ~ ScorePageContent ~ userReports:", userReports);

  const { mutateAsync: toggleSharing, isPending: isTogglingSharing } =
    useMutationToggleSharing(analysisId);

  const { mutateAsync: renameReport, isPending: isRenaming } =
    useMutationRenameReport(analysisId);

  const handleVideoChange = (videoId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("analysis_id", videoId);
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  const sharePath = reportData?.share_token
    ? `${window.location.origin}/share?share_token=${reportData.share_token}`
    : fullPath;

  const handleShareClick = async () => {
    if (!reportData?.share_token) {
      await toggleSharing();
    }
    setIsOpenShare(true);
  };

  const handleEditClick = (
    e: React.PointerEvent | React.MouseEvent,
    report: any
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingAnalysisId(String(report.analysis_id));
    setEditName(report.name || "");
    setIsOpenRename(true);
  };

  const handleRenameSubmit = async () => {
    if (!editingAnalysisId || !editName.trim()) return;
    try {
      await renameReport({
        analysisId: editingAnalysisId,
        name: editName.trim(),
      });
      toast.success("Video renamed successfully");
      setIsOpenRename(false);
    } catch {
      toast.error("Failed to rename video");
    }
  };

  // const handleCopyLink = () => {
  //   navigator.clipboard.writeText(fullPath).then(() => {
  //     toast.success("Link copied to clipboard");
  //   });
  // };

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
              <Button variant="outline" size={"icon"} className="size-10">
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
                    })
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
                      <div
                        key={String(report.analysis_id)}
                        className="relative flex items-center"
                      >
                        <SelectItem
                          value={String(report.analysis_id)}
                          className="line-clamp-1 flex-1 text-nowrap pr-10"
                        >
                          {report.name}
                        </SelectItem>
                        <button
                          className="bg-secondary-container text-muted-foreground hover:text-foreground absolute right-1 rounded-sm p-2 cursor-pointer transition-colors"
                          onPointerDown={(e) => handleEditClick(e, report)}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Pencil className="size-3.5" />
                        </button>
                      </div>
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

      <ScoreReportView reportData={reportData} />

      {/* Share Dialog */}
      <Dialog open={isOpenShare} onOpenChange={setIsOpenShare}>
        <DialogContent className="max-w-136 space-y-6">
          <DialogHeader>
            <DialogTitle>Share your personality</DialogTitle>
            <DialogDescription>
              Drop your Firasa results and let people react.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-between border-error-container gap-4 rounded-full border bg-white p-3">
            <div className="flex-center body-medium-primary text-outline-variant gap-2">
              <Language className="size-5 shrink-0" />
              <span className="line-clamp-1">{sharePath}</span>
            </div>
            <Button onClick={() => handleCopyLink(sharePath)}>
              <LinkIcon />
              Copy link
            </Button>
          </div>
          <TextSeparator />

          <div className="flex-center mb-0 gap-3">
            <TwitterShareButton url={sharePath}>
              <Button variant={"icon-muted"}>
                <X />
              </Button>
            </TwitterShareButton>
            <LinkedinShareButton url={sharePath}>
              <Button variant={"icon-muted"}>
                <LinkedinFilled />
              </Button>
            </LinkedinShareButton>
            <FacebookShareButton url={sharePath}>
              <Button variant={"icon-muted"}>
                <FacebookFilled />
              </Button>
            </FacebookShareButton>
            {/* <Button variant={"icon-muted"}>
              <InstagramFilled />
            </Button> */}
          </div>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={isOpenRename} onOpenChange={setIsOpenRename}>
        <DialogContent className="max-w-96">
          <DialogHeader>
            <DialogTitle>Rename video</DialogTitle>
            <DialogDescription>
              Enter a new name for this video.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Enter video name"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRenameSubmit();
            }}
            autoFocus
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpenRename(false)}
              disabled={isRenaming}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRenameSubmit}
              disabled={isRenaming || !editName.trim()}
            >
              {isRenaming ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}