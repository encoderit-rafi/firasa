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
import { ArrowBigDownDashIcon, ChevronDownIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, PropsWithChildren, ReactNode, useState } from "react";
import {
  ScorePageSection,
  ScorePageSectionTitle,
} from "./_components/score-page-section";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQueryGetVideoReport } from "./_api";
import {
  ScorePageCard,
  ScorePageNotchCard,
} from "./_components/score-page-card";
import ScorePageContainer from "./_components/score-page-container";
import ScorePageShareButton from "./_components/score-page-share-button";
import ScorePageProgress from "./_components/score-page-circular-progress";
import BigScores, {
  ScorePagePersonalityAccordion,
} from "./_components/big-scores";
import UniqueStory from "./_components/unique-story";
import RelationshipAndEmpathy from "./_components/relationship-and-empathy";
import FocusAndExecution from "./_components/focus-and-execution";
import SimilarityToFamous from "./_components/similarity-to-famous";
import SummaryAndExports from "./_components/summary-and-exports";
import AddOns from "./_components/add-ons";
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
// const personality_scores = [
//   {
//     title: "Openness",
//     score: 78,
//     level: "moderate",
//     descriptions: [
//       {
//         title: "What this means:",
//         items: [
//           {
//             icon: "🤝",
//             description: "You enjoy new ideas and perspectives",
//           },
//           {
//             icon: "🌿",
//             description: "You adapt well to change",
//           },
//           {
//             icon: "🧠",
//             description: "You value personal growth",
//           },
//         ],
//       },
//       {
//         title: "How to increase:",
//         items: [
//           {
//             icon: "🌍",
//             description: "Explore new inputs",
//           },
//           {
//             icon: "🔍",
//             description: "Challenge assumptions",
//           },
//           {
//             icon: "✏️",
//             description: "Create without outcome",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Conscientiousness",
//     score: 64,
//     level: "moderate",
//   },
//   {
//     title: "Agreeableness",
//     score: 81,
//     level: "high",
//   },
//   {
//     title: "Neuroticism",
//     score: 41,
//     level: "low",
//   },
// ];

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

// const level_up_items = [
//   {
//     title: "Discover Personalities Around You",
//     price: 79,
//     time: "one‑time",
//     type: "regular",
//     badge: {
//       icon: "🗒",
//       description: "Up to 7 full reports",
//     },
//   },
//   {
//     title: "Partner Personality Match",
//     price: 7,
//     time: "one‑time",
//     type: "disabled",
//     badge: {
//       icon: "🤝",
//       description: "Coming soon",
//     },
//   },
//   {
//     title: "Monthly Discovery Pass",
//     price: 29,
//     time: "mo",
//     type: "regular",
//     badge: {
//       icon: "📊",
//       description: "Up to 7 full reports",
//     },
//   },
//   {
//     title: "Discover Personalities Around You",
//     price: 79,
//     time: "one‑time",
//     type: "popular",
//     badge: {
//       icon: "🗃",
//       description: "Up to 7 full reports",
//     },
//   },
// ];
// function ScorePagePersonalityAccordion() {
//   return (
//     <Accordion
//       type="single"
//       collapsible
//       defaultValue={personality_scores[0].title}
//     >
//       {personality_scores.map((personality, index) => (
//         <AccordionItem key={index} value={personality.title}>
//           <AccordionTrigger
//             className="group"
//             disabled={!personality.descriptions}
//           >
//             <div className="flex items-center justify-between w-full gap-4">
//               <div className="flex-center gap-2">
//                 <span
//                   className={cn({
//                     "text-warning": personality.level === "moderate",
//                     "text-error": personality.level === "low",
//                     "text-success": personality.level === "high",
//                   })}
//                 >
//                   {personality.score}%
//                 </span>
//                 {personality.title}
//                 <Badge
//                   variant={personality.level as "moderate" | "high" | "low"}
//                   className="capitalize"
//                 >
//                   {personality.level}
//                 </Badge>
//               </div>
//               <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
//             </div>
//           </AccordionTrigger>
//           <AccordionContent className="space-y-10">
//             {personality.descriptions?.map((description, index) => (
//               <div key={index} className="flex items-start gap-2">
//                 <div className="size-4 bg-error-container shrink-0" />
//                 <div className="grow flex flex-col gap-2">
//                   <p className="body-medium-primary text-left">
//                     {description.title}
//                   </p>
//                   <div className="flex items-center flex-wrap gap-1">
//                     {description.items.map((item, index) => (
//                       <Badge key={index}>
//                         <Icon>{item.icon}</Icon>
//                         {item.description}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <Button variant={"outline"}>
//               <Share className="size-3" />
//               Share
//             </Button>
//           </AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
//   );
// }

// const main_tabs = [
//   // {
//   //   id: "score",
//   //   label: "Big 5 scores",
//   //   title: "Big 5 personality score",
//   //   is_visible: true,
//   //   content: () => (
//   //     <>
//   //       <ScorePageCard className="xl:rounded-tr-none">
//   //         <ScorePageShareButton className="max-xl:hidden" />
//   //         <ScorePageContainer
//   //           type="left"
//   //           className="flex-center flex-col md:flex-row gap-8"
//   //         >
//   //           <Image
//   //             src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   //             alt="Score"
//   //             width={288}
//   //             height={288}
//   //             className="rounded-md size-72 md:size-24 object-cover object-center"
//   //           />
//   //           <div className="flex-col flex gap-2 text-on-surface">
//   //             <h3 className="text-left headline-small-emphasized">
//   //               Visionary pathfinder
//   //             </h3>
//   //             <p className="text-left body-medium-primary">
//   //               Your facial cues suggest a natural openness and curiosity, often
//   //               seen in individuals who enjoy exploring new ideas and connecting
//   //               with others.
//   //             </p>
//   //           </div>
//   //         </ScorePageContainer>
//   //         <ScorePageContainer
//   //           type="right"
//   //           className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-3"
//   //         >
//   //           {main_scores.map((score, index) => (
//   //             <ScorePageProgress
//   //               key={index}
//   //               label={score.level as "low" | "moderate" | "high"}
//   //               progress={score.score}
//   //               title={score.title}
//   //             />
//   //           ))}
//   //         </ScorePageContainer>
//   //       </ScorePageCard>
//   //       <ScorePageCard className="xl:rounded-tr-none">
//   //         <ScorePageShareButton className="max-xl:hidden" />
//   //         <ScorePageContainer
//   //           type="left"
//   //           className="h-110.25 flex flex-col items-center"
//   //         >
//   //           <SimpleRadarChart />
//   //           <Button variant={"outline"}>
//   //             <Share className="size-3" />
//   //             Share
//   //           </Button>
//   //         </ScorePageContainer>
//   //         <ScorePageContainer type="right">
//   //           <ScorePagePersonalityAccordion />
//   //         </ScorePageContainer>
//   //       </ScorePageCard>
//   //       <ScorePageCard className="flex-center flex-col gap-8 divide-none ">
//   //         <Tabs defaultValue="overview" className="mx-auto">
//   //           <TabsList>
//   //             <TabsTrigger value="overview">Worth sharing</TabsTrigger>
//   //             <TabsTrigger value="analytics">Strengths</TabsTrigger>
//   //             <TabsTrigger value="growth">Areas for growth</TabsTrigger>
//   //           </TabsList>
//   //         </Tabs>
//   //         <Carousel
//   //           className="max-w-276 mx-auto pr-8"
//   //           opts={{
//   //             align: "start",
//   //           }}
//   //         >
//   //           <div className="flex flex-col space-y-3">
//   //             <CarouselContent>
//   //               {Array.from({ length: 10 }).map((_, index) => (
//   //                 <CarouselItem className="" key={index}>
//   //                   <Card className="border-none size-83 shadow-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 overflow-hidden">
//   //                     <CardContent className="size-full backdrop-blur-[2px] bg-black/40 p-0 flex flex-col">
//   //                       <CardHeader className="flex items-center gap-2 justify-end p-3">
//   //                         <Button variant={"icon"} className="size-10">
//   //                           <CameraPlus className="size-5" />
//   //                         </Button>
//   //                         <Button variant={"icon"} className="size-10">
//   //                           <Share className="size-5" />
//   //                         </Button>
//   //                       </CardHeader>
//   //                       <CardAvatar
//   //                         src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   //                         name="Steve Jobs"
//   //                         role="Visionary pathfinder"
//   //                       />
//   //                       <Separator className="h-1 to-white/30 mt-3" />
//   //                       <SimpleRadarChart className="text-white pointer-events-none" />
//   //                     </CardContent>
//   //                   </Card>
//   //                 </CarouselItem>
//   //               ))}
//   //             </CarouselContent>
//   //           </div>
//   //           <div className="px-2 my-8">
//   //             <CarouselIndicator />
//   //           </div>
//   //           <div className="flex-center gap-2">
//   //             <CarouselPrevious />
//   //             <CarouselNext />
//   //           </div>
//   //         </Carousel>
//   //       </ScorePageCard>
//   //     </>
//   //   ),
//   // },
//   // {
//   //   id: "story",
//   //   label: "Unique story",
//   //   title: "Your unique personality story",
//   //   is_visible: true,
//   //   content: () => (
//   //     <ScorePageCard className="xl:rounded-tr-none">
//   //       <ScorePageShareButton className="max-xl:hidden" />
//   //       <ScorePageContainer type="left" className="flex flex-col gap-8">
//   //         <div className="flex items-start gap-2">
//   //           <Quote className="shrink-0 mt-2" />
//   //           <h2 className="headline-small-emphasized text-left">
//   //             A heart that listens and eyes that roam, curious, kind, and ever
//   //             at home.
//   //           </h2>
//   //         </div>
//   //         <p className="body-medium-primary text-left">
//   //           You are a natural connector, someone who thrives on understanding
//   //           others and exploring the world around you. Your curiosity drives you
//   //           to seek out new experiences and perspectives, while your kindness
//   //           makes you a valued friend and confidant.
//   //         </p>
//   //         <p className="body-medium-primary text-left">
//   //           This blend of empathy and inquisitiveness allows you to navigate
//   //           social situations with ease, making people feel seen and understood
//   //           while also satisfying your own desire for growth and discovery.
//   //         </p>
//   //       </ScorePageContainer>
//   //       <ScorePageContainer type="right" className="flex flex-col gap-8">
//   //         {personality_stories.map((story, index) => (
//   //           <div key={index} className="flex flex-col gap-2">
//   //             <span className="label-small-primary text-left">
//   //               {story.title}
//   //             </span>
//   //             <div className="flex items-center flex-wrap gap-1">
//   //               {story.items.map((item, index) => (
//   //                 <Badge key={index}>
//   //                   <Icon>{item.icon}</Icon>
//   //                   {item.description}
//   //                 </Badge>
//   //               ))}
//   //             </div>
//   //           </div>
//   //         ))}
//   //       </ScorePageContainer>
//   //     </ScorePageCard>
//   //   ),
//   // },
//   // {
//   //   id: "relationship",
//   //   label: "Relationship & empathy",
//   //   title: "Relationship & empathy",
//   //   is_visible: true,
//   //   content: () => (
//   //     <ScorePageCard className="xl:rounded-tr-none">
//   //       <ScorePageShareButton className="max-xl:hidden" />
//   //       <ScorePageContainer
//   //         type="left"
//   //         className="flex flex-col  items-center gap-8"
//   //       >
//   //         <div>
//   //           <h2 className="display-large-emphasized flex items-center text-transparent bg-gradient bg-clip-text text-center flex-center gap-2">
//   //             <div className="size-6 bg-gradient clip-triangle" />
//   //             72%
//   //           </h2>
//   //           <p className="body-large-emphasized max-w-52 text-center mx-auto">
//   //             Ahead of your age group in empathy index
//   //           </p>
//   //         </div>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6">
//   //             {relationship_scores.map((score, index) => (
//   //               <ScorePageProgress
//   //                 key={index}
//   //                 label={score.level as "low" | "moderate" | "high"}
//   //                 progress={score.score}
//   //                 title={score.title}
//   //               />
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex-center flex-wrap gap-1">
//   //             {relationship_items.map((score, index) => (
//   //               <Badge key={index}>
//   //                 <Icon>{score.icon}</Icon>
//   //                 {score.title}
//   //               </Badge>
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <Button variant="outline">
//   //           <Share className="size-3" />
//   //           Share
//   //         </Button>
//   //       </ScorePageContainer>
//   //       <ScorePageContainer type="right">
//   //         <Accordion
//   //           type="single"
//   //           collapsible
//   //           defaultValue={relationship_results[0].title}
//   //         >
//   //           {relationship_results.map((result, index) => (
//   //             <AccordionItem key={index} value={result.title}>
//   //               <AccordionTrigger className="group">
//   //                 <div className="flex items-center justify-between w-full gap-4">
//   //                   <div className="flex-center gap-2">{result.title}</div>
//   //                   <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
//   //                 </div>
//   //               </AccordionTrigger>
//   //               <AccordionContent className="space-y-6">
//   //                 <div className="flex items-start gap-2">
//   //                   <div className="size-4 bg-error-container shrink-0 mt-2" />
//   //                   <div className="grow flex flex-col gap-2">
//   //                     <p className="body-medium-primary text-left">
//   //                       {result.description}
//   //                     </p>
//   //                   </div>
//   //                 </div>
//   //                 <Button variant={"outline"}>
//   //                   <Share className="size-3" />
//   //                   Share
//   //                 </Button>
//   //               </AccordionContent>
//   //             </AccordionItem>
//   //           ))}
//   //         </Accordion>
//   //       </ScorePageContainer>
//   //     </ScorePageCard>
//   //   ),
//   // },
//   // {
//   //   id: "focus",
//   //   label: "Focus & execution style",
//   //   title: "Focus & execution style",
//   //   is_visible: true,
//   //   content: () => (
//   //     <ScorePageCard className="xl:rounded-tr-none">
//   //       <ScorePageShareButton className="max-xl:hidden" />
//   //       <ScorePageContainer
//   //         type="left"
//   //         className="flex flex-col  items-center gap-8"
//   //       >
//   //         <div>
//   //           <h2 className="display-large-emphasized flex items-center text-transparent bg-gradient bg-clip-text text-center flex-center gap-2">
//   //             <div className="size-6 bg-gradient clip-triangle" />
//   //             72%
//   //           </h2>
//   //           <p className="body-large-emphasized max-w-52 text-center mx-auto">
//   //             Ahead of your age group in empathy index
//   //           </p>
//   //         </div>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6">
//   //             {relationship_scores.map((score, index) => (
//   //               <ScorePageProgress
//   //                 key={index}
//   //                 label={score.level as "low" | "moderate" | "high"}
//   //                 progress={score.score}
//   //                 title={score.title}
//   //               />
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex-center flex-wrap gap-1">
//   //             {relationship_items.map((score, index) => (
//   //               <Badge key={index}>
//   //                 <Icon>{score.icon}</Icon>
//   //                 {score.title}
//   //               </Badge>
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <Button variant="outline">
//   //           <Share className="size-3" />
//   //           Share
//   //         </Button>
//   //       </ScorePageContainer>
//   //       <ScorePageContainer type="right">
//   //         <Accordion
//   //           type="single"
//   //           collapsible
//   //           defaultValue={relationship_results[0].title}
//   //         >
//   //           {relationship_results.map((result, index) => (
//   //             <AccordionItem key={index} value={result.title}>
//   //               <AccordionTrigger className="group">
//   //                 <div className="flex items-center justify-between w-full gap-4">
//   //                   <div className="flex-center gap-2">{result.title}</div>
//   //                   <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
//   //                 </div>
//   //               </AccordionTrigger>
//   //               <AccordionContent className="space-y-6">
//   //                 <div className="flex items-start gap-2">
//   //                   <div className="size-4 bg-error-container shrink-0 mt-2" />
//   //                   <div className="grow flex flex-col gap-2">
//   //                     <p className="body-medium-primary text-left">
//   //                       {result.description}
//   //                     </p>
//   //                   </div>
//   //                 </div>
//   //                 <Button variant={"outline"}>
//   //                   <Share className="size-3" />
//   //                   Share
//   //                 </Button>
//   //               </AccordionContent>
//   //             </AccordionItem>
//   //           ))}
//   //         </Accordion>
//   //       </ScorePageContainer>
//   //     </ScorePageCard>
//   //   ),
//   // },
//   // {
//   //   id: "ideation",
//   //   label: "Ideation & creative energy",
//   //   title: "Ideation & creative energy",
//   //   is_visible: true,
//   //   content: () => (
//   //     <ScorePageCard className="xl:rounded-tr-none">
//   //       <ScorePageShareButton className="max-xl:hidden" />
//   //       <ScorePageContainer
//   //         type="left"
//   //         className="flex flex-col  items-center gap-8"
//   //       >
//   //         <div>
//   //           <h2 className="display-large-emphasized flex items-center text-transparent bg-gradient bg-clip-text text-center flex-center gap-2">
//   //             <div className="size-6 bg-gradient clip-triangle" />
//   //             72%
//   //           </h2>
//   //           <p className="body-large-emphasized max-w-52 text-center mx-auto">
//   //             Ahead of your age group in empathy index
//   //           </p>
//   //         </div>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6">
//   //             {relationship_scores.map((score, index) => (
//   //               <ScorePageProgress
//   //                 key={index}
//   //                 label={score.level as "low" | "moderate" | "high"}
//   //                 progress={score.score}
//   //                 title={score.title}
//   //               />
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex-center flex-wrap gap-1">
//   //             {relationship_items.map((score, index) => (
//   //               <Badge key={index}>
//   //                 <Icon>{score.icon}</Icon>
//   //                 {score.title}
//   //               </Badge>
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <Button variant="outline">
//   //           <Share className="size-3" />
//   //           Share
//   //         </Button>
//   //       </ScorePageContainer>
//   //       <ScorePageContainer type="right">
//   //         <Accordion
//   //           type="single"
//   //           collapsible
//   //           defaultValue={relationship_results[0].title}
//   //         >
//   //           {relationship_results.map((result, index) => (
//   //             <AccordionItem key={index} value={result.title}>
//   //               <AccordionTrigger className="group">
//   //                 <div className="flex items-center justify-between w-full gap-4">
//   //                   <div className="flex-center gap-2">{result.title}</div>
//   //                   <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
//   //                 </div>
//   //               </AccordionTrigger>
//   //               <AccordionContent className="space-y-6">
//   //                 <div className="flex items-start gap-2">
//   //                   <div className="size-4 bg-error-container shrink-0 mt-2" />
//   //                   <div className="grow flex flex-col gap-2">
//   //                     <p className="body-medium-primary text-left">
//   //                       {result.description}
//   //                     </p>
//   //                   </div>
//   //                 </div>
//   //                 <Button variant={"outline"}>
//   //                   <Share className="size-3" />
//   //                   Share
//   //                 </Button>
//   //               </AccordionContent>
//   //             </AccordionItem>
//   //           ))}
//   //         </Accordion>
//   //       </ScorePageContainer>
//   //     </ScorePageCard>
//   //   ),
//   // },
//   // {
//   //   id: "pressure",
//   //   label: "Pressure response & recovery",
//   //   title: "Pressure response & recovery",
//   //   is_visible: true,
//   //   content: () => (
//   //     <ScorePageCard className="xl:rounded-tr-none">
//   //       <ScorePageShareButton className="max-xl:hidden" />
//   //       <ScorePageContainer
//   //         type="left"
//   //         className="flex flex-col  items-center gap-8"
//   //       >
//   //         <div>
//   //           <h2 className="display-large-emphasized flex items-center text-transparent bg-gradient bg-clip-text text-center flex-center gap-2">
//   //             <div className="size-6 bg-gradient clip-triangle" />
//   //             72%
//   //           </h2>
//   //           <p className="body-large-emphasized max-w-52 text-center mx-auto">
//   //             Ahead of your age group in empathy index
//   //           </p>
//   //         </div>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6">
//   //             {relationship_scores.map((score, index) => (
//   //               <ScorePageProgress
//   //                 key={index}
//   //                 label={score.level as "low" | "moderate" | "high"}
//   //                 progress={score.score}
//   //                 title={score.title}
//   //               />
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex-center flex-wrap gap-1">
//   //             {relationship_items.map((score, index) => (
//   //               <Badge key={index}>
//   //                 <Icon>{score.icon}</Icon>
//   //                 {score.title}
//   //               </Badge>
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <Button variant="outline">
//   //           <Share className="size-3" />
//   //           Share
//   //         </Button>
//   //       </ScorePageContainer>
//   //       <ScorePageContainer type="right">
//   //         <Accordion
//   //           type="single"
//   //           collapsible
//   //           defaultValue={relationship_results[0].title}
//   //         >
//   //           {relationship_results.map((result, index) => (
//   //             <AccordionItem key={index} value={result.title}>
//   //               <AccordionTrigger className="group">
//   //                 <div className="flex items-center justify-between w-full gap-4">
//   //                   <div className="flex-center gap-2">{result.title}</div>
//   //                   <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
//   //                 </div>
//   //               </AccordionTrigger>
//   //               <AccordionContent className="space-y-6">
//   //                 <div className="flex items-start gap-2">
//   //                   <div className="size-4 bg-error-container shrink-0 mt-2" />
//   //                   <div className="grow flex flex-col gap-2">
//   //                     <p className="body-medium-primary text-left">
//   //                       {result.description}
//   //                     </p>
//   //                   </div>
//   //                 </div>
//   //                 <Button variant={"outline"}>
//   //                   <Share className="size-3" />
//   //                   Share
//   //                 </Button>
//   //               </AccordionContent>
//   //             </AccordionItem>
//   //           ))}
//   //         </Accordion>
//   //       </ScorePageContainer>
//   //     </ScorePageCard>
//   //   ),
//   // },
//   // {
//   //   id: "openness",
//   //   label: "Openness to experience",
//   //   title: "Openness to experience",
//   //   is_visible: true,
//   //   content: () => (
//   //     <ScorePageCard className="xl:rounded-tr-none">
//   //       <ScorePageShareButton className="max-xl:hidden" />
//   //       <ScorePageContainer
//   //         type="left"
//   //         className="flex flex-col  items-center gap-8"
//   //       >
//   //         <div>
//   //           <h2 className="display-large-emphasized flex items-center text-transparent bg-gradient bg-clip-text text-center flex-center gap-2">
//   //             <div className="size-6 bg-gradient clip-triangle" />
//   //             72%
//   //           </h2>
//   //           <p className="body-large-emphasized max-w-52 text-center mx-auto">
//   //             Ahead of your age group in empathy index
//   //           </p>
//   //         </div>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6">
//   //             {relationship_scores.map((score, index) => (
//   //               <ScorePageProgress
//   //                 key={index}
//   //                 label={score.level as "low" | "moderate" | "high"}
//   //                 progress={score.score}
//   //                 title={score.title}
//   //               />
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex-center flex-wrap gap-1">
//   //             {relationship_items.map((score, index) => (
//   //               <Badge key={index}>
//   //                 <Icon>{score.icon}</Icon>
//   //                 {score.title}
//   //               </Badge>
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <Button variant="outline">
//   //           <Share className="size-3" />
//   //           Share
//   //         </Button>
//   //       </ScorePageContainer>
//   //       <ScorePageContainer type="right">
//   //         <Accordion
//   //           type="single"
//   //           collapsible
//   //           defaultValue={relationship_results[0].title}
//   //         >
//   //           {relationship_results.map((result, index) => (
//   //             <AccordionItem key={index} value={result.title}>
//   //               <AccordionTrigger className="group">
//   //                 <div className="flex items-center justify-between w-full gap-4">
//   //                   <div className="flex-center gap-2">{result.title}</div>
//   //                   <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
//   //                 </div>
//   //               </AccordionTrigger>
//   //               <AccordionContent className="space-y-6">
//   //                 <div className="flex items-start gap-2">
//   //                   <div className="size-4 bg-error-container shrink-0 mt-2" />
//   //                   <div className="grow flex flex-col gap-2">
//   //                     <p className="body-medium-primary text-left">
//   //                       {result.description}
//   //                     </p>
//   //                   </div>
//   //                 </div>
//   //                 <Button variant={"outline"}>
//   //                   <Share className="size-3" />
//   //                   Share
//   //                 </Button>
//   //               </AccordionContent>
//   //             </AccordionItem>
//   //           ))}
//   //         </Accordion>
//   //       </ScorePageContainer>
//   //     </ScorePageCard>
//   //   ),
//   // },
//   // {
//   //   id: "learning",
//   //   label: "Learning & growth",
//   //   title: "Learning & growth",
//   //   is_visible: true,
//   //   content: () => (
//   //     <ScorePageCard className="xl:rounded-tr-none">
//   //       <ScorePageShareButton className="max-xl:hidden" />
//   //       <ScorePageContainer
//   //         type="left"
//   //         className="flex flex-col  items-center gap-8"
//   //       >
//   //         <div>
//   //           <h2 className="display-large-emphasized flex items-center text-transparent bg-gradient bg-clip-text text-center flex-center gap-2">
//   //             <div className="size-6 bg-gradient clip-triangle" />
//   //             72%
//   //           </h2>
//   //           <p className="body-large-emphasized max-w-52 text-center mx-auto">
//   //             Ahead of your age group in empathy index
//   //           </p>
//   //         </div>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6">
//   //             {relationship_scores.map((score, index) => (
//   //               <ScorePageProgress
//   //                 key={index}
//   //                 label={score.level as "low" | "moderate" | "high"}
//   //                 progress={score.score}
//   //                 title={score.title}
//   //               />
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <ScorePageNotchCard title="Score breakdown">
//   //           <div className="flex-center flex-wrap gap-1">
//   //             {relationship_items.map((score, index) => (
//   //               <Badge key={index}>
//   //                 <Icon>{score.icon}</Icon>
//   //                 {score.title}
//   //               </Badge>
//   //             ))}
//   //           </div>
//   //         </ScorePageNotchCard>
//   //         <Button variant="outline">
//   //           <Share className="size-3" />
//   //           Share
//   //         </Button>
//   //       </ScorePageContainer>
//   //       <ScorePageContainer type="right">
//   //         <Accordion
//   //           type="single"
//   //           collapsible
//   //           defaultValue={relationship_results[0].title}
//   //         >
//   //           {relationship_results.map((result, index) => (
//   //             <AccordionItem key={index} value={result.title}>
//   //               <AccordionTrigger className="group">
//   //                 <div className="flex items-center justify-between w-full gap-4">
//   //                   <div className="flex-center gap-2">{result.title}</div>
//   //                   <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
//   //                 </div>
//   //               </AccordionTrigger>
//   //               <AccordionContent className="space-y-6">
//   //                 <div className="flex items-start gap-2">
//   //                   <div className="size-4 bg-error-container shrink-0 mt-2" />
//   //                   <div className="grow flex flex-col gap-2">
//   //                     <p className="body-medium-primary text-left">
//   //                       {result.description}
//   //                     </p>
//   //                   </div>
//   //                 </div>
//   //                 <Button variant={"outline"}>
//   //                   <Share className="size-3" />
//   //                   Share
//   //                 </Button>
//   //               </AccordionContent>
//   //             </AccordionItem>
//   //           ))}
//   //         </Accordion>
//   //       </ScorePageContainer>
//   //     </ScorePageCard>
//   //   ),
//   // },
//   // {
//   //   id: "similarity",
//   //   label: "Similarity to famous",
//   //   title: "Personalities you might relate to",
//   //   is_visible: true,
//   //   content: () => (
//   //     <ScorePageCard>
//   //       <Carousel
//   //         className="max-w-276 mx-auto pr-8"
//   //         opts={{
//   //           align: "start",
//   //         }}
//   //       >
//   //         <div className="flex flex-col space-y-3">
//   //           <CarouselContent>
//   //             {Array.from({ length: 10 }).map((_, index) => (
//   //               <CarouselItem className="" key={index}>
//   //                 <Card className="border-none size-83 shadow-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 overflow-hidden">
//   //                   <CardContent className="size-full  bg-linear-to-t from-black/80 to-transparent p-0 flex flex-col items-center justify-between">
//   //                     <CardHeader className="text-white title-medium-emphasized w-full text-center bg-linear-to-r from-error to-transparent px-3 py-1">
//   //                       Keanu Reeves
//   //                     </CardHeader>
//   //                     <div className="pb-3">
//   //                       <CircularProgress
//   //                         label="high"
//   //                         progress={52}
//   //                         className="text-white"
//   //                       />
//   //                     </div>
//   //                   </CardContent>
//   //                 </Card>
//   //               </CarouselItem>
//   //             ))}
//   //           </CarouselContent>
//   //         </div>
//   //         <div className="px-2 my-8">
//   //           <CarouselIndicator />
//   //         </div>
//   //         <div className="flex-center gap-2">
//   //           <CarouselPrevious />
//   //           <CarouselNext />
//   //         </div>
//   //       </Carousel>
//   //     </ScorePageCard>
//   //   ),
//   // },
//   // {
//   //   id: "exports",
//   //   label: "Exports",
//   //   title: "Summary & exports",
//   //   is_visible: true,
//   //   component: <SummaryAndExports />,
//   // },
//   // {
//   //   id: "add-ons",
//   //   label: "Add-ons",
//   //   title: "Level-up add-ons",
//   //   is_visible: true,
//   //   component: <AddOns />,
//   // },
// ];
export default function ScorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysis_id");

  // useEffect(() => {
  //   if (!analysisId) {
  //     router.replace("/upload");
  //   }
  // }, [analysisId, router]);
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
          component: (
            <UniqueStory
              data={reportData}
              // data={{
              //   image: "full_result.metadata.preprocessing.face_image_base64",
              //   quote: "full_result.insights.quote",
              //   story: "full_result.insights.story",
              //   story_traits: "full_result.insights.story_traits",
              // }}
            />
          ),
        },
        {
          id: "relationship",
          label: "Relationship & empathy",
          title: "Relationship & empathy",
          is_visible: true,
          component: (
            <RelationshipAndEmpathy
            // data={{
            //   metrics: "full_result.relationship_metrics.metrics",
            //   actionable_steps:
            //     "full_result.relationship_metrics.actionable_steps",
            // }}
            />
          ),
        },
        {
          id: "focus",
          label: "Focus & execution style",
          title: "Focus & execution style",
          is_visible: true,
          component: <FocusAndExecution />,
        },
        {
          id: "ideation",
          label: "Ideation & creative energy",
          title: "Ideation & creative energy",
          is_visible: true,
          component: <RelationshipAndEmpathy />,
        },
        {
          id: "pressure",
          label: "Pressure response & recovery",
          title: "Pressure response & recovery",
          is_visible: true,
          component: <RelationshipAndEmpathy />,
        },
        {
          id: "openness",
          label: "Openness to experience",
          title: "Openness to experience",
          is_visible: true,
          component: <RelationshipAndEmpathy />,
        },
        {
          id: "learning",
          label: "Learning & growth",
          title: "Learning & growth",
          is_visible: true,
          component: <RelationshipAndEmpathy />,
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
  if (isLoading) return <Loader2 className="animate-spin" />;

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
