import React from "react";
import { ScorePageCard } from "./score-page-card";
import ScorePageShareButton from "./score-page-share-button";
import ScorePageContainer from "./score-page-container";
import { ArrowOutward, Quote } from "@/assets/icons";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ShareButton from "@/components/ui/share-button";
type Props = {
  data: any;
};
type StoryTrait = {
  emoji: string;
  label: string;
};
type PersonalityStory = {
  title: string;
  items: StoryTrait[];
};
export default function UniqueStory({ data }: Props) {
  const { full_result } = data;
  const {
    insights: { quote, story, story_traits },
  } = full_result;

  const personality_stories: PersonalityStory[] = [
    {
      title: "You are:",
      items: story_traits,
    },
    {
      title: "Room for improvement:",
      items: [
        {
          emoji: <ArrowOutward />,
          label: "Explore new inputs",
        },
        {
          emoji: <ArrowOutward />,
          label: "Challenge assumptions",
        },
        {
          emoji: <ArrowOutward />,
          label: "Create without outcome",
        },
      ],
    },
  ];
  return (
    <ScorePageCard className="xl:rounded-tr-none">
      <ShareButton className="max-xl:hidden" variant={"absolute"} />
      <ScorePageContainer type="left" className="flex flex-col gap-8">
        <div className="flex items-start gap-2">
          <Quote className="mt-2 shrink-0" />
          <h2 className="headline-small-emphasized text-left">{quote}</h2>
        </div>
        <p className="body-medium-primary text-left">{story}</p>
      </ScorePageContainer>
      <ScorePageContainer type="right" className="flex flex-col gap-8">
        {personality_stories.map((story, index) => (
          <div key={index} className="flex flex-col gap-2">
            <span className="label-small-primary text-left">{story.title}</span>
            <div className="flex flex-wrap items-center gap-1">
              {story.items.map((item, index) => (
                <Badge key={index}>
                  <Icon>{item.emoji}</Icon>
                  {item.label}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </ScorePageContainer>
    </ScorePageCard>
  );
}
