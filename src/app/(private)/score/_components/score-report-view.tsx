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
import {
  TBigFiveTraits,
  TReportData,
  TUniqueStoryTraits,
} from "@/global-types";
import { handleFormatPredictions } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const EXCLUDED_FROM_PDF = ["exports", "add-ons"];

interface ScoreReportViewProps {
  reportData: TReportData;
}

export default function ScoreReportView({ reportData }: ScoreReportViewProps) {
  const { t } = useTranslation();
  const { id, share_token, full_result } = reportData;
  const { predictions, metadata, insights } = full_result;
  const {
    preprocessing: { face_image_base64 },
  } = metadata;
  // const personality_scores = handleFormatPredictions(predictions);
  const [activeTab, setActiveTab] = useState("score");
  const big_scores: TBigFiveTraits = {
    id,
    share_token,
    face_image_base64,
    insights,
    predictions,
  };
  const unique_stories: TUniqueStoryTraits = {
    id,
    share_token,
    insights,
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
      const data = [
        {
          id: "score",
          label: t("score_tab_big5"),
          title: t("score_title_big5"),
          is_visible: true,
          component: <BigScores data={big_scores} />,
        },
        {
          id: "story",
          label: t("score_tab_story"),
          title: t("score_title_story"),
          is_visible: true,
          component: <UniqueStory data={unique_stories} />,
        },
        {
          id: "relationship",
          label: t("score_tab_relationship"),
          title: t("score_title_relationship"),
          is_visible: true,
          component: (
            <ScoreSection
              title={t("score_tab_relationship")}
              shareToken={share_token}
              face_image={
                reportData?.full_result.metadata?.preprocessing
                  ?.face_image_base64
              }
              data={reportData.full_result.relationship_metrics}
            />
          ),
        },
        {
          id: "focus",
          label: t("score_tab_focus"),
          title: t("score_title_focus"),
          is_visible: true,
          component: (
            <ScoreSection
              title={t("score_tab_focus")}
              shareToken={share_token}
              face_image={
                reportData?.full_result.metadata?.preprocessing
                  ?.face_image_base64
              }
              data={reportData.full_result.work_metrics}
            />
          ),
        },
        {
          id: "ideation",
          label: t("score_tab_ideation"),
          title: t("score_title_ideation"),
          is_visible: true,
          component: (
            <ScoreSection
              title={t("score_tab_ideation")}
              shareToken={share_token}
              face_image={
                reportData?.full_result.metadata?.preprocessing
                  ?.face_image_base64
              }
              data={reportData.full_result.creativity_metrics}
            />
          ),
        },
        {
          id: "pressure",
          label: t("score_tab_pressure"),
          title: t("score_title_pressure"),
          is_visible: true,
          component: (
            <ScoreSection
              title={t("score_tab_pressure")}
              shareToken={share_token}
              face_image={
                reportData?.full_result.metadata?.preprocessing
                  ?.face_image_base64
              }
              data={reportData.full_result.stress_metrics}
            />
          ),
        },
        {
          id: "openness",
          label: t("score_tab_openness"),
          title: t("score_title_openness"),
          is_visible: true,
          component: (
            <ScoreSection
              title={t("score_tab_openness")}
              shareToken={share_token}
              face_image={
                reportData?.full_result.metadata?.preprocessing
                  ?.face_image_base64
              }
              data={reportData.full_result.openness_metrics}
            />
          ),
        },
        {
          id: "learning",
          label: t("score_tab_learning"),
          title: t("score_title_learning"),
          is_visible: true,
          component: (
            <ScoreSection
              title={t("score_tab_learning")}
              shareToken={share_token}
              face_image={
                reportData?.full_result.metadata?.preprocessing
                  ?.face_image_base64
              }
              data={reportData.full_result.learning_metrics}
            />
          ),
        },
        {
          id: "similarity",
          label: t("score_tab_similarity"),
          title: t("score_title_similarity"),
          is_visible: true,
          component: <SimilarityToFamous />,
        },
        {
          id: "exports",
          label: t("score_tab_exports"),
          title: t("score_title_exports"),
          is_visible: true,
          component: <SummaryAndExports reportData={reportData.full_result} />,
        },
        {
          id: "add-ons",
          label: t("score_tab_addons"),
          title: t("score_title_addons"),
          is_visible: true,
          component: <AddOns />,
        },
      ];
      setSectionData(data);
    }
  }, [reportData, t, share_token, big_scores, unique_stories]);

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
    (s) => !EXCLUDED_FROM_PDF.includes(s.id),
  );
  const nonPdfSections = sectionData.filter((s) =>
    EXCLUDED_FROM_PDF.includes(s.id),
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
