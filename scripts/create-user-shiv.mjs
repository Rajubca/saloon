import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'data', 'salon.sqlite');
const db = new DatabaseSync(dbPath);

async function createShivUser() {
  console.log('Creating Admin user shiv1 with password @Asdf1234...');
  
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('@Asdf1234', salt);

  // Check if exists
  const existing = db.prepare('SELECT id FROM users WHERE email = ? OR email = ?').get('shiv1', 'shiv1@freebirdsalon.com');
  
  if (existing) {
    db.prepare(`
      UPDATE users 
      SET name = ?, email = ?, password_hash = ?, role = ?
      WHERE id = ?
    `).run('Shiv (Administrator)', 'shiv1', passwordHash, 'super_admin', existing.id);
    console.log('✅ Updated existing user to shiv1 / super_admin');
  } else {
    db.prepare(`
      INSERT INTO users (name, email, password_hash, role, avatar)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      'Shiv (Administrator)',
      'shiv1',
      passwordHash,
      'super_admin',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
    );
    console.log('✅ Created new user shiv1 with super_admin role');
  }
}

createShivUser().catch(console.error);
