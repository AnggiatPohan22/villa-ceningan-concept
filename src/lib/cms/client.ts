const DEFAULT_REVALIDATE_SECONDS = 60;
const isDevelopment = process.env.NODE_ENV !== "production";

export type CmsCollectionResponse<T> = {
  docs: T[];
  totalDocs?: number;
  limit?: number;
  page?: number;
  totalPages?: number;
};

export type CmsMedia = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: Record<
    string,
    {
      url?: string | null;
      width?: number | null;
      height?: number | null;
    }
  > | null;
};

export function getCmsBaseUrl() {
  return process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/$/, "") ?? "";
}

export function hasCmsBaseUrl() {
  return getCmsBaseUrl().length > 0;
}

export function resolveCmsUrl(path: string) {
  const baseUrl = getCmsBaseUrl();

  if (!baseUrl) {
    return "";
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function warnCms(message: string, detail?: unknown) {
  if (!isDevelopment) {
    return;
  }

  if (detail) {
    console.warn(`[CMS] ${message}`, detail);
    return;
  }

  console.warn(`[CMS] ${message}`);
}

export async function fetchCms<T>(path: string, revalidate = DEFAULT_REVALIDATE_SECONDS): Promise<T | null> {
  const url = resolveCmsUrl(path);

  if (!url) {
    warnCms(`Falling back to local data because NEXT_PUBLIC_CMS_URL is not set for ${path}.`);
    return null;
  }

  try {
    const response = await fetch(url, {
      ...(isDevelopment
        ? { cache: "no-store" as const }
        : {
            next: {
              revalidate
            }
          })
    });

    if (!response.ok) {
      warnCms(`Falling back to local data because ${path} returned ${response.status}.`);
      return null;
    }

    warnCms(`Using CMS data for ${path}.`);
    return (await response.json()) as T;
  } catch (error) {
    warnCms(`Falling back to local data because ${path} could not be fetched.`, error);
    return null;
  }
}

export function collectionPath(slug: string, query: string) {
  return `/api/${slug}?${query}`;
}

export function globalPath(slug: string, depth = 1) {
  return `/api/globals/${slug}?depth=${depth}`;
}

export function getMediaUrl(media: unknown, fallback: string) {
  if (typeof media === "string") {
    if (media.startsWith("http")) {
      return media;
    }

    if (media.startsWith("/api/media/file/")) {
      return resolveCmsUrl(media) || fallback;
    }

    return media.startsWith("/") ? media : fallback;
  }

  if (!media || typeof media !== "object") {
    return fallback;
  }

  const value = media as CmsMedia & { filename?: string | null };
  const url = value.sizes?.desktop?.url ?? value.sizes?.card?.url ?? value.url ?? (value.filename ? `/api/media/file/${value.filename}` : null);

  if (!url) {
    warnCms("Invalid media source from CMS, using local fallback image.");
    return fallback;
  }

  if (url.startsWith("http")) {
    return url;
  }

  if (url.startsWith("/api/media/file/")) {
    return resolveCmsUrl(url) || fallback;
  }

  if (url.startsWith("/")) {
    warnCms(`CMS media returned a non-media relative URL (${url}), using it as-is.`);
    return url;
  }

  return resolveCmsUrl(url) || fallback;
}

export function getMediaAlt(media: unknown, fallback: string) {
  if (!media || typeof media !== "object") {
    return fallback;
  }

  const value = media as CmsMedia;

  return value.alt ?? fallback;
}

export function extractLexicalText(value: unknown, fallback = "") {
  const chunks: string[] = [];

  function walk(node: unknown) {
    if (!node || typeof node !== "object") {
      return;
    }

    const record = node as { text?: unknown; children?: unknown };

    if (typeof record.text === "string") {
      chunks.push(record.text);
    }

    if (Array.isArray(record.children)) {
      record.children.forEach(walk);
    }
  }

  walk(value);

  return chunks.join(" ").trim() || fallback;
}
