import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { slugify } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  let service = null;
  if (!isNaN(Number(id))) {
    service = dbGet<any>(
      `SELECT s.*, c.name as category_name, c.slug as category_slug
       FROM services s
       LEFT JOIN categories c ON s.category_id = c.id
       WHERE s.id = ?`,
      [Number(id)]
    );
  } else {
    service = dbGet<any>(
      `SELECT s.*, c.name as category_name, c.slug as category_slug
       FROM services s
       LEFT JOIN categories c ON s.category_id = c.id
       WHERE s.slug = ?`,
      [id]
    );
  }

  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  return NextResponse.json({ service });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_services')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
      title,
      slug,
      category_id,
      short_description,
      description,
      price,
      sale_price,
      duration_minutes,
      featured_image,
      features,
      benefits,
      faqs,
      is_academy_course,
      certification_details,
      display_order,
      is_featured,
      is_published,
    } = body;

    const serviceSlug = slug ? slugify(slug) : slugify(title);

    dbRun(`
      UPDATE services SET
        title = ?, slug = ?, category_id = ?, short_description = ?,
        description = ?, price = ?, sale_price = ?, duration_minutes = ?,
        featured_image = ?, features = ?, benefits = ?, faqs = ?,
        is_academy_course = ?, certification_details = ?, display_order = ?,
        is_featured = ?, is_published = ?
      WHERE id = ?
    `, [
      title,
      serviceSlug,
      category_id,
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
      is_published ? 1 : 0,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Service updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating service' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_services')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM services WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Service deleted' });
}
