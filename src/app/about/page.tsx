"use client";

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <PageTransition>
      <div className="pt-12 pb-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif text-brand-600 mb-6 text-neon">Our Story</h1>
          <p className="text-xl text-brand-300">From a dusty dream to the premier nightlife destination.</p>
        </motion.div>

        <div className="space-y-24 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-600/50 before:to-transparent">

          {[
            { year: "2018", title: "The Vision", desc: "Rajash Joshi envisioned a place where the rustic charm of old saloons met the vibrant energy of modern nightlife." },
            { year: "2020", title: "Breaking Ground", desc: "Construction began on Vaghodia Road, carefully sourcing reclaimed wood and vintage neon." },
            { year: "2023", title: "The Grand Opening", desc: "Free Bird Saloon opened its doors, instantly becoming the go-to spot for live music and premium cocktails." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-600 bg-brand-900 text-brand-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-serif">
                {index + 1}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-brand-800/20 border border-brand-600/20 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl text-brand-100">{item.title}</h3>
                  <span className="text-brand-600 text-sm font-bold">{item.year}</span>
                </div>
                <p className="text-brand-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </PageTransition>
  );
}
