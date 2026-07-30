import { HomeAboutSection } from "@/components/marketing/HomeAboutSection";
import { HomeBookingSection } from "@/components/marketing/HomeBookingSection";
import { HomeContactPreviewSection } from "@/components/marketing/HomeContactPreviewSection";
import { HomeHeroSection } from "@/components/marketing/HomeHeroSection";
import { HomeJournalPreviewSection } from "@/components/marketing/HomeJournalPreviewSection";
import { HomeRoomsShowcaseSection } from "@/components/marketing/HomeRoomsShowcaseSection";
import { HomeSignatureExperiencesSection } from "@/components/marketing/HomeSignatureExperiencesSection";
import { HomeTestimonialSection } from "@/components/marketing/HomeTestimonialSection";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeBookingSection />
      <HomeAboutSection />
      <HomeSignatureExperiencesSection />
      <HomeRoomsShowcaseSection />
      <HomeTestimonialSection />
      <HomeJournalPreviewSection />
      <HomeContactPreviewSection />
    </>
  );
}
