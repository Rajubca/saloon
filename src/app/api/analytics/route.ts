import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbQuery, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'view_analytics')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Aggregate KPI stats
  const productsCount = dbGet<{ count: number }>('SELECT COUNT(*) as count FROM products');
  const servicesCount = dbGet<{ count: number }>('SELECT COUNT(*) as count FROM services');
  const activeOffersCount = dbGet<{ count: number }>('SELECT COUNT(*) as count FROM offers WHERE is_active = 1');
  const inquiriesCount = dbGet<{ count: number }>('SELECT COUNT(*) as count FROM inquiries');
  const newInquiriesCount = dbGet<{ count: number }>("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'");
  const transformationsCount = dbGet<{ count: number }>('SELECT COUNT(*) as count FROM before_after_entries');
  const blogCount = dbGet<{ count: number }>("SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published'");

  // Recent inquiries
  const recentInquiries = dbQuery(
    'SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5'
  );

  return NextResponse.json({
    kpis: {
      totalProducts: productsCount?.count || 0,
      totalServices: servicesCount?.count || 0,
      activeOffers: activeOffersCount?.count || 0,
      totalInquiries: inquiriesCount?.count || 0,
      newInquiries: newInquiriesCount?.count || 0,
      transformations: transformationsCount?.count || 0,
      publishedBlogs: blogCount?.count || 0,
    },
    recentInquiries,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, event_data = '', path = '/' } = body;

    if (!event_type) {
      return NextResponse.json({ error: 'Event type is required' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent') || '';

    dbRun(
      'INSERT INTO analytics_events (event_type, event_data, path, user_agent) VALUES (?, ?, ?, ?)',
      [event_type, typeof event_data === 'object' ? JSON.stringify(event_data) : event_data, path, userAgent]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Analytics error' }, { status: 500 });
  }
}
