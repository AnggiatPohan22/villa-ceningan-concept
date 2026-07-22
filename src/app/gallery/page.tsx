import type { Metadata } from "next";
import { GallerySection } from "@/components/marketing/GallerySection";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Browse visual references for ${property.name}.`
};

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Gallery</p>
        <h1>Luxury visual story for villa, rooms, and island atmosphere.</h1>
        <p>
          Halaman gallery menjadi bukti visual utama untuk calon tamu. Nantinya
          bisa dipisah menjadi room, pool, dining, destination, dan guest experience.
        </p>
      </section>
      <GallerySection />
    </main>
  );
}
