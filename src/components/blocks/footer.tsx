"use client";
import { Facebook, Instagram, Linkedin, X, Youtube } from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const footers = [
    {
      title: t("footer_product"),
      links: [
        { label: t("nav_how_it_works") },
        { label: t("nav_discover") },
        { label: t("solutions_label") },
        { label: t("nav_pricing") },
      ],
    },
    {
      title: t("footer_science_tech"),
      links: [
        { label: t("footer_link_big5") },
        { label: t("footer_link_facs") },
        { label: t("footer_link_ai_analysis") },
        { label: t("footer_link_research") },
      ],
    },
    {
      title: t("footer_privacy_safety"),
      links: [
        { label: t("privacy_policy") },
        { label: t("footer_link_data_processing") },
        { label: t("footer_link_facial_data") },
        { label: t("footer_link_security") },
        { label: t("footer_link_ai_ethics") },
      ],
    },
    {
      title: t("footer_support"),
      links: [
        { label: t("footer_link_help_center") },
        { label: t("footer_link_video_reqs") },
        { label: t("footer_link_troubleshooting") },
        { label: t("footer_link_contact") },
        { label: t("faqs_title") },
      ],
    },
  ];

  return (
    <section className="section bg-on-surface px-4">
      <div className="container-md mx-auto p-0 px-3 pb-7">
        {/* Desktop View */}
        <footer className="border-outline hidden items-start justify-between gap-4 border-b pb-7 lg:flex">
          {footers.map((footer) => (
            <div key={footer.title} className="space-y-8">
              <h6 className="text-left text-white">{footer.title}</h6>
              <ul className="text-custom-neutral-70 body-medium-primary space-y-3">
                {footer.links.map((link) => (
                  <li key={link.label}>{link.label}</li>
                ))}
              </ul>
            </div>
          ))}
        </footer>

        {/* Mobile View */}
        <div className="lg:hidden">
          <Accordion
            type="single"
            collapsible
            defaultValue={footers[0].title}
            className="w-full"
          >
            {footers.map((footer) => (
              <AccordionItem
                key={footer.title}
                value={footer.title}
                className="border-none"
              >
                <AccordionTrigger className="body-large-emphasized py-6 text-white hover:no-underline data-[state=open]:text-white!">
                  <div className="flex w-full items-center justify-between">
                    <span>{footer.title}</span>
                    <ChevronDown className="text-outline size-4 shrink-0 transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="text-custom-neutral-70 body-medium-primary space-y-3 pb-4">
                    {footer.links.map((link) => (
                      <li key={link.label}>{link.label}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="text-custom-neutral-70 body-medium-primary mt-10 flex flex-col justify-between gap-8 py-2 lg:flex-row lg:items-center">
          <ul className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <li>{t("terms_of_service")}</li>
            <li>{t("consent_disclaimer")}</li>
            <li>{t("cookie_policy")}</li>
            <li>{t("user_rights")}</li>
            <li>{t("privacy_policy")}</li>
          </ul>
          <ul className="flex max-w-md items-center justify-between gap-3">
            <li>
              <Youtube className="size-4" />
            </li>
            <li>
              <Linkedin className="size-4" />
            </li>
            <li>
              <X className="size-4" />
            </li>
            <li>
              <Instagram className="size-4" />
            </li>
            <li>
              <Facebook className="size-4" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
