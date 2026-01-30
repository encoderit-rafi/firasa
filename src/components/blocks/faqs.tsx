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
import { ChevronDownIcon } from "lucide-react";
const steps: {
  // icon: React.FC<SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
}[] = [
  {
    // icon: One,
    title: "What does Firasa actually do?",
    content:
      "Just look at the camera. Small movements matter. Photos don’t capture personality. Motion does.",
  },
  {
    // icon: Two,
    title: "How long does the analysis take?",
    content:
      "AI analyzes your facial movements to identify patterns and insights. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "Do I have to smile or pose in a special way?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "What happens to my video after analysis?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "Can I re-analyze myself later?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
  {
    // icon: Three,
    title: "I’m skeptical; can I get a refund?",
    content:
      "Get your big 5 score and insights into your personality traits. We use advanced machine learning algorithms to analyze your facial movements and provide insights into your personality traits.",
  },
];
export default function Faqs() {
  return (
    <Section className=" container-md mx-auto">
      <SectionTitle className="text-center">FAQs</SectionTitle>
      <Accordion
        type="single"
        collapsible
        defaultValue={steps[0].title}
        className="container-sm mx-auto "
      >
        {steps.map((step) => (
          <AccordionItem key={step.title} value={step.title}>
            <AccordionTrigger className="group">
              <div className="flex items-center justify-between w-full gap-4 headline-small-emphasized ">
                {/* <step.icon /> */}
                {step.title}
                <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="body-large-primary text-on-surface ">
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
    </Section>
  );
}
