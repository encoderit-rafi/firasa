import React from "react";
import { ScorePageCard } from "./score-page-card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CircularProgress from "@/components/charts/CircularProgress";

export default function SimilarityToFamous() {
  return (
    <ScorePageCard className="overflow-hidden">
      <Carousel
        className="mx-auto max-w-276 pr-8"
        opts={{
          align: "start",
        }}
      >
        <div className="flex flex-col space-y-3">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem className="" key={index}>
                <Card className="size-83 overflow-hidden border-none bg-[url('https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat p-0 shadow-none">
                  <CardContent className="flex size-full flex-col items-center justify-between bg-linear-to-t from-black/80 to-transparent p-0">
                    <CardHeader className="title-medium-emphasized from-error w-full bg-linear-to-r to-transparent px-3 py-1 text-center text-white">
                      Keanu Reeves
                    </CardHeader>
                    <div className="pb-3">
                      <CircularProgress
                        label="high"
                        progress={52}
                        className="text-white"
                      />
                    </div>
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
      </Carousel>
    </ScorePageCard>
  );
}
