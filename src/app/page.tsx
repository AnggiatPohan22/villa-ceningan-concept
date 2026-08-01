import { HomeAboutSection } from "@/components/marketing/HomeAboutSection";
import { HomeBookingSection } from "@/components/marketing/HomeBookingSection";
import { HomeContactPreviewSection } from "@/components/marketing/HomeContactPreviewSection";
import { HomeHeroSection } from "@/components/marketing/HomeHeroSection";
import { HomeJournalPreviewSection } from "@/components/marketing/HomeJournalPreviewSection";
import { HomeRoomsShowcaseSection } from "@/components/marketing/HomeRoomsShowcaseSection";
import { HomeSignatureExperiencesSection } from "@/components/marketing/HomeSignatureExperiencesSection";
import { HomeTestimonialSection } from "@/components/marketing/HomeTestimonialSection";
import { getCmsBlogArticles, getCmsRooms, getCmsServices } from "@/lib/cms/content";

export default async function Home() {
  const [cmsRooms, cmsServices, cmsBlog] = await Promise.all([
    getCmsRooms(),
    getCmsServices(),
    getCmsBlogArticles()
  ]);

  return (
    <>
      <HomeHeroSection />
      <HomeBookingSection />
      <HomeAboutSection />
      <HomeSignatureExperiencesSection services={cmsServices} />
      <HomeRoomsShowcaseSection items={cmsRooms} />
      <HomeTestimonialSection />
      <HomeJournalPreviewSection articles={cmsBlog.blogArticles} />
      <HomeContactPreviewSection />
    </>
  );
}
