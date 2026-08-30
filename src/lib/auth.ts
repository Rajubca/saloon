import jwt from 'jsonwebtoken';
import { User, UserRole } from '@/types';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'free-bird-salon-jwt-secret-key-2026-secure';

export interface AuthPayload {
  userId: number;
  email: string;
  name: string;
  role: UserRole;
}

export function signAuthToken(user: { id: number; email: string; name: string; role: UserRole }): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyAuthToken(token: string): AuthPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getAuthUserFromRequest(request: NextRequest): AuthPayload | null {
  // Try cookie first
  const cookieToken = request.cookies.get('auth_token')?.value;
  if (cookieToken) {
    const decoded = verifyAuthToken(cookieToken);
    if (decoded) return decoded;
  }

  // Try Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return verifyAuthToken(token);
  }

  return null;
}
