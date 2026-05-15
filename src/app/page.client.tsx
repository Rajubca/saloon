"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomeClient() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fixed parallax background */}
        <div
          className="absolute inset-0 z-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed"
        />
        <div className="absolute inset-0 z-10 bg-black/60" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Unleash Your <span className="text-primary italic">Beauty</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white/80 mb-10 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Baroda&apos;s premier luxury destination for bespoke hair, skin, and bridal transformations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/booking">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all uppercase tracking-widest">
                Book Your Experience
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">The Art of Transformation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Witness the mastery of our stylists. Drag the slider to see the dramatic before and after results of our signature treatments.
            </p>
          </div>

          <BeforeAfterSlider
            beforeImage="/before.jpg"
            afterImage="/after.jpg"
          />
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}
