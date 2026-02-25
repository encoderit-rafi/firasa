"use client";
import React, { ReactNode } from "react";
import { ScorePageCard } from "./score-page-card";
import ScorePageContainer from "./score-page-container";
import { ArrowOutward, Quote } from "@/assets/icons";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ShareButton from "@/components/ui/share-button";
import { TUniqueStoryTraits } from "@/global-types";
import { useScoreShare } from "../_hooks/use-score-share";
import { ScoreShareDialog } from "./score-share-dialog";

type Props = {
  data: TUniqueStoryTraits;
};

type StoryTrait = {
  emoji: string | ReactNode;
  label: string;
};

type PersonalityStory = {
  title: string;
  items: StoryTrait[];
};

export default function UniqueStory({ data }: Props) {
  const { share_token, insights } = data;
  const { quote, story, story_traits } = insights;

  const { isOpen, setIsOpen, shareData, handleShare, sharePath } =
    useScoreShare(share_token);

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

  const share_data = `
  ${quote}\n
  ${story}\n
 ${story_traits.map((trait) => `${trait.emoji} ${trait.label}`).join("\n")}
  \nShow more at: ${sharePath}`;

  const handleShareClick = async () => {
    handleShare(share_data);
  };

  return (
    <ScorePageCard className="xl:rounded-tr-none">
      <ShareButton
        className="max-xl:hidden"
        variant={"absolute"}
        onClick={handleShareClick}
      />
      <ScorePageContainer type="left" className="flex flex-col gap-8">
        <div className="flex items-start gap-2">
          <Quote className="mt-2 shrink-0" />
          <h2 className="headline-small-emphasized text-left">{quote}</h2>
        </div>
        <p className="body-medium-primary text-left">{story}</p>
        <ShareButton className="mx-auto w-fit" onClick={handleShareClick} />
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
      <ScoreShareDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        shareData={shareData}
        sharePath={sharePath}
      />
    </ScorePageCard>
  );
}
