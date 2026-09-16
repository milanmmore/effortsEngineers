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
  description: 'Precision replacement spare parts for Grasso, Bitzer, Kirloskar, Carrier, Sabroe, Bock, and Daikin compressors. Ready stock, 24h express dispatch, 1-year warranty.',
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