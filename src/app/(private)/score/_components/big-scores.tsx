import React from "react";
import { ScorePageCard } from "./score-page-card";
import ScorePageShareButton from "./score-page-share-button";
import ScorePageContainer from "./score-page-container";
import Image from "next/image";
import ScorePageProgress from "./score-page-circular-progress";
import SimpleRadarChart from "@/components/charts/SimpleRadarChart";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionDescription,
  AccordionDescriptionContainer,
  AccordionDescriptionItems,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, handleFormatPredictions } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardAvatar,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { CameraPlus, Share, SquareBox } from "@/assets/icons";
import Separator from "@/components/ui/separator";
import CustomRadarChart from "@/components/charts/RadarChart";
import { ChevronDownIcon, Square } from "lucide-react";
import PercentageText from "@/components/ui/percentage-text";
import ShareButton from "@/components/ui/share-button";
import { PersonalityType } from "@/global-types";
// type PersonalityType = {
//   name: string;
//   value: number | string;
//   type: "moderate" | "high" | "low";
// };
const descriptions = [
  {
    title: "What this means:",
    items: [
      {
        icon: "🤝",
        description: "You enjoy new ideas and perspectives",
      },
      {
        icon: "🌿",
        description: "You adapt well to change",
      },
      {
        icon: "🧠",
        description: "You value personal growth",
      },
    ],
  },
  {
    title: "How to increase:",
    items: [
      {
        icon: "🌍",
        description: "Explore new inputs",
      },
      {
        icon: "🔍",
        description: "Challenge assumptions",
      },
      {
        icon: "✏️",
        description: "Create without outcome",
      },
    ],
  },
];
export function ScorePagePersonalityAccordion({
  data,
}: {
  data: PersonalityType[];
}) {
  return (
    <Accordion type="single" collapsible defaultValue={data[0].name}>
      {data.map((personality, index) => (
        <AccordionItem key={index} value={personality.name}>
          <AccordionTrigger className="group">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex-center gap-2 capitalize">
                <PercentageText variant={personality.type}>
                  {personality.value}
                </PercentageText>
                {personality.name}
                <Badge variant={personality.type} className="capitalize">
                  {personality.type}
                </Badge>
              </div>
              <ChevronDownIcon className="rotate-icon" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-10">
            {descriptions.map((description, index) => (
              <AccordionDescriptionContainer key={index}>
                <AccordionDescription>{description.title}</AccordionDescription>
                <AccordionDescriptionItems>
                  {description.items.map((item, index) => (
                    <Badge key={index}>
                      <Icon>{item.icon}</Icon>
                      {item.description}
                    </Badge>
                  ))}
                </AccordionDescriptionItems>
              </AccordionDescriptionContainer>
            ))}

            <Button variant={"outline"}>
              <Share className="size-3" />
              Share
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
type Props = {
  data: any;
};
export default function BigScores({ data }: Props) {
  // function handlePercentage(value: number) {
  //   return Number((((value + 1) / 2) * 100).toFixed(1));
  // }
  const { full_result } = data;
  const { predictions, metadata, insights } = full_result;
  const { preprocessing } = metadata;

  // const personality_scores = Object.entries(predictions).map(([key, value]) => {
  //   const score = handlePercentage(Number(value));
  //   let type = "";
  //   if (score < 33) {
  //     type = "low";
  //   } else if (score < 66) {
  //     type = "moderate";
  //   } else {
  //     type = "high";
  //   }
  //   return {
  //     name: key,
  //     value: score,
  //     type: type,
  //   };
  // }) as PersonalityType[];
  const personality_scores = handleFormatPredictions(predictions);
  return (
    <>
      <ScorePageCard className="xl:rounded-tr-none">
        <ShareButton className="max-xl:hidden" variant={"absolute"} />
        <ScorePageContainer
          type="left"
          className="flex-center flex-col gap-8 md:flex-row"
        >
          <Image
            src={preprocessing.face_image_base64}
            alt="Score"
            width={288}
            height={288}
            className="size-72 rounded-md object-cover object-center md:size-24"
          />
          <div className="text-on-surface flex flex-col gap-2">
            <h3 className="headline-small-emphasized text-left">
              {insights.title}
            </h3>
            <p className="body-medium-primary line-clamp-3 text-left">
              {insights.description}
            </p>
          </div>
        </ScorePageContainer>
        <ScorePageContainer
          type="right"
          className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-3"
        >
          {personality_scores.map((score, index) => (
            <ScorePageProgress
              key={index}
              label={score.type}
              progress={Number(score.value)}
              title={score.name}
            />
          ))}
        </ScorePageContainer>
      </ScorePageCard>
      <ScorePageCard className="xl:rounded-tr-none">
        <ShareButton className="max-xl:hidden" variant={"absolute"} />
        <ScorePageContainer
          type="left"
          className="flex h-110.25 flex-col items-center"
        >
          <CustomRadarChart data={personality_scores} />
          <ShareButton />
        </ScorePageContainer>
        <ScorePageContainer type="right">
          <ScorePagePersonalityAccordion data={personality_scores} />
        </ScorePageContainer>
      </ScorePageCard>
      <ScorePageCard className="flex-center flex-col gap-8 divide-none">
        <Tabs defaultValue="overview" className="mx-auto">
          <TabsList>
            <TabsTrigger value="overview">Worth sharing</TabsTrigger>
            <TabsTrigger value="analytics">Strengths</TabsTrigger>
            <TabsTrigger value="growth">Areas for growth</TabsTrigger>
          </TabsList>
        </Tabs>
        <Carousel
          className="mx-auto max-w-276 pr-8"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem className="" key={index}>
                  <Card
                    className={cn(
                      "size-83 overflow-hidden border-none bg-cover bg-no-repeat p-0 shadow-none",
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
                        <Button variant={"icon"} className="size-10">
                          <Share className="size-5" />
                        </Button>
                      </CardHeader>
                      <div className="h-1/2">
                        <SimpleRadarChart className="pointer-events-none text-white" />
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
          <div className="flex-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </ScorePageCard>
    </>
  );
}
