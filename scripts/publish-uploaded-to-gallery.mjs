import { DatabaseSync } from 'node:sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'salon.sqlite');
const db = new DatabaseSync(dbPath);

console.log('Publishing uploaded image to gallery_items table...');

const mediaItem = db.prepare('SELECT * FROM media_assets WHERE original_name LIKE ? ORDER BY id DESC LIMIT 1').get('%JSWSTEEL%');

if (mediaItem) {
  console.log('Found media item:', mediaItem);

  const cleanTitle = mediaItem.original_name.replace(/\.[^/.]+$/, '').replace(/[_\-]+/g, ' ');
  
  db.prepare(`
    INSERT INTO gallery_items (title, caption, media_type, media_url, category_id, tags, is_featured, display_order)
    VALUES (?, ?, 'image', ?, 8, 'lookbook, studio, portfolio', 1, 0)
  `).run(cleanTitle, 'Studio portfolio transformation photograph', mediaItem.url);

  console.log(`✅ Successfully published "${cleanTitle}" to the public Lookbook Gallery!`);
} else {
  console.log('Media item not found');
}
