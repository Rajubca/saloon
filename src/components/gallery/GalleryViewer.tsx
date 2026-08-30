'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GalleryItem } from '@/types';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn, Filter, Sparkles } from 'lucide-react';

interface GalleryViewerProps {
  items: GalleryItem[];
}

export default function GalleryViewer({ items }: GalleryViewerProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Extract unique categories/tags
  const filterOptions = useMemo(() => {
    const tags = new Set<string>();
    items.forEach((item) => {
      if (item.tags) {
        item.tags.split(',').forEach((t) => tags.add(t.trim().toLowerCase()));
      }
    });
    return ['all', ...Array.from(tags).slice(0, 6)];
  }, [items]);

  // Filter items based on selected tag
  const filteredItems = useMemo(() => {
    if (selectedTag === 'all') return items;
    return items.filter((item) =>
      item.tags?.toLowerCase().includes(selectedTag)
    );
  }, [items, selectedTag]);

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [currentIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [currentIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  // Keyboard navigation
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

  const activeItem = currentIndex !== null ? filteredItems[currentIndex] : null;

  return (
    <div>
      {/* Category Filter Chips */}
      {filterOptions.length > 2 && (
        <div className="mt-8 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {filterOptions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(tag);
                setCurrentIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all capitalize ${
                selectedTag === tag
                  ? 'bg-gold-500 text-black shadow-luxury-gold scale-105'
                  : 'bg-obsidian-900/90 text-neutral-300 border border-gold-500/20 hover:border-gold-500/50 hover:text-gold-300'
              }`}
            >
              {tag === 'all' ? 'All Artistry' : tag}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setCurrentIndex(index)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-obsidian-950 border border-gold-500/20 cursor-pointer shadow-lg hover:border-gold-500/60 transition-all hover:scale-[1.02] active:scale-95"
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

            {/* Hover Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-left">
              <div className="flex justify-end">
                <div className="p-2 rounded-full bg-black/70 text-gold-400 backdrop-blur-sm border border-gold-500/30">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-sm font-serif font-bold text-cream-100 line-clamp-1 block">
                  {item.title}
                </span>
                {item.caption && (
                  <span className="text-xs text-gold-400/90 line-clamp-2 block mt-1 font-light leading-relaxed">
                    {item.caption}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-500 text-sm">No lookbook photos found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal with Previous & Next Navigation */}
      {activeItem && currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Top Bar */}
          <div
            className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider">
              <span>Photo {currentIndex + 1} of {filteredItems.length}</span>
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

          {/* Left Arrow (Previous) */}
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

          {/* Right Arrow (Next) */}
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

          {/* Center Image */}
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

            {/* Title & Caption */}
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

            {/* Keyboard Shortcuts Hint */}
            <div className="mt-3 hidden sm:flex items-center gap-3 text-[11px] text-neutral-500">
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">→</kbd> to navigate</span>
              <span>•</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
