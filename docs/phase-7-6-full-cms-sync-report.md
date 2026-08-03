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
- Home Page Global cleanup follow-up maps `bookingPreview`, `typeOfRooms`, section eyebrows, section `button` groups, and `contactPreview` so the CMS mirrors the actual Home page order.
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

## Home Page Section Contract

The Home route now expects this CMS order:

1. `hero`
2. `bookingPreview`
3. `introduction`
4. `signatureExperiences`
5. `typeOfRooms`
6. `testimonialNote`
7. `journalPreview`
8. `contactPreview`

Regular section links use `button`, not `cta`. Testimonial remains a note because the section is planned for Google Reviews or another external review source.

## About and Rooms Section Contract

The About route now expects this CMS order:

1. `hero`
2. `story`
3. `principles`
4. `team`
5. `finalCTA`

The Rooms route now expects this CMS order:

1. `hero`
2. `availabilityBar`
3. `roomCollection`

Rooms card labels, detail button text, availability form labels, and About team/principle content are editable from CMS.

## Services and Contact Section Contract

The Services route now expects this CMS order:

1. `hero`
2. `intro`
3. `signatureServices`
4. `tailoredMoment`
5. `finalCTA`

The Contact route now expects this CMS order:

1. `hero`
2. `contactInquiry`
3. `contactForm`
4. `mapSection`
5. `quote`

Services CTA buttons, tailored moment labels, Contact methods, Contact form labels/placeholders/options, map copy, and quote copy are editable from CMS.

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
- Home testimonial remains reserved for a future Google Reviews or external review source.

CMS follow-up:

- Consider adding `gallery-page` Global for hero/SEO.
- Continue applying the section-order alignment rule page by page before Phase 8.

Frontend follow-up:

- Add `/blog/[slug]` route when blog detail pages are in scope.
- Fix frontend lint tooling by replacing the obsolete `next lint` script with a supported ESLint config.
