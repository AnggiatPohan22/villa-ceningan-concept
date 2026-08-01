import { HomeAboutSection } from "@/components/marketing/HomeAboutSection";
import { HomeBookingSection } from "@/components/marketing/HomeBookingSection";
import { HomeContactPreviewSection } from "@/components/marketing/HomeContactPreviewSection";
import { HomeHeroSection } from "@/components/marketing/HomeHeroSection";
import { HomeJournalPreviewSection } from "@/components/marketing/HomeJournalPreviewSection";
import { HomeRoomsShowcaseSection } from "@/components/marketing/HomeRoomsShowcaseSection";
import { HomeSignatureExperiencesSection } from "@/components/marketing/HomeSignatureExperiencesSection";
import { HomeTestimonialSection } from "@/components/marketing/HomeTestimonialSection";
import { getCmsBlogArticles, getCmsHomePage, getCmsRooms, getCmsServices } from "@/lib/cms/content";

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
      <HomeSignatureExperiencesSection services={cmsServices} />
      <HomeRoomsShowcaseSection items={cmsRooms} />
      <HomeTestimonialSection />
      <HomeJournalPreviewSection articles={cmsBlog.blogArticles} />
      <HomeContactPreviewSection />
    </>
  );
}
