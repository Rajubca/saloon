import { DatabaseSync } from 'node:sqlite';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'salon.sqlite');
const db = new DatabaseSync(dbPath);

console.log('Updating header menu items in database...');

// Remove existing header menu items
db.exec("DELETE FROM menu_items WHERE menu_location = 'header'");

// Insert clean concise header menu items
const insertStmt = db.prepare(`
  INSERT INTO menu_items (menu_location, title, url, display_order, is_active, open_new_tab)
  VALUES ('header', ?, ?, ?, 1, 0)
`);

const headerLinks = [
  ['Home', '/', 1],
  ['Services & Academy', '/services', 2],
  ['Transformations', '/transformations', 3],
  ['Products', '/products', 4],
  ['Offers', '/offers', 5],
  ['Lookbook', '/gallery', 6],
  ['Blog', '/blog', 7],
  ['About Us', '/pages/about', 8],
];

for (const [title, url, order] of headerLinks) {
  insertStmt.run(title, url, order);
}

console.log('✅ Header menu items successfully updated to clean concise labels!');
