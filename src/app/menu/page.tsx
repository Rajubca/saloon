"use client";

import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = {
  Drinks: [
    { name: "Neon Sunset", price: "$12", desc: "Tequila, orange liqueur, grenadine, lime" },
    { name: "Smoked Whiskey Sour", price: "$14", desc: "Bourbon, lemon, simple syrup, smoke" },
    { name: "Draft Beer", price: "$6", desc: "Local craft selections" }
  ],
  Cocktails: [
    { name: "The Free Bird", price: "$16", desc: "Signature gin blend, elderflower, tonic" },
    { name: "Midnight Margarita", price: "$13", desc: "Blackberry infused tequila, lime, salt rim" }
  ],
  Food: [
    { name: "Saloon Sliders", price: "$15", desc: "Three beef sliders, cheddar, caramelized onions" },
    { name: "Loaded Fries", price: "$10", desc: "Bacon, cheese sauce, jalapeños" },
    { name: "Smoked Brisket Tacos", price: "$18", desc: "Slow-smoked brisket, house slaw" }
  ]
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof menuItems>("Drinks");

  return (
    <PageTransition>
      <div className="pt-12 pb-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-600 mb-6 text-neon">Provisions</h1>

          <div className="flex justify-center gap-4 mt-8">
            {Object.keys(menuItems).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as keyof typeof menuItems)}
                className={`px-6 py-2 border uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'border-brand-600 bg-brand-600/10 text-brand-600'
                    : 'border-brand-800 text-brand-400 hover:border-brand-600/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {menuItems[activeCategory].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-6 border-b border-brand-800 hover:bg-brand-800/10 transition-colors"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-2xl font-serif text-brand-100">{item.name}</h3>
                  <span className="text-brand-600 font-serif text-xl">{item.price}</span>
                </div>
                <p className="text-brand-400 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  );
}
