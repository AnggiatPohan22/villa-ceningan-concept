import type { Metadata } from "next";
import { RoomsPageSections } from "@/components/marketing/RoomsPageSections";
import { property } from "@/data/property";

export const metadata: Metadata = {
  title: "Rooms and Suites",
  description: `Explore the refined room collection available at ${property.name}.`
};

export default function RoomsPage() {
  return <RoomsPageSections />;
}
