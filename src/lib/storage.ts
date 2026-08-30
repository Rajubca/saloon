import fs from 'fs';
import path from 'path';

export const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export async function saveUploadedFile(file: File, folder = 'general'): Promise<{ url: string; filename: string; size: number; mime: string }> {
  ensureUploadDir();

  const folderDir = path.join(UPLOAD_DIR, folder);
  if (!fs.existsSync(folderDir)) {
    fs.mkdirSync(folderDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate clean filename
  const ext = path.extname(file.name) || '.jpg';
  const cleanName = path.basename(file.name, ext).replace(/[^\w\-]+/g, '_');
  const uniqueName = `${cleanName}_${Date.now()}${ext}`;
  const filePath = path.join(folderDir, uniqueName);

  fs.writeFileSync(filePath, buffer);

  const publicUrl = `/uploads/${folder}/${uniqueName}`;
  return {
    url: publicUrl,
    filename: uniqueName,
    size: file.size,
    mime: file.type || 'application/octet-stream'
  };
}
