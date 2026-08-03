import Image from "next/image";
import Link from "next/link";
import { AvailabilityBar } from "@/components/shared/AvailabilityBar";
import { Button } from "@/components/shared/Button";
import { property } from "@/data/property";
import { rooms, type RoomItem } from "@/data/rooms";
import type { CmsListingPageContent } from "@/lib/cms/content";

type RoomsPageSectionsProps = {
  items?: RoomItem[];
  page?: CmsListingPageContent;
};

export function RoomsHeroSection({ page }: Pick<RoomsPageSectionsProps, "page"> = {}) {
  return (
    <section className="rooms3-hero" aria-labelledby="rooms3-hero-title">
      <Image
        src={page?.hero.image ?? "/assets/img/hero-coastal-villa.webp"}
        alt={page?.hero.imageAlt ?? `${property.name} coastal villa pool at sunset`}
        fill
        priority
        sizes="100vw"
        className="rooms3-hero__image"
      />
      <div className="rooms3-hero__overlay" />
      <div className="rooms3-hero__content">
        <h1 id="rooms3-hero-title">{page?.hero.heading ?? "Our Rooms"}</h1>
        <p>{page?.hero.description ?? "Discover a collection of curated island sanctuaries designed for deep rest and quiet elegance."}</p>
      </div>
    </section>
  );
}

export function RoomsCollectionSection({ items = rooms, page }: RoomsPageSectionsProps = {}) {
  return (
    <section className="rooms3-collection" aria-labelledby="rooms3-collection-title">
      <div className="rooms3-collection__intro">
        <p className="eyebrow">{page?.intro.eyebrow ?? "Signature Collection"}</p>
        <h2 id="rooms3-collection-title">{page?.listing.heading ?? "Stay where island calm meets personal villa comfort."}</h2>
        {page?.listing.description ? <p>{page.listing.description}</p> : null}
      </div>
      <div className="rooms3-list">
        {items.map((room, index) => (
          <article className="rooms3-card" key={room.slug}>
            <div className="rooms3-card__copy">
              <span className="rooms3-card__number">{String(index + 1).padStart(2, "0")}</span>
              <div className="rooms3-card__rating" aria-label={`${room.name} ${room.reviews}`}>
                <span aria-hidden="true">{page?.listing.ratingSymbol ?? "* * * * *"}</span>
                <small>{room.reviews}</small>
              </div>
              <h2>{room.name}</h2>
              <div className="rooms3-card__rate">
                <span>{page?.listing.startFromLabel ?? "Start from"}</span>
                <strong>{room.startingRate}</strong>
                <small>{page?.listing.nightSuffixLabel ?? "/ night"}</small>
              </div>
              <p>{room.description}</p>
              <dl>
                <div>
                  <dt>{page?.listing.statusLabel ?? "Status"}</dt>
                  <dd className={room.status.toLowerCase().includes("left") ? "is-urgent" : undefined}>
                    {room.status}
                  </dd>
                </div>
                <div>
                  <dt>{page?.listing.depositLabel ?? "Deposit"}</dt>
                  <dd>{room.deposit}</dd>
                </div>
                <div>
                  <dt>{page?.listing.bedsLabel ?? "Beds"}</dt>
                  <dd>{room.bed}</dd>
                </div>
                <div>
                  <dt>{page?.listing.passengerLabel ?? "Passenger"}</dt>
                  <dd>{room.passenger}</dd>
                </div>
              </dl>
              <Link className="rooms3-detail-link" href={`/rooms/${room.slug}`}>
                {page?.listing.detailButtonLabel ?? "View Detail"} <span aria-hidden="true">{"->"}</span>
              </Link>
            </div>
            <Link className="rooms3-card__media" href={`/rooms/${room.slug}`} aria-label={`View ${room.name}`}>
              <Image
                src={room.image}
                alt={`${room.name} at ${property.name}`}
                fill
                sizes="(min-width: 900px) 46vw, 100vw"
              />
            </Link>
          </article>
        ))}
      </div>
      <div className="rooms3-collection__cta">
        <Button href={page?.listing.cta?.url ?? "/reservation"}>{page?.listing.cta?.label ?? "See More Rooms"}</Button>
      </div>
    </section>
  );
}

export function RoomsPageSections({ items = rooms, page }: RoomsPageSectionsProps = {}) {
  return (
    <>
      <RoomsHeroSection page={page} />
      <div className="rooms3-availability-shell">
        <AvailabilityBar
          className="rooms3-availability"
          ariaLabel={page?.availabilityBar?.formAriaLabel ?? page?.availabilityBar?.sectionAriaLabel}
          checkInLabel={page?.availabilityBar?.checkInLabel}
          checkOutLabel={page?.availabilityBar?.checkOutLabel}
          guestsLabel={page?.availabilityBar?.guestsLabel}
          promoLabel={page?.availabilityBar?.promotionLinkLabel}
          promoHref={page?.availabilityBar?.promotionLinkURL}
          submitLabel={page?.availabilityBar?.submitButtonLabel}
          action={page?.availabilityBar?.submitButtonURL}
        />
      </div>
      <RoomsCollectionSection items={items} page={page} />
    </>
  );
}
