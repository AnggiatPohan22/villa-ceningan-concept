import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/rooms";

export function HomeRoomsShowcaseSection() {
  const featuredRoom = rooms[1] ?? rooms[0];

  return (
    <section className="home2-rooms" aria-labelledby="home-rooms-title">
      <div className="home2-rooms__content">
        <p className="eyebrow">Discover our rooms</p>
        <h2 id="home-rooms-title">Luxury interior</h2>
        <div className="home2-rooms__list">
          {rooms.map((room) => (
            <Link className="home2-room-row" href={`/rooms/${room.slug}`} key={room.slug}>
              <span className="home2-room-row__thumb">
                <Image src={room.image} alt={`${room.name} interior preview`} fill sizes="112px" />
              </span>
              <span>
                <strong>{room.name}</strong>
                <small>
                  Starting from <b>{room.startingRate}</b>
                </small>
              </span>
              <i aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
      <div className="home2-rooms__media">
        <Image
          src={featuredRoom.image}
          alt={`${featuredRoom.name} bedroom with warm luxury interior`}
          fill
          sizes="(min-width: 900px) 46vw, 100vw"
        />
      </div>
    </section>
  );
}
