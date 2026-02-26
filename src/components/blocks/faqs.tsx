"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDownIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Faqs() {
  const { t } = useTranslation();

  const steps: {
    title: string;
    content: string;
  }[] = [
    {
      title: t("faq1_title"),
      content: t("faq1_content"),
    },
    {
      title: t("faq2_title"),
      content: t("faq2_content"),
    },
    {
      title: t("faq3_title"),
      content: t("faq3_content"),
    },
    {
      title: t("faq4_title"),
      content: t("faq4_content"),
    },
    {
      title: t("faq5_title"),
      content: t("faq5_content"),
    },
    {
      title: t("faq6_title"),
      content: t("faq6_content"),
    },
  ];

  return (
    <section className="section px-4">
      <h2 className="section-title">{t("faqs_title")}</h2>
      <div className="container-sm mx-auto mt-8">
        <Accordion
          type="single"
          collapsible
          defaultValue={steps[0].title}
          className="border-t-tertiary-container border-t"
        >
          {steps.map((step) => (
            <AccordionItem key={step.title} value={step.title}>
              <AccordionTrigger className="group py-6 data-[state=open]:pb-2">
                <div className="body-large-emphasized flex w-full items-center justify-between gap-4 px-2">
                  {step.title}
                  <ChevronDownIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <p className="text-left">{step.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
