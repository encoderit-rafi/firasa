import { One, Three, Two } from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Section, SectionLabel, SectionTitle } from "../ui/section";
import Separator from "../ui/separator";
import { SVGProps } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
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
    <Section className="space-y-6 px-3 flex flex-col lg:flex-row items-start gap-10 container-md mx-auto">
      <div className="w-full lg:w-1/2">
        <div className="">
          <SectionLabel>How it works</SectionLabel>
          <SectionTitle className="mt-6">3 steps, ultra simple.</SectionTitle>
        </div>
        <Separator className="mt-16 mb-3" />
        <Accordion type="single" collapsible defaultValue={steps[0].title}>
          {steps.map((step) => (
            <AccordionItem key={step.title} value={step.title}>
              <AccordionTrigger>
                <div className="flex items-center gap-4 headline-small-emphasized ">
                  <step.icon />
                  {step.title}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="body-large-primary text-on-surface pl-10">
                  {step.content}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem value="item-1">
            <AccordionTrigger></AccordionTrigger>
            <AccordionContent>
              <p>Yes, it is free to use. You can use it as much as you want.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button variant="error">Try now</Button>
      </div>
      <div className="">
        <Image src="/selfie.png" alt="selfie" width={544} height={596} />
      </div>
    </Section>
  );
}
