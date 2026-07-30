import Link from "next/link";
import { getWhatsappUrl, property } from "@/data/property";
import { primaryNavigation } from "@/data/navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function SiteHeader() {
  const leftNavigation = primaryNavigation.slice(0, 3);
  const rightNavigation = primaryNavigation.slice(3);

  return (
    <>
      <header className="site-header">
        <div className="site-header__topbar">
          <a href={`tel:${property.phone}`}>Contact us directly at {property.phone} (local time)</a>
          <div className="site-header__preferences" aria-label="Site preferences">
            <label>
              <span className="sr-only">Language</span>
              <select defaultValue="ENG" aria-label="Language">
                <option value="ENG">ENG</option>
                <option value="ID">ID</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Currency</span>
              <select defaultValue="IDR" aria-label="Currency">
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
              </select>
            </label>
          </div>
        </div>
        <div className="site-header__inner">
          <MobileMenu />
          <nav className="desktop-nav desktop-nav--left" aria-label="Primary navigation">
            {leftNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="brand" aria-label={property.name}>
            <span>{property.name}</span>
            <small>{property.propertyType}</small>
          </div>
          <nav className="desktop-nav desktop-nav--right" aria-label="Secondary navigation">
            {rightNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <a className="mobile-sticky-booking" href={getWhatsappUrl()} target="_blank" rel="noreferrer">
        Book Now
      </a>
    </>
  );
}
