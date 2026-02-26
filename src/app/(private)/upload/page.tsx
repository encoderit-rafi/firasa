"use client";
import {
  Apple,
  Check,
  Close,
  FacebookFilled,
  Google,
  Guard,
} from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import VideoUploader from "@/components/ui/video-uploader";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeOffIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
export default function UploadPage() {
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
    <section className="section space-y-8 px-4 md:space-y-16">
      <h1>{t("upload_title")}</h1>
      <div className="mx-auto flex max-w-136 flex-col gap-4 space-y-8 md:space-y-16">
        <VideoUploader />
        <div className="space-y-8">
          <div className="">
            <h6 className="section-label pb-5 text-left">
              {t("upload_dos_label")}
            </h6>
            <Accordion
              type="single"
              collapsible
              defaultValue={steps[0].title}
              className="container-sm border-y-tertiary-container mx-auto border-y"
            >
              {steps.map((step) => (
                <AccordionItem key={step.title} value={step.title}>
                  <AccordionTrigger className="group py-6 data-[state=open]:pb-2">
                    <div className="flex w-full items-center justify-between gap-4">
                      {/* <step.icon /> */}
                      <div className="body-large-emphasized flex items-center gap-2">
                        <div className="bg-error flex-center size-6 shrink-0 rounded-full">
                          <Check className="text-on-error size-5" />
                        </div>
                        {step.title}
                      </div>
                      <ChevronRightIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-8 text-left">{step.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="">
            <h6 className="section-label border-b-error-container border-b pb-5 text-left">
              {t("upload_donts_label")}
            </h6>
            <Accordion
              type="single"
              collapsible
              defaultValue={steps[0].title}
              className="container-sm border-y-tertiary-container mx-auto border-y"
            >
              {steps.map((step) => (
                <AccordionItem key={step.title} value={step.title}>
                  <AccordionTrigger className="group py-6 data-[state=open]:pb-2">
                    <div className="headline-small-emphasized flex w-full items-center justify-between gap-4">
                      {/* <step.icon /> */}
                      <div className="flex items-center gap-2">
                        <div className="bg-error-container flex-center size-6 shrink-0 rounded-full">
                          <Close className="text-on-error size-5" />
                        </div>
                        {step.title}
                      </div>
                      <ChevronRightIcon className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-8 text-left">{step.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
