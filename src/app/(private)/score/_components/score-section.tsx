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
type Props = {
  title: string;
  shareToken: string | null;
  full_result: any;
  metrics: any;
};
export default function ScoreSection({
  title,
  shareToken,
  full_result,
  metrics,
}: Props) {
  const { metadata, predictions } = full_result;
  const { preprocessing } = metadata;
  const {
    actionable_steps,
    snapshot_insight,
    behavioral_patterns,
    how_others_experience,
    strength,
    tradeoff,
    growth_lever,
    coach_recommendation,
  } = metrics;

  const { isOpen, setIsOpen, shareData, handleShare, sharePath } =
    useScoreShare(shareToken);

  const handleShareClick = () => {
    const share_text = `
      ${title}\n
      ${coach_recommendation}\n
      \nShow more at: ${sharePath}`;
    handleShare(share_text);
  };

  const relationship_results = [
    {
      title: "Snapshot Insight",
      component: (
        <AccordionDescriptionContainer>
          <AccordionDescription>{snapshot_insight}</AccordionDescription>
        </AccordionDescriptionContainer>
      ),
    },
    {
      title: "Behavioral Patterns",
      component: (
        <Carousel
          className="mx-auto max-w-276 pr-8"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {behavioral_patterns.map(
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
                        backgroundImage: `url(${preprocessing.face_image_base64})`,
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
                            onClick={handleShareClick}
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
          {/* <div className="flex-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div> */}
        </Carousel>
      ),
    },
    {
      title: "How Others Experience",
      component: (
        <AccordionDescriptionContainer>
          <AccordionDescription>{how_others_experience}</AccordionDescription>
        </AccordionDescriptionContainer>
      ),
    },
    {
      title: "Strength",
      component: (
        <Carousel
          className="mx-auto max-w-276 pr-8"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {[strength, tradeoff].map(
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
                        backgroundImage: `url(${preprocessing.face_image_base64})`,
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
                            onClick={handleShareClick}
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
          {/* <div className="flex-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div> */}
        </Carousel>
      ),
    },
    {
      title: "Growth Lever",
      component: (
        <AccordionDescriptionContainer>
          <AccordionDescription>{growth_lever}</AccordionDescription>
        </AccordionDescriptionContainer>
      ),
    },
    {
      title: "Coach Recommendation",
      component: (
        <>
          <AccordionDescriptionContainer>
            <AccordionDescription>{coach_recommendation}</AccordionDescription>
          </AccordionDescriptionContainer>
          <AccordionDescriptionContainer>
            <AccordionDescription>
              Actionable steps for development:
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
        </>
      ),
    },
  ];
  const relationship_scores = handleFormatPredictions(predictions);
  return (
    <ScorePageCard className="xl:rounded-tr-none">
      <ShareButton
        className="max-xl:hidden"
        variant={"absolute"}
        onClick={handleShareClick}
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
            Ahead of your age group in empathy index
          </p>
        </div>
        <ScorePageNotchCard title="Score breakdown">
          <div className="flex flex-col flex-wrap items-center gap-6 lg:flex-row lg:justify-center">
            {relationship_scores.map((score, index) => (
              <ScorePageProgress
                key={index}
                label={score.type}
                progress={Number(score.value)}
                title={score.name}
              />
            ))}
          </div>
        </ScorePageNotchCard>
        <ScorePageNotchCard title="Score breakdown">
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

        <ShareButton onClick={handleShareClick} />
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
                <ShareButton onClick={handleShareClick} />
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
