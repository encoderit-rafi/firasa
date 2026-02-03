import React from "react";
import { Button } from "../ui/button";
import { ArrowForward, Guard, Model, Video, VideoCam } from "@/assets/icons";
import CardFeature, { PropsCardFeature } from "../cards/feature/CardFeature";
import Image from "next/image";
const features: PropsCardFeature[] = [
  {
    title: "Big 5 model",
    description: "AI face personality score",
    icon: <Model />,
  },
  {
    title: "Auto-deleted",
    description: "Your privacy is our priority",
    icon: <Guard />,
  },
  {
    title: "Video-only",
    description: "Face movement detection",
    icon: <Video />,
    type: "reverse",
  },
];
export default function Hero() {
  return (
    <section className="pt-16">
      <div className="space-y-6 px-2">
        <h1>
          Scan your face.
          <br /> Reveal your personality.
        </h1>
        <p>
          Upload or record a 5-second video and let AI analyze your personality
          in seconds.
        </p>
        <div className="flex items-center justify-center gap-2 md:flex-row flex-col md:gap-6">
          <Button className="w-61.25">
            <VideoCam />
            Upload or record video
          </Button>
          <Button variant={"outline"} className="w-61.25">
            <ArrowForward />
            Discover sample result
          </Button>
        </div>
        <div className="bg-[url('/union.png')] bg-center bg-no-repeat overflow-x-hidden">
          <div className="relative w-fit mx-auto">
            <CardFeature
              data={features[0]}
              className={"absolute top-50 -left-20"}
            />
            <CardFeature
              data={features[1]}
              className={"absolute bottom-10 -left-20"}
            />
            <CardFeature
              data={features[2]}
              className={"absolute -right-20 top-1/2"}
            />

            <Image
              src="/hero-image.png"
              alt="Hero image"
              width={514}
              height={514}
              className="mx-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
