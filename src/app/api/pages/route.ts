import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const authUser = getAuthUserFromRequest(request);
  let sql = 'SELECT * FROM pages WHERE 1=1';
  const params: any[] = [];

  if (!authUser) {
    sql += " AND status = 'published'";
  }

  sql += ' ORDER BY title ASC';

  const pages = dbQuery(sql, params);
  return NextResponse.json({ pages });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_pages')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      content,
      featured_image = '',
      template = 'default',
      seo_title = '',
      seo_description = '',
      status = 'published',
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(title);

    const result = dbRun(`
      INSERT INTO pages (
        title, slug, content, featured_image,
        template, seo_title, seo_description, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      slug,
      content,
      featured_image,
      template,
      seo_title || title,
      seo_description || '',
      status
    ]);

    return NextResponse.json({
      success: true,
      pageId: Number(result.lastInsertRowid),
      message: 'Page created',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating page' }, { status: 500 });
  }
}
