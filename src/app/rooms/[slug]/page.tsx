import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingInquiryPanel } from "@/components/booking/BookingInquiryPanel";
import { rooms } from "@/data/rooms";
import { property } from "@/data/property";

type RoomPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);

  if (!room) {
    return {};
  }

  return {
    title: room.name,
    description: room.description
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="room-detail">
        <div className="room-detail__media">
          <Image src={room.image} alt={room.name} width={1200} height={780} priority />
          <span>{room.category}</span>
        </div>
        <div className="room-detail__content">
          <p className="eyebrow">{property.name}</p>
          <h1>{room.name}</h1>
          <p>{room.longDescription}</p>
          <dl className="room-facts">
            <div>
              <dt>Capacity</dt>
              <dd>{room.capacity}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{room.size}</dd>
            </div>
            <div>
              <dt>Bed</dt>
              <dd>{room.bed}</dd>
            </div>
            <div>
              <dt>Rate</dt>
              <dd>{room.startingRate}</dd>
            </div>
          </dl>
          <p className="rate-note">{room.rateNote}</p>
          <div className="room-detail__split">
            <div>
              <h2>Included</h2>
              <ul className="clean-list">
                {room.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Best For</h2>
              <p>{room.bestFor}</p>
            </div>
          </div>
          <div className="facility-list">
            {room.amenities.map((amenity) => (
              <span key={amenity}>{amenity}</span>
            ))}
          </div>
        </div>
      </section>
      <BookingInquiryPanel />
    </main>
  );
}
