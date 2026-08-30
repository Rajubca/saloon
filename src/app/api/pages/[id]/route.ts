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

  let page = null;
  if (!isNaN(Number(id))) {
    page = dbGet('SELECT * FROM pages WHERE id = ?', [Number(id)]);
  } else {
    page = dbGet('SELECT * FROM pages WHERE slug = ?', [id]);
  }

  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  return NextResponse.json({ page });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_pages')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
      title,
      slug,
      content,
      featured_image,
      template,
      seo_title,
      seo_description,
      status,
    } = body;

    const pageSlug = slug ? slugify(slug) : slugify(title);

    dbRun(`
      UPDATE pages SET
        title = ?, slug = ?, content = ?, featured_image = ?,
        template = ?, seo_title = ?, seo_description = ?,
        status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      title,
      pageSlug,
      content,
      featured_image,
      template,
      seo_title,
      seo_description,
      status,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Page updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating page' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_pages')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM pages WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Page deleted' });
}
