import type { Metadata } from "next";
import { ReservationPageSections } from "@/components/marketing/ReservationPageSections";
import { property } from "@/data/property";
import { getCmsReservation, getCmsRooms } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsReservation();

  return buildCmsMetadata({
    title: "Reservation",
    description: `Start a reservation inquiry for ${property.name}.`,
    image: page.hero.image,
    imageAlt: page.hero.imageAlt,
    seo: page.seo
  });
}

export default async function ReservationPage() {
  const [cmsRooms, cmsReservation] = await Promise.all([getCmsRooms(), getCmsReservation()]);

  return (
    <ReservationPageSections
      items={cmsRooms}
      hero={cmsReservation.hero}
      roomDetails={cmsReservation.reservationRoomDetails}
      overview={cmsReservation.reservationOverview}
    />
  );
}
