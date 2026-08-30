'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { GalleryItem } from '@/types';
import { Camera, ArrowRight, X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';

interface LookbookGalleryProps {
  items: GalleryItem[];
  showViewAllButton?: boolean;
  limit?: number;
  title?: string;
  subtitle?: string;
}

export default function LookbookGallery({
  items,
  showViewAllButton = true,
  limit,
  title = 'The Free Bird Experience',
  subtitle = 'Explore our luxury salon spaces, live academy masterclasses, and runway-ready client styling.',
}: LookbookGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const displayItems = limit && limit > 0 ? items.slice(0, limit) : items;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev === null ? null : (prev - 1 + displayItems.length) % displayItems.length));
  }, [currentIndex, displayItems.length]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev === null ? null : (prev + 1) % displayItems.length));
  }, [currentIndex, displayItems.length]);

  const handleClose = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  // Keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    if (currentIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, handlePrev, handleNext, handleClose]);

  if (!items || items.length === 0) return null;

  const activeItem = currentIndex !== null ? displayItems[currentIndex] : null;

  return (
    <section className="py-16 sm:py-24 bg-obsidian-900/60 relative overflow-hidden border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>VISUAL LOOKBOOK &amp; CREATIVE PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
              {title}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-light">
              {subtitle}
            </p>
          </div>

          {showViewAllButton && (
            <Link
              href="/gallery"
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-gold-500 hover:text-black border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase transition-all shadow-md group"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-obsidian-950 border border-gold-500/20 cursor-pointer shadow-lg hover:border-gold-500/60 transition-all hover:scale-[1.03] active:scale-95"
            >
              <img
                src={item.media_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-left">
                <div className="flex justify-end">
                  <div className="p-1.5 rounded-full bg-black/60 text-gold-400 backdrop-blur-sm border border-gold-500/30">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-serif font-bold text-cream-100 line-clamp-1 block">
                    {item.title}
                  </span>
                  {item.caption && (
                    <span className="text-[10px] text-gold-400/90 line-clamp-1 block mt-0.5 font-light">
                      {item.caption}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal with Prev / Next */}
      {activeItem && currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider">
              <span>Photo {currentIndex + 1} of {displayItems.length}</span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-2.5 sm:p-3 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-black hover:bg-gold-500 transition-all shadow-xl"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Left Navigation Button (Prev) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-4 rounded-full bg-neutral-900/80 hover:bg-gold-500 text-gold-400 hover:text-black border border-gold-500/30 transition-all shadow-2xl hover:scale-110 active:scale-95 group"
            title="Previous image (←)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Right Navigation Button (Next) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-4 rounded-full bg-neutral-900/80 hover:bg-gold-500 text-gold-400 hover:text-black border border-gold-500/30 transition-all shadow-2xl hover:scale-110 active:scale-95 group"
            title="Next image (→)"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Main Image Container */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-neutral-950 flex items-center justify-center max-h-[70vh]">
              <img
                src={activeItem.media_url}
                alt={activeItem.title}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain transition-opacity duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>

            {/* Caption & Metadata Strip */}
            <div className="mt-4 text-center max-w-2xl px-4">
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-cream-50">
                {activeItem.title}
              </h3>
              {activeItem.caption && (
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-light leading-relaxed">
                  {activeItem.caption}
                </p>
              )}
            </div>

            {/* Hint for keyboard users */}
            <div className="mt-3 hidden sm:flex items-center gap-3 text-[11px] text-neutral-500">
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">→</kbd> arrow keys to navigate</span>
              <span>•</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
