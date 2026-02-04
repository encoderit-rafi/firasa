import { One, Three, Two } from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Section, SectionLabel, SectionTitle } from "../ui/section";
import Separator from "@/components/ui/separator";
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
    <section className="section">
      <div className="px-4 w-fit mx-auto">
        <div className="container-md flex flex-col lg:flex-row items-start gap-10">
          <div className="w-full lg:w-1/2">
            <span className="section-label">How it works</span>
            <h2 className="text-left mt-8 mb-16">3 steps, ultra simple.</h2>
            <Separator />
            <Accordion
              type="single"
              collapsible
              defaultValue={steps[0].title}
              className="mt-4 w-full"
            >
              {steps.map((step) => (
                <AccordionItem key={step.title} value={step.title}>
                  <AccordionTrigger className="">
                    <step.icon />
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-10 text-left">{step.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="item-1">
                <AccordionTrigger></AccordionTrigger>
                <AccordionContent>
                  <p>
                    Yes, it is free to use. You can use it as much as you want.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* <Button variant="error">Try now</Button> */}
            <Button variant={"error"} size={"error"}>
              Try now
            </Button>
          </div>
          <div className="">
            <Image src="/selfie.png" alt="selfie" width={544} height={596} />
          </div>
        </div>
      </div>
    </section>
  );
}
