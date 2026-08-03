import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { getCmsHeader } from "@/lib/cms/content";

export async function SiteHeader() {
  const header = await getCmsHeader();
  const leftNavigation = header.navigationItems.slice(0, 3);
  const rightNavigation = header.navigationItems.slice(3);

  return (
    <>
      <header className="site-header">
        <div className="site-header__topbar">
          <a href={`tel:${header.topbar.phone}`}>Contact us directly at {header.topbar.phone} (local time)</a>
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
          <MobileMenu header={header} />
          <nav className="desktop-nav desktop-nav--left" aria-label="Primary navigation">
            {leftNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="brand" aria-label={header.brand.name}>
            {header.brand.logo ? (
              <Image src={header.brand.logo} alt={header.brand.logoAlt} width={180} height={72} />
            ) : (
              <span>{header.brand.name}</span>
            )}
            <small>{header.brand.propertyType}</small>
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
      <a
        className="mobile-sticky-booking"
        href={header.primaryCTA.url}
        target={header.primaryCTA.openInNewTab ? "_blank" : undefined}
        rel={header.primaryCTA.openInNewTab ? "noreferrer" : undefined}
      >
        {header.primaryCTA.label}
      </a>
    </>
  );
}
