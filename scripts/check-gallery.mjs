import { DatabaseSync } from 'node:sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'salon.sqlite');
const db = new DatabaseSync(dbPath);

console.log('--- ALL GALLERY ITEMS IN DB ---');
const gallery = db.prepare('SELECT * FROM gallery_items').all();
console.log(gallery);

console.log('\n--- ALL MEDIA ASSETS IN DB ---');
const media = db.prepare('SELECT * FROM media_assets').all();
console.log(media);
