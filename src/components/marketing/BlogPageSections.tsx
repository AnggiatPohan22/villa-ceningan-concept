import Image from "next/image";
import Link from "next/link";
import { blogArticles, blogCategories, curatorChoices, featuredArticle, type BlogArticle } from "@/data/blog";
import { getWhatsappUrl } from "@/data/property";

type BlogSectionsProps = {
  articles?: BlogArticle[];
  featured?: BlogArticle;
  curated?: BlogArticle[];
};

export function BlogHeroSection({ featured = featuredArticle }: BlogSectionsProps = {}) {
  return (
    <section className="blog-hero" aria-labelledby="blog-hero-title">
      <Image
        src={featured.image}
        alt="Quiet Villa Ceningan landscape at sunrise"
        fill
        priority
        sizes="100vw"
        className="blog-hero__image"
      />
      <div className="blog-hero__overlay" />
      <div className="blog-hero__content">
        <p className="blog-pill">{featured.category}</p>
        <h1 id="blog-hero-title">{featured.title}</h1>
        <p>{featured.excerpt}</p>
        <Link className="blog-text-link blog-text-link--light" href="#featured-story">
          Read the Article <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </section>
  );
}

export function BlogToolbar() {
  return (
    <section className="blog-toolbar" aria-label="Blog categories and search">
      <nav className="blog-toolbar__categories" aria-label="Article categories">
        {blogCategories.map((category, index) => (
          <Link className={index === 0 ? "is-active" : ""} href="/blog" key={category}>
            {category}
          </Link>
        ))}
      </nav>
      <label className="blog-search">
        <span className="sr-only">Search articles</span>
        <input placeholder="Search articles..." type="search" />
        <span aria-hidden="true">Search</span>
      </label>
    </section>
  );
}

export function BlogJournalSection({ articles = blogArticles, curated = curatorChoices }: BlogSectionsProps = {}) {
  const [leadArticle, ...secondaryArticles] = articles;

  return (
    <section className="blog-journal" id="featured-story" aria-labelledby="blog-journal-title">
      <div className="blog-journal__main">
        <article className="blog-feature-card">
          <Link className="blog-feature-card__media" href="/blog">
            <Image src={leadArticle.image} alt={leadArticle.title} width={920} height={560} />
          </Link>
          <div className="blog-meta">
            <span>{leadArticle.category}</span>
            <span>{leadArticle.date}</span>
          </div>
          <h2 id="blog-journal-title">
            <Link href="/blog">{leadArticle.title}</Link>
          </h2>
          <p>{leadArticle.excerpt}</p>
          <Link className="blog-text-link" href="/blog">
            Read Story
          </Link>
        </article>

        <div className="blog-card-grid">
          {secondaryArticles.map((article) => (
            <article className="blog-card" key={article.slug}>
              <Link className="blog-card__media" href="/blog">
                <Image src={article.image} alt={article.title} width={520} height={520} />
              </Link>
              <span>{article.category}</span>
              <h3>
                <Link href="/blog">{article.title}</Link>
              </h3>
              <p>{article.excerpt}</p>
            </article>
          ))}
        </div>
      </div>

      <aside className="blog-sidebar" aria-label="Editorial sidebar">
        <section className="curator-box" aria-labelledby="curator-title">
          <h2 id="curator-title">The Curator&apos;s Choice</h2>
          <div>
            {curated.map((choice) => (
              <article className="curator-item" key={choice.slug}>
                <Image src={choice.image} alt={choice.title} width={112} height={84} />
                <div>
                  <h3>
                    <Link href="/blog">{choice.title}</Link>
                  </h3>
                  <p>{choice.category}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dispatch-box" aria-labelledby="dispatch-title">
          <span aria-hidden="true">Mail</span>
          <h2 id="dispatch-title">The Villa Dispatch</h2>
          <p>Receive island notes, guest rituals, seasonal offers, and slower stories from Villa Ceningan.</p>
          <form>
            <label>
              <span className="sr-only">Email address</span>
              <input placeholder="Email Address" type="email" />
            </label>
            <button type="submit">Subscribe</button>
          </form>
        </section>

        <Link className="blog-plan-card" href={getWhatsappUrl()} target="_blank" rel="noreferrer">
          <Image src="/assets/img/Gallery/gallery-5.webp" alt="Villa Ceningan poolside travel moment" width={420} height={560} />
          <span>Plan Your Escape</span>
          <strong>Book Now</strong>
        </Link>
      </aside>
    </section>
  );
}

export function BlogValuesBand() {
  return (
    <section className="blog-values" aria-label="Villa Ceningan values">
      <blockquote>
        &ldquo;The world is quiet here, and for a moment, so are you.&rdquo;
      </blockquote>
      <div className="blog-values__grid">
        <article>
          <span>01</span>
          <h2>Heritage</h2>
          <p>Honoring island craft and natural textures with calm restraint.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Harmony</h2>
          <p>Design and nature coexisting in practical, breathable balance.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Hospitality</h2>
          <p>A service rhythm that anticipates needs before they are spoken.</p>
        </article>
      </div>
    </section>
  );
}
