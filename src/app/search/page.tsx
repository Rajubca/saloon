import { seedDatabase } from '@/lib/seed';
import { dbQuery } from '@/lib/db';
import Link from 'next/link';
import { Search, Package, Sparkles, GraduationCap, ArrowRight, Image as ImageIcon, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  await seedDatabase();
  const q = searchParams.q?.trim() || '';

  let results: any[] = [];

  if (q.length >= 2) {
    const term = `%${q}%`;

    // Products
    const products = dbQuery<any>(
      `SELECT id, name, slug, short_description, price, main_image
       FROM products
       WHERE status = 'published' AND (name LIKE ? OR description LIKE ? OR tags LIKE ? OR sku LIKE ?)`,
      [term, term, term, term]
    );
    products.forEach((p) => {
      results.push({
        type: 'product',
        title: p.name,
        url: `/products/${p.slug}`,
        description: p.short_description,
        extra: `₹${p.price}`,
        image: p.main_image,
      });
    });

    // Services
    const services = dbQuery<any>(
      `SELECT id, title, slug, short_description, price, is_academy_course, featured_image
       FROM services
       WHERE is_published = 1 AND (title LIKE ? OR description LIKE ? OR short_description LIKE ?)`,
      [term, term, term]
    );
    services.forEach((s) => {
      results.push({
        type: s.is_academy_course ? 'course' : 'service',
        title: s.title,
        url: `/services/${s.slug}`,
        description: s.short_description,
        extra: `₹${s.price}`,
        image: s.featured_image,
      });
    });

    // Transformations
    const transformations = dbQuery<any>(
      `SELECT id, title, description, after_image
       FROM before_after_entries
       WHERE is_published = 1 AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)`,
      [term, term, term]
    );
    transformations.forEach((t) => {
      results.push({
        type: 'transformation',
        title: t.title,
        url: `/transformations`,
        description: t.description,
        image: t.after_image,
      });
    });

    // Blog
    const blog = dbQuery<any>(
      `SELECT id, title, slug, excerpt, featured_image
       FROM blog_posts
       WHERE status = 'published' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)`,
      [term, term, term]
    );
    blog.forEach((b) => {
      results.push({
        type: 'blog',
        title: b.title,
        url: `/blog/${b.slug}`,
        description: b.excerpt,
        image: b.featured_image,
      });
    });
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Package className="w-4 h-4 text-amber-400" />;
      case 'course':
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      case 'service':
        return <Sparkles className="w-4 h-4 text-gold-400" />;
      case 'transformation':
        return <ImageIcon className="w-4 h-4 text-emerald-400" />;
      default:
        return <FileText className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-cream-50">
            Search Results
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Showing results for &ldquo;<span className="text-gold-400 font-semibold">{q}</span>&rdquo;
          </p>

          {/* Search Bar Form */}
          <form action="/search" method="GET" className="mt-6 relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search services, products, courses..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-obsidian-900 border border-neutral-800 text-sm text-cream-100 placeholder-neutral-500 focus:outline-none focus:border-gold-500"
            />
          </form>
        </div>

        {/* Results */}
        {q && results.length === 0 ? (
          <div className="py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
            <Search className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-cream-100">No matches found</h3>
            <p className="text-xs text-neutral-400 mt-1">Try keywords like &ldquo;Keratin&rdquo;, &ldquo;Diploma&rdquo;, or &ldquo;Balayage&rdquo;.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((item, idx) => (
              <Link
                key={idx}
                href={item.url}
                className="flex items-center gap-4 p-4 rounded-2xl bg-obsidian-900/60 hover:bg-obsidian-900 border border-neutral-800 hover:border-gold-500/30 transition-all group"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover bg-neutral-900 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0">
                    {getTypeIcon(item.type)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                      {item.type}
                    </span>
                    <h3 className="text-base font-serif font-bold text-cream-100 group-hover:text-gold-400 transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="text-xs text-neutral-400 truncate mt-1">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.extra && (
                  <span className="text-sm font-bold text-gold-400 shrink-0 font-sans">
                    {item.extra}
                  </span>
                )}

                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-gold-400 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
