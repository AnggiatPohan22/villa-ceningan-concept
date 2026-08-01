import type { Metadata } from "next";
import { RoomsSection } from "@/components/marketing/RoomsSection";
import { property } from "@/data/property";
import { getCmsRooms } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Villa and Rooms",
  description: `Explore villa and room types at ${property.name}.`
};

export default async function VillaPage() {
  const cmsRooms = await getCmsRooms();

  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">{property.propertyType}</p>
        <h1>Villa rooms with three flexible stay types.</h1>
        <p>
          Halaman ini bisa dipakai sebagai landing page villa atau kamar,
          lengkap dengan harga awal, kapasitas, dan detail stay untuk calon tamu.
        </p>
      </section>
      <RoomsSection items={cmsRooms} />
    </main>
  );
}
