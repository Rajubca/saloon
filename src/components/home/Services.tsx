'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Precision Haircut',
    desc: 'Expert cutting tailored to your face shape and personal style, including a relaxing wash and finish.',
    price: '₹250+',
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2576&auto=format&fit=crop'
  },
  {
    title: 'Luxury Hair Spa',
    desc: 'Deep conditioning treatment that nourishes the roots, revitalizes hair, and soothes the scalp.',
    price: '₹800+',
    img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop'
  },
  {
    title: 'Coloring & Highlights',
    desc: 'Vibrant, long-lasting color from subtle highlights to complete transformations using premium dyes.',
    price: '₹1200+',
    img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2636&auto=format&fit=crop'
  },
  {
    title: 'Facial Treatments',
    desc: 'Rejuvenating skincare tailored to your skin type, leaving you with a radiant, youthful glow.',
    price: '₹500+',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Manicure & Pedicure',
    desc: 'Complete nail care including shaping, cuticle work, massage, and expert polish application.',
    price: '₹400+',
    img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2669&auto=format&fit=crop'
  },
  {
    title: 'Bridal Makeup',
    desc: 'Flawless, long-wearing makeup application designed specifically for your special day.',
    price: '₹5000+',
    img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2671&auto=format&fit=crop'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-500 uppercase tracking-widest text-sm font-semibold mb-4 block"
          >
            Our Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-4xl md:text-5xl font-serif text-brand-900 font-bold"
          >
            Signature Services
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden mb-6">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url("${service.img}")` }}
                />
                <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white font-serif italic text-2xl drop-shadow-lg">Discover</span>
                </div>
              </div>

              <div className="px-2">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-serif text-brand-900 font-bold">{service.title}</h3>
                  <span className="text-brand-600 font-medium">{service.price}</span>
                </div>
                <p className="text-brand-700 leading-relaxed text-sm">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
