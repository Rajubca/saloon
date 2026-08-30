'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface BlogHighlightsProps {
  posts: BlogPost[];
}

export default function BlogHighlights({ posts }: BlogHighlightsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-obsidian-900/40 relative overflow-hidden border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>BEAUTY INSIGHTS &amp; TRENDS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
                Expert Knowledge by Rajesh Joshi
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-light">
                Master tips on maintaining keratin longevity, bridal prep secrets, and cosmetology career guides.
              </p>
            </div>

            <Link
              href="/blog"
              className="btn-shine-sweep self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-gold-500 hover:text-black border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase transition-all shadow hover:scale-105"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Blog Posts Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <ScrollReveal key={post.id} direction="up" delay={index * 120}>
              <article
                className="card-hover-lift h-full group flex flex-col rounded-3xl bg-obsidian-900/60 border border-gold-500/15 hover:border-gold-500/40 overflow-hidden transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-950">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-gold-400 text-[10px] font-bold tracking-wider uppercase border border-gold-500/30">
                    {post.category_name || 'Hair Care'}
                  </div>
                </div>

                {/* Body */}
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
