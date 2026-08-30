import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'salon.sqlite');
const db = new DatabaseSync(dbPath);

console.log('--- Media Assets in DB ---');
const assets = db.prepare('SELECT * FROM media_assets').all();
console.log(assets);

console.log('\n--- Files in public/uploads ---');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (fs.existsSync(uploadsDir)) {
  function listFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        listFiles(fullPath);
      } else {
        console.log('File:', fullPath.replace(process.cwd(), ''));
      }
    }
  }
  listFiles(uploadsDir);
} else {
  console.log('Uploads dir does not exist');
}
