import { dbQuery } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings } from '@/lib/seo';
import { BlogPost, Category } from '@/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  await seedDatabase();
  const settings = getSiteSettings();

  const { category, search } = searchParams;

  let sql = `
    SELECT b.*, u.name as author_name, c.name as category_name, c.slug as category_slug
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    LEFT JOIN categories c ON b.category_id = c.id
    WHERE b.status = 'published'
  `;
  const params: any[] = [];

  if (category) {
    sql += ' AND (c.slug = ? OR c.id = ?)';
    params.push(category, category);
  }

  if (search) {
    sql += ' AND (b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ? OR b.tags LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  sql += ' ORDER BY b.published_at DESC';

  const posts = dbQuery<BlogPost>(sql, params);
  const categories = dbQuery<Category>(
    "SELECT * FROM categories WHERE type = 'blog' AND is_active = 1 ORDER BY display_order ASC"
  );

  return (
    <div className="py-12 sm:py-20 bg-obsidian-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
            SALON JOURNAL &amp; COSMETOLOGY EDUCATION
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-serif font-bold text-cream-50">
            Hair Health &amp; Beauty Journal
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
            Insights, chemical care guides, and career roadmaps written by Master Stylist Rajesh Joshi.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-obsidian-900/60 border border-neutral-800">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                !category
                  ? 'bg-gold-500 text-black shadow-md'
                  : 'bg-obsidian-950 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              All Articles
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  category === cat.slug
                    ? 'bg-gold-500 text-black shadow-md'
                    : 'bg-obsidian-950 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <form action="/blog" method="GET" className="relative flex items-center">
            {category && <input type="hidden" name="category" value={category} />}
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3" />
            <input
              type="text"
              name="search"
              defaultValue={search || ''}
              placeholder="Search articles..."
              className="pl-8 pr-3 py-1.5 rounded-full bg-obsidian-950 border border-neutral-800 text-xs text-cream-100 placeholder-neutral-500 focus:outline-none focus:border-gold-500"
            />
          </form>
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col rounded-3xl bg-obsidian-900/60 border border-gold-500/15 hover:border-gold-500/40 overflow-hidden transition-all duration-300 hover:shadow-luxury hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-950">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-gold-400 text-[10px] font-bold tracking-wider uppercase border border-gold-500/30">
                  {post.category_name || 'Hair Care'}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>{post.reading_time_min} Min Read</span>
                  </span>
                  <span>•</span>
                  <span>{formatDate(post.published_at || post.created_at)}</span>
                </div>

                <Link href={`/blog/${post.slug}`} className="group/title">
                  <h3 className="text-lg font-serif font-bold text-cream-100 group-hover/title:text-gold-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="mt-2 text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed flex-1 font-light">
                  {post.excerpt}
                </p>

                <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">
                    By {post.author_name || 'Rajesh Joshi'}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1 group-hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
