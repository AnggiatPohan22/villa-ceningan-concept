export type ServiceItem = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  detailImage: string;
  cta: string;
  duration?: string;
  location?: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  rituals: Array<{
    title: string;
    category: string;
    description: string;
    image: string;
    duration: string;
    featured?: boolean;
  }>;
  gallery: Array<{
    title: string;
    image: string;
  }>;
};

export const services: ServiceItem[] = [
  {
    slug: "poolside-reset",
    eyebrow: "Rejuvenation",
    title: "Poolside Reset",
    summary: "A quiet wellness ritual built around pool time, soft mornings, and island calm.",
    description:
      "Guided by the rhythm of Nusa Ceningan, this service prepares a restorative poolside setting with fresh towels, calming refreshments, and a private pause between your island days.",
    image: "/assets/img/services-1.webp",
    detailImage: "/assets/img/about.webp",
    cta: "Discover the Ritual",
    duration: "Daily 08:00 - 18:00",
    location: "Pool deck and private terrace",
    stats: [
      { value: "03", label: "Pool rituals" },
      { value: "02", label: "Refreshment sets" }
    ],
    rituals: [
      {
        title: "Morning Pool Ease",
        category: "Reset",
        description: "A prepared towel and refreshment setup for a slow start by the water.",
        image: "/assets/img/services-1.webp",
        duration: "60 minutes",
        featured: true
      },
      {
        title: "Sunset Soak",
        category: "Evening",
        description: "A soft-light poolside pause before dinner or an island night out.",
        image: "/assets/img/Gallery/gallery-1.webp",
        duration: "45 minutes"
      },
      {
        title: "Quiet Deck Tea",
        category: "Calm",
        description: "A simple herbal tea service for post-swim stillness.",
        image: "/assets/img/Gallery/gallery-2.webp",
        duration: "30 minutes"
      }
    ],
    gallery: [
      { title: "Private pool deck", image: "/assets/img/services-1.webp" },
      { title: "Morning stillness", image: "/assets/img/Gallery/gallery-2.webp" },
      { title: "Garden refreshment", image: "/assets/img/Gallery/gallery-6.webp" }
    ]
  },
  {
    slug: "island-breakfast",
    eyebrow: "Gastronomy",
    title: "Island Breakfast",
    summary: "Fresh villa dining with tropical fruit, coffee, and an unhurried island pace.",
    description:
      "A breakfast service shaped around your stay, from a terrace setting to light local flavors prepared for couples, families, or slow solo mornings.",
    image: "/assets/img/Gallery/gallery-4.webp",
    detailImage: "/assets/img/Gallery/gallery-1.webp",
    cta: "Book a Table",
    duration: "Daily 07:00 - 11:00",
    location: "Private terrace or dining area",
    stats: [
      { value: "04", label: "Breakfast styles" },
      { value: "24h", label: "Advance request" }
    ],
    rituals: [
      {
        title: "Floating Breakfast",
        category: "Signature",
        description: "A polished poolside breakfast moment with seasonal fruit and coffee.",
        image: "/assets/img/Gallery/gallery-1.webp",
        duration: "75 minutes",
        featured: true
      },
      {
        title: "Terrace Morning",
        category: "Private Dining",
        description: "Breakfast prepared on your terrace with a calmer table setting.",
        image: "/assets/img/Gallery/gallery-4.webp",
        duration: "60 minutes"
      },
      {
        title: "Family Table",
        category: "Family",
        description: "Flexible breakfast service for guests staying together.",
        image: "/assets/img/rooms/family-stay.webp",
        duration: "60 minutes"
      }
    ],
    gallery: [
      { title: "Terrace breakfast", image: "/assets/img/Gallery/gallery-1.webp" },
      { title: "Private table", image: "/assets/img/Gallery/gallery-4.webp" },
      { title: "Family comfort", image: "/assets/img/rooms/family-stay.webp" }
    ]
  },
  {
    slug: "wellness-retreats",
    eyebrow: "Mindfulness",
    title: "Wellness Retreats",
    summary: "Slow rituals for guests who want a softer, more grounded island stay.",
    description:
      "A curated sequence of quiet experiences: gentle movement, guided stillness, and restorative moments designed to help the body arrive before the itinerary begins.",
    image: "/assets/img/Gallery/gallery-2.webp",
    detailImage: "/assets/img/services-3.webp",
    cta: "View Retreat Calendar",
    duration: "By request",
    location: "Garden, terrace, and poolside",
    stats: [
      { value: "02", label: "Daily sessions" },
      { value: "01", label: "Private guide" }
    ],
    rituals: [
      {
        title: "Sunrise Stillness",
        category: "Meditation",
        description: "A quiet start with breathwork and gentle movement on the terrace.",
        image: "/assets/img/Gallery/gallery-2.webp",
        duration: "45 minutes",
        featured: true
      },
      {
        title: "Garden Sound Pause",
        category: "Sound",
        description: "A restful sound session tuned for a calmer afternoon rhythm.",
        image: "/assets/img/Gallery/gallery-6.webp",
        duration: "40 minutes"
      },
      {
        title: "Digital Detox Evening",
        category: "Mindfulness",
        description: "A guided wind-down designed around sleep and reduced screen time.",
        image: "/assets/img/hero-bg-2.webp",
        duration: "60 minutes"
      }
    ],
    gallery: [
      { title: "Meditation deck", image: "/assets/img/Gallery/gallery-2.webp" },
      { title: "Garden silence", image: "/assets/img/Gallery/gallery-6.webp" },
      { title: "Evening quiet", image: "/assets/img/hero-bg-2.webp" }
    ]
  },
  {
    slug: "seamless-transit",
    eyebrow: "Access",
    title: "Seamless Transit",
    summary: "Clear arrival guidance and local transport coordination from harbor to villa.",
    description:
      "Your journey should feel as calm as your stay. The concierge helps coordinate boat timing, local transfers, and simple arrival details before you step onto the island.",
    image: "/assets/img/services-2.webp",
    detailImage: "/assets/img/hero-coastal-villa.webp",
    cta: "Schedule Transfer",
    duration: "Arrival and departure",
    location: "Harbor, villa, and island routes",
    stats: [
      { value: "24h", label: "Arrival guidance" },
      { value: "03", label: "Island routes" }
    ],
    rituals: [
      {
        title: "Harbor Arrival",
        category: "Transfer",
        description: "Step-by-step guidance for arrival from the boat landing to the villa.",
        image: "/assets/img/services-2.webp",
        duration: "By schedule",
        featured: true
      },
      {
        title: "Island Day Route",
        category: "Concierge",
        description: "Local transport guidance for beach, dining, and activity plans.",
        image: "/assets/img/hero-coastal-villa.webp",
        duration: "Half day"
      },
      {
        title: "Departure Ease",
        category: "Departure",
        description: "Timing support so checkout and crossing details feel simple.",
        image: "/assets/img/Gallery/gallery-5.webp",
        duration: "By schedule"
      }
    ],
    gallery: [
      { title: "Arrival road", image: "/assets/img/services-2.webp" },
      { title: "Coastal transfer", image: "/assets/img/hero-coastal-villa.webp" },
      { title: "Island route", image: "/assets/img/Gallery/gallery-5.webp" }
    ]
  }
];

export const serviceCards = services.map((service, index) => ({
  ...service,
  href: `/services/${service.slug}`,
  variant: index === 0 ? "feature" : index === 1 ? "dark" : index === 2 ? "light" : "image"
}));

export const tailoredMoments = [
  {
    title: "Bespoke Amenities",
    description: "Personal room preferences, arrival notes, and small comforts prepared before you ask."
  },
  {
    title: "Private Island Guidance",
    description: "Simple recommendations for beaches, crossings, restaurants, and slow-day itineraries."
  }
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
