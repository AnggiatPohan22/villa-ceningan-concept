import type { Metadata } from "next";
import { ServiceDetailPageSections } from "@/components/marketing/ServiceDetailPageSections";
import { getServiceBySlug, services } from "@/data/services";
import { property } from "@/data/property";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service"
    };
  }

  return {
    title: service.title,
    description: `${service.summary} at ${property.name}.`
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  return <ServiceDetailPageSections slug={slug} />;
}
