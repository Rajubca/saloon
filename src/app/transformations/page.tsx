import { dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings } from '@/lib/seo';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { BeforeAfterEntry, Category } from '@/types';
import Link from 'next/link';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';

import ScrollReveal from '@/components/ui/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function TransformationsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  await seedDatabase();
  const settings = getSiteSettings();

  const { category } = searchParams;

  let sql = `
    SELECT ba.*, c.name as category_name, c.slug as category_slug
    FROM before_after_entries ba
    LEFT JOIN categories c ON ba.category_id = c.id
    WHERE ba.is_published = 1
  `;
  const params: any[] = [];

  if (category) {
    sql += ' AND (c.slug = ? OR c.id = ?)';
    params.push(category, category);
  }

  sql += ' ORDER BY ba.display_order ASC, ba.created_at DESC';

  const transformations = dbQuery<BeforeAfterEntry>(sql, params);
  const categories = dbQuery<Category>(
    "SELECT * FROM categories WHERE type IN ('service', 'gallery') AND is_active = 1 ORDER BY display_order ASC"
  );

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>REAL CLIENT RESULTS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50">
              Before &amp; After Transformations
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
              Slide through our live comparison gallery. Every single result was achieved in our Vadodara studios by Master Stylist Rajesh Joshi and our certified aesthetic team.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <Link
            href="/transformations"
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
              !category
                ? 'bg-gold-500 text-black shadow-md scale-105'
                : 'bg-obsidian-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            All Transformations
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/transformations?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                category === cat.slug
                  ? 'bg-gold-500 text-black shadow-md scale-105'
                  : 'bg-obsidian-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Transformations Grid with Interactive Sliders */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          {transformations.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" delay={(index % 4) * 100}>
              <div
                className="card-hover-lift p-5 sm:p-6 rounded-3xl bg-obsidian-900/60 border border-gold-500/20 shadow-2xl flex flex-col justify-between"
              >
                <BeforeAfterSlider
                  beforeImage={item.before_image}
                  afterImage={item.after_image}
                  beforeLabel={item.before_label || 'BEFORE'}
                  afterLabel={item.after_label || 'AFTER'}
                  title={item.title}
                  description={item.description}
                  initialPosition={item.initial_slider_position || 50}
                  orientation={item.orientation || 'horizontal'}
                  allowOrientationToggle={true}
                  aspectRatio="aspect-[16/11]"
                />

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider">
                    {item.tags || 'HAIR TRANSFORMATION'}
                  </span>

                  <Link
                    href={`/contact?service=${encodeURIComponent(item.title)}`}
                    className="btn-shine-sweep px-4 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow hover:scale-105"
                  >
                    <span>Book This Look</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
