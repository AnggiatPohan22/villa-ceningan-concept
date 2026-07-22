# Villa Ceningan Next.js Grand Master Plan

Date: 2026-07-21
Project root: `C:\laragon\www\villa-ceningan`
Target framework: Next.js App Router
Last updated: 2026-07-22

## 1. Goal

Build this project into a reusable premium hospitality website foundation for villas, guest houses, boutique hotels, and small resorts.

The long-term product should support:

- Strong marketing pages with excellent mobile experience.
- Property, room, facility, gallery, FAQ, and location content managed in a reusable structure.
- Booking inquiry first, then real-time availability, then confirmed reservations.
- A path toward direct booking, payment, admin management, and channel-manager integration.

## 2. Current Baseline

The original project is a static BootstrapMade Dewi HTML template. It contains:

- `index.html` as the only partially customized Villa Ceningan page.
- Legacy template pages: `service-details.html`, `portfolio-details.html`, `starter-page.html`.
- Vendor assets in `assets/vendor`.
- Large unoptimized JPG images in `assets/img`.
- PHP contact form files in `forms`, but the required BootstrapMade pro PHP email library is missing.

The first Next.js foundation has been scaffolded beside the original files:

- [Done] `package.json`
- [Done] `next.config.mjs`
- [Done] `tsconfig.json`
- [Done] `src/app/layout.tsx`
- [Done] `src/app/page.tsx`
- [Done] `src/app/globals.css`
- [Done] `src/data/property.ts`
- [Done] selected runtime images under `public/assets/img`

The old static files should be treated as migration references until the Next.js version fully replaces them.

## 3. Recommended Architecture

Use Next.js App Router with TypeScript.

Recommended folder direction:

```text
src/
  app/
    page.tsx
    rooms/
      page.tsx
      [slug]/
        page.tsx
    gallery/
      page.tsx
    booking/
      page.tsx
    contact/
      page.tsx
    api/
      availability/
        route.ts
      booking-inquiries/
        route.ts
  components/
    layout/
    marketing/
    booking/
    room/
    shared/
  data/
    property.ts
    rooms.ts
    facilities.ts
    gallery.ts
    faqs.ts
  lib/
    booking/
    seo/
    validators/
  styles/
```

Recommended production stack:

- Next.js for frontend and API routes.
- PostgreSQL for real booking and availability data.
- Prisma or Drizzle ORM for schema and migrations.
- Zod for request validation.
- Resend, SMTP, or WhatsApp gateway for notifications.
- Stripe, Xendit, or Midtrans for payments when deposit/payment is required.
- Vercel, Cloudflare Pages, or Node hosting depending on backend needs.

## 4. Feature Roadmap

### Phase 1 - Foundation and Template Quality

Purpose: make the site presentable, fast, and reusable before complex booking logic.

Tasks:

- [Done] Replace all remaining generic Dewi wording in the Next.js app with hospitality-specific copy.
- [Done] Convert homepage sections into reusable components.
- [Done] Add dedicated data files for property profile, rooms, facilities, FAQ, gallery, and policies.
- [Done] Add SEO metadata, Open Graph image, canonical handling, and lodging structured data.
- [Done] Optimize copied Next.js runtime images into WebP and remove unused copied JPG files from `public/assets/img`.
- [Done] Add responsive CSS for mobile, tablet, and desktop layouts.
- [In Progress] Add browser screenshot QA for mobile, tablet, and desktop.
- [Done] Add README with local setup, build, and deployment instructions.
- [Done] Add `/villa` page as the villa/room landing page.
- [Done] Add three room types with varied pricing: Island Suite, Garden Villa, and Family Stay.
- [Done] Generate sample luxury room images and save optimized WebP assets under `public/assets/img/rooms`.
- [Done] Add luxury motion polish with CSS animations, hover states, and reduced-motion support.
- [Done] Redesign homepage hero and menu into a dark editorial coastal villa layout inspired by the provided reference.
- [Done] Generate and optimize a coastal villa hero image at `public/assets/img/hero-coastal-villa.webp`.
- [Done] Move homepage booking preferences into the hero image composition for a more unique landing experience.
- [Done] Refine hero layout after visual QA so the hero image, headline, and booking panel no longer overlap messily.
- [Done] Return homepage tone to the green footer palette and reduce sharp corners on header, buttons, image frame, and booking form.
- [Done] Adjust header menu shape from long pill to a softer rectangular bar with moderate radius.
- [Done] Convert index hero to a full-image hero with headline, intro copy, CTA, and booking form layered on top of the image.
- [Done] Add a mobile header menu so navigation remains available on small screens.

Deliverable:

- A polished static Next.js hospitality template that can be adapted for multiple properties by editing data files.

### Phase 2 - Booking Inquiry Flow

Purpose: capture booking intent without overbuilding inventory logic too early.

Tasks:

- [Done] Add `/booking` page.
- [In Progress] Build date picker, guest count, room preference, guest details, and special request fields.
- [Pending] Validate form data.
- [Pending] Submit inquiry to an API route.
- [Pending] Send email or WhatsApp-ready inquiry message.
- [Pending] Store inquiry records if a database is introduced.

Deliverable:

- Users can submit a structured booking inquiry.
- Property owner receives actionable booking details.

### Phase 3 - Room Inventory Model

Purpose: prepare the data layer for real availability.

Core entities:

- Property
- RoomType
- RoomUnit
- RatePlan
- SeasonalRate
- AvailabilityBlock
- Booking
- BookingGuest
- BookingPayment

Important rules:

- Separate room type from physical room unit.
- Keep manual blocks separate from confirmed bookings.
- Model check-in and check-out as date ranges where check-out date is not occupied.
- Keep pricing rules versioned or auditable once payment is active.

Deliverable:

- Database-backed room and availability structure.

### Phase 4 - Real-Time Availability

Purpose: let guests check whether rooms are available for selected dates.

Tasks:

- Build `/api/availability` endpoint.
- Accept check-in, check-out, guests, room type, and optional promo code.
- Return available room types, available unit count, nightly prices, taxes/fees, and booking constraints.
- Add optimistic UI states and clear unavailable messaging.
- Add admin/manual blocking interface later if needed.

Deliverable:

- Guest-facing availability results are calculated from real inventory data.

### Phase 5 - Reservation and Payment

Purpose: turn availability into confirmed bookings.

Tasks:

- Add booking summary and guest detail step.
- Hold inventory for a limited time during checkout.
- Add deposit or full-payment flow.
- Send confirmation email/WhatsApp.
- Generate booking reference numbers.
- Add cancellation and modification policy.

Deliverable:

- Guests can create confirmed reservations.

### Phase 6 - Admin and Operations

Purpose: let the property team operate the website without editing code.

Tasks:

- Add protected admin dashboard.
- Manage property profile, rooms, rates, availability blocks, gallery, testimonials, and inquiries.
- Add booking calendar.
- Add export/reporting.
- Add audit logs for booking and rate changes.

Deliverable:

- A complete operational hospitality website.

## 5. Template Product Strategy

The project should be built as a configurable hospitality starter, not a one-off website.

Recommended configurable data:

- Brand name, logo, location, contact, WhatsApp number.
- Property type: villa, guest house, hotel, resort.
- Theme tokens: colors, typography, button style.
- Hero media.
- Room types.
- Facilities.
- Gallery.
- Testimonials.
- FAQs.
- Policies.
- Map embed and nearby attractions.

Recommended template variants:

- Single villa.
- Multi-room guest house.
- Boutique hotel.
- Resort landing page.

## 6. Technical Standards

- TypeScript strict mode.
- App Router.
- Server Components by default.
- Client Components only for interactive booking widgets.
- Keep business rules in `src/lib`, not directly inside UI components.
- Use structured data for SEO.
- Use responsive image sizes and optimized formats.
- Avoid hardcoded property content inside components once Phase 1 is complete.
- Use accessible labels for all booking controls.
- Keep WhatsApp as the first conversion fallback even after full booking is added.

## 7. Immediate Next Steps

1. [Done] Run dependency installation with `npm.cmd install`.
2. [Done] Run `npm.cmd run dev`.
3. [Done] Open the local Next.js preview.
4. [Pending] Replace placeholder phone, email, and WhatsApp values in `src/data/property.ts`.
5. [Done] Optimize copied images under `public/assets/img`.
6. [Done] Split homepage into components.
7. [Done] Add room and booking pages.
8. [Pending] Decide whether the first production release should use inquiry-only booking or database-backed availability.
9. [Done] Add `/villa` landing page and three priced room types.
10. [Done] Add generated room sample images for Island Suite, Garden Villa, and Family Stay.
11. [Done] Redesign index hero/menu with dark luxury coastal concept and responsive hero booking panel.
12. [Done] Polish index hero/menu/form from latest screenshot: green tone, softer radius, cleaner hero image composition.
13. [Done] Make index hero full-image and add responsive mobile menu.

## 8. Risk Notes

- The current images are too large for production and must be optimized.
- The old PHP form should not be used as-is because the required library is missing.
- The old HTML pages still contain generic template copy and should not be shipped.
- Real-time availability requires reliable data modeling before UI polish; do not bolt it onto static content.
- Payment should only be added after booking states and cancellation rules are clear.
