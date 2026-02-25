import { One, Three, Two } from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Separator from "@/components/ui/separator";
import { SVGProps } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import TryNow from "../ui/try-now";
const steps: {
  icon: React.FC<SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
}[] = [
  {
    icon: One,
    title: "Record or upload a 5-second video",
    content:
      "Just look at the camera. Small movements matter. Photos don’t capture personality. Motion does.",
  },
  {
    icon: Two,
    title: "AI analyzes facial dynamics",
    content:
      "AI analyzes your facial movements to identify patterns and insights. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    icon: Three,
    title: "Get your big 5 score",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
];
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container-md flex flex-col items-start gap-10 px-4 lg:flex-row">
        <div className="w-full flex-1 shrink-0 lg:w-1/2">
          <h6 className="section-label text-left">How it works</h6>
          <h2 className="section-title text-left">3 steps, ultra simple.</h2>
          <Separator />
          <Accordion
            type="single"
            collapsible
            defaultValue={steps[0].title}
            className="border-tertiary-container mt-4 w-full border-b"
          >
            {steps.map((step) => (
              <AccordionItem key={step.title} value={step.title}>
                <AccordionTrigger>
                  <div className="headline-small-emphasized flex-center gap-2 py-2">
                    <step.icon />
                    {step.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-10 text-left">{step.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <TryNow className="mt-8" />
        </div>
        <div className="flex-center w-full flex-1 shrink-0 lg:w-1/2">
          <Image src="/selfie.png" alt="selfie" width={544} height={596} />
        </div>
      </div>
    </section>
  );
}
