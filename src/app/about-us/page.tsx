import type { Metadata } from "next";
import {
  AboutCtaSection,
  AboutHeroSection,
  AboutPrinciplesSection,
  AboutStorySection,
  AboutTeamSection
} from "@/components/marketing/AboutUsPageSections";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn the story, philosophy, and hospitality approach behind ${property.name}.`
};

export default function AboutUsPage() {
  return (
    <main className="about-page">
      <AboutHeroSection />
      <AboutStorySection />
      <AboutPrinciplesSection />
      <AboutTeamSection />
      <AboutCtaSection />
    </main>
  );
}
