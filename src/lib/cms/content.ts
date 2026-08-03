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
import { aboutPrinciples, aboutTeam } from "@/data/about";
import { blogArticles, curatorChoices, featuredArticle, type BlogArticle } from "@/data/blog";
import { gallery as fallbackGallery } from "@/data/gallery";
import { footerNavigation, primaryNavigation, type NavigationItem } from "@/data/navigation";
import { property } from "@/data/property";
import { reservationOverview, reservationRoomDetails, reservationSearchItems } from "@/data/reservation";
import { rooms as fallbackRooms, type RoomItem } from "@/data/rooms";
import { services as fallbackServices, type ServiceItem } from "@/data/services";
import { getLegalPage, type LegalPageContent } from "@/data/legal";

type CmsArrayLabel = {
  label?: string | null;
};

type CmsCta = {
  label?: string | null;
  url?: string | null;
  openInNewTab?: boolean | null;
  variant?: string | null;
};

type CmsPublishStatus = {
  _status?: "draft" | "published" | null;
};

export type CmsSeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  openGraphImage?: unknown;
  canonicalURL?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
};

type CmsSeoFields = {
  seo?: CmsSeo | null;
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
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type HomeSectionContent = {
  eyebrow?: string;
  heading: string;
  description?: string;
  cta?: {
    label: string;
    url: string;
  };
};

export type HomeBookingPreviewContent = {
  sectionAriaLabel: string;
  formAriaLabel: string;
  checkInLabel: string;
  checkOutLabel: string;
  guestsLabel: string;
  promotionLinkLabel: string;
  promotionLinkURL: string;
  submitButtonLabel: string;
  submitButtonURL: string;
};

export type HomeContactPreviewContent = {
  eyebrow: string;
  heading: string;
  description: string;
  locationHeading: string;
  address: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  mapEmbedURL: string;
};

export type HomePageContent = {
  hero: HomeHeroContent;
  bookingPreview: HomeBookingPreviewContent;
  introduction: HomeAboutContent;
  featuredRooms: HomeSectionContent;
  signatureExperiences: HomeSectionContent;
  journalPreview: HomeSectionContent;
  contactPreview: HomeContactPreviewContent;
  finalCTA: HomeSectionContent & {
    image?: string;
    imageAlt?: string;
  };
  seo?: CmsSeo | null;
};

export type CmsPageHeroContent = {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  scrollCueLabel?: string;
};

export type CmsAvailabilityBarContent = {
  sectionAriaLabel: string;
  formAriaLabel: string;
  checkInLabel: string;
  checkOutLabel: string;
  guestsLabel: string;
  promotionLinkLabel: string;
  promotionLinkURL: string;
  submitButtonLabel: string;
  submitButtonURL: string;
};

export type CmsListingPageContent = {
  hero: CmsPageHeroContent;
  intro: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  listing: {
    heading: string;
    description: string;
    ratingSymbol?: string;
    startFromLabel?: string;
    nightSuffixLabel?: string;
    statusLabel?: string;
    depositLabel?: string;
    bedsLabel?: string;
    passengerLabel?: string;
    detailButtonLabel?: string;
    cta?: {
      label: string;
      url: string;
    };
  };
  availabilityBar: CmsAvailabilityBarContent;
  seo?: CmsSeo | null;
};

export type CmsFooterContent = {
  brand: {
    name: string;
    description: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  navigationColumns: Array<{
    title: string;
    links: Array<{
      label: string;
      url: string;
      openInNewTab: boolean;
    }>;
  }>;
  socialLinks: Array<{
    platform: "instagram" | "facebook" | "youtube" | "whatsapp" | "email" | "other";
    label: string;
    url: string;
    openInNewTab: boolean;
  }>;
  legalLinks: Array<{
    label: string;
    url: string;
    openInNewTab: boolean;
  }>;
  copyrightText: string;
};

export type CmsHeaderContent = {
  brand: {
    name: string;
    propertyType: string;
    logo?: string;
    logoAlt: string;
  };
  topbar: {
    phone: string;
  };
  navigationItems: NavigationItem[];
  primaryCTA: {
    label: string;
    url: string;
    openInNewTab: boolean;
  };
};

export type CmsSiteSettingsContent = {
  siteName: string;
  shortDescription: string;
  logoDark?: string;
  logoLight?: string;
  defaultSEOTitle: string;
  defaultSEODescription: string;
  defaultOpenGraphImage: string;
  contactEmail: string;
  phone: string;
  whatsAppNumber: string;
  address: string;
  googleMapsURL: string;
  instagramURL?: string;
  facebookURL?: string;
  youTubeURL?: string;
  bookingURL?: string;
  seo?: CmsSeo | null;
};

export type CmsAboutPageContent = {
  hero: CmsPageHeroContent;
  story: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  principles: {
    eyebrow: string;
    heading: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      image?: string;
    }>;
  };
  values: Array<{
    title: string;
    description: string;
    image?: string;
  }>;
  team: {
    heading: string;
    quote: string;
    members: Array<{
      name: string;
      role: string;
      description: string;
      image: string;
    }>;
  };
  finalCTA: {
    heading: string;
    label: string;
    url: string;
    image: string;
    imageAlt: string;
  };
  seo?: CmsSeo | null;
};

export type CmsContactPageContent = {
  hero: CmsPageHeroContent;
  contactHeading: string;
  contactDescription: string;
  phone: string;
  email: string;
  whatsApp: string;
  address: string;
  mapEmbedURL: string;
  operationalHours: Array<{
    label: string;
    hours: string;
  }>;
  finalCTA: {
    label: string;
    url: string;
  };
  seo?: CmsSeo | null;
};

export type CmsReservationContent = {
  hero: CmsPageHeroContent;
  reservationSearchItems: typeof reservationSearchItems;
  reservationRoomDetails: typeof reservationRoomDetails;
  reservationOverview: typeof reservationOverview;
  whatsAppCTA: {
    label: string;
    url: string;
  };
  seo?: CmsSeo | null;
};

export type CmsRoomItem = RoomItem & { seo?: CmsSeo | null };
export type CmsServiceItem = ServiceItem & { seo?: CmsSeo | null };
export type CmsBlogItem = BlogArticle & { content?: string; seo?: CmsSeo | null };

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
} & CmsSeoFields;

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
} & CmsSeoFields;

type CmsBlogArticle = {
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  excerpt?: string | null;
  content?: unknown;
  featuredImage?: unknown;
  readTime?: string | null;
  articleDate?: string | null;
  featured?: boolean | null;
  curatorChoice?: boolean | null;
} & CmsSeoFields;

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
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    image?: unknown;
    active?: boolean | null;
  } | null;
  bookingPreview?: {
    sectionAriaLabel?: string | null;
    formAriaLabel?: string | null;
    checkInLabel?: string | null;
    checkOutLabel?: string | null;
    guestsLabel?: string | null;
    promotionLinkLabel?: string | null;
    promotionLinkURL?: string | null;
    submitButtonLabel?: string | null;
    submitButtonURL?: string | null;
    active?: boolean | null;
  } | null;
  featuredRooms?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    active?: boolean | null;
  } | null;
  typeOfRooms?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    active?: boolean | null;
  } | null;
  signatureExperiences?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    button?: CmsCta | null;
    active?: boolean | null;
  } | null;
  journalPreview?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    button?: CmsCta | null;
    cta?: CmsCta | null;
    active?: boolean | null;
  } | null;
  contactPreview?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    locationHeading?: string | null;
    address?: string | null;
    emailLabel?: string | null;
    email?: string | null;
    phoneLabel?: string | null;
    phone?: string | null;
    mapEmbedURL?: string | null;
    active?: boolean | null;
  } | null;
  finalCTA?: {
    heading?: string | null;
    description?: string | null;
    buttonLabel?: string | null;
    buttonURL?: string | null;
    backgroundImage?: unknown;
    active?: boolean | null;
  } | null;
} & CmsPublishStatus &
  CmsSeoFields;

type CmsListingPage = {
  hero?: {
    heading?: string | null;
    description?: string | null;
    image?: unknown;
  } | null;
  availabilityBar?: {
    sectionAriaLabel?: string | null;
    formAriaLabel?: string | null;
    checkInLabel?: string | null;
    checkOutLabel?: string | null;
    guestsLabel?: string | null;
    promotionLinkLabel?: string | null;
    promotionLinkURL?: string | null;
    submitButtonLabel?: string | null;
    submitButtonURL?: string | null;
  } | null;
  roomCollection?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    ratingSymbol?: string | null;
    startFromLabel?: string | null;
    nightSuffixLabel?: string | null;
    statusLabel?: string | null;
    depositLabel?: string | null;
    bedsLabel?: string | null;
    passengerLabel?: string | null;
    detailButtonLabel?: string | null;
    button?: CmsCta | null;
  } | null;
  heroEyebrow?: string | null;
  heroHeading?: string | null;
  heroDescription?: string | null;
  heroImage?: unknown;
  introHeading?: string | null;
  introDescription?: string | null;
  listingHeading?: string | null;
  listingDescription?: string | null;
  listingCTA?: CmsCta | null;
  finalCTA?: CmsCta | null;
} & CmsPublishStatus &
  CmsSeoFields;

type CmsFooter = {
  brand?: {
    description?: string | null;
  } | null;
  shortDescription?: string | null;
  contact?: {
    phone?: string | null;
    whatsapp?: string | null;
    email?: string | null;
    address?: string | null;
  } | null;
  contactInformation?: {
    phone?: string | null;
    whatsApp?: string | null;
    email?: string | null;
    address?: string | null;
  } | null;
  navigationColumns?: Array<{
    title?: string | null;
    links?: Array<{
      label?: string | null;
      url?: string | null;
      openInNewTab?: boolean | null;
    }> | null;
  }> | null;
  socialLinks?: Array<{
    platform?: CmsFooterContent["socialLinks"][number]["platform"] | null;
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
  }> | null;
  legalLinks?: Array<{
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
  }> | null;
  copyrightText?: string | null;
} & CmsPublishStatus;

type CmsReservationPage = {
  heroEyebrow?: string | null;
  heroHeading?: string | null;
  heroDescription?: string | null;
  heroImage?: unknown;
  searchPreview?: typeof reservationSearchItems;
  bookingBenefits?: Array<{ label?: string | null }> | null;
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
  whatsAppCTA?: CmsCta | null;
} & CmsPublishStatus &
  CmsSeoFields;

type CmsSiteSettings = {
  siteName?: string | null;
  shortDescription?: string | null;
  logoDark?: unknown;
  logoLight?: unknown;
  defaultSEOTitle?: string | null;
  defaultSEODescription?: string | null;
  defaultOpenGraphImage?: unknown;
  contactEmail?: string | null;
  phone?: string | null;
  whatsAppNumber?: string | null;
  address?: string | null;
  googleMapsURL?: string | null;
  instagramURL?: string | null;
  facebookURL?: string | null;
  youTubeURL?: string | null;
  bookingURL?: string | null;
} & CmsPublishStatus &
  CmsSeoFields;

type CmsHeader = {
  logo?: unknown;
  navigationItems?: Array<{
    label?: string | null;
    pageURL?: string | null;
    active?: boolean | null;
  }> | null;
  primaryCTA?: CmsCta | null;
} & CmsPublishStatus;

type CmsAboutPage = {
  hero?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    image?: unknown;
    scrollCueLabel?: string | null;
  } | null;
  story?: {
    eyebrow?: string | null;
    heading?: string | null;
    paragraphs?: Array<{ text?: string | null }> | null;
    image?: unknown;
  } | null;
  principles?: {
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    items?: Array<{
      title?: string | null;
      description?: string | null;
      image?: unknown;
    }> | null;
  } | null;
  team?: {
    heading?: string | null;
    quote?: string | null;
    members?: Array<{
      name?: string | null;
      role?: string | null;
      description?: string | null;
      image?: unknown;
    }> | null;
  } | null;
  finalCTA?: ({
    heading?: string | null;
    image?: unknown;
    button?: CmsCta | null;
  } & CmsCta) | null;
  heroHeading?: string | null;
  heroDescription?: string | null;
  heroImage?: unknown;
  introductionHeading?: string | null;
  introductionContent?: unknown;
  storyContent?: unknown;
  supportingImages?: unknown[] | null;
  values?: Array<{
    title?: string | null;
    description?: string | null;
  }> | null;
} & CmsPublishStatus &
  CmsSeoFields;

type CmsContactPage = {
  heroHeading?: string | null;
  heroDescription?: string | null;
  heroImage?: unknown;
  contactHeading?: string | null;
  contactDescription?: string | null;
  phone?: string | null;
  email?: string | null;
  whatsApp?: string | null;
  address?: string | null;
  mapEmbedURL?: string | null;
  operationalHours?: Array<{
    label?: string | null;
    hours?: string | null;
  }> | null;
  finalCTA?: CmsCta | null;
} & CmsPublishStatus &
  CmsSeoFields;

type CmsLegalPageGroup = {
  eyebrow?: string | null;
  title?: string | null;
  summary?: string | null;
  updatedAtLabel?: string | null;
  updatedAt?: string | null;
  sections?: Array<{
    title?: string | null;
    body?: Array<{
      paragraph?: string | null;
    }> | null;
  }> | null;
  seo?: CmsSeo | null;
};

type CmsLegalPages = {
  terms?: CmsLegalPageGroup | null;
  privacy?: CmsLegalPageGroup | null;
  cookies?: CmsLegalPageGroup | null;
} & CmsPublishStatus;

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

function formatLegalDate(date?: string | null, fallback = "") {
  if (!date) {
    return fallback;
  }

  return formatDate(date) || fallback;
}

function ctaFromCms(cta: CmsCta | null | undefined, fallback: { label: string; url: string }) {
  return cta?.label && cta.url
    ? {
        label: cta.label,
        url: cta.url
      }
    : fallback;
}

function fallbackSiteSettings(): CmsSiteSettingsContent {
  return {
    siteName: property.name,
    shortDescription: property.tagline,
    logoDark: undefined,
    logoLight: undefined,
    defaultSEOTitle: `${property.name} | Boutique Villa Website Template`,
    defaultSEODescription: property.tagline,
    defaultOpenGraphImage: property.heroImage,
    contactEmail: property.email,
    phone: property.phone,
    whatsAppNumber: property.whatsapp,
    address: property.address,
    googleMapsURL: property.mapEmbedUrl,
    instagramURL: undefined,
    facebookURL: undefined,
    youTubeURL: undefined,
    bookingURL: "/reservation",
    seo: null
  };
}

function mapSiteSettings(data: CmsSiteSettings): CmsSiteSettingsContent {
  const fallback = fallbackSiteSettings();

  return {
    siteName: data.siteName ?? fallback.siteName,
    shortDescription: data.shortDescription ?? fallback.shortDescription,
    logoDark: getMediaUrl(data.logoDark, fallback.logoDark ?? ""),
    logoLight: getMediaUrl(data.logoLight, fallback.logoLight ?? ""),
    defaultSEOTitle: data.defaultSEOTitle ?? fallback.defaultSEOTitle,
    defaultSEODescription: data.defaultSEODescription ?? fallback.defaultSEODescription,
    defaultOpenGraphImage: getMediaUrl(data.defaultOpenGraphImage, fallback.defaultOpenGraphImage),
    contactEmail: data.contactEmail ?? fallback.contactEmail,
    phone: data.phone ?? fallback.phone,
    whatsAppNumber: data.whatsAppNumber ?? fallback.whatsAppNumber,
    address: data.address ?? fallback.address,
    googleMapsURL: data.googleMapsURL ?? fallback.googleMapsURL,
    instagramURL: data.instagramURL ?? fallback.instagramURL,
    facebookURL: data.facebookURL ?? fallback.facebookURL,
    youTubeURL: data.youTubeURL ?? fallback.youTubeURL,
    bookingURL: data.bookingURL ?? fallback.bookingURL,
    seo: data.seo ?? fallback.seo
  };
}

function fallbackHeader(): CmsHeaderContent {
  return {
    brand: {
      name: property.name,
      propertyType: property.propertyType,
      logo: undefined,
      logoAlt: property.name
    },
    topbar: {
      phone: property.phone
    },
    navigationItems: primaryNavigation,
    primaryCTA: {
      label: "Book Now",
      url: getWhatsappUrlFromNumber(property.whatsapp, property.bookingMessage),
      openInNewTab: true
    }
  };
}

function getWhatsappUrlFromNumber(number: string, message = property.bookingMessage) {
  return `https://wa.me/${number.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}

function mapHeader(data: CmsHeader): CmsHeaderContent {
  const fallback = fallbackHeader();
  const navigationItems =
    data.navigationItems
      ?.filter((item) => item.active !== false && item.label && item.pageURL)
      .map((item) => ({
        label: item.label as string,
        href: item.pageURL as string
      })) ?? fallback.navigationItems;

  return {
    ...fallback,
    brand: {
      ...fallback.brand,
      logo: getMediaUrl(data.logo, fallback.brand.logo ?? ""),
      logoAlt: getMediaAlt(data.logo, fallback.brand.logoAlt)
    },
    navigationItems: navigationItems.length ? navigationItems : fallback.navigationItems,
    primaryCTA: {
      label: data.primaryCTA?.label ?? fallback.primaryCTA.label,
      url: data.primaryCTA?.url ?? fallback.primaryCTA.url,
      openInNewTab: data.primaryCTA?.openInNewTab ?? fallback.primaryCTA.openInNewTab
    }
  };
}

function mapCmsRoom(room: CmsRoom, fallback: RoomItem): CmsRoomItem {
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
      })) ?? fallback.experiences,
    seo: room.seo ?? null
  };
}

function mapCmsService(service: CmsService, fallback: ServiceItem): CmsServiceItem {
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
      })) ?? fallback.gallery,
    seo: service.seo ?? null
  };
}

function mapCmsBlog(article: CmsBlogArticle, fallback: BlogArticle): CmsBlogItem {
  return {
    slug: article.slug ?? fallback.slug,
    title: article.title ?? fallback.title,
    category: article.category ?? fallback.category,
    excerpt: article.excerpt ?? fallback.excerpt,
    image: getMediaUrl(article.featuredImage, fallback.image),
    date: formatDate(article.articleDate) || fallback.date,
    readTime: article.readTime ?? fallback.readTime,
    content: extractLexicalText(article.content, ""),
    seo: article.seo ?? null
  };
}

function fallbackHomePage(): HomePageContent {
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
      eyebrow: "Welcome to Sanctuary",
      heading: "A best place to enjoy your life",
      description:
        "Set on the calm side of Nusa Ceningan, Villa Ceningan brings together warm island hospitality, quiet interiors, and the simple luxury of waking close to the water.",
      image: property.aboutImage,
      imageAlt: `${property.name} private terrace and outdoor bath atmosphere`
    },
    bookingPreview: {
      sectionAriaLabel: "Booking preview",
      formAriaLabel: "Availability search",
      checkInLabel: "Check-in",
      checkOutLabel: "Check-out",
      guestsLabel: "Guests",
      promotionLinkLabel: "Have a promotion code?",
      promotionLinkURL: "/reservation",
      submitButtonLabel: "Check Availability",
      submitButtonURL: "/reservation"
    },
    featuredRooms: {
      eyebrow: "Discover our rooms",
      heading: "Luxury interior",
      description: "Room previews from the villa collection.",
      cta: {
        label: "See More Rooms",
        url: "/rooms"
      }
    },
    signatureExperiences: {
      eyebrow: "Curated Moments",
      heading: "Signature Experiences",
      description: "Curated services for dining, wellness, transit, and concierge support.",
      cta: {
        label: "All Signature Service",
        url: "/services"
      }
    },
    journalPreview: {
      eyebrow: "Explore",
      heading: "Latest from our blog",
      description: "Read travel notes, culinary stories, wellness rituals, and behind-the-scenes updates.",
      cta: {
        label: "View All Journal",
        url: "/blog"
      }
    },
    finalCTA: {
      eyebrow: "Information",
      heading: "Contact us",
      description: property.address,
      cta: {
        label: "Contact concierge",
        url: "/contact"
      },
      image: property.heroImage,
      imageAlt: `${property.name} peaceful retreat atmosphere`
    },
    contactPreview: {
      eyebrow: "Information",
      heading: "Contact us",
      description: "Set in the rhythm of Nusa Ceningan, close enough to island life and quiet enough to fully slow down.",
      locationHeading: "Bali, Indonesia",
      address: property.address,
      emailLabel: "Email:",
      email: property.email,
      phoneLabel: "Call directly:",
      phone: property.phone,
      mapEmbedURL: property.mapEmbedUrl
    },
    seo: null
  };
}

function isPublishedGlobal<T extends CmsPublishStatus>(data: T | null | undefined, slug: string): data is T {
  if (!data) {
    return false;
  }

  if (data._status && data._status !== "published") {
    warnCms(`Falling back to local data because ${slug} is ${data._status}.`);
    return false;
  }

  return true;
}

function fallbackListingPage(kind: "rooms" | "services" | "blog"): CmsListingPageContent {
  const availabilityBar = {
    sectionAriaLabel: "Booking preview",
    formAriaLabel: "Availability search",
    checkInLabel: "Check-in",
    checkOutLabel: "Check-out",
    guestsLabel: "Guests",
    promotionLinkLabel: "Have a promotion code?",
    promotionLinkURL: "/reservation",
    submitButtonLabel: "Check Availability",
    submitButtonURL: "/reservation"
  };

  if (kind === "services") {
    return {
      hero: {
        eyebrow: "Services",
        heading: "Bespoke Sanctuary Services",
        description: "Experience the art of quiet luxury where every detail is curated for your island rhythm.",
        image: "/assets/img/services-3.webp",
        imageAlt: `${property.name} sanctuary service landscape`
      },
      intro: {
        eyebrow: "The Villa Ceningan Way",
        heading:
          "In the stillness of the island, a stay becomes more than a room. Our services are designed to restore ease, rhythm, and quiet pleasure.",
        description: "Curated services for dining, wellness, transit, and concierge support."
      },
      listing: {
        heading: "Signature Services",
        description: "Curated services for dining, wellness, transit, and concierge support.",
        cta: {
          label: "Start Reservation",
          url: "/reservation"
        }
      },
      availabilityBar
    };
  }

  if (kind === "blog") {
    return {
      hero: {
        eyebrow: featuredArticle.category,
        heading: featuredArticle.title,
        description: featuredArticle.excerpt,
        image: featuredArticle.image,
        imageAlt: "Quiet Villa Ceningan landscape at sunrise"
      },
      intro: {
        eyebrow: "Island Journal",
        heading: "Island Journal",
        description: "Travel notes, villa rituals, and slower stories from Villa Ceningan."
      },
      listing: {
        heading: "Latest Stories",
        description: "Read travel notes, culinary stories, wellness rituals, and behind-the-scenes updates."
      },
      availabilityBar
    };
  }

  return {
    hero: {
      eyebrow: "Rooms",
      heading: "Our Rooms",
      description: "Discover a collection of curated island sanctuaries designed for deep rest and quiet elegance.",
      image: "/assets/img/hero-coastal-villa.webp",
      imageAlt: `${property.name} coastal villa pool at sunset`
    },
    intro: {
      eyebrow: "Signature Collection",
      heading: "Stay where island calm meets personal villa comfort.",
      description: "Choose the room style that best matches your stay rhythm."
    },
    listing: {
      heading: "Stay where island calm meets personal villa comfort.",
      description: "Choose the room style that best matches your stay rhythm.",
      ratingSymbol: "* * * * *",
      startFromLabel: "Start from",
      nightSuffixLabel: "/ night",
      statusLabel: "Status",
      depositLabel: "Deposit",
      bedsLabel: "Beds",
      passengerLabel: "Passenger",
      detailButtonLabel: "View Detail",
      cta: {
        label: "See More Rooms",
        url: "/reservation"
      }
    },
    availabilityBar
  };
}

function mapListingPage(data: CmsListingPage, fallback: CmsListingPageContent): CmsListingPageContent {
  const cta = data.listingCTA ?? data.finalCTA;

  return {
    hero: {
      eyebrow: data.heroEyebrow ?? fallback.hero.eyebrow,
      heading: data.hero?.heading ?? data.heroHeading ?? fallback.hero.heading,
      description: data.hero?.description ?? data.heroDescription ?? fallback.hero.description,
      image: getMediaUrl(data.hero?.image ?? data.heroImage, fallback.hero.image),
      imageAlt: getMediaAlt(data.hero?.image ?? data.heroImage, fallback.hero.imageAlt)
    },
    availabilityBar: {
      sectionAriaLabel: data.availabilityBar?.sectionAriaLabel ?? fallback.availabilityBar.sectionAriaLabel,
      formAriaLabel: data.availabilityBar?.formAriaLabel ?? fallback.availabilityBar.formAriaLabel,
      checkInLabel: data.availabilityBar?.checkInLabel ?? fallback.availabilityBar.checkInLabel,
      checkOutLabel: data.availabilityBar?.checkOutLabel ?? fallback.availabilityBar.checkOutLabel,
      guestsLabel: data.availabilityBar?.guestsLabel ?? fallback.availabilityBar.guestsLabel,
      promotionLinkLabel: data.availabilityBar?.promotionLinkLabel ?? fallback.availabilityBar.promotionLinkLabel,
      promotionLinkURL: data.availabilityBar?.promotionLinkURL ?? fallback.availabilityBar.promotionLinkURL,
      submitButtonLabel: data.availabilityBar?.submitButtonLabel ?? fallback.availabilityBar.submitButtonLabel,
      submitButtonURL: data.availabilityBar?.submitButtonURL ?? fallback.availabilityBar.submitButtonURL
    },
    intro: {
      eyebrow: data.roomCollection?.eyebrow ?? data.heroEyebrow ?? fallback.intro.eyebrow,
      heading: data.roomCollection?.heading ?? data.introHeading ?? fallback.intro.heading,
      description: data.roomCollection?.description ?? data.introDescription ?? fallback.intro.description
    },
    listing: {
      heading: data.roomCollection?.heading ?? data.listingHeading ?? fallback.listing.heading,
      description: data.roomCollection?.description ?? data.listingDescription ?? fallback.listing.description,
      ratingSymbol: data.roomCollection?.ratingSymbol ?? fallback.listing.ratingSymbol,
      startFromLabel: data.roomCollection?.startFromLabel ?? fallback.listing.startFromLabel,
      nightSuffixLabel: data.roomCollection?.nightSuffixLabel ?? fallback.listing.nightSuffixLabel,
      statusLabel: data.roomCollection?.statusLabel ?? fallback.listing.statusLabel,
      depositLabel: data.roomCollection?.depositLabel ?? fallback.listing.depositLabel,
      bedsLabel: data.roomCollection?.bedsLabel ?? fallback.listing.bedsLabel,
      passengerLabel: data.roomCollection?.passengerLabel ?? fallback.listing.passengerLabel,
      detailButtonLabel: data.roomCollection?.detailButtonLabel ?? fallback.listing.detailButtonLabel,
      cta: (data.roomCollection?.button?.label && data.roomCollection.button.url)
        ? { label: data.roomCollection.button.label, url: data.roomCollection.button.url }
        : cta?.label && cta.url ? { label: cta.label, url: cta.url } : fallback.listing.cta
    },
    seo: data.seo ?? fallback.seo
  };
}

function fallbackFooter(): CmsFooterContent {
  return {
    brand: {
      name: property.name,
      description:
        "Redefining island luxury through the lens of nature and tranquility. A sanctuary for the modern soul seeking peace without compromising on elegance."
    },
    contact: {
      phone: property.phone,
      whatsapp: property.whatsapp,
      email: property.email,
      address: property.address
    },
    navigationColumns: footerNavigation.map((column) => ({
      title: column.title,
      links: column.links.map((link) => ({
        label: link.label,
        url: link.href,
        openInNewTab: false
      }))
    })),
    socialLinks: [
      { platform: "instagram", label: "Instagram", url: "/contact", openInNewTab: false },
      { platform: "whatsapp", label: "WhatsApp", url: `https://wa.me/${property.whatsapp}`, openInNewTab: true },
      { platform: "other", label: "Share", url: "/contact", openInNewTab: false }
    ],
    legalLinks: [
      { label: "Terms", url: "/terms", openInNewTab: false },
      { label: "Privacy", url: "/privacy", openInNewTab: false },
      { label: "Cookies", url: "/cookies", openInNewTab: false }
    ],
    copyrightText: `Copyright (c) 2026 ${property.name}. Manage by Giattech.`
  };
}

function mapCmsFooter(data: CmsFooter): CmsFooterContent {
  const fallback = fallbackFooter();

  return {
    brand: {
      name: property.name,
      description: data.brand?.description ?? data.shortDescription ?? fallback.brand.description
    },
    contact: {
      phone: data.contact?.phone ?? data.contactInformation?.phone ?? fallback.contact.phone,
      whatsapp: data.contact?.whatsapp ?? data.contactInformation?.whatsApp ?? fallback.contact.whatsapp,
      email: data.contact?.email ?? data.contactInformation?.email ?? fallback.contact.email,
      address: data.contact?.address ?? data.contactInformation?.address ?? fallback.contact.address
    },
    navigationColumns:
      data.navigationColumns?.map((column) => ({
        title: column.title ?? "Explore",
        links:
          column.links?.flatMap((link) =>
            link.label && link.url
              ? [
                  {
                    label: link.label,
                    url: link.url,
                    openInNewTab: Boolean(link.openInNewTab)
                  }
                ]
              : []
          ) ?? []
      })) ?? fallback.navigationColumns,
    socialLinks:
      data.socialLinks?.flatMap((link) =>
        link.label && link.url
          ? [
              {
                platform: link.platform ?? "other",
                label: link.label,
                url: link.url,
                openInNewTab: Boolean(link.openInNewTab)
              }
            ]
          : []
      ) ?? fallback.socialLinks,
    legalLinks:
      data.legalLinks?.flatMap((link) =>
        link.label && link.url
          ? [
              {
                label: link.label,
                url: link.url,
                openInNewTab: Boolean(link.openInNewTab)
              }
            ]
          : []
      ) ?? fallback.legalLinks,
    copyrightText: data.copyrightText ?? fallback.copyrightText
  };
}

function fallbackAboutPage(): CmsAboutPageContent {
  return {
    hero: {
      eyebrow: "Est. island mornings",
      heading: "The Philosophy of Stillness",
      description:
        "At Villa Ceningan, comfort is found in slower moments: the pool before breakfast, the hush after a day on the water, and the ease of being cared for without ceremony.",
      image: "/assets/img/hero-bg-2.webp",
      imageAlt: `${property.name} surrounded by quiet island greenery`,
      scrollCueLabel: "Scroll to our story"
    },
    story: {
      eyebrow: property.location,
      heading: "Our Story",
      paragraphs: [
        "Villa Ceningan was shaped as a softer kind of island stay: intimate enough to feel personal, refined enough to feel special, and practical enough for guests who want the details handled clearly.",
        "The villa experience follows the island rhythm rather than fighting it. Morning light, poolside pauses, warm rooms, and direct WhatsApp support create a stay that is calm, responsive, and easy to trust.",
        "Every room, pathway, and arrival detail is designed to help guests move from travel mode into retreat mode."
      ],
      image: property.aboutImage,
      imageAlt: `${property.name} interior story and villa atmosphere`
    },
    principles: {
      eyebrow: "Sustainable Luxury",
      heading: "Luxury is a responsibility.",
      description: "Our commitment is woven into details guests can feel: calm spaces, local care, and less excess.",
      items: aboutPrinciples.map((principle) => ({
        title: principle.title,
        description: principle.description,
        image: principle.image
      }))
    },
    values: aboutPrinciples.map((principle) => ({
      title: principle.title,
      description: principle.description,
      image: principle.image
    })),
    team: {
      heading: "The Stewards of Villa Ceningan",
      quote:
        "We do not design hospitality around noise. We design it around attention, timing, and small comforts that make guests feel expected.",
      members: aboutTeam
    },
    finalCTA: {
      heading: "Reconnect with your island rhythm.",
      label: "Discover Availability",
      url: getWhatsappUrlFromNumber(property.whatsapp),
      image: "/assets/img/hero-coastal-villa.webp",
      imageAlt: `${property.name} peaceful retreat atmosphere`
    },
    seo: null
  };
}

function mapAboutPage(data: CmsAboutPage): CmsAboutPageContent {
  const fallback = fallbackAboutPage();
  const storyText = extractLexicalText(data.storyContent || data.introductionContent);
  const storyParagraphs = data.story?.paragraphs?.map((item) => item.text).filter((item): item is string => Boolean(item)) ??
    (storyText ? [storyText] : fallback.story.paragraphs);
  const finalCTAButton = data.finalCTA && "button" in data.finalCTA ? data.finalCTA.button : data.finalCTA;

  return {
    hero: {
      eyebrow: data.hero?.eyebrow ?? fallback.hero.eyebrow,
      heading: data.hero?.heading ?? data.heroHeading ?? fallback.hero.heading,
      description: data.hero?.description ?? data.heroDescription ?? fallback.hero.description,
      image: getMediaUrl(data.hero?.image ?? data.heroImage, fallback.hero.image),
      imageAlt: getMediaAlt(data.hero?.image ?? data.heroImage, fallback.hero.imageAlt),
      scrollCueLabel: data.hero?.scrollCueLabel ?? fallback.hero.scrollCueLabel
    },
    story: {
      eyebrow: data.story?.eyebrow ?? property.location,
      heading: data.story?.heading ?? data.introductionHeading ?? fallback.story.heading,
      paragraphs: storyParagraphs,
      image: getMediaUrl(data.story?.image ?? data.supportingImages?.[0], fallback.story.image),
      imageAlt: getMediaAlt(data.story?.image ?? data.supportingImages?.[0], fallback.story.imageAlt)
    },
    principles: {
      eyebrow: data.principles?.eyebrow ?? fallback.principles.eyebrow,
      heading: data.principles?.heading ?? fallback.principles.heading,
      description: data.principles?.description ?? fallback.principles.description,
      items:
        data.principles?.items?.flatMap((value) =>
          value.title
            ? [
                {
                  title: value.title,
                  description: value.description ?? "",
                  image: getMediaUrl(value.image, "")
                }
              ]
            : []
        ) ?? fallback.principles.items
    },
    values:
      (data.principles?.items ?? data.values)?.flatMap((value) =>
        value.title
          ? [
              {
                title: value.title,
                description: value.description ?? "",
                image: "image" in value ? getMediaUrl(value.image, "") : undefined
              }
            ]
          : []
      ) ?? fallback.values,
    team: {
      heading: data.team?.heading ?? fallback.team.heading,
      quote: data.team?.quote ?? fallback.team.quote,
      members:
        data.team?.members?.flatMap((member) =>
          member.name
            ? [
                {
                  name: member.name,
                  role: member.role ?? "",
                  description: member.description ?? "",
                  image: getMediaUrl(member.image, fallback.team.members[0]?.image ?? property.aboutImage)
                }
              ]
            : []
        ) ?? fallback.team.members
    },
    finalCTA: {
      ...fallback.finalCTA,
      heading: data.finalCTA && "heading" in data.finalCTA ? data.finalCTA.heading ?? fallback.finalCTA.heading : fallback.finalCTA.heading,
      label: finalCTAButton?.label ?? fallback.finalCTA.label,
      url: finalCTAButton?.url ?? fallback.finalCTA.url,
      image: getMediaUrl(data.finalCTA && "image" in data.finalCTA ? data.finalCTA.image : undefined, fallback.finalCTA.image),
      imageAlt: getMediaAlt(data.finalCTA && "image" in data.finalCTA ? data.finalCTA.image : undefined, fallback.finalCTA.imageAlt)
    },
    seo: data.seo ?? fallback.seo
  };
}

function fallbackContactPage(): CmsContactPageContent {
  return {
    hero: {
      eyebrow: "Contact",
      heading: "Get in Touch",
      description: "A gateway to calm island comfort awaits. Reach out to our concierge for your Villa Ceningan stay.",
      image: "/assets/img/hero-bg-2.webp",
      imageAlt: `${property.name} tropical island view`
    },
    contactHeading: "Reach Us Directly",
    contactDescription:
      "Our team can help arrange island transfers, room preferences, private meals, and simple arrival support before your stay begins.",
    phone: property.phone,
    email: property.email,
    whatsApp: property.whatsapp,
    address: property.address,
    mapEmbedURL: property.mapEmbedUrl,
    operationalHours: [],
    finalCTA: {
      label: "Get Directions",
      url: getWhatsappUrlFromNumber(property.whatsapp, "Hello Villa Ceningan, please share directions to the villa.")
    },
    seo: null
  };
}

function mapContactPage(data: CmsContactPage): CmsContactPageContent {
  const fallback = fallbackContactPage();

  return {
    hero: {
      eyebrow: fallback.hero.eyebrow,
      heading: data.heroHeading ?? fallback.hero.heading,
      description: data.heroDescription ?? fallback.hero.description,
      image: getMediaUrl(data.heroImage, fallback.hero.image),
      imageAlt: getMediaAlt(data.heroImage, fallback.hero.imageAlt)
    },
    contactHeading: data.contactHeading ?? fallback.contactHeading,
    contactDescription: data.contactDescription ?? fallback.contactDescription,
    phone: data.phone ?? fallback.phone,
    email: data.email ?? fallback.email,
    whatsApp: data.whatsApp ?? fallback.whatsApp,
    address: data.address ?? fallback.address,
    mapEmbedURL: data.mapEmbedURL ?? fallback.mapEmbedURL,
    operationalHours:
      data.operationalHours?.flatMap((item) =>
        item.label && item.hours ? [{ label: item.label, hours: item.hours }] : []
      ) ?? fallback.operationalHours,
    finalCTA: ctaFromCms(data.finalCTA, fallback.finalCTA),
    seo: data.seo ?? fallback.seo
  };
}

function fallbackReservationPage(): CmsReservationContent {
  return {
    hero: {
      eyebrow: "Reservation",
      heading: "Reservation",
      description: "Start a direct villa inquiry and let our team confirm availability through WhatsApp.",
      image: property.heroImage,
      imageAlt: `${property.name} reservation preview`
    },
    reservationSearchItems,
    reservationRoomDetails,
    reservationOverview,
    whatsAppCTA: {
      label: "Confirm your reservation",
      url: getWhatsappUrlFromNumber(property.whatsapp)
    },
    seo: null
  };
}

function fallbackLegalPage(slug: LegalPageContent["slug"]) {
  return getLegalPage(slug) ?? null;
}

function mapLegalPage(slug: LegalPageContent["slug"], data: CmsLegalPages): (LegalPageContent & { seo?: CmsSeo | null }) | null {
  const cmsPage = data[slug];
  const fallback = fallbackLegalPage(slug);

  if (!cmsPage?.title || !fallback) {
    return fallback ? { ...fallback, seo: null } : null;
  }

  return {
    slug,
    eyebrow: cmsPage.eyebrow ?? fallback.eyebrow,
    title: cmsPage.title,
    summary: cmsPage.summary ?? fallback.summary,
    updatedAt: cmsPage.updatedAtLabel ?? formatLegalDate(cmsPage.updatedAt, fallback.updatedAt),
    sections:
      cmsPage.sections?.map((section, index) => ({
        title: section.title ?? fallback.sections[index]?.title ?? "Policy Section",
        body:
          section.body?.map((item) => item.paragraph).filter((item): item is string => Boolean(item)) ??
          fallback.sections[index]?.body ??
          []
      })) ?? fallback.sections,
    seo: cmsPage.seo ?? null
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
      eyebrow: data.introduction?.eyebrow ?? fallback.introduction.eyebrow,
      heading: data.introduction?.heading ?? fallback.introduction.heading,
      description: data.introduction?.description ?? fallback.introduction.description,
      image: getMediaUrl(data.introduction?.image, fallback.introduction.image),
      imageAlt: getMediaAlt(data.introduction?.image, fallback.introduction.imageAlt)
    },
    bookingPreview: {
      sectionAriaLabel: data.bookingPreview?.sectionAriaLabel ?? fallback.bookingPreview.sectionAriaLabel,
      formAriaLabel: data.bookingPreview?.formAriaLabel ?? fallback.bookingPreview.formAriaLabel,
      checkInLabel: data.bookingPreview?.checkInLabel ?? fallback.bookingPreview.checkInLabel,
      checkOutLabel: data.bookingPreview?.checkOutLabel ?? fallback.bookingPreview.checkOutLabel,
      guestsLabel: data.bookingPreview?.guestsLabel ?? fallback.bookingPreview.guestsLabel,
      promotionLinkLabel: data.bookingPreview?.promotionLinkLabel ?? fallback.bookingPreview.promotionLinkLabel,
      promotionLinkURL: data.bookingPreview?.promotionLinkURL ?? fallback.bookingPreview.promotionLinkURL,
      submitButtonLabel: data.bookingPreview?.submitButtonLabel ?? fallback.bookingPreview.submitButtonLabel,
      submitButtonURL: data.bookingPreview?.submitButtonURL ?? fallback.bookingPreview.submitButtonURL
    },
    featuredRooms: {
      ...fallback.featuredRooms,
      eyebrow: data.typeOfRooms?.eyebrow ?? data.featuredRooms?.eyebrow ?? fallback.featuredRooms.eyebrow,
      heading: data.typeOfRooms?.heading ?? data.featuredRooms?.heading ?? fallback.featuredRooms.heading,
      description: data.typeOfRooms?.description ?? data.featuredRooms?.description ?? fallback.featuredRooms.description
    },
    signatureExperiences: {
      ...fallback.signatureExperiences,
      eyebrow: data.signatureExperiences?.eyebrow ?? fallback.signatureExperiences.eyebrow,
      heading: data.signatureExperiences?.heading ?? fallback.signatureExperiences.heading,
      description: data.signatureExperiences?.description ?? fallback.signatureExperiences.description,
      cta: ctaFromCms(data.signatureExperiences?.button, fallback.signatureExperiences.cta ?? { label: "All Signature Service", url: "/services" })
    },
    journalPreview: {
      ...fallback.journalPreview,
      eyebrow: data.journalPreview?.eyebrow ?? fallback.journalPreview.eyebrow,
      heading: data.journalPreview?.heading ?? fallback.journalPreview.heading,
      description: data.journalPreview?.description ?? fallback.journalPreview.description,
      cta: ctaFromCms(data.journalPreview?.button ?? data.journalPreview?.cta, fallback.journalPreview.cta ?? { label: "View All Journal", url: "/blog" })
    },
    finalCTA: {
      ...fallback.finalCTA,
      heading: data.finalCTA?.heading ?? fallback.finalCTA.heading,
      description: data.finalCTA?.description ?? fallback.finalCTA.description,
      cta:
        data.finalCTA?.buttonLabel && data.finalCTA.buttonURL
          ? {
              label: data.finalCTA.buttonLabel,
              url: data.finalCTA.buttonURL
            }
          : fallback.finalCTA.cta,
      image: getMediaUrl(data.finalCTA?.backgroundImage, fallback.finalCTA.image ?? property.heroImage),
      imageAlt: getMediaAlt(data.finalCTA?.backgroundImage, fallback.finalCTA.imageAlt ?? property.name)
    },
    contactPreview: {
      eyebrow: data.contactPreview?.eyebrow ?? fallback.contactPreview.eyebrow,
      heading: data.contactPreview?.heading ?? fallback.contactPreview.heading,
      description: data.contactPreview?.description ?? fallback.contactPreview.description,
      locationHeading: data.contactPreview?.locationHeading ?? fallback.contactPreview.locationHeading,
      address: data.contactPreview?.address ?? fallback.contactPreview.address,
      emailLabel: data.contactPreview?.emailLabel ?? fallback.contactPreview.emailLabel,
      email: data.contactPreview?.email ?? fallback.contactPreview.email,
      phoneLabel: data.contactPreview?.phoneLabel ?? fallback.contactPreview.phoneLabel,
      phone: data.contactPreview?.phone ?? fallback.contactPreview.phone,
      mapEmbedURL: data.contactPreview?.mapEmbedURL ?? fallback.contactPreview.mapEmbedURL
    },
    seo: data.seo ?? fallback.seo
  };
}

export async function getCmsHomePage() {
  const data = await fetchCms<CmsHomePage>(globalPath("home-page", 2), 30);

  if (!isPublishedGlobal(data, "home-page")) {
    return fallbackHomePage();
  }

  return mapCmsHomePage(data);
}

export async function getCmsSiteSettings() {
  const data = await fetchCms<CmsSiteSettings>(globalPath("site-settings", 2), 30);

  if (!isPublishedGlobal(data, "site-settings")) {
    return fallbackSiteSettings();
  }

  return mapSiteSettings(data);
}

export async function getCmsHeader() {
  const data = await fetchCms<CmsHeader>(globalPath("header", 2), 30);

  if (!isPublishedGlobal(data, "header")) {
    return fallbackHeader();
  }

  return mapHeader(data);
}

export async function getCmsAboutPage() {
  const data = await fetchCms<CmsAboutPage>(globalPath("about-page", 2), 30);

  if (!isPublishedGlobal(data, "about-page")) {
    return fallbackAboutPage();
  }

  return mapAboutPage(data);
}

export async function getCmsContactPage() {
  const data = await fetchCms<CmsContactPage>(globalPath("contact-page", 2), 30);

  if (!isPublishedGlobal(data, "contact-page")) {
    return fallbackContactPage();
  }

  return mapContactPage(data);
}

export async function getCmsRoomsPage() {
  const fallback = fallbackListingPage("rooms");
  const data = await fetchCms<CmsListingPage>(globalPath("rooms-page", 2), 30);

  if (!isPublishedGlobal(data, "rooms-page")) {
    return fallback;
  }

  return mapListingPage(data, fallback);
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

export async function getCmsRoomBySlug(slug: string): Promise<CmsRoomItem | null> {
  const data = await fetchCms<CmsCollectionResponse<CmsRoom>>(
    collectionPath("rooms", `where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&depth=2`),
    120
  );
  const fallback = fallbackRooms.find((room) => room.slug === slug);

  if (!data?.docs[0]) {
    return fallback ? { ...fallback, seo: null } : null;
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

export async function getCmsServicesPage() {
  const fallback = fallbackListingPage("services");
  const data = await fetchCms<CmsListingPage>(globalPath("services-page", 2), 30);

  if (!isPublishedGlobal(data, "services-page")) {
    return fallback;
  }

  return mapListingPage(data, fallback);
}

export async function getCmsServiceBySlug(slug: string): Promise<CmsServiceItem | null> {
  const data = await fetchCms<CmsCollectionResponse<CmsService>>(
    collectionPath("services", `where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&depth=2`),
    300
  );
  const fallback = fallbackServices.find((service) => service.slug === slug);

  if (!data?.docs[0]) {
    return fallback ? { ...fallback, seo: null } : null;
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

export async function getCmsBlogPage() {
  const fallback = fallbackListingPage("blog");
  const data = await fetchCms<CmsListingPage>(globalPath("blog-page", 2), 30);

  if (!isPublishedGlobal(data, "blog-page")) {
    return fallback;
  }

  return mapListingPage(data, fallback);
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
  const data = await fetchCms<CmsReservationPage>(globalPath("reservation-page", 2), 120);
  const fallback = fallbackReservationPage();

  if (!isPublishedGlobal(data, "reservation-page")) {
    return fallback;
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
    hero: {
      eyebrow: data.heroEyebrow ?? fallback.hero.eyebrow,
      heading: data.heroHeading ?? fallback.hero.heading,
      description: data.heroDescription ?? fallback.hero.description,
      image: getMediaUrl(data.heroImage, fallback.hero.image),
      imageAlt: getMediaAlt(data.heroImage, fallback.hero.imageAlt)
    },
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
    },
    whatsAppCTA: ctaFromCms(data.whatsAppCTA, fallback.whatsAppCTA),
    seo: data.seo ?? fallback.seo
  };
}

export async function getCmsLegalPage(slug: LegalPageContent["slug"]): Promise<(LegalPageContent & { seo?: CmsSeo | null }) | null> {
  const data = await fetchCms<CmsLegalPages>(globalPath("legal-pages", 2), 30);

  if (!isPublishedGlobal(data, "legal-pages")) {
    const fallback = fallbackLegalPage(slug);
    return fallback ? { ...fallback, seo: null } : null;
  }

  return mapLegalPage(slug, data);
}

export async function getCmsFooter() {
  const data = await fetchCms<CmsFooter>(globalPath("footer", 2), 30);

  if (!isPublishedGlobal(data, "footer")) {
    return fallbackFooter();
  }

  return mapCmsFooter(data);
}
