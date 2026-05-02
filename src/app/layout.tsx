import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export const metadata: Metadata = {
  title: 'Free Bird Saloon | Modern Rustic Bar & Live Music',
  description: 'Where Music Flies Free. Experience a modern rustic bar, live music, signature drinks, and a premium nightlife aesthetic.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Rye&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans text-gray-100 bg-brand-900 min-h-screen flex flex-col relative">
        <LoadingScreen />
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
