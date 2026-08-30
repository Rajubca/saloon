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

  let post = null;
  if (!isNaN(Number(id))) {
    post = dbGet<any>(
      `SELECT b.*, u.name as author_name, c.name as category_name, c.slug as category_slug
       FROM blog_posts b
       LEFT JOIN users u ON b.author_id = u.id
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.id = ?`,
      [Number(id)]
    );
  } else {
    post = dbGet<any>(
      `SELECT b.*, u.name as author_name, c.name as category_name, c.slug as category_slug
       FROM blog_posts b
       LEFT JOIN users u ON b.author_id = u.id
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.slug = ?`,
      [id]
    );
  }

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_blog')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      category_id,
      tags,
      reading_time_min,
      seo_title,
      seo_description,
      status,
    } = body;

    const postSlug = slug ? slugify(slug) : slugify(title);

    dbRun(`
      UPDATE blog_posts SET
        title = ?, slug = ?, content = ?, excerpt = ?,
        featured_image = ?, category_id = ?, tags = ?,
        reading_time_min = ?, seo_title = ?, seo_description = ?,
        status = ?
      WHERE id = ?
    `, [
      title,
      postSlug,
      content,
      excerpt,
      featured_image,
      category_id || null,
      tags,
      reading_time_min,
      seo_title,
      seo_description,
      status,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Post updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_blog')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM blog_posts WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Post deleted' });
}
