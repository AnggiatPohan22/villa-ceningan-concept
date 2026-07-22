import type { Metadata } from "next";
import "./globals.css";
import { property } from "@/data/property";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { lodgingStructuredData } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    default: `${property.name} | Boutique Villa Website Template`,
    template: `%s | ${property.name}`
  },
  description: property.tagline,
  metadataBase: new URL(property.siteUrl),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: property.name,
    description: property.tagline,
    type: "website",
    url: property.siteUrl,
    siteName: property.name,
    images: [
      {
        url: property.heroImage,
        width: 1200,
        height: 630,
        alt: property.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: property.name,
    description: property.tagline,
    images: [property.heroImage]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingStructuredData()) }}
        />
      </body>
    </html>
  );
}
