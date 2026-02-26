"use client";
import { Guard, Model, Video } from "@/assets/icons";
import { PropsCardFeature } from "../cards/feature/CardFeature";

import UploadOrRecordVideo from "../ui/upload-or-record-video";
import DiscoverSampleResult from "../ui/discover-sample-result";
import HeroImgs from "./HeroImgs";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <section className="pt-16">
      <div className="space-y-6 px-2">
        {/* <h1>
          Scan your face.
          <br /> Reveal your personality.
        </h1> */}
        <h1>{t("welcome")}</h1>
        <p>
          Upload or record a 5-second video and let AI analyze your personality
          in seconds.
        </p>
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-6">
          <UploadOrRecordVideo className="w-61.25" />
          <DiscoverSampleResult className="w-61.25" />
        </div>
        <HeroImgs features={features} />
      </div>
    </section>
  );
}
