import type { Metadata } from "next";
import { LegalPageSections } from "@/components/marketing/LegalPageSections";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Learn how ${property.name} handles inquiry details, contact information, and guest communication preferences.`
};

export default function PrivacyPage() {
  return <LegalPageSections slug="privacy" />;
}
