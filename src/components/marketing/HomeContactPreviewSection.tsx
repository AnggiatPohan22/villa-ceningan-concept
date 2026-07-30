import { property } from "@/data/property";

export function HomeContactPreviewSection() {
  return (
    <section className="home2-contact" aria-labelledby="home-contact-title">
      <div className="home2-contact__map">
        <iframe
          src={property.mapEmbedUrl}
          title={`${property.name} location map`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="home2-contact__content">
        <p className="eyebrow">Information</p>
        <h2 id="home-contact-title">Contact us</h2>
        <div>
          <h3>
            Bali, <span>Indonesia</span>
          </h3>
          <p>{property.address}</p>
        </div>
        <div>
          <small>Email:</small>
          <a href={`mailto:${property.email}`}>{property.email}</a>
        </div>
        <div className="home2-contact__phone">
          <small>Call directly:</small>
          <a href={`tel:${property.phone}`}>{property.phone}</a>
        </div>
      </div>
    </section>
  );
}
