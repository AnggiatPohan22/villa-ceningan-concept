import Image from "next/image";
import { BookingInquiryPanel } from "@/components/booking/BookingInquiryPanel";
import { getWhatsappUrl, property } from "@/data/property";

export function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="hero-shell">
        <div className="hero-topline">
          <p className="eyebrow">Coastal villa home</p>
          <p>
            A cozy stay shaped by sea breeze, warm evenings, and a softer kind of
            luxury on Nusa Ceningan.
          </p>
          <a className="hero-discover" href="#about">
            Discover more
          </a>
        </div>

        <div className="hero-content">
          <span>{property.location}</span>
          <h1>
            Ocean Villas
            <br />
            for slow living.
          </h1>
        </div>

        <div className="hero-media">
          <Image
            src={property.heroImage}
            alt={`${property.name} ocean-side villa`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 92vw"
            className="hero-image"
          />
          <div className="hero-media__shade" />
          <div className="hero-scroll-cue" aria-hidden="true">
            <span>Scroll</span>
            <i />
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href={getWhatsappUrl()} target="_blank" rel="noreferrer">
              Book via WhatsApp
            </a>
            <a className="button button-soft" href="/villa">
              View Villa
            </a>
          </div>
          <BookingInquiryPanel variant="hero" />
        </div>
      </div>
    </section>
  );
}
