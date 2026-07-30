export type RoomItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  heroImage: string;
  gallery: Array<{
    image: string;
    alt: string;
  }>;
  capacity: string;
  size: string;
  view: string;
  bed: string;
  startingRate: string;
  rateNote: string;
  reviews: string;
  status: string;
  deposit: string;
  passenger: string;
  amenities: string[];
  inclusions: string[];
  bestFor: string;
  standards: string[];
  experiences: Array<{
    title: string;
    description: string;
    image: string;
  }>;
};

export const rooms: RoomItem[] = [
  {
    slug: "island-suite",
    name: "Island Suite",
    category: "Couple Escape",
    description:
      "Suite tropis yang tenang untuk pasangan atau solo traveler yang ingin suasana villa premium dengan akses mudah ke area pool.",
    longDescription:
      "Island Suite dirancang sebagai kamar entry luxury untuk website villa dan guest house. Layoutnya cocok untuk properti kecil yang ingin menjual pengalaman tenang, hangat, dan personal tanpa terasa terlalu formal.",
    image: "/assets/img/rooms/island-suite.webp",
    heroImage: "/assets/img/hero-bg-2.webp",
    gallery: [
      {
        image: "/assets/img/rooms/island-suite.webp",
        alt: "Island Suite king bed with calm island light"
      },
      {
        image: "/assets/img/Gallery/gallery-1.webp",
        alt: "Poolside breakfast moment near Island Suite"
      },
      {
        image: "/assets/img/Gallery/gallery-4.webp",
        alt: "Private terrace dining setup for Island Suite"
      }
    ],
    capacity: "2 guests",
    size: "32 sqm",
    view: "Pool view",
    bed: "King bed",
    startingRate: "IDR 1,250,000",
    rateNote: "per night, breakfast included",
    reviews: "3 reviews",
    status: "Available",
    deposit: "Not required",
    passenger: "01-02",
    amenities: ["Private terrace", "Breakfast setup", "Pool access", "Air conditioning"],
    inclusions: ["Daily breakfast for 2", "Welcome drink", "Wi-Fi", "Daily housekeeping"],
    bestFor: "Couples, solo travelers, short island stays",
    standards: ["Daily breakfast", "Concierge WhatsApp", "Evening turndown"],
    experiences: [
      {
        title: "Poolside Reset",
        description: "A quiet morning ritual arranged beside the water.",
        image: "/assets/img/services-1.webp"
      },
      {
        title: "Island Breakfast",
        description: "Fresh fruit, coffee, and a terrace table prepared for two.",
        image: "/assets/img/Gallery/gallery-4.webp"
      },
      {
        title: "Seamless Transit",
        description: "Arrival guidance from harbor timing to villa welcome.",
        image: "/assets/img/services-2.webp"
      }
    ]
  },
  {
    slug: "garden-villa",
    name: "Garden Villa",
    category: "Garden Retreat",
    description:
      "Kamar villa dengan nuansa taman privat, cocok untuk tamu yang mencari ruang lebih lega dan atmosfer indoor-outdoor.",
    longDescription:
      "Garden Villa menjadi tipe kamar tengah yang ideal untuk properti boutique. Kontennya bisa dipakai untuk kamar dengan terrace, garden view, atau unit villa kecil dengan pengalaman yang lebih intim.",
    image: "/assets/img/rooms/garden-villa.webp",
    heroImage: "/assets/img/about.webp",
    gallery: [
      {
        image: "/assets/img/rooms/garden-villa.webp",
        alt: "Garden Villa bedroom opening to an island terrace"
      },
      {
        image: "/assets/img/Gallery/gallery-6.webp",
        alt: "Soft garden detail beside the villa"
      },
      {
        image: "/assets/img/services-3.webp",
        alt: "Wellness setting for a Garden Villa stay"
      }
    ],
    capacity: "2-3 guests",
    size: "40 sqm",
    view: "Garden view",
    bed: "King or twin beds",
    startingRate: "IDR 1,650,000",
    rateNote: "per night, flexible bedding",
    reviews: "4 reviews",
    status: "03 rooms left",
    deposit: "Required 30%",
    passenger: "02-03",
    amenities: ["Garden view", "Daybed", "Ensuite bathroom", "Tea and coffee"],
    inclusions: ["Daily breakfast", "Evening turndown", "Garden terrace", "Flexible bed setup"],
    bestFor: "Longer stays, friends, boutique villa guests",
    standards: ["Flexible bedding", "Garden terrace", "Private refreshment"],
    experiences: [
      {
        title: "Wellness Retreat",
        description: "A slower stay rhythm with garden stillness and soft routines.",
        image: "/assets/img/Gallery/gallery-2.webp"
      },
      {
        title: "Terrace Morning",
        description: "A quiet breakfast table with fresh island air.",
        image: "/assets/img/Gallery/gallery-1.webp"
      },
      {
        title: "Private Island Guidance",
        description: "Concierge notes for beaches, routes, and low-key dining.",
        image: "/assets/img/hero-coastal-villa.webp"
      }
    ]
  },
  {
    slug: "family-stay",
    name: "Family Stay",
    category: "Family Comfort",
    description:
      "Suite luas untuk keluarga kecil atau grup, dengan layout lapang yang mudah dikembangkan menjadi unit private villa.",
    longDescription:
      "Family Stay memberi pola konten untuk kamar keluarga, connected room, atau villa unit. Harga, fasilitas, dan kapasitas sudah dibuat lebih kuat agar siap menjadi basis inventory di fase booking berikutnya.",
    image: "/assets/img/rooms/family-stay.webp",
    heroImage: "/assets/img/hero-coastal-villa.webp",
    gallery: [
      {
        image: "/assets/img/rooms/family-stay.webp",
        alt: "Family Stay suite with spacious bedding layout"
      },
      {
        image: "/assets/img/Gallery/gallery-5.webp",
        alt: "Island view for family day plans"
      },
      {
        image: "/assets/img/Gallery/gallery-3.webp",
        alt: "Refined bathroom and amenities for family guests"
      }
    ],
    capacity: "4 guests",
    size: "58 sqm",
    view: "Island view",
    bed: "King bed and twin beds",
    startingRate: "IDR 2,250,000",
    rateNote: "per night, family setup",
    reviews: "5 reviews",
    status: "01 room left",
    deposit: "Required 50%",
    passenger: "01-04",
    amenities: ["Family layout", "Living corner", "Pool access", "Extra bedding option"],
    inclusions: ["Breakfast for 4", "Extra towel setup", "Family living corner", "Priority room setup"],
    bestFor: "Families, small groups, private villa stays",
    standards: ["Family breakfast", "Extra bedding", "Priority setup"],
    experiences: [
      {
        title: "Family Table",
        description: "A flexible breakfast setup for everyone staying together.",
        image: "/assets/img/rooms/family-stay.webp"
      },
      {
        title: "Island Day Route",
        description: "Simple route planning for beaches, crossings, and dining.",
        image: "/assets/img/services-2.webp"
      },
      {
        title: "Poolside Reset",
        description: "An easy poolside pause with towels and refreshments ready.",
        image: "/assets/img/services-1.webp"
      }
    ]
  }
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}
