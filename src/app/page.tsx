import { AboutSection } from "@/components/marketing/AboutSection";
import { FacilitiesSection } from "@/components/marketing/FacilitiesSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { GallerySection } from "@/components/marketing/GallerySection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { RoomsSection } from "@/components/marketing/RoomsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <FacilitiesSection />
      <GallerySection />
      <FaqSection />
    </>
  );
}
