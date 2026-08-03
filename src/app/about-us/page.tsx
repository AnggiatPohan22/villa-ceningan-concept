import type { Metadata } from "next";
import {
  AboutCtaSection,
  AboutHeroSection,
  AboutPrinciplesSection,
  AboutStorySection,
  AboutTeamSection
} from "@/components/marketing/AboutUsPageSections";
import { property } from "@/data/property";
import { getCmsAboutPage } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsAboutPage();

  return buildCmsMetadata({
    title: "About Us",
    description: `Learn the story, philosophy, and hospitality approach behind ${property.name}.`,
    image: page.hero.image,
    imageAlt: page.hero.imageAlt,
    seo: page.seo
  });
}

export default async function AboutUsPage() {
  const page = await getCmsAboutPage();

  return (
    <main className="about-page">
      <AboutHeroSection page={page} />
      <AboutStorySection page={page} />
      <AboutPrinciplesSection page={page} />
      <AboutTeamSection />
      <AboutCtaSection page={page} />
    </main>
  );
}
