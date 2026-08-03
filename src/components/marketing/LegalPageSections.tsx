import Link from "next/link";
import { notFound } from "next/navigation";
import type { LegalPageContent } from "@/data/legal";
import { property } from "@/data/property";
import { getCmsLegalPage } from "@/lib/cms/content";

type LegalPageSectionsProps = {
  slug: LegalPageContent["slug"];
};

export async function LegalPageSections({ slug }: LegalPageSectionsProps) {
  const page = await getCmsLegalPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="legal-page">
      <section className="legal-hero" aria-labelledby="legal-title">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 id="legal-title">{page.title}</h1>
        <p>{page.summary}</p>
        <span>Last updated: {page.updatedAt}</span>
      </section>

      <section className="legal-content" aria-label={`${page.title} content`}>
        <aside className="legal-content__aside">
          <strong>{property.name}</strong>
          <p>{property.address}</p>
          <a href={`mailto:${property.email}`}>{property.email}</a>
          <Link href="/contact">Contact concierge</Link>
        </aside>
        <div className="legal-content__body">
          {page.sections.map((section, index) => (
            <article key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
