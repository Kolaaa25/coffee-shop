import { copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'database', 'coffee-shop.db');
const backupPath = join(__dirname, 'database', `coffee-shop-backup-${Date.now()}.db`);

try {
  copyFileSync(dbPath, backupPath);
  console.log(`✅ Database backed up to: ${backupPath}`);
} catch (error) {
  console.error('❌ Backup failed:', error.message);
}
