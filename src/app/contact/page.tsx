import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactInquiryForm } from "@/components/marketing/ContactInquiryForm";
import { Button } from "@/components/shared/Button";
import { property } from "@/data/property";
import { getCmsContactPage } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsContactPage();

  return buildCmsMetadata({
    title: "Contact",
    description: `Contact ${property.name} for booking inquiries, concierge support, and island stay details.`,
    image: page.hero.image,
    imageAlt: page.hero.imageAlt,
    seo: page.seo
  });
}

export default async function ContactPage() {
  const page = await getCmsContactPage();
  const contactMethods = [
    {
      label: "Villa Location",
      title: page.address,
      href: null,
      text: "Nusa Ceningan, Klungkung, Bali"
    },
    {
      label: "WhatsApp Concierge",
      title: page.phone,
      href: `https://wa.me/${page.whatsApp.replace(/[^\d]/g, "")}?text=${encodeURIComponent("Hello Villa Ceningan, I would like to contact the concierge.")}`,
      text: "Direct inquiries for dates, arrivals, and stay details."
    },
    {
      label: "Reservations",
      title: page.email,
      href: `mailto:${page.email}`,
      text: "Email us for longer stay requests or detailed arrangements."
    }
  ];

  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <Image
          src={page.hero.image}
          alt={page.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="contact-hero__image"
        />
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content">
          <h1 id="contact-hero-title">{page.hero.heading}</h1>
          <span aria-hidden="true" />
          <p>{page.hero.description}</p>
        </div>
      </section>

      <section className="contact-inquiry" aria-labelledby="contact-inquiry-title">
        <div className="contact-inquiry__details">
          <h2 id="contact-inquiry-title">{page.contactHeading}</h2>
          <div className="contact-methods">
            {contactMethods.map((method) => (
              <article className="contact-method" key={method.label}>
                <span aria-hidden="true" />
                <div>
                  <p className="eyebrow">{method.label}</p>
                  {method.href ? (
                    <a href={method.href} target={method.href.startsWith("https://") ? "_blank" : undefined} rel="noreferrer">
                      {method.title}
                    </a>
                  ) : (
                    <strong>{method.title}</strong>
                  )}
                  <p>{method.text}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="contact-concierge" aria-label="Concierge assistance">
            <h3>Concierge Assistance</h3>
            <p>{page.contactDescription}</p>
            <Link href={page.finalCTA.url}>{page.finalCTA.label}</Link>
          </aside>
        </div>

        <ContactInquiryForm />
      </section>

      <section className="contact-map-section" aria-labelledby="contact-map-title">
        <div className="contact-map-section__heading">
          <h2 id="contact-map-title">A Hidden Gem</h2>
          <p>Set in the rhythm of Nusa Ceningan, close enough to island life and quiet enough to fully slow down.</p>
        </div>
        <div className="contact-map-card">
          <iframe
            title={`${property.name} map`}
            src={page.mapEmbedURL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="contact-map-card__pin" aria-hidden="true">
            <span />
          </div>
          <aside>
            <h3>{property.location}</h3>
            <p>{page.address}</p>
            <Button href={page.finalCTA.url} rel="noreferrer" target="_blank" variant="outline" size="sm">
              {page.finalCTA.label}
            </Button>
          </aside>
        </div>
      </section>

      <section className="contact-quote" aria-label="Villa Ceningan quote">
        <p>"Peace is found in simple arrivals, warm care, and the feeling that every detail is already prepared."</p>
      </section>
    </main>
  );
}
