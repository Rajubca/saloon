import { notFound } from 'next/navigation';
import { dbGet, dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { constructMetadata } from '@/lib/seo';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Clock, User, ArrowRight, Share2, Calendar, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await seedDatabase();
  const post = dbGet<BlogPost>('SELECT * FROM blog_posts WHERE slug = ?', [params.slug]);
  if (!post) return { title: 'Post Not Found' };

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.featured_image,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  await seedDatabase();

  const post = dbGet<any>(
    `SELECT b.*, u.name as author_name, u.avatar as author_avatar, c.name as category_name, c.slug as category_slug
     FROM blog_posts b
     LEFT JOIN users u ON b.author_id = u.id
     LEFT JOIN categories c ON b.category_id = c.id
     WHERE b.slug = ?`,
    [params.slug]
  );

  if (!post) {
    notFound();
  }

  // Related posts
  const relatedPosts = dbQuery<BlogPost>(
    `SELECT * FROM blog_posts WHERE id != ? AND status = 'published' LIMIT 2`,
    [post.id]
  );

  return (
    <article className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold-400">Blog</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gold-500/15 text-gold-400 text-xs font-bold uppercase tracking-wider border border-gold-500/30">
              {post.category_name || 'Hair Care Guide'}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs text-neutral-400">{post.reading_time_min} Min Read</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 leading-tight">
            {post.title}
          </h1>

          {/* Author Strip */}
          <div className="flex items-center justify-between py-4 border-y border-neutral-800 text-xs text-neutral-300">
            <div className="flex items-center gap-3">
              {post.author_avatar ? (
                <img src={post.author_avatar} alt={post.author_name} className="w-10 h-10 rounded-full object-cover border border-gold-500/40" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                  {post.author_name?.charAt(0) || 'R'}
                </div>
              )}
              <div>
                <p className="font-semibold text-cream-100">{post.author_name || 'Rajesh Joshi'}</p>
                <p className="text-neutral-400">{formatDate(post.published_at || post.created_at)}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mt-8 relative aspect-[16/9] rounded-3xl overflow-hidden bg-obsidian-900 border border-gold-500/30 shadow-luxury">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article HTML Content */}
        <div
          className="mt-10 prose prose-invert max-w-none text-neutral-300 text-base sm:text-lg leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:font-bold [&>h2]:text-cream-100 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-gold-400 [&>ul]:list-disc [&>ul]:pl-6 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && (
          <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mr-2">Tags:</span>
            {post.tags.split(',').map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Consultation Callout in Blog */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-obsidian-900 via-gold-950/40 to-obsidian-900 border border-gold-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-cream-100">Ready for Your Transformation?</h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-light">Book your private consultation with Master Stylist Rajesh Joshi in Vadodara.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider shrink-0 shadow-luxury-gold"
          >
            Book Appointment
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-neutral-800">
            <h3 className="text-2xl font-serif font-bold text-cream-100 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-obsidian-900/60 border border-neutral-800 hover:border-gold-500/40 transition-all flex flex-col justify-between group"
                >
                  <h4 className="font-serif font-bold text-cream-100 group-hover:text-gold-400 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <span className="text-xs text-gold-400 flex items-center gap-1 mt-4 font-semibold">
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
