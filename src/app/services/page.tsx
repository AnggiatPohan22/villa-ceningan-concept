import type { Metadata } from "next";
import {
  ServicesCtaSection,
  ServicesHeroSection,
  SignatureServicesSection,
  TailoredMomentsSection
} from "@/components/marketing/ServicesPageSections";
import { property } from "@/data/property";
import { getCmsServices } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Services",
  description: `Discover tailored island services, concierge support, transfers, and villa comforts at ${property.name}.`
};

export default async function ServicesPage() {
  const cmsServices = await getCmsServices();

  return (
    <main className="services-page">
      <ServicesHeroSection />
      <SignatureServicesSection items={cmsServices} />
      <TailoredMomentsSection items={cmsServices} />
      <ServicesCtaSection />
    </main>
  );
}
