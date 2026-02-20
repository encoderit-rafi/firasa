import { VideoCam } from "@/assets/icons";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";
import UploadOrRecordVideo from "../ui/upload-or-record-video";
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
      <div className="box-black container-md relative mx-auto flex min-h-79 bg-[url('/union-2.png')] bg-cover bg-center bg-no-repeat px-8 max-lg:pt-16">
        {/* <Image
          src="/union-2.png"
          alt="Union 2"
          fill
          className="absolute inset-0 translate-y-1/3 bg-amber-400"
        /> */}

        <div className="flex flex-1 flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="space-y-6">
            <AvatarGroup className="bg-on-surface-variant flex w-fit items-center rounded-full p-1 pr-2">
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
              <span className="label-large-emphasized ml-3 text-white">
                Trusted by 12,000+ users
              </span>
            </AvatarGroup>
            <div className="space-y-3">
              <h5 className="display-small-emphasized text-left text-white">
                Ready to discover your personality?
              </h5>
              <p className="text-outline-variant text-left">
                Free Big 5 score • No credit card
              </p>
            </div>
            <UploadOrRecordVideo />
          </div>
          <div className="h-full">
            <Image
              src="/marge-image.png"
              alt="Poster"
              width={514}
              height={514}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
