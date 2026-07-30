import Image from "next/image";
import Link from "next/link";
import { blogArticles } from "@/data/blog";

export function HomeJournalPreviewSection() {
  return (
    <section className="home2-journal" aria-labelledby="home-journal-title">
      <div className="home2-section-heading">
        <p className="eyebrow">Explore</p>
        <h2 id="home-journal-title">Latest from our blog</h2>
        <Link className="ui-button ui-button--outline ui-button--md" href="/blog">
          View All Journal
        </Link>
      </div>
      <div className="home2-journal__grid">
        {blogArticles.slice(0, 3).map((article) => (
          <article className="home2-journal-card" key={article.slug}>
            <Link href="/blog" className="home2-journal-card__media">
              <Image src={article.image} alt={article.excerpt} fill sizes="(min-width: 900px) 30vw, 100vw" />
            </Link>
            <time>{article.date}</time>
            <h3>
              <Link href="/blog">{article.title}</Link>
            </h3>
            <Link className="home2-text-link" href="/blog">
              Continue
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
