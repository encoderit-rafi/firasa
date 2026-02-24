"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ScorePageCard } from "./score-page-card";
import ScorePageShareButton from "./score-page-share-button";
import ScorePageContainer from "./score-page-container";
import { ArrowOutward, Copy, FacebookFilled, Quote, X } from "@/assets/icons";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ShareButton from "@/components/ui/share-button";
import { TUniqueStoryTraits } from "@/global-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Button } from "@/components/ui/button";
import { LinkedinFilled } from "@/assets/icons/LinkedinFilled";
import { useSearchParams } from "next/navigation";
import { useMutationToggleSharing } from "../_api";
import { handleCopyLink } from "@/lib/utils";
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
  const { share_token } = data;
  const [dialogData, setDialogData] = useState({
    open: false,
    data: "",
  });
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysis_id");
  const { mutateAsync: toggleSharing } = useMutationToggleSharing(analysisId);
  const { insights } = data;
  const { quote, story, story_traits } = insights;
  const [fullPath, setFullPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullPath(window.location.href);
    }
  }, []);
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
  const sharePath = share_token
    ? `${window.location.origin}/share?share_token=${share_token}`
    : fullPath;
  const share_data = `
  ${quote}\n
  ${story}\n
 ${story_traits.map((trait) => `${trait.emoji} ${trait.label}`).join("\n")}
  \nShow more at: ${sharePath}`;

  const handleShareClick = async () => {
    if (!share_token) {
      await toggleSharing();
    }
    setDialogData({
      open: true,
      data: share_data,
      // link: window.location.origin,
    });
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
      <Dialog
        open={dialogData.open}
        onOpenChange={(open) => setDialogData({ ...dialogData, open })}
      >
        <DialogContent className="max-w-136 space-y-6">
          <DialogHeader>
            <DialogTitle>Make it a post</DialogTitle>
          </DialogHeader>
          <div className="border-error-container max-h-100 overflow-y-auto rounded-lg border bg-white p-6 text-wrap whitespace-pre-line">
            {dialogData.data}
          </div>

          <div className="flex-center mb-0 gap-3">
            <TwitterShareButton url={sharePath} title={dialogData.data}>
              <Button variant={"icon-muted"}>
                <X />
              </Button>
            </TwitterShareButton>
            <LinkedinShareButton url={sharePath} title={dialogData.data}>
              <Button variant={"icon-muted"}>
                <LinkedinFilled />
              </Button>
            </LinkedinShareButton>
            <FacebookShareButton url={sharePath}>
              <Button variant={"icon-muted"}>
                <FacebookFilled />
              </Button>
            </FacebookShareButton>
            <Button
              variant={"icon-muted"}
              onClick={() => handleCopyLink(dialogData.data)}
            >
              <Copy />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ScorePageCard>
  );
}
