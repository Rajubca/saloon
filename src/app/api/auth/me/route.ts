import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { dbGet } from '@/lib/db';

export async function GET(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);

  if (!authUser) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = dbGet<any>(
    'SELECT id, name, email, role, avatar FROM users WHERE id = ?',
    [authUser.userId]
  );

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
