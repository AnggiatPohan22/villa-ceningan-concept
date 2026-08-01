import type { Metadata } from "next";
import { BlogHeroSection, BlogJournalSection, BlogToolbar, BlogValuesBand } from "@/components/marketing/BlogPageSections";
import { property } from "@/data/property";
import { getCmsBlogArticles } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Blog",
  description: `Read travel notes, villa rituals, and island stories from ${property.name}.`
};

export default async function BlogPage() {
  const cmsBlog = await getCmsBlogArticles();

  return (
    <main className="blog-page">
      <BlogHeroSection featured={cmsBlog.featuredArticle} />
      <BlogToolbar />
      <BlogJournalSection articles={cmsBlog.blogArticles} curated={cmsBlog.curatorChoices} />
      <BlogValuesBand />
    </main>
  );
}
