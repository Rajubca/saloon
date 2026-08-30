import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const item = dbGet('SELECT * FROM gallery_items WHERE id = ?', [Number(id)]);

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_gallery')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
      title,
      caption,
      media_type,
      media_url,
      thumbnail_url,
      category_id,
      tags,
      is_featured,
      display_order,
    } = body;

    dbRun(`
      UPDATE gallery_items SET
        title = ?, caption = ?, media_type = ?, media_url = ?,
        thumbnail_url = ?, category_id = ?, tags = ?,
        is_featured = ?, display_order = ?
      WHERE id = ?
    `, [
      title,
      caption,
      media_type,
      media_url,
      thumbnail_url,
      category_id || null,
      tags,
      is_featured ? 1 : 0,
      display_order,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Gallery item updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating gallery item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_gallery')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM gallery_items WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Gallery item deleted' });
}
