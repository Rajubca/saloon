import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScrolling from '@/components/SmoothScrolling';

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
    <html lang="en" className="">
      <body className="antialiased font-sans text-brand-900 bg-brand-50 min-h-screen flex flex-col">
        <SmoothScrolling>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
