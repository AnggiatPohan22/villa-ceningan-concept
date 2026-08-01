import type { Metadata } from "next";
import { RoomsPageSections } from "@/components/marketing/RoomsPageSections";
import { property } from "@/data/property";
import { getCmsRooms } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Rooms and Suites",
  description: `Explore the refined room collection available at ${property.name}.`
};

export default async function RoomsPage() {
  const cmsRooms = await getCmsRooms();

  return <RoomsPageSections items={cmsRooms} />;
}
