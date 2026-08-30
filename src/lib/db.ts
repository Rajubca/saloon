import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) {
    return dbInstance;
  }

  const dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, 'salon.sqlite');
  dbInstance = new DatabaseSync(dbPath);

  // Enable WAL mode, timeout & foreign keys
  dbInstance.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 10000;
    PRAGMA synchronous = NORMAL;
    PRAGMA foreign_keys = ON;
  `);

  try {
    const tableExists = dbInstance.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();
    if (!tableExists) {
      initSchema(dbInstance);
    }
  } catch {
    initSchema(dbInstance);
  }

  return dbInstance;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT CHECK(role IN ('super_admin', 'content_manager', 'staff')) NOT NULL DEFAULT 'staff',
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Site settings table
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Categories table
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      type TEXT CHECK(type IN ('product', 'service', 'course', 'gallery', 'blog')) NOT NULL,
      description TEXT,
      image_url TEXT,
      icon TEXT,
      parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      display_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Products table
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      short_description TEXT,
      description TEXT NOT NULL,
      main_image TEXT NOT NULL,
      category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
      price REAL NOT NULL,
      sale_price REAL,
      stock_count INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      is_new INTEGER DEFAULT 0,
      tags TEXT,
      specifications TEXT,
      purchase_url TEXT,
      seo_title TEXT,
      seo_description TEXT,
      status TEXT CHECK(status IN ('published', 'draft')) DEFAULT 'published',
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Product Gallery Images table
    CREATE TABLE IF NOT EXISTS product_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      image_url TEXT NOT NULL,
      alt_text TEXT,
      display_order INTEGER DEFAULT 0
    );

    -- Before / After Transformations table
    CREATE TABLE IF NOT EXISTS before_after_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      description TEXT,
      before_image TEXT NOT NULL,
      after_image TEXT NOT NULL,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      tags TEXT,
      orientation TEXT CHECK(orientation IN ('horizontal', 'vertical')) DEFAULT 'horizontal',
      initial_slider_position INTEGER DEFAULT 50,
      before_label TEXT DEFAULT 'BEFORE',
      after_label TEXT DEFAULT 'AFTER',
      display_order INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Offers table
    CREATE TABLE IF NOT EXISTS offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      discount_type TEXT CHECK(discount_type IN ('percentage', 'fixed')) DEFAULT 'percentage',
      discount_value REAL NOT NULL,
      coupon_code TEXT,
      start_date DATETIME NOT NULL,
      end_date DATETIME NOT NULL,
      banner_image TEXT,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      cta_text TEXT DEFAULT 'Claim Offer',
      cta_url TEXT DEFAULT '/contact',
      is_active INTEGER DEFAULT 1,
      is_featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Promotional Banners & Popups table
    CREATE TABLE IF NOT EXISTS promotion_banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT,
      offer_badge TEXT,
      desktop_image TEXT NOT NULL,
      mobile_image TEXT,
      cta_text TEXT DEFAULT 'Explore Now',
      cta_url TEXT DEFAULT '/offers',
      location TEXT CHECK(location IN ('homepage_hero', 'promo_popup', 'promo_section', 'announcement_bar', 'shop_banner')) NOT NULL,
      priority INTEGER DEFAULT 0,
      start_date DATETIME NOT NULL,
      end_date DATETIME NOT NULL,
      is_active INTEGER DEFAULT 1,
      display_frequency TEXT CHECK(display_frequency IN ('always', 'once_per_session', 'once_per_day')) DEFAULT 'once_per_day',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(title, location)
    );

    -- Services & Academy Courses table
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
      short_description TEXT,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      sale_price REAL,
      duration_minutes INTEGER,
      featured_image TEXT NOT NULL,
      features TEXT, -- JSON Array string
      benefits TEXT, -- JSON Array string
      faqs TEXT, -- JSON Array string
      is_academy_course INTEGER DEFAULT 0,
      certification_details TEXT,
      display_order INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Testimonials table
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      client_avatar TEXT,
      rating INTEGER CHECK(rating BETWEEN 1 AND 5) NOT NULL DEFAULT 5,
      review_text TEXT NOT NULL,
      service_taken TEXT,
      before_after_id INTEGER REFERENCES before_after_entries(id) ON DELETE SET NULL,
      review_source TEXT DEFAULT 'google',
      google_review_date TEXT,
      is_verified INTEGER DEFAULT 1,
      is_featured INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(client_name, service_taken)
    );

    -- Gallery Items table
    CREATE TABLE IF NOT EXISTS gallery_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      caption TEXT,
      media_type TEXT CHECK(media_type IN ('image', 'video')) DEFAULT 'image',
      media_url TEXT NOT NULL,
      thumbnail_url TEXT,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      tags TEXT,
      is_featured INTEGER DEFAULT 0,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(title, media_url)
    );

    -- Pages CMS table
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      featured_image TEXT,
      template TEXT CHECK(template IN ('default', 'contact', 'about', 'academy', 'policy')) DEFAULT 'default',
      seo_title TEXT,
      seo_description TEXT,
      status TEXT CHECK(status IN ('published', 'draft')) DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Blog Posts table
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      featured_image TEXT NOT NULL,
      author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      tags TEXT,
      reading_time_min INTEGER DEFAULT 5,
      seo_title TEXT,
      seo_description TEXT,
      status TEXT CHECK(status IN ('published', 'draft')) DEFAULT 'published',
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Inquiries / Leads CRM table
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      service_or_product TEXT,
      inquiry_type TEXT DEFAULT 'general',
      preferred_date TEXT,
      preferred_branch TEXT,
      message TEXT,
      attachment_url TEXT,
      status TEXT CHECK(status IN ('new', 'contacted', 'in_progress', 'converted', 'closed')) DEFAULT 'new',
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Navigation Menus table
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      menu_location TEXT CHECK(menu_location IN ('header', 'footer_col_1', 'footer_col_2', 'footer_col_3')) NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      parent_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
      display_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      open_new_tab INTEGER DEFAULT 0,
      UNIQUE(menu_location, title)
    );

    -- Media Library Assets table
    CREATE TABLE IF NOT EXISTS media_assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      url TEXT NOT NULL,
      folder TEXT DEFAULT 'general',
      alt_text TEXT,
      caption TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Analytics Events table
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      event_data TEXT,
      path TEXT NOT NULL,
      ip_hash TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Performance Indexes
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
    CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
    CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
    CREATE INDEX IF NOT EXISTS idx_services_status ON services(is_published);
    CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
    CREATE INDEX IF NOT EXISTS idx_offers_active ON offers(is_active);
    CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
    CREATE INDEX IF NOT EXISTS idx_media_folder ON media_assets(folder);
  `);
}

// Database helper functions
export function dbQuery<T = any>(sql: string, params: any[] = []): T[] {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  const rows = stmt.all(...params);
  return rows.map((r: any) => ({ ...r })) as T[];
}

export function dbGet<T = any>(sql: string, params: any[] = []): T | undefined {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  const row = stmt.get(...params);
  return row ? ({ ...row } as T) : undefined;
}

export function dbRun(sql: string, params: any[] = []): { changes: number | bigint; lastInsertRowid: number | bigint } {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  return stmt.run(...params);
}
