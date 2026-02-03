import { ArrowForward, CameraPlus, Quote, Share } from "@/assets/icons";
import CircularProgress from "@/components/charts/CircularProgress";
import SimpleRadarChart from "@/components/charts/SimpleRadarChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import Separator from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
const steps: {
  // icon: React.FC<SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
}[] = [
  {
    // icon: One,
    title: "What does Firasa actually do?",
    content:
      "Just look at the camera. Small movements matter. Photos don’t capture personality. Motion does.",
  },
  {
    // icon: Two,
    title: "How long does the analysis take?",
    content:
      "AI analyzes your facial movements to identify patterns and insights. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "Do I have to smile or pose in a special way?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "What happens to my video after analysis?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "Can I re-analyze myself later?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "I’m skeptical; can I get a refund?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
];
export default function ScorePage() {
  return (
    <div>
      <h2>Big 5 personality score</h2>
      <Card className="relative container-md mx-auto bg-error-container/15 border-none shadow-none">
        <CardContent className="flex-center divide-x divide-error-container">
          <div className="w-1/2 px-2.5 flex-center gap-2">
            <Image
              src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Score"
              width={90}
              height={90}
              className="rounded-md size-24 object-cover object-center"
            />
            <div className="flex-col flex gap-2 text-on-surface">
              <h3 className="headline-small-emphasized">
                Visionary pathfinder
              </h3>
              <p className="body-medium-primary">
                Your facial cues suggest a natural openness and curiosity, often
                seen in individuals who enjoy exploring new ideas and connecting
                with others.
              </p>
            </div>
          </div>
          <div className="w-1/2 px-2.5 flex-between gap-3">
            <div className="flex flex-col items-center gap-1">
              <CircularProgress label="moderate" progress={52} />
              <p className="label-small-primary">Openness</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CircularProgress label="moderate" progress={60} />
              <p className="label-small-primary">Conscientiousness</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CircularProgress label="low" progress={41} />
              <p className="label-small-primary">Extraversion</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CircularProgress label="high" progress={70} />
              <p className="label-small-primary">Agreeableness</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CircularProgress label="high" progress={70} />
              <p className="label-small-primary">Neuroticism</p>
            </div>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 bg-error-container flex items-center gap-2 -rotate-90 py-1 px-5 w-fit rounded-b-lg translate-y-12 translate-x-15 ">
          <Share />
          <span className="label-small-primary">Share</span>
        </div>
      </Card>
      <Card className="relative container-md mx-auto bg-error-container/15 border-none shadow-none my-10">
        <CardContent className="flex-center divide-x divide-error-container">
          <div className="w-1/2 h-96 px-2.5 flex-center gap-2">
            <SimpleRadarChart />
          </div>
          <div className="w-1/2 px-2.5">
            <Accordion
              type="single"
              collapsible
              defaultValue={steps[0].title}
              className="container-sm mx-auto "
            >
              <AccordionItem key="item-1" value="item-1">
                <AccordionTrigger className="group">
                  <div className="flex items-center justify-between w-full gap-4 headline-small-emphasized ">
                    {/* <step.icon /> */}
                    <div className="flex-center gap-2">
                      <span className="body-large-emphasized text-warning">
                        78%
                      </span>
                      <span className="body-large-emphasized">Openness</span>
                      <div className="bg-warning rounded-full label-small-primary px-2 py-1">
                        Moderate
                      </div>
                    </div>
                    <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-start gap-4">
                    <div className="size-4 bg-error-container shrink-0" />
                    <div className="grow flex flex-col gap-3">
                      <p className="body-medium-primary">What this means:</p>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex gap-3">
                          <div className="p-1 pr-2 rounded-full bg-white border border-error-container flex items-center gap-2">
                            <span className="size-6  bg-error-container rounded-full text-center flex-center">
                              😎
                            </span>
                            <span className="label-small-primary">
                              You enjoy new ideas and perspectives
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="p-1 pr-2 rounded-full bg-white border border-error-container flex items-center gap-2">
                            <span className="size-6  bg-error-container rounded-full text-center flex-center">
                              😎
                            </span>
                            <span className="label-small-primary">
                              You enjoy new ideas and perspectives
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {steps.map((step) => (
                <AccordionItem key={step.title} value={step.title}>
                  <AccordionTrigger className="group">
                    <div className="flex items-center justify-between w-full gap-4 headline-small-emphasized ">
                      {/* <step.icon /> */}
                      {step.title}
                      <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="body-large-primary text-on-surface ">
                      {step.content}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
              {/* <AccordionItem value="item-1">
                <AccordionTrigger></AccordionTrigger>
                <AccordionContent>
                  <p>
                    Yes, it is free to use. You can use it as much as you want.
                  </p>
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 bg-error-container flex items-center gap-2 -rotate-90 py-1 px-5 w-fit rounded-b-lg translate-y-12 translate-x-15 ">
          <Share />
          <span className="label-small-primary">Share</span>
        </div>
      </Card>
      <Card className="relative container-md mx-auto bg-error-container/15 border-none shadow-none">
        <Tabs defaultValue="overview" className="mx-auto">
          <TabsList>
            <TabsTrigger value="overview">Worth sharing</TabsTrigger>
            <TabsTrigger value="analytics">Strengths</TabsTrigger>
            <TabsTrigger value="analytics">Areas for growth</TabsTrigger>
          </TabsList>
        </Tabs>
        <Carousel
          className="w-full container-md"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  className="md:basis-1/2 lg:basis-1/3 "
                  key={index}
                >
                  <Card className="border-none size-82.75 shadow-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 overflow-hidden">
                    <CardContent className="size-full backdrop-blur-[2px] bg-black/40 p-0 flex flex-col">
                      <CardHeader className="flex items-center gap-2 justify-end p-3">
                        <Button variant={"icon"} size={"icon-lg"}>
                          <CameraPlus />
                        </Button>
                        <Button variant={"icon"} size={"icon-lg"}>
                          <Share />
                        </Button>
                      </CardHeader>
                      <div className=" flex flex-col items-center gap-3">
                        <Avatar className="size-15 bg-gradient p-0.5">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="@shadcn"
                            className="size-full rounded-full object-cover object-center"
                          />
                        </Avatar>
                        <div className="flex flex-col items-center">
                          <span className="title-medium-emphasized bg-gradient bg-clip-text text-transparent">
                            Visionary pathfinder
                          </span>
                          <span className="body-small-primary text-white">
                            Steve Jobs
                          </span>
                        </div>
                      </div>
                      {/* <Separator className="h-1 to-white/30 mt-3" /> */}

                      <SimpleRadarChart />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <CarouselIndicator className="my-4" />
          <div className="flex-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <div className="absolute top-0 right-0 bg-error-container flex items-center gap-2 -rotate-90 py-1 px-5 w-fit rounded-b-lg translate-y-12 translate-x-15 ">
          <Share />
          <span className="label-small-primary">Share</span>
        </div>
      </Card>
      <h2>Your unique personality story</h2>
      <Card className="relative container-md mx-auto bg-error-container/15 border-none shadow-none my-10">
        <CardContent className="flex-center divide-x divide-error-container">
          <div className="w-1/2 h-96 px-2.5 flex items-start gap-2">
            <Quote className="shrink-0" />
            <div className="grow space-y-4">
              <h2 className="headline-small-emphasized text-left">
                A heart that listens and eyes that roam, curious, kind, and ever
                at home.
              </h2>
              <p className="body-medium-primary">
                You are a natural connector, someone who thrives on
                understanding others and exploring the world around you. Your
                curiosity drives you to seek out new experiences and
                perspectives, while your kindness makes you a valued friend and
                confidant.
              </p>
              <p className="body-medium-primary">
                This blend of empathy and inquisitiveness allows you to navigate
                social situations with ease, making people feel seen and
                understood while also satisfying your own desire for growth and
                discovery.
              </p>
            </div>
            {/* <SimpleRadarChart /> */}
          </div>
          <div className="w-1/2 px-2.5">
            <div className="flex items-start gap-4">
              <div className="size-4 bg-error-container shrink-0" />
              <div className="grow flex flex-col gap-3">
                <p className="body-medium-primary">What this means:</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex gap-3">
                    <div className="p-1 pr-2 rounded-full bg-white border border-error-container flex items-center gap-2">
                      <span className="size-6  bg-error-container rounded-full text-center flex-center">
                        😎
                      </span>
                      <span className="label-small-primary">
                        You enjoy new ideas and perspectives
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-1 pr-2 rounded-full bg-white border border-error-container flex items-center gap-2">
                      <span className="size-6  bg-error-container rounded-full text-center flex-center">
                        😎
                      </span>
                      <span className="label-small-primary">
                        You enjoy new ideas and perspectives
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="absolute top-0 right-0 bg-error-container flex items-center gap-2 -rotate-90 py-1 px-5 w-fit rounded-b-lg translate-y-12 translate-x-15 ">
          <Share />
          <span className="label-small-primary">Share</span>
        </div>
      </Card>
    </div>
  );
}
