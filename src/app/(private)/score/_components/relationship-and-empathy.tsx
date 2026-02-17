import React from "react";
import { ScorePageCard, ScorePageNotchCard } from "./score-page-card";
import ScorePageShareButton from "./score-page-share-button";
import ScorePageContainer from "./score-page-container";
import ScorePageProgress from "./score-page-circular-progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Share } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RelationshipAndEmpathy() {
  return (
    <ScorePageCard className="xl:rounded-tr-none">
      <ScorePageShareButton className="max-xl:hidden" />
      <ScorePageContainer
        type="left"
        className="flex flex-col  items-center gap-8"
      >
        <div>
          <h2 className="display-large-emphasized flex items-center text-transparent bg-gradient bg-clip-text text-center flex-center gap-2">
            <div className="size-6 bg-gradient clip-triangle" />
            72%
          </h2>
          <p className="body-large-emphasized max-w-52 text-center mx-auto">
            Ahead of your age group in empathy index
          </p>
        </div>
        <ScorePageNotchCard title="Score breakdown">
          <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6">
            {/* {relationship_scores.map((score, index) => (
                      <ScorePageProgress
                        key={index}
                        label={score.level as "low" | "moderate" | "high"}
                        progress={score.score}
                        title={score.title}
                      />
                    ))} */}
          </div>
        </ScorePageNotchCard>
        <ScorePageNotchCard title="Score breakdown">
          <div className="flex-center flex-wrap gap-1">
            {/* {relationship_items.map((score, index) => (
                      <Badge key={index}>
                        <Icon>{score.icon}</Icon>
                        {score.title}
                      </Badge>
                    ))} */}
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
          //   defaultValue={relationship_results[0].title}
        >
          {/* {relationship_results.map((result, index) => (
                    <AccordionItem key={index} value={result.title}>
                      <AccordionTrigger className="group">
                        <div className="flex items-center justify-between w-full gap-4">
                          <div className="flex-center gap-2">
                            {result.title}
                          </div>
                          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6">
                        <div className="flex items-start gap-2">
                          <div className="size-4 bg-error-container shrink-0 mt-2" />
                          <div className="grow flex flex-col gap-2">
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
                  ))} */}
        </Accordion>
      </ScorePageContainer>
    </ScorePageCard>
  );
}
