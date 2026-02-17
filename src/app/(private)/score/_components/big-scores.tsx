import React from "react";
import { ScorePageCard } from "./score-page-card";
import ScorePageShareButton from "./score-page-share-button";
import ScorePageContainer from "./score-page-container";
import Image from "next/image";
import ScorePageProgress from "./score-page-circular-progress";
import SimpleRadarChart from "@/components/charts/SimpleRadarChart";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Share } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
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
import { CameraPlus } from "@/assets/icons";
import Separator from "@/components/ui/separator";
export function ScorePagePersonalityAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      //   defaultValue={personality_scores[0].title}
    >
      {/* {personality_scores.map((personality, index) => (
        <AccordionItem key={index} value={personality.title}>
          <AccordionTrigger
            className="group"
            disabled={!personality.descriptions}
          >
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex-center gap-2">
                <span
                  className={cn({
                    "text-warning": personality.level === "moderate",
                    "text-error": personality.level === "low",
                    "text-success": personality.level === "high",
                  })}
                >
                  {personality.score}%
                </span>
                {personality.title}
                <Badge
                  variant={personality.level as "moderate" | "high" | "low"}
                  className="capitalize"
                >
                  {personality.level}
                </Badge>
              </div>
              <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-10">
            {personality.descriptions?.map((description, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="size-4 bg-error-container shrink-0" />
                <div className="grow flex flex-col gap-2">
                  <p className="body-medium-primary text-left">
                    {description.title}
                  </p>
                  <div className="flex items-center flex-wrap gap-1">
                    {description.items.map((item, index) => (
                      <Badge key={index}>
                        <Icon>{item.icon}</Icon>
                        {item.description}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Button variant={"outline"}>
              <Share className="size-3" />
              Share
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))} */}
    </Accordion>
  );
}
export default function BigScores() {
  return (
    <>
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer
          type="left"
          className="flex-center flex-col md:flex-row gap-8"
        >
          <Image
            src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Score"
            width={288}
            height={288}
            className="rounded-md size-72 md:size-24 object-cover object-center"
          />
          <div className="flex-col flex gap-2 text-on-surface">
            <h3 className="text-left headline-small-emphasized">
              Visionary pathfinder
            </h3>
            <p className="text-left body-medium-primary">
              Your facial cues suggest a natural openness and curiosity, often
              seen in individuals who enjoy exploring new ideas and connecting
              with others.
            </p>
          </div>
        </ScorePageContainer>
        <ScorePageContainer
          type="right"
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-3"
        >
          {/* {main_scores.map((score, index) => (
            <ScorePageProgress
              key={index}
              label={score.level as "low" | "moderate" | "high"}
              progress={score.score}
              title={score.title}
            />
          ))} */}
        </ScorePageContainer>
      </ScorePageCard>
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer
          type="left"
          className="h-110.25 flex flex-col items-center"
        >
          <SimpleRadarChart />
          <Button variant={"outline"}>
            <Share className="size-3" />
            Share
          </Button>
        </ScorePageContainer>
        <ScorePageContainer type="right">
          <ScorePagePersonalityAccordion />
        </ScorePageContainer>
      </ScorePageCard>
      <ScorePageCard className="flex-center flex-col gap-8 divide-none ">
        <Tabs defaultValue="overview" className="mx-auto">
          <TabsList>
            <TabsTrigger value="overview">Worth sharing</TabsTrigger>
            <TabsTrigger value="analytics">Strengths</TabsTrigger>
            <TabsTrigger value="growth">Areas for growth</TabsTrigger>
          </TabsList>
        </Tabs>
        <Carousel
          className="max-w-276 mx-auto pr-8"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem className="" key={index}>
                  <Card className="border-none size-83 shadow-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 overflow-hidden">
                    <CardContent className="size-full backdrop-blur-[2px] bg-black/40 p-0 flex flex-col">
                      <CardHeader className="flex items-center gap-2 justify-end p-3">
                        <Button variant={"icon"} className="size-10">
                          <CameraPlus className="size-5" />
                        </Button>
                        <Button variant={"icon"} className="size-10">
                          <Share className="size-5" />
                        </Button>
                      </CardHeader>
                      <CardAvatar
                        src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        name="Steve Jobs"
                        role="Visionary pathfinder"
                      />
                      <Separator className="h-1 to-white/30 mt-3" />

                      <SimpleRadarChart className="text-white pointer-events-none" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <div className="px-2 my-8">
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
