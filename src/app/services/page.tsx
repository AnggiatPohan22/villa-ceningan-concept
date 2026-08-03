import type { Metadata } from "next";
import {
  ServicesCtaSection,
  ServicesHeroSection,
  SignatureServicesSection,
  TailoredMomentsSection
} from "@/components/marketing/ServicesPageSections";
import { property } from "@/data/property";
import { getCmsServices, getCmsServicesPage } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsServicesPage();

  return buildCmsMetadata({
    title: "Services",
    description: `Discover tailored island services, concierge support, transfers, and villa comforts at ${property.name}.`,
    image: page.hero.image,
    imageAlt: page.hero.imageAlt,
    seo: page.seo
  });
}

export default async function ServicesPage() {
  const [cmsServices, cmsPage] = await Promise.all([getCmsServices(), getCmsServicesPage()]);

  return (
    <main className="services-page">
      <ServicesHeroSection page={cmsPage} />
      <SignatureServicesSection items={cmsServices} page={cmsPage} />
      <TailoredMomentsSection items={cmsServices} />
      <ServicesCtaSection page={cmsPage} />
    </main>
  );
}
