import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun, dbGet } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const authUser = getAuthUserFromRequest(request);
  let sql = 'SELECT * FROM offers WHERE 1=1';
  const params: any[] = [];

  if (!authUser) {
    sql += ' AND is_active = 1';
  }

  sql += ' ORDER BY is_featured DESC, end_date ASC';

  const offers = dbQuery(sql, params);
  return NextResponse.json({ offers });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_offers')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      discount_type = 'percentage',
      discount_value,
      coupon_code = '',
      start_date,
      end_date,
      banner_image = '',
      category_id = null,
      cta_text = 'Claim Offer',
      cta_url = '/contact',
      is_active = 1,
      is_featured = 0,
    } = body;

    if (!title || !description || !start_date || !end_date || discount_value === undefined) {
      return NextResponse.json({ error: 'Missing required offer fields' }, { status: 400 });
    }

    const result = dbRun(`
      INSERT INTO offers (
        title, description, discount_type, discount_value, coupon_code,
        start_date, end_date, banner_image, category_id, cta_text,
        cta_url, is_active, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      description,
      discount_type,
      discount_value,
      coupon_code,
      start_date,
      end_date,
      banner_image,
      category_id || null,
      cta_text,
      cta_url,
      is_active ? 1 : 0,
      is_featured ? 1 : 0
    ]);

    return NextResponse.json({
      success: true,
      offerId: Number(result.lastInsertRowid),
      message: 'Offer created',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating offer' }, { status: 500 });
  }
}
