export const property = {
  name: "Villa Ceningan",
  shortName: "VC",
  propertyType: "Boutique Villa",
  tagline: "Ocean-side comfort, warm villa lights, and slow island mornings in Nusa Ceningan.",
  description:
    "A reusable Next.js hospitality template foundation for villas, guest houses, boutique hotels, and small resorts.",
  location: "Nusa Ceningan, Bali",
  phone: "+62 823 8635 7012",
  email: "hello@villaceningan.com",
  whatsapp: "6282386357012",
  bookingMessage: "Hello Villa Ceningan, I would like to check availability for my stay.",
  address: "Nusa Ceningan, Klungkung, Bali, Indonesia",
  siteUrl: "https://example.com",
  heroImage: "/assets/img/hero-coastal-villa.webp",
  aboutImage: "/assets/img/about.webp",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4105.109823280101!2d115.44396114160823!3d-8.700121381626033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sid",
  highlights: [
    "Ocean breeze atmosphere",
    "Cozy private villa comfort",
    "Island-style pool and breakfast",
    "Warm luxury without stiffness"
  ]
};

export function getWhatsappUrl(message = property.bookingMessage) {
  return `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(message)}`;
}
