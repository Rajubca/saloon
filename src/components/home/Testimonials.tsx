'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Riya Patel",
    service: "Bridal Makeup",
    review: "I had my bridal makeup done at xSaloon and it was absolutely perfect. The team is incredibly professional and made me feel so comfortable. The makeup lasted all day!"
  },
  {
    name: "Aman Desai",
    service: "Precision Haircut",
    review: "Best haircut I've had in Baroda. The stylist really took the time to understand what I wanted and gave great recommendations. The ambiance is very relaxing."
  },
  {
    name: "Sneha Shah",
    service: "Luxury Hair Spa",
    review: "The hair spa treatment is a must-try. My hair feels incredibly soft and the head massage was so therapeutic. Highly recommend booking an appointment here."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-brand-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-500 uppercase tracking-widest text-sm font-semibold mb-4 block"
          >
            Client Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-brand-900 font-bold"
          >
            Words of Praise
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 md:p-10 shadow-sm border border-brand-100 relative group hover:shadow-xl transition-shadow duration-500"
            >
              <div className="flex space-x-1 mb-6 text-brand-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-brand-700 italic mb-8 leading-relaxed text-sm">
                &quot;{testimonial.review}&quot;
              </p>

              <div>
                <h4 className="font-serif font-bold text-brand-900 text-lg">{testimonial.name}</h4>
                <p className="text-brand-500 text-xs uppercase tracking-widest mt-1">{testimonial.service}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
