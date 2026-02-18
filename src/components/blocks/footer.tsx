import { Facebook, Instagram, Linkedin, X, Youtube } from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { ChevronDown } from "lucide-react";

const footers = [
  {
    title: "Product",
    links: [
      {
        label: "How it works",
      },
      {
        label: "Discover sample result",
      },
      {
        label: "Science",
      },
      {
        label: "Pricing",
      },
    ],
  },
  {
    title: "Science & Technology",
    links: [
      {
        label: "Big five personality model",
      },
      {
        label: "Facial action coding system (FACS)",
      },
      {
        label: "AI facial motion analysis",
      },
      {
        label: "Research & methodology",
      },
    ],
  },
  {
    title: "Privacy & Safety",
    links: [
      {
        label: "Privacy policy",
      },
      {
        label: "Data processing & deletion",
      },
      {
        label: "Facial data usage",
      },
      {
        label: "Security measures",
      },
      {
        label: "AI ethics",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        label: "Help center",
      },
      {
        label: "Video requirements",
      },
      {
        label: "Troubleshooting uploads",
      },
      {
        label: "Contact support",
      },
      {
        label: "FAQs",
      },
    ],
  },
];

export default function Footer() {
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
            <li>Terms of service</li>
            <li>Consent & Disclaimer</li>
            <li>Cookie policy</li>
            <li>User rights</li>
            <li>Privacy policy</li>
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
