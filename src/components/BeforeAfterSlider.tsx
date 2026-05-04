"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

interface SliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: SliderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const clipPath = useMotionTemplate`inset(0 calc(100% - ${x}px) 0 0)`;

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMounted && containerRef.current) {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                x.set(width / 2);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }
  }, [isMounted, x]);

  if (!isMounted) return <div className="w-full h-[600px] bg-muted animate-pulse rounded-xl" />;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] overflow-hidden rounded-xl select-none"
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

      {/* Slider Handle Group */}
      <motion.div
        className="absolute top-0 bottom-0 w-8 -ml-4 cursor-ew-resize z-10 flex justify-center"
        style={{ x }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
      >
        {/* The visual line */}
        <div className="w-1 h-full bg-white pointer-events-none shadow-sm" />

        {/* The visual handle thumb */}
        <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-primary rounded-full" />
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
