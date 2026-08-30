import { notFound } from 'next/navigation';
import { dbGet, dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings, constructMetadata } from '@/lib/seo';
import { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Clock, GraduationCap, CheckCircle2, Sparkles, Calendar, ArrowRight, HelpCircle, Phone, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await seedDatabase();
  const service = dbGet<Service>('SELECT * FROM services WHERE slug = ?', [params.slug]);
  if (!service) return { title: 'Service Not Found' };

  return constructMetadata({
    title: service.title,
    description: service.short_description,
    image: service.featured_image,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  await seedDatabase();
  const settings = getSiteSettings();

  const service = dbGet<any>(
    `SELECT s.*, c.name as category_name, c.slug as category_slug
     FROM services s
     LEFT JOIN categories c ON s.category_id = c.id
     WHERE s.slug = ?`,
    [params.slug]
  );

  if (!service) {
    notFound();
  }

  let parsedFeatures: string[] = [];
  let parsedBenefits: string[] = [];
  let parsedFaqs: { q: string; a: string }[] = [];

  try {
    if (service.features) parsedFeatures = JSON.parse(service.features);
    if (service.benefits) parsedBenefits = JSON.parse(service.benefits);
    if (service.faqs) parsedFaqs = JSON.parse(service.faqs);
  } catch (e) {
    // fallback
  }

  const isAcademy = Boolean(service.is_academy_course);

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-gold-400">Services &amp; Academy</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium truncate">{service.title}</span>
        </nav>

        {/* Hero Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-gold-500/15 text-gold-400 text-xs font-bold uppercase tracking-wider border border-gold-500/30">
                  {service.category_name || 'Hair Care'}
                </span>
                {isAcademy && (
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>ACADEMY CERTIFIED</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50 leading-tight">
                {service.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-cream-200/80 leading-relaxed font-light">
                {service.short_description}
              </p>
            </div>

            {/* Main Featured Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-obsidian-900 border border-gold-500/30 shadow-luxury">
              <img
                src={service.featured_image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* In-depth Description */}
            <div className="prose prose-invert max-w-none text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4">
              <h3 className="text-xl font-serif font-bold text-cream-100 border-b border-neutral-800 pb-2">
                About This {isAcademy ? 'Program' : 'Treatment'}
              </h3>
              <p>{service.description}</p>
            </div>

            {/* Certification Details if Academy */}
            {isAcademy && service.certification_details && (
              <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Award className="w-5 h-5" />
                  <span>Credential &amp; Certification</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-200">
                  {service.certification_details}
                </p>
              </div>
            )}

            {/* Features & Key Inclusions */}
            {parsedFeatures.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-cream-100 border-b border-neutral-800 pb-2">
                  What&apos;s Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {parsedFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-obsidian-900/60 border border-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {parsedBenefits.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-cream-100 border-b border-neutral-800 pb-2">
                  Expected Results &amp; Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {parsedBenefits.map((ben, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-obsidian-900/60 border border-neutral-800">
                      <Sparkles className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-200">{ben}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {parsedFaqs.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-serif font-bold text-cream-100 border-b border-neutral-800 pb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gold-400" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-3">
                  {parsedFaqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-obsidian-900/80 border border-neutral-800">
                      <h4 className="text-sm font-bold text-cream-100 mb-1">{faq.q}</h4>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking / Enrollment Card (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-900/90 border border-gold-500/30 shadow-luxury-dark space-y-6">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-400">
                  {isAcademy ? 'Tuition Fee' : 'Treatment Investment'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-bold font-sans text-gold-400">
                    {formatCurrency(service.sale_price && service.sale_price > 0 ? service.sale_price : service.price, settings.currency_symbol)}
                  </span>
                  {service.sale_price && service.sale_price < service.price && (
                    <span className="text-base text-neutral-500 line-through">
                      {formatCurrency(service.price, settings.currency_symbol)}
                    </span>
                  )}
                </div>
                {service.duration_minutes && !isAcademy && (
                  <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>Estimated Duration: ~{service.duration_minutes} minutes</span>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amberGold text-black font-bold text-sm tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-luxury-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isAcademy ? 'Apply for Admission' : 'Book Appointment'}</span>
                </Link>

                <a
                  href={`https://wa.me/${settings.whatsapp_number}?text=Hello%20Free%20Bird%20Salon,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-neutral-950 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all shadow"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Trust Callout */}
              <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs text-neutral-400">
                <p>✓ 100% Guaranteed authentic salon products</p>
                <p>✓ Free one-on-one consultation before start</p>
                <p>✓ Supervised by Master Stylist Rajesh Joshi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
