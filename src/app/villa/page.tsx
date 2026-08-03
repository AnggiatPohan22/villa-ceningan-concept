import type { Metadata } from "next";
import { RoomsSection } from "@/components/marketing/RoomsSection";
import { property } from "@/data/property";
import { getCmsAboutPage, getCmsRooms } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsAboutPage();

  return buildCmsMetadata({
    title: "Villa and Rooms",
    description: `Explore villa and room types at ${property.name}.`,
    image: page.hero.image,
    imageAlt: page.hero.imageAlt,
    seo: page.seo
  });
}

export default async function VillaPage() {
  const [cmsRooms, page] = await Promise.all([getCmsRooms(), getCmsAboutPage()]);

  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">{page.hero.eyebrow || property.propertyType}</p>
        <h1>{page.hero.heading}</h1>
        <p>{page.hero.description}</p>
      </section>
      <RoomsSection items={cmsRooms} />
    </main>
  );
}
