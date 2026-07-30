import type { Metadata } from "next";
import { LegalPageSections } from "@/components/marketing/LegalPageSections";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Read the guest terms, reservation inquiry notes, and website conditions for ${property.name}.`
};

export default function TermsPage() {
  return <LegalPageSections slug="terms" />;
}
