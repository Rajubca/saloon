import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let sql = `
    SELECT b.*, u.name as author_name, c.name as category_name, c.slug as category_slug
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    LEFT JOIN categories c ON b.category_id = c.id
    WHERE 1=1
  `;
  const params: any[] = [];

  const authUser = getAuthUserFromRequest(request);
  if (!authUser) {
    sql += " AND b.status = 'published'";
  }

  if (category) {
    sql += ' AND (c.slug = ? OR c.id = ?)';
    params.push(category, category);
  }

  if (search) {
    sql += ' AND (b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ? OR b.tags LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  sql += ' ORDER BY b.published_at DESC, b.created_at DESC';

  const posts = dbQuery(sql, params);
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_blog')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      featured_image,
      category_id = null,
      tags = '',
      reading_time_min = 5,
      seo_title = '',
      seo_description = '',
      status = 'published',
    } = body;

    if (!title || !content || !featured_image) {
      return NextResponse.json({ error: 'Title, content, and featured image are required' }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(title);
    const publishedAt = status === 'published' ? new Date().toISOString() : null;

    const result = dbRun(`
      INSERT INTO blog_posts (
        title, slug, content, excerpt, featured_image,
        author_id, category_id, tags, reading_time_min,
        seo_title, seo_description, status, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      slug,
      content,
      excerpt || '',
      featured_image,
      authUser.userId,
      category_id || null,
      tags,
      reading_time_min,
      seo_title || title,
      seo_description || excerpt || '',
      status,
      publishedAt
    ]);

    return NextResponse.json({
      success: true,
      postId: Number(result.lastInsertRowid),
      message: 'Post created successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating post' }, { status: 500 });
  }
}
