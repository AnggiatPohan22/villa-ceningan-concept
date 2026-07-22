import { property } from "@/data/property";
import { rooms } from "@/data/rooms";

export function lodgingStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.description,
    url: property.siteUrl,
    image: `${property.siteUrl}${property.heroImage}`,
    telephone: property.phone,
    email: property.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: "Nusa Ceningan",
      addressRegion: "Bali",
      addressCountry: "ID"
    },
    amenityFeature: rooms.flatMap((room) =>
      room.amenities.map((amenity) => ({
        "@type": "LocationFeatureSpecification",
        name: amenity,
        value: true
      }))
    )
  };
}
