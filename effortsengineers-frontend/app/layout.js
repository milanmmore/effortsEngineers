import { AuthProvider } from '@/context/AuthContext';
import { QuoteProvider } from '@/context/QuoteContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteBuilderDrawer from '@/components/QuoteBuilderDrawer';
import AIChatbot from '@/components/AIChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import { SITE_ORIGIN } from '@/config/siteOrigin';
import './globals.css';

const isIndexingEnabled = process.env.ALLOW_INDEXING === 'true';

export const metadata = {
  title: 'Efforts Engineers | Industrial Compressor Spares & Engineering Overhaul',
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
        <AuthProvider>
          <QuoteProvider>
            <Navbar />
            {children}
            <Footer />
            <QuoteBuilderDrawer />
            {/* Floating Action Dock: WhatsApp & AI Assistant */}
            <div className="floating-action-dock">
              <WhatsAppButton />
              <AIChatbot />
            </div>
          </QuoteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}