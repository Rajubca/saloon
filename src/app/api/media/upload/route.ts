import { NextRequest, NextResponse } from 'next/server';
import { saveUploadedFile } from '@/lib/storage';
import { dbRun } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';

export async function POST(request: NextRequest) {
  const authUser = getAuthUserFromRequest(request);
  if (!authUser || !hasPermission(authUser.role, 'manage_media')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';
    const altText = (formData.get('alt_text') as string) || '';
    const caption = (formData.get('caption') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const { url, filename, size, mime } = await saveUploadedFile(file, folder);

    // Save to media_assets table
    const result = dbRun(`
      INSERT INTO media_assets (
        filename, original_name, mime_type, size_bytes,
        url, folder, alt_text, caption
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      filename,
      file.name,
      mime,
      size,
      url,
      folder,
      altText,
      caption
    ]);

    return NextResponse.json({
      success: true,
      asset: {
        id: Number(result.lastInsertRowid),
        url,
        filename,
        original_name: file.name,
        size_bytes: size,
        mime_type: mime,
        folder,
        alt_text: altText,
        caption,
      },
      message: 'File uploaded successfully',
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
