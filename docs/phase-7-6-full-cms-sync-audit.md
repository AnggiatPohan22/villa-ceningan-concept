# Phase 7.6 Full CMS Sync Audit

Date: 3 Agustus 2026

Scope: frontend repo `C:\laragon\www\villa-ceningan` on branch `phase-6-cms-integration`.

CMS reference: Payload CMS at `http://localhost:3000`.

## Route Audit Matrix

| Route | Component | CMS endpoint | Frontend field | CMS field | Status |
| --- | --- | --- | --- | --- | --- |
| `/` | `HomeHeroSection` | `/api/globals/home-page?depth=2` | hero eyebrow, heading, description, image, CTAs | `hero.*` | connected |
| `/` | `HomeAboutSection` | `/api/globals/home-page?depth=2` | intro heading, description, image | `introduction.*` | connected |
| `/` | `HomeRoomsShowcaseSection` | `/api/globals/home-page`, `/api/rooms` | section heading and room cards | `featuredRooms.*`, rooms collection | connected |
| `/` | `HomeSignatureExperiencesSection` | `/api/globals/home-page`, `/api/services` | section heading, CTA, service cards | `signatureExperiences.*`, services collection | connected |
| `/` | `HomeJournalPreviewSection` | `/api/globals/home-page`, `/api/blog` | section heading, CTA, article cards | `journalPreview.*`, blog collection | connected |
| `/` | `HomeTestimonialSection` | none | testimonial heading/content | no selected testimonial field in current home global | CMS follow-up |
| `/` | `HomeContactPreviewSection` | none | contact preview copy/map | no dedicated home contact section field | CMS follow-up |
| `/villa` | route page + `RoomsSection` | `/api/globals/about-page`, `/api/rooms` | hero copy and room cards | `about-page.hero*`, rooms collection | connected |
| `/about-us` | `AboutUsPageSections` | `/api/globals/about-page?depth=2` | hero, story, values, final CTA, SEO | `about-page.*`, `seo.*` | connected |
| `/rooms` | `RoomsPageSections` | `/api/globals/rooms-page`, `/api/rooms` | hero, intro, listing, CTA, room cards, SEO | `rooms-page.*`, rooms collection | connected |
| `/rooms/[slug]` | `RoomDetailPageSections` | `/api/rooms?where[slug][equals]=...&where[status][equals]=published&depth=2` | room title, descriptions, amenities, gallery, SEO | rooms collection + `seo.*` | connected |
| `/services` | `ServicesPageSections` | `/api/globals/services-page`, `/api/services` | hero, intro, listing CTA, service cards, SEO | `services-page.*`, services collection | connected when global is published |
| `/services/[slug]` | `ServiceDetailPageSections` | `/api/services?where[slug][equals]=...&where[status][equals]=published&depth=2` | service title, description, image, rituals, gallery, SEO | services collection + `seo.*` | connected |
| `/gallery` | route page + `GallerySection` | `/api/gallery?where[status][equals]=published&sort=sortOrder&depth=2` | gallery images | gallery collection image | image list connected, hero has no CMS source |
| `/reservation` | `ReservationPageSections` | `/api/globals/reservation-page`, `/api/rooms` | hero, room details, overview, SEO | `reservation-page.*`, rooms collection | connected |
| `/blog` | `BlogPageSections` | `/api/globals/blog-page`, `/api/blog` | hero, listing, articles, SEO | `blog-page.*`, blog collection | connected |
| `/blog/[slug]` | none | none | blog detail route | blog collection `content` | route missing |
| `/contact` | route page | `/api/globals/contact-page?depth=2` | hero, contact details, map, final CTA, SEO | `contact-page.*`, `seo.*` | connected |
| `/terms` | `LegalPageSections` | `/api/globals/legal-pages?depth=2` | terms hero/content/SEO | `legal-pages.terms.*` | connected when global is published |
| `/privacy` | `LegalPageSections` | `/api/globals/legal-pages?depth=2` | privacy hero/content/SEO | `legal-pages.privacy.*` | connected when global is published |
| `/cookies` | `LegalPageSections` | `/api/globals/legal-pages?depth=2` | cookies hero/content/SEO | `legal-pages.cookies.*` | connected when global is published |
| global layout | `SiteHeader` + `MobileMenu` | `/api/globals/header?depth=2` | navigation labels, routes, logo, CTA | `header.*` | connected when global is published |
| global layout | `SiteFooter` | `/api/globals/footer?depth=2` | brand, contact, nav columns, socials, legal links | `footer.*` | connected |
| global layout | metadata | `/api/globals/site-settings?depth=2` | default title, description, OG image | `site-settings.*`, `seo.*` | connected when global is published |

## Hardcoded Content Found

- Header navigation and booking CTA were read only from `src/data/navigation.ts`.
- `/about-us` rendered hero/story/CTA from hardcoded JSX and `src/data/about.ts`.
- `/villa` used static hero copy despite having `about-page` CMS content.
- `/reservation` used CMS room/overview data but not CMS hero or SEO.
- Legal pages rendered only `src/data/legal.ts`.
- Home section headings for rooms, services, and journal ignored existing `home-page` Global section fields.
- Page metadata for listing/fixed pages used static `metadata` objects instead of CMS `seo`.

## Remaining Gaps

- `/gallery` has CMS images connected, but no `gallery-page` Global exists for hero/SEO copy.
- `/blog/[slug]` does not exist in the current frontend route tree.
- Home testimonial/contact preview remain fallback-driven because current CMS schema has no direct selected testimonial/contact preview fields wired for those exact sections.
- Header, site settings, services page, and legal pages must be published in CMS before the published-only guard allows them to appear.
