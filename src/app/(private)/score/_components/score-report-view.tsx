// score-report-view.tsx
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

const EXCLUDED_FROM_PDF = ["exports", "add-ons"];

interface ScoreReportViewProps {
  reportData: any;
}

export default function ScoreReportView({ reportData }: ScoreReportViewProps) {
  const [activeTab, setActiveTab] = useState("score");
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
      const data = [
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
          component: (
            <SummaryAndExports reportData={reportData.full_result} />
          ),
        },
        {
          id: "add-ons",
          label: "Add-ons",
          title: "Level-up add-ons",
          is_visible: true,
          component: <AddOns />,
        },
      ];
      setSectionData(data);
    }
  }, [reportData]);

  useEffect(() => {
    if (sectionData.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sectionData.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionData]);

  const pdfSections = sectionData.filter(
    (s) => !EXCLUDED_FROM_PDF.includes(s.id)
  );
  const nonPdfSections = sectionData.filter((s) =>
    EXCLUDED_FROM_PDF.includes(s.id)
  );

  return (
    <>
      <div className="border-bottom bg-background sticky top-16 z-10 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="container-xl no-scrollbar overflow-x-auto px-3 xl:px-6"
        >
          <TabsList variant={"line"} className="">
            {sectionData?.map(({ id, label, is_visible }) => {
              if (!label.trim()) return null;
              return (
                <TabsTrigger key={id} value={id} disabled={!is_visible}>
                  <Link href={`#${id}`}>{label}</Link>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Sections included in PDF */}
      <div id="pdf-content" className="space-y-16 px-4 lg:py-16">
        {pdfSections.map(({ id, title, component }) => (
          <ScorePageSection id={id} key={id}>
            {title && <ScorePageSectionTitle>{title}</ScorePageSectionTitle>}
            {component}
          </ScorePageSection>
        ))}
      </div>

      {/* Sections excluded from PDF */}
      <div className="space-y-16 px-4 lg:py-16">
        {nonPdfSections.map(({ id, title, component }) => (
          <ScorePageSection id={id} key={id}>
            {title && <ScorePageSectionTitle>{title}</ScorePageSectionTitle>}
            {component}
          </ScorePageSection>
        ))}
      </div>
    </>
  );
}