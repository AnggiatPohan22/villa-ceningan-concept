import type { Metadata } from "next";
import { ReservationPageSections } from "@/components/marketing/ReservationPageSections";
import { property } from "@/data/property";
import { getCmsReservation, getCmsRooms } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Reservation",
  description: `Start a reservation inquiry for ${property.name}.`
};

export default async function ReservationPage() {
  const [cmsRooms, cmsReservation] = await Promise.all([getCmsRooms(), getCmsReservation()]);

  return (
    <ReservationPageSections
      items={cmsRooms}
      roomDetails={cmsReservation.reservationRoomDetails}
      overview={cmsReservation.reservationOverview}
    />
  );
}
