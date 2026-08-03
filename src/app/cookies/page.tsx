import type { Metadata } from "next";
import { LegalPageSections } from "@/components/marketing/LegalPageSections";
import { property } from "@/data/property";
import { getCmsLegalPage } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsLegalPage("cookies");

  return buildCmsMetadata({
    title: page?.title ?? "Cookies Policy",
    description: page?.summary ?? `Understand how cookies and browser preferences should be handled on the ${property.name} website.`,
    seo: page?.seo
  });
}

export default function CookiesPage() {
  return <LegalPageSections slug="cookies" />;
}
