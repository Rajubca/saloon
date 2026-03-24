'use client';

import { motion } from 'framer-motion';

const offers = [
  {
    tag: 'First Visit',
    title: 'Welcome Discount',
    desc: 'Get 20% off on any service during your first visit to xSaloon.',
    code: 'WELCOME20',
    bg: 'bg-brand-100'
  },
  {
    tag: 'Festive Combo',
    title: 'Glow & Glamour',
    desc: 'Book a Hair Spa and Facial together and save ₹300.',
    code: 'GLOWUP',
    bg: 'bg-brand-200'
  },
  {
    tag: 'Student Special',
    title: 'Back to Campus',
    desc: 'Show your student ID and get a fresh haircut for just ₹199.',
    code: 'STUDENT199',
    bg: 'bg-brand-300'
  }
];

export default function Offers() {
  return (
    <section id="offers" className="py-24 md:py-32 bg-brand-900 text-brand-50 relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-800 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-400 uppercase tracking-widest text-sm font-semibold mb-4 block"
          >
            Exclusive Deals
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-white font-bold"
          >
            Current Offers
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 md:p-10 rounded-xl ${offer.bg} text-brand-900 shadow-xl relative overflow-hidden group`}
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                {offer.tag}
              </div>

              <h3 className="text-2xl font-serif font-bold mt-6 mb-4">{offer.title}</h3>
              <p className="text-brand-800 mb-8 text-sm leading-relaxed">
                {offer.desc}
              </p>

              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-brand-300">
                <span className="text-xs uppercase tracking-widest text-brand-500 font-bold">Code:</span>
                <span className="font-mono font-bold text-brand-900">{offer.code}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
