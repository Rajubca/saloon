'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatCurrency, calculateDiscount } from '@/lib/utils';
import { ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency?: string;
}

export default function ProductCard({ product, currency = '₹' }: ProductCardProps) {
  const discount = calculateDiscount(product.price, product.sale_price);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-obsidian-900/60 border border-gold-500/15 hover:border-gold-500/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-luxury hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-950">
        <img
          src={product.main_image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {Boolean(product.is_new) && (
            <span className="px-2.5 py-0.5 rounded-full bg-gold-500 text-black text-[10px] font-bold tracking-wider uppercase shadow-md">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-md">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {product.stock_count <= 0 && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="px-3 py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold tracking-wider uppercase">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 z-10 p-4">
          <Link
            href={`/products/${product.slug}`}
            className="px-4 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs tracking-wider flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-5">
        {product.category_name && (
          <span className="text-[11px] font-medium tracking-widest text-gold-400/80 uppercase">
            {product.category_name}
          </span>
        )}

        <Link href={`/products/${product.slug}`} className="mt-1 group/title">
          <h3 className="text-base font-serif font-bold text-cream-100 group-hover/title:text-gold-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed flex-1">
          {product.short_description}
        </p>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gold-400 font-sans">
              {formatCurrency(product.sale_price && product.sale_price > 0 ? product.sale_price : product.price, currency)}
            </span>
            {product.sale_price && product.sale_price < product.price && (
              <span className="text-xs text-neutral-500 line-through">
                {formatCurrency(product.price, currency)}
              </span>
            )}
          </div>

          <Link
            href={`/contact?product=${product.sku}`}
            className="px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500 hover:text-black border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider transition-all flex items-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
