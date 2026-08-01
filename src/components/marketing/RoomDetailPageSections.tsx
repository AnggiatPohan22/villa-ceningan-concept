import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { getWhatsappUrl, property } from "@/data/property";
import { rooms, type RoomItem } from "@/data/rooms";

type RoomDetailPageSectionsProps = {
  room: RoomItem | null;
  relatedRooms?: RoomItem[];
};

export function RoomDetailPageSections({ room, relatedRooms = rooms.filter((item) => item.slug !== room?.slug).slice(0, 2) }: RoomDetailPageSectionsProps) {
  if (!room) {
    notFound();
  }

  return (
    <main className="room3-page">
      <section className="room3-hero" aria-labelledby="room3-hero-title">
        <Image
          src={room.heroImage}
          alt={`${room.name} signature room atmosphere at ${property.name}`}
          fill
          priority
          sizes="100vw"
          className="room3-hero__image"
        />
        <div className="room3-hero__overlay" />
        <div className="room3-hero__content">
          <p className="eyebrow">Signature Collection</p>
          <h1 id="room3-hero-title">{room.name}</h1>
          <dl>
            <div>
              <dt>Size</dt>
              <dd>{room.size}</dd>
            </div>
            <div>
              <dt>View</dt>
              <dd>{room.view}</dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>{room.capacity}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="room3-overview" aria-label={`${room.name} overview`}>
        <div className="room3-overview__main">
          <div className="room3-gallery">
            {room.gallery.map((item, index) => (
              <div className={index === 0 ? "room3-gallery__large" : undefined} key={item.image}>
                <Image src={item.image} alt={item.alt} fill sizes={index === 0 ? "(min-width: 900px) 52vw, 100vw" : "(min-width: 900px) 22vw, 50vw"} />
              </div>
            ))}
          </div>

          <article className="room3-story" aria-labelledby="room3-story-title">
            <h2 id="room3-story-title">The Sanctuary Reimagined</h2>
            <p>{room.longDescription}</p>
            <p>
              Every detail is prepared with calm island hospitality, from the bedding
              configuration to the small rituals that help your stay feel personal,
              private, and quietly polished.
            </p>
          </article>

          <section className="room3-amenities" aria-labelledby="room3-amenities-title">
            <h2 id="room3-amenities-title">Exclusive Amenities</h2>
            <div>
              {room.amenities.map((amenity) => (
                <article key={amenity}>
                  <span aria-hidden="true">+</span>
                  <div>
                    <h3>{amenity}</h3>
                    <p>Prepared as part of the {room.name} stay experience.</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="room3-standard" aria-labelledby="room3-standard-title">
            <h2 id="room3-standard-title">The Villa Ceningan Standard</h2>
            <p>
              Our promise is simple: a clean room, warm service, and a relaxed island
              rhythm supported by direct concierge care before and during your stay.
            </p>
            <ul>
              {room.standards.map((standard) => (
                <li key={standard}>{standard}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="room3-booking" aria-label={`Reserve ${room.name}`}>
          <p>Starting from</p>
          <strong>{room.startingRate}</strong>
          <span>/ per night</span>
          <form action="/reservation">
            <input type="hidden" name="room" value={room.slug} />
            <label>
              <span>Check-in</span>
              <input type="date" name="checkIn" />
            </label>
            <label>
              <span>Check-out</span>
              <input type="date" name="checkOut" />
            </label>
            <label>
              <span>Guests</span>
              <select name="guests" defaultValue="2">
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </label>
            <Button className="room3-booking__submit" type="submit">
              Reserve the Suite
            </Button>
          </form>
          <p className="room3-booking__note">{room.rateNote}</p>
          <div className="room3-booking__direct">
            <h2>Concierge Direct</h2>
            <a href={`tel:${property.phone}`}>{property.phone}</a>
            <a href={`mailto:${property.email}`}>{property.email}</a>
            <a href={getWhatsappUrl(`Hello Villa Ceningan, I would like to ask about ${room.name}.`)} target="_blank" rel="noreferrer">
              WhatsApp inquiry
            </a>
          </div>
        </aside>
      </section>

      <section className="room3-enhance" aria-labelledby="room3-enhance-title">
        <div className="room3-enhance__header">
          <div>
            <p className="eyebrow">Tailored For You</p>
            <h2 id="room3-enhance-title">Enhance Your Stay</h2>
          </div>
          <Link href="/services">View all services</Link>
        </div>
        <div className="room3-enhance__grid">
          {room.experiences.map((experience) => (
            <article key={experience.title}>
              <div>
                <Image src={experience.image} alt={`${experience.title} for ${room.name}`} fill sizes="(min-width: 900px) 30vw, 100vw" />
              </div>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="room3-related" aria-labelledby="room3-related-title">
        <p className="eyebrow">More Sanctuaries</p>
        <h2 id="room3-related-title">Explore another room</h2>
        <div>
          {relatedRooms.map((item) => (
            <Link href={`/rooms/${item.slug}`} key={item.slug}>
              <span>{item.category}</span>
              <strong>{item.name}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
