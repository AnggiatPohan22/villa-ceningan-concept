const DEFAULT_REVALIDATE_SECONDS = 60;

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

export async function fetchCms<T>(path: string, revalidate = DEFAULT_REVALIDATE_SECONDS): Promise<T | null> {
  const url = resolveCmsUrl(path);

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      next: {
        revalidate
      }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
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
  if (!media || typeof media !== "object") {
    return fallback;
  }

  const value = media as CmsMedia;
  const url = value.sizes?.desktop?.url ?? value.sizes?.card?.url ?? value.url;

  if (!url) {
    return fallback;
  }

  if (url.startsWith("http") || url.startsWith("/")) {
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

