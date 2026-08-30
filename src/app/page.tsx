import { dbQuery, dbGet } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getSiteSettings } from '@/lib/seo';
import HeroSection from '@/components/home/HeroSection';
import PromoPopup from '@/components/home/PromoPopup';
import FeaturedServices from '@/components/home/FeaturedServices';
import BeforeAfterShowcase from '@/components/home/BeforeAfterShowcase';
import OffersSection from '@/components/home/OffersSection';
import ProductShowcase from '@/components/home/ProductShowcase';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LookbookGallery from '@/components/home/LookbookGallery';
import QuickBookingForm from '@/components/home/QuickBookingForm';
import BlogHighlights from '@/components/home/BlogHighlights';
import BranchesLocation from '@/components/home/BranchesLocation';
import {
  Service,
  BeforeAfterEntry,
  Offer,
  PromotionBanner,
  Product,
  Testimonial,
  GalleryItem,
  BlogPost,
} from '@/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  await seedDatabase();

  const settings = getSiteSettings();

  // 1. Promo popup modal
  const promoPopup = dbGet<PromotionBanner>(
    `SELECT * FROM promotion_banners 
     WHERE location = 'promo_popup' AND is_active = 1 
     ORDER BY priority DESC, created_at DESC LIMIT 1`
  );

  // 2. Featured services & courses
  const services = dbQuery<Service>(
    `SELECT s.*, c.name as category_name, c.slug as category_slug
     FROM services s
     LEFT JOIN categories c ON s.category_id = c.id
     WHERE s.is_published = 1 AND s.is_featured = 1
     ORDER BY s.display_order ASC LIMIT 6`
  );

  // 3. Before/After transformations
  const transformations = dbQuery<BeforeAfterEntry>(
    `SELECT * FROM before_after_entries 
     WHERE is_published = 1 
     ORDER BY is_featured DESC, display_order ASC LIMIT 6`
  );

  // 4. Active Offers
  const offers = dbQuery<Offer>(
    `SELECT * FROM offers 
     WHERE is_active = 1 
     ORDER BY is_featured DESC, end_date ASC LIMIT 3`
  );

  // 5. Featured Products
  const products = dbQuery<Product>(
    `SELECT p.*, c.name as category_name, c.slug as category_slug
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.status = 'published' AND p.is_featured = 1
     ORDER BY p.display_order ASC LIMIT 4`
  );

  // 6. Testimonials
  const testimonials = dbQuery<Testimonial>(
    `SELECT * FROM testimonials 
     WHERE is_published = 1 
     ORDER BY is_featured DESC, display_order ASC LIMIT 6`
  );

  // 7. Lookbook Gallery
  const gallery = dbQuery<GalleryItem>(
    `SELECT * FROM gallery_items 
     ORDER BY is_featured DESC, display_order ASC LIMIT 6`
  );

  // 8. Blog Posts
  const blogPosts = dbQuery<BlogPost>(
    `SELECT b.*, u.name as author_name, c.name as category_name, c.slug as category_slug
     FROM blog_posts b
     LEFT JOIN users u ON b.author_id = u.id
     LEFT JOIN categories c ON b.category_id = c.id
     WHERE b.status = 'published'
     ORDER BY b.published_at DESC LIMIT 3`
  );

  return (
    <>
      {/* Launch Promotional Modal Popup */}
      <PromoPopup banner={promoPopup} />

      {/* Hero Section */}
      <HeroSection settings={settings} />

      {/* Flagship Before / After Live Transformation Showcase */}
      <BeforeAfterShowcase entries={transformations} />

      {/* Featured Services & Academy Courses */}
      <FeaturedServices services={services} currency={settings.currency_symbol} />

      {/* Limited-Time Offers & Countdown Vouchers */}
      <OffersSection offers={offers} />

      {/* Quick Booking & VIP Consultation Form */}
      <QuickBookingForm settings={settings} />

      {/* Salon Retail Boutique / Product Showcase */}
      <ProductShowcase products={products} currency={settings.currency_symbol} />

      {/* Testimonials & Verified Client Reviews */}
      <TestimonialsSection testimonials={testimonials} settings={settings} />

      {/* Visual Lookbook Gallery */}
      <LookbookGallery items={gallery} />

      {/* Blog & Educational Highlights */}
      <BlogHighlights posts={blogPosts} />

      {/* Vadodara Branch Locations & Map */}
      <BranchesLocation settings={settings} />
    </>
  );
}
