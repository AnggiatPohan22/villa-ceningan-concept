import type { Metadata } from "next";
import { BookingInquiryPanel } from "@/components/booking/BookingInquiryPanel";
import { PoliciesSection } from "@/components/marketing/PoliciesSection";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${property.name} for booking inquiries and property details.`
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Ask about dates, room types, and island arrangements.</h1>
          <p>
            Hubungi tim villa untuk mengecek tanggal, tipe kamar, special request,
            atau kebutuhan transfer sebelum booking dikonfirmasi.
          </p>
          <div className="contact-list">
            <a href={`mailto:${property.email}`}>{property.email}</a>
            <a href={`tel:${property.phone}`}>{property.phone}</a>
            <span>{property.address}</span>
          </div>
        </div>
        <iframe
          title={`${property.name} map`}
          src={property.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
      <BookingInquiryPanel />
      <PoliciesSection />
    </main>
  );
}
