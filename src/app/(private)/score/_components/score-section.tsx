"use client";
import { ScorePageCard, ScorePageNotchCard } from "./score-page-card";
import ScorePageContainer from "./score-page-container";
import ScorePageProgress from "./score-page-circular-progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionDescription,
  AccordionDescriptionContainer,
  AccordionDescriptionItems,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ShareButton from "@/components/ui/share-button";
import { useScoreShare } from "../_hooks/use-score-share";
import { ScoreShareDialog } from "./score-share-dialog";
import { TriangleShape } from "@/assets/icons/TriangleShape";
import { cn, handleFormatPredictions } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CameraPlus, Share } from "@/assets/icons";
import {
  CreativityMetrics,
  LearningMetrics,
  OpennessMetrics,
  RelationshipMetrics,
  StressMetrics,
  TLevel,
  WorkMetrics,
} from "@/global-types";
type Props = {
  face_image: string;
  title: string;
  shareToken: string | null;
  data:
    | RelationshipMetrics
    | WorkMetrics
    | CreativityMetrics
    | StressMetrics
    | OpennessMetrics
    | LearningMetrics;
};
// type Props = {
//   title: string;
//   shareToken: string | null;
//   full_result: any;
//   metrics: any;
//   data: RelationshipMetrics;
// };
import { useTranslation } from "react-i18next";

export default function ScoreSection({
  title,
  shareToken,
  face_image,
  // full_result,
  // metrics,
  data,
}: Props) {
  const { t } = useTranslation();
  // const { metadata, predictions } = full_result;
  // const { preprocessing } = metadata;
  const {
    actionable_steps,
    snapshot_insight,
    behavioral_patterns,
    how_others_experience,
    strength,
    tradeoff,
    growth_lever,
    coach_recommendation,
    metrics,
  } = data;
  const { isOpen, setIsOpen, shareData, handleShare, sharePath } =
    useScoreShare(shareToken);

  const handleShareClick = (data: string) => {
    // const share_text = `
    //   ${title}\n
    //   ${coach_recommendation}\n
    //   \nShow more at: ${sharePath}`;
    handleShare(data);
  };

  const relationship_results = [
    {
      title: t("score_section_snapshot"),
      component: (
        <>
          <AccordionDescriptionContainer>
            <AccordionDescription>{snapshot_insight}</AccordionDescription>
          </AccordionDescriptionContainer>
          <ShareButton
            onClick={() =>
              handleShareClick(
                `${t("score_section_snapshot")}\n\n${snapshot_insight}` || "",
              )
            }
          />
        </>
      ),
    },
    {
      title: t("score_section_behavioral"),
      component: (
        <Carousel
          className="mx-auto max-w-276 pr-8"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {behavioral_patterns?.map(
                (
                  pattern: { title: string; description: string },
                  index: number,
                ) => (
                  <CarouselItem className="" key={index}>
                    <Card
                      className={cn(
                        "size-60 overflow-hidden border-none bg-cover bg-no-repeat p-0 shadow-none",
                      )}
                      style={{
                        backgroundImage: `url(${face_image})`,
                      }}
                    >
                      <CardContent className="flex size-full flex-col justify-between bg-black/40 p-0 backdrop-blur-[1px]">
                        <CardHeader className="flex items-center justify-end gap-2 p-3">
                          <Button variant={"icon"} className="size-10">
                            <CameraPlus className="size-5" />
                          </Button>
                          <Button
                            variant={"icon"}
                            className="size-10"
                            // onClick={handleShareClick}
                          >
                            <Share className="size-5" />
                          </Button>
                        </CardHeader>

                        <div className="h-fit p-4">
                          <h6 className="title-small-emphasized text-left text-[#FA6C12]">
                            {pattern.title}
                          </h6>
                          <p className="body-small-primary line-clamp-2 text-left text-white">
                            {pattern.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ),
              )}
            </CarouselContent>
          </div>
          <div className="my-8 px-2">
            <CarouselIndicator />
          </div>
        </Carousel>
      ),
    },
    {
      title: t("score_section_others"),
      component: (
        <>
          <AccordionDescriptionContainer>
            <AccordionDescription>{how_others_experience}</AccordionDescription>
          </AccordionDescriptionContainer>
          <ShareButton
            onClick={() =>
              handleShareClick(
                `${t("score_section_others")}\n\n${how_others_experience}` ||
                  "",
              )
            }
          />
        </>
      ),
    },
    {
      title: t("score_section_strength"),
      component: (
        <Carousel
          className="mx-auto max-w-276 pr-8"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {[strength, tradeoff].map((item, index) => (
                <CarouselItem className="" key={index}>
                  <Card
                    className={cn(
                      "size-60 overflow-hidden border-none bg-cover bg-no-repeat p-0 shadow-none",
                    )}
                    style={{
                      backgroundImage: `url(${face_image})`,
                    }}
                  >
                    <CardContent className="flex size-full flex-col justify-between bg-black/40 p-0 backdrop-blur-[1px]">
                      <CardHeader className="flex items-center justify-end gap-2 p-3">
                        <Button variant={"icon"} className="size-10">
                          <CameraPlus className="size-5" />
                        </Button>
                        <Button
                          variant={"icon"}
                          className="size-10"
                          // onClick={handleShareClick}
                        >
                          <Share className="size-5" />
                        </Button>
                      </CardHeader>

                      <div className="h-fit p-4">
                        <h6 className="title-small-emphasized text-left text-[#FA6C12]">
                          {item?.title}
                        </h6>
                        <p className="body-small-primary line-clamp-2 text-left text-white">
                          {item?.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <div className="my-8 px-2">
            <CarouselIndicator />
          </div>
        </Carousel>
      ),
    },
    {
      title: t("score_section_growth_lever"),
      component: (
        <>
          <AccordionDescriptionContainer>
            <AccordionDescription>{growth_lever}</AccordionDescription>
          </AccordionDescriptionContainer>
          <ShareButton
            onClick={() =>
              handleShareClick(
                `${t("score_section_growth_lever")}\n\n${growth_lever}` || "",
              )
            }
          />
        </>
      ),
    },
    {
      title: t("score_section_coach"),
      component: (
        <>
          <AccordionDescriptionContainer>
            <AccordionDescription>{coach_recommendation}</AccordionDescription>
          </AccordionDescriptionContainer>
          <AccordionDescriptionContainer>
            <AccordionDescription>
              {t("score_actionable_steps_title")}
            </AccordionDescription>
            <AccordionDescriptionItems>
              {actionable_steps.map(
                (step: { emoji: string; text: string }, index: number) => (
                  <Badge key={index}>
                    <Icon>{step.emoji}</Icon>
                    {step.text}
                  </Badge>
                ),
              )}
            </AccordionDescriptionItems>
          </AccordionDescriptionContainer>
          <ShareButton
            onClick={() =>
              handleShareClick(
                `${t("score_section_coach")}\n\n${coach_recommendation}\n\n${t("score_actionable_steps_title")}\n\n${actionable_steps.map((step: { emoji: string; text: string }, index: number) => `${step.emoji} ${step.text}`).join("\n")}
                
                ` || "",
              )
            }
          />
        </>
      ),
    },
  ];
  return (
    <ScorePageCard className="xl:rounded-tr-none">
      <ShareButton
        className="max-xl:hidden"
        variant={"absolute"}
        onClick={() =>
          handleShareClick(
            `${t("score_breakdown_title")}\n${Object.entries(metrics)
              .map(
                ([key, value]) => `${key.split("_").join(" ")}: ${value.score}`,
              )
              .join("\n")}
                \n
              ${actionable_steps.map((step: { emoji: string; text: string }) => `${step.emoji} ${step.text}`).join("\n")}
              \n
              ${t("score_section_snapshot")}\n${snapshot_insight}\n
              ${t("score_section_others")}\n${how_others_experience}\n
              ${t("score_section_growth_lever")}\n${growth_lever}
              ${t("score_section_coach")}\n${coach_recommendation}\n${t("score_actionable_steps_title")}\n${actionable_steps.map((step: { emoji: string; text: string }, index: number) => `${step.emoji} ${step.text}`).join("\n")}
                
                \n
                Show more: ${sharePath}
              ` || "",
          )
        }
      />
      <ScorePageContainer
        type="left"
        className="flex flex-col items-center gap-8"
      >
        <div>
          <h2 className="display-large-emphasized bg-gradient flex-center flex items-center gap-2 bg-clip-text text-center text-transparent">
            <TriangleShape />
            72%
          </h2>
          <p className="body-large-emphasized mx-auto max-w-52 text-center">
            {t("score_ahead_group")}
          </p>
        </div>
        <ScorePageNotchCard title={t("score_breakdown_title")}>
          <div className="flex flex-col flex-wrap items-center gap-6 lg:flex-row lg:justify-center">
            {Object.entries(metrics).map(([key, value]) => (
              <ScorePageProgress
                key={key}
                level={value.level as TLevel}
                score={value.score}
                title={key}
              />
            ))}
          </div>
        </ScorePageNotchCard>
        <ScorePageNotchCard title={t("score_breakdown_title")}>
          <div className="flex-center flex-wrap gap-1">
            {actionable_steps.map(
              (step: { emoji: string; text: string }, index: number) => (
                <Badge key={index}>
                  <Icon>{step.emoji}</Icon>
                  {step.text}
                </Badge>
              ),
            )}
          </div>
        </ScorePageNotchCard>

        <ShareButton
          onClick={() =>
            handleShareClick(
              `${t("score_breakdown_title")}\n\n${Object.entries(metrics)
                .map(
                  ([key, value]) =>
                    `${key.split("_").join(" ")}: ${value.score}`,
                )
                .join("\n")}
                \n
              ${actionable_steps.map((step: { emoji: string; text: string }) => `${step.emoji} ${step.text}`).join("\n")}
              ` || "",
            )
          }
        />
      </ScorePageContainer>
      <ScorePageContainer type="right">
        <Accordion
          type="single"
          collapsible
          defaultValue={relationship_results[0].title}
        >
          {relationship_results.map((result, index) => (
            <AccordionItem key={index} value={result.title}>
              <AccordionTrigger className="group">
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex-center gap-2">{result.title}</div>
                  <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                {result.component}
                {/* <ShareButton onClick={handleShareClick} /> */}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScorePageContainer>
      <ScoreShareDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        shareData={shareData}
        sharePath={sharePath}
      />
    </ScorePageCard>
  );
}
