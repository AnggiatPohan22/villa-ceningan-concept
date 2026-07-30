import Image from "next/image";
import Link from "next/link";
import { property } from "@/data/property";
import { gallery } from "@/data/gallery";

const exploreLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/reservation", label: "Reservation" }
];

type FooterIconName = "instagram" | "mail" | "map" | "phone" | "share" | "whatsapp";

function FooterIcon({ name }: { name: FooterIconName }) {
  const paths: Record<FooterIconName, string> = {
    instagram:
      "M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9a4.75 4.75 0 0 1-4.75 4.75h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Zm0 1.8A2.95 2.95 0 0 0 4.55 7.5v9a2.95 2.95 0 0 0 2.95 2.95h9a2.95 2.95 0 0 0 2.95-2.95v-9a2.95 2.95 0 0 0-2.95-2.95h-9Zm4.5 3.2a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Zm0 1.8a2.45 2.45 0 1 0 0 4.9 2.45 2.45 0 0 0 0-4.9Zm4.75-2.15a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z",
    mail:
      "M4.75 5.5h14.5c.97 0 1.75.78 1.75 1.75v9.5c0 .97-.78 1.75-1.75 1.75H4.75A1.75 1.75 0 0 1 3 16.75v-9.5c0-.97.78-1.75 1.75-1.75Zm.45 2 6.8 5.02 6.8-5.02H5.2Zm13.95 8.95V9.7l-6.61 4.88a.9.9 0 0 1-1.08 0L4.85 9.7v6.75c0 .14.11.25.25.25h13.8c.14 0 .25-.11.25-.25Z",
    map:
      "M12 2.75A6.25 6.25 0 0 1 18.25 9c0 4.57-5.5 11.3-5.74 11.58a.66.66 0 0 1-1.02 0C11.25 20.3 5.75 13.57 5.75 9A6.25 6.25 0 0 1 12 2.75Zm0 1.8A4.45 4.45 0 0 0 7.55 9c0 2.93 3.08 7.53 4.45 9.38 1.37-1.85 4.45-6.45 4.45-9.38A4.45 4.45 0 0 0 12 4.55Zm0 2.65a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2Z",
    phone:
      "M7.2 3.25h2.45c.72 0 1.33.51 1.47 1.22l.48 2.4c.11.56-.1 1.13-.54 1.49l-1.1.88a10.6 10.6 0 0 0 4.8 4.8l.88-1.1c.36-.44.93-.65 1.49-.54l2.4.48c.71.14 1.22.75 1.22 1.47v2.45a2.2 2.2 0 0 1-2.39 2.19C10.54 18.3 5.7 13.46 5.01 5.64A2.2 2.2 0 0 1 7.2 3.25Z",
    share:
      "M18 16.25a2.7 2.7 0 0 0-2.05.95L9.35 13.7a2.74 2.74 0 0 0 0-3.4l6.6-3.5A2.75 2.75 0 1 0 15.1 5l-6.6 3.5a2.75 2.75 0 1 0 0 7l6.6 3.5a2.75 2.75 0 1 0 2.9-2.75Z",
    whatsapp:
      "M12.03 3.25a8.52 8.52 0 0 1 7.25 12.98l.95 3.47-3.56-.93A8.52 8.52 0 0 1 3.5 11.98a8.53 8.53 0 0 1 8.53-8.73Zm0 1.76a6.76 6.76 0 0 0-5.72 10.36l.19.3-.56 2.04 2.1-.55.29.17a6.76 6.76 0 1 0 3.7-12.32Zm-2.2 3.42c.15 0 .31 0 .44.01.14.01.33-.05.52.4.2.48.66 1.66.72 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.62 1.03 1.33 1.66.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.42.67 1.66.79.24.12.4.18.46.28.06.1.06.58-.14 1.14-.2.56-1.16 1.07-1.6 1.12-.41.05-.93.07-1.5-.09-.35-.11-.79-.26-1.36-.51-2.39-1.03-3.95-3.43-4.07-3.59-.12-.16-.97-1.29-.97-2.46 0-1.17.61-1.75.83-1.99.22-.24.48-.3.64-.3Z"
  };

  return (
    <svg aria-hidden="true" className="footer__icon-svg" viewBox="0 0 24 24">
      <path d={paths[name]} />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__brand">
          <h2>{property.name}</h2>
          <p>
            Redefining island luxury through the lens of nature and tranquility.
            A sanctuary for the modern soul seeking peace without compromising on elegance.
          </p>
          <div className="footer__socials" aria-label="Social links">
            <a href="/contact" aria-label="Follow Villa Ceningan on Instagram">
              <FooterIcon name="instagram" />
            </a>
            <a href={`https://wa.me/${property.whatsapp}`} aria-label="Chat with Villa Ceningan on WhatsApp">
              <FooterIcon name="whatsapp" />
            </a>
            <a href="/contact" aria-label="Share Villa Ceningan">
              <FooterIcon name="share" />
            </a>
          </div>
        </div>

        <nav className="footer__column footer__explore" aria-label="Explore links">
          <h3>Explore</h3>
          {exploreLinks.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer__column footer__concierge">
          <h3>Concierge</h3>
          <address>
            <a href="/contact">
              <span aria-hidden="true">
                <FooterIcon name="map" />
              </span>
              {property.address}
            </a>
            <a href={`tel:${property.phone}`}>
              <span aria-hidden="true">
                <FooterIcon name="phone" />
              </span>
              {property.phone}
            </a>
            <a href={`mailto:${property.email}`}>
              <span aria-hidden="true">
                <FooterIcon name="mail" />
              </span>
              {property.email}
            </a>
          </address>
        </div>

        <div className="footer__column footer__snapshots">
          <h3>Snapshots</h3>
          <div className="footer__snapshot-grid">
            {gallery.slice(0, 6).map((image, index) => (
              <Image
                alt={`${property.name} snapshot ${index + 1}`}
                height={120}
                key={image}
                src={image}
                width={120}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="footer__meta">
        <div className="footer__meta-inner">
          <span>Copyright &copy; 2026 {property.name}. All rights reserved.</span>
          <nav aria-label="Footer policy links">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
