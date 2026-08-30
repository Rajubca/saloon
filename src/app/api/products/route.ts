import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const status = searchParams.get('status');
  const sort = searchParams.get('sort');
  const search = searchParams.get('search');

  let sql = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (status) {
    sql += ` AND p.status = ?`;
    params.push(status);
  } else if (!getAuthUserFromRequest(request)) {
    // Public requests only see published products
    sql += ` AND p.status = 'published'`;
  }

  if (category) {
    sql += ` AND (c.slug = ? OR c.id = ?)`;
    params.push(category, category);
  }

  if (featured === 'true' || featured === '1') {
    sql += ` AND p.is_featured = 1`;
  }

  if (search) {
    sql += ` AND (p.name LIKE ? OR p.description LIKE ? OR p.tags LIKE ? OR p.sku LIKE ?)`;
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  // Sort
  if (sort === 'price_asc' || sort === 'price-asc') {
    sql += ` ORDER BY COALESCE(p.sale_price, p.price) ASC`;
  } else if (sort === 'price_desc' || sort === 'price-desc') {
    sql += ` ORDER BY COALESCE(p.sale_price, p.price) DESC`;
  } else if (sort === 'newest') {
    sql += ` ORDER BY p.created_at DESC`;
  } else {
    sql += ` ORDER BY p.display_order ASC, p.created_at DESC`;
  }

  const products = dbQuery(sql, params);
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_products')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      name,
      sku,
      category_id,
      short_description,
      description,
      price,
      sale_price,
      main_image,
      stock_count = 10,
      is_featured = 0,
      is_new = 0,
      tags = '',
      specifications = '{}',
      purchase_url = '',
      seo_title = '',
      seo_description = '',
      status = 'published',
      display_order = 0,
    } = body;

    if (!name || !price || !main_image) {
      return NextResponse.json(
        { error: 'Name, price, and main image are required' },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(name);
    const productSku = sku || `FB-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const result = dbRun(`
      INSERT INTO products (
        name, slug, sku, category_id, short_description, description,
        price, sale_price, main_image, stock_count, is_featured, is_new,
        tags, specifications, purchase_url, seo_title, seo_description,
        status, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name,
      slug,
      productSku,
      category_id || 6,
      short_description || '',
      description || '',
      price,
      sale_price || null,
      main_image,
      stock_count,
      is_featured ? 1 : 0,
      is_new ? 1 : 0,
      tags,
      typeof specifications === 'object' ? JSON.stringify(specifications) : specifications,
      purchase_url,
      seo_title || name,
      seo_description || short_description,
      status,
      display_order
    ]);

    return NextResponse.json({
      success: true,
      productId: Number(result.lastInsertRowid),
      message: 'Product created successfully',
    });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
