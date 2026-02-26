"use client";
import { VideoCam } from "@/assets/icons";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";
import UploadOrRecordVideo from "../ui/upload-or-record-video";
import { useTranslation } from "react-i18next";

export default function Poster() {
  const { t } = useTranslation();
  return (
    <section className="section bg-error-container/16 px-4">
      <div className="box-black container-md relative mx-auto flex min-h-79 overflow-hidden px-8 max-lg:pt-16">
        <div className="absolute right-0 bottom-0 h-127.75 w-222.5 shrink-0 translate-x-1/2 translate-y-1/4 bg-[url('/union-2.png')] bg-contain bg-center bg-no-repeat lg:translate-x-1/10 lg:translate-y-1/8" />

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
                {t("poster_trusted")}
              </span>
            </AvatarGroup>
            <div className="space-y-3">
              <h5 className="display-small-emphasized text-left text-white">
                {t("poster_ready")}
              </h5>
              <p className="text-outline-variant text-left">
                {t("poster_desc")}
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
