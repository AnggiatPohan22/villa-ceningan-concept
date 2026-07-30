import type { Metadata } from "next";
import {
  ServicesCtaSection,
  ServicesHeroSection,
  SignatureServicesSection,
  TailoredMomentsSection
} from "@/components/marketing/ServicesPageSections";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Services",
  description: `Discover tailored island services, concierge support, transfers, and villa comforts at ${property.name}.`
};

export default function ServicesPage() {
  return (
    <main className="services-page">
      <ServicesHeroSection />
      <SignatureServicesSection />
      <TailoredMomentsSection />
      <ServicesCtaSection />
    </main>
  );
}
