"use client";
import { ArrowForward, CameraPlus, Share } from "@/assets/icons";
import { Button } from "../ui/button";
import { Card, CardAvatar, CardContent, CardHeader } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Separator from "../ui/separator";
import SimpleRadarChart from "../charts/SimpleRadarChart";
import { useTranslation } from "react-i18next";

export default function Discover() {
  const { t } = useTranslation();
  return (
    <section id="discover" className="section bg-error-container/16">
      <h6 className="section-label">{t("discover_label")}</h6>
      <h2 className="section-title">{t("discover_title")}</h2>
      <p className="section-description">{t("discover_desc")}</p>

      <Carousel
        className="mx-auto max-w-276 px-2"
        opts={{
          align: "start",
        }}
      >
        <div className="flex flex-col space-y-3">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem className="" key={index}>
                <Card className="size-83 overflow-hidden border-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 shadow-none">
                  <CardContent className="flex size-full flex-col bg-black/40 p-0 backdrop-blur-[2px]">
                    <CardHeader className="flex items-center justify-end gap-2 p-3">
                      <Button variant={"icon"} className="size-10">
                        <CameraPlus className="size-5" />
                      </Button>
                      <Button variant={"icon"} className="size-10">
                        <Share className="size-5" />
                      </Button>
                    </CardHeader>
                    <CardAvatar
                      src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      name="Steve Jobs"
                      role={t("discover_steve_jobs_role")}
                    />
                    <Separator className="mt-3 h-1 to-white/30" />

                    <SimpleRadarChart className="pointer-events-none text-white" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className="my-8 px-2">
          <CarouselIndicator />
        </div>
        <div className="flex-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <div className="flex-center mt-8 lg:mt-16">
          <Button variant={"outline"} className="w-full max-w-61.75">
            <ArrowForward />
            {t("discover_sample_result")}
          </Button>
        </div>
      </Carousel>
    </section>
  );
}
