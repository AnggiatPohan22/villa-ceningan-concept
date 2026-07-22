import type { Metadata } from "next";
import { BookingInquiryPanel } from "@/components/booking/BookingInquiryPanel";
import { PoliciesSection } from "@/components/marketing/PoliciesSection";
import { rooms } from "@/data/rooms";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Booking Inquiry",
  description: `Start a booking inquiry for ${property.name}.`
};

export default function BookingPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Booking Flow</p>
        <h1>Check your preferred stay before the full booking engine is added.</h1>
        <p>
          Saat ini flow dimulai dari inquiry dan WhatsApp. Nanti halaman ini akan
          berkembang menjadi date search, room selection, guest details, confirmation,
          dan payment.
        </p>
      </section>
      <BookingInquiryPanel />
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Available stay templates</p>
          <h2>Connect these cards to inventory in the next phase.</h2>
        </div>
        <div className="rate-list">
          {rooms.map((room) => (
            <article key={room.slug}>
              <span>{room.category}</span>
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <strong>{room.startingRate}</strong>
            </article>
          ))}
        </div>
      </section>
      <PoliciesSection />
    </main>
  );
}
