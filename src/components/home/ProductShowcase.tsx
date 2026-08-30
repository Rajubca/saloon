'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Package, ArrowRight, Sparkles } from 'lucide-react';

interface ProductShowcaseProps {
  products: Product[];
  currency?: string;
}

export default function ProductShowcase({ products, currency = '₹' }: ProductShowcaseProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-obsidian-900/40 relative overflow-hidden border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
                <Package className="w-3.5 h-3.5" />
                <span>PROFESSIONAL SALON RETAIL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
                Salon-Grade Care at Home
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-light">
                Maintain the integrity of your Keratin, Balayage, and color treatments with our exclusive, organic sulfate-free formulations.
              </p>
            </div>

            <Link
              href="/products"
              className="btn-shine-sweep self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-gold-500 hover:text-black border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase transition-all shadow hover:scale-105"
            >
              <span>Explore Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <ScrollReveal key={product.id} direction="up" delay={index * 100}>
              <div className="card-hover-lift h-full">
                <ProductCard product={product} currency={currency} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
