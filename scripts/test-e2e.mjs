// Automated verification script for Free Bird Salon & Academy
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🧪 Starting Full-Stack Application Verification...\n');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (e) {
      console.error(`❌ FAIL: ${name} ->`, e.message);
      failed++;
    }
  }

  // 1. Homepage
  await test('Public Homepage (GET /)', async () => {
    const res = await fetch(`${BASE_URL}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('Free Bird') && !text.includes('Rajesh Joshi')) {
      throw new Error('Brand name not found in homepage HTML');
    }
  });

  // 2. Services Page
  await test('Services & Academy Catalog (GET /services)', async () => {
    const res = await fetch(`${BASE_URL}/services`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('Russian Nano-Plastia') && !text.includes('Balayage')) {
      throw new Error('Services not found in catalog HTML');
    }
  });

  // 3. Products Catalog
  await test('Products Boutique (GET /products)', async () => {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('Argan') && !text.includes('Keratin')) {
      throw new Error('Products not rendered in catalog');
    }
  });

  // 4. Transformations Page
  await test('Before & After Live Gallery (GET /transformations)', async () => {
    const res = await fetch(`${BASE_URL}/transformations`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('BEFORE') && !text.includes('AFTER')) {
      throw new Error('Comparison sliders not found in transformations HTML');
    }
  });

  // 5. Offers Page
  await test('Offers & Deals with Countdowns (GET /offers)', async () => {
    const res = await fetch(`${BASE_URL}/offers`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });

  // 6. Before / After API
  await test('Before/After Transformations API (GET /api/before-after)', async () => {
    const res = await fetch(`${BASE_URL}/api/before-after`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.entries || data.entries.length === 0) throw new Error('No entries returned');
  });

  // 7. Public Inquiry CRM Submission
  await test('Public Inquiry & Booking Submission (POST /api/inquiries)', async () => {
    const payload = {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '9825199999',
      service_or_product: 'Russian Nano-Plastia & Keratin Treatment',
      inquiry_type: 'appointment',
      preferred_date: '2026-09-10',
      preferred_branch: 'Ajwa Road Studio',
      message: 'Looking for a complete hair smoothing consultation with Rajesh Joshi.',
    };

    const res = await fetch(`${BASE_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('Inquiry submission was not marked success');
  });

  // 8. Admin Authentication Login
  let authTokenCookie = '';
  await test('Admin JWT Login (POST /api/auth/login)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@freebirdsalon.com',
        password: 'AdminPassword123!',
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.user.role !== 'super_admin') throw new Error('Incorrect role returned');

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      authTokenCookie = setCookie.split(';')[0];
    }
  });

  // 9. Auth Session Verification
  await test('Admin Session Info (GET /api/auth/me)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: authTokenCookie },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.user || data.user.email !== 'admin@freebirdsalon.com') {
      throw new Error('Session user mismatch');
    }
  });

  // 10. Analytics & KPI stats
  await test('Admin Dashboard KPIs (GET /api/analytics)', async () => {
    const res = await fetch(`${BASE_URL}/api/analytics`, {
      headers: { Cookie: authTokenCookie },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.kpis || typeof data.kpis.totalProducts !== 'number') {
      throw new Error('KPI data missing');
    }
  });

  // 11. SEO Sitemap & Robots
  await test('Dynamic XML Sitemap (GET /sitemap.xml)', async () => {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });

  await test('SEO Robots.txt (GET /robots.txt)', async () => {
    const res = await fetch(`${BASE_URL}/robots.txt`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });

  console.log(`\n================================`);
  console.log(`✨ Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`================================\n`);

  if (failed > 0) process.exit(1);
}

runTests();
