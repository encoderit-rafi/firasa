"use client";
import { One, Three, Two } from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Separator from "@/components/ui/separator";
import { SVGProps } from "react";
import TryNow from "../ui/try-now";
import SelfieImg from "./SelfieImg";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps: {
    icon: React.FC<SVGProps<SVGSVGElement>>;
    title: string;
    content: string;
  }[] = [
    {
      icon: One,
      title: t("step1_title"),
      content: t("step1_content"),
    },
    {
      icon: Two,
      title: t("step2_title"),
      content: t("step2_content"),
    },
    {
      icon: Three,
      title: t("step3_title"),
      content: t("step3_content"),
    },
  ];

  return (
    <section id="how-it-works" className="section">
      <div className="container-md flex flex-col items-start gap-10 px-4 lg:flex-row">
        <div className="w-full flex-1 shrink-0 lg:w-1/2">
          <h6 className="section-label text-left">{t("how_it_works_label")}</h6>
          <h2 className="section-title text-left">{t("how_it_works_title")}</h2>
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
        <SelfieImg />
      </div>
    </section>
  );
}
