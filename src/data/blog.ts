export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime?: string;
};

export const featuredArticle: BlogArticle = {
  slug: "art-of-stillness",
  title: "The Art of Stillness: Finding Quiet Luxury by the Water",
  category: "Featured Story",
  excerpt:
    "A journal on slow island mornings, considered villa rituals, and the calm details that shape a more restorative stay at Villa Ceningan.",
  image: "/assets/img/hero-bg-2.webp",
  date: "July 29, 2026",
  readTime: "4 min read"
};

export const blogCategories = [
  "All Stories",
  "Travel Tips",
  "Culinary Arts",
  "Wellness",
  "Behind the Scenes"
];

export const blogArticles: BlogArticle[] = [
  {
    slug: "alchemy-of-island-flavors",
    title: "The Alchemy of Spices: Reimagining Local Flavors at the Villa",
    category: "Culinary Arts",
    excerpt:
      "From bright market herbs to slow breakfasts by the pool, explore how local flavors become part of the Villa Ceningan stay.",
    image: "/assets/img/Gallery/gallery-4.webp",
    date: "March 12, 2026",
    readTime: "5 min read"
  },
  {
    slug: "silent-mornings",
    title: "Silent Mornings: The Ritual of Tea and Meditation",
    category: "Wellness",
    excerpt:
      "A gentle look at quiet routines, softened light, and the guest rituals that help each day begin with more intention.",
    image: "/assets/img/rooms/island-suite.webp",
    date: "March 8, 2026",
    readTime: "3 min read"
  },
  {
    slug: "sustainable-elegance",
    title: "Sustainable Elegance: Building with the Breath of the Island",
    category: "Behind the Scenes",
    excerpt:
      "How natural textures, compact comfort, and thoughtful maintenance keep the villa experience elegant without excess.",
    image: "/assets/img/about.webp",
    date: "February 24, 2026",
    readTime: "4 min read"
  }
];

export const curatorChoices: BlogArticle[] = [
  {
    slug: "sanctuary-stay-essentials",
    title: "5 Essential Items for Your Sanctuary Stay",
    category: "Travel Tips",
    excerpt: "A practical list for a lighter island bag.",
    image: "/assets/img/Gallery/gallery-1.webp",
    date: "February 18, 2026"
  },
  {
    slug: "local-artisans",
    title: "Preserving the Craft: Local Artisans of Bali",
    category: "Behind the Scenes",
    excerpt: "Small details that carry human warmth.",
    image: "/assets/img/Gallery/gallery-2.webp",
    date: "February 12, 2026"
  },
  {
    slug: "detox-reimagined",
    title: "Detox Reimagined: A Weekend Guide",
    category: "Wellness",
    excerpt: "Restorative pacing for a short island escape.",
    image: "/assets/img/Gallery/gallery-6.webp",
    date: "January 30, 2026"
  }
];
