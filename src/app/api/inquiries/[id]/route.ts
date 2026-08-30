import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'view_inquiries')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  const inquiry = dbGet('SELECT * FROM inquiries WHERE id = ?', [Number(id)]);

  if (!inquiry) {
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
  }

  return NextResponse.json({ inquiry });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_inquiries')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const { status, admin_notes } = body;

    let sql = 'UPDATE inquiries SET ';
    const updates: string[] = [];
    const values: any[] = [];

    if (status) {
      updates.push('status = ?');
      values.push(status);
    }

    if (admin_notes !== undefined) {
      updates.push('admin_notes = ?');
      values.push(admin_notes);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields provided' }, { status: 400 });
    }

    sql += updates.join(', ') + ' WHERE id = ?';
    values.push(Number(id));

    dbRun(sql, values);

    return NextResponse.json({ success: true, message: 'Inquiry updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error updating inquiry' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_inquiries')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM inquiries WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Inquiry deleted' });
}
