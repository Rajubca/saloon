"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface SliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: SliderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Only set mounted state after initial render to avoid hydration mismatch
    const timer = setTimeout(() => {
        setIsMounted(true);
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const x = useMotionValue(containerWidth / 2);
  const clipPath = useTransform(x, (value) => `inset(0 ${containerWidth - value}px 0 0)`);

  if (!isMounted) return <div className="w-full h-[600px] bg-muted animate-pulse rounded-xl" />;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] overflow-hidden rounded-xl cursor-ew-resize select-none"
    >
      {/* Before Image (Background) */}
      <Image
        src={beforeImage}
        alt="Before transformation"
        fill
        className="object-cover pointer-events-none"
        priority
      />

      {/* After Image (Foreground, clipped) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath }}
      >
        <Image
          src={afterImage}
          alt="After transformation"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
        style={{ x }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-primary rounded-full" />
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
