import type { Metadata } from "next";
import { LegalPageSections } from "@/components/marketing/LegalPageSections";
import { property } from "@/data/property";
import { getCmsLegalPage } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsLegalPage("terms");

  return buildCmsMetadata({
    title: page?.title ?? "Terms of Service",
    description: page?.summary ?? `Read the guest terms, reservation inquiry notes, and website conditions for ${property.name}.`,
    seo: page?.seo
  });
}

export default function TermsPage() {
  return <LegalPageSections slug="terms" />;
}
