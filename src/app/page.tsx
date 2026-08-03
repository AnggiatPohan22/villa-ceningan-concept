import type { Metadata } from "next";
import { HomeAboutSection } from "@/components/marketing/HomeAboutSection";
import { HomeBookingSection } from "@/components/marketing/HomeBookingSection";
import { HomeContactPreviewSection } from "@/components/marketing/HomeContactPreviewSection";
import { HomeHeroSection } from "@/components/marketing/HomeHeroSection";
import { HomeJournalPreviewSection } from "@/components/marketing/HomeJournalPreviewSection";
import { HomeRoomsShowcaseSection } from "@/components/marketing/HomeRoomsShowcaseSection";
import { HomeSignatureExperiencesSection } from "@/components/marketing/HomeSignatureExperiencesSection";
import { HomeTestimonialSection } from "@/components/marketing/HomeTestimonialSection";
import { getCmsBlogArticles, getCmsHomePage, getCmsRooms, getCmsServices } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";
import { property } from "@/data/property";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsHomePage();

  return buildCmsMetadata({
    title: property.name,
    description: property.tagline,
    image: page.hero.image,
    imageAlt: page.hero.imageAlt,
    seo: page.seo
  });
}

export default async function Home() {
  const [cmsHome, cmsRooms, cmsServices, cmsBlog] = await Promise.all([
    getCmsHomePage(),
    getCmsRooms(),
    getCmsServices(),
    getCmsBlogArticles()
  ]);

  return (
    <>
      <HomeHeroSection content={cmsHome.hero} />
      <HomeBookingSection />
      <HomeAboutSection content={cmsHome.introduction} />
      <HomeSignatureExperiencesSection services={cmsServices} content={cmsHome.signatureExperiences} />
      <HomeRoomsShowcaseSection items={cmsRooms} content={cmsHome.featuredRooms} />
      <HomeTestimonialSection />
      <HomeJournalPreviewSection articles={cmsBlog.blogArticles} content={cmsHome.journalPreview} />
      <HomeContactPreviewSection />
    </>
  );
}
