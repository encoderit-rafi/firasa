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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  ScorePageSection,
  ScorePageSectionTitle,
} from "./_components/score-page-section";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQueryGetVideoReport } from "./_api";
import BigScores from "./_components/big-scores";
import UniqueStory from "./_components/unique-story";
import SimilarityToFamous from "./_components/similarity-to-famous";
import SummaryAndExports from "./_components/summary-and-exports";
import AddOns from "./_components/add-ons";
import ScoreSection from "./_components/score-section";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { InstagramFilled } from "@/assets/icons/InstagramFilled";

export default function ScorePage() {
  // const router = useRouter();
  const fullPath = window.location.href;
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysis_id");
  const [isOpenShare, setIsOpenShare] = useState(false);
  const { data: reportData, isLoading } = useQueryGetVideoReport(analysisId);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullPath).then(() => {
      toast.success("Link copied to clipboard");
    });
  };

  const [sectionData, setSectionData] = useState<
    {
      id: string;
      label: string;
      title: string;
      is_visible: boolean;
      component: ReactNode;
    }[]
  >([]);

  useEffect(() => {
    if (reportData) {
      setSectionData([
        {
          id: "score",
          label: "Big 5 scores",
          title: "Big 5 personality score",
          is_visible: true,
          component: <BigScores data={reportData} />,
        },
        {
          id: "story",
          label: "Unique story",
          title: "Your unique personality story",
          is_visible: true,
          component: <UniqueStory data={reportData} />,
        },
        {
          id: "relationship",
          label: "Relationship & empathy",
          title: "Relationship & empathy",
          is_visible: true,
          component: (
            <ScoreSection
              full_result={reportData.full_result}
              metrics={reportData.full_result.relationship_metrics}
            />
          ),
        },
        {
          id: "focus",
          label: "Focus & execution style",
          title: "Focus & execution style",
          is_visible: true,
          component: (
            <ScoreSection
              full_result={reportData.full_result}
              metrics={reportData.full_result.work_metrics}
            />
          ),
        },
        {
          id: "ideation",
          label: "Ideation & creative energy",
          title: "Ideation & creative energy",
          is_visible: true,
          component: (
            <ScoreSection
              full_result={reportData.full_result}
              metrics={reportData.full_result.creativity_metrics}
            />
          ),
        },
        {
          id: "pressure",
          label: "Pressure response & recovery",
          title: "Pressure response & recovery",
          is_visible: true,
          component: (
            <ScoreSection
              full_result={reportData.full_result}
              metrics={reportData.full_result.stress_metrics}
            />
          ),
        },
        {
          id: "openness",
          label: "Openness to experience",
          title: "Openness to experience",
          is_visible: true,
          component: (
            <ScoreSection
              full_result={reportData.full_result}
              metrics={reportData.full_result.openness_metrics}
            />
          ),
        },
        {
          id: "learning",
          label: "Learning & growth",
          title: "Learning & growth",
          is_visible: true,
          component: (
            <ScoreSection
              full_result={reportData.full_result}
              metrics={reportData.full_result.learning_metrics}
            />
          ),
        },
        {
          id: "similarity",
          label: "Similarity to famous",
          title: "Personalities you might relate to",
          is_visible: true,
          component: <SimilarityToFamous />,
        },
        {
          id: "exports",
          label: "Exports",
          title: "Summary & exports",
          is_visible: true,
          component: <SummaryAndExports />,
        },
        {
          id: "add-ons",
          label: "Add-ons",
          title: "Level-up add-ons",
          is_visible: true,
          component: <AddOns />,
        },
      ]);
    }
  }, [reportData]);

  if (!analysisId) return null;
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
              <Button variant="outline" size={"icon"}>
                <ArrowForward className="rotate-180" />
              </Button>
              <Select defaultValue="video-1" value="video-1">
                <SelectTrigger
                  className={cn(
                    "w-fit max-w-31 border-none shadow-none",
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
                    <SelectItem value="video-1">Video 1</SelectItem>
                    <SelectItem value="video-2">Video 2</SelectItem>
                    <SelectItem value="video-3">Video 3</SelectItem>
                    <SelectItem value="video-4">Video 4</SelectItem>
                    <SelectItem value="video-5">Video 5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-center gap-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="airplane-mode" className="body-medium-primary">
                  Public
                </Label>
                <Switch id="airplane-mode" size="xl" />
              </div>
              <Button variant="outline" size={"icon"} className="size-10">
                <Download />
              </Button>
              <Button
                variant="outline"
                size={"icon"}
                className="size-10"
                onClick={() => setIsOpenShare(true)}
              >
                <Share />
              </Button>
              <Button variant="outline" size={"icon"} className="size-10">
                <ThreedotMenu />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-bottom overflow-hidden">
          <Tabs
            defaultValue="overview"
            className="container-xl no-scrollbar overflow-x-auto px-3 xl:px-6"
          >
            <TabsList variant={"line"} className="">
              {sectionData?.map(({ id, label, is_visible }) => {
                return (
                  <TabsTrigger key={id} value={id} disabled={!is_visible}>
                    <Link href={`#${id}`}>{label}</Link>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="space-y-16 px-4 lg:py-16">
        {sectionData?.map(({ id, title, component }) => {
          return (
            <ScorePageSection id={id} key={id}>
              <ScorePageSectionTitle>{title}</ScorePageSectionTitle>
              {component}
            </ScorePageSection>
          );
        })}
      </div>
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
              <span className="line-clamp-1">{fullPath}</span>
            </div>
            <Button onClick={handleCopyLink}>
              <LinkIcon />
              Copy link
            </Button>
          </div>
          <TextSeparator />

          <div className="flex-center mb-0 gap-3">
            <TwitterShareButton url={fullPath}>
              <Button variant={"icon-muted"}>
                <X />
              </Button>
            </TwitterShareButton>
            <LinkedinShareButton url={fullPath}>
              <Button variant={"icon-muted"}>
                <LinkedinFilled />
              </Button>
            </LinkedinShareButton>
            <FacebookShareButton url={fullPath}>
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
    </div>
  );
}
