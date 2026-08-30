import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  let sql = 'SELECT * FROM promotion_banners WHERE 1=1';
  const params: any[] = [];

  const authUser = getAuthUserFromRequest(request);
  if (!authUser) {
    sql += ' AND is_active = 1';
  }

  if (location) {
    sql += ' AND location = ?';
    params.push(location);
  }

  sql += ' ORDER BY priority DESC, created_at DESC';

  const banners = dbQuery(sql, params);
  return NextResponse.json({ banners });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_banners')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      subtitle = '',
      offer_badge = '',
      desktop_image,
      mobile_image = '',
      cta_text = 'Explore Now',
      cta_url = '/offers',
      location = 'homepage_hero',
      priority = 0,
      start_date,
      end_date,
      is_active = 1,
      display_frequency = 'once_per_day',
    } = body;

    if (!title || !desktop_image || !start_date || !end_date) {
      return NextResponse.json({ error: 'Missing required banner fields' }, { status: 400 });
    }

    const result = dbRun(`
      INSERT INTO promotion_banners (
        title, subtitle, offer_badge, desktop_image, mobile_image,
        cta_text, cta_url, location, priority, start_date,
        end_date, is_active, display_frequency
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      subtitle,
      offer_badge,
      desktop_image,
      mobile_image,
      cta_text,
      cta_url,
      location,
      priority,
      start_date,
      end_date,
      is_active ? 1 : 0,
      display_frequency
    ]);

    return NextResponse.json({
      success: true,
      bannerId: Number(result.lastInsertRowid),
      message: 'Banner created successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating banner' }, { status: 500 });
  }
}
