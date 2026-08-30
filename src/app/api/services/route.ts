import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'academy' or 'salon'
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  let sql = `
    SELECT s.*, c.name as category_name, c.slug as category_slug
    FROM services s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE 1=1
  `;
  const params: any[] = [];

  const authUser = getAuthUserFromRequest(request);
  if (!authUser) {
    sql += ' AND s.is_published = 1';
  }

  if (type === 'academy') {
    sql += ' AND s.is_academy_course = 1';
  } else if (type === 'salon') {
    sql += ' AND s.is_academy_course = 0';
  }

  if (category) {
    sql += ' AND (c.slug = ? OR c.id = ?)';
    params.push(category, category);
  }

  if (featured === 'true' || featured === '1') {
    sql += ' AND s.is_featured = 1';
  }

  sql += ' ORDER BY s.display_order ASC, s.created_at DESC';

  const services = dbQuery(sql, params);
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_services')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      category_id,
      short_description = '',
      description = '',
      price,
      sale_price = null,
      duration_minutes = 60,
      featured_image,
      features = '[]',
      benefits = '[]',
      faqs = '[]',
      is_academy_course = 0,
      certification_details = '',
      display_order = 0,
      is_featured = 0,
      is_published = 1,
    } = body;

    if (!title || !price || !featured_image) {
      return NextResponse.json({ error: 'Missing required service fields' }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(title);

    const result = dbRun(`
      INSERT INTO services (
        title, slug, category_id, short_description, description,
        price, sale_price, duration_minutes, featured_image,
        features, benefits, faqs, is_academy_course,
        certification_details, display_order, is_featured, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      slug,
      category_id || 1,
      short_description,
      description,
      price,
      sale_price || null,
      duration_minutes,
      featured_image,
      typeof features === 'object' ? JSON.stringify(features) : features,
      typeof benefits === 'object' ? JSON.stringify(benefits) : benefits,
      typeof faqs === 'object' ? JSON.stringify(faqs) : faqs,
      is_academy_course ? 1 : 0,
      certification_details,
      display_order,
      is_featured ? 1 : 0,
      is_published ? 1 : 0
    ]);

    return NextResponse.json({
      success: true,
      serviceId: Number(result.lastInsertRowid),
      message: 'Service created successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating service' }, { status: 500 });
  }
}
