import { ArrowForward, CameraPlus, Share } from "@/assets/icons";
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

export default function Discover() {
  return (
    <section className="section space-y-6 bg-error-container/16">
      <h5 className="section-label">Discover</h5>
      <h2> What if we scanned the famous?</h2>
      <p>Here are some example of shared AI face personality score.</p>

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
        <div className="px-2 my-4">
          <CarouselIndicator />
        </div>
        <div className="flex-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <div className="flex-center">
          <Button variant={"outline"} className="mt-6">
            <ArrowForward />
            Discover sample result
          </Button>
        </div>
      </Carousel>
    </section>
  );
}
