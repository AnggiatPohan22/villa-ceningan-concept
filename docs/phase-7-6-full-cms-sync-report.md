# Phase 7.6 Full CMS Sync Report

Date: 3 Agustus 2026

## Summary

Phase 7.6 connects the remaining frontend content surfaces to Payload CMS where CMS fields already exist. Static fallback data remains in place and is used only when CMS is unavailable, returns invalid data, or a draft Global is protected by the published-only frontend guard.

## Connected in This Phase

- Header Global to desktop/mobile navigation, logo fallback, and booking CTA.
- Site Settings Global to root/default metadata.
- About Page Global to `/about-us` and shared `/villa` hero copy.
- Rooms Page, Services Page, and Blog Page Globals to listing page metadata.
- Reservation Page Global to reservation hero and metadata.
- Contact Page Global to contact hero, contact details, map URL, CTA, and metadata.
- Legal Pages Global to `/terms`, `/privacy`, and `/cookies`.
- Home Page Global section fields to rooms/services/journal section headings and CTAs.
- Room, Service, and Blog collection SEO fields to mapped collection objects.

## Metadata Sync

The following routes now use `generateMetadata` with CMS SEO fallback:

- `/`
- `/about-us`
- `/villa`
- `/rooms`
- `/rooms/[slug]`
- `/services`
- `/services/[slug]`
- `/reservation`
- `/blog`
- `/terms`
- `/privacy`
- `/cookies`
- root layout default metadata via `site-settings`

`/gallery` still uses static metadata because the CMS currently has gallery collection items but no page-level `gallery-page` Global.

## Header and Footer

- `SiteHeader` now fetches `header` Global through `getCmsHeader()`.
- `MobileMenu` receives CMS header data as props while keeping client-side active-menu behavior.
- `SiteFooter` already fetched Footer Global and remains connected.
- Header and site settings changes only show when their Payload Globals are published.

## Media Handling

- Existing media normalization continues to support absolute URLs, `/api/media/file/...`, media objects with `url`, media objects with `filename`, and generated `sizes`.
- New page mappers use `getMediaUrl()` and `getMediaAlt()` before passing images to `next/image`.
- Missing CMS images keep local fallback images.

## Cache and Fallback

- Development fetches remain `cache: "no-store"` through `fetchCms()`.
- Production fetches use the existing `next.revalidate` behavior.
- `[CMS]` warnings remain development-only and explain CMS usage or fallback reason.
- Published-only Global guard remains active. Draft Globals fall back intentionally.

## Manual Test Checklist

1. Publish Header, Site Settings, Services Page, and Legal Pages if they are still draft.
2. Edit Home Page hero heading and section headings, then refresh `/`.
3. Edit Rooms Page heading, then refresh `/rooms`.
4. Edit Services Page heading, then refresh `/services`.
5. Edit Blog Page heading, then refresh `/blog`.
6. Edit Legal Pages Terms title/content, then refresh `/terms`.
7. Edit Footer contact/links, then refresh any frontend page footer.
8. Edit Header navigation label/CTA, then refresh any frontend page header and mobile menu.
9. Edit room title/image, then check `/rooms` and `/rooms/[slug]`.
10. Edit service title/image, then check `/services` and `/services/[slug]`.
11. Check `/gallery` images render from CMS collection items.
12. Temporarily set `NEXT_PUBLIC_CMS_URL=http://localhost:9999`, restart frontend, and verify fallback pages still render.

## Remaining Gaps Before Phase 8

Blocker before Phase 8:

- Publish important Globals that are currently draft in local CMS before manual smoke testing their frontend sync.
- Decide whether `/gallery` needs a `gallery-page` Global before deployment.

Non-blocker:

- `/blog/[slug]` route does not exist yet; blog detail content cannot be smoke tested until the route is created.
- Home testimonial/contact preview are still fallback-based because no exact CMS section source exists for those frontend components.

CMS follow-up:

- Consider adding `gallery-page` Global for hero/SEO.
- Consider adding dedicated Home testimonial/contact preview fields if those must be staff-editable.

Frontend follow-up:

- Add `/blog/[slug]` route when blog detail pages are in scope.
- Fix frontend lint tooling by replacing the obsolete `next lint` script with a supported ESLint config.
