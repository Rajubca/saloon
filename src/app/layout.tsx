import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Free Bird Saloon | Luxury Bridal & Makeup Studio',
  description: 'Unleash Your Beauty at Free Bird Saloon, Baroda. Premium hair styling, bridal makeup, and skin treatments.',
  openGraph: {
    title: 'Free Bird Saloon | Luxury Bridal & Makeup Studio',
    description: 'Unleash Your Beauty at Free Bird Saloon, Baroda. Premium hair styling, bridal makeup, and skin treatments.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans text-brand-50 bg-brand-900 min-h-screen flex flex-col relative overflow-x-hidden selection:bg-brand-500/30 selection:text-brand-300">
        <LoadingScreen />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
