import Logo from "@/assets/Logo";
import { ReactNode } from "react";
import {
  ArrowOutward,
  CameraPlus,
  Language,
  Model,
  Share,
  Video,
  VideoCam,
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import CardFeature, {
  PropsCardFeature,
} from "@/components/cards/feature/CardFeature";
import { Guard } from "@/assets/icons/Guard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Separator from "@/components/ui/Separator";
import SimpleRadarChart from "@/components/charts/SimpleRadarChart";
// import { InfiniteSlider } from "../../components/motion-primitives/infinite-slider";
type NavItemType = {
  label: ReactNode;
  href: string;
};
const nav_items: NavItemType[] = [
  {
    label: (
      <span className="flex-center">
        Descover
        <ArrowOutward />
      </span>
    ),
    href: "/descover",
  },
  { label: "How it works", href: "/how-it-works" },
  { label: "Solution", href: "/solution" },
  { label: "Pricing", href: "/pricing" },
];
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
export default function Home() {
  return (
    <div className="">
      <div className="border-b border-secondary-10/10">
        <header className="container-lg px-3 md:px-6 xl:px-12 py-3 flex-between">
          <div className="flex-center gap-12">
            <div className="flex-center gap-3">
              <Logo />
              <span className="headline-medium-emphasized">Firase</span>
            </div>
            <nav>
              <ul className="flex-center gap-12">
                {nav_items.map((item) => (
                  <li
                    key={item.href}
                    className="body-large-primary text-neutral-10"
                  >
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex-center gap-2">
            <Button variant={"ghost"}>Sign in</Button>
            <Select defaultValue="english" value="english">
              <SelectTrigger className="w-full max-w-48">
                <Language className="text-black mr-2" />
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button>
              <VideoCam />
              Upload or record video
            </Button>
          </div>
        </header>
      </div>
      <section className="container-sm mx-auto pt-16 space-y-6">
        <h1 className="text-center display-large-emphasized">
          Scan your face.
          <br /> Reveal your personality.
        </h1>
        <p className="body-large-primary text-center">
          Upload or record a 5-second video and let AI analyze your personality
          in seconds.
        </p>
        <div className="flex-center gap-6">
          <Button>
            <VideoCam />
            Upload or record video
          </Button>
          <Button variant={"outline"}>
            <VideoCam />
            Upload or record video
          </Button>
        </div>
      </section>
      <section className="bg-[url('/union.svg')] bg-center bg-no-repeat">
        <div className="container-sm mx-auto flex-center">
          <div className="relative w-fit ">
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
              className={"absolute -right-20 top-1/2"}
            />

            <Image
              src="/hero-image.png"
              alt="Hero image"
              width={514}
              height={514}
              className="mx-auto relative z-10"
            />
          </div>
        </div>
      </section>
      <section className="container-sm mx-auto py-24  space-y-6">
        <p className="body-large-primary text-border text-center">Trusted by</p>
        <div className="flex-between gap-6">
          <img
            src="/blink.png"
            alt="Blink logo"
            className="h-10 w-auto grayscale"
          />
          <img src="/ai.png" alt="AI logo" className="h-10 w-auto grayscale" />
          <img
            src="/forbes.png"
            alt="Forbes logo"
            className="h-10 w-auto grayscale"
          />
          <img
            src="/seedtable.png"
            alt="Seedtable logo"
            className="h-10 w-auto grayscale"
          />
          <img
            src="/spa.png"
            alt="SPA logo"
            className="h-10 w-auto grayscale"
          />
        </div>
      </section>
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
                        {/* 
                        <div className="w-full">
                          <SimpleRadarChart />
                        </div> */}
                        <SimpleRadarChart />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
