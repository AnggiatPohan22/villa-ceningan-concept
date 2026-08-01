import type { Metadata } from "next";
import { ServiceDetailPageSections } from "@/components/marketing/ServiceDetailPageSections";
import { services } from "@/data/services";
import { property } from "@/data/property";
import { getCmsServiceBySlug, getCmsServices } from "@/lib/cms/content";

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
  const service = await getCmsServiceBySlug(slug);

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
  const [service, cmsServices] = await Promise.all([getCmsServiceBySlug(slug), getCmsServices()]);

  return <ServiceDetailPageSections service={service} relatedServices={cmsServices.filter((item) => item.slug !== slug).slice(0, 3)} />;
}
