import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { getWhatsappUrl, property } from "@/data/property";
import { services, type ServiceItem } from "@/data/services";
import type { CmsListingPageContent } from "@/lib/cms/content";

type ServicesSectionsProps = {
  items?: ServiceItem[];
  page?: CmsListingPageContent;
};

export function ServicesHeroSection({ page }: Pick<ServicesSectionsProps, "page"> = {}) {
  return (
    <section className="services3-hero" aria-labelledby="services-hero-title">
      <Image
        src={page?.hero.image ?? "/assets/img/services-3.webp"}
        alt={page?.hero.imageAlt ?? `${property.name} sanctuary service landscape`}
        fill
        priority
        sizes="100vw"
        className="services3-hero__image"
      />
      <div className="services3-hero__overlay" />
      <div className="services3-hero__content">
        <h1 id="services-hero-title">{page?.hero.heading ?? "Bespoke Sanctuary Services"}</h1>
        <p>{page?.hero.description ?? "Experience the art of quiet luxury where every detail is curated for your island rhythm."}</p>
      </div>
      <a className="services3-cue" href="#services3-intro" aria-label={page?.hero.scrollCueLabel ?? "Scroll to services"}>
        <span />
      </a>
    </section>
  );
}

export function SignatureServicesSection({ items = services, page }: ServicesSectionsProps = {}) {
  return (
    <>
      <section className="services3-intro" id="services3-intro" aria-labelledby="services3-intro-title">
        <p className="eyebrow">{page?.intro.eyebrow ?? "The Villa Ceningan Way"}</p>
        <h2 id="services3-intro-title">
          &quot;{page?.intro.heading ?? "In the stillness of the island, a stay becomes more than a room. Our services are designed to restore ease, rhythm, and quiet pleasure."}&quot;
        </h2>
        {page?.intro.description ? <p>{page.intro.description}</p> : null}
      </section>

      <section className="services3-list" aria-label={page?.signatureServices?.ariaLabel ?? "Signature services"}>
        {items.filter((service) => service.slug !== "seamless-transit").map((service, index) => (
          <article className="services3-row" key={service.slug}>
            <Link className="services3-row__media" href={`/services/${service.slug}`}>
              <Image
                src={service.image}
                alt={`${service.title} service at ${property.name}`}
                fill
                sizes="(min-width: 900px) 54vw, 100vw"
              />
            </Link>
            <div className="services3-row__content">
              <p className="eyebrow">{service.eyebrow}</p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Link className={index === 1 ? "ui-button ui-button--primary ui-button--sm" : "services3-text-link"} href={`/services/${service.slug}`}>
                {service.cta}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export function TailoredMomentsSection({ items = services, page }: ServicesSectionsProps = {}) {
  const transit = items.find((service) => service.slug === "seamless-transit") ?? items[0];

  return (
    <section className="services3-transit" aria-labelledby="services3-transit-title">
      <div className="services3-transit__content">
        <p className="eyebrow">{transit.eyebrow}</p>
        <h2 id="services3-transit-title">{transit.title}</h2>
        <p>{transit.summary}</p>
        <div className="services3-transit__meta">
          <span>{page?.tailoredMoment?.metaLabelOne ?? "Island route"}</span>
          <span>{page?.tailoredMoment?.metaLabelTwo ?? "Concierge timing"}</span>
        </div>
      </div>
      <Link className="services3-transit__media" href={`/services/${transit.slug}`}>
        <Image src={transit.image} alt={`${transit.title} preview`} fill sizes="(min-width: 900px) 42vw, 100vw" />
      </Link>
    </section>
  );
}

export function ServicesCtaSection({ page }: Pick<ServicesSectionsProps, "page"> = {}) {
  const finalCTA = page?.finalCTA;

  return (
    <section className="services3-cta" aria-labelledby="services3-cta-title">
      <h2 id="services3-cta-title">{finalCTA?.heading ?? page?.listing.heading ?? "Enhance Your Stay"}</h2>
      <p>{finalCTA?.description ?? page?.listing.description ?? "Ready to curate your bespoke island experience? Our concierge can shape the details around your dates and travel rhythm."}</p>
      <div className="services3-cta__actions">
        <Button href={finalCTA?.primary.url ?? page?.listing.cta?.url ?? "/reservation"} variant="secondary">
          {finalCTA?.primary.label ?? page?.listing.cta?.label ?? "Start Reservation"}
        </Button>
        <Button href={finalCTA?.secondary.url ?? getWhatsappUrl()} target="_blank" rel="noreferrer" variant="ghost">
          {finalCTA?.secondary.label ?? "Contact Concierge"}
        </Button>
      </div>
    </section>
  );
}
