import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const authUser = getAuthUserFromRequest(request);
  let sql = 'SELECT * FROM testimonials WHERE 1=1';
  const params: any[] = [];

  if (!authUser) {
    sql += ' AND is_published = 1';
  }

  sql += ' ORDER BY display_order ASC, created_at DESC';

  const testimonials = dbQuery(sql, params);
  return NextResponse.json({ testimonials });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_testimonials')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      client_name,
      client_avatar = '',
      rating = 5,
      review_text,
      service_taken = '',
      before_after_id = null,
      is_verified = 1,
      is_featured = 0,
      is_published = 1,
      display_order = 0,
    } = body;

    if (!client_name || !review_text) {
      return NextResponse.json({ error: 'Client name and review are required' }, { status: 400 });
    }

    const result = dbRun(`
      INSERT INTO testimonials (
        client_name, client_avatar, rating, review_text,
        service_taken, before_after_id, is_verified,
        is_featured, is_published, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      client_name,
      client_avatar,
      rating,
      review_text,
      service_taken,
      before_after_id,
      is_verified ? 1 : 0,
      is_featured ? 1 : 0,
      is_published ? 1 : 0,
      display_order
    ]);

    return NextResponse.json({
      success: true,
      testimonialId: Number(result.lastInsertRowid),
      message: 'Testimonial created',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating testimonial' }, { status: 500 });
  }
}
