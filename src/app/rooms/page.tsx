import type { Metadata } from "next";
import { RoomsSection } from "@/components/marketing/RoomsSection";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Rooms",
  description: `Explore stay types available at ${property.name}.`
};

export default function RoomsPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">{property.location}</p>
        <h1>Villa and room collection</h1>
        <p>
          Tiga tipe kamar sebagai contoh inventory awal: suite pasangan, garden villa,
          dan family stay. Struktur ini siap dikembangkan menjadi real-time availability.
        </p>
      </section>
      <RoomsSection />
    </main>
  );
}
