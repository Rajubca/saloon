'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-brand-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1 relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="text-brand-500 uppercase tracking-widest text-sm font-semibold mb-4 block"
            >
              The xSaloon Experience
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-900 font-bold mb-8 leading-tight"
            >
              Elevate Your <br />
              <span className="text-brand-600 italic font-light">Style & Spirit</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="text-brand-700 text-lg leading-relaxed mb-6"
            >
              Located in the vibrant heart of Vaghodia Road, Baroda, xSaloon is more than just a place to get a haircut. It&apos;s a sanctuary designed for those who appreciate the finer details of self-care.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="text-brand-700 text-lg leading-relaxed mb-10"
            >
              Our master stylists and therapists bring years of expertise, utilizing premium products and innovative techniques to craft a look that is uniquely yours. We believe that when you look exceptional, you feel extraordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="flex items-center gap-6"
            >
              <div className="text-center border-r border-brand-200 pr-6">
                <span className="block text-4xl font-serif font-bold text-brand-900 mb-1">10+</span>
                <span className="text-sm text-brand-600 uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-serif font-bold text-brand-900 mb-1">5k+</span>
                <span className="text-sm text-brand-600 uppercase tracking-wider">Happy Clients</span>
              </div>
            </motion.div>
          </div>

          {/* Images */}
          <div className="lg:w-1/2 order-1 lg:order-2 w-full relative h-[500px] md:h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="absolute inset-0 right-10 top-10 bg-brand-200"
            />
            <motion.div
              initial={{ opacity: 0, x: 50, y: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="absolute inset-4 bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=2511&auto=format&fit=crop")' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
