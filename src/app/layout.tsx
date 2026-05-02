import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Free Bird Saloon | Luxury Salon in Baroda, Gujarat',
  description: 'Experience premium haircuts, spa, coloring, and bridal makeup at Free Bird Saloon, Baroda.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Free Bird Saloon",
    "image": "https://freebirdsaloon.com/hero-bg.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vaghodia Road",
      "addressLocality": "Baroda",
      "addressRegion": "Gujarat",
      "postalCode": "390019",
      "addressCountry": "IN"
    },
    "telephone": "+919898678440",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ]
  };

  return (
    <html lang="en" className={cn("dark", "scroll-smooth", playfair.variable, inter.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
