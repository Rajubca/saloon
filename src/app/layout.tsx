import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

import type { Metadata } from 'next';
import './globals.css';
import 'lenis/dist/lenis.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScrolling from '@/components/SmoothScrolling';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import StickyBooking from '@/components/StickyBooking';

export const metadata: Metadata = {
  title: 'xSaloon | Luxury Salon on Vaghodia Road, Baroda',
  description: 'Experience premium haircuts, spa, coloring, and bridal makeup at xSaloon, Baroda.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased font-sans text-brand-900 bg-brand-50 min-h-screen flex flex-col relative">
        <SmoothScrolling>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppWidget />
          <StickyBooking />
        </SmoothScrolling>
      </body>
    </html>
  );
}
