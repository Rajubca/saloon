import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_media')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');
  const search = searchParams.get('search');

  let sql = 'SELECT * FROM media_assets WHERE 1=1';
  const params: any[] = [];

  if (folder && folder !== 'all') {
    sql += ' AND folder = ?';
    params.push(folder);
  }

  if (search) {
    sql += ' AND (filename LIKE ? OR original_name LIKE ? OR alt_text LIKE ? OR caption LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  sql += ' ORDER BY created_at DESC';

  const assets = dbQuery(sql, params);
  return NextResponse.json({ assets });
}

export async function DELETE(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_media')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });
  }

  dbRun('DELETE FROM media_assets WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Media asset deleted' });
}
