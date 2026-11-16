import React from "react";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { QuoteProvider } from "@/context/QuoteContext";
import { Header, Footer } from "@/components/layout";
import QuoteBuilderDrawer from "@/components/QuoteBuilderDrawer";
import AIChatbot from "@/components/AIChatbot";
import FacebookButton from "@/components/FacebookButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_ORIGIN } from "@/config/siteOrigin";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const isIndexingEnabled = process.env.ALLOW_INDEXING === "true";

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: siteConfig.name,
  url: SITE_ORIGIN,
  telephone: siteConfig.phone,
  email: siteConfig.primaryEmail,
  sameAs: siteConfig.profileLinks.map(({ url }) => url),
  ...(siteConfig.openingHours.length > 0 && {
    openingHours: siteConfig.openingHours,
  }),
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411016",
    addressCountry: "IN",
  },
};

export const metadata: Metadata = {
  title: "Efforts Engineers | Industrial Compressor Spare Parts",
  description: "Compressor spares for Grasso, Kirloskar, Carrier, Sabroe and 13+ industrial makes. Availability and dispatch estimates are confirmed per order.",
  metadataBase: new URL(SITE_ORIGIN),
  alternates: {
    canonical: new URL("/", SITE_ORIGIN).toString(),
  },
  robots: {
    index: isIndexingEnabled,
    follow: isIndexingEnabled,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessData).replace(/</g, "\\u003c"),
          }}
        />
        <AuthProvider>
          <QuoteProvider>
            <Header />
            {children}
            <Footer />
            <QuoteBuilderDrawer />
            {/* Floating Action Dock: Facebook, WhatsApp, and AI Assistant */}
            <div className="floating-action-dock">
              <FacebookButton />
              <WhatsAppButton />
              <AIChatbot />
            </div>
          </QuoteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
