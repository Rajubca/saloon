import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function GET(request: NextRequest) {
  await seedDatabase();

  const rows = dbQuery<{ key: string; value: string }>('SELECT key, value FROM site_settings');
  const settings: Record<string, string> = {};

  rows.forEach((r) => {
    settings[r.key] = r.value;
  });

  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_settings')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Settings object is required' }, { status: 400 });
    }

    for (const [key, value] of Object.entries(settings)) {
      dbRun(
        'INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
        [key, typeof value === 'object' ? JSON.stringify(value) : String(value)]
      );
    }

    return NextResponse.json({ success: true, message: 'Settings saved successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error saving settings' }, { status: 500 });
  }
}
