import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const offer = dbGet('SELECT * FROM offers WHERE id = ?', [Number(id)]);

  if (!offer) {
    return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
  }

  return NextResponse.json({ offer });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_offers')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
      title,
      description,
      discount_type,
      discount_value,
      coupon_code,
      start_date,
      end_date,
      banner_image,
      category_id,
      cta_text,
      cta_url,
      is_active,
      is_featured,
    } = body;

    dbRun(`
      UPDATE offers SET
        title = ?, description = ?, discount_type = ?, discount_value = ?,
        coupon_code = ?, start_date = ?, end_date = ?, banner_image = ?,
        category_id = ?, cta_text = ?, cta_url = ?, is_active = ?, is_featured = ?
      WHERE id = ?
    `, [
      title,
      description,
      discount_type,
      discount_value,
      coupon_code,
      start_date,
      end_date,
      banner_image,
      category_id || null,
      cta_text,
      cta_url,
      is_active ? 1 : 0,
      is_featured ? 1 : 0,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Offer updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating offer' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_offers')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM offers WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Offer deleted' });
}
