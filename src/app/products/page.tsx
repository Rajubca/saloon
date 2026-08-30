import { dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings } from '@/lib/seo';
import ProductCard from '@/components/ui/ProductCard';
import { Product, Category } from '@/types';
import Link from 'next/link';
import { Package, Search, Filter, Sparkles } from 'lucide-react';

import ScrollReveal from '@/components/ui/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; search?: string; inStock?: string };
}) {
  await seedDatabase();
  const settings = getSiteSettings();

  const { category, sort, search, inStock } = searchParams;

  let sql = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
  `;
  const params: any[] = [];

  if (category) {
    sql += ' AND (c.slug = ? OR c.id = ?)';
    params.push(category, category);
  }

  if (search) {
    sql += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.tags LIKE ? OR p.sku LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  if (inStock === 'true' || inStock === '1') {
    sql += ' AND p.stock_count > 0';
  }

  if (sort === 'price_asc' || sort === 'price-asc') {
    sql += ' ORDER BY COALESCE(p.sale_price, p.price) ASC';
  } else if (sort === 'price_desc' || sort === 'price-desc') {
    sql += ' ORDER BY COALESCE(p.sale_price, p.price) DESC';
  } else if (sort === 'newest') {
    sql += ' ORDER BY p.created_at DESC';
  } else {
    sql += ' ORDER BY p.display_order ASC, p.is_featured DESC';
  }

  const products = dbQuery<Product>(sql, params);
  const categories = dbQuery<Category>(
    "SELECT * FROM categories WHERE type = 'product' AND is_active = 1 ORDER BY display_order ASC"
  );

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
              SALON BOUTIQUE &amp; HAIR CARE
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-serif font-bold text-cream-50">
              Professional Hair Care &amp; Styling
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
              Keep your hair glossy, resilient, and frizz-free between salon visits with our curated salon formulas.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Navigation Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-obsidian-900/60 border border-neutral-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/products"
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                !category
                  ? 'bg-gold-500 text-black shadow-md scale-105'
                  : 'bg-obsidian-950 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              All Products
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}${sort ? `&sort=${sort}` : ''}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  category === cat.slug
                    ? 'bg-gold-500 text-black shadow-md scale-105'
                    : 'bg-obsidian-950 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Sort Dropdown & Quick Search Form */}
          <div className="flex items-center gap-3">
            <form action="/products" method="GET" className="relative flex items-center">
              {category && <input type="hidden" name="category" value={category} />}
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3" />
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Search products..."
                className="pl-8 pr-3 py-1.5 rounded-full bg-obsidian-950 border border-neutral-800 text-xs text-cream-100 placeholder-neutral-500 focus:outline-none focus:border-gold-500"
              />
            </form>

            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Link
                href={`/products?${category ? `category=${category}&` : ''}sort=price-asc`}
                className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                  sort === 'price-asc'
                    ? 'bg-gold-500/20 text-gold-400 border-gold-500/40'
                    : 'border-neutral-800 hover:text-white'
                }`}
              >
                Price: Low to High
              </Link>
              <Link
                href={`/products?${category ? `category=${category}&` : ''}sort=price-desc`}
                className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                  sort === 'price-desc'
                    ? 'bg-gold-500/20 text-gold-400 border-gold-500/40'
                    : 'border-neutral-800 hover:text-white'
                }`}
              >
                Price: High to Low
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="mt-16 py-16 text-center bg-obsidian-900/40 rounded-3xl border border-neutral-800">
            <Package className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-cream-100">No Products Found</h3>
            <p className="text-xs text-neutral-400 mt-1">Try resetting search filters or explore all categories.</p>
            <Link
              href="/products"
              className="mt-4 inline-block px-5 py-2 rounded-full bg-gold-500 text-black font-semibold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ScrollReveal key={product.id} direction="up" delay={(index % 8) * 70}>
                <div className="card-hover-lift h-full">
                  <ProductCard product={product} currency={settings.currency_symbol} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
