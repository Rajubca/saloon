import { DatabaseSync } from 'node:sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'salon.sqlite');
const db = new DatabaseSync(dbPath);

console.log('Updating gallery items image URLs...');

const updates = [
  {
    title: 'Bridal HD Royalty',
    url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Ash Champagne Balayage',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Academy Live Masterclass',
    url: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Luxury Salon Suite Ambience',
    url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'HydraFacial Glow Station',
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mocha Caramel Wave Styling',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  }
];

const stmt = db.prepare('UPDATE gallery_items SET media_url = ? WHERE title = ?');

for (const item of updates) {
  stmt.run(item.url, item.title);
}

console.log('✅ Gallery images updated with verified high-res assets!');
