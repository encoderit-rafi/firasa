import Hero from "@/components/blocks/hero";
import FeaturedIn from "@/components/blocks/featured-in";
import Discover from "@/components/blocks/discover";
import HowItWorks from "@/components/blocks/how-it-works";
import Solutions from "@/components/blocks/solutions";
import Faqs from "@/components/blocks/faqs";
import Pricing from "@/components/blocks/pricing";
import Poster from "@/components/blocks/poster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIRASA - AI Face Personality Score & Analysis",
  description:
    "Discover your unique personality story through AI face scanning. Reveal your Big 5 personality score from a 5-second video analysis.",
  openGraph: {
    title: "FIRASA - AI Face Personality Score",
    description:
      "Scan your face, reveal your personality. Built on real psychology, powered by AI.",
    images: ["/og-image.png"], // Assuming an OG image will be added later
  },
  twitter: {
    card: "summary_large_image",
    title: "FIRASA - AI Face Personality Score",
    description: "Scan your face, reveal your personality.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedIn />
      <Discover />
      <HowItWorks />
      <Solutions />
      <Pricing />
      <Faqs />
      <Poster />
    </>
  );
}
