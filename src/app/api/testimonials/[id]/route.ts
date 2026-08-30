import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const testimonial = dbGet('SELECT * FROM testimonials WHERE id = ?', [Number(id)]);

  if (!testimonial) {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
  }

  return NextResponse.json({ testimonial });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_testimonials')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
      client_name,
      client_avatar,
      rating,
      review_text,
      service_taken,
      before_after_id,
      is_verified,
      is_featured,
      is_published,
      display_order,
    } = body;

    dbRun(`
      UPDATE testimonials SET
        client_name = ?, client_avatar = ?, rating = ?, review_text = ?,
        service_taken = ?, before_after_id = ?, is_verified = ?,
        is_featured = ?, is_published = ?, display_order = ?
      WHERE id = ?
    `, [
      client_name,
      client_avatar,
      rating,
      review_text,
      service_taken,
      before_after_id,
      is_verified ? 1 : 0,
      is_featured ? 1 : 0,
      is_published ? 1 : 0,
      display_order,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Testimonial updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_testimonials')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM testimonials WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Testimonial deleted' });
}
