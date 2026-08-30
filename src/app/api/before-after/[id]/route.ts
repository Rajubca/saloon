import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const entry = dbGet<any>(
    `SELECT ba.*, c.name as category_name
     FROM before_after_entries ba
     LEFT JOIN categories c ON ba.category_id = c.id
     WHERE ba.id = ?`,
    [Number(id)]
  );

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  return NextResponse.json({ entry });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_before_after')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
      title,
      description,
      before_image,
      after_image,
      category_id,
      tags,
      orientation,
      initial_slider_position,
      before_label,
      after_label,
      display_order,
      is_featured,
      is_published,
    } = body;

    dbRun(`
      UPDATE before_after_entries SET
        title = ?, description = ?, before_image = ?, after_image = ?,
        category_id = ?, tags = ?, orientation = ?, initial_slider_position = ?,
        before_label = ?, after_label = ?, display_order = ?,
        is_featured = ?, is_published = ?
      WHERE id = ?
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
      is_published ? 1 : 0,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating entry' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_before_after')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM before_after_entries WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Deleted successfully' });
}
