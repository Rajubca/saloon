import { MetadataRoute } from 'next';
import { dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await seedDatabase();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const routes = [
    '',
    '/services',
    '/products',
    '/transformations',
    '/offers',
    '/gallery',
    '/blog',
    '/contact',
    '/pages/about',
    '/pages/faq',
    '/pages/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic services
  const services = dbQuery<{ slug: string }>("SELECT slug FROM services WHERE is_published = 1");
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic products
  const products = dbQuery<{ slug: string }>("SELECT slug FROM products WHERE status = 'published'");
  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic blog posts
  const posts = dbQuery<{ slug: string }>("SELECT slug FROM blog_posts WHERE status = 'published'");
  const blogRoutes = posts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes, ...productRoutes, ...blogRoutes];
}
