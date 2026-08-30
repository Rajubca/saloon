'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, Minimize2, MoveHorizontal, MoveVertical, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
  initialPosition?: number;
  orientation?: 'horizontal' | 'vertical';
  allowOrientationToggle?: boolean;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-[4/3]" or "aspect-[16/9]"
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  title,
  description,
  initialPosition = 50,
  orientation: initialOrientation = 'horizontal',
  allowOrientationToggle = true,
  className = '',
  aspectRatio = 'aspect-[4/3] sm:aspect-[16/10]',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(initialOrientation);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      let pos = 50;
      if (orientation === 'horizontal') {
        const x = clientX - rect.left;
        pos = (x / rect.width) * 100;
      } else {
        const y = clientY - rect.top;
        pos = (y / rect.height) * 100;
      }

      // Clamp between 0% and 100%
      pos = Math.max(0, Math.min(100, pos));
      setSliderPosition(pos);
    },
    [orientation]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX, e.clientY);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Keyboard Accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSliderPosition((prev) => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSliderPosition((prev) => Math.min(100, prev + 5));
      }
    } else {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSliderPosition((prev) => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSliderPosition((prev) => Math.min(100, prev + 5));
      }
    }
  };

  return (
    <div className={`relative flex flex-col group ${className}`}>
      {/* Viewer Frame */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-label="Before and after transformation comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        className={`relative w-full ${
          isFullscreen ? 'fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8' : `${aspectRatio} rounded-2xl overflow-hidden shadow-2xl border border-gold-500/20`
        } select-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200`}
      >
        <div className={`relative w-full h-full ${isFullscreen ? 'max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden border border-gold-500/30' : ''}`}>
          {/* After Image (Background Layer) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={afterImage}
              alt="After transformation"
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />
            {/* After Floating Badge */}
            <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-gold-500/40 text-gold-400 text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{afterLabel}</span>
            </div>
          </div>

          {/* Before Image (Clipped Foreground Layer) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
            style={{
              clipPath:
                orientation === 'horizontal'
                  ? `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`
                  : `polygon(0% 0%, 100% 0%, 100% ${sliderPosition}%, 0% ${sliderPosition}%)`,
            }}
          >
            <img
              src={beforeImage}
              alt="Before transformation"
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />
            {/* Before Floating Badge */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-obsidian-900/80 backdrop-blur-md border border-white/20 text-cream-200 text-xs font-semibold tracking-wider shadow-lg">
              <span>{beforeLabel}</span>
            </div>

            {/* Interaction Hint Pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-500/30 text-[10px] font-semibold text-gold-300 pointer-events-none opacity-90 uppercase tracking-widest hidden sm:flex items-center gap-1.5 shadow-md">
              <MoveHorizontal className="w-3 h-3 text-gold-400" />
              <span>Drag to Compare</span>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="absolute z-20 pointer-events-none"
            style={
              orientation === 'horizontal'
                ? {
                    left: `${sliderPosition}%`,
                    top: 0,
                    bottom: 0,
                    transform: 'translateX(-50%)',
                  }
                : {
                    top: `${sliderPosition}%`,
                    left: 0,
                    right: 0,
                    transform: 'translateY(-50%)',
                  }
            }
          >
            {/* Divider Line */}
            <div
              className={`bg-gradient-to-b from-gold-300 via-gold-500 to-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.8)] ${
                orientation === 'horizontal' ? 'w-[2.5px] h-full' : 'h-[2.5px] w-full'
              }`}
            />

            {/* Handle Knob */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-obsidian-950 border-2 border-gold-500 shadow-luxury-gold flex items-center justify-center text-gold-400 transition-transform animate-gold-glow ${
                isDragging ? 'scale-110' : 'group-hover:scale-105'
              }`}
            >
              {orientation === 'horizontal' ? (
                <MoveHorizontal className="w-5 h-5 text-gold-400 animate-pulse" />
              ) : (
                <MoveVertical className="w-5 h-5 text-gold-400 animate-pulse" />
              )}
            </div>

            {/* Live Percentage Tooltip */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-gold-300 border border-gold-500/30 whitespace-nowrap shadow-md">
              {Math.round(sliderPosition)}%
            </div>
          </div>

          {/* Controls Bar (Orientation Toggle & Fullscreen) */}
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 pointer-events-auto">
            {allowOrientationToggle && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOrientation((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
                }}
                className="p-2 rounded-full bg-black/60 hover:bg-gold-500 hover:text-black text-white/80 backdrop-blur-md border border-white/10 transition-all text-xs flex items-center gap-1.5 shadow"
                title={`Switch to ${orientation === 'horizontal' ? 'Vertical' : 'Horizontal'} split`}
              >
                {orientation === 'horizontal' ? <MoveVertical className="w-3.5 h-3.5" /> : <MoveHorizontal className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen((prev) => !prev);
              }}
              className="p-2 rounded-full bg-black/60 hover:bg-gold-500 hover:text-black text-white/80 backdrop-blur-md border border-white/10 transition-all text-xs shadow"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Optional Title & Description */}
      {(title || description) && (
        <div className="mt-4 px-1">
          {title && <h4 className="text-lg font-serif font-bold text-cream-100 group-hover:text-gold-400 transition-colors">{title}</h4>}
          {description && <p className="mt-1 text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">{description}</p>}
        </div>
      )}
    </div>
  );
}
