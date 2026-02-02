import { Share } from "@/assets/icons";
import CircularProgress from "@/components/charts/CircularProgress";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
    </div>
  );
}
