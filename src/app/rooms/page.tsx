import type { Metadata } from "next";
import { RoomsPageSections } from "@/components/marketing/RoomsPageSections";
import { property } from "@/data/property";
import { getCmsRooms, getCmsRoomsPage } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsRoomsPage();

  return buildCmsMetadata({
    title: "Rooms and Suites",
    description: `Explore the refined room collection available at ${property.name}.`,
    image: page.hero.image,
    imageAlt: page.hero.imageAlt,
    seo: page.seo
  });
}

export default async function RoomsPage() {
  const [cmsRooms, cmsPage] = await Promise.all([getCmsRooms(), getCmsRoomsPage()]);

  return <RoomsPageSections items={cmsRooms} page={cmsPage} />;
}
