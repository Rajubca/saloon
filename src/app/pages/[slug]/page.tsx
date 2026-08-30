import { notFound } from 'next/navigation';
import { dbGet } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { constructMetadata } from '@/lib/seo';
import { PageContent } from '@/types';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await seedDatabase();
  const page = dbGet<PageContent>('SELECT * FROM pages WHERE slug = ?', [params.slug]);
  if (!page) return { title: 'Page Not Found' };

  return constructMetadata({
    title: page.seo_title || page.title,
    description: page.seo_description,
  });
}

export default async function CMSCustomPage({
  params,
}: {
  params: { slug: string };
}) {
  await seedDatabase();

  const page = dbGet<PageContent>('SELECT * FROM pages WHERE slug = ?', [params.slug]);

  if (!page || page.status !== 'published') {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium truncate">{page.title}</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 leading-tight mb-8">
          {page.title}
        </h1>

        {/* Featured Image if exists */}
        {page.featured_image && (
          <div className="mb-10 rounded-3xl overflow-hidden bg-obsidian-900 border border-gold-500/30 aspect-[16/9]">
            <img src={page.featured_image} alt={page.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content Body */}
        <div
          className="prose prose-invert max-w-none text-neutral-300 text-base sm:text-lg leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:font-bold [&>h2]:text-cream-100 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-gold-400 [&>ul]:list-disc [&>ul]:pl-6 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
