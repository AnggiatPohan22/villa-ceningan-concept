import Image from "next/image";
import Link from "next/link";
import { AvailabilityBar } from "@/components/shared/AvailabilityBar";
import { Button } from "@/components/shared/Button";
import { property } from "@/data/property";
import { rooms, type RoomItem } from "@/data/rooms";

export function RoomsHeroSection() {
  return (
    <section className="rooms3-hero" aria-labelledby="rooms3-hero-title">
      <Image
        src="/assets/img/hero-coastal-villa.webp"
        alt={`${property.name} coastal villa pool at sunset`}
        fill
        priority
        sizes="100vw"
        className="rooms3-hero__image"
      />
      <div className="rooms3-hero__overlay" />
      <div className="rooms3-hero__content">
        <h1 id="rooms3-hero-title">Our Rooms</h1>
        <p>Discover a collection of curated island sanctuaries designed for deep rest and quiet elegance.</p>
      </div>
    </section>
  );
}

type RoomsPageSectionsProps = {
  items?: RoomItem[];
};

export function RoomsCollectionSection({ items = rooms }: RoomsPageSectionsProps = {}) {
  return (
    <section className="rooms3-collection" aria-labelledby="rooms3-collection-title">
      <div className="rooms3-collection__intro">
        <p className="eyebrow">Signature Collection</p>
        <h2 id="rooms3-collection-title">Stay where island calm meets personal villa comfort.</h2>
      </div>
      <div className="rooms3-list">
        {items.map((room, index) => (
          <article className="rooms3-card" key={room.slug}>
            <div className="rooms3-card__copy">
              <span className="rooms3-card__number">{String(index + 1).padStart(2, "0")}</span>
              <div className="rooms3-card__rating" aria-label={`${room.name} ${room.reviews}`}>
                <span aria-hidden="true">* * * * *</span>
                <small>{room.reviews}</small>
              </div>
              <h2>{room.name}</h2>
              <div className="rooms3-card__rate">
                <span>Start from</span>
                <strong>{room.startingRate}</strong>
                <small>/ night</small>
              </div>
              <p>{room.description}</p>
              <dl>
                <div>
                  <dt>Status</dt>
                  <dd className={room.status.toLowerCase().includes("left") ? "is-urgent" : undefined}>
                    {room.status}
                  </dd>
                </div>
                <div>
                  <dt>Deposit</dt>
                  <dd>{room.deposit}</dd>
                </div>
                <div>
                  <dt>Beds</dt>
                  <dd>{room.bed}</dd>
                </div>
                <div>
                  <dt>Passenger</dt>
                  <dd>{room.passenger}</dd>
                </div>
              </dl>
              <Link className="rooms3-detail-link" href={`/rooms/${room.slug}`}>
                View Detail <span aria-hidden="true">{"->"}</span>
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
        <Button href="/reservation">See More Rooms</Button>
      </div>
    </section>
  );
}

export function RoomsPageSections({ items = rooms }: RoomsPageSectionsProps = {}) {
  return (
    <>
      <RoomsHeroSection />
      <div className="rooms3-availability-shell">
        <AvailabilityBar className="rooms3-availability" />
      </div>
      <RoomsCollectionSection items={items} />
    </>
  );
}
