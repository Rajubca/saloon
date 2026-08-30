import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings, constructMetadata } from "@/lib/seo";
import { dbQuery } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { ToastProvider } from "@/components/ui/Toast";
import FloatingContactWidget from "@/components/ui/FloatingContactWidget";
import MobileStickyActionBar from "@/components/ui/MobileStickyActionBar";
import JsonLd from "@/components/seo/JsonLd";
import { MenuItem } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  await seedDatabase();
  return constructMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await seedDatabase();

  const settings = getSiteSettings();

  // Fetch Navigation Menus
  const headerMenu = dbQuery<MenuItem>(
    "SELECT * FROM menu_items WHERE menu_location = 'header' AND is_active = 1 ORDER BY display_order ASC"
  );
  const footerCol1 = dbQuery<MenuItem>(
    "SELECT * FROM menu_items WHERE menu_location = 'footer_col_1' AND is_active = 1 ORDER BY display_order ASC"
  );
  const footerCol2 = dbQuery<MenuItem>(
    "SELECT * FROM menu_items WHERE menu_location = 'footer_col_2' AND is_active = 1 ORDER BY display_order ASC"
  );
  const footerCol3 = dbQuery<MenuItem>(
    "SELECT * FROM menu_items WHERE menu_location = 'footer_col_3' AND is_active = 1 ORDER BY display_order ASC"
  );

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-obsidian-950 text-cream-100 antialiased selection:bg-gold-500 selection:text-black">
        <ToastProvider>
          <AnnouncementBar settings={settings} />
          <Header settings={settings} menuItems={headerMenu} />
          <main className="flex-1">{children}</main>
          <Footer
            settings={settings}
            footerCol1={footerCol1}
            footerCol2={footerCol2}
            footerCol3={footerCol3}
          />
          <FloatingContactWidget settings={settings} />
          <MobileStickyActionBar
            phone={settings.phone}
            whatsappNumber={settings.whatsapp_number}
          />
        </ToastProvider>
      </body>
    </html>
  );
}
