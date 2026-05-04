"use client";

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function About() {
  const team = [
    { name: "Ananya Desai", role: "Lead Stylist", exp: "10+ Years", img: "/assets/real/30-gallery.jpg" },
    { name: "Meera Patel", role: "Bridal Makeup Artist", exp: "8 Years", img: "/assets/real/301-gallery.jpg" },
    { name: "Kabir Singh", role: "Hair Color Specialist", exp: "12 Years", img: "/assets/real/302-gallery.jpg" }
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif text-brand-100 mb-6">The Art of <br/><span className="text-gradient">Transformation</span></h1>
            <div className="w-20 h-1 bg-brand-500 mb-8" />
            <p className="text-brand-300 text-lg leading-relaxed mb-6">
              Founded in the heart of Baroda, Free Bird Saloon was born from a passion for beauty and a commitment to luxury. We believe that every individual possesses a unique radiance waiting to be unleashed.
            </p>
            <p className="text-brand-400 leading-relaxed mb-8">
              Our philosophy goes beyond standard salon services. We offer personalized consultations, utilizing premium products and cutting-edge techniques to ensure your vision becomes reality. Whether it&apos;s your wedding day or a routine touch-up, experience beauty redefined.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] glass-card rounded-xl overflow-hidden"
          >
            <Image
              src="/assets/real/271-gallery.jpg"
              alt="Free Bird Saloon Art of Transformation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 border-[1px] border-brand-500/20 m-4 rounded-lg pointer-events-none z-10" />
            <div className="absolute inset-0 bg-brand-900/10 pointer-events-none" />
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brand-100 mb-4">Meet Our Experts</h2>
            <p className="text-brand-400 max-w-2xl mx-auto">Dedicated professionals bringing international expertise to Baroda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="overflow-hidden group hover:border-brand-500/50 transition-colors duration-300 bg-brand-900/40">
                  <div className="h-80 bg-brand-800/30 relative">
                     <Image src={member.img} alt={member.name} fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" />
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent opacity-90" />
                  </div>
                  <CardContent className="pt-6 relative text-center -mt-16 z-10">
                    <h3 className="text-2xl font-serif text-brand-200 mb-1">{member.name}</h3>
                    <p className="text-brand-500 mb-2">{member.role}</p>
                    <p className="text-sm text-brand-400">{member.exp} Experience</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
