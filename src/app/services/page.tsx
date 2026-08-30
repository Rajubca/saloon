import { dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings } from '@/lib/seo';
import ServiceCard from '@/components/ui/ServiceCard';
import { Service, Category } from '@/types';
import Link from 'next/link';
import { Sparkles, GraduationCap, ArrowRight, Filter } from 'lucide-react';

import ScrollReveal from '@/components/ui/ScrollReveal';
import FaqAccordion from '@/components/ui/FaqAccordion';

export const dynamic = 'force-dynamic';

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { type?: string; category?: string };
}) {
  await seedDatabase();
  const settings = getSiteSettings();

  const { type, category } = searchParams;

  let sql = `
    SELECT s.*, c.name as category_name, c.slug as category_slug
    FROM services s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE s.is_published = 1
  `;
  const params: any[] = [];

  if (type === 'academy') {
    sql += ' AND s.is_academy_course = 1';
  } else if (type === 'salon') {
    sql += ' AND s.is_academy_course = 0';
  }

  if (category) {
    sql += ' AND (c.slug = ? OR c.id = ?)';
    params.push(category, category);
  }

  sql += ' ORDER BY s.is_academy_course ASC, s.display_order ASC';

  const services = dbQuery<Service>(sql, params);
  const categories = dbQuery<Category>(
    "SELECT * FROM categories WHERE type IN ('service', 'course') AND is_active = 1 ORDER BY display_order ASC"
  );

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
              SALON SERVICES &amp; PROFESSIONAL ACADEMY
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-serif font-bold text-cream-50">
              {type === 'academy' ? 'Cosmetology Academy Diplomas' : type === 'salon' ? 'Salon & Aesthetic Services' : 'Complete Menu & Academy Courses'}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
              Discover bespoke hair transformations, luxury scalp detox therapies, signature bridal suites, and government-certified cosmetology education led by Rajesh Joshi.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Navigation Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <Link
            href="/services"
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
              !type && !category
                ? 'bg-gold-500 text-black shadow-md scale-105'
                : 'bg-obsidian-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            All Services &amp; Courses
          </Link>

          <Link
            href="/services?type=salon"
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              type === 'salon' && !category
                ? 'bg-gold-500 text-black shadow-md scale-105'
                : 'bg-obsidian-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salon Treatments</span>
          </Link>

          <Link
            href="/services?type=academy"
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
              type === 'academy'
                ? 'bg-gold-500 text-black shadow-md scale-105'
                : 'bg-obsidian-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academy Diplomas</span>
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/services?category=${cat.slug}`}
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

        {/* Results Grid */}
        {services.length === 0 ? (
          <div className="mt-16 py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
            <Sparkles className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-cream-100">No Services Found</h3>
            <p className="text-xs text-neutral-400 mt-1">Try selecting a different category or clearing filters.</p>
            <Link
              href="/services"
              className="mt-4 inline-block px-5 py-2 rounded-full bg-gold-500 text-black font-semibold text-xs uppercase tracking-wider"
            >
              Clear Filter
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} direction="up" delay={(index % 6) * 80}>
                <div className="card-hover-lift h-full">
                  <ServiceCard service={service} currency={settings.currency_symbol} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Interactive FAQ Section with Rich Guidance */}
        <FaqAccordion />
      </div>
    </div>
  );
}
