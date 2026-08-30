export type UserRole = 'super_admin' | 'content_manager' | 'staff';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  founder_name: string;
  logo_url: string;
  favicon_url: string;
  phone: string;
  alt_phone: string;
  email: string;
  address: string;
  branches_json: string; // parsed as Branch[]
  whatsapp_number: string;
  social_instagram: string;
  social_facebook: string;
  social_youtube: string;
  social_linkedin: string;
  business_hours: string;
  currency_symbol: string;
  default_seo_title: string;
  default_seo_desc: string;
  default_og_image: string;
  ga_id: string;
  announcement_text: string;
  announcement_active: boolean | number;
  announcement_link: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_text?: string;
  hero_cta_url?: string;
  hero_bg_image?: string;
  google_rating?: string;
  google_reviews_count?: string;
  google_review_url?: string;
  google_maps_url?: string;
}

export interface Branch {
  name: string;
  area: string;
  address: string;
  phone: string;
  map_url?: string;
  is_main?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: 'product' | 'service' | 'course' | 'gallery' | 'blog';
  description?: string;
  image_url?: string;
  icon?: string;
  parent_id?: number | null;
  display_order: number;
  is_active: boolean | number;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  short_description: string;
  description: string;
  main_image: string;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  price: number;
  sale_price?: number | null;
  stock_count: number;
  is_featured: boolean | number;
  is_new: boolean | number;
  tags?: string;
  specifications?: string; // JSON string
  purchase_url?: string;
  seo_title?: string;
  seo_description?: string;
  status: 'published' | 'draft';
  display_order: number;
  created_at: string;
  images?: ProductImage[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text?: string;
  display_order: number;
}

export interface BeforeAfterEntry {
  id: number;
  title: string;
  description?: string;
  before_image: string;
  after_image: string;
  category_id?: number | null;
  category_name?: string;
  tags?: string;
  orientation: 'horizontal' | 'vertical';
  initial_slider_position: number;
  before_label: string;
  after_label: string;
  display_order: number;
  is_featured: boolean | number;
  is_published: boolean | number;
  created_at: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  coupon_code?: string;
  start_date: string;
  end_date: string;
  banner_image?: string;
  category_id?: number | null;
  category_name?: string;
  cta_text?: string;
  cta_url?: string;
  is_active: boolean | number;
  is_featured: boolean | number;
  created_at: string;
}

export interface PromotionBanner {
  id: number;
  title: string;
  subtitle?: string;
  offer_badge?: string;
  desktop_image: string;
  mobile_image?: string;
  cta_text?: string;
  cta_url?: string;
  location: 'homepage_hero' | 'promo_popup' | 'promo_section' | 'announcement_bar' | 'shop_banner';
  priority: number;
  start_date: string;
  end_date: string;
  is_active: boolean | number;
  display_frequency: 'always' | 'once_per_session' | 'once_per_day';
  created_at: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  short_description: string;
  description: string;
  price: number;
  sale_price?: number | null;
  duration_minutes?: number;
  featured_image: string;
  features?: string; // JSON array string
  benefits?: string; // JSON array string
  faqs?: string; // JSON array string of {q, a}
  is_academy_course: boolean | number;
  certification_details?: string;
  display_order: number;
  is_featured: boolean | number;
  is_published: boolean | number;
  created_at: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_avatar?: string;
  rating: number;
  review_text: string;
  service_taken?: string;
  before_after_id?: number | null;
  review_source?: 'google' | 'direct' | 'instagram' | string;
  google_review_date?: string;
  is_verified: boolean | number;
  is_featured: boolean | number;
  is_published: boolean | number;
  display_order: number;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  caption?: string;
  media_type: 'image' | 'video';
  media_url: string;
  thumbnail_url?: string;
  category_id?: number | null;
  category_name?: string;
  tags?: string;
  is_featured: boolean | number;
  display_order: number;
  created_at: string;
}

export interface PageContent {
  id: number;
  title: string;
  slug: string;
  content: string; // Markdown or HTML
  featured_image?: string;
  template: 'default' | 'contact' | 'about' | 'academy' | 'policy';
  seo_title?: string;
  seo_description?: string;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author_id?: number;
  author_name?: string;
  category_id?: number | null;
  category_name?: string;
  category_slug?: string;
  tags?: string;
  reading_time_min: number;
  seo_title?: string;
  seo_description?: string;
  status: 'published' | 'draft';
  published_at?: string;
  created_at: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_or_product?: string;
  inquiry_type: 'salon_booking' | 'academy_admission' | 'product_inquiry' | 'bridal_consultation' | 'general';
  preferred_date?: string;
  preferred_branch?: string;
  message: string;
  attachment_url?: string;
  status: InquiryStatus;
  admin_notes?: string;
  created_at: string;
}

export interface MenuItem {
  id: number;
  menu_location: 'header' | 'footer_col_1' | 'footer_col_2' | 'footer_col_3';
  title: string;
  url: string;
  parent_id?: number | null;
  display_order: number;
  is_active: boolean | number;
  open_new_tab: boolean | number;
  children?: MenuItem[];
}

export interface MediaAsset {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  url: string;
  folder: string;
  alt_text?: string;
  caption?: string;
  created_at: string;
}

export interface AnalyticsEvent {
  id: number;
  event_type: string;
  event_data?: string;
  path: string;
  ip_hash?: string;
  user_agent?: string;
  created_at: string;
}
