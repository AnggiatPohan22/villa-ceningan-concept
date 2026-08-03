import type { Metadata } from "next";
import { LegalPageSections } from "@/components/marketing/LegalPageSections";
import { property } from "@/data/property";
import { getCmsLegalPage } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsLegalPage("privacy");

  return buildCmsMetadata({
    title: page?.title ?? "Privacy Policy",
    description: page?.summary ?? `Learn how ${property.name} handles inquiry details, contact information, and guest communication preferences.`,
    seo: page?.seo
  });
}

export default function PrivacyPage() {
  return <LegalPageSections slug="privacy" />;
}
