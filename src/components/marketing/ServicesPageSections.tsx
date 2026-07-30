import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { getWhatsappUrl, property } from "@/data/property";
import { services } from "@/data/services";

export function ServicesHeroSection() {
  return (
    <section className="services3-hero" aria-labelledby="services-hero-title">
      <Image
        src="/assets/img/services-3.webp"
        alt={`${property.name} sanctuary service landscape`}
        fill
        priority
        sizes="100vw"
        className="services3-hero__image"
      />
      <div className="services3-hero__overlay" />
      <div className="services3-hero__content">
        <h1 id="services-hero-title">Bespoke Sanctuary Services</h1>
        <p>Experience the art of quiet luxury where every detail is curated for your island rhythm.</p>
      </div>
      <a className="services3-cue" href="#services3-intro" aria-label="Scroll to services">
        <span />
      </a>
    </section>
  );
}

export function SignatureServicesSection() {
  return (
    <>
      <section className="services3-intro" id="services3-intro" aria-labelledby="services3-intro-title">
        <p className="eyebrow">The Villa Ceningan Way</p>
        <h2 id="services3-intro-title">
          "In the stillness of the island, a stay becomes more than a room. Our services are designed to restore ease, rhythm, and quiet pleasure."
        </h2>
      </section>

      <section className="services3-list" aria-label="Signature services">
        {services.filter((service) => service.slug !== "seamless-transit").map((service, index) => (
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

export function TailoredMomentsSection() {
  const transit = services.find((service) => service.slug === "seamless-transit") ?? services[0];

  return (
    <section className="services3-transit" aria-labelledby="services3-transit-title">
      <div className="services3-transit__content">
        <p className="eyebrow">{transit.eyebrow}</p>
        <h2 id="services3-transit-title">{transit.title}</h2>
        <p>{transit.summary}</p>
        <div className="services3-transit__meta">
          <span>Island route</span>
          <span>Concierge timing</span>
        </div>
      </div>
      <Link className="services3-transit__media" href={`/services/${transit.slug}`}>
        <Image src={transit.image} alt={`${transit.title} preview`} fill sizes="(min-width: 900px) 42vw, 100vw" />
      </Link>
    </section>
  );
}

export function ServicesCtaSection() {
  return (
    <section className="services3-cta" aria-labelledby="services3-cta-title">
      <h2 id="services3-cta-title">Enhance Your Stay</h2>
      <p>Ready to curate your bespoke island experience? Our concierge can shape the details around your dates and travel rhythm.</p>
      <div className="services3-cta__actions">
        <Button href="/reservation" variant="secondary">
          Start Reservation
        </Button>
        <Button href={getWhatsappUrl()} target="_blank" rel="noreferrer" variant="ghost">
          Contact Concierge
        </Button>
      </div>
    </section>
  );
}
