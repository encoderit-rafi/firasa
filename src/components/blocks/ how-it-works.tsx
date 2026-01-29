import { CameraPlus, Share } from "@/assets/icons";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Avatar, AvatarImage } from "../ui/avatar";
import Separator from "../ui/separator";
import SimpleRadarChart from "../charts/SimpleRadarChart";

export default function HowItWorks() {
  return (
    <section className="py-24 space-y-6 bg-error-container/16">
      <div className="text-on-surface text-center">
        <span className="title-small-emphasized text-error mx-auto block">
          How it works
        </span>
        <h2 className="display-small-emphasized mt-8 mb-4">
          What if we scanned the famous?
        </h2>
        <p className="body-large-primary">
          Here are some example of shared AI face personality score.
        </p>
      </div>
      <div className="w-full p-6 flex justify-center">
        <Carousel
          className="w-full container-md"
          opts={{
            align: "start",
          }}
        >
          <div className="flex flex-col space-y-3">
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  className="md:basis-1/2 lg:basis-1/3 "
                  key={index}
                >
                  <Card className="border-none size-82.75 shadow-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 overflow-hidden">
                    <CardContent className="size-full backdrop-blur-[2px] bg-black/40 p-0 flex flex-col">
                      <CardHeader className="flex items-center gap-2 justify-end p-3">
                        <Button variant={"icon"} size={"icon-lg"}>
                          <CameraPlus />
                        </Button>
                        <Button variant={"icon"} size={"icon-lg"}>
                          <Share />
                        </Button>
                      </CardHeader>
                      <div className=" flex flex-col items-center gap-3">
                        <Avatar className="size-15 bg-gradient p-0.5">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="@shadcn"
                            className="size-full rounded-full object-cover object-center"
                          />
                        </Avatar>
                        <div className="flex flex-col items-center">
                          <span className="title-medium-emphasized bg-gradient bg-clip-text text-transparent">
                            Visionary pathfinder
                          </span>
                          <span className="body-small-primary text-white">
                            Steve Jobs
                          </span>
                        </div>
                      </div>
                      <Separator className="h-1 to-white/30 mt-3" />

                      <SimpleRadarChart />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <CarouselIndicator className="my-4" />
          <div className="flex-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
