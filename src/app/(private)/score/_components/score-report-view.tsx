"use client";

import { ReactNode, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ScorePageSection, ScorePageSectionTitle } from "./score-page-section";
import BigScores from "./big-scores";
import UniqueStory from "./unique-story";
import ScoreSection from "./score-section";
import SimilarityToFamous from "./similarity-to-famous";
import SummaryAndExports from "./summary-and-exports";
import AddOns from "./add-ons";
import UnlockFullStory from "./unlock-full-story";

interface ScoreReportViewProps {
  reportData: any;
}

export default function ScoreReportView({ reportData }: ScoreReportViewProps) {
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
          id: "unlock-full-story",
          label: "  ",
          title: "",
          is_visible: true,
          component: <UnlockFullStory />,
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

  return (
    <>
      <div className="border-bottom bg-background sticky top-14 z-10 overflow-hidden">
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
    </>
  );
}
