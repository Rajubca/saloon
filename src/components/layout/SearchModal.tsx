'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, GraduationCap, Package, ArrowRight, Loader2, FileText, Image as ImageIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface SearchResult {
  type: 'product' | 'service' | 'course' | 'offer' | 'blog' | 'page' | 'transformation';
  title: string;
  url: string;
  description?: string;
  extra?: string;
  image?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Package className="w-4 h-4 text-amber-400" />;
      case 'course':
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      case 'service':
        return <Sparkles className="w-4 h-4 text-gold-400" />;
      case 'transformation':
        return <ImageIcon className="w-4 h-4 text-emerald-400" />;
      default:
        return <FileText className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Dialog */}
      <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-4 flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-neutral-800 gap-3">
          <Search className="w-5 h-5 text-gold-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hair services, academy courses, products, balayage, offers..."
            className="w-full bg-transparent text-cream-100 placeholder-neutral-500 text-base focus:outline-none"
          />
          {isLoading && <Loader2 className="w-5 h-5 text-gold-400 animate-spin shrink-0" />}
          {query && !isLoading && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 text-xs font-mono text-neutral-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.length >= 2 && results.length === 0 && !isLoading && (
            <div className="py-12 text-center">
              <Search className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <p className="text-cream-200 font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-neutral-400 text-xs mt-1">
                Try searching for &ldquo;Nano-Plastia&rdquo;, &ldquo;Diploma&rdquo;, &ldquo;Argan&rdquo;, or &ldquo;Bridal&rdquo;.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2">
                Found {results.length} results
              </span>
              {results.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.url}
                  onClick={onClose}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-neutral-800/60 border border-transparent hover:border-gold-500/20 transition-all group"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-900 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                        {item.type}
                      </span>
                      <h4 className="text-sm font-semibold text-cream-100 group-hover:text-gold-400 transition-colors truncate">
                        {item.title}
                      </h4>
                    </div>
                    {item.description && (
                      <p className="text-xs text-neutral-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {item.extra && (
                    <span className="text-xs font-bold text-gold-400 shrink-0 font-sans">
                      {item.extra}
                    </span>
                  )}

                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-gold-400 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          )}

          {!query && (
            <div className="py-6 px-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Popular Quick Searches
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  'Russian Nano-Plastia',
                  'Cosmetology Diploma',
                  'French Balayage',
                  'HD Bridal Suite',
                  'Pure Argan Serum',
                  'HydraFacial Glow',
                  'Special Offers',
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-neutral-800/80 hover:bg-gold-500 hover:text-black border border-neutral-700/60 text-xs text-cream-200 transition-all font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
