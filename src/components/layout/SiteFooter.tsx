import { getWhatsappUrl, property } from "@/data/property";

export function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>{property.name}</h2>
        <p>{property.address}</p>
      </div>
      <div className="footer-actions">
        <a href={`mailto:${property.email}`}>{property.email}</a>
        <a href={`tel:${property.phone}`}>{property.phone}</a>
        <a className="button button-primary" href={getWhatsappUrl()} target="_blank" rel="noreferrer">
          Chat on WhatsApp
        </a>
      </div>
    </footer>
  );
}
