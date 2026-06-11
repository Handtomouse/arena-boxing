import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/sections/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { getOrganizationSchema, getLocalBusinessSchema, getWebSiteSchema } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "block",
  preload: true,
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#7D1E1E',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arena-boxing-demo.local'),
  title: {
    default: "Arena Boxing Bondi | Those Who Dare",
    template: "%s | Arena Boxing Bondi",
  },
  description: "Bondi's premier combat sports experience. Gothic fight culture meets boutique boxing. Those who dare, enter the arena.",
  keywords: ["boxing", "fitness", "bondi", "gym", "combat sports", "HIIT", "training"],
  authors: [{ name: "Arena Boxing" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://arenaboxing.com.au",
    siteName: "Arena Boxing Bondi",
    title: "Arena Boxing Bondi | Those Who Dare",
    description: "Bondi's premier combat sports experience. Gothic fight culture meets boutique boxing.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arena Boxing Bondi - Those Who Dare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arena Boxing Bondi | Those Who Dare",
    description: "Bondi's premier combat sports experience. Gothic fight culture meets boutique boxing.",
    images: ["/images/og-image.jpg"],
    creator: "@arenaboxing",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arenaboxing.com.au';

  // Generate structured data
  const organizationSchema = getOrganizationSchema(baseUrl);
  const localBusinessSchema = getLocalBusinessSchema(baseUrl);
  const webSiteSchema = getWebSiteSchema(baseUrl);

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/old-london/old-london.ttf"
          as="font"
          type="font/ttf"
          crossOrigin=""
        />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body className="antialiased bg-cream-primary">
        {/* Google Analytics 4 */}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />

        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
