import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/rooms";

export function RoomsSection() {
  return (
    <section className="section" id="stays">
      <div className="section-heading">
        <p className="eyebrow">Stay Types</p>
        <h2>Room cards ready to become real inventory.</h2>
      </div>
      <div className="card-grid">
        {rooms.map((room) => (
          <article className="stay-card" key={room.slug}>
            <Image src={room.image} alt={room.name} width={640} height={480} />
            <div>
              <span>{room.category}</span>
              <div className="stay-card__title">
                <h3>{room.name}</h3>
                <strong>{room.startingRate}</strong>
              </div>
              <p>{room.description}</p>
              <small>{room.capacity} · {room.size}</small>
              <Link href={`/rooms/${room.slug}`}>View details</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
