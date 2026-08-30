import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let sql = 'SELECT * FROM categories WHERE 1=1';
  const params: any[] = [];

  if (type) {
    sql += ' AND type = ?';
    params.push(type);
  }

  sql += ' ORDER BY display_order ASC, name ASC';

  const categories = dbQuery(sql, params);
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_products')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, type, description = '', icon = '', display_order = 0, is_active = 1 } = body;

    if (!name || !type) {
      return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name);

    const result = dbRun(
      'INSERT INTO categories (name, slug, type, description, icon, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, slug, type, description, icon, display_order, is_active ? 1 : 0]
    );

    return NextResponse.json({
      success: true,
      categoryId: Number(result.lastInsertRowid),
      message: 'Category created',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating category' }, { status: 500 });
  }
}
