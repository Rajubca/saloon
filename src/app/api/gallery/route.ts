import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  let sql = `
    SELECT g.*, c.name as category_name
    FROM gallery_items g
    LEFT JOIN categories c ON g.category_id = c.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (category) {
    sql += ' AND (c.slug = ? OR c.id = ?)';
    params.push(category, category);
  }

  if (featured === 'true' || featured === '1') {
    sql += ' AND g.is_featured = 1';
  }

  sql += ' ORDER BY g.display_order ASC, g.created_at DESC';

  const items = dbQuery(sql, params);
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_gallery')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      caption = '',
      media_type = 'image',
      media_url,
      thumbnail_url = '',
      category_id = null,
      tags = '',
      is_featured = 0,
      display_order = 0,
    } = body;

    if (!title || !media_url) {
      return NextResponse.json({ error: 'Title and media URL are required' }, { status: 400 });
    }

    const result = dbRun(`
      INSERT INTO gallery_items (
        title, caption, media_type, media_url,
        thumbnail_url, category_id, tags, is_featured, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      caption,
      media_type,
      media_url,
      thumbnail_url,
      category_id || null,
      tags,
      is_featured ? 1 : 0,
      display_order
    ]);

    return NextResponse.json({
      success: true,
      galleryId: Number(result.lastInsertRowid),
      message: 'Gallery item created',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating gallery item' }, { status: 500 });
  }
}
