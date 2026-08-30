import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  let sql = 'SELECT * FROM menu_items WHERE 1=1';
  const params: any[] = [];

  if (location) {
    sql += ' AND menu_location = ?';
    params.push(location);
  }

  sql += ' ORDER BY display_order ASC, id ASC';

  const items = dbQuery(sql, params);
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_menus')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      menu_location,
      title,
      url,
      parent_id = null,
      display_order = 0,
      is_active = 1,
      open_new_tab = 0,
    } = body;

    if (!menu_location || !title || !url) {
      return NextResponse.json({ error: 'Location, title, and URL are required' }, { status: 400 });
    }

    const result = dbRun(`
      INSERT INTO menu_items (
        menu_location, title, url, parent_id,
        display_order, is_active, open_new_tab
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      menu_location,
      title,
      url,
      parent_id || null,
      display_order,
      is_active ? 1 : 0,
      open_new_tab ? 1 : 0
    ]);

    return NextResponse.json({
      success: true,
      menuItemId: Number(result.lastInsertRowid),
      message: 'Menu item created',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating menu item' }, { status: 500 });
  }
}
