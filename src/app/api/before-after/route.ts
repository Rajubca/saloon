import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun, dbGet } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');

  let sql = `
    SELECT ba.*, c.name as category_name
    FROM before_after_entries ba
    LEFT JOIN categories c ON ba.category_id = c.id
    WHERE 1=1
  `;
  const params: any[] = [];

  const authUser = getAuthUserFromRequest(request);
  if (!authUser) {
    sql += ' AND ba.is_published = 1';
  }

  if (featured === 'true' || featured === '1') {
    sql += ' AND ba.is_featured = 1';
  }

  if (category) {
    sql += ' AND (c.slug = ? OR c.id = ?)';
    params.push(category, category);
  }

  sql += ' ORDER BY ba.display_order ASC, ba.created_at DESC';

  const entries = dbQuery(sql, params);
  return NextResponse.json({ entries });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_before_after')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      description = '',
      before_image,
      after_image,
      category_id,
      tags = '',
      orientation = 'horizontal',
      initial_slider_position = 50,
      before_label = 'BEFORE',
      after_label = 'AFTER',
      display_order = 0,
      is_featured = 0,
      is_published = 1,
    } = body;

    if (!title || !before_image || !after_image) {
      return NextResponse.json(
        { error: 'Title, before image, and after image are required' },
        { status: 400 }
      );
    }

    const result = dbRun(`
      INSERT INTO before_after_entries (
        title, description, before_image, after_image, category_id,
        tags, orientation, initial_slider_position, before_label,
        after_label, display_order, is_featured, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      description,
      before_image,
      after_image,
      category_id || null,
      tags,
      orientation,
      initial_slider_position,
      before_label,
      after_label,
      display_order,
      is_featured ? 1 : 0,
      is_published ? 1 : 0
    ]);

    return NextResponse.json({
      success: true,
      entryId: Number(result.lastInsertRowid),
      message: 'Before/After transformation created successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating entry' }, { status: 500 });
  }
}
