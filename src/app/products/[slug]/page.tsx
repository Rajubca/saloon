import { notFound } from 'next/navigation';
import { dbGet, dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings, constructMetadata } from '@/lib/seo';
import { Product, ProductImage } from '@/types';
import { formatCurrency, calculateDiscount } from '@/lib/utils';
import Link from 'next/link';
import { ShoppingBag, Star, CheckCircle2, ShieldCheck, ArrowRight, Truck, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await seedDatabase();
  const product = dbGet<Product>('SELECT * FROM products WHERE slug = ?', [params.slug]);
  if (!product) return { title: 'Product Not Found' };

  return constructMetadata({
    title: product.name,
    description: product.short_description,
    image: product.main_image,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  await seedDatabase();
  const settings = getSiteSettings();

  const product = dbGet<any>(
    `SELECT p.*, c.name as category_name, c.slug as category_slug
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.slug = ?`,
    [params.slug]
  );

  if (!product) {
    notFound();
  }

  const galleryImages = dbQuery<ProductImage>(
    'SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order ASC',
    [product.id]
  );

  let parsedSpecs: Record<string, string> = {};
  try {
    if (product.specifications) {
      parsedSpecs = JSON.parse(product.specifications);
    }
  } catch (e) {
    parsedSpecs = {};
  }

  const discount = calculateDiscount(product.price, product.sale_price);

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold-400">Shop</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Product Image Showcase (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-obsidian-900 border border-gold-500/30 shadow-luxury">
              <img
                src={product.main_image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Gallery Images Strip */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="aspect-square rounded-xl overflow-hidden bg-obsidian-900 border border-neutral-800"
                  >
                    <img src={img.image_url} alt={img.alt_text || product.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Purchase Action (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
                {product.category_name || 'Hair Care'} • SKU: {product.sku}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-cream-50 leading-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold font-sans text-gold-400">
                  {formatCurrency(product.sale_price && product.sale_price > 0 ? product.sale_price : product.price, settings.currency_symbol)}
                </span>
                {product.sale_price && product.sale_price < product.price && (
                  <span className="text-lg text-neutral-500 line-through font-sans">
                    {formatCurrency(product.price, settings.currency_symbol)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs">
              {product.stock_count > 0 ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>In Stock ({product.stock_count} units available at studio)</span>
                </span>
              ) : (
                <span className="text-red-400 font-semibold">Currently Out of Stock</span>
              )}
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              {product.short_description}
            </p>

            {/* Inquire & Buy Actions */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amberGold text-black font-bold text-sm tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-luxury-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Reserve / Order via Studio</span>
              </Link>

              <a
                href={`https://wa.me/${settings.whatsapp_number}?text=Hello%20Free%20Bird%20Salon,%20I%20want%20to%20order%20the%20${encodeURIComponent(product.name)}%20(SKU:%20${product.sku}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Order on WhatsApp</span>
              </a>
            </div>

            {/* Specs Table */}
            {Object.keys(parsedSpecs).length > 0 && (
              <div className="pt-6 border-t border-neutral-800 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cream-100 font-sans">
                  Formula Specifications
                </h3>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {Object.entries(parsedSpecs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-neutral-800/60">
                      <span className="text-neutral-400">{key}</span>
                      <span className="font-semibold text-cream-100 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Rich Description */}
            <div className="pt-6 border-t border-neutral-800 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cream-100 font-sans">
                Product Details
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
