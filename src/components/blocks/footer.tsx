import { Facebook, Instagram, Linkedin, X, Youtube } from "@/assets/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Section } from "../ui/section";
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
    <Section className="bg-on-surface">
      <div className="container-md mx-auto p-0 px-3 pb-7">
        {/* Desktop View */}
        <footer className="hidden md:grid grid-cols-4 gap-4 border-b border-outline pb-7">
          {footers.map((footer) => (
            <div key={footer.title} className="space-y-8">
              <h6 className="text-white body-large-emphasized">
                {footer.title}
              </h6>
              <ul className="space-y-3 text-custom-neutral-70 body-medium-primary">
                {footer.links.map((link) => (
                  <li key={link.label}>{link.label}</li>
                ))}
              </ul>
            </div>
          ))}
        </footer>

        {/* Mobile View */}
        <div className="md:hidden">
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
                <AccordionTrigger className="text-white body-large-emphasized py-6 hover:no-underline data-[state=open]:text-white!">
                  <div className="flex items-center justify-between w-full">
                    <span>{footer.title}</span>
                    <ChevronDown className="size-4 shrink-0 transition-transform duration-200 text-outline" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 text-custom-neutral-70 body-medium-primary pb-4">
                    {footer.links.map((link) => (
                      <li key={link.label}>{link.label}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between text-custom-neutral-70 py-2 body-medium-primary">
          <ul className="flex flex-col lg:flex-row items-center gap-6">
            <li>Terms of service</li>
            <li>Consent & Disclaimer</li>
            <li>Cookie policy</li>
            <li>User rights</li>
            <li>Privacy policy</li>
          </ul>
          <ul className="flex items-center gap-3">
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
    </Section>
  );
}
