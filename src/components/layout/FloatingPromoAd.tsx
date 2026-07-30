"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PROMO_OPEN_DELAY_MS = 1800;
const PROMO_CLOSE_DURATION_MS = 360;

const promos = [
  {
    title: "Tridatu Package",
    description:
      "Escape into tranquil island elegance with a luxury stay package crafted for more rest, ease, and value.",
    image: "/assets/img/Gallery/gallery-2.webp",
    href: "/reservation"
  },
  {
    title: "Island Breakfast",
    description:
      "Begin your morning with tropical fruit, fresh coffee, and a private villa breakfast prepared around your rhythm.",
    image: "/assets/img/Gallery/gallery-1.webp",
    href: "/services/island-breakfast"
  },
  {
    title: "Garden Stay Offer",
    description:
      "Settle into garden calm with a flexible room preference inquiry and direct concierge support before arrival.",
    image: "/assets/img/rooms/garden-villa.webp",
    href: "/rooms/garden-villa"
  }
];

export function FloatingPromoAd() {
  const pathname = usePathname();
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const promo = promos[activeIndex];

  useEffect(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
    }

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    setActiveIndex(0);
    setIsVisible(false);
    setIsDismissed(false);
    setIsClosing(false);

    openTimerRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, PROMO_OPEN_DELAY_MS);

    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }

      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [pathname]);

  function closePromo() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    setIsClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      setIsDismissed(true);
      setIsClosing(false);
    }, PROMO_CLOSE_DURATION_MS);
  }

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <aside className={isClosing ? "floating-promo is-closing" : "floating-promo"} aria-label="Hotel promotion">
      <button
        className="floating-promo__close"
        type="button"
        aria-label="Close promotion"
        onClick={closePromo}
      >
        <span aria-hidden="true" />
      </button>
      <div className="floating-promo__media">
        <Image src={promo.image} alt={`${promo.title} promotion`} fill sizes="112px" />
      </div>
      <div className="floating-promo__content">
        <h2>{promo.title}</h2>
        <p>{promo.description}</p>
        <Link className="ui-button ui-button--primary ui-button--sm floating-promo__cta" href={promo.href}>
          Book Now
        </Link>
      </div>
      <div className="floating-promo__dots" aria-label="Promotion slides">
        {promos.map((item, index) => (
          <button
            aria-label={`Show ${item.title}`}
            aria-pressed={activeIndex === index}
            className={activeIndex === index ? "is-active" : undefined}
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </aside>
  );
}
