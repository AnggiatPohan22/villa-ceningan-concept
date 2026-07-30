import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { getWhatsappUrl, property } from "@/data/property";
import { getServiceBySlug, services } from "@/data/services";

type ServiceDetailPageSectionsProps = {
  slug: string;
};

export function ServiceDetailPageSections({ slug }: ServiceDetailPageSectionsProps) {
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <main className="service-detail-page">
      <section className="service-detail-hero" aria-labelledby="service-detail-title">
        <Image
          src={service.detailImage}
          alt={`${service.title} at ${property.name}`}
          fill
          priority
          sizes="100vw"
          className="service-detail-hero__image"
        />
        <div className="service-detail-hero__overlay" />
        <div className="service-detail-hero__content">
          <p className="eyebrow">{service.eyebrow}</p>
          <h1 id="service-detail-title">{service.title}</h1>
          <span />
        </div>
        <a className="services3-cue" href="#service-philosophy" aria-label={`Read about ${service.title}`}>
          <span />
        </a>
      </section>

      <section className="service-philosophy" id="service-philosophy" aria-labelledby="service-philosophy-title">
        <div className="service-philosophy__copy">
          <h2 id="service-philosophy-title">The Art of Stillness</h2>
          <p>{service.description}</p>
          <p>
            Each detail is arranged with the same quiet intention: natural materials,
            warm service, and a rhythm that lets the island do most of the talking.
          </p>
          <div className="service-philosophy__stats">
            {service.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="service-philosophy__media">
          <Image src={service.image} alt={`${service.title} detail atmosphere`} fill sizes="(min-width: 900px) 46vw, 100vw" />
        </div>
      </section>

      <section className="service-rituals" aria-labelledby="service-rituals-title">
        <div className="service-rituals__header">
          <div>
            <h2 id="service-rituals-title">Signature Rituals</h2>
            <p>A curated selection of island service moments</p>
          </div>
          <Button href={getWhatsappUrl(`Hello Villa Ceningan, I would like to ask about ${service.title}.`)} target="_blank" rel="noreferrer" variant="outline" size="sm">
            Ask Concierge
          </Button>
        </div>
        <div className="service-rituals__grid">
          {service.rituals.map((ritual) => (
            <article className={ritual.featured ? "service-ritual-card is-featured" : "service-ritual-card"} key={ritual.title}>
              <Image src={ritual.image} alt={ritual.description} fill sizes="(min-width: 900px) 42vw, 100vw" />
              <div>
                <h3>{ritual.title}</h3>
                <span>{ritual.category}</span>
                <p>{ritual.description}</p>
                <strong>{ritual.duration}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="service-canvas" aria-labelledby="service-canvas-title">
        <div className="service-canvas__heading">
          <h2 id="service-canvas-title">A Canvas of Peace</h2>
          <p>Moments captured within the service experience at {property.name}.</p>
        </div>
        <div className="service-canvas__rail">
          {service.gallery.map((item) => (
            <article key={item.title}>
              <div>
                <Image src={item.image} alt={`${item.title} for ${service.title}`} fill sizes="(min-width: 900px) 360px, 82vw" />
              </div>
              <p>{item.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-booking" aria-labelledby="service-booking-title">
        <div className="service-booking__panel">
          <div>
            <h2 id="service-booking-title">Begin Your Journey</h2>
            <p>Reserve your sanctuary moment. Our concierge will contact you to curate the right timing and setting.</p>
            <div className="service-booking__meta">
              <span>{service.duration}</span>
              <span>{service.location}</span>
            </div>
          </div>
          <div className="service-booking__actions">
            <Button href="/reservation" variant="secondary" size="lg">
              Start Reservation
            </Button>
            <Button href={getWhatsappUrl(`Hello Villa Ceningan, I would like to request ${service.title}.`)} target="_blank" rel="noreferrer" variant="ghost" size="lg">
              Request Consultation
            </Button>
          </div>
        </div>
      </section>

      <section className="service-related" aria-labelledby="service-related-title">
        <p className="eyebrow">Explore More</p>
        <h2 id="service-related-title">Other signature services</h2>
        <div>
          {relatedServices.map((item) => (
            <Link href={`/services/${item.slug}`} key={item.slug}>
              <span>{item.eyebrow}</span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
