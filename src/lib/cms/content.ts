import {
  collectionPath,
  extractLexicalText,
  fetchCms,
  getMediaAlt,
  getMediaUrl,
  globalPath,
  warnCms,
  type CmsCollectionResponse
} from "@/lib/cms/client";
import { blogArticles, curatorChoices, featuredArticle, type BlogArticle } from "@/data/blog";
import { gallery as fallbackGallery } from "@/data/gallery";
import { property } from "@/data/property";
import { reservationOverview, reservationRoomDetails, reservationSearchItems } from "@/data/reservation";
import { rooms as fallbackRooms, type RoomItem } from "@/data/rooms";
import { services as fallbackServices, type ServiceItem } from "@/data/services";

type CmsArrayLabel = {
  label?: string | null;
};

type CmsCta = {
  label?: string | null;
  url?: string | null;
};

export type HomeHeroContent = {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCTA: {
    label: string;
    url: string;
  };
  secondaryCTA: {
    label: string;
    url: string;
  };
};

export type HomeAboutContent = {
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
};

type CmsRoom = {
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  shortDescription?: string | null;
  description?: unknown;
  featuredImage?: unknown;
  heroImage?: unknown;
  gallery?: Array<{ image?: unknown; alt?: string | null }> | null;
  amenities?: CmsArrayLabel[] | null;
  inclusions?: CmsArrayLabel[] | null;
  standards?: CmsArrayLabel[] | null;
  experiences?: Array<{ title?: string | null; description?: string | null; image?: unknown }> | null;
  capacity?: number | null;
  capacityLabel?: string | null;
  bedType?: string | null;
  roomSize?: string | null;
  view?: string | null;
  startingPrice?: number | null;
  currency?: string | null;
  rateNote?: string | null;
  reviewsLabel?: string | null;
  availabilityLabel?: string | null;
  depositLabel?: string | null;
  passengerLabel?: string | null;
  bestFor?: string | null;
  featured?: boolean | null;
  sortOrder?: number | null;
};

type CmsService = {
  slug?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  summary?: string | null;
  description?: unknown;
  featuredImage?: unknown;
  detailImage?: unknown;
  cta?: CmsCta | null;
  duration?: string | null;
  location?: string | null;
  stats?: Array<{ value?: string | null; label?: string | null }> | null;
  rituals?: Array<{
    title?: string | null;
    category?: string | null;
    description?: string | null;
    image?: unknown;
    duration?: string | null;
    featured?: boolean | null;
  }> | null;
  gallery?: Array<{ image?: unknown; title?: string | null }> | null;
};

type CmsBlogArticle = {
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  excerpt?: string | null;
  featuredImage?: unknown;
  readTime?: string | null;
  articleDate?: string | null;
  featured?: boolean | null;
  curatorChoice?: boolean | null;
};

type CmsGalleryItem = {
  image?: unknown;
  alt?: string | null;
};

type CmsHomePage = {
  hero?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    backgroundImage?: unknown;
    primaryCTA?: CmsCta | null;
    secondaryCTA?: CmsCta | null;
    active?: boolean | null;
  } | null;
  introduction?: {
    heading?: string | null;
    description?: string | null;
    image?: unknown;
    active?: boolean | null;
  } | null;
};

type CmsReservationPage = {
  searchPreview?: typeof reservationSearchItems;
  roomDetails?: Array<{
    room?: CmsRoom | number | null;
    reviews?: string | null;
    availabilityLabel?: string | null;
    deposit?: string | null;
    beds?: string | null;
    passenger?: string | null;
    breakfast?: string | null;
    selected?: boolean | null;
    badge?: string | null;
  }> | null;
  overview?: {
    arrival?: string | null;
    departure?: string | null;
    total?: string | null;
    items?: Array<{
      room?: CmsRoom | number | null;
      roomCount?: string | null;
      passenger?: string | null;
      subtotal?: string | null;
    }> | null;
  } | null;
};

function compactLabels(items: CmsArrayLabel[] | null | undefined) {
  return items?.map((item) => item.label).filter((item): item is string => Boolean(item)) ?? [];
}

function formatRate(price?: number | null, currency?: string | null) {
  if (!price) {
    return "Rate on request";
  }

  if ((currency ?? "IDR") === "IDR") {
    return `IDR ${new Intl.NumberFormat("id-ID").format(price)}`;
  }

  return `${currency ?? ""} ${new Intl.NumberFormat("en-US").format(price)}`.trim();
}

function formatDate(date?: string | null) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

function mapCmsRoom(room: CmsRoom, fallback: RoomItem): RoomItem {
  const name = room.title ?? fallback.name;

  return {
    slug: room.slug ?? fallback.slug,
    name,
    category: room.category ?? fallback.category,
    description: room.shortDescription ?? fallback.description,
    longDescription: extractLexicalText(room.description, fallback.longDescription),
    image: getMediaUrl(room.featuredImage, fallback.image),
    heroImage: getMediaUrl(room.heroImage, fallback.heroImage),
    gallery:
      room.gallery?.map((item, index) => ({
        image: getMediaUrl(item.image, fallback.gallery[index]?.image ?? fallback.image),
        alt: item.alt ?? getMediaAlt(item.image, `${name} gallery image`)
      })) ?? fallback.gallery,
    capacity: room.capacityLabel ?? (room.capacity ? `${room.capacity} guests` : fallback.capacity),
    size: room.roomSize ?? fallback.size,
    view: room.view ?? fallback.view,
    bed: room.bedType ?? fallback.bed,
    startingRate: formatRate(room.startingPrice, room.currency) || fallback.startingRate,
    rateNote: room.rateNote ?? fallback.rateNote,
    reviews: room.reviewsLabel ?? fallback.reviews,
    status: room.availabilityLabel ?? fallback.status,
    deposit: room.depositLabel ?? fallback.deposit,
    passenger: room.passengerLabel ?? fallback.passenger,
    amenities: compactLabels(room.amenities).length ? compactLabels(room.amenities) : fallback.amenities,
    inclusions: compactLabels(room.inclusions).length ? compactLabels(room.inclusions) : fallback.inclusions,
    bestFor: room.bestFor ?? fallback.bestFor,
    standards: compactLabels(room.standards).length ? compactLabels(room.standards) : fallback.standards,
    experiences:
      room.experiences?.map((experience, index) => ({
        title: experience.title ?? fallback.experiences[index]?.title ?? "Villa Experience",
        description: experience.description ?? fallback.experiences[index]?.description ?? "",
        image: getMediaUrl(experience.image, fallback.experiences[index]?.image ?? fallback.image)
      })) ?? fallback.experiences
  };
}

function mapCmsService(service: CmsService, fallback: ServiceItem): ServiceItem {
  const title = service.title ?? fallback.title;

  return {
    slug: service.slug ?? fallback.slug,
    eyebrow: service.eyebrow ?? fallback.eyebrow,
    title,
    summary: service.summary ?? fallback.summary,
    description: extractLexicalText(service.description, service.summary ?? fallback.description),
    image: getMediaUrl(service.featuredImage, fallback.image),
    detailImage: getMediaUrl(service.detailImage, fallback.detailImage),
    cta: service.cta?.label ?? fallback.cta,
    duration: service.duration ?? fallback.duration,
    location: service.location ?? fallback.location,
    stats:
      service.stats?.map((stat, index) => ({
        value: stat.value ?? fallback.stats[index]?.value ?? "",
        label: stat.label ?? fallback.stats[index]?.label ?? ""
      })) ?? fallback.stats,
    rituals:
      service.rituals?.map((ritual, index) => ({
        title: ritual.title ?? fallback.rituals[index]?.title ?? "Signature Ritual",
        category: ritual.category ?? fallback.rituals[index]?.category ?? "",
        description: ritual.description ?? fallback.rituals[index]?.description ?? "",
        image: getMediaUrl(ritual.image, fallback.rituals[index]?.image ?? fallback.image),
        duration: ritual.duration ?? fallback.rituals[index]?.duration ?? "",
        featured: ritual.featured ?? fallback.rituals[index]?.featured
      })) ?? fallback.rituals,
    gallery:
      service.gallery?.map((item, index) => ({
        title: item.title ?? fallback.gallery[index]?.title ?? title,
        image: getMediaUrl(item.image, fallback.gallery[index]?.image ?? fallback.image)
      })) ?? fallback.gallery
  };
}

function mapCmsBlog(article: CmsBlogArticle, fallback: BlogArticle): BlogArticle {
  return {
    slug: article.slug ?? fallback.slug,
    title: article.title ?? fallback.title,
    category: article.category ?? fallback.category,
    excerpt: article.excerpt ?? fallback.excerpt,
    image: getMediaUrl(article.featuredImage, fallback.image),
    date: formatDate(article.articleDate) || fallback.date,
    readTime: article.readTime ?? fallback.readTime
  };
}

function fallbackHomePage() {
  return {
    hero: {
      eyebrow: "Welcome to Sanctuary",
      heading: property.name,
      description: "A place to experience and enjoy the life",
      image: property.heroImage,
      imageAlt: `${property.name} coastal villa and pool atmosphere at dusk`,
      primaryCTA: {
        label: "Explore Rooms",
        url: "/rooms"
      },
      secondaryCTA: {
        label: "Start Reservation",
        url: "/reservation"
      }
    },
    introduction: {
      heading: "A best place to enjoy your life",
      description:
        "Set on the calm side of Nusa Ceningan, Villa Ceningan brings together warm island hospitality, quiet interiors, and the simple luxury of waking close to the water.",
      image: property.aboutImage,
      imageAlt: `${property.name} private terrace and outdoor bath atmosphere`
    }
  };
}

function mapCmsHomePage(data: CmsHomePage) {
  const fallback = fallbackHomePage();

  if (!data.hero?.heading) {
    warnCms("Falling back to local home data because home-page hero.heading is empty.");
    return fallback;
  }

  return {
    hero: {
      eyebrow: data.hero.eyebrow ?? fallback.hero.eyebrow,
      heading: data.hero.heading,
      description: data.hero.description ?? fallback.hero.description,
      image: getMediaUrl(data.hero.backgroundImage, fallback.hero.image),
      imageAlt: getMediaAlt(data.hero.backgroundImage, fallback.hero.imageAlt),
      primaryCTA: {
        label: data.hero.primaryCTA?.label ?? fallback.hero.primaryCTA.label,
        url: data.hero.primaryCTA?.url ?? fallback.hero.primaryCTA.url
      },
      secondaryCTA: {
        label: data.hero.secondaryCTA?.label ?? fallback.hero.secondaryCTA.label,
        url: data.hero.secondaryCTA?.url ?? fallback.hero.secondaryCTA.url
      }
    },
    introduction: {
      heading: data.introduction?.heading ?? fallback.introduction.heading,
      description: data.introduction?.description ?? fallback.introduction.description,
      image: getMediaUrl(data.introduction?.image, fallback.introduction.image),
      imageAlt: getMediaAlt(data.introduction?.image, fallback.introduction.imageAlt)
    }
  };
}

export async function getCmsHomePage() {
  const data = await fetchCms<CmsHomePage>(globalPath("home-page", 2), 30);

  if (!data) {
    return fallbackHomePage();
  }

  return mapCmsHomePage(data);
}

export async function getCmsRooms() {
  const data = await fetchCms<CmsCollectionResponse<CmsRoom>>(
    collectionPath("rooms", "where[status][equals]=published&sort=sortOrder&depth=2"),
    120
  );

  if (!data?.docs.length) {
    return fallbackRooms;
  }

  return data.docs.map((room, index) => mapCmsRoom(room, fallbackRooms[index] ?? fallbackRooms[0]));
}

export async function getCmsRoomBySlug(slug: string) {
  const data = await fetchCms<CmsCollectionResponse<CmsRoom>>(
    collectionPath("rooms", `where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&depth=2`),
    120
  );
  const fallback = fallbackRooms.find((room) => room.slug === slug);

  if (!data?.docs[0]) {
    return fallback ?? null;
  }

  return mapCmsRoom(data.docs[0], fallback ?? fallbackRooms[0]);
}

export async function getCmsServices() {
  const data = await fetchCms<CmsCollectionResponse<CmsService>>(
    collectionPath("services", "where[status][equals]=published&sort=sortOrder&depth=2"),
    300
  );

  if (!data?.docs.length) {
    return fallbackServices;
  }

  return data.docs.map((service, index) => mapCmsService(service, fallbackServices[index] ?? fallbackServices[0]));
}

export async function getCmsServiceBySlug(slug: string) {
  const data = await fetchCms<CmsCollectionResponse<CmsService>>(
    collectionPath("services", `where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&depth=2`),
    300
  );
  const fallback = fallbackServices.find((service) => service.slug === slug);

  if (!data?.docs[0]) {
    return fallback ?? null;
  }

  return mapCmsService(data.docs[0], fallback ?? fallbackServices[0]);
}

export async function getCmsBlogArticles() {
  const data = await fetchCms<CmsCollectionResponse<CmsBlogArticle>>(
    collectionPath("blog", "where[status][equals]=published&sort=sortOrder&depth=2"),
    300
  );

  if (!data?.docs.length) {
    return {
      featuredArticle,
      blogArticles,
      curatorChoices
    };
  }

  const mapped = data.docs.map((article, index) => mapCmsBlog(article, blogArticles[index] ?? featuredArticle));
  const featured = mapped.find((article, index) => data.docs[index]?.featured) ?? mapped[0] ?? featuredArticle;
  const curated = mapped.filter((article, index) => data.docs[index]?.curatorChoice);

  return {
    featuredArticle: featured,
    blogArticles: mapped,
    curatorChoices: curated.length ? curated : mapped.slice(0, 3)
  };
}

export async function getCmsGallery() {
  const data = await fetchCms<CmsCollectionResponse<CmsGalleryItem>>(
    collectionPath("gallery", "where[status][equals]=published&sort=sortOrder&depth=2"),
    300
  );

  if (!data?.docs.length) {
    return fallbackGallery;
  }

  return data.docs.map((item, index) => getMediaUrl(item.image, fallbackGallery[index] ?? fallbackGallery[0]));
}

export async function getCmsReservation() {
  const data = await fetchCms<CmsReservationPage>(globalPath("reservation-page", 1), 120);

  if (!data) {
    return {
      reservationSearchItems,
      reservationRoomDetails,
      reservationOverview
    };
  }

  const roomDetails = { ...reservationRoomDetails };

  data.roomDetails?.forEach((entry) => {
    if (!entry.room || typeof entry.room === "number" || !entry.room.slug) {
      return;
    }

    roomDetails[entry.room.slug] = {
      reviews: entry.reviews ?? roomDetails[entry.room.slug]?.reviews ?? "",
      status: entry.availabilityLabel ?? roomDetails[entry.room.slug]?.status ?? "",
      deposit: entry.deposit ?? roomDetails[entry.room.slug]?.deposit ?? "",
      beds: entry.beds ?? roomDetails[entry.room.slug]?.beds ?? "",
      passenger: entry.passenger ?? roomDetails[entry.room.slug]?.passenger ?? "",
      breakfast: entry.breakfast ?? roomDetails[entry.room.slug]?.breakfast ?? "",
      selected: entry.selected ?? roomDetails[entry.room.slug]?.selected ?? false,
      badge: entry.badge ?? roomDetails[entry.room.slug]?.badge
    };
  });

  return {
    reservationSearchItems: data.searchPreview?.length ? data.searchPreview : reservationSearchItems,
    reservationRoomDetails: roomDetails,
    reservationOverview: {
      arrival: data.overview?.arrival ?? reservationOverview.arrival,
      departure: data.overview?.departure ?? reservationOverview.departure,
      items:
        data.overview?.items?.map((item, index) => ({
          slug:
            item.room && typeof item.room !== "number" && item.room.slug
              ? item.room.slug
              : reservationOverview.items[index]?.slug ?? fallbackRooms[0].slug,
          roomCount: item.roomCount ?? reservationOverview.items[index]?.roomCount ?? "01",
          passenger: item.passenger ?? reservationOverview.items[index]?.passenger ?? "02",
          subtotal: item.subtotal ?? reservationOverview.items[index]?.subtotal ?? ""
        })) ?? reservationOverview.items,
      total: data.overview?.total ?? reservationOverview.total
    }
  };
}
