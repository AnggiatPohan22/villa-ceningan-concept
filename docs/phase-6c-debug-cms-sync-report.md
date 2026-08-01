# Phase 6C Debug CMS Sync Report

Date: 1 Agustus 2026

## Root Cause

The Home hero did not update from Payload because the frontend Home route was not fetching the Payload `home-page` Global. `src/app/page.tsx` only fetched rooms, services, and blog data, while `HomeHeroSection` still read directly from `src/data/property.ts`.

Some CMS images could fail or render inconsistently because media URL normalization returned relative Payload media paths as-is. If Payload returns `/api/media/file/...`, the browser resolves it against the frontend origin on port `3001` instead of the CMS origin on port `3000`.

Follow-up audit found an additional CMS-side issue: Payload media documents returned URLs like `http://localhost:3000/api/media/file/island-suite.webp`, but those file URLs returned `404` until an explicit CMS media file route was added in the Payload repo.

## Endpoint Checked

- `GET http://localhost:3000/api/globals/home-page?depth=2`
- `GET http://localhost:3000/api/globals/site-settings`
- `GET http://localhost:3000/api/globals/header`
- `GET http://localhost:3000/api/globals/footer`
- `GET http://localhost:3000/api/rooms?where[status][equals]=published&sort=sortOrder&depth=2`

## CMS Response Shape Found

Payload `home-page` returns the Home hero under:

```text
hero.eyebrow
hero.heading
hero.description
hero.backgroundImage
hero.primaryCTA
hero.secondaryCTA
```

Media relation objects can include:

```text
url
filename
sizes.thumbnail.url
sizes.card.url
sizes.desktop.url
alt
```

Some generated image size URLs can be `null`, so the frontend must fall back to another media URL or a local fallback image.

## Mapper Fixed

- Added `getCmsHomePage()` in `src/lib/cms/content.ts`.
- Mapped `home-page.hero.heading` to the Home `<h1>`.
- Mapped `home-page.hero.backgroundImage` to the Home hero image.
- Mapped `home-page.introduction` to the Home about preview.
- Kept static `src/data/*` fallback when CMS is missing, unreachable, or structurally invalid.

## Image Issues Fixed

- CMS media paths under `/api/media/file/...` are now normalized to absolute CMS URLs using `NEXT_PUBLIC_CMS_URL`.
- Media objects with only `filename` can now resolve to `/api/media/file/{filename}` through the CMS origin.
- Collection queries for rooms, services, gallery, and blog now use `depth=2` so nested media relations are available.
- `next.config.mjs` now includes explicit local CMS image patterns for `localhost:3000` and `127.0.0.1:3000`.
- `next.config.mjs` also includes `images.domains` for local CMS hosts as a compatibility fallback for the current local Next/OpenNext dev runtime.
- Invalid `NEXT_PUBLIC_CMS_URL` no longer crashes Next config parsing.

## Fixes Done

- Development CMS fetches use `cache: "no-store"` so CMS edits are visible after refresh.
- Production CMS fetches keep `next.revalidate`.
- Development warnings now explain when CMS data is used or when fallback data is used.
- Home components now accept CMS-mapped props while preserving local fallback defaults.

## Verification

Commands run:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run dev -- -p 3001
```

Results:

- `npx.cmd tsc --noEmit` passed after running with filesystem permission to write `tsconfig.tsbuildinfo`.
- `npm.cmd run build` passed.
- Frontend dev server on `http://localhost:3001` returned `200`.
- Home HTML contained CMS heading `Villa Ceningan by Giattech`.
- Home HTML no longer contained the fallback-only `<h1 id="home-hero-title">Villa Ceningan</h1>`.
- `/`, `/rooms`, `/services`, and `/gallery` all returned HTML with CMS media URLs and Next image optimizer output.
- Follow-up CMS media `HEAD` checks returned `200 image/webp` after the CMS media file route fix.

## Manual Smoke Test Instructions

### Test Home Hero CMS Sync

1. Open Payload CMS admin at `http://localhost:3000/admin`.
2. Edit `Home Page > Hero Heading`.
3. Set it to `CMS HERO HEADING TEST`.
4. Save.
5. Open `http://localhost:3001`.
6. Refresh the page.
7. Confirm the homepage hero heading displays `CMS HERO HEADING TEST`.

### Test Image CMS

Check:

- `http://localhost:3001/`
- `http://localhost:3001/rooms`
- `http://localhost:3001/services`
- `http://localhost:3001/gallery`

Confirm:

- CMS images display.
- There is no `next/image unconfigured host` error.
- There are no broken images.
- If CMS image data is empty, the local fallback image displays.

### Test Fallback

1. Temporarily set `.env.local`:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:9999
```

2. Restart frontend:

```powershell
npm.cmd run dev -- -p 3001
```

3. Confirm pages still render from `src/data/*`.
4. Restore:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3000
```

5. Restart frontend again.

## Remaining Risks and Gaps

- Header/footer/site-settings are still documented as integrated scope, but this task only fixed Home sync and media rendering paths that were failing.
- Manual browser inspection is still recommended after changing the CMS hero heading to the exact test string.
- Because `images.domains` is deprecated, keep `remotePatterns` as the preferred production rule and remove `domains` later only after the local optimizer accepts the remote pattern reliably.
