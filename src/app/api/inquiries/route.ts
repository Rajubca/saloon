import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'view_inquiries')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let sql = 'SELECT * FROM inquiries WHERE 1=1';
  const params: any[] = [];

  if (status && status !== 'all') {
    sql += ' AND status = ?';
    params.push(status);
  }

  if (search) {
    sql += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR service_or_product LIKE ? OR message LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term, term);
  }

  sql += ' ORDER BY created_at DESC';

  const inquiries = dbQuery(sql, params);
  return NextResponse.json({ inquiries });
}

export async function POST(request: NextRequest) {
  try {
    await seedDatabase();

    const body = await request.json();
    const {
      name,
      email,
      phone,
      service_or_product = '',
      inquiry_type = 'general',
      preferred_date = '',
      preferred_branch = '',
      message = '',
      attachment_url = '',
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone number are required' },
        { status: 400 }
      );
    }

    const validTypes = ['salon_booking', 'academy_admission', 'product_inquiry', 'bridal_consultation', 'general'];
    let normalizedType = inquiry_type;
    if (!validTypes.includes(normalizedType)) {
      if (normalizedType === 'appointment' || normalizedType === 'service') normalizedType = 'salon_booking';
      else if (normalizedType === 'admission' || normalizedType === 'course') normalizedType = 'academy_admission';
      else if (normalizedType === 'product') normalizedType = 'product_inquiry';
      else if (normalizedType === 'bridal') normalizedType = 'bridal_consultation';
      else normalizedType = 'general';
    }

    const result = dbRun(`
      INSERT INTO inquiries (
        name, email, phone, service_or_product, inquiry_type,
        preferred_date, preferred_branch, message,
        attachment_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `, [
      name,
      email || '',
      phone,
      service_or_product,
      normalizedType,
      preferred_date,
      preferred_branch,
      message,
      attachment_url
    ]);

    return NextResponse.json({
      success: true,
      inquiryId: Number(result.lastInsertRowid),
      message: 'Your inquiry has been received. Our salon team will contact you shortly!',
    });
  } catch (error: any) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
