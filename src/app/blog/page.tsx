import type { Metadata } from "next";
import { BlogHeroSection, BlogJournalSection, BlogToolbar, BlogValuesBand } from "@/components/marketing/BlogPageSections";
import { property } from "@/data/property";
import { getCmsBlogArticles, getCmsBlogPage } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsBlogPage();

  return buildCmsMetadata({
    title: "Blog",
    description: `Read travel notes, villa rituals, and island stories from ${property.name}.`,
    image: page.hero.image,
    imageAlt: page.hero.imageAlt,
    seo: page.seo
  });
}

export default async function BlogPage() {
  const [cmsBlog, cmsPage] = await Promise.all([getCmsBlogArticles(), getCmsBlogPage()]);

  return (
    <main className="blog-page">
      <BlogHeroSection featured={cmsBlog.featuredArticle} page={cmsPage} />
      <BlogToolbar />
      <BlogJournalSection articles={cmsBlog.blogArticles} curated={cmsBlog.curatorChoices} page={cmsPage} />
      <BlogValuesBand />
    </main>
  );
}
