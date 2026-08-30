import { getDatabase, dbGet, dbRun } from './db';
import bcrypt from 'bcryptjs';

let isSeeded = false;
let seedPromise: Promise<void> | null = null;

export async function seedDatabase(): Promise<void> {
  if (isSeeded) return;
  if (seedPromise) return seedPromise;

  seedPromise = (async () => {
    const db = getDatabase();

    // Check if already seeded
    const userCount = dbGet<{ count: number }>('SELECT COUNT(*) as count FROM users');
    if (userCount && userCount.count > 0) {
      isSeeded = true;
      return;
    }

    console.log('🌱 Seeding Free Bird Salon & Academy database...');

    // 1. Seed Admin Users
    const salt = await bcrypt.genSalt(10);
    const shivPass = await bcrypt.hash('@Asdf1234', salt);
    const superAdminPass = await bcrypt.hash('AdminPassword123!', salt);
    const managerPass = await bcrypt.hash('ManagerPassword123!', salt);
    const staffPass = await bcrypt.hash('StaffPassword123!', salt);

    dbRun(`
      INSERT OR IGNORE INTO users (name, email, password_hash, role, avatar) VALUES
      (?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?),
      (?, ?, ?, ?, ?)
    `, [
      'Shiv (Super Admin)', 'shiv1', shivPass, 'super_admin', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      'Rajesh Joshi (Master Stylist & Founder)', 'admin@freebirdsalon.com', superAdminPass, 'super_admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'Pooja Mehta (Academy & Content Lead)', 'manager@freebirdsalon.com', managerPass, 'content_manager', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      'Karan Sharma (Reception & Appointments)', 'staff@freebirdsalon.com', staffPass, 'staff', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    ]);

    // 2. Seed Site Settings
    const settings = [
      ['site_name', 'Free Bird Salon & Academy'],
      ['tagline', 'Premium Hair, Beauty & Aesthetic Care | Professional Cosmetology Academy'],
      ['founder_name', 'Rajesh Joshi'],
      ['logo_url', '/images/logo.svg'],
      ['favicon_url', '/favicon.ico'],
      ['phone', '+91 98250 12345'],
      ['alt_phone', '+91 98250 67890'],
      ['email', 'contact@freebirdsalon.com'],
      ['address', 'Shop 18, Sai Sarjan Complex, Ajwa Road & Kendranagar, Vadodara, Gujarat 390019'],
      ['branches_json', JSON.stringify([
        {
          name: 'Free Bird Main Hair Studio & Lounge',
          area: 'Ajwa Road',
          address: 'Opposite Shree Vidhyalay School, Ajwa Road, Vadodara, Gujarat 390019',
          phone: '+91 98250 12345',
          is_main: true
        },
        {
          name: 'Free Bird Cosmetology Academy & Bridal Suite',
          area: 'Kendranagar',
          address: 'Shop No. 18, Sai Sarjan Complex, Kendranagar, Vadodara, Gujarat 390025',
          phone: '+91 98250 67890',
          is_main: false
        },
        {
          name: 'Free Bird Grooming & Spa Pavilion',
          area: 'Sayajipura',
          address: '425 Bapa Sitaram Nagar, Near New VIP Road, Sayajipura, Vadodara, Gujarat 390022',
          phone: '+91 98250 99887',
          is_main: false
        }
      ])],
      ['whatsapp_number', '919825012345'],
      ['business_hours', 'Mon - Sun: 9:30 AM - 9:00 PM'],
      ['currency_symbol', '₹'],
      ['announcement_enabled', 'true'],
      ['announcement_text', '✨ Exclusive 2026 Festive Offer: Flat 30% OFF on Russian Nano-Plastia & Bridal Suites! Use Code FESTIVE30'],
      ['announcement_url', '/offers'],
      ['social_instagram', 'https://instagram.com/freebirdsalon'],
      ['social_facebook', 'https://facebook.com/freebirdsalon'],
      ['social_youtube', 'https://youtube.com/@freebirdsalon'],
      ['seo_default_title', 'Free Bird Salon & Academy | Master Stylist Rajesh Joshi Vadodara'],
      ['seo_default_description', 'Premium salon transformations, French Balayage, Russian Nano-Plastia, HD Bridal Makeover, and government-certified Cosmetology Academy in Vadodara by Rajesh Joshi.'],
      ['seo_og_image', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80'],
      ['hero_title', 'Elevate Your Look. Master the Craft of Beauty.'],
      ['hero_subtitle', 'Vadodara’s premier luxury destination for bespoke hair transformations, bridal glam, and government-certified cosmetology education led by Rajesh Joshi.'],
      ['hero_cta_text', 'Book An Appointment'],
      ['hero_cta_url', '/contact'],
      ['hero_bg_image', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=85'],
      ['google_rating', '4.9'],
      ['google_reviews_count', '485+'],
      ['google_review_url', 'https://maps.google.com/?q=Free+Bird+Salon+Vadodara'],
      ['google_maps_url', 'https://maps.google.com/?q=Free+Bird+Salon+Vadodara']
    ];

    for (const [key, value] of settings) {
      dbRun('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)', [key, value]);
    }

    // 3. Seed Categories
    dbRun(`
      INSERT OR IGNORE INTO categories (name, slug, type, description, icon, display_order, is_active) VALUES
      ('Hair Care & Styling', 'hair-services', 'service', 'Precision haircuts, Keratin, Nano-plastia, and botanical hair spas', 'Sparkles', 1, 1),
      ('Color Artistry & Balayage', 'color-artistry', 'service', 'Signature French Balayage, Babylights, and Ombre transformations', 'Palette', 2, 1),
      ('Bridal & Luxury Makeovers', 'bridal-makeover', 'service', 'HD Airbrush bridal glam, pre-bridal packages, and Groom suites', 'Crown', 3, 1),
      ('Skin & Aesthetic Therapy', 'skin-aesthetics', 'service', 'HydraFacial, Korean glass skin peels, and rejuvenating treatments', 'Heart', 4, 1),
      ('Academy Diploma & Courses', 'academy-courses', 'course', 'Professional government-certified hairdressing and beauty masterclasses', 'GraduationCap', 5, 1),
      ('Hair Care Elixirs & Shampoos', 'hair-care-products', 'product', 'Salon-grade sulfate-free shampoos, conditioners, and serums', 'Package', 1, 1),
      ('Styling & Heat Protectants', 'styling-products', 'product', 'Thermal sprays, matte pomades, and texturizing clays', 'Flame', 2, 1),
      ('Hair Transformations', 'hair-transformations', 'gallery', 'Real before/after results of color, smoothing, and bridal styling', 'Camera', 1, 1),
      ('Salon & Masterclass Insights', 'beauty-insights', 'blog', 'Expert articles on hair care, trends, and cosmetology career guides', 'BookOpen', 1, 1)
    `);

    // 4. Seed Services & Academy Courses
    dbRun(`
      INSERT OR IGNORE INTO services (title, slug, category_id, short_description, description, price, sale_price, duration_minutes, featured_image, features, benefits, faqs, is_academy_course, certification_details, display_order, is_featured, is_published) VALUES
      (
        'Russian Nano-Plastia & Keratin Protein Infusion',
        'russian-nano-plastia-keratin',
        1,
        'Ultra-glossy formaldehyde-free smoothing treatment delivering mirror-like shine and 6+ months of frizz control.',
        'Our signature Nano-Plastia formula penetrates the deep cortex of each hair strand with bio-compatible amino acids, collagen, and silk proteins. Unlike harsh chemical straighteners, it heals damage while delivering an effortless silky straight finish with natural bounce.',
        4999, 3999, 150,
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        '["0% Formaldehyde & harmful aldehydes", "Deep collagen & silk protein infusion", "Safe for colored and bleached hair", "Includes complimentary follow-up hair mask session"]',
        '["6+ months frizz immunity", "Mirror-finish gloss and radiant light reflection", "Reduces daily blow-dry time by 70%"]',
        '[{"q":"How long does Nano-Plastia last?","a":"With our recommended sulfate-free shampoo, results last 5 to 7 months."},{"q":"Can I color my hair after?","a":"Yes, you can color your hair 2 weeks after the procedure."}]',
        0, NULL, 1, 1, 1
      ),
      (
        'French Balayage & Dimensional Color Melting',
        'french-balayage-dimensional-color',
        2,
        'Custom hand-painted sun-kissed blonde, caramel, or mocha tones with seamless shadow roots.',
        'Hand-crafted by Rajesh Joshi and our master colorists. We utilize low-ammonia bonding lighteners infused with Plex bond-builders to maintain extreme hair integrity while achieving breathtaking high-fashion dimensions.',
        5500, 4499, 180,
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        '["Custom color palette consultation based on skin undertones", "Built-in Olaplex bond repair technology", "Gloss toner and luxury conditioning seal included", "Low-maintenance grow-out line"]',
        '["Adds visual volume and luxurious texture", "Seamless grow-out with no harsh roots", "Individually customized to complement facial contours"]',
        '[{"q":"Will bleaching damage my hair?","a":"We use active bond rebuilders throughout the lightening stage to protect 98% of structural hair bonds."}]',
        0, NULL, 2, 1, 1
      ),
      (
        'Royal Moroccan Argan Hair Spa & Scalp Detox',
        'royal-moroccan-argan-spa',
        1,
        'Deep steam therapy, pressure-point Ayurvedic scalp massage, and pure cold-pressed argan oil nourishment.',
        'A multi-sensory restorative ritual. Clears chemical buildup, unclogs hair follicles, and deeply quenches parched tresses with pure organic Moroccan Argan extract, rosemary botanical essence, and warm ultrasonic micro-mist.',
        1800, 1499, 60,
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
        '["Clarifying detox scrub for scalp microbiome", "20-minute rhythmic acupressure head massage", "Ultrasonic ozone micro-steam infusion", "Leave-in antioxidant sealing serum"]',
        '["Relieves mental stress and tension headaches", "Stimulates healthy new follicle growth", "Restores silky touch to brittle ends"]',
        '[{"q":"How often should I get this spa?","a":"We recommend once every 3 to 4 weeks for optimal scalp health."}]',
        0, NULL, 3, 1, 1
      ),
      (
        'Signature HD Airbrush Bridal Makeover Suite',
        'signature-hd-bridal-makeover',
        3,
        'Complete luxury bridal artistry with HD airbrush foundation, 3D floral hair styling, and jewelry draping.',
        'Tailored exclusively for the Indian bride. Includes pre-wedding skin prep, high-definition silicon airbrushing for 18-hour sweatproof wear, bespoke hair sculpting with fresh baby breath florals, and master saree/dupatta draping.',
        18000, 14999, 240,
        'https://images.unsplash.com/photo-1595955793670-6644541a7705?auto=format&fit=crop&w=800&q=80',
        '["Airbrush HD water-resistant makeup", "Mink 3D lashes & luxury cosmetic lenses", "Bespoke bridal hairdo with hair extensions", "Full bridal dupatta & jewellery styling assistant", "Includes pre-bridal trial consultation"]',
        '["18-hour transfer-proof and flash-photography tested finish", "Natural bridal glow without cakey weight", "Dedicated VIP bridal dressing chamber"]',
        '[{"q":"Do you offer on-venue bridal services?","a":"Yes, our master artist team travels for destination and home weddings upon prior booking."}]',
        0, NULL, 4, 1, 1
      ),
      (
        'Hydra-Facial Glow & Rejuvenating Korean Peel',
        'hydra-facial-korean-glow',
        4,
        '6-step clinical vacuum extraction, glycolic exfoliation, antioxidant infusion, and LED phototherapy.',
        'Dramatically purifies congested pores, removes blackheads effortlessly, and drenches skin with hyaluronic acid, peptides, and vitamin C serums for instant glass-skin radiance with zero downtime.',
        2800, 2199, 75,
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
        '["Non-invasive vortex suction blackhead extraction", "Salicylic & lactic acid multi-peel", "Cold ultrasound ice-hammer tightening", "Red & Blue LED phototherapy collagen boost"]',
        '["Instant dewy glass skin luminescence", "Unclogs deep pores and minimizes pore size", "Zero redness or recovery downtime"]',
        '[{"q":"Is HydraFacial painful?","a":"Not at all. It feels like a cool, gentle brush moving across the face with soothing mist."}]',
        0, NULL, 5, 1, 1
      ),
      (
        'Diploma in Professional Hair Dressing & Chemical Mastery',
        'diploma-professional-hair-dressing',
        5,
        'Comprehensive 6-month hands-on cosmetology course covering precision cuts, advanced coloring, chemical textures & salon management.',
        'Transform into a certified master hair artist under the direct mentorship of Rajesh Joshi. Includes over 200+ live model practicals, international color formulation science, salon client communication, and guaranteed placement assistance across top salons.',
        65000, 49999, 14400,
        'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
        '["6 Months full-time intensive practical training", "Government-recognized certification & portfolio photoshoot", "Includes professional Free Bird Tool Kit & Mannequin heads", "Hands-on live salon client apprenticeship", "100% Placement support & job referrals"]',
        '["Launch your career as a high-earning Senior Hair Stylist", "Master advanced Russian & European coloring techniques", "Learn salon business profitability and client retention"]',
        '[{"q":"What is the eligibility for admission?","a":"No prior experience required! Minimum 10th pass with a passion for beauty."},{"q":"Are installment payment options available?","a":"Yes, flexible 0% interest EMI options are available."}]',
        1, 'Government Recognized Cosmetology Certification + Free Bird Academy Gold Master Badge', 6, 1, 1
      ),
      (
        'Bridal Makeup Artistry & Hair Sculpting Masterclass',
        'bridal-makeup-masterclass',
        5,
        '30-day intensive certification program for aspiring bridal artists, covering HD makeup, draping, and trend styles.',
        'Master the lucrative wedding industry secrets: HD Airbrush techniques, traditional North & South Indian bridal looks, western reception glam, fast speed-draping methods, and bridal business marketing.',
        35000, 27999, 7200,
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
        '["30 Days comprehensive studio practicals", "Covers Traditional, Modern, Cocktail & Reception Looks", "Airbrush machine handling & maintenance", "High-fashion bridal portfolio creation for social media", "Free Bird Certified Bridal Artist Diploma"]',
        '["Start taking independent high-ticket bridal bookings", "Build an Instagram portfolio that attracts premium brides"]',
        '[{"q":"Do I need to bring my own makeup kit?","a":"Practice products are provided at the academy during classes. We guide you on creating your personal vanity kit."}]',
        1, 'Free Bird Certified Professional Bridal Makeup Artist Diploma', 7, 1, 1
      )
    `);

    // 5. Seed Products
    dbRun(`
      INSERT OR IGNORE INTO products (name, slug, sku, short_description, description, main_image, category_id, price, sale_price, stock_count, is_featured, is_new, tags, specifications, purchase_url, seo_title, seo_description, status, display_order) VALUES
      (
        'Free Bird Pure Argan Gold Nourishing Elixir (100ml)',
        'free-bird-pure-argan-gold-elixir-100ml',
        'FB-ARG-100',
        'Cold-pressed 100% organic Moroccan argan serum infused with vitamin E and liquid gold particles for weightless shine.',
        'Formulated exclusively by Free Bird Laboratories. Instantly tames stubborn flyaways, seals split ends, and provides up to 450°F heat protection. Absorbs within seconds without greasy residue.',
        'https://images.unsplash.com/photo-1608248597359-5972458a2d10?auto=format&fit=crop&w=800&q=80',
        6, 1299, 999, 45, 1, 1,
        'argan, serum, hair care, shine, anti-frizz',
        '{"Volume":"100ml / 3.4 fl oz","Hair Type":"All hair types (especially colored & dry)","Origin":"Morocco / Formulated in India","Key Ingredients":"Organic Argan Oil, Macadamia Seed Oil, Vitamin E, Hydrolyzed Keratin"}',
        '/contact?product=FB-ARG-100',
        'Free Bird Pure Argan Gold Hair Serum | Shop Online',
        'Luxury Moroccan Argan hair serum for instant frizz control, split end repair, and radiant mirror gloss.',
        'published', 1
      ),
      (
        'Keratin Restorative Sulfate-Free Shampoo (300ml)',
        'keratin-restorative-sulfate-free-shampoo-300ml',
        'FB-SHP-300',
        'Gentle salon-grade cleanser that protects color longevity and prolongs Keratin & Nano-Plastia treatments.',
        'A rich, creamy sulfate-free and paraben-free lather that gently removes impurities without stripping essential moisture or breaking protein bonds in chemically treated hair.',
        'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
        6, 899, 749, 60, 1, 0,
        'shampoo, sulfate-free, keratin, color-safe',
        '{"Volume":"300ml","Sulfate Free":"Yes (100%)","pH Balanced":"5.5 gentle formula","Target":"Treated, Colored, or Chemically Smoothed Hair"}',
        '/contact?product=FB-SHP-300',
        'Keratin Restorative Sulfate-Free Shampoo | Free Bird Salon',
        'Protect your salon smoothing and color treatments with our pH-balanced restorative shampoo.',
        'published', 2
      ),
      (
        'Intense Caviar & Botanical Hair Repair Mask (250g)',
        'intense-caviar-hair-repair-mask-250g',
        'FB-MSK-250',
        'Deep structural conditioning butter enriched with caviar extract, shea butter, and plant amino complexes.',
        'An intensive weekly deep-treatment mask designed to reverse severe bleach damage, thermal breakage, and environmental stress. Restores elastic strength in 5 minutes.',
        'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
        6, 1499, 1199, 30, 1, 1,
        'hair mask, deep conditioner, caviar, repair',
        '{"Weight":"250g","Application":"Once or twice weekly","Processing Time":"5 to 10 minutes","Key Actives":"French Caviar Extract, Raw Shea Butter, Keratin Peptides"}',
        '/contact?product=FB-MSK-250',
        'Intense Caviar Deep Hair Repair Mask | Free Bird Salon',
        'Salon-quality deep repair mask for chemically treated, bleached, and heat-damaged hair.',
        'published', 3
      ),
      (
        'Thermal Shield 450°F Heat Protectant Mist (200ml)',
        'thermal-shield-heat-protectant-mist-200ml',
        'FB-THM-200',
        'Ultra-fine weightless spray that creates an invisible thermal barrier against flat irons, curling wands, and blowdryers.',
        'Shield your hair against thermal damage up to 450°F (230°C). Enriched with provitamin B5 and bamboo bio-silica for anti-humidity protection and all-day smooth bounce.',
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
        7, 799, 649, 50, 0, 1,
        'heat protectant, styling, mist, thermal shield',
        '{"Volume":"200ml","Heat Guard":"Up to 450°F / 230°C","Finish":"Weightless satin sheen","Formulation":"Non-sticky aerosol mist"}',
        '/contact?product=FB-THM-200',
        'Thermal Shield Heat Protectant Spray | Free Bird Salon',
        'Invisible thermal shield mist preventing heat damage, split ends, and moisture loss during styling.',
        'published', 4
      ),
      (
        'Matte Texture Sea Salt & Clay Styling Pomade (80g)',
        'matte-texture-sea-salt-clay-pomade-80g',
        'FB-PMD-080',
        'Strong hold matte finish styling clay with natural Dead Sea minerals and beeswax for high-volume modern styles.',
        'Ideal for textured crops, modern pompadours, and messy quiffs. Gives an all-day reworkable grip without any oily sheen or flaking.',
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
        7, 699, 549, 40, 0, 0,
        'pomade, clay, matte hold, men styling, volume',
        '{"Net Weight":"80g","Hold":"Strong & pliable","Finish":"100% Matte Zero-Shine","Washability":"Easily washes out with warm water"}',
        '/contact?product=FB-PMD-080',
        'Matte Texture Clay Styling Pomade | Free Bird Salon',
        'Natural mineral matte clay pomade for effortless textured volume and strong all-day hold.',
        'published', 5
      )
    `);

    // 6. Seed Before / After Transformations
    dbRun(`
      INSERT OR IGNORE INTO before_after_entries (title, description, before_image, after_image, category_id, tags, orientation, initial_slider_position, before_label, after_label, display_order, is_featured, is_published) VALUES
      (
        'Brassy Yellow to Cool Nordic Blonde Balayage',
        'Correction of uneven banded home dye into seamless cool-ash Nordic blonde with root shadow and Olaplex bond reconstruction.',
        'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        2, 'balayage, blonding, color correction', 'horizontal', 50, 'BEFORE: Brassy & Uneven', 'AFTER: Cool Nordic Glow', 1, 1, 1
      ),
      (
        'Frizzy Porous Curls to Mirror-Glass Russian Nano-Plastia',
        'Complete texture transformation. 100% humidity-proof smoothness with zero formaldehyde, maintaining natural hair bounce.',
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        1, 'nano-plastia, keratin, smoothing, shine', 'horizontal', 50, 'BEFORE: Damaged & Frizzy', 'AFTER: Mirror Glass Silk', 2, 1, 1
      ),
      (
        'Uneven Skin Texture to Luminous Royal HD Bridal Glam',
        'Flawless HD airbrush bridal makeup addressing hyperpigmentation and textured skin, paired with custom floral hair braiding.',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1595955793670-6644541a7705?auto=format&fit=crop&w=800&q=80',
        3, 'bridal, hd-makeup, makeover, airbrush', 'horizontal', 50, 'BEFORE: Bare Skin', 'AFTER: Royal HD Bridal', 3, 1, 1
      ),
      (
        'Severe Dullness to Instant HydraFacial Korean Glass Radiance',
        'Deep suction detox of blackheads followed by hyaluronic acid infusion for poreless, dewy, glowing skin.',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
        4, 'hydrafacial, glass-skin, aesthetics', 'horizontal', 50, 'BEFORE: Congested Pores', 'AFTER: Glass Skin Dew', 4, 1, 1
      ),
      (
        'Unruly Overgrowth to Crisp Razor Fade & Sculpted Beard',
        'Executive grooming makeover featuring a low taper skin fade, hot towel eucalyptus massage, and laser-sharp beard edge lining.',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
        1, 'men-grooming, fade, beard, precision', 'horizontal', 50, 'BEFORE: Overgrown', 'AFTER: Precision Sculpt', 5, 0, 1
      ),
      (
        'Dry Bleached Ends to Caramel Mocha Dimension Melt',
        'Rich multi-tonal caramel lowlights and gloss glaze restoring deep luster and luxurious depth to bleached ends.',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
        2, 'color-melt, caramel, hair-repair', 'vertical', 50, 'BEFORE: Dry & Flat', 'AFTER: Mocha Dimension', 6, 0, 1
      )
    `);

    // 7. Seed Offers
    const now = new Date();
    const endDate1 = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const endDate2 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate3 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    dbRun(`
      INSERT OR IGNORE INTO offers (title, description, discount_type, discount_value, coupon_code, start_date, end_date, banner_image, category_id, cta_text, cta_url, is_active, is_featured) VALUES
      (
        'Festive Hair Rejuvenation Combo - Flat 30% OFF',
        'Combine Russian Nano-Plastia or Balayage with our Royal Moroccan Hair Spa and save 30% instantly.',
        'percentage', 30, 'FESTIVE30', ?, ?,
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        1, 'Claim 30% Voucher', '/contact?offer=FESTIVE30', 1, 1
      ),
      (
        'Cosmetology Academy Early Bird Scholarship - Save ₹15,000',
        'Enroll in the 6-Month Diploma in Professional Hair Dressing & Beauty and receive a flat ₹15,000 scholarship plus a professional tool vanity kit.',
        'fixed', 15000, 'ACADEMY15K', ?, ?,
        'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
        5, 'Apply for Scholarship', '/contact?offer=ACADEMY15K', 1, 1
      ),
      (
        'Royal Bridal Suite Booking - Complimentary Pre-Bridal Trial',
        'Book your 2026 wedding date with our HD Airbrush bridal package and get a free trial session plus 20% off bridesmaid styling.',
        'percentage', 20, 'BRIDAL20', ?, ?,
        'https://images.unsplash.com/photo-1595955793670-6644541a7705?auto=format&fit=crop&w=800&q=80',
        3, 'Book Bridal Suite', '/contact?offer=BRIDAL20', 1, 1
      )
    `, [
      now.toISOString(), endDate1,
      now.toISOString(), endDate2,
      now.toISOString(), endDate3
    ]);

    // 8. Seed Promotional Banners & Popups
    dbRun(`
      INSERT OR IGNORE INTO promotion_banners (title, subtitle, offer_badge, desktop_image, mobile_image, cta_text, cta_url, location, priority, start_date, end_date, is_active, display_frequency) VALUES
      (
        'Exclusive Festive Makeover Festival 2026',
        'Unlock VIP hair smoothing, signature balayage color, and luxury bridal suites at special festival rates.',
        'LIMITED TIME • 30% OFF',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
        'Claim Special Offer', '/offers', 'promo_popup', 10, ?, ?, 1, 'once_per_day'
      ),
      (
        'Master the Art of Hair & Beauty at Free Bird Academy',
        'India’s leading practical cosmetology training under Master Stylist Rajesh Joshi. Admissions now open.',
        'ADMISSIONS OPEN',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        'Explore Academy Courses', '/services?type=academy', 'homepage_hero', 5, ?, ?, 1, 'always'
      )
    `, [
      now.toISOString(), endDate1,
      now.toISOString(), endDate2
    ]);

    // 9. Seed Testimonials
    dbRun(`
      INSERT OR IGNORE INTO testimonials (client_name, client_avatar, rating, review_text, service_taken, before_after_id, review_source, google_review_date, is_verified, is_featured, is_published, display_order) VALUES
      (
        'Dr. Ananya Patel',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        5,
        'Rajesh Joshi and his team worked absolute magic on my hair! My brassy orange bleached hair was transformed into the most stunning cool blonde balayage I have ever seen. The salon ambience is pure 5-star luxury.',
        'French Balayage & Olaplex Repair', 1, 'google', '2 weeks ago', 1, 1, 1, 1
      ),
      (
        'Sneha Trivedi',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        5,
        'I got the Russian Nano-Plastia done before my wedding reception. It has been 4 months and my hair is still silky smooth, frizz-free, and shiny without needing straighteners. Best hair investment in Vadodara!',
        'Russian Nano-Plastia Treatment', 2, 'google', '1 month ago', 1, 1, 1, 2
      ),
      (
        'Riddhi Deshmukh (Bridal Client)',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        5,
        'My wedding makeup lasted a full 16 hours of rituals, tears, and dancing with zero caking or creasing. Every single guest complimented how royal yet natural I looked. Thank you Free Bird Bridal team!',
        'Signature HD Airbrush Bridal Suite', 3, 'google', '3 weeks ago', 1, 1, 1, 3
      ),
      (
        'Meera Sanghavi',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        5,
        'Unmatched expertise and hygiene! The staff is courteous, listens carefully to what you want, and uses authentic international products like MoroccanOil and L’Oréal Professionnel. 10/10 recommended!',
        'Keratin Infusion & Styling', NULL, 'google', 'a month ago', 1, 1, 1, 4
      ),
      (
        'Vikramaditya Solanki (Academy Alumni)',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        5,
        'The 6-month Diploma program at Free Bird Academy changed my life. The practical hands-on experience on live models and personal mentoring from Rajesh Sir gave me the confidence to start my own salon studio.',
        'Diploma in Professional Hair Dressing', NULL, 'google', '2 months ago', 1, 1, 1, 5
      ),
      (
        'Priyanka Joshi',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        5,
        'I travel all the way from Ahmedabad to Vadodara specifically for Rajesh Sir’s haircut and color melt. The precision cutting technique gives my hair volume that lasts for months!',
        'Precision Layer Cut & Color Melt', NULL, 'google', '3 weeks ago', 1, 1, 1, 6
      )
    `);

    // 10. Seed Gallery Lookbook
    dbRun(`
      INSERT OR IGNORE INTO gallery_items (title, caption, media_type, media_url, category_id, tags, is_featured, display_order) VALUES
      ('Ash Champagne Balayage', 'Handcrafted dimensional color melt by Rajesh Joshi', 'image', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', 8, 'hair, color, balayage', 1, 1),
      ('Bridal HD Royalty', 'Royal Gujarati bridal makeover with handcrafted gold jewelry', 'image', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80', 8, 'bridal, makeup, wedding', 1, 2),
      ('Academy Live Masterclass', 'Students mastering precision sectional cuts and graduation', 'image', 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80', 8, 'academy, education, training', 1, 3),
      ('Luxury Salon Suite Ambience', 'State-of-the-art hair stations and VIP bridal chambers', 'image', 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80', 8, 'salon, interior, luxury', 1, 4),
      ('HydraFacial Glow Station', 'Clinical aesthetic room with vacuum vortex technology', 'image', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', 8, 'skin, facial, aesthetics', 0, 5),
      ('Mocha Caramel Wave Styling', 'Bouncy beach wave blowout with high thermal gloss', 'image', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', 8, 'hair, styling, curls', 0, 6)
    `);

    // 11. Seed Blog Posts
    dbRun(`
      INSERT OR IGNORE INTO blog_posts (title, slug, content, excerpt, featured_image, author_id, category_id, tags, reading_time_min, seo_title, seo_description, status, published_at) VALUES
      (
        'Nano-Plastia vs. Keratin: Which Smoothing Treatment is Right for Your Hair?',
        'nano-plastia-vs-keratin-guide',
        '<h2>Understanding the Evolution of Hair Smoothing</h2><p>For years, traditional Keratin treatments were the gold standard for taming unruly, frizzy locks. However, modern hair science has introduced <strong>Russian Nano-Plastia</strong> — a breakthrough, 100% formaldehyde-free organic acid smoothing procedure.</p><h3>What is Keratin?</h3><p>Keratin treatments work by coating the outer hair cuticle with hydrolyzed keratin protein and sealing it with heat. It excels at softening curls, eliminating humidity frizz, and leaving a soft, natural wave.</p><h3>What is Nano-Plastia?</h3><p>Nano-Plastia utilizes nano-molecular organic acids, collagen, and amino acids that penetrate directly into the deep inner cortex of the hair fiber. Instead of just coating the surface, it realigns the internal cellular bonds, resulting in pin-straight, mirror-like gloss that lasts up to 6 to 7 months.</p><h3>Key Differences Table</h3><ul><li><strong>Chemicals:</strong> Keratin often contains trace aldehydes; Nano-Plastia is 100% formaldehyde-free.</li><li><strong>Longevity:</strong> Keratin lasts 3-4 months; Nano-Plastia lasts 6-7 months.</li><li><strong>Color Safety:</strong> Nano-Plastia can slightly lighten dyed hair by 1 shade, so it is recommended before coloring.</li></ul><p>Visit Free Bird Salon in Vadodara for a complimentary hair health diagnosis with our master stylists to determine your ideal treatment!</p>',
        'Discover the key differences between Russian Nano-Plastia and classic Keratin smoothing treatments to choose the best option for your hair texture and longevity.',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
        1, 9, 'hair care, keratin, nano-plastia, smooth hair', 5,
        'Nano-Plastia vs Keratin: Complete 2026 Guide | Free Bird Salon',
        'Detailed expert comparison between Russian Nano-Plastia and Keratin treatments by Master Stylist Rajesh Joshi.',
        'published', ?
      ),
      (
        'The Ultimate 6-Month Bridal Beauty & Hair Prep Timeline',
        'bridal-beauty-hair-prep-timeline',
        '<h2>Your Journey to the Perfect Wedding Day Glow</h2><p>Planning your dream Indian wedding requires meticulous scheduling — and your hair and skin care regimen deserves the exact same precision. Here is our master bridal prep roadmap developed by the Free Bird Bridal Suite team in Vadodara.</p><h3>Month 6: Hair Health & Skin Consultation</h3><p>Begin with a comprehensive scalp analysis and custom HydraFacial cycle. If you plan a color transformation like Balayage, do it now so the color settles naturally.</p><h3>Month 3: Deep Texture Treatments</h3><p>Undergo a restorative Nano-Plastia or Argan repair therapy. This gives your tresses 90 days of silkiness, making wedding-week styling effortless and frizz-free.</p><h3>Month 1: The Bridal Trial</h3><p>Schedule your in-person HD Airbrush makeup and hair trial. Bring your dupatta swatches, bridal jewelry, and lehenga colors so our artists can map the exact lighting and tone harmony.</p>',
        'A step-by-step master beauty countdown for brides: when to color your hair, schedule HydraFacials, and book HD airbrush trials.',
        'https://images.unsplash.com/photo-1595955793670-6644541a7705?auto=format&fit=crop&w=1200&q=80',
        2, 9, 'bridal, wedding prep, skincare, bridal makeup', 6,
        '6-Month Bridal Beauty Prep Timeline | Free Bird Salon Vadodara',
        'Master the perfect wedding glow with our step-by-step bridal hair and skincare timeline.',
        'published', ?
      ),
      (
        'Why a Career in Professional Cosmetology is Booming in 2026',
        'cosmetology-career-guide-2026',
        '<h2>The Thriving High-Income World of Hair & Beauty Artistry</h2><p>The beauty and personal grooming industry in India has grown by over 25% year-on-year. Certified hair stylists, master colorists, and bridal artists are now earning executive-level incomes while enjoying creative freedom and global career mobility.</p><h3>Why Hands-On Academy Training Matters</h3><p>At Free Bird Academy, students don’t just read theory — they perform real haircuts, chemical formulations, and client consultations under Master Stylist Rajesh Joshi. With 200+ live model sessions, our graduates enter the job market with the portfolio of seasoned professionals.</p>',
        'Explore career opportunities, salary growth, and professional certifications in the fast-growing cosmetology and hair design industry.',
        'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1200&q=80',
        1, 9, 'academy, career, education, cosmetology diploma', 4,
        'Cosmetology Career Opportunities & Courses | Free Bird Academy',
        'Learn why professional hair styling and cosmetology are top high-growth careers in 2026.',
        'published', ?
      )
    `, [now.toISOString(), now.toISOString(), now.toISOString()]);

    // 12. Seed Pages CMS
    dbRun(`
      INSERT OR IGNORE INTO pages (title, slug, content, template, seo_title, seo_description, status) VALUES
      (
        'About Free Bird Salon & Academy',
        'about',
        '<h2>Crafting Beauty with Artistry & Precision Since 2018</h2><p>Founded by renowned master stylist <strong>Rajesh Joshi</strong>, Free Bird Salon & Academy was established with a singular vision: to bring world-class hair aesthetics, international chemical treatments, and elite cosmetology education to Vadodara.</p><p>With multiple state-of-the-art branches across Ajwa Road, Kendranagar, and Sayajipura, we cater to thousands of discerning clients looking for flawless hair transformations, luxury hair spas, and breathtaking HD bridal artistry.</p><h3>The Free Bird Philosophy</h3><p>We believe that beauty is an empowering personal signature. We combine strict European sanitation standards, premium Italian & French professional formulas, and continuous artistic innovation to deliver results that exceed expectations every single visit.</p>',
        'about',
        'About Free Bird Salon & Academy | Founder Rajesh Joshi Vadodara',
        'Discover the story, master artists, and luxury beauty philosophy behind Free Bird Salon & Academy in Vadodara.',
        'published'
      ),
      (
        'Frequently Asked Questions (FAQ)',
        'faq',
        '<h2>Frequently Asked Questions</h2><h3>Appointments & Bookings</h3><p><strong>Do I need an appointment beforehand?</strong><br>While walk-ins are welcomed subject to availability, we strongly recommend booking online or via WhatsApp to guarantee your preferred time slot and master stylist.</p><h3>Academy & Certifications</h3><p><strong>Are Free Bird Academy certifications recognized?</strong><br>Yes! Our diploma programs are aligned with national cosmetology frameworks and provide portfolio credentials recognized across high-end salon brands nationwide.</p><h3>Bridal Bookings</h3><p><strong>How far in advance should I book my bridal suite?</strong><br>Wedding dates in peak seasons book out 4 to 6 months in advance. We recommend reserving your date as soon as your wedding venue is finalized.</p>',
        'policy',
        'Frequently Asked Questions (FAQ) | Free Bird Salon & Academy',
        'Find answers to common questions regarding salon appointments, bridal suites, and cosmetology courses.',
        'published'
      ),
      (
        'Privacy Policy & Terms of Service',
        'privacy-policy',
        '<h2>Privacy Policy & Client Terms</h2><p>At Free Bird Salon & Academy, we are committed to protecting your privacy. Any personal information gathered through appointment bookings, inquiries, or academy enrollment is held strictly confidential and never shared with third parties.</p><h3>Hygiene & Safety Protocols</h3><p>All styling tools, combs, brushes, and towels are sanitized in hospital-grade autoclave sterilizers after every single client use.</p>',
        'policy',
        'Privacy Policy & Safety Terms | Free Bird Salon & Academy',
        'Our commitment to client privacy, data safety, and salon hygiene standards.',
        'published'
      )
    `);

    // 13. Seed Navigation Menus
    dbRun(`
      INSERT OR IGNORE INTO menu_items (menu_location, title, url, parent_id, display_order, is_active, open_new_tab) VALUES
      ('header', 'Home', '/', NULL, 1, 1, 0),
      ('header', 'Services & Academy', '/services', NULL, 2, 1, 0),
      ('header', 'Transformations', '/transformations', NULL, 3, 1, 0),
      ('header', 'Products', '/products', NULL, 4, 1, 0),
      ('header', 'Offers', '/offers', NULL, 5, 1, 0),
      ('header', 'Lookbook', '/gallery', NULL, 6, 1, 0),
      ('header', 'Blog', '/blog', NULL, 7, 1, 0),
      ('header', 'About Us', '/pages/about', NULL, 8, 1, 0),

      ('footer_col_1', 'Salon Services', '/services', NULL, 1, 1, 0),
      ('footer_col_1', 'Cosmetology Academy', '/services?type=academy', NULL, 2, 1, 0),
      ('footer_col_1', 'Before & After Gallery', '/transformations', NULL, 3, 1, 0),
      ('footer_col_1', 'Bridal Makeover Suite', '/services/signature-hd-bridal-makeover', NULL, 4, 1, 0),

      ('footer_col_2', 'Shop Hair Care', '/products', NULL, 1, 1, 0),
      ('footer_col_2', 'Special Deals & Offers', '/offers', NULL, 2, 1, 0),
      ('footer_col_2', 'Hair & Beauty Blog', '/blog', NULL, 3, 1, 0),
      ('footer_col_2', 'About Rajesh Joshi', '/pages/about', NULL, 4, 1, 0),

      ('footer_col_3', 'Contact & Locations', '/contact', NULL, 1, 1, 0),
      ('footer_col_3', 'FAQ', '/pages/faq', NULL, 2, 1, 0),
      ('footer_col_3', 'Privacy & Terms', '/pages/privacy-policy', NULL, 3, 1, 0),
      ('footer_col_3', 'Admin Portal', '/admin', NULL, 4, 1, 0)
    `);

    isSeeded = true;
    console.log('✅ Database seeded successfully with rich Free Bird Salon & Academy content!');
  })();

  return seedPromise;
}
