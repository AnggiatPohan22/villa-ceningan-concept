import Link from "next/link";
import { getWhatsappUrl, property } from "@/data/property";

const navItems = [
  { href: "/villa", label: "Villa" },
  { href: "/#facilities", label: "Facilities" },
  { href: "/booking", label: "Booking" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${property.name} home`}>
        <span className="brand-mark">{property.shortName}</span>
        <span>{property.name}</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <details className="mobile-menu">
        <summary>Menu</summary>
        <div className="mobile-menu__panel">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={getWhatsappUrl()} target="_blank" rel="noreferrer">
            Check Availability
          </a>
        </div>
      </details>
      <a className="button button-ghost" href={getWhatsappUrl()} target="_blank" rel="noreferrer">
        Check Availability
      </a>
    </header>
  );
}
