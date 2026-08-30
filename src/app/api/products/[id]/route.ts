import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun, dbQuery } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { slugify } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  let product = null;
  if (!isNaN(Number(id))) {
    product = dbGet<any>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [Number(id)]
    );
  } else {
    product = dbGet<any>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = ?`,
      [id]
    );
  }

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Get gallery images
  const images = dbQuery(
    'SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order ASC',
    [product.id]
  );

  return NextResponse.json({ product: { ...product, images } });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_products')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const {
      name,
      slug,
      sku,
      category_id,
      short_description,
      description,
      price,
      sale_price,
      main_image,
      stock_count,
      is_featured,
      is_new,
      tags,
      specifications,
      purchase_url,
      seo_title,
      seo_description,
      status,
      display_order,
    } = body;

    const productSlug = slug ? slugify(slug) : slugify(name);

    dbRun(`
      UPDATE products SET
        name = ?, slug = ?, sku = ?, category_id = ?, short_description = ?,
        description = ?, price = ?, sale_price = ?, main_image = ?,
        stock_count = ?, is_featured = ?, is_new = ?, tags = ?,
        specifications = ?, purchase_url = ?, seo_title = ?,
        seo_description = ?, status = ?, display_order = ?
      WHERE id = ?
    `, [
      name,
      productSlug,
      sku,
      category_id,
      short_description,
      description,
      price,
      sale_price || null,
      main_image,
      stock_count,
      is_featured ? 1 : 0,
      is_new ? 1 : 0,
      tags,
      typeof specifications === 'object' ? JSON.stringify(specifications) : specifications,
      purchase_url,
      seo_title,
      seo_description,
      status,
      display_order,
      Number(id)
    ]);

    return NextResponse.json({ success: true, message: 'Product updated successfully' });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_products')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  dbRun('DELETE FROM products WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true, message: 'Product deleted' });
}
