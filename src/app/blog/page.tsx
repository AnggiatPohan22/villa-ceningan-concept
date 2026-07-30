import type { Metadata } from "next";
import { BlogHeroSection, BlogJournalSection, BlogToolbar, BlogValuesBand } from "@/components/marketing/BlogPageSections";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Blog",
  description: `Read travel notes, villa rituals, and island stories from ${property.name}.`
};

export default function BlogPage() {
  return (
    <main className="blog-page">
      <BlogHeroSection />
      <BlogToolbar />
      <BlogJournalSection />
      <BlogValuesBand />
    </main>
  );
}
