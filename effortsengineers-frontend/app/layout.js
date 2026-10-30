import { AuthProvider } from '@/context/AuthContext';
import { QuoteProvider } from '@/context/QuoteContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteBuilderDrawer from '@/components/QuoteBuilderDrawer';
import AIChatbot from '@/components/AIChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import './globals.css';

export const metadata = {
  title: 'Efforts Engineers | Industrial Compressor Spares & Engineering Overhaul',
  description: 'Sourcing replacement spare parts for Grasso, Bitzer, Kirloskar, Carrier, Sabroe, Bock, and Daikin compressors. Availability, dispatch estimates, and warranty terms are confirmed per order.',
  metadataBase: new URL('https://effortsengineers.in'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: false,
    follow: false,
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