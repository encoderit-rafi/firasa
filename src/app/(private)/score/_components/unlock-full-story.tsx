import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
const items = [
  {
    title: "🧠 Deep Trait Insights",
  },
  {
    title: "📖 Scientific Reasoning",
  },
  {
    title: "🎵 Your personality unique Story",
  },
  {
    title: "📈 Growth Plans",
  },
  {
    title: "❤️ Compatibility Profile",
  },
  {
    title: "🌟 Famous Personalities Relate ",
  },
];
export default function UnlockFullStory() {
  return (
    <div className="mx-auto w-full max-w-205 rounded-2xl bg-[url('/bg-yellow-gradient.png')] bg-cover bg-center">
      <div className="flex flex-col items-center justify-center space-y-8 p-8">
        <Image src="/lock.png" alt="lock icon" width={197} height={226} />
        <div className="">
          <h3 className="font-inter text-3xl font-bold">Unlock Full Story</h3>
          <p className="font-inter text-sm font-normal">
            Your Premium Report includes:
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <p className="font-inter text-sm font-normal">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center space-y-8 bg-linear-to-t from-white from-40% to-transparent p-8">
        <div className="">
          <h6 className="font-inter w-full text-left text-base font-bold">
            Ready to Discover Everything?
          </h6>
          <p className="font-inter w-full text-left text-sm font-normal">
            Upgrade to Premium for your complete, in-depth personality analysis
            and personalized growth roadmap.
          </p>
        </div>
        <Button className="font-inter w-full max-w-102.25 rounded-lg py-8 text-xl font-bold">
          Upgrade to Pro
        </Button>
        <Button
          variant="ghost"
          className="font-inter text-base font-bold underline"
        >
          View Pro report sample
        </Button>
      </div>
    </div>
  );
}
