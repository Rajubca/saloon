import { NextRequest, NextResponse } from 'next/server';
import { dbQuery, dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_users')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const users = dbQuery('SELECT id, name, email, role, avatar, created_at FROM users ORDER BY created_at ASC');
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_users')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, email, password, role = 'staff', avatar = '' } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = dbRun(
      'INSERT INTO users (name, email, password_hash, role, avatar) VALUES (?, ?, ?, ?, ?)',
      [name, email.toLowerCase().trim(), password_hash, role, avatar]
    );

    return NextResponse.json({
      success: true,
      userId: Number(result.lastInsertRowid),
      message: 'User account created',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating user' }, { status: 500 });
  }
}
