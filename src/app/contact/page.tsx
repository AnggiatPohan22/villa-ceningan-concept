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
      label: page.contactInquiry.locationLabel,
      title: page.address,
      href: null,
      text: page.contactInquiry.locationText
    },
    {
      label: page.contactInquiry.whatsAppLabel,
      title: page.phone,
      href: `https://wa.me/${page.whatsApp.replace(/[^\d]/g, "")}?text=${encodeURIComponent("Hello Villa Ceningan, I would like to contact the concierge.")}`,
      text: page.contactInquiry.whatsAppText
    },
    {
      label: page.contactInquiry.emailLabel,
      title: page.email,
      href: `mailto:${page.email}`,
      text: page.contactInquiry.emailText
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
          <h2 id="contact-inquiry-title">{page.contactInquiry.heading}</h2>
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

          <aside className="contact-concierge" aria-label={page.contactInquiry.conciergeAriaLabel}>
            <h3>{page.contactInquiry.conciergeHeading}</h3>
            <p>{page.contactInquiry.description}</p>
            <Link href={page.contactInquiry.button.url}>{page.contactInquiry.button.label}</Link>
          </aside>
        </div>

        <ContactInquiryForm content={page.contactForm} whatsAppNumber={page.whatsApp} />
      </section>

      <section className="contact-map-section" aria-labelledby="contact-map-title">
        <div className="contact-map-section__heading">
          <h2 id="contact-map-title">{page.mapSection.heading}</h2>
          <p>{page.mapSection.description}</p>
        </div>
        <div className="contact-map-card">
          <iframe
            title={page.mapSection.mapTitle}
            src={page.mapEmbedURL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="contact-map-card__pin" aria-hidden="true">
            <span />
          </div>
          <aside>
            <h3>{page.mapSection.locationHeading}</h3>
            <p>{page.address}</p>
            <Button href={page.mapSection.button.url} rel="noreferrer" target="_blank" variant="outline" size="sm">
              {page.mapSection.button.label}
            </Button>
          </aside>
        </div>
      </section>

      <section className="contact-quote" aria-label={page.quote.ariaLabel}>
        <p>&quot;{page.quote.text}&quot;</p>
      </section>
    </main>
  );
}
