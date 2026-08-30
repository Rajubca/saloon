import { NextRequest, NextResponse } from 'next/server';
import { dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const term = `%${q}%`;
  const results: any[] = [];

  // Search Products
  const products = dbQuery<any>(
    `SELECT id, name, slug, short_description, price, main_image
     FROM products
     WHERE status = 'published' AND (name LIKE ? OR description LIKE ? OR tags LIKE ? OR sku LIKE ?)
     LIMIT 5`,
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

  // Search Services & Courses
  const services = dbQuery<any>(
    `SELECT id, title, slug, short_description, price, is_academy_course, featured_image
     FROM services
     WHERE is_published = 1 AND (title LIKE ? OR description LIKE ? OR short_description LIKE ?)
     LIMIT 5`,
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

  // Search Before/Afters
  const transformations = dbQuery<any>(
    `SELECT id, title, description, after_image
     FROM before_after_entries
     WHERE is_published = 1 AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)
     LIMIT 4`,
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

  // Search Offers
  const offers = dbQuery<any>(
    `SELECT id, title, description, coupon_code, banner_image
     FROM offers
     WHERE is_active = 1 AND (title LIKE ? OR description LIKE ? OR coupon_code LIKE ?)
     LIMIT 3`,
    [term, term, term]
  );
  offers.forEach((o) => {
    results.push({
      type: 'offer',
      title: o.title,
      url: `/offers`,
      description: o.description,
      extra: o.coupon_code ? `Code: ${o.coupon_code}` : undefined,
      image: o.banner_image,
    });
  });

  // Search Blog Posts
  const blog = dbQuery<any>(
    `SELECT id, title, slug, excerpt, featured_image
     FROM blog_posts
     WHERE status = 'published' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
     LIMIT 3`,
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

  // Search Pages
  const pages = dbQuery<any>(
    `SELECT id, title, slug
     FROM pages
     WHERE status = 'published' AND (title LIKE ? OR content LIKE ?)
     LIMIT 3`,
    [term, term]
  );
  pages.forEach((page) => {
    results.push({
      type: 'page',
      title: page.title,
      url: `/pages/${page.slug}`,
    });
  });

  return NextResponse.json({ results });
}
