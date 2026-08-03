import type { Metadata } from "next";
import "./globals.css";
import { property } from "@/data/property";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingPromoAd } from "@/components/layout/FloatingPromoAd";
import { lodgingStructuredData } from "@/lib/seo/structured-data";
import { getCmsSiteSettings } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCmsSiteSettings();
  const metadata = buildCmsMetadata({
    title: settings.defaultSEOTitle,
    description: settings.defaultSEODescription,
    image: settings.defaultOpenGraphImage,
    imageAlt: settings.siteName,
    seo: settings.seo
  });

  return {
    ...metadata,
    title: {
      default: settings.defaultSEOTitle,
      template: `%s | ${settings.siteName}`
    },
    metadataBase: new URL(property.siteUrl),
    alternates: {
      canonical: "/"
    },
    openGraph: {
      ...metadata.openGraph,
      type: "website",
      url: property.siteUrl,
      siteName: settings.siteName
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div className="site-main" id="main-content">
          {children}
        </div>
        <SiteFooter />
        <FloatingPromoAd />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingStructuredData()) }}
        />
      </body>
    </html>
  );
}
