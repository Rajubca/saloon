import { dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings } from '@/lib/seo';
import GalleryViewer from '@/components/gallery/GalleryViewer';
import { GalleryItem } from '@/types';
import { Camera } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  await seedDatabase();
  const settings = getSiteSettings();

  const galleryItems = dbQuery<GalleryItem>(
    'SELECT * FROM gallery_items ORDER BY display_order ASC, created_at DESC'
  );

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>STUDIO &amp; ACADEMY VISUAL PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50">
            Lookbook &amp; Artistry Gallery
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
            A glimpse into our luxury salon atmosphere, signature French Balayage, royal HD bridal transformations, and live student masterclasses in Vadodara.
          </p>
        </div>

        <GalleryViewer items={galleryItems} />
      </div>
    </div>
  );
}
