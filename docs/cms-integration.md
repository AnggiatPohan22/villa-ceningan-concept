# CMS Integration

Phase: 6 - Frontend Sync and Integration  
CMS source: `C:\laragon\www\payload-cms-villa`  
Frontend env: `NEXT_PUBLIC_CMS_URL`

## Current Scope

The frontend can now read public Payload CMS content while keeping static TypeScript data as fallback. This phase does not move booking into the CMS and does not expose CMS secrets to the browser.

## Implemented

- Added CMS REST helper and adapters in `src/lib/cms/`.
- Added CMS media URL normalization for `next/image`.
- Added optional CMS image host support in `next.config.mjs` through `NEXT_PUBLIC_CMS_URL`.
- Connected CMS data to:
  - `/`
  - `/villa`
  - `/rooms`
  - `/rooms/[slug]`
  - `/services`
  - `/services/[slug]`
  - `/gallery`
  - `/reservation`
  - `/blog`
- Kept static data in `src/data/` as fallback when CMS is missing, unreachable, or empty.

## Required Environment

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3000
```

If this variable is missing, the frontend uses static fallback data and still builds.

## Verification

Run from the frontend repo:

```powershell
npx.cmd tsc --noEmit
npm.cmd run build
```

Current lint note:

```powershell
npm.cmd run lint
```

The lint script currently fails because `next lint` is no longer valid with this Next.js/ESLint setup. Running `npx.cmd eslint .` also requires an `eslint.config.*` migration. This is an existing tooling follow-up, not a CMS integration runtime failure.

## Next Safe Step

Run CMS and frontend together locally:

```powershell
# CMS repo
corepack pnpm run dev

# Frontend repo
npm.cmd run dev
```

Then smoke test the pages listed above with `NEXT_PUBLIC_CMS_URL=http://localhost:3000`.
