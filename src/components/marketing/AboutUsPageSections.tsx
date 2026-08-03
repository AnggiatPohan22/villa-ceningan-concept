import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { aboutPrinciples, aboutTeam } from "@/data/about";
import { getWhatsappUrl, property } from "@/data/property";
import type { CmsAboutPageContent } from "@/lib/cms/content";

type AboutPageProps = {
  page?: CmsAboutPageContent;
};

export function AboutHeroSection({ page }: AboutPageProps = {}) {
  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <Image
        src={page?.hero.image ?? "/assets/img/hero-bg-2.webp"}
        alt={page?.hero.imageAlt ?? `${property.name} surrounded by quiet island greenery`}
        fill
        priority
        sizes="100vw"
        className="about-hero__image"
      />
      <div className="about-hero__overlay" />
      <div className="about-hero__content">
        <p className="eyebrow">{page?.hero.eyebrow ?? "Est. island mornings"}</p>
        <h1 id="about-hero-title">{page?.hero.heading ?? "The Philosophy of Stillness"}</h1>
        <p>{page?.hero.description}</p>
      </div>
      <a className="about-hero__cue" href="#about-story" aria-label="Scroll to our story">
        <span />
      </a>
    </section>
  );
}

export function AboutStorySection({ page }: AboutPageProps = {}) {
  const paragraphs = page?.story.paragraphs?.length ? page.story.paragraphs : [];

  return (
    <section className="about-story" id="about-story" aria-labelledby="about-story-title">
      <div className="about-story__copy">
        <p className="eyebrow">{page?.story.eyebrow ?? property.location}</p>
        <h2 id="about-story-title">{page?.story.heading ?? "Our Story"}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="about-story__media">
        <Image
          src={page?.story.image ?? property.aboutImage}
          alt={page?.story.imageAlt ?? `${property.name} interior story and villa atmosphere`}
          width={760}
          height={940}
        />
      </div>
    </section>
  );
}

export function AboutPrinciplesSection({ page }: AboutPageProps = {}) {
  const values = page?.values?.length ? page.values : aboutPrinciples;

  return (
    <section className="about-principles" aria-labelledby="about-principles-title">
      <div className="section-heading section-heading--center">
        <p className="eyebrow">Sustainable Luxury</p>
        <h2 id="about-principles-title">Luxury is a responsibility.</h2>
        <p>Our commitment is woven into details guests can feel: calm spaces, local care, and less excess.</p>
      </div>
      <div className="about-principles__grid">
        {values.map((principle, index) => (
          <article
            className={"image" in principle && principle.image ? "about-principle about-principle--image" : "about-principle"}
            key={principle.title}
          >
            {"image" in principle && typeof principle.image === "string" ? (
              <Image src={principle.image} alt={`${principle.title} at ${property.name}`} fill sizes="(max-width: 900px) 100vw, 50vw" />
            ) : null}
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AboutTeamSection() {
  return (
    <section className="about-team" aria-labelledby="about-team-title">
      <div className="about-team__intro">
        <h2 id="about-team-title">The Stewards of Villa Ceningan</h2>
        <p>
          "We do not design hospitality around noise. We design it around attention,
          timing, and small comforts that make guests feel expected."
        </p>
      </div>
      <div className="about-team__grid">
        {aboutTeam.map((member) => (
          <article className="about-team-card" key={member.name}>
            <Image src={member.image} alt={`${member.name}, ${member.role}`} width={520} height={650} />
            <h3>{member.name}</h3>
            <p className="eyebrow">{member.role}</p>
            <p>{member.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AboutCtaSection({ page }: AboutPageProps = {}) {
  return (
    <section className="about-cta" aria-labelledby="about-cta-title">
      <Image
        src={page?.finalCTA.image ?? "/assets/img/hero-coastal-villa.webp"}
        alt={page?.finalCTA.imageAlt ?? `${property.name} peaceful retreat atmosphere`}
        fill
        sizes="100vw"
        className="about-cta__image"
      />
      <div className="about-cta__overlay" />
      <div className="about-cta__content">
        <h2 id="about-cta-title">{page?.finalCTA.heading ?? "Reconnect with your island rhythm."}</h2>
        <Button href={page?.finalCTA.url ?? getWhatsappUrl()} rel="noreferrer" target="_blank" variant="ghost">
          {page?.finalCTA.label ?? "Discover Availability"}
        </Button>
      </div>
    </section>
  );
}
