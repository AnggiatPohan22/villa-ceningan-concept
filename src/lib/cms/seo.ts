import type { Metadata } from "next";
import { getMediaAlt, getMediaUrl } from "@/lib/cms/client";
import type { CmsSeo } from "@/lib/cms/content";
import { property } from "@/data/property";

type MetadataInput = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  seo?: CmsSeo | null;
};

export function buildCmsMetadata({ title, description, image = property.heroImage, imageAlt = property.name, seo }: MetadataInput): Metadata {
  const metaTitle = seo?.metaTitle ?? title;
  const metaDescription = seo?.metaDescription ?? description;
  const openGraphImage = getMediaUrl(seo?.openGraphImage, image);
  const robots = seo?.noIndex || seo?.noFollow ? { index: !seo?.noIndex, follow: !seo?.noFollow } : undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: seo?.canonicalURL ? { canonical: seo.canonicalURL } : undefined,
    robots,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: openGraphImage,
          alt: getMediaAlt(seo?.openGraphImage, imageAlt)
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [openGraphImage]
    }
  };
}
