# Villa Ceningan Next.js

Reusable hospitality website foundation for villas, guest houses, boutique hotels, and small resorts.

## Stack

- Next.js App Router
- TypeScript
- React
- CSS modules are not used yet; shared styling lives in `src/app/globals.css`
- Static property data lives in `src/data`

## Local Setup

Install dependencies:

```powershell
npm.cmd install
```

Run the local development server:

```powershell
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```powershell
npm.cmd run build
```

Start production server after build:

```powershell
npm.cmd run start
```

## Project Structure

```text
src/
  app/
    page.tsx
    booking/
    contact/
    gallery/
    rooms/
  components/
    booking/
    layout/
    marketing/
  data/
    property.ts
    rooms.ts
    facilities.ts
    gallery.ts
    faqs.ts
    policies.ts
  lib/
    seo/
public/
  assets/
    img/
reports/
  ai/
    handoff/
```

## Editing Property Content

Start from:

- `src/data/property.ts`
- `src/data/rooms.ts`
- `src/data/facilities.ts`
- `src/data/gallery.ts`
- `src/data/faqs.ts`
- `src/data/policies.ts`

These files should stay as the first configuration layer until a CMS or admin dashboard is added.

## Current Booking Direction

The first booking surface is inquiry-based and points guests to WhatsApp. The long-term booking flow should add:

- date search
- real-time availability
- room selection
- guest details
- booking hold
- confirmation
- payment or deposit

See `reports/ai/handoff/nextjs-grand-master-plan.md` for the full roadmap.

## Notes

- The original static HTML files are still present as migration references.
- The copied Next.js runtime images have been converted to WebP under `public/assets/img`.
- The old PHP contact form should not be used for the Next.js version.
