import { CameraPlus, Share } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/blocks/hero";
import FeaturedIn from "@/components/blocks/featured-in";
import Discover from "@/components/blocks/discover";
import HowItWorks from "@/components/blocks/ how-it-works";
export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <FeaturedIn />
      <Discover />
      <HowItWorks />
    </div>
  );
}
