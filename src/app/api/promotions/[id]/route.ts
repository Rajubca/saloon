import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const banner = dbGet('SELECT * FROM promotion_banners WHERE id = ?', [Number(id)]);

  if (!banner) {
    return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
  }

  return NextResponse.json({ banner });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_banners')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
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
      is_active,
      display_frequency,
    } = body;

    dbRun(`
      UPDATE promotion_banners SET
        title = ?, subtitle = ?, offer_badge = ?, desktop_image = ?,
        mobile_image = ?, cta_text = ?, cta_url = ?, location = ?,
        priority = ?, start_date = ?, end_date = ?, is_active = ?,
        display_frequency = ?
      WHERE id = ?
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
      display_frequency,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Banner updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating banner' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_banners')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM promotion_banners WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Banner deleted' });
}
