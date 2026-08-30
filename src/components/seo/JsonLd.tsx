import React from 'react';
import { getSiteSettings } from '@/lib/seo';

export default function JsonLd() {
  const settings = getSiteSettings();

  const mainSchema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': 'https://freebirdsalon.com/#salon',
    name: settings.site_name || 'Free Bird Salon & Academy',
    alternateName: ['Free Bird Salon Vadodara', 'Rajesh Joshi Salon', 'Free Bird Academy'],
    description:
      settings.default_seo_desc ||
      'Luxury hair salon, Russian Nano-Plastia, French Balayage, HD Bridal makeover suites, and government-certified Cosmetology Academy led by celebrity stylist Rajesh Joshi in Vadodara, Gujarat.',
    url: 'https://freebirdsalon.com',
    logo: 'https://freebirdsalon.com/images/logo.svg',
    image: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
    ],
    telephone: settings.phone || '+91 98250 12345',
    email: settings.email || 'contact@freebirdsalon.com',
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, Google Pay, Net Banking',
    founder: {
      '@type': 'Person',
      name: 'Rajesh Joshi',
      jobTitle: 'Celebrity Master Stylist & Academy Director',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      worksFor: {
        '@type': 'BeautySalon',
        name: 'Free Bird Salon & Academy',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. 18, Sai Sarjan Complex, Ajwa Road & Kendranagar',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      postalCode: '390019',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.3168,
      longitude: 73.2389,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:30',
        closes: '21:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '485',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      settings.social_instagram || 'https://instagram.com/freebirdsalonacademy',
      settings.social_facebook || 'https://facebook.com/freebirdsalon',
      settings.social_youtube || 'https://youtube.com/@freebirdsalonacademy',
      'https://maps.google.com/?q=Free+Bird+Salon+Vadodara',
    ],
    department: [
      {
        '@type': 'BeautySalon',
        name: 'Free Bird Main Hair Studio & Lounge (Ajwa Road)',
        telephone: '+91 98250 12345',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Opposite Shree Vidhyalay School, Ajwa Road',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          postalCode: '390019',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'BeautySalon',
        name: 'Free Bird Cosmetology Academy & Bridal Suite (Kendranagar)',
        telephone: '+91 98250 67890',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop No. 18, Sai Sarjan Complex, Kendranagar',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          postalCode: '390025',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'BeautySalon',
        name: 'Free Bird Grooming & Spa Pavilion (Sayajipura)',
        telephone: '+91 98250 99887',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '425 Bapa Sitaram Nagar, Near New VIP Road, Sayajipura',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          postalCode: '390022',
          addressCountry: 'IN',
        },
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does Russian Nano-Plastia hair smoothing treatment last?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Russian Nano-Plastia at Free Bird Salon lasts between 4 to 6 months depending on hair texture and homecare routine. It uses organic amino acids and zero formaldehyde, restoring deep mirror-shine with zero damage.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Master Stylist Rajesh Joshi’s French Balayage unique?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our French Balayage is 100% freehand-painted with custom clay lighteners and Olaplex bond repair, delivering seamless, natural gradient root transitions that grow out beautifully with zero harsh foil lines.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the Cosmetology Diploma courses at Free Bird Academy certified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Free Bird Academy offers government-recognized diplomas and international certifications in professional cosmetology, advanced haircutting, bridal artistry, and chemical treatments with hands-on live model training.',
        },
      },
      {
        '@type': 'Question',
        name: 'What services are included in the Royal Bridal Suite?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our Signature Bridal Suite includes high-definition airbrush makeup, couture hair styling, pre-bridal botanical skin rejuvenation peels, luxury draping, jewel setting, and VIP suite privacy.',
        },
      },
    ],
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Master Diploma in Professional Hairdressing & Cosmetology',
    description:
      'Comprehensive 6-month hands-on cosmetology and advanced styling course in Vadodara with personal mentoring by Rajesh Joshi.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Free Bird Academy of Cosmetology',
      url: 'https://freebirdsalon.com/services?type=academy',
    },
    educationalCredentialAwarded: 'Government Recognized Cosmetology Diploma',
    offers: {
      '@type': 'Offer',
      price: '45000',
      priceCurrency: 'INR',
      category: 'Vocational Education',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  );
}
