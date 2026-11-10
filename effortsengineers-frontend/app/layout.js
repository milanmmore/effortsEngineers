import { AuthProvider } from '@/context/AuthContext';
import { QuoteProvider } from '@/context/QuoteContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteBuilderDrawer from '@/components/QuoteBuilderDrawer';
import AIChatbot from '@/components/AIChatbot';
import FacebookButton from '@/components/FacebookButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import { SITE_ORIGIN } from '@/config/siteOrigin';
import SITE_CONFIG from '@/config/site';
import './globals.css';

const isIndexingEnabled = process.env.ALLOW_INDEXING === 'true';
const localBusinessData = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Efforts Engineers',
  url: SITE_ORIGIN,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.primaryEmail,
  sameAs: SITE_CONFIG.profileLinks.map(({ url }) => url),
  ...(SITE_CONFIG.openingHours.length > 0 && {
    openingHours: SITE_CONFIG.openingHours,
  }),
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address,
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411016',
    addressCountry: 'IN',
  },
};

export const metadata = {
  title: 'Efforts Engineers | Industrial Compressor Spare Parts',
  description: 'Sourcing replacement spare parts for Grasso, Bitzer, Kirloskar, Carrier, Sabroe, Bock, and Daikin compressors. Availability, dispatch estimates, and warranty terms are confirmed per order.',
  metadataBase: new URL(SITE_ORIGIN),
  alternates: {
    canonical: new URL('/', SITE_ORIGIN).toString(),
  },
  robots: {
    index: isIndexingEnabled,
    follow: isIndexingEnabled,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData).replace(/</g, '\\u003c') }}
        />
        <AuthProvider>
          <QuoteProvider>
            <Navbar />
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