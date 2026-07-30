# Villa Ceningan Website

**Version tag:** `v1.0 starter`

Villa Ceningan Website adalah starter website hospitality untuk villa, boutique hotel, guest house, dan small resort. Project ini dibangun sebagai website marketing modern dengan fokus pada tampilan luxury, responsif, reusable component, inquiry booking via WhatsApp, dan struktur konten yang mudah dikembangkan.

## Framework dan Stack

- **Framework:** Next.js `16.2.11`
- **Router:** Next.js App Router
- **UI Library:** React `19.2.8`
- **Language:** TypeScript
- **Styling:** Global CSS di `src/app/globals.css`
- **Image Optimization:** `next/image`
- **Navigation:** `next/link`
- **SEO:** Metadata API dan structured data JSON-LD
- **Booking flow:** WhatsApp-first inquiry
- **Data layer:** static TypeScript data di `src/data/`

Project ini tidak memakai Tailwind, Bootstrap, CMS, database, atau payment gateway pada versi starter ini.

## Fungsi Utama

- Website company profile untuk villa/hotel.
- Halaman marketing lengkap untuk Home, About Us, Rooms, Services, Blog, Contact, dan Reservation.
- Detail page untuk masing-masing room.
- Detail page untuk masing-masing service.
- Booking inquiry berbasis WhatsApp.
- Reusable availability bar untuk Home, Rooms, dan Reservation.
- Floating promo ads dengan delay `1.8s`, animasi masuk, animasi keluar, close button, dan reset saat pindah halaman.
- Responsive header desktop/tablet/mobile.
- Mobile menu fullscreen dengan active menu.
- Footer luxury dengan Explore, Concierge, Snapshots, social icons, dan legal links.
- Legal pages untuk Terms, Privacy, dan Cookies.
- Structured content di `src/data/` agar konten lebih mudah diedit.
- Global design tokens untuk warna, typography, spacing, radius, shadow, dan transition.
- Responsive layout untuk desktop, tablet, dan mobile.

## Halaman yang Tersedia

| Route | Fungsi |
| --- | --- |
| `/` | Home page dengan hero, availability, rooms preview, curated moments, blog preview, dan contact preview. |
| `/about-us` | Tentang villa, story, sustainable luxury, dan brand positioning. |
| `/rooms` | Listing room dengan hero, availability, dan room collection. |
| `/rooms/[slug]` | Detail room untuk Island Suite, Garden Villa, dan Family Stay. |
| `/services` | Listing layanan atau signature service yang dijual. |
| `/services/[slug]` | Detail service seperti Poolside Reset, Island Breakfast, Wellness Retreats, dan Seamless Transit. |
| `/reservation` | Reservation page dengan availability, room selection preview, booking overview, dan inquiry form. |
| `/blog` | Blog/journal page dengan hero, category toolbar, article layout, sidebar, dan dispatch form. |
| `/contact` | Contact page dengan inquiry form, contact details, dan map section. |
| `/gallery` | Gallery visual untuk property. |
| `/villa` | Legacy/supporting villa content page. |
| `/terms` | Terms of Service. |
| `/privacy` | Privacy Policy. |
| `/cookies` | Cookies Policy. |
| `/api/booking-inquiries` | API endpoint untuk memvalidasi inquiry dan membuat WhatsApp URL. |

## Fitur Per Halaman

### Home

- Full-width hero.
- Reusable availability bar.
- About/story preview.
- Curated Moments dengan CTA ke Services.
- Room showcase dengan CTA ke Rooms.
- Testimonial.
- Blog preview dengan CTA ke Blog.
- Contact preview.

### Rooms

- Full-width hero.
- Availability bar di antara hero dan section berikutnya.
- Room list luxury dengan gambar, status, rate, deposit, bed, passenger, dan detail link.
- Detail room dengan hero, gallery, amenities, booking sidebar, enhance-your-stay, dan related rooms.

### Services

- Full-width hero.
- Signature service list.
- Detail service page dengan gallery, rituals, booking CTA, dan related services.

### Reservation

- Availability search menggunakan shared `AvailabilityBar`.
- Room available list.
- Booking overview.
- Direct Villa Inquiry form.
- Country code selector untuk WhatsApp/phone.
- Guest controls.
- WhatsApp-first submission flow.

### Blog

- Full-width editorial hero.
- Sticky category/search toolbar.
- Featured article layout.
- Article grid.
- Sidebar with curator choice, newsletter-style dispatch, dan booking CTA.

### Contact

- Contact inquiry form.
- Contact methods.
- Map embed.
- Concierge-focused content.

### Legal

- Terms, Privacy, dan Cookies dibuat sebagai halaman, bukan popup.
- Untuk versi starter, Cookies lebih tepat sebagai halaman policy karena belum ada analytics, ads pixel, atau tracking non-essential.
- Cookie consent popup sebaiknya ditambahkan hanya ketika website mulai memakai analytics, marketing pixel, retargeting, atau third-party tracking.

## Komponen Penting

### Layout Components

Folder: `src/components/layout/`

- `SiteHeader.tsx`: header desktop/tablet/mobile shell.
- `MobileMenu.tsx`: fullscreen mobile navigation.
- `SiteFooter.tsx`: footer luxury dengan links, concierge, snapshots, dan legal links.
- `FloatingPromoAd.tsx`: floating promo ads global.

### Shared Components

Folder: `src/components/shared/`

- `AvailabilityBar.tsx`: availability bar reusable untuk Home, Rooms, dan Reservation.
- `Button.tsx`: reusable button/link component.
- `Card.tsx`: base card primitive.
- `PageHero.tsx`: reusable page hero.
- `ResponsiveImage.tsx`: image wrapper.
- `SectionHeading.tsx`: reusable section heading.

### Marketing Components

Folder: `src/components/marketing/`

Berisi section-section halaman seperti:

- Home sections.
- About Us sections.
- Blog sections.
- Rooms page dan Room detail sections.
- Services page dan Service detail sections.
- Reservation sections.
- Contact form.
- Legal page layout.

### Booking Components

Folder: `src/components/booking/`

- `BookingInquiryPanel.tsx`: form inquiry utama untuk mengumpulkan guest details dan membuat WhatsApp inquiry flow.

## Struktur Data

Folder: `src/data/`

- `property.ts`: nama property, alamat, WhatsApp, email, phone, site URL, hero image, dan highlight.
- `navigation.ts`: menu header/footer.
- `home.ts`: konten Home.
- `rooms.ts`: data rooms dan detail rooms.
- `services.ts`: data services dan detail services.
- `reservation.ts`: konten reservation.
- `blog.ts`: data artikel blog.
- `about.ts`: konten About Us.
- `gallery.ts`: gambar gallery.
- `legal.ts`: konten Terms, Privacy, Cookies.
- `facilities.ts`, `faqs.ts`, `policies.ts`: supporting content.

## Booking dan WhatsApp Flow

Booking di versi `v1.0 starter` masih memakai inquiry flow, bukan booking engine real-time.

Alur saat ini:

1. Visitor memilih tanggal, guest count, room, dan mengisi data inquiry.
2. Form divalidasi di frontend dan API route.
3. API membuat WhatsApp URL.
4. Visitor diarahkan ke WhatsApp untuk komunikasi langsung dengan team villa.

File penting:

- `src/app/api/booking-inquiries/route.ts`
- `src/lib/booking/booking-inquiry.ts`
- `src/components/booking/BookingInquiryPanel.tsx`
- `src/data/property.ts`

Nomor WhatsApp utama dikonfigurasi di `src/data/property.ts`.

## SEO dan Metadata

SEO dasar sudah tersedia melalui:

- Metadata API di `src/app/layout.tsx`.
- Metadata per halaman pada route tertentu.
- JSON-LD lodging structured data di `src/lib/seo/structured-data.ts`.
- Optimized images melalui `next/image`.

## Styling dan Design System

Styling utama ada di:

```text
src/app/globals.css
```

Design foundation meliputi:

- CSS variables untuk warna.
- Typography display dan body.
- Container max width.
- Spacing/gutter.
- Button variants.
- Responsive breakpoints.
- Reduced motion handling.
- Layout responsive untuk desktop, tablet, dan mobile.

Catatan struktur:

- Jangan mengganti styling system tanpa approval.
- Layout global tetap di `src/components/layout/`.
- UI primitives tetap di `src/components/shared/`.
- Section marketing tetap di `src/components/marketing/`.
- Data konten tetap di `src/data/`.

## Local Development

Install dependencies:

```powershell
npm.cmd install
```

Run development server:

```powershell
npm.cmd run dev
```

Default local URL:

```text
http://localhost:3000
```

Production build:

```powershell
npm.cmd run build
```

Start production server after build:

```powershell
npm.cmd run start
```

## Cloudflare Workers Deployment

Project ini sudah disiapkan untuk Cloudflare Workers menggunakan OpenNext adapter:

- `@opennextjs/cloudflare`
- `wrangler`
- `open-next.config.ts`
- `wrangler.jsonc`
- `.dev.vars`
- `public/_headers`

Preview lokal dengan runtime Workers:

```powershell
npm.cmd run preview
```

Upload versi Worker tanpa langsung deploy:

```powershell
npm.cmd run upload
```

Deploy langsung dari local CLI:

```powershell
npm.cmd run deploy
```

Untuk deployment dari GitHub, hubungkan repository ke Cloudflare Workers Builds dan gunakan setting berikut:

```text
Production branch: main
Build command: npm run cf:build
Deploy command: npx wrangler deploy
Non-production branch deploy command: npx wrangler versions upload
Root directory: /
```

Jangan memakai build command `npm run build` untuk Cloudflare Workers. Command itu hanya membuat output Next.js biasa di `.next`, sedangkan Workers membutuhkan output OpenNext di `.open-next`. Jika Cloudflare hanya menjalankan `npm run build` lalu `npx wrangler deploy`, deploy akan gagal dengan error `Could not find compiled Open Next config` karena output `.open-next/worker.js` belum dibuat.

Alternatif paling sederhana jika dashboard hanya menyediakan satu deploy command:

```text
Deploy command: npm run deploy
```

## Verification Notes

Build command yang dipakai di project ini:

```powershell
npm.cmd run build
```

Catatan Windows:

- Gunakan `npm.cmd`, bukan `npm`, karena PowerShell pada environment ini dapat memblokir `npm.ps1`.
- Script build memakai `next build --webpack`.
- OpenNext memberi warning bahwa Windows belum sepenuhnya kompatibel; untuk preview/deploy yang paling stabil gunakan WSL atau environment Linux CI.
- `wrangler.jsonc` memakai `compatibility_date` `2024-12-30` agar kompatibel dengan runtime Wrangler saat ini.
- Script lint saat ini adalah `next lint`; pada Next.js 16 command ini dapat terbaca sebagai directory `lint`, sehingga perlu diperbarui pada versi berikutnya.

## Struktur Folder Ringkas

```text
src/
  app/
    api/booking-inquiries/
    about-us/
    blog/
    contact/
    cookies/
    gallery/
    privacy/
    reservation/
    rooms/
      [slug]/
    services/
      [slug]/
    terms/
    villa/
    layout.tsx
    page.tsx
    globals.css
  components/
    booking/
    layout/
    marketing/
    shared/
  data/
  lib/
    booking/
    seo/
public/
  assets/
    img/
open-next.config.ts
wrangler.jsonc
public/_headers
```

## Version v1.0 Starter Scope

`v1.0 starter` mencakup:

- Hospitality website foundation.
- Luxury responsive UI.
- Core marketing pages.
- Room listing dan room detail.
- Service listing dan service detail.
- Reservation inquiry flow.
- WhatsApp-first booking.
- Blog layout.
- Contact page.
- Legal pages.
- Reusable availability component.
- Floating promo ads.
- Header/footer responsive.
- Static data structure.
- SEO foundation.

## Next Version Ideas

### v1.1 Content and UX Polish

- Tambah real blog detail pages `/blog/[slug]`.
- Tambah gallery detail/lightbox.
- Tambah real promo management data di `src/data/promos.ts`.
- Tambah admin-friendly content checklist.
- Rapikan lint script agar sesuai Next.js 16.
- Tambah Playwright visual QA untuk desktop/tablet/mobile.

### v1.2 Booking Engine Foundation

- Tambah room availability model.
- Tambah date range availability logic.
- Tambah room inventory data.
- Tambah pricing by season.
- Tambah booking summary yang dinamis berdasarkan tanggal, room, dan guest.
- Tambah hold booking flow sebelum WhatsApp confirmation.

### v1.3 CMS Ready

- Integrasi CMS untuk rooms, services, blog, gallery, dan promo ads.
- Tambah content preview mode.
- Tambah image management workflow.
- Tambah multi-language content structure untuk English dan Indonesian.

### v1.4 Payment and Confirmation

- Integrasi payment gateway atau deposit payment.
- Email confirmation untuk guest dan admin.
- Booking reference number.
- Admin notification.
- Cancellation policy automation.

### v1.5 Production Growth

- Analytics dan consent management.
- Cookie preference popup jika analytics/marketing pixel sudah aktif.
- Performance audit.
- Accessibility audit.
- Sitemap dan robots configuration.
- Deployment checklist untuk production domain.

## Maintenance Notes

- Update konten utama lewat `src/data/`.
- Update visual section lewat `src/components/marketing/`.
- Update global shell lewat `src/components/layout/`.
- Update reusable UI lewat `src/components/shared/`.
- Hindari refactor besar tanpa approval karena struktur App Router sudah menjadi convention project.
