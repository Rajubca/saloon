"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SERVICES = [
  { id: 1, category: "hair", title: "Balayage & Highlights", price: "From ₹4,500", desc: "Custom hand-painted highlights for a natural, sun-kissed look.", image: "/hair-1.jpg" },
  { id: 2, category: "hair", title: "Keratin Treatment", price: "From ₹6,000", desc: "Smooth, frizz-free hair lasting up to 6 months.", image: "/hair-2.jpg" },
  { id: 3, category: "skin", title: "Gold Radiance Facial", price: "₹3,500", desc: "24k gold infused facial for ultimate glowing skin.", image: "/skin-1.jpg" },
  { id: 4, category: "skin", title: "Advanced Chemical Peel", price: "₹4,000", desc: "Targeted treatment for acne scars and hyperpigmentation.", image: "/skin-2.jpg" },
  { id: 5, category: "bridal", title: "HD Bridal Makeup", price: "₹15,000", desc: "Flawless, camera-ready bridal look with premium products.", image: "/bridal-1.jpg" },
  { id: 6, category: "bridal", title: "Pre-Bridal Package", price: "₹25,000", desc: "Complete 1-month preparation including hair, skin, and body care.", image: "/bridal-2.jpg" },
];

export default function ServicesClient() {
  const [filter, setFilter] = useState("all");

  const filteredServices = filter === "all"
    ? SERVICES
    : SERVICES.filter(s => s.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl text-foreground mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Indulge in our curated selection of premium beauty treatments, designed to elevate your natural elegance.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="hair">Hair</TabsTrigger>
              <TabsTrigger value="skin">Skin</TabsTrigger>
              <TabsTrigger value="bridal">Bridal</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.desc}
                  price={service.price}
                  imageSrc={service.image}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
