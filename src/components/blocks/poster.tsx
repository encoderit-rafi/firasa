import { VideoCam } from "@/assets/icons";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Section,
  SectionDescription,
  SectionLabel,
  SectionTitle,
} from "../ui/section";
import Image from "next/image";
const solutions = [
  {
    title: "Facial action coding system (FACS)",
    description:
      "A globally used system that breaks facial movement into measurable action units.",
  },
  {
    title: "Big 5 personality mapping",
    description:
      "The most trusted personality framework in psychology and behavioral science.",
  },
  {
    title: "AI-powered facial motion analysis",
    description:
      "Our AI reads timing, intensity, and patterns in natural facial movement from video.",
  },
  {
    title: "Firasa (Arabic heritage)",
    description:
      "An ancient discipline that studied personality through facial expressions and behavior.",
  },
];
export default function Poster() {
  return (
    <section className="section bg-error-container/16 px-4">
      <div className="box-black flex relative  min-h-79 container-sm mx-auto max-lg:pt-16 px-8 overflow-hidden">
        <Image
          src="/union-2.png"
          alt="Union 2"
          fill
          className="absolute top-0 right-0 bottom-0 translate-y-1/3"
        />

        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-6">
            <AvatarGroup className="flex items-center p-1 pr-2 rounded-full bg-on-surface-variant w-fit">
              <Avatar size="sm">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <span className="text-white label-large-emphasized ml-3">
                Trusted by 12,000+ users
              </span>
            </AvatarGroup>
            <div className="space-y-3">
              <h2 className="text-left text-white">
                Ready to discover your personality?
              </h2>
              <p className="text-outline-variant text-left">
                Free Big 5 score • No credit card
              </p>
            </div>
            <Button>
              <VideoCam />
              Upload or record video
            </Button>
          </div>
          <div className="h-full">
            <Image
              src="/marge-image.png"
              alt="Poster"
              width={514}
              height={514}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
