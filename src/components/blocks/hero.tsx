import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ArrowForward, Guard, Model, Video, VideoCam } from "@/assets/icons";
import CardFeature, { PropsCardFeature } from "../cards/feature/CardFeature";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UploadOrRecordVideo from "../ui/upload-or-record-video";
import DiscoverSampleResult from "../ui/discover-sample-result";
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
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-6">
          {/* <Link
            href="/upload"
            className={cn(
              "w-61.25",
              buttonVariants({
                variant: "default",
              }),
            )}
          >
            <VideoCam />
            Upload or record video
          </Link> */}
          <UploadOrRecordVideo className="w-61.25" />
          <DiscoverSampleResult className="w-61.25" />
        </div>
        <div className="overflow-x-hidden bg-[url('/union.png')] bg-center bg-no-repeat">
          <div className="relative mx-auto w-fit">
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
              className={"absolute top-1/2 -right-20"}
            />

            <Image
              src="/hero-image.png"
              alt="Hero image"
              width={514}
              height={514}
              className="relative z-10 mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
