"use client";

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const serviceData = {
  bridal: [
    { name: "HD Bridal Makeup", price: "From ₹15,000", desc: "Flawless, high-definition makeup perfect for flash photography and long wear." },
    { name: "Airbrush Bridal", price: "From ₹20,000", desc: "Ultra-lightweight, waterproof finish that looks completely natural and lasts 24 hours." },
    { name: "Pre-Bridal Package", price: "From ₹10,000", desc: "Complete skin and hair preparation therapies in the weeks leading to your big day." }
  ],
  party: [
    { name: "Evening Glamour", price: "From ₹3,500", desc: "Bold eyes, perfect contouring, and long-lasting finish for night events." },
    { name: "Subtle Elegance", price: "From ₹2,500", desc: "Soft, natural enhancement perfect for day functions and corporate events." }
  ],
  hair: [
    { name: "Creative Styling", price: "From ₹1,500", desc: "Modern updos, messy buns, and elegant braids." },
    { name: "Global Coloring", price: "From ₹4,000", desc: "Premium ammonia-free color treatments." },
    { name: "Keratin Treatment", price: "From ₹6,000", desc: "Frizz-free, smooth, and deeply nourished hair." }
  ],
  skin: [
    { name: "HydraFacial", price: "From ₹4,500", desc: "Deep cleansing, exfoliation, and hydration." },
    { name: "Bridal Glow Therapy", price: "From ₹3,000", desc: "Specialized masks and serums for instant radiance." }
  ]
};

export default function Services() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-100 mb-6">Our <span className="text-gradient">Services</span></h1>
          <p className="text-brand-400 max-w-2xl mx-auto text-lg">Curated luxury treatments designed to enhance your natural beauty.</p>
        </div>

        <Tabs defaultValue="bridal" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-brand-900/50 border-brand-800 flex-wrap h-auto">
              <TabsTrigger value="bridal">Bridal Makeup</TabsTrigger>
              <TabsTrigger value="party">Party Makeup</TabsTrigger>
              <TabsTrigger value="hair">Hair Care</TabsTrigger>
              <TabsTrigger value="skin">Skin Treatments</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(serviceData).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {items.map((item, idx) => (
                  <Card key={idx} className="bg-brand-900/30 hover:bg-brand-900/60 transition-colors border-brand-800/50 group">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-serif text-brand-200 group-hover:text-brand-500 transition-colors">{item.name}</h3>
                        <span className="text-brand-400 font-medium whitespace-nowrap ml-4">{item.price}</span>
                      </div>
                      <p className="text-brand-400/80 mb-8 flex-grow">{item.desc}</p>
                      <Button asChild variant="outline" className="w-full border-brand-800 text-brand-300 hover:text-brand-900">
                        <Link href="/booking">Book Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageTransition>
  );
}
