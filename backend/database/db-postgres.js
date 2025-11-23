import pkg from 'pg';
const { Pool } = pkg;
import { menuItems } from '../data/menu.js';
import dotenv from 'dotenv';

dotenv.config();

// Determine if we should use PostgreSQL or SQLite
const usePostgres = !!process.env.DATABASE_URL;

let pool;
let db;

if (usePostgres) {
  // PostgreSQL connection pool
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  console.log('🐘 Using PostgreSQL database');
} else {
  // Fallback to SQLite for local development
  const Database = (await import('better-sqlite3')).default;
  const { fileURLToPath } = await import('url');
  const { dirname, join } = await import('path');
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  db = new Database(join(__dirname, 'coffee-shop.db'));
  db.pragma('foreign_keys = ON');
  
  console.log('💾 Using SQLite database (local development)');
}

// Unified database interface
const query = async (sql, params = []) => {
  if (usePostgres) {
    const client = await pool.connect();
    try {
      // Convert ? placeholders to $1, $2, etc. for PostgreSQL
      let paramIndex = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      const result = await client.query(pgSql, params);
      return result;
    } finally {
      client.release();
    }
  } else {
    // SQLite
    const stmt = db.prepare(sql);
    return stmt;
  }
};

// Create tables
const createTables = async () => {
  if (usePostgres) {
    // PostgreSQL tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        user_name TEXT NOT NULL,
        user_email TEXT NOT NULL,
        items TEXT NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        status TEXT DEFAULT 'pending',
        payment_intent_id TEXT,
        shipping_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        product_price DECIMAL(10,2) NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        popular BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ PostgreSQL tables created successfully');
  } else {
    // SQLite tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        user_name TEXT NOT NULL,
        user_email TEXT NOT NULL,
        items TEXT NOT NULL,
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        payment_intent_id TEXT,
        shipping_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        product_price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        popular INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ SQLite tables created successfully');
  }
};

// Seed menu items
const seedMenuItems = async () => {
  if (usePostgres) {
    const result = await pool.query('SELECT COUNT(*) as count FROM menu_items');
    const count = parseInt(result.rows[0].count);
    
    if (count === 0) {
      console.log('📦 Seeding menu items...');
      for (const item of menuItems) {
        await pool.query(
          `INSERT INTO menu_items (name, description, price, category, image, popular)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [item.name, item.description, item.price, item.category, item.image, item.popular || false]
        );
      }
      console.log(`✅ Seeded ${menuItems.length} menu items`);
    }
  } else {
    const count = db.prepare('SELECT COUNT(*) as count FROM menu_items').get();
    
    if (count.count === 0) {
      console.log('📦 Seeding menu items...');
      const stmt = db.prepare(`
        INSERT INTO menu_items (name, description, price, category, image, popular)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      const insertMany = db.transaction((items) => {
        for (const item of items) {
          stmt.run(
            item.name,
            item.description,
            item.price,
            item.category,
            item.image,
            item.popular ? 1 : 0
          );
        }
      });
      
      insertMany(menuItems);
      console.log(`✅ Seeded ${menuItems.length} menu items`);
    }
  }
};

// Initialize database
await createTables();
await seedMenuItems();

// Unified database wrapper
const dbWrapper = {
  prepare: (sql) => ({
    run: async (...params) => {
      if (usePostgres) {
        let paramIndex = 1;
        const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
        const result = await pool.query(pgSql + ' RETURNING id', params);
        return { 
          lastInsertRowid: result.rows[0]?.id, 
          changes: result.rowCount 
        };
      } else {
        const stmt = db.prepare(sql);
        return stmt.run(...params);
      }
    },
    get: async (...params) => {
      if (usePostgres) {
        let paramIndex = 1;
        const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
        const result = await pool.query(pgSql, params);
        return result.rows[0];
      } else {
        const stmt = db.prepare(sql);
        return stmt.get(...params);
      }
    },
    all: async (...params) => {
      if (usePostgres) {
        let paramIndex = 1;
        const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
        const result = await pool.query(pgSql, params);
        return result.rows;
      } else {
        const stmt = db.prepare(sql);
        return stmt.all(...params);
      }
    },
  }),
  exec: async (sql) => {
    if (usePostgres) {
      await pool.query(sql);
    } else {
      db.exec(sql);
    }
  },
  transaction: (fn) => {
    if (usePostgres) {
      return async (...args) => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          await fn(...args);
          await client.query('COMMIT');
        } catch (e) {
          await client.query('ROLLBACK');
          throw e;
        } finally {
          client.release();
        }
      };
    } else {
      return db.transaction(fn);
    }
  },
};

export default dbWrapper;
