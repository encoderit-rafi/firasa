"use client";

import {
  ArrowForward,
  CameraPlus,
  PDF,
  DOCX,
  JSON,
  Quote,
  Share,
  ArrowOutward,
  ArrowDropdown,
} from "@/assets/icons";
import CircularProgress from "@/components/charts/CircularProgress";
import SimpleRadarChart from "@/components/charts/SimpleRadarChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Card,
  CardAvatar,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Separator from "@/components/ui/separator";
// import Separator from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowBigDownDashIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";
import {
  ScorePageSection,
  ScorePageSectionTitle,
} from "./_components/score-page-section";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQueryGetVideoReport } from "./_api";
const main_scores = [
  {
    title: "Openness",
    score: 78,
    level: "moderate",
  },
  {
    title: "Conscientiousness",
    score: 64,
    level: "moderate",
  },
  {
    title: "Extraversion",
    score: 71,
    level: "moderate",
  },
  {
    title: "Agreeableness",
    score: 82,
    level: "high",
  },
  {
    title: "Neuroticism",
    score: 41,
    level: "low",
  },
];
const relationship_scores = [
  {
    title: "Trust Signaling",
    score: 89,
    level: "high",
  },
  {
    title: "Social Openness",
    score: 81,
    level: "high",
  },
  {
    title: "Empathy Index",
    score: 57,
    level: "moderate",
  },
  {
    title: "Conflict Avoidance",
    score: 25,
    level: "low",
  },
];
const relationship_items = [
  {
    icon: "🧘",
    title: "Calm Listener",
  },
  {
    icon: "💬",
    title: "Thoughtful Communicator",
  },
  {
    icon: "🛡️",
    title: "Emotionally Secure Partner",
  },
];
const relationship_results = [
  {
    title: "Snapshot insight",
    description:
      "You tend to show up as emotionally present and steady, making others feel comfortable and understood in conversation.",
  },
  {
    title: "Behavioral patterns observed",
    description:
      "You tend to show up as emotionally present and steady, making others feel comfortable and understood in conversation.",
  },
  {
    title: "How others likely experience you",
    description:
      "You tend to show up as emotionally present and steady, making others feel comfortable and understood in conversation.",
  },
  {
    title: "Strength & trade-offs",
    description:
      "You tend to show up as emotionally present and steady, making others feel comfortable and understood in conversation.",
  },
  {
    title: "Growth Lever",
    description:
      "You tend to show up as emotionally present and steady, making others feel comfortable and understood in conversation.",
  },
  {
    title: "Coach recommendation",
    description:
      "You tend to show up as emotionally present and steady, making others feel comfortable and understood in conversation.",
  },
];
const personality_scores = [
  {
    title: "Openness",
    score: 78,
    level: "moderate",
    descriptions: [
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
    ],
  },
  {
    title: "Conscientiousness",
    score: 64,
    level: "moderate",
  },
  {
    title: "Agreeableness",
    score: 81,
    level: "high",
  },
  {
    title: "Neuroticism",
    score: 41,
    level: "low",
  },
];

const personality_stories = [
  {
    title: "You are:",
    items: [
      {
        icon: "😃",
        description: "Emotionally Intelligent",
      },
      {
        icon: "🔬",
        description: "Curious and Observant",
      },
      {
        icon: "😇",
        description: "Adventurous Spirit",
      },
      {
        icon: "🤝",
        description: "Warm and Approachable",
      },
      {
        icon: "🌿",
        description: "Inquisitive Mind",
      },
      {
        icon: "🧠",
        description: "Deep Connector",
      },
      {
        icon: "🌈",
        description: "Flexible and Open-Minded",
      },
      {
        icon: "🪄",
        description: "Inspired by the Unexpected",
      },
    ],
  },
  {
    title: "Room for improvement:",
    items: [
      {
        icon: <ArrowOutward />,
        description: "Explore new inputs",
      },
      {
        icon: <ArrowOutward />,
        description: "Challenge assumptions",
      },
      {
        icon: <ArrowOutward />,
        description: "Create without outcome",
      },
    ],
  },
];
const export_items = [
  {
    icon: <PDF />,
    title: "Download full PDF report",
  },
  {
    icon: <JSON />,
    title: "Export JSON Data",
  },
  {
    icon: <DOCX />,
    title: "Export to Docx",
  },
];
const level_up_items = [
  {
    title: "Discover Personalities Around You",
    price: 79,
    time: "one‑time",
    type: "regular",
    badge: {
      icon: "🗒",
      description: "Up to 7 full reports",
    },
  },
  {
    title: "Partner Personality Match",
    price: 7,
    time: "one‑time",
    type: "disabled",
    badge: {
      icon: "🤝",
      description: "Coming soon",
    },
  },
  {
    title: "Monthly Discovery Pass",
    price: 29,
    time: "mo",
    type: "regular",
    badge: {
      icon: "📊",
      description: "Up to 7 full reports",
    },
  },
  {
    title: "Discover Personalities Around You",
    price: 79,
    time: "one‑time",
    type: "popular",
    badge: {
      icon: "🗃",
      description: "Up to 7 full reports",
    },
  },
];
function ScorePagePersonalityAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={personality_scores[0].title}
    >
      {personality_scores.map((personality, index) => (
        <AccordionItem key={index} value={personality.title}>
          <AccordionTrigger
            className="group"
            disabled={!personality.descriptions}
          >
            <div className="flex w-full items-center justify-between gap-4">
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
                <div className="bg-error-container size-4 shrink-0" />
                <div className="flex grow flex-col gap-2">
                  <p className="body-medium-primary text-left">
                    {description.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-1">
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
      ))}
    </Accordion>
  );
}
// function ScorePageSection({
//   className,
//   children,
//   ...props
// }: ComponentProps<"section"> & PropsWithChildren) {
//   return (
//     <section {...props} className={cn("space-y-8", className)}>
//       {children}
//     </section>
//   );
// }
function ScorePageCard({
  className,
  children,
  ...props
}: ComponentProps<"div"> & PropsWithChildren) {
  return (
    <div {...props} className={cn("card-with-divider container-md", className)}>
      {children}
    </div>
  );
}
function ScorePageNotchCard({
  title,
  className,
  children,
  ...props
}: { title: string } & ComponentProps<"div"> & PropsWithChildren) {
  return (
    <div className="border-t-error-container w-full border-t">
      <div className="label-small-primary bg-error-container mx-auto w-fit rounded-b-xl px-3 py-1">
        {title}
      </div>
      <div {...props} className={cn("w-full flex-1 shrink-0 pt-8", className)}>
        {children}
      </div>
    </div>
  );
}
function ScorePageContainer({
  type = "left",
  className,
  children,
  ...props
}: { type: "left" | "right" } & ComponentProps<"div"> & PropsWithChildren) {
  return (
    <div
      {...props}
      className={cn(
        "w-full flex-1 shrink-0 lg:w-1/2",
        {
          "max-lg:pb-8 lg:pr-8": type === "left",
          "max-lg:pt-8 lg:pl-8": type === "right",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
// function ScorePageSectionTitle({
//   className,
//   children,
//   ...props
// }: ComponentProps<"h2"> & PropsWithChildren) {
//   return (
//     <h2
//       {...props}
//       className={cn("display-large-emphasized text-center", className)}
//     >
//       {children}
//     </h2>
//   );
// }
function ScorePageShareButton({
  className,
  children,
  ...props
}: ComponentProps<"button"> & PropsWithChildren) {
  return (
    <button
      {...props}
      className={cn(
        "bg-error-container absolute top-0 left-full flex h-8 w-24 -translate-x-8 translate-y-8 -rotate-90 cursor-pointer items-center justify-center gap-2 rounded-b-lg",
        className,
      )}
    >
      <Share className="size-3" />
      <span className="label-small-primary">Share</span>
    </button>
  );
}
function ScorePageProgress({
  label,
  progress,
  title,
}: {
  label: "low" | "moderate" | "high";
  progress: number;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <CircularProgress label={label} progress={progress} />
      <p className="label-small-primary">{title}</p>
    </div>
  );
}
const main_tabs = [
  {
    id: "score",
    label: "Big 5 scores",
    title: "Big 5 personality score",
    is_visible: true,
    content: () => (
      <>
        <ScorePageCard className="xl:rounded-tr-none">
          <ScorePageShareButton className="max-xl:hidden" />
          <ScorePageContainer
            type="left"
            className="flex-center flex-col gap-8 md:flex-row"
          >
            <Image
              src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Score"
              width={288}
              height={288}
              className="size-72 rounded-md object-cover object-center md:size-24"
            />
            <div className="text-on-surface flex flex-col gap-2">
              <h3 className="headline-small-emphasized text-left">
                Visionary pathfinder
              </h3>
              <p className="body-medium-primary text-left">
                Your facial cues suggest a natural openness and curiosity, often
                seen in individuals who enjoy exploring new ideas and connecting
                with others.
              </p>
            </div>
          </ScorePageContainer>
          <ScorePageContainer
            type="right"
            className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-3"
          >
            {main_scores.map((score, index) => (
              <ScorePageProgress
                key={index}
                label={score.level as "low" | "moderate" | "high"}
                progress={score.score}
                title={score.title}
              />
            ))}
          </ScorePageContainer>
        </ScorePageCard>
        <ScorePageCard className="xl:rounded-tr-none">
          <ScorePageShareButton className="max-xl:hidden" />
          <ScorePageContainer
            type="left"
            className="flex h-110.25 flex-col items-center"
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
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem className="" key={index}>
                    <Card className="size-83 overflow-hidden border-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 shadow-none">
                      <CardContent className="flex size-full flex-col bg-black/40 p-0 backdrop-blur-[2px]">
                        <CardHeader className="flex items-center justify-end gap-2 p-3">
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
                        <Separator className="mt-3 h-1 to-white/30" />

                        <SimpleRadarChart className="pointer-events-none text-white" />
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
    ),
  },
  {
    id: "story",
    label: "Unique story",
    title: "Your unique personality story",
    is_visible: true,
    content: () => (
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer type="left" className="flex flex-col gap-8">
          <div className="flex items-start gap-2">
            <Quote className="mt-2 shrink-0" />
            <h2 className="headline-small-emphasized text-left">
              A heart that listens and eyes that roam, curious, kind, and ever
              at home.
            </h2>
          </div>
          <p className="body-medium-primary text-left">
            You are a natural connector, someone who thrives on understanding
            others and exploring the world around you. Your curiosity drives you
            to seek out new experiences and perspectives, while your kindness
            makes you a valued friend and confidant.
          </p>
          <p className="body-medium-primary text-left">
            This blend of empathy and inquisitiveness allows you to navigate
            social situations with ease, making people feel seen and understood
            while also satisfying your own desire for growth and discovery.
          </p>
        </ScorePageContainer>
        <ScorePageContainer type="right" className="flex flex-col gap-8">
          {personality_stories.map((story, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="label-small-primary text-left">
                {story.title}
              </span>
              <div className="flex flex-wrap items-center gap-1">
                {story.items.map((item, index) => (
                  <Badge key={index}>
                    <Icon>{item.icon}</Icon>
                    {item.description}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </ScorePageContainer>
      </ScorePageCard>
    ),
  },
  {
    id: "relationship",
    label: "Relationship & empathy",
    title: "Relationship & empathy",
    is_visible: true,
    content: () => (
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer
          type="left"
          className="flex flex-col items-center gap-8"
        >
          <div>
            <h2 className="display-large-emphasized bg-gradient flex-center flex items-center gap-2 bg-clip-text text-center text-transparent">
              <div className="bg-gradient clip-triangle size-6" />
              72%
            </h2>
            <p className="body-large-emphasized mx-auto max-w-52 text-center">
              Ahead of your age group in empathy index
            </p>
          </div>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
              {relationship_scores.map((score, index) => (
                <ScorePageProgress
                  key={index}
                  label={score.level as "low" | "moderate" | "high"}
                  progress={score.score}
                  title={score.title}
                />
              ))}
            </div>
          </ScorePageNotchCard>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex-center flex-wrap gap-1">
              {relationship_items.map((score, index) => (
                <Badge key={index}>
                  <Icon>{score.icon}</Icon>
                  {score.title}
                </Badge>
              ))}
            </div>
          </ScorePageNotchCard>
          <Button variant="outline">
            <Share className="size-3" />
            Share
          </Button>
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
                  <div className="flex items-start gap-2">
                    <div className="bg-error-container mt-2 size-4 shrink-0" />
                    <div className="flex grow flex-col gap-2">
                      <p className="body-medium-primary text-left">
                        {result.description}
                      </p>
                    </div>
                  </div>
                  <Button variant={"outline"}>
                    <Share className="size-3" />
                    Share
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScorePageContainer>
      </ScorePageCard>
    ),
  },
  {
    id: "focus",
    label: "Focus & execution style",
    title: "Focus & execution style",
    is_visible: true,
    content: () => (
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer
          type="left"
          className="flex flex-col items-center gap-8"
        >
          <div>
            <h2 className="display-large-emphasized bg-gradient flex-center flex items-center gap-2 bg-clip-text text-center text-transparent">
              <div className="bg-gradient clip-triangle size-6" />
              72%
            </h2>
            <p className="body-large-emphasized mx-auto max-w-52 text-center">
              Ahead of your age group in empathy index
            </p>
          </div>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
              {relationship_scores.map((score, index) => (
                <ScorePageProgress
                  key={index}
                  label={score.level as "low" | "moderate" | "high"}
                  progress={score.score}
                  title={score.title}
                />
              ))}
            </div>
          </ScorePageNotchCard>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex-center flex-wrap gap-1">
              {relationship_items.map((score, index) => (
                <Badge key={index}>
                  <Icon>{score.icon}</Icon>
                  {score.title}
                </Badge>
              ))}
            </div>
          </ScorePageNotchCard>
          <Button variant="outline">
            <Share className="size-3" />
            Share
          </Button>
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
                  <div className="flex items-start gap-2">
                    <div className="bg-error-container mt-2 size-4 shrink-0" />
                    <div className="flex grow flex-col gap-2">
                      <p className="body-medium-primary text-left">
                        {result.description}
                      </p>
                    </div>
                  </div>
                  <Button variant={"outline"}>
                    <Share className="size-3" />
                    Share
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScorePageContainer>
      </ScorePageCard>
    ),
  },
  {
    id: "ideation",
    label: "Ideation & creative energy",
    title: "Ideation & creative energy",
    is_visible: true,
    content: () => (
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer
          type="left"
          className="flex flex-col items-center gap-8"
        >
          <div>
            <h2 className="display-large-emphasized bg-gradient flex-center flex items-center gap-2 bg-clip-text text-center text-transparent">
              <div className="bg-gradient clip-triangle size-6" />
              72%
            </h2>
            <p className="body-large-emphasized mx-auto max-w-52 text-center">
              Ahead of your age group in empathy index
            </p>
          </div>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
              {relationship_scores.map((score, index) => (
                <ScorePageProgress
                  key={index}
                  label={score.level as "low" | "moderate" | "high"}
                  progress={score.score}
                  title={score.title}
                />
              ))}
            </div>
          </ScorePageNotchCard>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex-center flex-wrap gap-1">
              {relationship_items.map((score, index) => (
                <Badge key={index}>
                  <Icon>{score.icon}</Icon>
                  {score.title}
                </Badge>
              ))}
            </div>
          </ScorePageNotchCard>
          <Button variant="outline">
            <Share className="size-3" />
            Share
          </Button>
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
                  <div className="flex items-start gap-2">
                    <div className="bg-error-container mt-2 size-4 shrink-0" />
                    <div className="flex grow flex-col gap-2">
                      <p className="body-medium-primary text-left">
                        {result.description}
                      </p>
                    </div>
                  </div>
                  <Button variant={"outline"}>
                    <Share className="size-3" />
                    Share
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScorePageContainer>
      </ScorePageCard>
    ),
  },
  {
    id: "pressure",
    label: "Pressure response & recovery",
    title: "Pressure response & recovery",
    is_visible: true,
    content: () => (
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer
          type="left"
          className="flex flex-col items-center gap-8"
        >
          <div>
            <h2 className="display-large-emphasized bg-gradient flex-center flex items-center gap-2 bg-clip-text text-center text-transparent">
              <div className="bg-gradient clip-triangle size-6" />
              72%
            </h2>
            <p className="body-large-emphasized mx-auto max-w-52 text-center">
              Ahead of your age group in empathy index
            </p>
          </div>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
              {relationship_scores.map((score, index) => (
                <ScorePageProgress
                  key={index}
                  label={score.level as "low" | "moderate" | "high"}
                  progress={score.score}
                  title={score.title}
                />
              ))}
            </div>
          </ScorePageNotchCard>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex-center flex-wrap gap-1">
              {relationship_items.map((score, index) => (
                <Badge key={index}>
                  <Icon>{score.icon}</Icon>
                  {score.title}
                </Badge>
              ))}
            </div>
          </ScorePageNotchCard>
          <Button variant="outline">
            <Share className="size-3" />
            Share
          </Button>
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
                  <div className="flex items-start gap-2">
                    <div className="bg-error-container mt-2 size-4 shrink-0" />
                    <div className="flex grow flex-col gap-2">
                      <p className="body-medium-primary text-left">
                        {result.description}
                      </p>
                    </div>
                  </div>
                  <Button variant={"outline"}>
                    <Share className="size-3" />
                    Share
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScorePageContainer>
      </ScorePageCard>
    ),
  },
  {
    id: "openness",
    label: "Openness to experience",
    title: "Openness to experience",
    is_visible: true,
    content: () => (
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer
          type="left"
          className="flex flex-col items-center gap-8"
        >
          <div>
            <h2 className="display-large-emphasized bg-gradient flex-center flex items-center gap-2 bg-clip-text text-center text-transparent">
              <div className="bg-gradient clip-triangle size-6" />
              72%
            </h2>
            <p className="body-large-emphasized mx-auto max-w-52 text-center">
              Ahead of your age group in empathy index
            </p>
          </div>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
              {relationship_scores.map((score, index) => (
                <ScorePageProgress
                  key={index}
                  label={score.level as "low" | "moderate" | "high"}
                  progress={score.score}
                  title={score.title}
                />
              ))}
            </div>
          </ScorePageNotchCard>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex-center flex-wrap gap-1">
              {relationship_items.map((score, index) => (
                <Badge key={index}>
                  <Icon>{score.icon}</Icon>
                  {score.title}
                </Badge>
              ))}
            </div>
          </ScorePageNotchCard>
          <Button variant="outline">
            <Share className="size-3" />
            Share
          </Button>
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
                  <div className="flex items-start gap-2">
                    <div className="bg-error-container mt-2 size-4 shrink-0" />
                    <div className="flex grow flex-col gap-2">
                      <p className="body-medium-primary text-left">
                        {result.description}
                      </p>
                    </div>
                  </div>
                  <Button variant={"outline"}>
                    <Share className="size-3" />
                    Share
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScorePageContainer>
      </ScorePageCard>
    ),
  },
  {
    id: "learning",
    label: "Learning & growth",
    title: "Learning & growth",
    is_visible: true,
    content: () => (
      <ScorePageCard className="xl:rounded-tr-none">
        <ScorePageShareButton className="max-xl:hidden" />
        <ScorePageContainer
          type="left"
          className="flex flex-col items-center gap-8"
        >
          <div>
            <h2 className="display-large-emphasized bg-gradient flex-center flex items-center gap-2 bg-clip-text text-center text-transparent">
              <div className="bg-gradient clip-triangle size-6" />
              72%
            </h2>
            <p className="body-large-emphasized mx-auto max-w-52 text-center">
              Ahead of your age group in empathy index
            </p>
          </div>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
              {relationship_scores.map((score, index) => (
                <ScorePageProgress
                  key={index}
                  label={score.level as "low" | "moderate" | "high"}
                  progress={score.score}
                  title={score.title}
                />
              ))}
            </div>
          </ScorePageNotchCard>
          <ScorePageNotchCard title="Score breakdown">
            <div className="flex-center flex-wrap gap-1">
              {relationship_items.map((score, index) => (
                <Badge key={index}>
                  <Icon>{score.icon}</Icon>
                  {score.title}
                </Badge>
              ))}
            </div>
          </ScorePageNotchCard>
          <Button variant="outline">
            <Share className="size-3" />
            Share
          </Button>
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
                  <div className="flex items-start gap-2">
                    <div className="bg-error-container mt-2 size-4 shrink-0" />
                    <div className="flex grow flex-col gap-2">
                      <p className="body-medium-primary text-left">
                        {result.description}
                      </p>
                    </div>
                  </div>
                  <Button variant={"outline"}>
                    <Share className="size-3" />
                    Share
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScorePageContainer>
      </ScorePageCard>
    ),
  },
  {
    id: "similarity",
    label: "Similarity to famous",
    title: "Personalities you might relate to",
    is_visible: true,
    content: () => (
      <ScorePageCard>
        <Carousel
          className="mx-auto max-w-276 pr-8"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem className="" key={index}>
                  <Card className="size-83 overflow-hidden border-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 shadow-none">
                    <CardContent className="flex size-full flex-col items-center justify-between bg-linear-to-t from-black/80 to-transparent p-0">
                      <CardHeader className="title-medium-emphasized from-error w-full bg-linear-to-r to-transparent px-3 py-1 text-center text-white">
                        Keanu Reeves
                      </CardHeader>
                      <div className="pb-3">
                        <CircularProgress
                          label="high"
                          progress={52}
                          className="text-white"
                        />
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
    ),
  },
  {
    id: "exports",
    label: "Exports",
    title: "Summary & exports",
    is_visible: true,
    content: () => (
      <ScorePageCard className="flex flex-col items-center justify-between gap-6 divide-none bg-transparent lg:flex-row">
        {export_items.map((item, index) => (
          <div className="bg-error-container/16 divide-error-container flex size-full flex-col divide-y rounded-xl p-8">
            <div className="flex-center flex-1 py-6">{item.icon}</div>
            <div className="flex-center flex-1 py-6">
              <Button variant={"outline"}>{item.title}</Button>
            </div>
          </div>
        ))}
      </ScorePageCard>
    ),
  },
  {
    id: "add-ons",
    label: "Add-ons",
    title: "Level-up add-ons",
    is_visible: true,
    content: () => (
      <ScorePageCard className="flex flex-col items-center justify-between gap-6 divide-none bg-transparent lg:flex-row">
        {level_up_items.map((item) => (
          <div
            key={item.title}
            className={cn(
              "bg-error-container/16 divide-error-container relative flex size-full flex-col divide-y rounded-xl p-8",
              {
                "opacity-25": item.type == "disabled",
                "border-error border": item.type == "popular",
              },
            )}
          >
            {item.type == "popular" && (
              <span className="bg-error label-small-emphasized absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-white">
                🔥 Popular
              </span>
            )}
            <div className="flex-center flex-1 flex-col py-6">
              <h4 className="text-outline">{item.title}</h4>
              <p className="display-large-emphasized mt-4 mb-2">
                ${item.price}
                <span className="title-small-emphasized text-outline font-semibold">
                  /{item.time}
                </span>
              </p>
              <Badge variant={"text"}>
                <Icon>{item.badge.icon}</Icon>
                {item.badge.description}
              </Badge>
            </div>
            <div className="flex-center flex-1 py-6">
              <Button variant={"outline"}>Buy Now</Button>
            </div>
          </div>
        ))}
      </ScorePageCard>
    ),
  },
];
export default function ScorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysis_id");

  useEffect(() => {
    if (!analysisId) {
      router.replace("/upload");
    }
  }, [analysisId, router]);

  const { data: reportData, isLoading } = useQueryGetVideoReport(analysisId);
  console.log("👉 ~ ScorePage ~ reportData:", reportData);

  if (!analysisId) return null;

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
              {main_tabs.map(({ id, label, is_visible }) => {
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
        {main_tabs.map(({ id, title, content }) => {
          return (
            <ScorePageSection id={id} key={id}>
              <ScorePageSectionTitle>{title}</ScorePageSectionTitle>
              {content()}
            </ScorePageSection>
          );
        })}
      </div>
    </div>
  );
}
