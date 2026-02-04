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
import Image from "next/image";

export default function Discover() {
  return (
    <section className="section bg-error-container/16">
      <h6 className="section-label">Discover</h6>
      <h2 className="section-title"> What if we scanned the famous?</h2>
      <p className="section-description">
        Here are some example of shared AI face personality score.
      </p>

      <Carousel
        className="max-w-276 mx-auto px-2"
        opts={{
          align: "start",
        }}
      >
        <div className="flex flex-col space-y-3">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem className="" key={index}>
                <Card className="border-none size-83 shadow-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 overflow-hidden">
                  <CardContent className="size-full backdrop-blur-[2px] bg-black/40 p-0 flex flex-col">
                    <CardHeader className="flex items-center gap-2 justify-end p-3">
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
                      role="Visionary pathfinder"
                    />
                    <Separator className="h-1 to-white/30 mt-3" />

                    <SimpleRadarChart />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className="px-2 my-8">
          <CarouselIndicator />
        </div>
        <div className="flex-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <div className="flex-center mt-8 lg:mt-16">
          <Button variant={"outline"} className="max-w-61.75 w-full">
            <ArrowForward />
            Discover sample result
          </Button>
        </div>
      </Carousel>
    </section>
  );
}
