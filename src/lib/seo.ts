import { Metadata } from 'next';
import { dbGet } from './db';
import { SiteSettings } from '@/types';

export function getSiteSettings(): SiteSettings {
  const defaultSettings: SiteSettings = {
    site_name: 'Free Bird Salon & Academy',
    tagline: 'Premium Hair, Beauty & Aesthetic Care | Professional Cosmetology Academy',
    founder_name: 'Rajesh Joshi',
    logo_url: '/images/logo.svg',
    favicon_url: '/favicon.ico',
    phone: '+91 98250 12345',
    alt_phone: '+91 98250 67890',
    email: 'contact@freebirdsalon.com',
    address: 'Shop 18, Sai Sarjan Complex, Ajwa Road & Kendranagar, Vadodara, Gujarat 390019',
    branches_json: '[]',
    whatsapp_number: '919825012345',
    social_instagram: 'https://instagram.com/freebirdsalonacademy',
    social_facebook: 'https://facebook.com/freebirdsalon',
    social_youtube: 'https://youtube.com/@freebirdsalonacademy',
    social_linkedin: 'https://linkedin.com/company/freebirdsalon',
    business_hours: 'Mon - Sun: 10:00 AM - 09:00 PM',
    currency_symbol: '₹',
    default_seo_title: 'Free Bird Salon & Academy | Master Hair Dressing, Bridal & Cosmetology in Vadodara',
    default_seo_desc: 'Experience luxury hair transformations, balayage, keratin nano-plastia, HD bridal makeup, and certified professional cosmetology diploma courses by celebrity master stylist Rajesh Joshi in Vadodara.',
    default_og_image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    ga_id: '',
    announcement_text: '',
    announcement_active: 0,
    announcement_link: '',
  };

  try {
    const rows = dbGet<any[]>('SELECT key, value FROM site_settings');
    if (Array.isArray(rows)) {
      rows.forEach((r: any) => {
        if (r.key in defaultSettings) {
          (defaultSettings as any)[r.key] = r.value;
        }
      });
    }
  } catch (err) {
    // Return defaults if DB not ready
  }

  return defaultSettings;
}

export function constructMetadata({
  title,
  description,
  image,
  canonical,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const settings = getSiteSettings();

  const metaTitle = title
    ? `${title} | ${settings.site_name}`
    : settings.default_seo_title || `${settings.site_name} - ${settings.tagline}`;

  const metaDesc = description || settings.default_seo_desc;
  const metaImage = image || settings.default_og_image;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: [
      'best hair salon in vadodara',
      'russian nano-plastia vadodara',
      'french balayage rajesh joshi',
      'celebrity bridal makeup artist vadodara',
      'cosmetology academy diploma courses gujarat',
      'hair botox and smoothing ajwa road',
      'luxury salon kendranagar sayajipura',
      'rajesh joshi master stylist',
      'olaplex and moroccanoil hair spa vadodara',
    ],
    authors: [{ name: 'Rajesh Joshi', url: 'https://freebirdsalon.com' }],
    creator: 'Rajesh Joshi',
    publisher: 'Free Bird Salon & Academy',
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: [{ url: metaImage, width: 1200, height: 630, alt: metaTitle }],
      siteName: settings.site_name,
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [metaImage],
      creator: '@freebirdsalon',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonical || undefined,
    },
  };
}
