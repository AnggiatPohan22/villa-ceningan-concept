"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/shared/Button";
import { rooms, type RoomItem } from "@/data/rooms";
import { getWhatsappUrl } from "@/data/property";

const filters = [
  { label: "All Rooms", value: "all" },
  { label: "Couple", value: "couple" },
  { label: "Garden", value: "garden" },
  { label: "Family", value: "family" }
];

type RoomsSectionProps = {
  items?: RoomItem[];
};

export function RoomsSection({ items = rooms }: RoomsSectionProps = {}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredRooms = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((room) => room.category.toLowerCase().includes(activeFilter)),
    [activeFilter, items]
  );

  return (
    <section className="rooms-collection" id="stays" aria-labelledby="rooms-collection-title">
      <div className="rooms-filterbar">
        <div className="rooms-filterbar__tabs" aria-label="Room categories">
          {filters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter.value}
              className={activeFilter === filter.value ? "is-active" : ""}
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p>Sort by: direct villa inquiry</p>
      </div>

      <div className="rooms-collection__inner">
        <div className="section-heading">
          <p className="eyebrow">Rooms and Suites</p>
          <h2 id="rooms-collection-title">Choose your island sanctuary.</h2>
        </div>
        <div className="rooms-grid">
          {filteredRooms.map((room) => (
            <article className="room-card" key={room.slug}>
              <Link className="room-card__media" href={`/rooms/${room.slug}`}>
                <Image src={room.image} alt={room.name} width={720} height={900} />
                <span>{room.category}</span>
              </Link>
              <div className="room-card__body">
                <div className="room-card__title">
                  <h3>
                    <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
                  </h3>
                  <div>
                    <strong>{room.startingRate}</strong>
                    <small>per night</small>
                  </div>
                </div>
                <p>{room.description}</p>
                <ul>
                  <li>{room.capacity}</li>
                  <li>{room.bed}</li>
                  <li>{room.size}</li>
                </ul>
                <div className="room-card__actions">
                  <Button href={`/rooms/${room.slug}`} variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button
                    href={getWhatsappUrl(`Hello Villa Ceningan, I would like to check availability for ${room.name}.`)}
                    rel="noreferrer"
                    target="_blank"
                    size="sm"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
