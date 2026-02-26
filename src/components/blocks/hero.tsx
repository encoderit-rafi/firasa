"use client";
import { Guard, Model, Video } from "@/assets/icons";
import { PropsCardFeature } from "../cards/feature/CardFeature";

import UploadOrRecordVideo from "../ui/upload-or-record-video";
import DiscoverSampleResult from "../ui/discover-sample-result";
import HeroImgs from "./HeroImgs";
import { useTranslation, Trans } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const features: PropsCardFeature[] = [
    {
      title: t("feature_big5_title"),
      description: t("feature_big5_desc"),
      icon: <Model />,
    },
    {
      title: t("feature_autodeleted_title"),
      description: t("feature_autodeleted_desc"),
      icon: <Guard />,
    },
    {
      title: t("feature_videoonly_title"),
      description: t("feature_videoonly_desc"),
      icon: <Video />,
      type: "reverse",
    },
  ];

  return (
    <section className="pt-16">
      <div className="space-y-6 px-2">
        <h1>
          {/* <Trans i18nKey="hero_h1">
            Scan your face.
            <br /> Reveal your personality.
          </Trans> */}
          {t("hero_h1")}
          <br />
          {t("hero_h2")}
        </h1>
        <p>{t("hero_p")}</p>
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-6">
          <UploadOrRecordVideo className="w-61.25" />
          <DiscoverSampleResult className="w-61.25" />
        </div>
        <HeroImgs features={features} />
      </div>
    </section>
  );
}
