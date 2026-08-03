import { property } from "@/data/property";
import type { HomeContactPreviewContent } from "@/lib/cms/content";

type HomeContactPreviewSectionProps = {
  content?: HomeContactPreviewContent;
};

export function HomeContactPreviewSection({ content }: HomeContactPreviewSectionProps = {}) {
  return (
    <section className="home2-contact" aria-labelledby="home-contact-title">
      <div className="home2-contact__map">
        <iframe
          src={content?.mapEmbedURL ?? property.mapEmbedUrl}
          title={`${property.name} location map`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="home2-contact__content">
        <p className="eyebrow">{content?.eyebrow ?? "Information"}</p>
        <h2 id="home-contact-title">{content?.heading ?? "Contact us"}</h2>
        {content?.description ? <p>{content.description}</p> : null}
        <div>
          <h3>
            {content?.locationHeading ?? "Bali, Indonesia"}
          </h3>
          <p>{content?.address ?? property.address}</p>
        </div>
        <div>
          <small>{content?.emailLabel ?? "Email:"}</small>
          <a href={`mailto:${content?.email ?? property.email}`}>{content?.email ?? property.email}</a>
        </div>
        <div className="home2-contact__phone">
          <small>{content?.phoneLabel ?? "Call directly:"}</small>
          <a href={`tel:${content?.phone ?? property.phone}`}>{content?.phone ?? property.phone}</a>
        </div>
      </div>
    </section>
  );
}
