"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { property } from "@/data/property";
import { primaryNavigation } from "@/data/navigation";
import type { CmsHeaderContent } from "@/lib/cms/content";

const languageOptions = ["ENG", "ID"] as const;
const currencyOptions = ["IDR", "USD"] as const;

type MobileMenuProps = {
  header?: CmsHeaderContent;
};

export function MobileMenu({ header }: MobileMenuProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<(typeof languageOptions)[number]>("ENG");
  const [currency, setCurrency] = useState<(typeof currencyOptions)[number]>("IDR");
  const pathname = usePathname();
  const menuId = useId();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", isVisible);

    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isVisible]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isVisible]);

  useEffect(
    () => () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
      }
    },
    []
  );

  function openMenu() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }

    setIsVisible(true);
    setIsOpen(true);
  }

  function closeMenu() {
    if (!isVisible) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    closeTimer.current = window.setTimeout(() => {
      setIsVisible(false);
      closeTimer.current = null;
    }, 280);
  }

  function isActive(href: string) {
    const [hrefPath] = href.split("#");
    const path = hrefPath || "/";

    return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
  }

  const navigationItems = header?.navigationItems ?? primaryNavigation;
  const cta = header?.primaryCTA ?? {
    label: "Book Now",
    url: `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(property.bookingMessage)}`,
    openInNewTab: true
  };

  return (
    <div className={isOpen ? "mobile-menu is-open" : isVisible ? "mobile-menu is-closing" : "mobile-menu"}>
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="mobile-menu__toggle"
        onClick={isOpen ? closeMenu : openMenu}
        type="button"
      >
        <span className="mobile-menu__label">Menu</span>
        <span className="mobile-menu__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <div className="mobile-menu__panel" hidden={!isVisible} id={menuId}>
        <div className="mobile-menu__brand" aria-label={header?.brand.name ?? property.name}>
          {header?.brand.name ?? property.name}
          <small>{header?.brand.propertyType ?? property.propertyType}</small>
        </div>
        <div className="mobile-menu__switchers" aria-label="Site preferences">
          <fieldset>
            <legend>Language</legend>
            <div className="mobile-menu__options">
              {languageOptions.map((option) => (
                <button
                  aria-pressed={language === option}
                  className={language === option ? "is-selected" : undefined}
                  key={option}
                  onClick={() => setLanguage(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Currency</legend>
            <div className="mobile-menu__options">
              {currencyOptions.map((option) => (
                <button
                  aria-pressed={currency === option}
                  className={currency === option ? "is-selected" : undefined}
                  key={option}
                  onClick={() => setCurrency(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <p className="mobile-menu__intro">Welcome to your private island retreat.</p>
        <nav aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <Link
              aria-current={isActive(item.href) ? "page" : undefined}
              className={isActive(item.href) ? "is-active" : undefined}
              key={item.href}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="mobile-menu__booking"
          href={cta.url}
          target={cta.openInNewTab ? "_blank" : undefined}
          rel={cta.openInNewTab ? "noreferrer" : undefined}
          onClick={closeMenu}
        >
          {cta.label}
        </a>
      </div>
    </div>
  );
}
