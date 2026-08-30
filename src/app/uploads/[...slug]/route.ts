import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const slugArray = params.slug || [];
    if (slugArray.length === 0) {
      return new NextResponse('File not found', { status: 404 });
    }

    // Securely resolve file path within public/uploads
    const baseDir = path.join(process.cwd(), 'public', 'uploads');
    const safePath = path.normalize(path.join(baseDir, ...slugArray));

    // Prevent directory traversal attacks
    if (!safePath.startsWith(baseDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    if (!fs.existsSync(safePath)) {
      // Also fallback check without subfolder if needed
      const fallbackPath = path.join(baseDir, slugArray[slugArray.length - 1]);
      if (fs.existsSync(fallbackPath)) {
        const ext = path.extname(fallbackPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const fileBuffer = fs.readFileSync(fallbackPath);
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
      return new NextResponse('File not found', { status: 404 });
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(safePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Error serving upload asset:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
