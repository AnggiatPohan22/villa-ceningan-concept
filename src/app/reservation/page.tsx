import type { Metadata } from "next";
import { ReservationPageSections } from "@/components/marketing/ReservationPageSections";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Reservation",
  description: `Start a reservation inquiry for ${property.name}.`
};

export default function ReservationPage() {
  return <ReservationPageSections />;
}
