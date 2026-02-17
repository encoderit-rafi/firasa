import React from "react";
import { ScorePageCard } from "./score-page-card";
import ScorePageShareButton from "./score-page-share-button";
import ScorePageContainer from "./score-page-container";
import { Quote } from "@/assets/icons";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export default function UniqueStory() {
  return (
    <ScorePageCard className="xl:rounded-tr-none">
      <ScorePageShareButton className="max-xl:hidden" />
      <ScorePageContainer type="left" className="flex flex-col gap-8">
        <div className="flex items-start gap-2">
          <Quote className="shrink-0 mt-2" />
          <h2 className="headline-small-emphasized text-left">
            A heart that listens and eyes that roam, curious, kind, and ever at
            home.
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
        {/* {personality_stories.map((story, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <span className="label-small-primary text-left">
                      {story.title}
                    </span>
                    <div className="flex items-center flex-wrap gap-1">
                      {story.items.map((item, index) => (
                        <Badge key={index}>
                          <Icon>{item.icon}</Icon>
                          {item.description}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))} */}
      </ScorePageContainer>
    </ScorePageCard>
  );
}
