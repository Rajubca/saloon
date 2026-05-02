"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const services = [
    { title: "Bridal Makeup", desc: "Flawless perfection for your special day.", img: "/assets/placeholder-bridal.jpg" },
    { title: "Hair Styling", desc: "Modern cuts, coloring, and styling.", img: "/assets/placeholder-hair.jpg" },
    { title: "Skin Treatments", desc: "Rejuvenating therapies for a radiant glow.", img: "/assets/placeholder-skin.jpg" }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-950/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent z-10" />
          {/* Using a placeholder div for image to satisfy boundaries, but ready for next/image */}
          <div className="w-full h-full bg-brand-800/20" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <span className="text-brand-500 tracking-[0.3em] uppercase text-sm mb-6 block">Welcome to Free Bird</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-50 mb-8 leading-tight">
              Unleash Your <span className="text-gradient italic">Beauty</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Baroda&apos;s premier luxury studio for bridal makeup, hair styling, and transformative skin treatments.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/booking">Book Appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-brand-900/50 backdrop-blur-sm">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-32 px-6 bg-brand-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-100 mb-4">Our Signature Services</h2>
              <div className="w-20 h-1 bg-brand-500" />
            </div>
            <Link href="/services" className="text-brand-400 hover:text-brand-500 uppercase tracking-wider text-sm flex items-center gap-2 group transition-colors">
              View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="group cursor-pointer relative overflow-hidden glass-card rounded-lg h-[400px]"
              >
                <div className="absolute inset-0 bg-brand-800/30 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/50 to-transparent opacity-80" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-serif text-brand-100 mb-2 group-hover:text-brand-400 transition-colors">{service.title}</h3>
                  <p className="text-brand-300/80 mb-4">{service.desc}</p>
                  <div className="w-10 h-[1px] bg-brand-500 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-brand-950 border-y border-brand-800/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-100 mb-16">Client Experiences</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-brand-900/50 text-left border-brand-800/50 hover:border-brand-500/50 transition-colors duration-300">
                <CardContent className="pt-8">
                  <div className="flex gap-1 mb-6 text-brand-500">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-brand-200 mb-8 italic text-lg leading-relaxed">
                    &quot;Absolutely flawless experience. The team at Free Bird made me look and feel like a queen on my wedding day. Highly recommend their bridal packages!&quot;
                  </p>
                  <div>
                    <h4 className="font-serif text-brand-300 text-lg">Priya Sharma</h4>
                    <p className="text-brand-500 text-sm">Bridal Client</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
