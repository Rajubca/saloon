'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  faqs?: FaqItem[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    category: 'Hair Care & Treatments',
    question: 'How long does Russian Nano-Plastia hair smoothing last?',
    answer:
      'Russian Nano-Plastia at Free Bird Salon lasts between 4 to 6 months. It uses 100% organic amino acids, silk proteins, and zero formaldehyde, leaving your hair mirror-shiny, soft, and frizz-free even in humid monsoon weather.',
  },
  {
    category: 'Color Artistry',
    question: 'What is the difference between French Balayage and traditional highlights?',
    answer:
      'Unlike traditional foil highlights that create stripy, harsh demarcation lines, Master Stylist Rajesh Joshi hand-paints French Balayage for a seamless, sun-kissed gradient. It grows out naturally, meaning you only need root touch-ups every 4 to 6 months.',
  },
  {
    category: 'Bridal Makeovers',
    question: 'What is included in the Signature HD Airbrush Royal Bridal Suite?',
    answer:
      'Our Royal Bridal Package includes customized high-definition airbrush makeup (lasting 16+ hours with zero caking), bespoke couture hair styling, pre-bridal botanical skin rejuvenation treatments, luxury jewelry & dupatta draping, and exclusive VIP suite privacy.',
  },
  {
    category: 'Academy & Education',
    question: 'Are the Cosmetology Diploma courses recognized for jobs in India & abroad?',
    answer:
      'Yes! Free Bird Academy offers government-recognized diplomas and international certifications. Our curriculum emphasizes 80% practical hands-on training on live models with direct personal mentorship from Rajesh Joshi.',
  },
  {
    category: 'Consultation & Hygiene',
    question: 'Do I need an appointment or do you accept walk-ins?',
    answer:
      'While we welcome walk-ins at our Ajwa Road and Sayajipura branches subject to stylist availability, we strongly recommend booking a VIP slot in advance—especially for color transformations, bridal consultations, and weekends.',
  },
];

export default function FaqAccordion({
  faqs = DEFAULT_FAQS,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our luxury treatments, hair smoothing, bridal suites, and cosmetology academy.',
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-20 pt-16 border-t border-gold-500/15">
      <ScrollReveal direction="up">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>EXPERT CLIENT GUIDANCE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-cream-50">{title}</h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-light">{subtitle}</p>
        </div>
      </ScrollReveal>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <ScrollReveal key={index} direction="up" delay={index * 60}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-obsidian-900/90 border-gold-500/40 shadow-luxury-gold'
                    : 'bg-obsidian-900/40 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 pr-2">
                    {faq.category && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400/80 block mb-1">
                        {faq.category}
                      </span>
                    )}
                    <h3
                      className={`text-sm sm:text-base font-serif font-bold transition-colors ${
                        isOpen ? 'text-gold-400' : 'text-cream-100'
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-gold-500 text-black border-gold-500 rotate-180'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light border-t border-neutral-800/50 mt-1 animate-fade-up">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
