import type { Metadata } from "next";
import { RoomDetailPageSections } from "@/components/marketing/RoomDetailPageSections";
import { getRoomBySlug, rooms } from "@/data/rooms";

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
  const room = getRoomBySlug(slug);

  if (!room) {
    return {};
  }

  return {
    title: room.name,
    description: room.description
  };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;

  return <RoomDetailPageSections slug={slug} />;
}
