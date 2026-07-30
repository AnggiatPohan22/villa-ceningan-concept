import type { Metadata } from "next";
import { LegalPageSections } from "@/components/marketing/LegalPageSections";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: `Understand how cookies and browser preferences should be handled on the ${property.name} website.`
};

export default function CookiesPage() {
  return <LegalPageSections slug="cookies" />;
}
