import type { Metadata } from "next";
import { RoomDetailPageSections } from "@/components/marketing/RoomDetailPageSections";
import { rooms } from "@/data/rooms";
import { getCmsRoomBySlug, getCmsRooms } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

type RoomPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = await getCmsRoomBySlug(slug);

  if (!room) {
    return {};
  }

  return {
    ...buildCmsMetadata({
      title: room.name,
      description: room.description,
      image: room.heroImage ?? room.image,
      imageAlt: room.name,
      seo: room.seo
    })
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const [room, cmsRooms] = await Promise.all([getCmsRoomBySlug(slug), getCmsRooms()]);

  return <RoomDetailPageSections room={room} relatedRooms={cmsRooms.filter((item) => item.slug !== slug).slice(0, 2)} />;
}
