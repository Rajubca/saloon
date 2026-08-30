import { dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings } from '@/lib/seo';
import OffersSection from '@/components/home/OffersSection';
import { Offer } from '@/types';
import Link from 'next/link';
import { Tag, Sparkles } from 'lucide-react';

import ScrollReveal from '@/components/ui/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  await seedDatabase();
  const settings = getSiteSettings();

  const offers = dbQuery<Offer>(
    `SELECT * FROM offers 
     WHERE is_active = 1 
     ORDER BY is_featured DESC, end_date ASC`
  );

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
              EXCLUSIVE PACKAGES &amp; SCHOLARSHIPS
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-serif font-bold text-cream-50">
              Special Deals &amp; Limited Promotions
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
              Take advantage of exclusive discounts on Russian Nano-Plastia, French Balayage, royal bridal suites, and cosmetology academy grants.
            </p>
          </div>
        </ScrollReveal>

        {/* Live Offers Section */}
        <div className="-mt-8">
          <OffersSection offers={offers} />
        </div>
      </div>
    </div>
  );
}
