"use client";

import { ArrowForward } from "@/assets/icons";

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
import { Loader2 } from "lucide-react";
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

export default function ScorePage() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysis_id");

  const { data: reportData, isLoading } = useQueryGetVideoReport(analysisId);

  const [sectionData, setSectionData] = useState<
    {
      id: string;
      label: string;
      title: string;
      is_visible: boolean;
      component: ReactNode;
    }[]
  >([]);

  // if (!analysisId) return null;
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
          <div className="container-xl flex items-center gap-4 px-3 py-3 xl:px-6">
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
    </div>
  );
}
